# Phase 2 Triage: Make It Useful

**Date:** 2026-02-14

---

## Decision 1: Build Multi-Grant Management

**This is the #1 priority.** Without it, the tool is unusable for most real nonprofits who manage 2-5 grants simultaneously. This is a hard blocker — no amount of polish on a single-grant tool will make it competitive with a spreadsheet that naturally handles multiple tabs.

**What "multi-grant" means for Phase 2:**
- A grant list/selector view showing all grants
- Ability to create new grants, switch between them, archive completed ones
- Each grant has its own categories, expenses, narrative, and report
- The existing single-grant UI stays almost identical — we add a layer above it

## Decision 2: Add Narrative Guidance (Red Flag Prevention)

**Pair with multi-grant because it's low-effort, high-value, and independent.**

Research showed the top acquittal red flags are vague language, missing dates, and no reflection. We can add structured prompts to the narrative section that guide the treasurer to write a better acquittal narrative. This requires zero schema changes — just better UX in the report tab.

Prompts will include:
- What activities were delivered?
- How many people participated/benefited?
- Were there any challenges? How were they addressed?
- What would you do differently next time?

## Decision 3: Add JSON Data Export

**Quick win for data sovereignty.** Users should be able to download all their data as JSON. This is a constitutional requirement (Principle #5: sovereignty) and takes minimal effort. It also provides a backup mechanism independent of browser/cloud state.

## What NOT to Build in Phase 2

- **CSV import** — High value but complex (bank CSV format variation). Defer to Phase 3 or later.
- **Receipt file upload** — Requires Supabase Storage setup. Defer.
- **Date validation warnings** — Nice to have but not a blocker. Defer.
- **Funder-specific templates** — Needs more research on which funders have specific formats. Defer.

## Integration Check

No external integrations needed. Multi-grant is pure internal architecture. The normalized schema from Phase 1 already supports multiple grants per user — we just need the UI layer.

## Schema Impact

**No schema changes needed.** The Phase 1 schema already has `grants` table with `user_id` — it naturally supports multiple grants per user. We just need to update the app to load/display all grants instead of just the first one.

## Risk

- **UI complexity** — Going from "one screen" to "grant selector + grant detail" adds navigation. Must keep it simple for the volunteer treasurer who has 3 hours on a Saturday.
- **State management** — Switching between grants requires careful state handling to avoid data loss.
