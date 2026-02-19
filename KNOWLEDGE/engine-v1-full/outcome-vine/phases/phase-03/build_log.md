# Phase 3 Build Log — Make It Learnable

**Date:** 2026-02-15
**Build attempt:** 1 of 3

---

## What Was Built

### New Files Created

| File | Purpose |
|---|---|
| `src/pages/CaseStudy.jsx` | Case study page — hero, timeline, deep dives, download, CTA |
| `src/components/Timeline.jsx` | Vertical timeline container for 8 grants-hub phases |
| `src/components/TimelineNode.jsx` | Single expandable timeline node with status colors |
| `src/components/DeepDives.jsx` | 4 methodology deep dives as `<details>` accordion |
| `src/components/MethodologySummary.jsx` | Download/copy methodology summary markdown |
| `src/lib/timelineData.js` | 8 timeline phase entries with titles, outcomes, detail, lessons |
| `src/lib/methodologySummary.js` | Full methodology summary content (~2 pages markdown) |

### Files Modified

| File | Change |
|---|---|
| `src/App.jsx` | Added CaseStudy import and /case-study route |
| `src/components/Header.jsx` | Added "Case Study" nav link |
| `src/components/Proof.jsx` | Added "See the full story →" link to /case-study |
| `src/components/Hero.jsx` | Fixed Tailwind v4 gradient class (bg-gradient-to-br → bg-linear-to-br) |
| `src/pages/CaseStudy.jsx` | Fixed Tailwind v4 gradient class |

### Build Output
```
dist/index.html                   0.67 kB │ gzip:   0.42 kB
dist/assets/index-CaxKxbwJ.css   32.22 kB │ gzip:   6.23 kB
dist/assets/index-DlewwkcF.js   417.24 kB │ gzip: 129.83 kB
✓ built in 10.70s
```

0 errors, 0 warnings. 1626 modules. Clean and deployable.

### Bundle Size Progression
| Phase | JS (raw) | JS (gzip) | CSS (gzip) |
|---|---|---|---|
| Phase 1 | 244 KB | 77 KB | 4.8 KB |
| Phase 2 | 392 KB | 122 KB | 5.9 KB |
| Phase 3 | 417 KB | 130 KB | 6.2 KB |

Phase 3 added only 25KB raw / 8KB gzip — mostly timeline data and deep dive content. No new dependencies.

## Design Decisions

1. **Custom vertical timeline** — No external library. Tailwind border-left connector with colored dots. Expandable nodes via React state. Status-coded: emerald (success), amber (failure), indigo (recovery).
2. **Phase 2 R&R node expanded by default** — The failure/recovery is the star of the story. Every other node is collapsed.
3. **"Lesson" callout in each node** — A one-sentence takeaway per phase. Helps Maya understand the pattern without reading all the detail.
4. **Deep dives use native `<details>`** — Consistent with Brian notes in the widget. Zero JS for expand/collapse. Accessible by default.
5. **Each deep dive has a Maya summary and Brian depth** — Summary visible when collapsed. Full content on expand. Brian gets 4-5 paragraphs of theory per topic.
6. **Methodology summary as markdown download** — Uses Blob URL + download attribute (no JSZip needed for a single file). Also copyable to clipboard.
7. **CTA section at bottom** — Indigo full-width bar with "Ready to build something?" driving to /widget.
8. **Tailwind v4 gradient fix** — bg-gradient-to-br → bg-linear-to-br in Hero.jsx and CaseStudy.jsx.

## Issues Found
- Tailwind v4 lint warnings caught and fixed (gradient class names, break-words). All resolved.
