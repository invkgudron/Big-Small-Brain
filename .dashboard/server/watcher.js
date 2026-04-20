import chokidar from 'chokidar';
import path from 'node:path';
import { VAULT_ROOT, reindexFile } from './indexer.js';

const SKIP_PATTERNS = [
  /[\\/]\.obsidian[\\/]/,
  /[\\/]\.dashboard[\\/]/,
  /[\\/]\.claude[\\/]/,
  /[\\/]_archive[\\/]/,
  /[\\/]node_modules[\\/]/,
  /[\\/]\.git[\\/]/
];

export function startWatcher({ onEvent } = {}) {
  const watcher = chokidar.watch(VAULT_ROOT, {
    ignored: (p) => SKIP_PATTERNS.some(re => re.test(p)) || (p.endsWith('.md') === false && !p.endsWith(path.sep) && path.extname(p) !== ''),
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 }
  });

  const queue = new Map();
  let flushing = false;
  async function flush() {
    if (flushing) return;
    flushing = true;
    try {
      while (queue.size > 0) {
        const [relPath, kind] = queue.entries().next().value;
        queue.delete(relPath);
        try {
          await reindexFile(relPath);
          if (onEvent) onEvent({ kind, path: relPath });
        } catch (err) {
          console.error(`[watcher] reindex failed for ${relPath}:`, err.message);
        }
      }
    } finally {
      flushing = false;
    }
  }

  function enqueue(absPath, kind) {
    if (!absPath.endsWith('.md')) return;
    const relPath = path.relative(VAULT_ROOT, absPath).replaceAll('\\', '/');
    queue.set(relPath, kind);
    setTimeout(flush, 50);
  }

  watcher
    .on('add',    p => enqueue(p, 'add'))
    .on('change', p => enqueue(p, 'change'))
    .on('unlink', p => enqueue(p, 'unlink'))
    .on('error',  err => console.error('[watcher] error:', err));

  return watcher;
}
