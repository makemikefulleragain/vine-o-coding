# Phase 5 Research — Make It Lived

**Date:** 2026-02-15
**Searches used:** 3/5

---

## UAT Feedback (5 items)

### 1. BUG — Pages don't scroll to top on navigation
**Root cause:** React Router preserves scroll position between route changes by default. Need a ScrollToTop component that calls `window.scrollTo(0, 0)` on every location change.
**Fix:** 1-line component using useLocation + useEffect in App.jsx.

### 2. BUG — Widget progress bar scrolls away
**Root cause:** WidgetShell's progress `<nav>` is not sticky. As user types longer answers, the form extends and progress is lost.
**Fix:** Make progress bar sticky below the header (top-16, since header is h-16 sticky top-0). Add white background + shadow for visual separation.

### 3. FEATURE — On-page feedback workflow
**Research:** Lightweight feedback widgets (Happy React, Sentry User Feedback) require backends. For a no-backend site, options are:
- **Floating feedback button → mailto: link** — zero infrastructure, works everywhere
- **Floating button → Google Form embed** — needs external setup (human action)
- **Inline emoji reaction (👍👎) + optional text** — localStorage only, no collection

**Decision:** Floating feedback button with mailto: link to a Kamunity email address. Simple, honest, no backend. The human can set up a Google Form later if volume warrants it.

### 4. FEATURE — Maya wants animated visuals, less text, less techy language
**Research:** Tailwind CSS 4 supports `@keyframes` and `animation` utilities natively. For entrance animations without a plugin:
- CSS `@keyframes` for fade-in-up
- Intersection Observer for scroll-triggered animations
- Reduce text density: shorter paragraphs, more whitespace, fewer technical terms

**Approach:**
- Add CSS `@keyframes fade-in-up` to index.css
- Create a simple `FadeIn` wrapper component using Intersection Observer
- Landing page content pass: tighten copy, replace technical terms, add more visual breathing room
- Widget step headings: simplify language

### 5. FEATURE — Trust/legal pages (Terms, Privacy, About, FAQ)
**Research:** For a free, open-source educational tool with no accounts and no data collection:
- **Privacy:** Plain-English statement: no data collected, no cookies, no tracking, everything runs in browser
- **Terms:** Minimal: open methodology, no warranty, use at own risk
- **About Kamunity:** Brief org description + mission
- **FAQ:** 5-8 common questions

**Decision:** Single `/about` page with 4 sections (About, FAQ, Privacy, Terms). Not 4 separate pages — keeps navigation simple.

## Prioritized Build Order

1. ScrollToTop fix (bug — 1 file)
2. Sticky progress bar (bug — 1 edit)
3. Maya content pass (landing page copy + animations)
4. Trust/about page with FAQ, privacy, terms
5. Feedback floating button
