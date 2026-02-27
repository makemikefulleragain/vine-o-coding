# Review & Reflect — HitLoop Research Engine

**Date:** 2026-02-27
**Trigger:** Bug took >2 attempts to isolate (research-engine 500 Internal Error)

---

## What happened?

The `research-engine.mjs` Netlify function returned `500 Internal Error` (plain text, not JSON) on every HTTP POST trigger attempt. Four consecutive failures with different Netlify error IDs. The test script crashed trying to parse non-JSON response.

**Sequence of attempted fixes:**
1. Added diagnostic try/catch wrapper inside handler — still 500 (crash was before handler ran)
2. Forced clean rebuild with `--skip-functions-cache` — still 500
3. Made initialization lazy — still 500 (crash was at platform level, not module init)

## What was the root cause?

**Netlify scheduled functions (with `export const config = { schedule: '...' }`) cannot be invoked via direct HTTP POST.** They are cron-only. Testing rss-scheduler via HTTP confirmed the same 500 error — this was a platform limitation, not a code bug.

Secondary issue: even after removing the schedule config, the function needed more than 10 seconds (Netlify's sync function timeout) to complete multiple Claude API calls. A 504 Inactivity Timeout confirmed this.

## Why did we miss it?

- Assumed scheduled functions were also HTTP-invocable (they aren't on Netlify)
- No local smoke test before deploying — went straight to production trigger
- The Netlify docs are ambiguous on this point

## What did we change?

Split the single `research-engine.mjs` into two functions:
1. **`research-engine-background.mjs`** — Regular HTTP function with `-background` suffix (15-min timeout). Contains all HitLoop logic. Auth via `x-ingest-secret` header.
2. **`hitloop-scheduler.mjs`** — Thin cron wrapper (scheduled at `0 19 * * *`). Calls research-engine-background via HTTP POST. Same pattern as `rss-scheduler` → `signal-ingest`.

Updated `netlify.toml` to schedule `hitloop-scheduler` instead of `research-engine`.

## What will we do differently?

1. **Never assume scheduled functions are HTTP-invocable.** Always use the scheduler → regular function pattern.
2. **Use `-background` suffix naming convention** for any function that may exceed 10 seconds (the `config.type` approach didn't work).
3. **Test platform limitations before writing application logic** — smoke-test the invocation method first.

## Result

- `research-engine-background` returns 202 immediately on HTTP trigger
- 2/3 seeded topics completed successfully (digital-tools+workforce: 7.94, funding+governance: 7.94)
- HitLoop is operational
