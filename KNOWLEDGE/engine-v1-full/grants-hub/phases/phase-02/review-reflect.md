# Phase 2 — Review & Reflect

**Date:** 2026-02-14
**Trigger:** Bug took >5 attempts to fix; phase failed UAT after being marked complete

---

## What Happened

Phase 2 (Make It Useful) was built and marked complete with confidence score 85/100. Three features were added: multi-grant management, structured narrative guidance, and JSON data export. The code was correct in terms of React logic and data flow.

On deployment (Netlify drag-deploy), the site showed a blank page. Debugging revealed a cascade of issues:

1. **Blank page** — no visible error (production React swallows errors)
2. Switched to development React → revealed `Cannot read properties of null (reading 'createClient')`
3. Changed Supabase CDN URL from `cdn.jsdelivr.net` to `unpkg.com` UMD bundle → still "Browser only" mode
4. Added diagnostic script to test `window.supabase` → confirmed library loads and auth works in plain JS
5. But diagnostic's test client **raced** with the app's client, introducing a new bug
6. Removed diagnostics → still "Browser only"
7. Added `console.warn` tracing → revealed `window.supabase: false` inside Babel-compiled code
8. Reordered scripts (Supabase before Babel) → still `false`
9. Deferred client creation to `ensureSupabase()` inside async init → still showed "Browser only" in UAT

**Total attempts to fix:** 7+ across two sessions. Classic symptom-chasing.

## Root Cause

**Proximate cause:** Babel standalone compiles and executes `type="text/babel"` scripts in a timing context where `window.supabase` (set by the Supabase UMD bundle) is not yet available, despite the script tag appearing earlier in the HTML.

**Systemic cause:** The architecture (CDN scripts + Babel-in-browser + no build step) creates an untestable, timing-dependent execution environment. There is no way to:
- Write automated tests against this setup
- Guarantee script execution order
- Get compile-time error checking
- Verify Supabase connectivity without manual browser testing

**Why this wasn't caught in Phase 1:** Phase 1's build log explicitly states "Full cloud testing blocked on human actions." Cloud mode was never tested — the human hadn't yet enabled anonymous auth or run migrations. The Babel timing bug existed from Phase 1 but was invisible because Supabase was never configured.

## Why the Normal Flow Didn't Catch It

1. **No smoke test.** The phase loop says "test the site after building" but doesn't define what "test" means. Testing was "open it and click through" — which only verified browser-only mode.

2. **No cloud integration test.** There was no way to verify Supabase connectivity without the human first completing setup actions. The phase was marked complete before end-to-end verification.

3. **No automated verification.** The CDN + Babel architecture makes automated testing impractical. You can't run headless tests against a page that depends on in-browser Babel compilation.

4. **Confidence score didn't capture infrastructure risk.** The 85/100 score evaluated features and code quality but not delivery infrastructure reliability.

## Process Changes Needed

### Testing
- Every phase must define a **testable acceptance checklist** before building
- Cloud integration must be **testable locally** (Supabase CLI)
- A **smoke test script** must exist and pass before marking any phase complete

### Architecture
- Migrate from CDN + Babel-in-browser to a **build tool** (Vite)
- This eliminates the entire class of script-timing bugs
- Enables `import` statements, compile-time checking, and automated testing
- The `site/` folder remains the deployable artifact (Vite builds to it)

### Phase Structure
- Insert **Phase 2a: Make It Buildable** before re-implementing Phase 2 features
- Phase 2a: Vite + Supabase CLI + smoke test
- Phase 2b: Re-implement multi-grant + narrative + JSON export on new foundation

### Constitution Amendment
- Remove "No npm, no webpack, no build tools" constraint
- Replace with: "The `site/` folder (or build output to `dist/`) IS the deployable artifact. Build tools are permitted when evidence shows they prevent a class of bugs."

## Reset Point

- **Code:** Revert `site/index.html` to Phase 1 state (single-grant, browser-only verified working)
- **Preserve:** All Phase 2 documentation (research.md, triage.md, spec.md, critique.md) — the analysis and design are valid
- **Preserve:** Phase 2 code as reference in `phases/phase-02/` for re-implementation
- **Update:** STATE.md, PHASE_QUEUE.md to reflect reset

---

## Irony Log

The root cause was Babel standalone — an in-browser JavaScript compiler — failing to correctly time the execution of scripts from a "Tower of Babel" of CDN dependencies. The metaphor writes itself.
