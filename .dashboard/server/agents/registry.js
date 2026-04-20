import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { DASHBOARD_ROOT } from '../indexer.js';

const AGENTS_DIR = path.join(DASHBOARD_ROOT, 'agents');

function parseAgentFile(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  try {
    const meta = YAML.parse(match[1]) ?? {};
    return { meta, prompt: match[2].trim() };
  } catch {
    return null;
  }
}

export async function loadAgents() {
  const entries = await fs.readdir(AGENTS_DIR, { withFileTypes: true });
  const agents = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.md')) continue;
    const full = path.join(AGENTS_DIR, e.name);
    const content = await fs.readFile(full, 'utf8');
    const parsed = parseAgentFile(content);
    if (!parsed) continue;
    const name = parsed.meta.name || path.basename(e.name, '.md');
    agents.push({
      name,
      file: e.name,
      scope: parsed.meta.scope ?? [],
      allowed_tools: parsed.meta.allowed_tools ?? ['Read', 'Glob', 'Grep'],
      max_runtime_sec: parsed.meta.max_runtime_sec ?? 180,
      max_tokens: parsed.meta.max_tokens ?? 40000,
      destructive: !!parsed.meta.destructive,
      trigger: parsed.meta.trigger ?? ['manual'],
      cron: parsed.meta.cron ?? null,
      confidence_autoapply: parsed.meta.confidence_autoapply ?? null,
      description: parsed.meta.description ?? '',
      prompt: parsed.prompt
    });
  }
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAgent(name) {
  const all = await loadAgents();
  return all.find(a => a.name === name) ?? null;
}
