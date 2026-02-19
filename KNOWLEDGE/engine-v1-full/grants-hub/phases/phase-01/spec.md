# Phase 1 Spec: Make It Real

**Date:** 2026-02-14

---

## Acceptance Criteria

1. **Data persists across browser sessions** — User closes browser, reopens, data is still there
2. **Data persists across devices** — User opens on phone, sees same data (when logged in via anonymous session on same browser)
3. **Existing localStorage data is migrated** — Users who have demo data don't lose it
4. **Fallback to localStorage** — If Supabase is unreachable, app works in offline/demo mode
5. **Visual indicator of storage mode** — User knows whether data is saved to cloud or browser-only
6. **No account creation required** — Tool works immediately on first visit
7. **Site remains fully functional** — All existing features (setup, expenses, dashboard, report) work exactly as before
8. **Printable report still works** — Print CSS unaffected

---

## Database Schema

### Table: `grants`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK to auth.users, NOT NULL |
| funder | text | |
| grant_name | text | |
| amount | numeric(12,2) | default 0 |
| deadline | date | nullable |
| narrative | text | default '' |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### Table: `budget_categories`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| grant_id | uuid | FK to grants.id ON DELETE CASCADE |
| name | text | |
| budgeted | numeric(12,2) | default 0 |
| sort_order | integer | default 0 |
| created_at | timestamptz | default now() |

### Table: `expenses`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| grant_id | uuid | FK to grants.id ON DELETE CASCADE |
| category_id | uuid | FK to budget_categories.id ON DELETE SET NULL |
| date | date | |
| description | text | |
| amount | numeric(12,2) | default 0 |
| receipt_ref | text | default '' |
| created_at | timestamptz | default now() |

### RLS Policies

All three tables:
- `SELECT`: `auth.uid() = user_id` (grants) or via join to grants
- `INSERT`: `auth.uid() = user_id` (grants) or user owns the parent grant
- `UPDATE`: same as SELECT
- `DELETE`: same as SELECT

For `budget_categories` and `expenses`, RLS checks ownership through the `grant_id` → `grants.user_id` chain.

---

## Technical Design

### App Initialization Flow
```
1. App loads
2. Check if Supabase config is present (URL + anon key both non-empty)
3. If yes → Initialize Supabase client
4. Attempt signInAnonymously() or getSession() for existing session
5. If session obtained:
   a. Check localStorage for existing data (gah_grant key)
   b. If found → Show migration prompt → Migrate → Clear localStorage
   c. Load data from Supabase
   d. Show "☁️ Cloud" indicator
6. If Supabase unavailable or config missing:
   a. Fall back to localStorage
   b. Show "💾 Browser only" indicator
```

### Data Operations
- **Save:** Debounced writes to Supabase (500ms after last change) to avoid excessive API calls
- **Load:** Single fetch on app init, then work with in-memory state
- **Error handling:** If a Supabase write fails, show toast notification, keep in-memory state, retry on next change

### UI Changes
- **Storage indicator** in header: cloud icon (Supabase) or disk icon (localStorage)
- **Migration banner** when localStorage data detected with active Supabase session
- **Error toast** for failed saves (non-blocking)
- **No other UI changes** — all existing functionality preserved

### Key Implementation Details
- Supabase JS v2 loaded from CDN: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- Client initialized once, stored in a React ref
- `useEffect` hooks handle load/save lifecycle
- Grant state still managed via React useState — Supabase is the persistence layer, not the state manager
- IDs transition from `genId()` (base36 timestamps) to UUIDs from Supabase

---

## Migration SQL

See `migrations/001_create_tables.sql` and `migrations/002_add_rls.sql`

---

## Human Actions Required

1. Enable Anonymous Sign-Ins in Supabase dashboard
2. Run SQL migrations in Supabase SQL editor
3. Deploy updated site/ folder to Netlify

Details in `HUMAN_ACTION.md`
