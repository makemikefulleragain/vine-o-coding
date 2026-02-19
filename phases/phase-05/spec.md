# Phase 5 Spec — Make It Lived

**Date:** 2026-02-15

---

## Acceptance Criteria

1. Navigating between pages scrolls to top.
2. Widget progress bar stays visible while scrolling form content.
3. Landing page has subtle entrance animations (fade-in-up on scroll).
4. Landing page copy is tighter — fewer words, less jargon, more breathing room.
5. `/about` page exists with: About Kamunity, FAQ (5-8 questions), Privacy Policy, Terms of Use.
6. Floating feedback button visible on all pages.
7. Header nav includes "About" link.
8. Mobile responsive at 375px.
9. `npm run build` clean.

---

## Technical Design

### Bug Fixes

**ScrollToTop:** `src/components/ScrollToTop.jsx` — useLocation + useEffect → `window.scrollTo(0, 0)`. Placed in App.jsx above Routes.

**Sticky progress:** WidgetShell `<nav>` gets `sticky top-16 z-40 bg-white pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8` (sits below h-16 header).

### Maya Content Pass

**CSS animations:** Add `@keyframes fade-in-up` to `index.css`. Create `src/components/FadeIn.jsx` using Intersection Observer.

**Copy changes (landing page):**
- Hero subtitle: shorter, punchier
- Process cards: trim body text, strengthen analogies
- Proof section: tighten story paragraph

**Widget step headings:** Review for jargon, simplify where needed.

### About/Trust Page

**Route:** `/about`
**Sections:**
1. About Kamunity — who we are, what we believe
2. FAQ — 5-8 questions (What is this? Is it free? Do I need to code? etc.)
3. Privacy Policy — plain English, no data collected
4. Terms of Use — open methodology, no warranty

### Feedback Button

**Component:** `src/components/FeedbackButton.jsx`
- Floating bottom-right
- MessageSquare icon
- Links to `mailto:feedback@kamunity.ai` with pre-filled subject
- Semi-transparent, doesn't obscure content

### New/Modified Files

| File | Action |
|---|---|
| `src/components/ScrollToTop.jsx` | NEW — scroll to top on route change |
| `src/components/FadeIn.jsx` | NEW — Intersection Observer fade-in wrapper |
| `src/components/FeedbackButton.jsx` | NEW — floating feedback button |
| `src/pages/About.jsx` | NEW — about/trust/FAQ/privacy page |
| `src/index.css` | MODIFY — add fade-in-up keyframes |
| `src/App.jsx` | MODIFY — add ScrollToTop, About route, FeedbackButton |
| `src/components/Header.jsx` | MODIFY — add About nav link |
| `src/components/Footer.jsx` | MODIFY — add About, Privacy, Terms links |
| `src/components/Hero.jsx` | MODIFY — tighten copy, add FadeIn |
| `src/components/Process.jsx` | MODIFY — tighten copy, add FadeIn |
| `src/components/Proof.jsx` | MODIFY — tighten copy |
| `src/components/widget/WidgetShell.jsx` | MODIFY — sticky progress bar |
| `public/sitemap.xml` | MODIFY — add /about URL |
