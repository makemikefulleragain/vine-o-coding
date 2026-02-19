# Phase 5 Build Log — Make It Lived

**Date:** 2026-02-15
**Build attempt:** 1 of 3
**Trigger:** UAT feedback (5 items from real user testing)

---

## UAT Feedback Addressed

| # | Feedback | Type | Fix |
|---|---|---|---|
| 1 | Pages don't scroll to top on navigation | Bug | ScrollToTop component |
| 2 | Widget progress bar scrolls away | Bug | Sticky progress bar |
| 3 | Maya wants animations, less text, less jargon | Feature | FadeIn component + content pass |
| 4 | No Terms/Privacy/About/FAQ | Feature | /about page with 4 sections |
| 5 | Need on-page feedback workflow | Feature | Floating feedback button (mailto:) |

## New Files Created

| File | Purpose |
|---|---|
| `src/components/ScrollToTop.jsx` | Scrolls to top on every route change |
| `src/components/FadeIn.jsx` | Intersection Observer scroll-triggered fade-in-up animation |
| `src/components/FeedbackButton.jsx` | Floating feedback button (mailto: link) |
| `src/pages/About.jsx` | About Kamunity + FAQ (8 questions) + Privacy + Terms |
| `src/hooks/useDocTitle.js` | (Phase 4, already existed) |

## Files Modified

| File | Change |
|---|---|
| `src/index.css` | Added @keyframes fade-in-up + .animate-fade-in-up class |
| `src/App.jsx` | Added ScrollToTop, FeedbackButton, About route |
| `src/components/widget/WidgetShell.jsx` | Made progress bar sticky (top-16, z-40, bg-white, shadow) |
| `src/components/Header.jsx` | Replaced Home link with About (logo links home) |
| `src/components/Footer.jsx` | Added About, Privacy, Terms links |
| `src/components/Hero.jsx` | Maya pass: shorter headline, punchier subtitle, FadeIn stagger |
| `src/components/Process.jsx` | Maya pass: shorter card text, FadeIn stagger on cards |
| `src/components/Proof.jsx` | Maya pass: tighter story, FadeIn on sections |
| `public/sitemap.xml` | Added /about URL |

## Build Output
```
dist/index.html                   2.23 kB │ gzip:   0.78 kB
dist/assets/index-yL9L_U9M.css   33.46 kB │ gzip:   6.45 kB
dist/assets/index-Bhnb7jhS.js   425.52 kB │ gzip: 131.79 kB
✓ built in 8.89s
```

0 errors, 0 warnings. 1631 modules.

### Bundle Size Progression
| Phase | JS (raw) | JS (gzip) | CSS (gzip) |
|---|---|---|---|
| Phase 1 | 244 KB | 77 KB | 4.8 KB |
| Phase 2 | 392 KB | 122 KB | 5.9 KB |
| Phase 3 | 417 KB | 130 KB | 6.2 KB |
| Phase 4 | 417 KB | 130 KB | 6.2 KB |
| Phase 5 | 426 KB | 132 KB | 6.5 KB |

Phase 5 added 9KB raw / 2KB gzip. No new dependencies.

## Design Decisions

1. **ScrollToTop** — minimal component (useLocation + useEffect). No smooth scrolling — instant jump is expected behavior on route change.
2. **Sticky progress** — top-16 positions below h-16 header. Added border-b + shadow-sm for visual separation from content below.
3. **FadeIn via Intersection Observer** — no animation library. Custom component wraps children, observes once, adds animate class. Supports stagger via delay prop.
4. **Feedback button → mailto:** — simplest possible feedback mechanism with zero infrastructure. Pre-filled subject line. Shows icon-only on mobile, icon+text on desktop.
5. **Single /about page** — FAQ, Privacy, Terms, About Kamunity all on one page with anchor links. Not 4 separate pages.
6. **8 FAQ questions** — chosen from actual user confusion points: "is it free?", "do I need to code?", "what happens to my data?", etc.
7. **Footer trust links** — About, Privacy, Terms link to /about page (Privacy and Terms use anchor hashes).
