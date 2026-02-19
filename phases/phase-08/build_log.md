# Phase 8 Build Log — Make It Smooth & Navigable

**Date:** 2026-02-15
**Build attempt:** 1 of 3
**Trigger:** Round 4 UAT feedback (2 items)

---

## UAT Feedback Addressed

| # | Feedback | Type | Fix |
|---|---|---|---|
| 1 | Boxes and tech flicker when animation/effect activates | Bug | Replaced CSS keyframe animation with CSS transitions in FadeIn component |
| 2 | Case study page too long, should be separate nav links | UX/IA | Split into 3 pages: /method, /case-study, /our-story with updated nav |

## Files Created

| File | Purpose |
|---|---|
| `src/pages/Method.jsx` | Methodology explanation page (flow animation, key principles, summary download) |
| `src/pages/OurStory.jsx` | Vine-o-coding development story page (emerald timeline, live case study callout) |

## Files Modified

| File | Change |
|---|---|
| `src/components/FadeIn.jsx` | Replaced `animate-fade-in-up` keyframe class with `transition-all duration-500 ease-out` + opacity/translate toggle. Eliminates flicker. |
| `src/pages/CaseStudy.jsx` | Stripped to Grants Hub only: hero + timeline + deep dives + CTA. Removed MethodologyFlow, MethodologySummary, vine timeline. |
| `src/App.jsx` | Added 2 new routes: `/method`, `/our-story`. Imported Method and OurStory pages. |
| `src/components/Header.jsx` | Complete rewrite: 4 nav links (Method, Case Study, Our Story, About) + active state highlighting + mobile hamburger menu with slide-down panel |
| `src/components/FeedbackWidget.jsx` | Added `/method` and `/our-story` to PAGE_NAMES map |
| `public/sitemap.xml` | Added `/method` and `/our-story` URLs |

## Build Output
```
dist/index.html                   2.56 kB │ gzip:   0.92 kB
dist/assets/index-CDPiK5Eu.css   41.25 kB │ gzip:   7.61 kB
dist/assets/index-DIHzDRtK.js   459.67 kB │ gzip: 139.50 kB
✓ built in 14.35s
```

0 errors, 0 warnings. 1637 modules.

### Bundle Size Progression
| Phase | JS (raw) | JS (gzip) | CSS (gzip) |
|---|---|---|---|
| Phase 5 | 426 KB | 132 KB | 6.5 KB |
| Phase 6 | 443 KB | 136 KB | 7.1 KB |
| Phase 7 | 449 KB | 137 KB | 7.3 KB |
| Phase 7+ (security) | 452 KB | 138 KB | 7.4 KB |
| Phase 8 | 460 KB | 140 KB | 7.6 KB |

Phase 8 added ~8KB raw / ~2KB gzip. No new dependencies. Growth from 2 new page components.

## Design Decisions

1. **CSS transitions over keyframe animations** — Transitions don't have the fill-mode flicker problem. The element starts with its initial state (opacity-0, translate-y-5) and transitions to the target state. No intermediate "flash" during delay periods.

2. **3-page split over 2-page split** — Each page has one clear purpose: Method (how it works), Case Study (proof it works), Our Story (meta narrative). This maps cleanly to user intent.

3. **Mobile hamburger at md breakpoint** — 4 nav links + CTA button is too wide for phones. Hamburger appears below 768px. "Start Building" button stays visible in mobile header (always accessible).

4. **Active state in nav** — Current page link is highlighted in indigo. Mobile menu uses bg-indigo-50 highlight. Simple useLocation() match.

5. **Cross-linking between new pages** — Each page's CTA section links to related pages (Case Study → Our Story, Our Story → Method, Method → Case Study). Encourages exploration without forcing a linear path.
