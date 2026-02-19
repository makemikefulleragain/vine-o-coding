# Phase 1 Triage: Make It Real

**Date:** 2026-02-14

---

## Decision 1: Normalized Schema (Option B)

**Choose normalized tables over JSON blob.**

Reasoning:
- Phase 2 will likely involve multi-grant management — normalized schema makes this trivial
- CSV import/export maps cleanly to relational tables
- Supabase's RLS works per-table, giving finer-grained security
- The extra implementation cost is ~30 minutes, but saves hours of migration later
- A volunteer treasurer's mental model is already relational: "I have a grant, it has categories, each category has expenses"

## Decision 2: Anonymous Auth First, No Login Required

**Use Supabase anonymous sign-in. No email/password required in Phase 1.**

Reasoning:
- Constitutional principle #1: serve the volunteer treasurer's Saturday afternoon
- Asking someone to create an account before they can even try the tool is a conversion killer
- Anonymous auth gives us RLS protection and a clean upgrade path to real accounts (Phase 3)
- The human must enable anonymous sign-ins in Supabase dashboard (HUMAN_ACTION needed)

## Decision 3: Graceful Fallback to localStorage

**If Supabase connection fails, fall back to localStorage mode with a visible indicator.**

Reasoning:
- Progressive enhancement: the tool should never be worse than it was before
- Some users may be offline or have connectivity issues
- Shows a banner: "Working in offline mode — data saved to this browser only"
- When connection restores, we don't auto-sync (too complex for Phase 1), but the tool stays usable

## Decision 4: One-Time localStorage Migration

**On first Supabase connection, offer to migrate existing localStorage data.**

Reasoning:
- Anyone who used the demo may have entered real data
- Losing that data would violate trust
- Simple flow: detect localStorage data → migrate to Supabase → clear localStorage → show success message
- If migration fails, keep localStorage data intact and show error

## Decision 5: Phase Goal Validation

**The phase goal is correct as stated.** The research confirms:
- Data persistence is the #1 blocker to real use
- Anonymous auth is the right entry point
- The existing UI and report format already meet acquittal requirements
- No existing tool serves this specific niche (localStorage→Supabase for grant acquittals)

## What NOT to Build

- No email/password auth (Phase 3)
- No multi-grant management (Phase 2)
- No receipt file uploads (Phase 2+)
- No real-time sync across tabs (unnecessary complexity)
- No data encryption at rest beyond Supabase defaults (Phase 3 concern)

## Integration Check

Nothing to integrate with for this phase. This is pure infrastructure. Future phases may integrate with Xero CSV export, but that's not relevant here.

## Risk

- **Anonymous users who clear browser data lose everything.** This is acceptable for Phase 1 because: (a) it's the same as the current localStorage behavior, (b) we'll add accounts in Phase 3, (c) the tool prominently warns about this.
