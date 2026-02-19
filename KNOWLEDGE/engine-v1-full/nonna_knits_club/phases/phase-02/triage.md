# Phase 2 Triage — What to Build

**Date:** 2026-02-15

---

## Phase 2 Goal (from PHASE_QUEUE.md + UAT feedback)

Original: "Gallery, Appreciation & Mobile Polish"
Updated: Add **quick/detailed feedback widget** based on direct user request from UAT.

## Priority Order (within Phase 2)

1. **Mobile Hamburger Nav** — Fixes a known gap, makes everything else usable on phones
2. **Post Reactions (Hearts)** — Quick appreciation, social glue, encourages sharing
3. **Site Feedback Widget** — Two-step: emoji quick reaction → optional detailed text. Directly requested by UAT users.
4. **Gallery View** — Toggle on Board page to show posts in grid layout

## What NOT to build

- Comments/replies on posts (too complex for localStorage, Phase 3+ territory)
- User profiles/accounts
- Image upload (keep paste-URL approach)
- Analytics on feedback data (just store it)

## Integration decisions

- All data stays in localStorage — no external services
- Feedback widget is a floating button, not embedded in pages
- Reactions stored as part of post data in localStorage
- Gallery view is a toggle on the existing Board page, not a separate route
