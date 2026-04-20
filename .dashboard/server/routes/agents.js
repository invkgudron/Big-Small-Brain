import fs from 'node:fs/promises';
import path from 'node:path';
import { html, raw } from '../html.js';
import { loadAgents, getAgent } from '../agents/registry.js';
import { runAgent } from '../agents/runner.js';
import { getRollingUsage, BUDGET_MIN } from '../agents/budget.js';
import { DASHBOARD_ROOT } from '../indexer.js';

export function agentsListRoute(runsDb) {
  return async (req, res) => {
    const agents = await loadAgents();
    const usage = getRollingUsage(runsDb);

    const runsByAgent = new Map();
    for (const a of agents) {
      const rows = runsDb.prepare(`
        SELECT id, started_at, ended_at, duration_ms, outcome, summary, trigger
        FROM runs WHERE agent = ? ORDER BY started_at DESC LIMIT 5
      `).all(a.name);
      runsByAgent.set(a.name, rows);
    }

    const killActive = await fileExists(path.join(DASHBOARD_ROOT, 'data', 'KILL'));
    const pendingCount = runsDb.prepare(`SELECT COUNT(*) as n FROM approval_queue WHERE decision='pending'`).get().n;
    const pctBudget = Math.round(100 * usage.minutesUsed / BUDGET_MIN);

    const body = html`
      <section class="hero">
        <h1>Agent Console</h1>
        <p class="subtitle">
          ${agents.length} agents · rolling 5h budget: ${usage.minutesUsed.toFixed(1)} / ${BUDGET_MIN} min used
          · <a href="/approvals">${pendingCount} pending approval${pendingCount === 1 ? '' : 's'}</a>
          ${killActive ? raw('<span class="bad"> · ⚠ KILL ACTIVE</span>') : ''}
        </p>
      </section>

      <section class="card budget-card">
        <div class="label">Rolling 5-hour budget (10% of plan = ${BUDGET_MIN} min)</div>
        <div class="bar"><div class="bar-fill ${pctBudget > 80 ? 'warn' : ''} ${pctBudget >= 100 ? 'bad-bg' : ''}" style="width:${Math.min(100, pctBudget)}%"></div></div>
        <div class="muted">${usage.minutesUsed.toFixed(2)} min across ${usage.events} runs · ${usage.remainingMin.toFixed(2)} min remaining</div>
      </section>

      <section class="agent-grid">
        ${raw(agents.map(a => renderAgentCard(a, runsByAgent.get(a.name) ?? [], killActive)).join(''))}
      </section>
    `;
    res.send(body);
  };
}

function renderAgentCard(a, recentRuns, killActive) {
  const lastRun = recentRuns[0];
  const badgeClass = outcomeClass(lastRun?.outcome);
  return html`
    <article class="panel agent-card">
      <header class="agent-head">
        <h2><code>${a.name}</code> ${a.destructive ? raw('<span class="pill warn-pill">destructive</span>') : raw('<span class="pill ok-pill">read-only</span>')}</h2>
        <form method="post" action="/api/agents/${encodeURIComponent(a.name)}/run" onsubmit="this.querySelector('button').disabled=true;this.querySelector('button').textContent='Running…'">
          <button type="submit" ${killActive ? raw('disabled') : ''}>Run now</button>
        </form>
      </header>
      <p class="muted">${a.description || '(no description)'}</p>
      <dl class="agent-meta">
        <dt>Scope</dt><dd>${a.scope.length ? a.scope.join(', ') : raw('<span class="muted">(none — infrastructure agent)</span>')}</dd>
        <dt>Tools</dt><dd><code>${a.allowed_tools.join(', ')}</code></dd>
        <dt>Max runtime</dt><dd>${a.max_runtime_sec}s</dd>
        <dt>Cron</dt><dd><code>${a.cron || '(manual only)'}</code></dd>
      </dl>
      ${raw(recentRuns.length === 0 ? html`<p class="muted">No runs yet.</p>` : html`
        <div class="recent-runs">
          <div class="label muted">Recent runs</div>
          <table>
            <tbody>
              ${raw(recentRuns.map(r => html`
                <tr>
                  <td><span class="pill ${outcomeClass(r.outcome)}">${r.outcome}</span></td>
                  <td><a href="/agents/run/${r.id}">#${r.id}</a></td>
                  <td class="muted">${r.duration_ms ? (r.duration_ms/1000).toFixed(1) + 's' : '—'}</td>
                  <td class="muted">${r.trigger}</td>
                  <td class="muted">${new Date(r.started_at).toLocaleString('pt-BR')}</td>
                </tr>
              `).join(''))}
            </tbody>
          </table>
        </div>
      `)}
    </article>
  `;
}

function outcomeClass(outcome) {
  switch (outcome) {
    case 'success': return 'ok-pill';
    case 'running': return 'info-pill';
    case 'timeout':
    case 'error':
    case 'killed':
    case 'scope-violation': return 'bad-pill';
    case 'budget-skip': return 'warn-pill';
    default: return '';
  }
}

export function agentRunDetailRoute(runsDb) {
  return async (req, res) => {
    const id = Number(req.params.id);
    const run = runsDb.prepare('SELECT * FROM runs WHERE id=?').get(id);
    if (!run) { res.status(404).send(html`<p>Run not found</p>`); return; }
    const proposals = runsDb.prepare('SELECT * FROM approval_queue WHERE run_id=? ORDER BY id').all(id);
    let logContent = '';
    if (run.log_path) {
      try { logContent = await fs.readFile(path.join(DASHBOARD_ROOT, run.log_path), 'utf8'); } catch {}
    }

    const body = html`
      <section class="hero">
        <h1>Run #${run.id} · <code>${run.agent}</code></h1>
        <p class="subtitle">
          <span class="pill ${outcomeClass(run.outcome)}">${run.outcome}</span>
          · trigger: ${run.trigger}
          · ${run.duration_ms ? (run.duration_ms/1000).toFixed(1) + 's' : '(still running)'}
          · started ${new Date(run.started_at).toLocaleString('pt-BR')}
          · <a href="/agents">← back to Agent Console</a>
        </p>
      </section>

      <section class="panel">
        <h2>Summary</h2>
        <p>${run.summary || '(empty)'}</p>
      </section>

      <section class="panel">
        <h2>Proposals (${proposals.length}) ${proposals.length > 0 ? raw('<a class="btn-small" href="/approvals">review in queue →</a>') : ''}</h2>
        ${raw(proposals.length === 0 ? html`<p class="muted">No proposals from this run.</p>` : html`
          <table class="table">
            <thead>
              <tr><th>Op</th><th>Target</th><th>Confidence</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${raw(proposals.map(p => html`
                <tr>
                  <td><code>${p.op}</code></td>
                  <td><code>${p.target_path}</code></td>
                  <td class="num">${p.confidence ?? '—'}</td>
                  <td><span class="pill">${p.decision}</span></td>
                </tr>
              `).join(''))}
            </tbody>
          </table>
        `)}
      </section>

      <section class="panel">
        <h2>Log</h2>
        <pre class="raw">${logContent || '(log not available)'}</pre>
      </section>
    `;
    res.send(body);
  };
}

export async function runAgentApi(runsDb, req, res) {
  const agentName = req.params.name;
  const agent = await getAgent(agentName);
  if (!agent) { res.status(404).json({ ok: false, error: 'Agent not found' }); return; }
  res.setHeader('Content-Type', 'application/json');
  runAgent({ agent, db: runsDb, trigger: 'manual', dryRun: true })
    .then(result => { /* fire-and-forget for UX; result is logged */ })
    .catch(err => console.error(`[agent:${agentName}] failed:`, err));
  const pending = runsDb.prepare('SELECT id FROM runs WHERE agent=? ORDER BY started_at DESC LIMIT 1').get(agentName);
  // Redirect browsers; API callers get JSON
  if (req.get('Accept')?.includes('text/html')) {
    res.setHeader('Location', pending ? `/agents/run/${pending.id}` : '/agents');
    res.status(303).end();
  } else {
    res.json({ ok: true, runId: pending?.id ?? null });
  }
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
