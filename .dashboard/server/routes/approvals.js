import { html, raw } from '../html.js';

export function approvalsListRoute(runsDb) {
  return (req, res) => {
    const filter = req.query.decision || 'pending';
    const rows = runsDb.prepare(`
      SELECT q.*, r.agent as run_agent, r.outcome as run_outcome
      FROM approval_queue q LEFT JOIN runs r ON r.id = q.run_id
      WHERE q.decision = ?
      ORDER BY q.created_at DESC LIMIT 200
    `).all(filter);

    const counts = runsDb.prepare(`
      SELECT decision, COUNT(*) as n FROM approval_queue GROUP BY decision
    `).all();
    const countMap = Object.fromEntries(counts.map(c => [c.decision, c.n]));

    const tabs = ['pending', 'approved', 'rejected', 'applied', 'expired'];

    const body = html`
      <section class="hero">
        <h1>Approval Queue</h1>
        <p class="subtitle">Destructive proposals staged for human review. Phase 2 queues only — applying is deferred to Phase 3.</p>
      </section>

      <section class="filter-pills">
        ${raw(tabs.map(t => html`<a class="pill ${t === filter ? 'active' : ''}" href="/approvals?decision=${t}">${t} (${countMap[t] ?? 0})</a>`).join(''))}
      </section>

      ${raw(rows.length === 0 ? html`<p class="muted">No ${filter} items.</p>` : html`
        <section class="approval-list">
          ${raw(rows.map(r => renderApproval(r)).join(''))}
        </section>
      `)}
    `;
    res.send(body);
  };
}

function renderApproval(r) {
  let payload = {};
  try { payload = JSON.parse(r.payload_json); } catch {}
  const confidence = r.confidence !== null ? (r.confidence * 100).toFixed(0) + '%' : '—';
  const confClass = r.confidence >= 0.9 ? 'ok' : r.confidence >= 0.6 ? '' : 'muted';
  return html`
    <article class="approval-row">
      <header>
        <div>
          <span class="pill">${r.op}</span>
          <code>${r.target_path}</code>
        </div>
        <div class="muted">
          <code>${r.agent}</code> · run <a href="/agents/run/${r.run_id}">#${r.run_id}</a>
          · confidence <span class="${confClass}">${confidence}</span>
          · ${new Date(r.created_at).toLocaleString('pt-BR')}
        </div>
      </header>
      ${raw(r.diff_preview ? html`<pre class="raw small">${r.diff_preview}</pre>` : '')}
      ${raw(payload.rationale ? html`<p class="muted"><em>${payload.rationale}</em></p>` : '')}
      ${raw(r.decision === 'pending' ? html`
        <div class="approval-actions">
          <form method="post" action="/api/approvals/${r.id}/decide">
            <input type="hidden" name="decision" value="approved" />
            <button type="submit" class="btn-ok" disabled title="Apply logic lands in Phase 3">Approve (Phase 3)</button>
          </form>
          <form method="post" action="/api/approvals/${r.id}/decide">
            <input type="hidden" name="decision" value="rejected" />
            <button type="submit" class="btn-bad">Reject</button>
          </form>
        </div>
      ` : html`<div class="muted">Decided ${r.decided_at ? new Date(r.decided_at).toLocaleString('pt-BR') : ''} ${r.decided_by ? '· ' + r.decided_by : ''}</div>`)}
    </article>
  `;
}

export function approvalDecisionApi(runsDb) {
  return (req, res) => {
    const id = Number(req.params.id);
    const decision = req.body?.decision || req.query.decision;
    if (!['approved', 'rejected'].includes(decision)) {
      res.status(400).json({ ok: false, error: 'decision must be approved|rejected' });
      return;
    }
    runsDb.prepare(`
      UPDATE approval_queue SET decision = ?, decided_at = ?, decided_by = ?
      WHERE id = ? AND decision = 'pending'
    `).run(decision, Date.now(), 'user', id);
    // Phase 2: we don't actually apply approved edits. That's Phase 3.
    if (req.get('Accept')?.includes('text/html')) {
      res.setHeader('Location', '/approvals');
      res.status(303).end();
    } else {
      res.json({ ok: true, id, decision });
    }
  };
}
