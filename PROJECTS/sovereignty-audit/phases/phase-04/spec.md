# Phase 4 Spec — Content & Growth

**Date:** 2026-02-17

---

## Acceptance Criteria

### Shareable Results
1. Results page has a "Share Your Results" section below scores
2. "Copy Summary" button generates plain-text summary and copies to clipboard
3. "Share" button uses Web Share API (on supported browsers) to share text
4. Text summary includes: overall score, stage name, per-dimension scores/statuses
5. Summary includes link back to the audit tool

### Print-Friendly Results  
6. `@media print` CSS hides: header, footer, navigation, share buttons
7. Print view shows: scores, dimension breakdown, recommendations cleanly
8. Ctrl+P from results page produces board-ready output

### Insights Page
9. `/insights` page with seed content
10. 2-3 case study summaries (local government, The Pack Music Australia, micro-NFPs)
11. "What we're seeing" section with sector trends
12. Content stored in data file for future CMS extraction
13. Navigation updated with Insights link

### Non-Regression
14. Build succeeds
15. All existing routes work unchanged

---

## Technical Design

### New Files
```
src/components/Insights.jsx     — Content/insights page
src/data/content.js             — Seed content data
src/components/ShareResults.jsx — Share/copy buttons for results
```

### Updated Files
- `src/index.css` — add @media print styles
- `src/App.jsx` — add Insights route
- `src/components/Layout.jsx` — add Insights nav link
- `src/components/Results.jsx` — integrate ShareResults component
