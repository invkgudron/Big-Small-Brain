import Database from 'better-sqlite3';
import path from 'node:path';

const db = new Database(path.resolve(import.meta.dirname, '..', 'data', 'vault.sqlite'));
const total = db.prepare('SELECT COUNT(*) as n FROM files').get().n;
const withFm = db.prepare('SELECT COUNT(*) as n FROM files WHERE has_frontmatter=1').get().n;
const complete = db.prepare('SELECT COUNT(*) as n FROM files WHERE frontmatter_complete=1').get().n;
const byFolder = db.prepare('SELECT folder, COUNT(*) as n FROM files GROUP BY folder ORDER BY n DESC').all();
const byType = db.prepare("SELECT COALESCE(type, '(missing)') as type, COUNT(*) as n FROM files GROUP BY type ORDER BY n DESC").all();
const entities = db.prepare('SELECT entity_type, COUNT(*) as n FROM entities GROUP BY entity_type ORDER BY n DESC').all();
const topMentions = db.prepare(`
  SELECT e.entity_id, e.entity_type, COUNT(em.path) as mentions
  FROM entities e LEFT JOIN entity_mentions em ON em.entity_id=e.entity_id
  GROUP BY e.entity_id ORDER BY mentions DESC LIMIT 10
`).all();
const issuesByCode = db.prepare('SELECT code, COUNT(*) as n FROM issues GROUP BY code ORDER BY n DESC').all();

console.log('=== Vault Index Summary ===');
console.log(`Total files: ${total}`);
console.log(`With frontmatter: ${withFm} (${Math.round(100*withFm/total)}%)`);
console.log(`Frontmatter complete: ${complete} (${Math.round(100*complete/total)}%)`);
console.log('\nBy folder:'); console.table(byFolder);
console.log('\nBy type:'); console.table(byType);
console.log('\nEntities by type:'); console.table(entities);
console.log('\nTop 10 mentioned entities:'); console.table(topMentions);
console.log('\nIssues by code:'); console.table(issuesByCode);
db.close();
