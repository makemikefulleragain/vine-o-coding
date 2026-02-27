# Review & Reflect — Pattern Detection Pipeline
**Date:** 2026-02-28
**Trigger:** Bug took 3+ attempts. Phase failed UAT after being marked complete.

---

## What happened?
1. 50 signals approved in Sector Pulse. "Detect patterns" pressed. UI showed "Detection failed: Failed to fetch".
2. Console: `No 'Access-Control-Allow-Origin' header` + `504 Gateway Timeout` on POST to `pattern-detect.mjs`.
3. Fix attempt 1: Corrected table/column name mismatch (`community_signals` → `sector_signals`, `need_summary` → `summary`). Logic was correct but didn't fix the timeout.
4. Fix attempt 2: Diagnosed CORS — OPTIONS preflight passes. The 504 causes Netlify's gateway to return the error without CORS headers, so the browser reports it as CORS. AdBlock also independently blocks cross-origin POSTs.
5. Root confirmed: two separate failure modes, both architectural.

## Root cause
**Proximate:** `pattern-detect.mjs` is a regular Netlify function (10s limit). Processing 50 signals + sequential Claude API calls (1 grouping + 1 traceability per group ≈ 10-20 API calls) takes 2-5 minutes.

**Systemic:**
1. **Wrong function type for the workload.** Pattern detection was written as a regular function but requires background function execution time. The project already has `generate-thing-background.mjs` and `research-engine-background.mjs` — the pattern was established but not applied here.
2. **Cross-origin architecture with no proxy.** All community-signal calls from Kitchen Table are cross-origin (`coruscating-naiad` → `community-signal.netlify.app`). This makes them vulnerable to AdBlock (blocks cross-origin POSTs) and to CORS headers being absent on gateway-level errors (4xx/5xx from Netlify infrastructure, not the function itself).
3. **Tested only on local server.** Local = same origin, no timeout, no AdBlock. Deployment introduces both issues simultaneously.

## Why didn't normal flow catch it?
- No realistic volume test (50 signals). Previous tests used small datasets that completed within 10s.
- No AdBlock active during development testing.
- Phase was marked complete based on local server behaviour.
- No function execution time budget analysis before choosing function type.

## Process changes needed
1. **Rule:** Any function calling Claude more than twice must be a background function (`-background` suffix).
2. **Rule:** All Kitchen Table → community-signal calls must go through a same-origin proxy function (`cs-proxy.mjs`) in kitchen-table. Never direct cross-origin calls from browser.
3. **Rule:** Phase acceptance requires test with production data volume AND with AdBlock active.
4. Add to phase template: "What is the worst-case execution time? If >8s, use background function."

## Reset point
- Dual-table query fix in `pattern-detect.mjs` is correct — preserve it.
- Move detection logic to `pattern-detect-background.mjs`.
- Slim `pattern-detect.mjs` to GET-only (read patterns) + POST returns 202.
- Add `cs-proxy.mjs` to kitchen-table.
- Update all community-signal URL constants in `control.js` to use proxy.

## What the fix delivers
- Pattern detection runs as background function: 15-minute window, no timeout.
- All cross-origin calls proxied server-side: AdBlock cannot interfere.
- Secret management improves: COMMUNITY_SIGNAL_SECRET lives in kitchen-table env vars, never in browser localStorage.
