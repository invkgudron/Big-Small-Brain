import { html, raw } from '../html.js';

export function auditRoute(db) {
  return (req, res) => {
    const filter = req.query.code || '';
    const issueGroups = db.prepare(`
      SELECT code, COUNT(*) as n FROM issues GROUP BY code ORDER BY n DESC
    `).all();

    const args = [];
    let where = '';
    if (filter) { where = 'WHERE i.code = ?'; args.push(filter); }

    const issues = db.prepare(`
      SELECT i.path, i.code, i.detail, f.type, f.status
      FROM issues i LEFT JOIN files f ON f.path = i.path
      ${where}
      ORDER BY i.path, i.code
      LIMIT 500
    `).all(...args);

    const byPath = new Map();
    for (const i of issues) {
      if (!byPath.has(i.path)) byPath.set(i.path, { type: i.type, status: i.status, issues: [] });
      byPath.get(i.path).issues.push({ code: i.code, detail: i.detail });
    }

    const totalIssues = db.prepare('SELECT COUNT(*) as n FROM issues').get().n;
    const filesWithIssues = db.prepare('SELECT COUNT(DISTINCT path) as n FROM issues').get().n;

    const body = html`
      <section class="hero">
        <h1>Frontmatter Auditor</h1>
        <p class="subtitle">${totalIssues} total issues across ${filesWithIssues} files · governed by <code>System/frontmatter-schema.md</code></p>
      </section>

      <section class="filter-pills">
        <a class="pill ${filter === '' ? 'active' : ''}" href="/audit">All (${totalIssues})</a>
        ${raw(issueGroups.map(g => html`<a class="pill ${filter === g.code ? 'active' : ''}" href="/audit?code=${encodeURIComponent(g.code)}"><code>${g.code}</code> (${g.n})</a>`).join(''))}
      </section>

      <section class="audit-list">
        ${raw([...byPath.entries()].map(([p, meta]) => html`
          <article class="audit-row">
            <header>
              <a href="/file?p=${encodeURIComponent(p)}"><code>${p}</code></a>
              <span class="muted">${meta.type ?? '(no type)'} · ${meta.status ?? '—'}</span>
            </header>
            <ul>
              ${raw(meta.issues.map(i => html`<li><code>${i.code}</code> — ${i.detail}</li>`).join(''))}
            </ul>
          </article>
        `).join(''))}
      </section>
    `;
    res.send(body);
  };
}
