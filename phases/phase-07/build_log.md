# Phase 7 Build Log — Make It Rich & Shareable

**Date:** 2026-02-15
**Build attempt:** 1 of 3
**Trigger:** Round 3 UAT feedback (3 items)

---

## UAT Feedback Addressed

| # | Feedback | Type | Fix |
|---|---|---|---|
| 1 | Deep dive cards hide lessons + links in expandable | UX | Restructured: lessons + further reading always visible, only full analysis in expandable |
| 2 | Expanded content is "wall of text" | Design | Magazine-style: subheadings, pull-quote boxes (indigo border), structured rich content blocks |
| 3 | This website IS a case study — include it | Feature | New "How this site was built" section with 7-phase emerald timeline + meta callout |

## New Files Created

| File | Purpose |
|---|---|
| `src/lib/vineTimelineData.js` | Phase data for vine-o-coding's own development timeline (7 phases) |

## Files Modified

| File | Change |
|---|---|
| `src/components/DeepDives.jsx` | Major refactor: data restructured (lesson field, rich brian blocks), new RichBlock renderer, visible lessons + links, expandable full analysis with headings + pullquotes |
| `src/pages/CaseStudy.jsx` | Added vine-o-coding live case study section with emerald timeline between DeepDives and MethodologySummary |

## Build Output
```
dist/index.html                   2.56 kB │ gzip:   0.92 kB
dist/assets/index-BST7Dhoc.css   39.19 kB │ gzip:   7.34 kB
dist/assets/index-DWS4HeXx.js   449.23 kB │ gzip: 137.33 kB
✓ built in 10.13s
```

0 errors, 0 warnings. 1635 modules.

### Bundle Size Progression
| Phase | JS (raw) | JS (gzip) | CSS (gzip) |
|---|---|---|---|
| Phase 1 | 244 KB | 77 KB | 4.8 KB |
| Phase 2 | 392 KB | 122 KB | 5.9 KB |
| Phase 3 | 417 KB | 130 KB | 6.2 KB |
| Phase 4 | 417 KB | 130 KB | 6.2 KB |
| Phase 5 | 426 KB | 132 KB | 6.5 KB |
| Phase 6 | 443 KB | 136 KB | 7.1 KB |
| Phase 7 | 449 KB | 137 KB | 7.3 KB |

Phase 7 added 6KB raw / 1KB gzip. No new dependencies.

## Design Decisions

1. **Lesson field extracted from brian content** — 1-2 sentence takeaway per dive, surfaced in a "Key lesson" box that's always visible. Reduces cognitive load.
2. **RichBlock component** — renders `paragraph`, `heading`, or `pullquote` types. Keeps data declarative, rendering flexible.
3. **Pull-quote styling** — indigo left border + light indigo background + italic. Visually distinct from body text, scannable.
4. **Emerald accent for vine timeline** — visually distinct from the indigo grants-hub timeline. Users can immediately see these are two different projects.
5. **"In progress" badge on Phase 7** — with spinning Loader icon. Meta-honesty: the user is reading the output of the phase that's building itself.
6. **"This is an ongoing story" callout** — explicitly connects feedback button to future phases. Encourages participation.
