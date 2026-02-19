# Phase 5 Spec — Polish, UX & Feedback

**Date:** 2026-02-17

---

## Acceptance Criteria

### Sticky Header + Mobile Menu
1. Header sticks to top on scroll with subtle backdrop blur
2. Mobile hamburger button visible on small screens
3. Full nav menu slides/fades in on mobile when hamburger tapped
4. Menu closes on link tap or outside click
5. All existing nav links accessible on mobile

### Visual Alignment
6. Colour palette refined to match ecosystem warmth ("Joy" — not grey)
7. Card components have consistent styling across landing, toolkit, insights
8. Typography feels cohesive with kamunity.ai and kamunity.org
9. Subtle gradients and shadows that feel warm, not corporate

### Landing Page Toolkit Cards
10. Each card shows: title, time estimate (e.g., "~5 min"), clear deliverable statement
11. "1 of 4" progress indicator — "Complete all 4 for your full sovereignty picture"
12. Contextual Unsplash image per card (community/nonprofit themed)
13. Cards link to toolkit pages as before

### Toolkit Page Floating Tracker
14. Sticky sub-header on each toolkit page showing: current toolkit name highlighted, other 3 as links
15. Each link shows headline score/status if user has completed that dimension (from audit results)
16. Time estimate shown on current toolkit
17. Progress bar or indicator: "2 of 4 complete"
18. Ethical encouragement: warm, real messaging about the value of doing this work now
19. Acknowledges: these are real jobs with real pressures, not adding to the to-do list of death

### Talk to Kamunity
20. "Talk to Kamunity" button/section throughout site
21. On click: consent modal/prompt explaining what happens (opens email app, no data collected)
22. Links to /privacy and terms
23. Opens mailto:mike@kamunityconsulting.com with pre-filled subject

### Feedback Widget
24. Netlify Forms integration: hidden form in index.html, React submits via AJAX
25. 3 emoji reactions (😊 👍 💡 or similar)
26. Optional text box for comments/questions/just saying hi
27. Appears prominently but doesn't obstruct content
28. Shows success confirmation after submission
29. Works without JavaScript fallback (hidden HTML form)

### Non-Regression
30. Build succeeds
31. All 12+ existing routes work unchanged
32. Print styles still work
33. ShareResults still works

---

## Technical Design

### New Files
```
src/components/MobileMenu.jsx    — hamburger menu component
src/components/FeedbackWidget.jsx — emoji + text feedback form
src/components/ContactModal.jsx   — consent prompt for mailto
src/components/ToolkitTracker.jsx — floating progress tracker for toolkit pages
```

### Updated Files
- `src/components/Layout.jsx` — sticky header, mobile menu, visual refresh
- `src/components/Landing.jsx` — toolkit card redesign with images, time, deliverables
- `src/components/guides/*.jsx` — integrate ToolkitTracker
- `src/data/toolkit.js` — add time estimates, deliverables, image URLs
- `src/index.css` — visual alignment (colours, shadows, gradients)
- `index.html` — hidden Netlify Forms form element
