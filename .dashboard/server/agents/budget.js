// Rolling 5-hour budget ledger. 10% of 300 min = 30 min per window.
// Before a run spawns, we check: rolling_used_minutes + run.max_runtime_min <= BUDGET_MIN.
// On run completion, we write a budget_event with actual minutes consumed.

export const WINDOW_MS = 5 * 60 * 60 * 1000;   // 5 hours
export const BUDGET_MIN = 30;                   // 10% of 5h = 30 min

export function getRollingUsage(db, now = Date.now()) {
  const since = now - WINDOW_MS;
  const row = db.prepare(`
    SELECT
      COALESCE(SUM(minutes_used), 0) as minutes,
      COALESCE(SUM(tokens_used), 0) as tokens,
      COUNT(*) as events
    FROM budget_events WHERE window_ts >= ?
  `).get(since);
  return {
    minutesUsed: Number(row.minutes) || 0,
    tokensUsed: Number(row.tokens) || 0,
    events: row.events,
    budgetMin: BUDGET_MIN,
    remainingMin: Math.max(0, BUDGET_MIN - (Number(row.minutes) || 0)),
    windowStartMs: since
  };
}

export function canSpawn(db, maxRuntimeSec, now = Date.now()) {
  const usage = getRollingUsage(db, now);
  const projectedMin = usage.minutesUsed + (maxRuntimeSec / 60);
  return {
    allowed: projectedMin <= BUDGET_MIN,
    usage,
    projectedMin,
    reason: projectedMin <= BUDGET_MIN ? null
      : `Rolling window already used ${usage.minutesUsed.toFixed(1)} min; adding ${(maxRuntimeSec/60).toFixed(1)} min would exceed the ${BUDGET_MIN} min cap.`
  };
}

export function recordUsage(db, { runId, agent, startedAt, endedAt, tokensUsed = 0 }) {
  const minutes = Math.max(0, (endedAt - startedAt) / 60000);
  db.prepare(`
    INSERT INTO budget_events(run_id, agent, window_ts, minutes_used, tokens_used)
    VALUES (?, ?, ?, ?, ?)
  `).run(runId, agent, endedAt, minutes, tokensUsed);
  return { minutes, tokensUsed };
}
