import { spawn } from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { VAULT_ROOT, DASHBOARD_ROOT } from '../indexer.js';
import { canSpawn, recordUsage } from './budget.js';

const KILL_SENTINEL = path.join(DASHBOARD_ROOT, 'data', 'KILL');
const LOGS_DIR = path.join(DASHBOARD_ROOT, 'logs');

function isKilled() {
  try { fs.accessSync(KILL_SENTINEL); return true; } catch { return false; }
}

function nowStamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function extractProposals(fullOutput) {
  // Match ```proposals\n[...JSON...]\n``` blocks
  const proposals = [];
  const re = /```proposals\s*\n([\s\S]*?)\n```/g;
  let m;
  while ((m = re.exec(fullOutput)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed)) proposals.push(...parsed);
    } catch (err) {
      proposals.push({ op: 'parse-error', payload: { raw: m[1].slice(0, 500), error: err.message } });
    }
  }
  return proposals;
}

function buildPrompt(agent, context) {
  return [
    agent.prompt,
    '',
    '---',
    '',
    '## Runtime context',
    `- Agent name: ${agent.name}`,
    `- Vault root: ${VAULT_ROOT}`,
    `- Trigger: ${context.trigger}`,
    `- Dry-run mode: ${context.dryRun ? 'YES — output proposals only, do NOT modify files' : 'NO'}`,
    `- Scope (you may only touch files under these prefixes): ${JSON.stringify(agent.scope)}`,
    context.extra || ''
  ].join('\n');
}

export async function runAgent({ agent, db, trigger = 'manual', dryRun = true, extraContext = '' }) {
  const startedAt = Date.now();

  if (isKilled()) {
    const id = insertRun(db, { agent: agent.name, startedAt, trigger, outcome: 'killed', summary: 'KILL sentinel active' });
    finalizeRun(db, id, { endedAt: Date.now(), exitCode: -1 });
    return { runId: id, outcome: 'killed', summary: 'KILL sentinel is present — all agents are halted.' };
  }

  const budgetCheck = canSpawn(db, agent.max_runtime_sec, startedAt);
  if (!budgetCheck.allowed) {
    const id = insertRun(db, { agent: agent.name, startedAt, trigger, outcome: 'budget-skip', summary: budgetCheck.reason });
    finalizeRun(db, id, { endedAt: Date.now(), exitCode: 0 });
    return { runId: id, outcome: 'budget-skip', summary: budgetCheck.reason, usage: budgetCheck.usage };
  }

  const prompt = buildPrompt(agent, { trigger, dryRun, extra: extraContext });
  const promptHash = crypto.createHash('sha256').update(prompt).digest('hex').slice(0, 12);
  const logFileName = `${agent.name}-${nowStamp()}-${promptHash}.log`;
  const logPath = path.join(LOGS_DIR, logFileName);
  await fsp.mkdir(LOGS_DIR, { recursive: true });
  const logStream = fs.createWriteStream(logPath, { flags: 'a' });
  logStream.write(`=== ${new Date().toISOString()} · agent=${agent.name} · trigger=${trigger} · dryRun=${dryRun} ===\n`);
  logStream.write(`--- PROMPT ---\n${prompt}\n--- STDOUT ---\n`);

  const runId = insertRun(db, {
    agent: agent.name,
    startedAt,
    trigger,
    outcome: 'running',
    summary: '',
    prompt_hash: promptHash,
    log_path: path.relative(DASHBOARD_ROOT, logPath).replaceAll('\\', '/')
  });

  const allowed = (agent.allowed_tools || ['Read', 'Glob', 'Grep']).join(',');

  // Write prompt to a temp file as a fallback debug artifact, but actually
  // pipe it through child.stdin so we avoid cmd.exe argument escaping.
  const promptFile = path.join(LOGS_DIR, `${agent.name}-${nowStamp()}-${promptHash}.prompt.txt`);
  await fsp.writeFile(promptFile, prompt, 'utf8');

  // On Windows we must target claude.cmd explicitly when shell:false. On other
  // platforms `claude` resolves to the node shim.
  const isWin = process.platform === 'win32';
  const claudeBin = isWin ? 'claude.cmd' : 'claude';
  const args = [
    '-p',
    '--dangerously-skip-permissions',
    '--output-format', 'text',
    '--allowed-tools', allowed
  ];

  return new Promise((resolve) => {
    const child = spawn(claudeBin, args, {
      cwd: VAULT_ROOT,
      shell: isWin, // .cmd files need the shell on Windows
      env: { ...process.env },
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Feed the prompt via stdin (avoids CLI-arg escaping problems with
    // multi-line Unicode prompts on Windows).
    try {
      child.stdin.write(prompt, 'utf8');
      child.stdin.end();
    } catch (err) {
      logStream.write(`\n--- STDIN WRITE ERROR: ${err.message} ---\n`);
    }

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill('SIGTERM'); } catch {}
      setTimeout(() => { try { child.kill('SIGKILL'); } catch {} }, 2000);
    }, agent.max_runtime_sec * 1000);

    child.stdout.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      stdout += text;
      logStream.write(text);
    });
    child.stderr.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      stderr += text;
      logStream.write(`[STDERR] ${text}`);
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      logStream.write(`\n--- SPAWN ERROR: ${err.message} ---\n`);
      logStream.end();
      const endedAt = Date.now();
      finalizeRun(db, runId, { endedAt, exitCode: -1, outcome: 'error', summary: `spawn error: ${err.message}` });
      recordUsage(db, { runId, agent: agent.name, startedAt, endedAt, tokensUsed: 0 });
      resolve({ runId, outcome: 'error', summary: err.message, stdout, stderr });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      const endedAt = Date.now();
      let outcome, summary;
      if (timedOut) {
        outcome = 'timeout';
        summary = `Killed after ${agent.max_runtime_sec}s runtime cap`;
      } else if (code !== 0) {
        outcome = 'error';
        summary = `Exit code ${code}${stderr ? ` · stderr: ${stderr.slice(0, 200)}` : ''}`;
      } else {
        outcome = 'success';
        summary = summarizeOutput(stdout);
      }

      // Extract proposals whenever we have stdout — even on timeout, the agent
      // may have emitted its final block before SIGTERM arrived.
      const proposals = (outcome === 'success' || outcome === 'timeout') ? extractProposals(stdout) : [];
      const queuedCount = enqueueProposals(db, runId, agent, proposals);

      logStream.write(`\n--- END · exitCode=${code} · outcome=${outcome} · proposals=${proposals.length} queued=${queuedCount} ---\n`);
      logStream.end();

      finalizeRun(db, runId, { endedAt, exitCode: code, outcome, summary });
      recordUsage(db, { runId, agent: agent.name, startedAt, endedAt, tokensUsed: 0 });
      resolve({ runId, outcome, summary, stdout, stderr, proposals: proposals.length, queued: queuedCount });
    });
  });
}

function insertRun(db, { agent, startedAt, trigger, outcome, summary = '', prompt_hash = null, log_path = null }) {
  const stmt = db.prepare(`
    INSERT INTO runs(agent, started_at, trigger, outcome, summary, prompt_hash, log_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(agent, startedAt, trigger, outcome, summary, prompt_hash, log_path);
  return info.lastInsertRowid;
}

function finalizeRun(db, runId, { endedAt, exitCode, outcome, summary }) {
  const cols = ['ended_at = ?', 'duration_ms = ?', 'exit_code = ?'];
  const args = [endedAt, endedAt - (db.prepare('SELECT started_at FROM runs WHERE id=?').get(runId)?.started_at ?? endedAt), exitCode];
  if (outcome !== undefined) { cols.push('outcome = ?'); args.push(outcome); }
  if (summary !== undefined) { cols.push('summary = ?'); args.push(summary); }
  args.push(runId);
  db.prepare(`UPDATE runs SET ${cols.join(', ')} WHERE id = ?`).run(...args);
}

function summarizeOutput(stdout) {
  const trimmed = stdout.trim();
  if (!trimmed) return '(empty output)';
  const firstLine = trimmed.split('\n').find(l => l.trim().length > 0) || '';
  return firstLine.slice(0, 240);
}

function enqueueProposals(db, runId, agent, proposals) {
  if (!proposals || proposals.length === 0) return 0;
  const stmt = db.prepare(`
    INSERT INTO approval_queue(run_id, agent, op, target_path, payload_json, diff_preview, confidence, created_at, decision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `);
  let n = 0;
  for (const p of proposals) {
    try {
      const op = String(p.op || 'unknown');
      const target = String(p.target_path || p.path || '');
      if (!target) continue;
      const scopeOk = agent.scope.some(root => target.startsWith(root));
      if (!scopeOk && agent.scope.length > 0) {
        stmt.run(runId, agent.name, op, target, JSON.stringify(p), `SCOPE-VIOLATION: ${target} is outside ${JSON.stringify(agent.scope)}`, p.confidence ?? null, Date.now());
      } else {
        stmt.run(runId, agent.name, op, target, JSON.stringify(p), String(p.diff_preview || '').slice(0, 4000), p.confidence ?? null, Date.now());
      }
      n++;
    } catch {}
  }
  return n;
}
