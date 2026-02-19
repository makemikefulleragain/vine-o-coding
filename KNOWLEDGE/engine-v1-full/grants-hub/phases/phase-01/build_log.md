# Phase 1 Build Log: Make It Real

**Date:** 2026-02-14

---

## What Was Built

### 1. Supabase Integration Layer (`site/index.html`)

**New code added (top of script block):**
- Supabase client initialization with config detection
- `SUPABASE_CONFIGURED` flag checks for valid URL + anon key
- `sbLoadGrant(userId)` — loads grant + categories + expenses from normalized tables
- `sbSaveGrant(userId, grant)` — syncs full grant state to Supabase with upsert logic
- Updated `genId()` to prefer `crypto.randomUUID()` for proper UUID generation

**App component changes:**
- New state: `storageMode` (loading/cloud/local), `saveStatus`, `migrating`, `toast`
- Initialization flow: getSession → signInAnonymously → load data → detect localStorage migration
- Debounced save (800ms) on every grant state change
- Always saves to localStorage as backup, regardless of mode
- Loading screen while initializing
- Storage mode indicator (☁️ Cloud / 💾 Browser only) in header
- Save status indicator (Saving.../✓ Saved/⚠ Save failed)
- Toast notification system for migration success/errors
- Browser-only mode warning banner

**ReportTab changes:**
- Now accepts `setGrant` prop
- Narrative syncs to grant state `onBlur` so it persists to Supabase

### 2. Database Migrations (`phases/phase-01/migrations/`)

**001_create_tables.sql:**
- `grants` table — user_id, funder, grant_name, amount, deadline, narrative, timestamps
- `budget_categories` table — grant_id (CASCADE), name, budgeted, sort_order
- `expenses` table — grant_id (CASCADE), category_id (SET NULL), date, description, amount, receipt_ref
- Indexes on foreign keys
- Auto-update trigger for `grants.updated_at`
- Rollback SQL included

**002_add_rls.sql:**
- RLS enabled on all three tables
- 12 policies total (SELECT/INSERT/UPDATE/DELETE × 3 tables)
- Categories and expenses check ownership through grant_id → grants.user_id join
- Rollback SQL included

### 3. localStorage Migration

- Detects existing `gah_grant` key in localStorage
- Maps old base36 IDs to new UUIDs
- Remaps expense `catId` references to new category UUIDs
- Sets `gah_migrated` flag to prevent re-migration
- Shows success toast on completion
- Falls back to localStorage if migration fails

### 4. CDN Dependency Added

- `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` added to `<head>`

## What Was NOT Changed

- All existing UI components (SetupTab, ExpensesTab, DashboardTab, StatCard) — unchanged
- Print CSS — unchanged
- Report format — unchanged
- Tailwind, React, Babel CDN references — unchanged

## Testing Notes

- Local server started at localhost:8080
- Site loads in browser-only mode (Supabase tables not yet created)
- All tabs render correctly
- Storage indicator shows "💾 Browser only" when Supabase tables don't exist yet
- **Full cloud testing blocked on human actions** (enable anonymous auth, run migrations)

## Known Limitations

- Debounced save means rapid changes within 800ms are batched (by design)
- Narrative only syncs on blur, not on every keystroke (to avoid excessive saves)
- No offline→online sync — if you start in local mode, you stay in local mode for that session
- Category/expense sync does N+1 queries (acceptable for small datasets, would need optimization for large ones)
