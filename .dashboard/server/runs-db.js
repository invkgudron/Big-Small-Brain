import path from 'node:path';
import Database from 'better-sqlite3';
import { DASHBOARD_ROOT } from './indexer.js';

const DB_PATH = path.join(DASHBOARD_ROOT, 'data', 'runs.sqlite');

export function openRunsDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent TEXT NOT NULL,
      started_at INTEGER NOT NULL,
      ended_at INTEGER,
      duration_ms INTEGER,
      exit_code INTEGER,
      outcome TEXT NOT NULL DEFAULT 'running',  -- running | success | timeout | error | budget-skip | killed | scope-violation
      trigger TEXT NOT NULL,                      -- manual | schedule | file-watch
      prompt_hash TEXT,
      summary TEXT,
      tokens_in INTEGER DEFAULT 0,
      tokens_out INTEGER DEFAULT 0,
      cost_usd REAL DEFAULT 0,
      log_path TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_runs_agent ON runs(agent);
    CREATE INDEX IF NOT EXISTS idx_runs_started ON runs(started_at);

    CREATE TABLE IF NOT EXISTS budget_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      run_id INTEGER,
      agent TEXT NOT NULL,
      window_ts INTEGER NOT NULL,    -- epoch ms of the event
      minutes_used REAL NOT NULL,
      tokens_used INTEGER DEFAULT 0,
      FOREIGN KEY(run_id) REFERENCES runs(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_budget_window ON budget_events(window_ts);

    CREATE TABLE IF NOT EXISTS approval_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      run_id INTEGER,
      agent TEXT NOT NULL,
      op TEXT NOT NULL,              -- edit | move | rename | create | archive | frontmatter-patch
      target_path TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      diff_preview TEXT,
      confidence REAL,
      created_at INTEGER NOT NULL,
      decided_at INTEGER,
      decision TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected | expired | applied
      decided_by TEXT,
      FOREIGN KEY(run_id) REFERENCES runs(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_approval_decision ON approval_queue(decision);
    CREATE INDEX IF NOT EXISTS idx_approval_agent ON approval_queue(agent);
  `);
  return db;
}
