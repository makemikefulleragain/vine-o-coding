# Phase 8 Spec — Make It Smooth & Navigable

**Date:** 2026-02-15

---

## Item 1: Fix FadeIn Flicker (P0)

### Acceptance Criteria
- [ ] No visible flicker/pop when elements enter the viewport
- [ ] Elements that are already in viewport on page load appear immediately (no animation)
- [ ] Elements that scroll into view transition smoothly (fade + slide up)
- [ ] Staggered delays still work (e.g., timeline nodes appearing one after another)
- [ ] `prefers-reduced-motion` users see no animation (instant visibility)

### Technical Design
Replace CSS keyframe animation with CSS transition in `FadeIn.jsx`:

**Before:** `opacity-0` → swap class to `animate-fade-in-up` (keyframes)
**After:** Always have transition properties set; toggle between `opacity-0 translate-y-5` and `opacity-100 translate-y-0`

```jsx
// FadeIn.jsx — new approach
<div
  ref={ref}
  className={`transition-all duration-500 ease-out ${
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
  }`}
  style={{ transitionDelay: delay ? `${delay}ms` : '0ms' }}
>
```

Also update `index.css`: keep `@keyframes fade-in-up` and `.animate-fade-in-up` for MethodologyFlow (which uses it directly), but FadeIn component no longer needs it.

---

## Item 2: Split Case Study into Separate Pages (P1)

### Acceptance Criteria
- [ ] 3 new routes: `/method`, `/case-study`, `/our-story`
- [ ] Each page has its own `useDocTitle` and appropriate hero section
- [ ] `/method` contains: methodology intro, MethodologyFlow animation, MethodologySummary, CTA
- [ ] `/case-study` contains: Grants Hub hero, Timeline, DeepDives, CTA
- [ ] `/our-story` contains: Vine-o-coding timeline, "ongoing story" callout, CTA
- [ ] Old `/case-study` URL still works (now just the Grants Hub story)
- [ ] No content is lost in the split

### Technical Design

**New files:**
- `src/pages/Method.jsx` — methodology explanation page
- `src/pages/OurStory.jsx` — vine-o-coding development story page

**Modified files:**
- `src/pages/CaseStudy.jsx` — strip to Grants Hub only (hero + timeline + deep dives + CTA)
- `src/App.jsx` — add 2 new routes
- `src/components/Header.jsx` — update nav links + add mobile hamburger

**Page content mapping:**

| Current CaseStudy section | New location |
|---|---|
| Hero (Grants Hub intro) | `/case-study` |
| MethodologyFlow ("Every phase followed this loop") | `/method` |
| Timeline (8-phase grants-hub) | `/case-study` |
| DeepDives (4 analysis cards) | `/case-study` |
| Vine timeline ("How this site was built") | `/our-story` |
| MethodologySummary (download) | `/method` |
| CTA ("Ready to build?") | All 3 pages (shared component) |

---

## Item 3: Mobile Nav (P1 dependency)

### Acceptance Criteria
- [ ] Desktop (≥768px): horizontal nav as current
- [ ] Mobile (<768px): hamburger icon, opens slide-down or overlay menu
- [ ] Menu closes on link click or outside click
- [ ] Current page highlighted in nav

### Technical Design
- Add state `menuOpen` to Header
- Desktop: show links inline (current)
- Mobile: show hamburger button → toggles a panel with stacked links
- Use Lucide `Menu` and `X` icons for open/close
- Close menu on `<Link>` click via `onClick` handler
