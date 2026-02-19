# Phase 6 Spec — Make It Honest & Visual

**Date:** 2026-02-15

---

## Acceptance Criteria

1. Feedback email is mike@kamunityconsulting.com.
2. No copy on the site makes a false or exaggerated claim.
3. Desktop sections have tighter spacing (less scrolling between content).
4. Feedback button opens an in-page structured form, not email.
5. Feedback submits anonymously to Netlify Forms (<90 seconds to complete).
6. Landing page has an animated methodology flow diagram with a play/go button.
7. Case study page has the same animated flow.
8. Brian deep dives include further reading links.
9. Mobile responsive at 375px.
10. `npm run build` clean.

---

## Technical Design

### Feedback Widget (Netlify Forms)
- Hidden form in `index.html` for Netlify bot detection
- `src/components/FeedbackWidget.jsx` — slide-up panel:
  - Auto-detected page name
  - 4 emoji reaction buttons (Love it / Confused / Idea / Bug)
  - Optional text field (1-2 sentences)
  - Submit button → fetch POST to Netlify Forms
  - Success/error states
- `src/components/FeedbackButton.jsx` — MODIFY to toggle widget instead of mailto

### Animated Methodology Flow
- `src/components/MethodologyFlow.jsx`:
  - 7 nodes in a circular/oval layout (CSS positioned)
  - Each node: icon + short label
  - "Watch it work" button triggers sequential highlight animation
  - Pure CSS @keyframes, no library
  - Reusable on landing page and case study

### Copy Fixes
- Hero: "Answer a few simple questions across 5 steps" (not "5 simple questions")
- About FAQ: update "5 simple questions" answer
- Process section header: verify accuracy

### Desktop Spacing
- All section `py-20 sm:py-28` → `py-16 lg:py-20`
- Keep mobile generous, tighten desktop

### New/Modified Files
| File | Action |
|---|---|
| `src/components/FeedbackWidget.jsx` | NEW — structured feedback form |
| `src/components/MethodologyFlow.jsx` | NEW — animated flow diagram |
| `src/components/FeedbackButton.jsx` | MODIFY — toggle widget |
| `src/components/Hero.jsx` | MODIFY — truthful copy |
| `src/components/Process.jsx` | MODIFY — spacing |
| `src/components/Proof.jsx` | MODIFY — spacing |
| `src/components/DeepDives.jsx` | MODIFY — Brian further reading links |
| `src/pages/Home.jsx` | MODIFY — add MethodologyFlow |
| `src/pages/CaseStudy.jsx` | MODIFY — add MethodologyFlow |
| `src/pages/About.jsx` | MODIFY — truthful FAQ, spacing |
| `src/index.css` | MODIFY — flow animation keyframes |
| `index.html` | MODIFY — hidden Netlify form |
