import express from 'express';
import path from 'node:path';
import { openDb, reindexAll, DASHBOARD_ROOT } from './indexer.js';
import { startWatcher } from './watcher.js';
import { pageMiddleware } from './layout.js';
import { overviewRoute } from './routes/overview.js';
import { filesListRoute, fileDetailRoute } from './routes/files.js';
import { auditRoute } from './routes/audit.js';
import { openRunsDb } from './runs-db.js';
import { agentsListRoute, agentRunDetailRoute, runAgentApi } from './routes/agents.js';
import { approvalsListRoute, approvalDecisionApi } from './routes/approvals.js';

const PORT = process.env.PORT || 7777;

async function boot() {
  console.log('[boot] running initial full reindex…');
  await reindexAll();

  const db = openDb();
  const runsDb = openRunsDb();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/assets', express.static(path.join(DASHBOARD_ROOT, 'web', 'assets')));

  app.get('/', pageMiddleware('overview', 'Overview'), overviewRoute(db));
  app.get('/files', pageMiddleware('files', 'Files'), filesListRoute(db));
  app.get('/file', pageMiddleware('files', 'File'), fileDetailRoute(db));
  app.get('/audit', pageMiddleware('audit', 'Audit'), auditRoute(db));
  app.get('/agents', pageMiddleware('agents', 'Agents'), agentsListRoute(runsDb));
  app.get('/agents/run/:id', pageMiddleware('agents', 'Run'), agentRunDetailRoute(runsDb));
  app.get('/approvals', pageMiddleware('approvals', 'Approvals'), approvalsListRoute(runsDb));

  app.post('/api/reindex', async (req, res) => {
    const result = await reindexAll({ verbose: false });
    res.json({ ok: true, ...result });
  });

  app.post('/api/agents/:name/run', (req, res) => runAgentApi(runsDb, req, res));
  app.post('/api/approvals/:id/decide', approvalDecisionApi(runsDb));

  app.get('/api/stats', (req, res) => {
    const stats = {
      files: db.prepare('SELECT COUNT(*) as n FROM files').get().n,
      fm_complete: db.prepare('SELECT COUNT(*) as n FROM files WHERE frontmatter_complete=1').get().n,
      issues: db.prepare('SELECT COUNT(*) as n FROM issues').get().n,
      entities: db.prepare('SELECT COUNT(*) as n FROM entities').get().n,
      runs: runsDb.prepare('SELECT COUNT(*) as n FROM runs').get().n,
      pending_approvals: runsDb.prepare(`SELECT COUNT(*) as n FROM approval_queue WHERE decision='pending'`).get().n
    };
    res.json(stats);
  });

  const watcher = startWatcher({
    onEvent: (ev) => console.log(`[watcher] ${ev.kind} ${ev.path}`)
  });

  const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`[boot] http://localhost:${PORT} · watcher running`);
  });

  const shutdown = () => {
    console.log('\n[boot] shutting down…');
    watcher.close();
    server.close();
    db.close();
    runsDb.close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

boot().catch(err => {
  console.error('[boot] fatal:', err);
  process.exit(1);
});
