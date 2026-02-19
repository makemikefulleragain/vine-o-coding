# Phase 2 Research: Make It Useful

**Date:** 2026-02-14
**Searches used:** 5/5

---

## Research Question
What's missing for a volunteer treasurer to choose this tool over Excel? What single feature addition would deliver the most value per acquittal cycle?

---

## Finding 1: Multi-Grant Management Is the #1 Gap

**Sources:** Asana grant management guide, NetSuite best practices, Givebutter nonprofit guide

Every grant management resource assumes organisations manage multiple grants simultaneously. Small Australian nonprofits typically hold 2-5 active grants at once (e.g., one from Lotterywest, one from a local council, one from a federal program). Our tool currently handles exactly one grant — this is the most obvious gap vs Excel, which naturally handles multiple sheets.

**Impact:** Without multi-grant, the tool is unusable for any org with more than one active grant. This affects the majority of our target users.

## Finding 2: Acquittal Red Flags Reveal Feature Opportunities

**Source:** Good Grants — "The grantmaker's guide to grant acquittal red flags"

Top 5 red flags funders look for in acquittals:
1. **Budget inconsistencies** — numbers don't align with approved budgets, no breakdown
2. **Vague language and reporting** — "the event went well" without specifics
3. **Timeline gaps** — missing dates, condensed timelines without context
4. **Impact without evidence** — broad claims with no measurement
5. **No reflection or learnings** — only success, no challenges mentioned

**Our tool already addresses #1** (budget vs actual tracking). It partially addresses #2 (narrative section exists but has no guidance). It does NOT address #3-5 at all.

**High-value opportunity:** Add structured prompts/guidance to the narrative section that help treasurers avoid these red flags. This is low-effort, high-impact — it doesn't require new schema, just better UX in the report tab.

## Finding 3: Receipt/Invoice Requirements Are Strict

**Source:** Queensland GCBF acquittal guidelines

Acquittal receipts must:
- Be for approved items only
- Be dated on or after the grant approval date
- Be issued in the org's name
- Describe items bought or services received
- Show contractor license numbers where applicable
- If >15 receipts, an independent audit is required

**Our tool tracks receipt references but doesn't validate dates against grant periods or flag potential issues.** Adding date validation ("this expense is before your grant start date") would be a small but valuable addition.

## Finding 4: The Excel-to-Tool Switching Cost

**Sources:** Galaxy Digital (volunteer management), Reddit r/volunteer

The main reasons volunteer organisations stick with Excel:
- **Familiarity** — everyone knows how to use a spreadsheet
- **Flexibility** — can adapt to any funder's format
- **Import/export** — can paste bank statement data
- **Sharing** — can email a file to the committee

**To beat Excel, we need:** (a) less effort per acquittal than Excel, (b) better output than Excel, (c) import capability so they don't re-type data.

## Finding 5: CSV Import Would Save Hours

Bank statement CSV import is the single most time-saving feature for a treasurer who currently reconciles manually. Most Australian banks (CBA, ANZ, Westpac, NAB) export CSVs with date, description, amount columns. If the tool could import a CSV and let the user categorise expenses, it would eliminate the most tedious part of the workflow.

However, CSV formats vary between banks, and the categorisation step requires human judgment.

---

## Candidate Features (Ranked by Value-per-Effort)

| Feature | Value | Effort | Score |
|---------|-------|--------|-------|
| Multi-grant management | Critical | Medium | **1st** |
| Narrative guidance (red flag prevention) | High | Low | **2nd** |
| Data export (JSON backup) | Medium | Low | **3rd** |
| CSV expense import | High | Medium | 4th |
| Date validation warnings | Medium | Low | 5th |
| Receipt file upload | Medium | High | 6th |

---

## Key Decision for Triage

Multi-grant management is clearly the highest priority — it's a hard blocker for real use. But we could pair it with narrative guidance (very low effort) in the same phase since they're independent features.
