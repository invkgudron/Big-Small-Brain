import { html, raw } from './html.js';

export function renderPage({ title, activeNav, body }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — Medicinal Pharma Brain</title>
  <link rel="stylesheet" href="/assets/app.css" />
  <script src="https://unpkg.com/htmx.org@2.0.3" defer></script>
</head>
<body>
  <nav class="topnav">
    <a class="brand" href="/">MP Brain</a>
    <div class="nav-links">
      ${renderNav(activeNav)}
    </div>
    <div class="nav-right">
      <button onclick="fetch('/api/reindex', {method:'POST'}).then(()=>location.reload())">Reindex</button>
    </div>
  </nav>
  <main>
    ${body}
  </main>
</body>
</html>`;
}

function renderNav(active) {
  const links = [
    ['overview', '/', 'Overview'],
    ['files', '/files', 'Files'],
    ['audit', '/audit', 'Audit'],
    ['agents', '/agents', 'Agents'],
    ['approvals', '/approvals', 'Approvals']
  ];
  return links.map(([id, href, label]) =>
    `<a href="${href}" class="${id === active ? 'active' : ''}">${label}</a>`
  ).join('');
}

export function pageMiddleware(activeNav, title) {
  return (req, res, next) => {
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      if (req.get('HX-Request') === 'true') return originalSend(body);
      return originalSend(renderPage({ title, activeNav, body }));
    };
    next();
  };
}
