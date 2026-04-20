import fs from 'node:fs/promises';
import path from 'node:path';
import { html, raw } from '../html.js';
import { VAULT_ROOT } from '../indexer.js';

export function filesListRoute(db) {
  return (req, res) => {
    const folder = req.query.folder ?? '';
    const type = req.query.type ?? '';
    const status = req.query.status ?? '';
    const q = (req.query.q ?? '').toLowerCase().trim();
    const sort = req.query.sort || 'path';
    const sortDir = req.query.dir === 'desc' ? 'DESC' : 'ASC';
    const allowedSort = { path: 'path', mtime: 'mtime', type: 'type', status: 'status', words: 'word_count' };
    const sortCol = allowedSort[sort] || 'path';

    const where = [];
    const args = [];
    if (folder) { where.push('folder = ?'); args.push(folder); }
    if (type) { where.push('COALESCE(type, \'(missing)\') = ?'); args.push(type); }
    if (status) { where.push('COALESCE(status, \'(missing)\') = ?'); args.push(status); }
    if (q) { where.push('(LOWER(path) LIKE ? OR LOWER(name) LIKE ?)'); args.push(`%${q}%`, `%${q}%`); }
    const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const rows = db.prepare(`SELECT * FROM files ${whereSql} ORDER BY ${sortCol} ${sortDir} LIMIT 500`).all(...args);
    const totalRows = db.prepare(`SELECT COUNT(*) as n FROM files ${whereSql}`).get(...args).n;

    const folders = db.prepare('SELECT DISTINCT folder FROM files ORDER BY folder').all().map(r => r.folder);
    const types = db.prepare("SELECT DISTINCT COALESCE(type, '(missing)') as t FROM files ORDER BY t").all().map(r => r.t);
    const statuses = db.prepare("SELECT DISTINCT COALESCE(status, '(missing)') as s FROM files ORDER BY s").all().map(r => r.s);

    const sortLink = (col, label) => {
      const dir = sort === col && sortDir === 'ASC' ? 'desc' : 'asc';
      const arrow = sort === col ? (sortDir === 'ASC' ? '▲' : '▼') : '';
      const params = new URLSearchParams({ folder, type, status, q, sort: col, dir });
      return html`<a href="/files?${raw(params.toString())}">${label} ${arrow}</a>`;
    };

    const body = html`
      <section class="hero">
        <h1>Files <span class="muted">${totalRows}${totalRows >= 500 ? ' (showing 500)' : ''}</span></h1>
      </section>

      <form class="filters" method="get" action="/files">
        <input type="search" name="q" placeholder="Search path or name" value="${q}" />
        <select name="folder">
          <option value="">All folders</option>
          ${raw(folders.map(f => html`<option value="${f}" ${f === folder ? raw('selected') : ''}>${f || '(root)'}</option>`).join(''))}
        </select>
        <select name="type">
          <option value="">All types</option>
          ${raw(types.map(t => html`<option value="${t}" ${t === type ? raw('selected') : ''}>${t}</option>`).join(''))}
        </select>
        <select name="status">
          <option value="">All statuses</option>
          ${raw(statuses.map(s => html`<option value="${s}" ${s === status ? raw('selected') : ''}>${s}</option>`).join(''))}
        </select>
        <button type="submit">Filter</button>
        <a class="btn-small" href="/files">Reset</a>
      </form>

      <table class="table">
        <thead>
          <tr>
            <th>${raw(sortLink('path', 'Path'))}</th>
            <th>${raw(sortLink('type', 'Type'))}</th>
            <th>${raw(sortLink('status', 'Status'))}</th>
            <th class="num">${raw(sortLink('words', 'Words'))}</th>
            <th>${raw(sortLink('mtime', 'Updated'))}</th>
            <th>FM</th>
          </tr>
        </thead>
        <tbody>
          ${raw(rows.map(r => html`
            <tr>
              <td><a href="/file?p=${encodeURIComponent(r.path)}">${r.path}</a></td>
              <td>${r.type ?? html`<span class="bad">(missing)</span>`}</td>
              <td>${r.status ?? ''}</td>
              <td class="num">${r.word_count}</td>
              <td class="muted">${new Date(r.mtime).toLocaleString('pt-BR')}</td>
              <td>${r.frontmatter_complete ? raw('<span class="ok">✓</span>') : raw('<span class="bad">✗</span>')}</td>
            </tr>
          `).join(''))}
        </tbody>
      </table>
    `;
    res.send(body);
  };
}

export function fileDetailRoute(db) {
  return async (req, res) => {
    const p = req.query.p;
    if (!p) { res.status(400).send(html`<p>Missing ?p=</p>`); return; }
    const row = db.prepare('SELECT * FROM files WHERE path=?').get(p);
    if (!row) { res.status(404).send(html`<p>Not found: ${p}</p>`); return; }

    const frontmatter = db.prepare('SELECT key, value FROM frontmatter WHERE path=? ORDER BY key').all(p);
    const outgoing = db.prepare('SELECT target_raw, target_resolved, alias, kind FROM links WHERE src=?').all(p);
    const incoming = db.prepare('SELECT src FROM links WHERE target_resolved=? ORDER BY src').all(p);
    const mentions = db.prepare(`
      SELECT em.entity_id, e.entity_type, e.display_name
      FROM entity_mentions em JOIN entities e ON e.entity_id=em.entity_id
      WHERE em.path=? ORDER BY e.entity_type, em.entity_id
    `).all(p);
    const issues = db.prepare('SELECT code, detail FROM issues WHERE path=? ORDER BY code').all(p);

    let content = '';
    try {
      content = await fs.readFile(path.join(VAULT_ROOT, p), 'utf8');
    } catch {}

    const body = html`
      <section class="hero">
        <h1><code>${row.path}</code></h1>
        <p class="subtitle">
          ${row.type ?? html`<span class="bad">no type</span>`}
          · <code>${row.status ?? '—'}</code>
          · ${row.word_count} words
          · <span class="muted">updated ${new Date(row.mtime).toLocaleString('pt-BR')}</span>
          · <a href="/files?folder=${encodeURIComponent(row.folder)}">← back to ${row.folder || 'root'}</a>
        </p>
      </section>

      ${raw(issues.length === 0 ? '' : html`
        <section class="panel bad-panel">
          <h2>Issues</h2>
          <ul>${raw(issues.map(i => html`<li><code>${i.code}</code> — ${i.detail}</li>`).join(''))}</ul>
        </section>
      `)}

      <div class="split">
        <div class="panel">
          <h2>Frontmatter</h2>
          ${raw(frontmatter.length === 0 ? html`<p class="muted">No frontmatter.</p>` : html`
            <table>
              <tbody>
                ${raw(frontmatter.map(f => html`<tr><td><code>${f.key}</code></td><td>${f.value}</td></tr>`).join(''))}
              </tbody>
            </table>
          `)}
        </div>

        <div class="panel">
          <h2>Canonical entities mentioned (${mentions.length})</h2>
          ${raw(mentions.length === 0 ? html`<p class="muted">None detected.</p>` : html`
            <ul class="pills">${raw(mentions.map(m => html`<li><code>${m.entity_id}</code> <span class="muted">${m.entity_type}</span></li>`).join(''))}</ul>
          `)}
        </div>
      </div>

      <div class="split">
        <div class="panel">
          <h2>Outgoing wiki-links (${outgoing.length})</h2>
          ${raw(outgoing.length === 0 ? html`<p class="muted">None.</p>` : html`
            <ul>
              ${raw(outgoing.map(l => html`<li>${l.kind === 'embed' ? raw('<span class="muted">embed</span>') : ''} ${l.target_resolved
                ? html`<a href="/file?p=${encodeURIComponent(l.target_resolved)}">${l.target_raw}</a>`
                : html`<span class="bad">${l.target_raw} (unresolved)</span>`}${l.alias ? html` <span class="muted">|${l.alias}</span>` : ''}</li>`).join(''))}
            </ul>
          `)}
        </div>

        <div class="panel">
          <h2>Backlinks (${incoming.length})</h2>
          ${raw(incoming.length === 0 ? html`<p class="muted">None.</p>` : html`
            <ul>${raw(incoming.map(l => html`<li><a href="/file?p=${encodeURIComponent(l.src)}">${l.src}</a></li>`).join(''))}</ul>
          `)}
        </div>
      </div>

      <section class="panel">
        <h2>Raw content</h2>
        <pre class="raw">${content}</pre>
      </section>
    `;
    res.send(body);
  };
}
