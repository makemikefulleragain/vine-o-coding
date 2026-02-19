# Phase 1 → Phase 2: What Should Come Next

**Date:** 2026-02-14

---

## Recommendation: Phase 2 Should Focus on "Make It Useful"

The original Phase 2 goal — "Research what's missing for actual nonprofit use and build the highest-value addition" — remains correct. Phase 1 established the persistence layer. Now the tool needs features that make it worth choosing over a spreadsheet.

## Research Signals from Phase 1

During Phase 1 research, several patterns emerged that should inform Phase 2:

1. **Multi-grant management** — Most small orgs manage 2-5 grants simultaneously. The current single-grant model is a significant limitation. The normalized schema was designed specifically to support this.

2. **CSV import from bank statements** — Volunteer treasurers often reconcile bank statements against grant expenses. Importing CSV from a bank could eliminate hours of manual data entry.

3. **Data export** — Users in cloud mode need a way to export their raw data (not just the printed report). JSON export, CSV export of expenses, or full data download.

4. **Funder-specific templates** — Different funders have different acquittal templates. Research should determine whether template variations are significant enough to warrant building.

## What Phase 2 Should Research

- What do treasurers actually do between "we got the grant" and "we submitted the acquittal"? Map the workflow.
- Which of the above features would save the most time per acquittal cycle?
- Are there common mistakes or pain points in the acquittal process that software could prevent?
- What would make someone switch from their current Excel/paper process?

## Phase Queue Impact

No changes recommended to the queue order. Phase 2 (Make It Useful) → Phase 3 (Make It Trustworthy) → Phase 4 (Make It Findable) remains the right sequence. Usefulness before trust marketing.

## Dependencies

Phase 2 can proceed immediately. It does not depend on the human completing the Phase 1 actions (migrations + anonymous auth), because:
- Phase 2 is primarily research + feature development
- The schema can be extended in Phase 2 migrations
- New features work in both cloud and localStorage modes
