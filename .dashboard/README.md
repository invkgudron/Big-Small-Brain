# Medicinal Pharma Brain — Local Dashboard

Local-only, zero-build dashboard + SQLite index over the Obsidian vault. Phase 1 of the plan in `C:\Users\baker\.claude\plans\transform-all-the-data-enumerated-beacon.md`.

## Current status

**Phase 1 — read-only dashboard.** No agents yet. The server walks the vault, parses frontmatter + wiki-links + canonical entities from `System/ids.md`, and serves three views:

- `/` — Overview: counts, frontmatter coverage, issues, top entities
- `/files` — File Browser: sortable, filterable table, with per-file detail at `/file?p=<path>`
- `/audit` — Frontmatter Auditor: every lint issue grouped by path

## Run it

```bash
cd .dashboard
npm install        # first time only
npm start          # boots http://localhost:7777
```

A full reindex runs on boot (~150 ms for 72 files). A `chokidar` watcher keeps the index fresh — touch any `.md` in the vault and the DB updates within ~400 ms.

## Commands

| Command | What it does |
|---------|--------------|
| `npm start` | Boot server on `127.0.0.1:7777` with live watcher |
| `npm run reindex` | Full reindex only, then exit |
| `node scripts/inspect.mjs` | Print DB summary to stdout |

## Layout

```
.dashboard/
├── server/
│   ├── index.js        # express entry
│   ├── indexer.js      # vault walker → SQLite (also CLI: --full)
│   ├── watcher.js      # chokidar incremental reindex
│   ├── html.js         # tagged-template HTML + escaping
│   ├── layout.js       # page shell + nav
│   └── routes/         # overview.js, files.js, audit.js
├── web/assets/app.css  # dark theme
├── agents/             # (Phase 2+)
├── data/vault.sqlite   # index (gitignored)
├── scripts/inspect.mjs # DB inspection helper
└── logs/               # agent stdout/stderr (Phase 2+)
```

## SQLite schema

Six tables — see `server/indexer.js` for full DDL:

- `files` — one row per `.md` (path, type, status, mtime, word_count, frontmatter flags)
- `frontmatter` — EAV: every YAML key/value pair
- `links` — every wiki-link edge, resolved to a target file when possible
- `entities` — canonical entities loaded from `System/ids.md` (products, personas, channels, competitors, suppliers, …)
- `entity_mentions` — which file mentions which canonical entity
- `issues` — lint findings (`missing-frontmatter`, `invalid-type`, `broken-link`, `invalid-date`, `missing-field`, `yaml-parse-error`)

## Respect for vault rules

The indexer is **read-only**. It never writes to the vault. All governance lives in `System/` and `CLAUDE.md` and is enforced in future agent phases (Phase 2+). For now, the dashboard only surfaces violations — it doesn't fix them.

## Next phases

- **Phase 2** — agent runtime, budget ledger, approval queue, safe agents (self-testing, system-tools-testing, self-repair dry-run)
- **Phase 3** — enable writes via approval, file-watch dispatch of `file-organization` on `Inbox/` drops, `auto-execution` orchestrator, cron scheduling
- **Phase 4** — Windows service install, entity graph view, cadence tuning
