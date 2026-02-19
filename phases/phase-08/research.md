# Phase 8 Research — Make It Smooth & Navigable

**Date:** 2026-02-15
**Trigger:** Round 4 UAT feedback (2 items from tester)

---

## UAT Feedback Received

### Item 1: FadeIn flicker on boxes and tech elements
**Source:** Round 4 UAT
**Verbatim:** "the boxes and tech flicker when the animation or effect on them activates"
**Observed behaviour:** Elements start at `opacity: 0`, then when IntersectionObserver fires, the `animate-fade-in-up` class is applied. The animation starts from `opacity: 0; transform: translateY(20px)` and transitions to `opacity: 1; transform: translateY(0)`. The flicker likely occurs because:
1. The element is invisible (`opacity: 0`) until the observer fires
2. There's a brief moment between the observer triggering and the animation starting where the element may briefly flash
3. On fast connections or when elements are already in viewport on load, the observer fires immediately but the animation still runs from 0→1, creating a visible "pop"
4. Elements with `animationDelay` are even worse — they stay at `opacity: 0` during the delay, then suddenly animate

**Root cause analysis:**
- The `animate-fade-in-up` keyframes use `forwards` fill mode, which is correct
- BUT: the animation delay is applied via inline `style={{ animationDelay }}` while the initial state is `opacity-0` via Tailwind class
- When the class switches from `opacity-0` to `animate-fade-in-up`, if there's a delay, the element briefly becomes visible (animation hasn't started yet but `opacity-0` class is removed) then jumps back to invisible (animation's `from` state at opacity 0)
- This is the flicker: class removal → brief visibility → animation starts at opacity 0 → fades in

**Fix approach:** 
- Option A: Keep `opacity-0` until animation actually starts (use `animation-fill-mode: backwards` or set initial opacity in the animation delay period)
- Option B: Replace IntersectionObserver animation with CSS-only approach using `@starting-style` or simpler transitions
- Option C: Use `transition` instead of `animation` — set `opacity: 0` + `translate-y` initially, then toggle to `opacity: 1` + `translate-y-0` when visible. No keyframes needed. Transitions don't have the fill-mode flicker problem.

**Recommendation:** Option C. Transitions are simpler, don't flicker, and handle delays via `transition-delay`. The IntersectionObserver stays (for triggering), but the visual change uses CSS transitions instead of keyframe animations.

---

### Item 2: Case study page too long — split into separate nav links
**Source:** Round 4 UAT
**Verbatim:** "the case study page is too long covering 3-4 different things, these should be separate links in the nav bar"
**Current state:** The `/case-study` page contains:
1. **Hero** — Grants Hub intro
2. **Methodology Flow** — animated 7-step loop
3. **Timeline** — 8-phase grants-hub timeline
4. **Deep Dives** — 4 expandable analysis cards
5. **Vine Timeline** — this site's own 7-phase development story
6. **Methodology Summary** — download section
7. **CTA** — "Ready to build?"

That's 7 distinct sections on one page. The tester is right — this is 3-4 conceptually different things:
- **The Method** (methodology flow + summary)
- **Grants Hub Story** (hero + timeline + deep dives)
- **This Site's Story** (vine timeline)

**Options:**
- Option A: Split into 3 pages: `/method`, `/case-study/grants-hub`, `/case-study/vine-o-coding`
- Option B: Split into 2 pages: `/method` (methodology + summary), `/case-study` (both case studies)
- Option C: Keep 1 page but add anchor nav tabs at top for jump-to sections

**Recommendation:** Option A gives the cleanest navigation and shortest pages. Each page has one clear purpose. The nav bar gets: Method | Case Studies (dropdown) | About. But a dropdown adds complexity. Simpler: `Method` | `Grants Hub` | `Our Story` | `About` in the nav.

**Risk:** 4 nav items + "Start Building" button may crowd the header on mobile. Need a hamburger menu or condensed mobile nav.

**Feasibility:** Medium effort. Need to:
1. Create 3 new page components (or refactor existing)
2. Add 3 new routes to App.jsx
3. Update Header.jsx with new nav links (+ mobile handling)
4. Move existing components between pages
5. Update SEO titles per route

---

## Risks

| Risk | Mitigation |
|---|---|
| Mobile nav gets crowded with 4+ links | Hamburger menu on mobile, or group under "Learn" dropdown |
| Splitting pages breaks existing bookmarks to /case-study | Redirect old URL or keep it as alias |
| More pages = more maintenance | Pages are thin wrappers around existing components |
| FadeIn transition change could regress other animations | Test all pages after change |

---

## Recommendations

1. **Fix the flicker first** (P0) — affects every page, quick fix, high impact
2. **Split case study into separate pages** (P1) — restructure nav and routing
3. **Mobile nav handling** (P1-dependency) — required if we add more nav links
