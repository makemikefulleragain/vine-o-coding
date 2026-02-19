# Phase 2 Critique: Make It Useful

**Date:** 2026-02-14

---

## Confidence Score: 85/100

### What works well (+)
- **Multi-grant list view** — Clean card-based UI with progress bars, deadline indicators, spend percentage. Gives a useful at-a-glance overview.
- **Zero schema changes** — The Phase 1 normalized schema already supported multi-grant. This phase was pure UI/logic, reducing risk.
- **Narrative guidance** — Structured prompts directly address the top 5 acquittal red flags identified in research. This is a genuine differentiator vs Excel.
- **Backward compatibility** — Legacy single-grant localStorage data and plain-text narratives are automatically migrated.
- **JSON export** — Addresses data sovereignty (Constitution Principle #5) with minimal code.

### What could be better (-)
- **No edit-in-place on grant list** — Users must click into a grant to edit details. Minor friction.
- **Narrative stored as JSON string** — The `narrative` field in the database now contains JSON instead of plain text. This is fine for the app but makes raw database queries slightly harder to read.
- **No grant archiving** — Only delete, no "archive completed grant" option. Deleting is destructive.
- **No confirmation on navigate-away** — If user has unsaved changes and clicks "Back to Grants," the debounced save handles it, but there's no explicit "are you sure?" prompt.
- **Grant list not sortable/filterable** — With 2-5 grants this is fine, but won't scale to 10+.

### Risks
- **State management complexity** — Going from single-grant to multi-grant state increased the component tree depth. The `updateGrant` callback pattern works but could become unwieldy if more nested updates are needed.
- **Debounced save race conditions** — If user rapidly switches between grants and edits, the 800ms debounce + async save could theoretically cause a stale-state save. Mitigated by clearing the timer on each grants change, but not formally tested.
- **Print styling** — The narrative section uses `no-print` / `print-only` classes. Not tested with actual print. The structured prompt labels may not render ideally in all browsers' print stylesheets.

### Score breakdown
| Criterion | Score | Notes |
|-----------|-------|-------|
| Meets acceptance criteria | 9/10 | All 9 criteria met |
| Code quality | 8/10 | Clean but complex state management |
| Backward compatibility | 9/10 | Automatic migration for both storage modes |
| UX quality | 8/10 | Good but no archive, no sort/filter |
| Risk level | 8/10 | Low risk, no schema changes |
| Research quality | 9/10 | Multiple sources, concrete findings |
| **Overall** | **85/100** | |

---

## What Phase 3 Should Consider

Based on Phase 2 research and build:

1. **CSV import from bank statements** — Deferred from Phase 2. High value for reducing data entry. Complex due to bank format variation.
2. **Grant archiving** — Non-destructive way to hide completed grants.
3. **User accounts** — Move beyond anonymous auth so users can access data across devices/browsers intentionally.
4. **Privacy policy + about page** — Trust signals for volunteer treasurers.
5. **Print stylesheet improvements** — Ensure the structured narrative prints well.
