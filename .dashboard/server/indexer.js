import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import Database from 'better-sqlite3';
import YAML from 'yaml';

export const VAULT_ROOT = path.resolve(import.meta.dirname, '..', '..');
export const DASHBOARD_ROOT = path.resolve(import.meta.dirname, '..');
const DB_PATH = path.join(DASHBOARD_ROOT, 'data', 'vault.sqlite');

const SKIP_DIRS = new Set(['.obsidian', '.dashboard', '.claude', '_archive', 'node_modules', '.git']);

const VALID_TYPES = new Set([
  'moc', 'system', 'brand-core', 'product-sheet', 'product-catalog',
  'ingredient-reference', 'visual-language', 'theme', 'audience',
  'post', 'campaign', 'template', 'calendar', 'email-sequence',
  'decision-log', 'issue-log', 'sales-data', 'instagram-insights',
  'competitor-intel', 'competitor-profile', 'competitor-matrix',
  'trends', 'survey', 'audit', 'sop', 'script', 'prompt-library',
  'reference', 'unclassified'
]);

const VALID_STATUSES = new Set(['draft', 'active', 'archived', 'deprecated']);
const UNIVERSAL_REQUIRED = ['name', 'description', 'type', 'status', 'date', 'tags'];

export function openDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      folder TEXT NOT NULL,
      name TEXT NOT NULL,
      mtime INTEGER NOT NULL,
      size INTEGER NOT NULL,
      type TEXT,
      status TEXT,
      date TEXT,
      updated TEXT,
      word_count INTEGER NOT NULL DEFAULT 0,
      has_frontmatter INTEGER NOT NULL DEFAULT 0,
      frontmatter_complete INTEGER NOT NULL DEFAULT 0,
      indexed_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_files_type ON files(type);
    CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);
    CREATE INDEX IF NOT EXISTS idx_files_folder ON files(folder);

    CREATE TABLE IF NOT EXISTS frontmatter (
      path TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT,
      PRIMARY KEY(path, key),
      FOREIGN KEY(path) REFERENCES files(path) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_fm_key ON frontmatter(key);
    CREATE INDEX IF NOT EXISTS idx_fm_kv ON frontmatter(key, value);

    CREATE TABLE IF NOT EXISTS links (
      src TEXT NOT NULL,
      target_raw TEXT NOT NULL,
      target_resolved TEXT,
      alias TEXT,
      kind TEXT NOT NULL,
      FOREIGN KEY(src) REFERENCES files(path) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_links_src ON links(src);
    CREATE INDEX IF NOT EXISTS idx_links_target ON links(target_resolved);

    CREATE TABLE IF NOT EXISTS entities (
      entity_id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      display_name TEXT,
      sku TEXT,
      canonical_file TEXT,
      aliases TEXT
    );

    CREATE TABLE IF NOT EXISTS entity_mentions (
      path TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      source TEXT NOT NULL,
      PRIMARY KEY(path, entity_id, source),
      FOREIGN KEY(path) REFERENCES files(path) ON DELETE CASCADE,
      FOREIGN KEY(entity_id) REFERENCES entities(entity_id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_em_entity ON entity_mentions(entity_id);

    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      code TEXT NOT NULL,
      detail TEXT,
      detected_at INTEGER NOT NULL,
      FOREIGN KEY(path) REFERENCES files(path) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_issues_path ON issues(path);
    CREATE INDEX IF NOT EXISTS idx_issues_code ON issues(code);

    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
  return db;
}

async function walkVault(root = VAULT_ROOT) {
  const results = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(full);
      }
    }
  }
  await walk(root);
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: null, body: content };
  try {
    const parsed = YAML.parse(match[1]);
    return { frontmatter: parsed ?? {}, body: content.slice(match[0].length) };
  } catch {
    return { frontmatter: null, body: content, parseError: true };
  }
}

function extractLinks(body) {
  const links = [];
  const re = /\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const target = m[1].trim();
    const alias = m[3]?.trim() ?? null;
    const kind = target.startsWith('!') ? 'embed' : 'wiki';
    links.push({ target_raw: target, alias, kind });
  }
  return links;
}

function countWords(body) {
  return body.split(/\s+/).filter(Boolean).length;
}

function rel(full) {
  return path.relative(VAULT_ROOT, full).replaceAll('\\', '/');
}

function resolveLink(targetRaw, allPaths) {
  const target = targetRaw.replaceAll('\\', '/');
  const candidates = [
    target,
    target + '.md',
    target.endsWith('.md') ? target : target + '.md'
  ];
  for (const c of candidates) {
    if (allPaths.has(c)) return c;
  }
  const basename = target.split('/').pop();
  const baseWithMd = basename.endsWith('.md') ? basename : basename + '.md';
  for (const p of allPaths) {
    if (p.endsWith('/' + baseWithMd) || p === baseWithMd) return p;
  }
  return null;
}

function lintFrontmatter(fm, parseError) {
  const issues = [];
  if (parseError) {
    issues.push({ code: 'yaml-parse-error', detail: 'Frontmatter YAML could not be parsed' });
    return issues;
  }
  if (!fm) {
    issues.push({ code: 'missing-frontmatter', detail: 'File has no YAML frontmatter' });
    return issues;
  }
  for (const key of UNIVERSAL_REQUIRED) {
    if (fm[key] === undefined || fm[key] === null || fm[key] === '') {
      issues.push({ code: 'missing-field', detail: `Required field "${key}" is missing` });
    }
  }
  if (fm.type && !VALID_TYPES.has(fm.type)) {
    issues.push({ code: 'invalid-type', detail: `type "${fm.type}" is not in the allowed enum` });
  }
  if (fm.status && !VALID_STATUSES.has(fm.status)) {
    issues.push({ code: 'invalid-status', detail: `status "${fm.status}" is not draft|active|archived|deprecated` });
  }
  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(fm.date))) {
    issues.push({ code: 'invalid-date', detail: `date "${fm.date}" is not ISO YYYY-MM-DD` });
  }
  return issues;
}

function flattenFrontmatter(fm) {
  const out = [];
  if (!fm || typeof fm !== 'object') return out;
  for (const [k, v] of Object.entries(fm)) {
    if (v === null || v === undefined) continue;
    if (Array.isArray(v)) {
      out.push([k, JSON.stringify(v)]);
    } else if (typeof v === 'object') {
      out.push([k, JSON.stringify(v)]);
    } else {
      out.push([k, String(v)]);
    }
  }
  return out;
}

export async function loadEntitiesFromIds() {
  const idsPath = path.join(VAULT_ROOT, 'System', 'ids.md');
  let content;
  try {
    content = await fs.readFile(idsPath, 'utf8');
  } catch {
    return [];
  }
  const entities = [];
  const sectionRe = /^##\s+\d+\.\s+(.+)$/gm;
  const sections = [];
  let m;
  while ((m = sectionRe.exec(content)) !== null) {
    sections.push({ title: m[1].trim(), start: m.index });
  }
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const end = sections[i + 1]?.start ?? content.length;
    const body = content.slice(sec.start, end);
    const entityType = sectionTitleToType(sec.title);
    if (!entityType) continue;
    const rowRe = /^\|\s*`([a-z0-9][a-z0-9._-]*)`\s*\|(.*)$/gm;
    let r;
    while ((r = rowRe.exec(body)) !== null) {
      const id = r[1];
      const rest = r[2];
      const cols = rest.split('|').map(c => c.trim());
      let sku = null, displayName = null, aliases = [], canonicalFile = null;
      if (entityType === 'product') {
        [sku, displayName] = [cols[0] || null, cols[1] || null];
        aliases = (cols[2] || '').split(',').map(s => s.trim()).filter(Boolean);
        const fileMatch = rest.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
        if (fileMatch) canonicalFile = fileMatch[1].trim() + '.md';
      } else {
        displayName = cols[0] || null;
        const fileMatch = rest.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
        if (fileMatch) canonicalFile = fileMatch[1].trim() + '.md';
      }
      entities.push({ entity_id: id, entity_type: entityType, display_name: displayName, sku, canonical_file: canonicalFile, aliases });
    }
  }
  return entities;
}

function sectionTitleToType(title) {
  const t = title.toLowerCase();
  if (t.startsWith('produtos')) return 'product';
  if (t.startsWith('personas')) return 'persona';
  if (t.startsWith('canais')) return 'channel';
  if (t.startsWith('campanhas')) return 'campaign';
  if (t.startsWith('temas')) return 'theme';
  if (t.startsWith('cupons')) return 'coupon';
  if (t.startsWith('fornecedores')) return 'supplier';
  if (t.startsWith('concorrentes')) return 'competitor';
  if (t.startsWith('ingredientes')) return 'ingredient';
  return null;
}

function buildEntityMatchers(entities) {
  const matchers = [];
  for (const e of entities) {
    const tokens = new Set();
    tokens.add(e.entity_id);
    if (e.display_name) tokens.add(e.display_name);
    for (const a of e.aliases || []) tokens.add(a);
    for (const t of tokens) {
      if (!t || t.length < 2) continue;
      matchers.push({ entity_id: e.entity_id, token: t });
    }
  }
  matchers.sort((a, b) => b.token.length - a.token.length);
  return matchers;
}

function findEntityMentions(text, matchers) {
  const found = new Set();
  const lowered = text.toLowerCase();
  for (const { entity_id, token } of matchers) {
    const t = token.toLowerCase();
    if (lowered.includes(t)) found.add(entity_id);
  }
  return [...found];
}

export async function reindexAll({ verbose = true } = {}) {
  const started = Date.now();
  const db = openDb();
  const allFiles = await walkVault();
  const allPaths = new Set(allFiles.map(rel));
  const entities = await loadEntitiesFromIds();
  const matchers = buildEntityMatchers(entities);

  const upsertEntity = db.prepare(`
    INSERT INTO entities(entity_id, entity_type, display_name, sku, canonical_file, aliases)
    VALUES (@entity_id, @entity_type, @display_name, @sku, @canonical_file, @aliases)
    ON CONFLICT(entity_id) DO UPDATE SET
      entity_type=excluded.entity_type,
      display_name=excluded.display_name,
      sku=excluded.sku,
      canonical_file=excluded.canonical_file,
      aliases=excluded.aliases
  `);
  db.transaction(() => {
    db.prepare('DELETE FROM entities').run();
    for (const e of entities) {
      upsertEntity.run({
        entity_id: e.entity_id,
        entity_type: e.entity_type,
        display_name: e.display_name,
        sku: e.sku,
        canonical_file: e.canonical_file,
        aliases: JSON.stringify(e.aliases || [])
      });
    }
  })();

  const upsertFile = db.prepare(`
    INSERT INTO files(path, folder, name, mtime, size, type, status, date, updated, word_count, has_frontmatter, frontmatter_complete, indexed_at)
    VALUES (@path, @folder, @name, @mtime, @size, @type, @status, @date, @updated, @word_count, @has_frontmatter, @frontmatter_complete, @indexed_at)
    ON CONFLICT(path) DO UPDATE SET
      folder=excluded.folder,
      name=excluded.name,
      mtime=excluded.mtime,
      size=excluded.size,
      type=excluded.type,
      status=excluded.status,
      date=excluded.date,
      updated=excluded.updated,
      word_count=excluded.word_count,
      has_frontmatter=excluded.has_frontmatter,
      frontmatter_complete=excluded.frontmatter_complete,
      indexed_at=excluded.indexed_at
  `);
  const delFm = db.prepare('DELETE FROM frontmatter WHERE path=?');
  const insFm = db.prepare('INSERT INTO frontmatter(path, key, value) VALUES (?, ?, ?)');
  const delLinks = db.prepare('DELETE FROM links WHERE src=?');
  const insLink = db.prepare('INSERT INTO links(src, target_raw, target_resolved, alias, kind) VALUES (?, ?, ?, ?, ?)');
  const delMentions = db.prepare('DELETE FROM entity_mentions WHERE path=?');
  const insMention = db.prepare('INSERT OR IGNORE INTO entity_mentions(path, entity_id, source) VALUES (?, ?, ?)');
  const delIssues = db.prepare('DELETE FROM issues WHERE path=?');
  const insIssue = db.prepare('INSERT INTO issues(path, code, detail, detected_at) VALUES (?, ?, ?, ?)');

  const existing = new Set(db.prepare('SELECT path FROM files').all().map(r => r.path));
  const seen = new Set();

  const now = Date.now();

  const processAll = db.transaction(() => {
    for (const full of allFiles) {
      const relPath = rel(full);
      seen.add(relPath);
    }
  });
  processAll();

  let indexed = 0;
  for (const full of allFiles) {
    const relPath = rel(full);
    const stat = await fs.stat(full);
    const content = await fs.readFile(full, 'utf8');
    const { frontmatter, body, parseError } = parseFrontmatter(content);
    const links = extractLinks(body);
    const wordCount = countWords(body);
    const issues = lintFrontmatter(frontmatter, parseError);

    const folder = path.dirname(relPath).replaceAll('\\', '/');
    const name = path.basename(relPath, '.md');
    const type = frontmatter?.type ?? null;
    const status = frontmatter?.status ?? null;
    const date = frontmatter?.date ? String(frontmatter.date) : null;
    const updated = frontmatter?.updated ? String(frontmatter.updated) : null;
    const hasFm = frontmatter ? 1 : 0;
    const complete = issues.length === 0 ? 1 : 0;

    const mentions = findEntityMentions(content, matchers);

    const tx = db.transaction(() => {
      upsertFile.run({
        path: relPath,
        folder: folder === '.' ? '' : folder,
        name,
        mtime: Math.floor(stat.mtimeMs),
        size: stat.size,
        type, status, date, updated,
        word_count: wordCount,
        has_frontmatter: hasFm,
        frontmatter_complete: complete,
        indexed_at: now
      });
      delFm.run(relPath);
      for (const [k, v] of flattenFrontmatter(frontmatter)) insFm.run(relPath, k, v);
      delLinks.run(relPath);
      for (const l of links) {
        const resolved = resolveLink(l.target_raw, allPaths);
        insLink.run(relPath, l.target_raw, resolved, l.alias, l.kind);
        if (!resolved) {
          insIssue.run(relPath, 'broken-link', `[[${l.target_raw}]] does not resolve`, now);
        }
      }
      delMentions.run(relPath);
      for (const eid of mentions) insMention.run(relPath, eid, 'content');
      delIssues.run(relPath);
      for (const i of issues) insIssue.run(relPath, i.code, i.detail, now);
    });
    tx();
    indexed++;
  }

  for (const oldPath of existing) {
    if (!seen.has(oldPath)) {
      db.prepare('DELETE FROM files WHERE path=?').run(oldPath);
    }
  }

  db.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES (?, ?)').run('last_full_reindex', String(now));
  db.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES (?, ?)').run('indexed_count', String(indexed));

  const elapsed = Date.now() - started;
  if (verbose) {
    console.log(`[indexer] ${indexed} files indexed in ${elapsed}ms · ${entities.length} canonical entities loaded`);
  }
  db.close();
  return { indexed, elapsed, entityCount: entities.length };
}

export async function reindexFile(relPath) {
  const db = openDb();
  const full = path.join(VAULT_ROOT, relPath);
  try {
    const stat = await fs.stat(full);
    const content = await fs.readFile(full, 'utf8');
    const { frontmatter, body, parseError } = parseFrontmatter(content);
    const links = extractLinks(body);
    const wordCount = countWords(body);
    const issues = lintFrontmatter(frontmatter, parseError);

    const allPaths = new Set(db.prepare('SELECT path FROM files').all().map(r => r.path));
    allPaths.add(relPath);

    const entities = await loadEntitiesFromIds();
    const matchers = buildEntityMatchers(entities);
    const mentions = findEntityMentions(content, matchers);

    const folder = path.dirname(relPath).replaceAll('\\', '/');
    const name = path.basename(relPath, '.md');
    const tx = db.transaction(() => {
      db.prepare(`
        INSERT INTO files(path, folder, name, mtime, size, type, status, date, updated, word_count, has_frontmatter, frontmatter_complete, indexed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(path) DO UPDATE SET
          folder=excluded.folder, name=excluded.name, mtime=excluded.mtime, size=excluded.size,
          type=excluded.type, status=excluded.status, date=excluded.date, updated=excluded.updated,
          word_count=excluded.word_count, has_frontmatter=excluded.has_frontmatter,
          frontmatter_complete=excluded.frontmatter_complete, indexed_at=excluded.indexed_at
      `).run(
        relPath, folder === '.' ? '' : folder, name,
        Math.floor(stat.mtimeMs), stat.size,
        frontmatter?.type ?? null, frontmatter?.status ?? null,
        frontmatter?.date ? String(frontmatter.date) : null,
        frontmatter?.updated ? String(frontmatter.updated) : null,
        wordCount, frontmatter ? 1 : 0, issues.length === 0 ? 1 : 0, Date.now()
      );
      db.prepare('DELETE FROM frontmatter WHERE path=?').run(relPath);
      const insFm = db.prepare('INSERT INTO frontmatter(path, key, value) VALUES (?, ?, ?)');
      for (const [k, v] of flattenFrontmatter(frontmatter)) insFm.run(relPath, k, v);
      db.prepare('DELETE FROM links WHERE src=?').run(relPath);
      const insLink = db.prepare('INSERT INTO links(src, target_raw, target_resolved, alias, kind) VALUES (?, ?, ?, ?, ?)');
      for (const l of links) {
        const resolved = resolveLink(l.target_raw, allPaths);
        insLink.run(relPath, l.target_raw, resolved, l.alias, l.kind);
      }
      db.prepare('DELETE FROM entity_mentions WHERE path=?').run(relPath);
      const insMention = db.prepare('INSERT OR IGNORE INTO entity_mentions(path, entity_id, source) VALUES (?, ?, ?)');
      for (const eid of mentions) insMention.run(relPath, eid, 'content');
      db.prepare('DELETE FROM issues WHERE path=?').run(relPath);
      const insIssue = db.prepare('INSERT INTO issues(path, code, detail, detected_at) VALUES (?, ?, ?, ?)');
      for (const i of issues) insIssue.run(relPath, i.code, i.detail, Date.now());
    });
    tx();
  } catch (err) {
    if (err.code === 'ENOENT') {
      db.prepare('DELETE FROM files WHERE path=?').run(relPath);
    } else {
      throw err;
    }
  } finally {
    db.close();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = process.argv[2];
  if (arg === '--full' || !arg) {
    await reindexAll();
    process.exit(0);
  }
}
