# Phase 2a Build Log: Make It Buildable

**Date:** 2026-02-14

---

## What Was Built

### 1. Vite Build System
- React 19 + Vite 7 + @vitejs/plugin-react
- Tailwind CSS 3 via PostCSS (replaces CDN play script)
- ES module imports replace CDN script tags + Babel standalone
- `npm run build` → `dist/` folder (deployable artifact)
- `npm run dev` → HMR dev server on localhost:5173

### 2. Component Architecture
Monolithic `site/index.html` (916 lines) decomposed into:
- `src/main.jsx` — entry point
- `src/App.jsx` — main app (state, auth, storage logic)
- `src/lib/supabase.js` — Supabase client via `import { createClient }`
- `src/lib/storage.js` — localStorage helpers, genId, EMPTY_GRANT
- `src/lib/db.js` — Supabase data operations (sbLoadGrant, sbSaveGrant)
- `src/components/SetupTab.jsx`
- `src/components/ExpensesTab.jsx`
- `src/components/DashboardTab.jsx`
- `src/components/ReportTab.jsx`
- `src/components/StatCard.jsx`

### 3. Supabase CLI
- Installed as dev dependency (v2.76.8)
- `supabase init` completed — `supabase/` config directory created
- Enables local development and testing against Supabase

### 4. Environment Configuration
- `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Replaces `site/config.js` global window variables
- `.gitignore` excludes `.env`, `node_modules/`, `dist/`, `.supabase/`

### 5. Automated Smoke Test (8 tests)
- **Supabase client** — verifies import-based client initializes (the exact failure point from Phase 2)
- **Supabase auth integration** — anonymous sign-in against real Supabase (485ms round-trip)
- **App render** — React mounts without crashing
- **Storage mode** — detects Cloud mode after auth
- **Storage helpers** — genId uniqueness, localStorage round-trip, EMPTY_GRANT shape
- Run via `npm run smoke`

## Root Cause Resolution

The Phase 2 failure was caused by Babel standalone executing compiled scripts before the Supabase UMD bundle was available on `window`. With Vite:
- `import { createClient } from '@supabase/supabase-js'` is resolved at build time
- No runtime dependency on script loading order
- No `window.supabase` global needed
- Supabase client is guaranteed available when any module imports it

## Testing Notes

- `npm run smoke` — 8/8 tests pass
- `npm run build` — 75 modules, 0 errors, 5.3s
- Dev server verified by human: Cloud mode active, data persists across sessions

## UAT Result

**PASS** — User confirmed: "its there its cloud it looks like it works ... data copies across"
