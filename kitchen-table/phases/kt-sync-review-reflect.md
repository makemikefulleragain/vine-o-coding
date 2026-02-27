# Review & Reflect — Kitchen Table Cross-Device Sync

**Date:** 2026-02-27
**Trigger:** Bug took >3 attempts to isolate (sync not working across devices)

---

## What happened?

1. Built `kt-state.mjs` Netlify function with env var `SUPABASE_SERVICE_KEY`
2. Added env vars to kitchen-table Netlify site via dashboard — entered with empty values (wrong — dashboard form submitted blank)
3. Deployed — function returned `{"error":"Supabase env vars not configured"}` silently on every call; client fell back to localStorage on all devices
4. Diagnosed empty env vars via `netlify env:list` — confirmed `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` both blank
5. Fixed env var name mismatch: `SUPABASE_SERVICE_KEY` → `SUPABASE_SERVICE_ROLE_KEY` (to match community-signal pattern)
6. Attempted to set env vars via CLI — ran commands from `community-signal` directory, not `kitchen-table` — set vars on wrong site
7. Finally ran CLI commands from correct `kitchen-table` directory → both vars set correctly → function returned `{}` (empty but working) → POST/GET round-trip confirmed

---

## Root cause

Two compounding failures:
1. **Wrong env var name** — coded `SUPABASE_SERVICE_KEY`, existing pattern uses `SUPABASE_SERVICE_ROLE_KEY`
2. **Env vars set on wrong Netlify site** — CLI `netlify env:set` targets whichever site the current directory is linked to; running from `community-signal/` targeted community-signal, not kitchen-table

---

## Why didn't normal flow catch it?

- No pre-deploy smoke test for the function (`curl`/`node fetch` against live URL)
- Silent fallback to localStorage masked the failure — UI looked correct, just not syncing
- No verification step: "does the function actually return data?" before declaring it working
- Env var setup was manual (dashboard) with no confirmation step

---

## Process changes needed

1. **Always smoke-test new Netlify functions immediately after deploy** — run `node -e "fetch(...).then(r=>r.text()).then(console.log)"` before declaring done
2. **Always confirm correct CWD before `netlify env:set`** — check `netlify status` to confirm which site is linked
3. **Env var names: use `SUPABASE_SERVICE_ROLE_KEY` consistently** — document in project memory
4. **Never use dashboard to set env vars** — CLI only, with `--force` flag, with confirmation echo

---

## Reset point

Code was correct from deploy 3 onward. No revert needed. The fix was purely operational (correct env vars on correct site).

---

## What is now confirmed working

- `GET /.netlify/functions/kt-state` → returns Supabase row
- `POST /.netlify/functions/kt-state` with JSON patch → upserts to Supabase
- Full round-trip verified via Node.js test
- Tasks, safety, gaps, journal, entities, MTD, Waymaker history all sync on every save
- localStorage used as fast initial render + offline fallback only
