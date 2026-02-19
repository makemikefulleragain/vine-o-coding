# Phase 1 Research: Make It Real (localStorage → Supabase)

**Date:** 2026-02-14
**Searches used:** 5/5

---

## Research Question
How should we migrate the Community Grants Hub from localStorage to Supabase persistence, given that users are small nonprofit volunteers who shouldn't need to create accounts just to try the tool?

---

## Finding 1: Anonymous Sign-Ins Are the Right Pattern

**Source:** Supabase official docs (auth-anonymous)

Supabase provides `signInAnonymously()` which creates a real authenticated user without requiring email, password, or any PII. Key properties:

- Anonymous users get the `authenticated` Postgres role — RLS policies work normally
- JWTs include an `is_anonymous` claim to distinguish from permanent users
- Users can later **link** an email/password to convert to a permanent account
- Session persists in the browser — data survives page refreshes
- If browser data is cleared or user switches device, anonymous account is lost (unless they linked an identity)

**This is ideal for Phase 1.** The volunteer treasurer can start using the tool immediately without creating an account. In Phase 3 (Make It Trustworthy), we add optional account linking so they can access data across devices.

## Finding 2: localStorage Migration Pattern

**Source:** Dinesh S blog — real-world localStorage→Supabase migration

The recommended pattern:
1. On app load, check if localStorage has existing data
2. If yes, and user gets a Supabase session (anonymous or authenticated), migrate the data to Supabase
3. Store a migration flag to prevent re-migration
4. Clear localStorage data after successful migration
5. Lock the UI during migration to prevent data loss

For our case this is simpler because:
- We only have one key (`gah_grant`) in localStorage
- The data structure is a single JSON object
- We can do the migration in one insert operation
- No complex multi-table migration needed

## Finding 3: Non-Audited Acquittal Requirements (Australia)

**Source:** Community Grants Hub (communitygrants.gov.au), DSS

Non-audited financial acquittals must:
- Show income and expenditure for the grant
- Confirm funding was spent per the Grant Agreement
- **There is no specific format** — this is confirmed by both DSS and Community Grants Hub
- Must include: total grant amount, expenditure by category, and a declaration

**Our existing report template already meets these requirements.** The current report tab generates exactly what's needed. This validates the tool's core value proposition.

## Finding 4: Schema Design Considerations

For the Supabase schema, the simplest approach that preserves the current UX:

**Option A: Single JSON document per grant (simple)**
- One `grants` table with a JSONB column storing the full grant object
- Mirrors the current localStorage approach
- Easy to implement, easy to migrate
- Downside: No relational queries, harder to extend later

**Option B: Normalized tables (proper)**
- `grants` table (funder, name, amount, deadline, narrative)
- `budget_categories` table (grant_id, name, budgeted)
- `expenses` table (grant_id, category_id, date, description, amount, receipt)
- Proper relational model, easy to extend
- More work to implement but sets up for multi-grant, reporting, etc.

**Decision needed in triage:** Option A is faster to ship but creates technical debt. Option B is more work but aligns with future phases (multi-grant management, CSV import, etc.)

## Finding 5: RLS Policy Strategy

Without authentication (Phase 1 with anonymous auth):
- Each anonymous user gets a unique `auth.uid()`
- RLS policies can restrict data access to `auth.uid() = user_id`
- This means each browser session only sees its own data
- Anonymous users who clear browser data lose access permanently (acceptable for Phase 1)

---

## Key Decisions for Triage

1. **Anonymous auth vs no auth:** Anonymous auth is clearly better — gives us RLS and a path to real accounts later
2. **Schema: JSON blob vs normalized:** Needs triage decision
3. **localStorage migration:** Should offer one-time migration for any existing demo users
4. **Fallback mode:** Should the app still work in localStorage mode if Supabase is unreachable?
