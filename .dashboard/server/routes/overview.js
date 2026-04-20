import { html, raw } from '../html.js';

export function overviewRoute(db) {
  return (req, res) => {
    const total = db.prepare('SELECT COUNT(*) as n FROM files').get().n;
    const withFm = db.prepare('SELECT COUNT(*) as n FROM files WHERE has_frontmatter=1').get().n;
    const complete = db.prepare('SELECT COUNT(*) as n FROM files WHERE frontmatter_complete=1').get().n;
    const wordCount = db.prepare('SELECT COALESCE(SUM(word_count), 0) as n FROM files').get().n;
    const byFolder = db.prepare('SELECT folder, COUNT(*) as n FROM files GROUP BY folder ORDER BY n DESC').all();
    const byType = db.prepare(`SELECT COALESCE(type, '(missing)') as type, COUNT(*) as n FROM files GROUP BY type ORDER BY n DESC LIMIT 12`).all();
    const byStatus = db.prepare(`SELECT COALESCE(status, '(missing)') as status, COUNT(*) as n FROM files GROUP BY status ORDER BY n DESC`).all();
    const issuesByCode = db.prepare('SELECT code, COUNT(*) as n FROM issues GROUP BY code ORDER BY n DESC').all();
    const topEntities = db.prepare(`
      SELECT e.entity_id, e.entity_type, COUNT(em.path) as mentions
      FROM entities e LEFT JOIN entity_mentions em ON em.entity_id=e.entity_id
      GROUP BY e.entity_id ORDER BY mentions DESC LIMIT 10
    `).all();
    const brokenLinks = db.prepare(`SELECT COUNT(*) as n FROM issues WHERE code='broken-link'`).get().n;
    const unlinkedFiles = db.prepare(`
      SELECT f.path FROM files f
      LEFT JOIN links l ON l.target_resolved = f.path
      WHERE l.target_resolved IS NULL
      ORDER BY f.path
    `).all().length;
    const recent = db.prepare('SELECT path, mtime FROM files ORDER BY mtime DESC LIMIT 8').all();

    const fmPct = Math.round(100 * withFm / Math.max(total, 1));
    const completePct = Math.round(100 * complete / Math.max(total, 1));

    const body = html`
      <section class="hero">
        <h1>Medicinal Pharma Brain</h1>
        <p class="subtitle">Local dashboard for the Obsidian vault · <a href="/files">${total} files</a> · ${wordCount.toLocaleString('pt-BR')} words</p>
      </section>

      <section class="cards">
        <div class="card">
          <div class="metric">${total}</div>
          <div class="label">Files indexed</div>
        </div>
        <div class="card">
          <div class="metric">${fmPct}%</div>
          <div class="label">With frontmatter <span class="muted">(${withFm}/${total})</span></div>
          <div class="bar"><div class="bar-fill" style="width:${fmPct}%"></div></div>
        </div>
        <div class="card">
          <div class="metric">${completePct}%</div>
          <div class="label">Schema-valid <span class="muted">(${complete}/${total})</span></div>
          <div class="bar"><div class="bar-fill ${completePct < 70 ? 'warn' : ''}" style="width:${completePct}%"></div></div>
        </div>
        <div class="card">
          <div class="metric ${brokenLinks > 0 ? 'bad' : ''}">${brokenLinks}</div>
          <div class="label">Broken wiki-links</div>
        </div>
      </section>

      <section class="grid">
        <div class="panel">
          <h2>By folder</h2>
          <table>
            <tbody>
              ${raw(byFolder.map(r => html`<tr><td><a href="/files?folder=${encodeURIComponent(r.folder)}">${r.folder || '(root)'}</a></td><td class="num">${r.n}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>By type</h2>
          <table>
            <tbody>
              ${raw(byType.map(r => html`<tr><td>${r.type}</td><td class="num">${r.n}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>By status</h2>
          <table>
            <tbody>
              ${raw(byStatus.map(r => html`<tr><td>${r.status}</td><td class="num">${r.n}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>Issues <a class="btn-small" href="/audit">Audit →</a></h2>
          <table>
            <tbody>
              ${raw(issuesByCode.length === 0
                ? html`<tr><td class="muted">No issues</td></tr>`
                : issuesByCode.map(r => html`<tr><td><code>${r.code}</code></td><td class="num">${r.n}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>Top mentioned entities</h2>
          <table>
            <tbody>
              ${raw(topEntities.map(r => html`<tr><td><code>${r.entity_id}</code> <span class="muted">${r.entity_type}</span></td><td class="num">${r.mentions}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>Recently updated</h2>
          <table>
            <tbody>
              ${raw(recent.map(r => html`<tr><td><a href="/file?p=${encodeURIComponent(r.path)}">${r.path}</a></td><td class="num muted">${new Date(r.mtime).toLocaleString('pt-BR')}</td></tr>`).join(''))}
            </tbody>
          </table>
        </div>
      </section>
    `;
    res.send(body);
  };
}
