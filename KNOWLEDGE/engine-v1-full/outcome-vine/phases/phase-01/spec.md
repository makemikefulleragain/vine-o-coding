# Phase 1 Spec — Make It Clear

**Date:** 2026-02-15

---

## Acceptance Criteria

1. A 9th grader can read the landing page and explain what Outcome Vine Coding is in their own words.
2. The page loads in under 3 seconds on mobile.
3. The three-layer methodology is visible without scrolling on desktop (above the fold or just below hero).
4. The grants-hub proof link is present and opens in a new tab.
5. `npm run build` produces a clean `dist/` folder with no errors.
6. The site is responsive at 375px, 768px, and 1280px breakpoints.
7. No jargon appears without immediate plain-English explanation.

---

## Technical Design

### Project Scaffold

```
outcome-vine/
├── package.json          (vite, react, tailwind, react-router-dom, lucide-react)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html            (Vite entry point)
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx          (React entry)
│   ├── index.css         (Tailwind imports)
│   ├── App.jsx           (Router shell)
│   ├── pages/
│   │   └── Home.jsx      (Landing page — Phase 1 content)
│   └── components/
│       ├── Header.jsx    (Nav bar — logo + minimal links)
│       ├── Footer.jsx    (Kamunity branding + links)
│       ├── Hero.jsx      (Value proposition + CTA)
│       ├── Process.jsx   (Three-layer visual)
│       └── Proof.jsx     (Grants-hub story + link)
```

### Dependencies

- `vite` ^6.0
- `react` ^19.0, `react-dom` ^19.0
- `react-router-dom` ^7.0
- `tailwindcss` ^4.0, `@tailwindcss/vite` ^4.0
- `lucide-react` ^0.400+

### Routes

| Path | Component | Phase |
|---|---|---|
| `/` | Home | Phase 1 |
| `/widget` | (placeholder) | Phase 2 |
| `/case-study` | (placeholder) | Phase 3 |

Only `/` is built in Phase 1. Others are reserved.

---

## Content Design

### Header
- Logo text: "Outcome Vine Coding" (no image logo yet)
- Nav: "Home" (active), "Start Building" (disabled/coming soon badge)
- Clean, minimal — not a mega-menu

### Hero Section

**Headline:** "Build real things with AI — even if you've never coded before"

**Subheadline:** "Outcome Vine Coding is a step-by-step method that helps you turn your idea into a working app. You describe what you need, AI does the building, and the method keeps everything on track."

**CTA button:** "Start Building →" (links to future widget, disabled state with "Coming in Phase 2" tooltip or badge)

**Secondary link:** "See proof — a real tool built with this method →"

### Process Section (Three Layers)

Title: "How it works"

Three cards, horizontal on desktop, stacked on mobile:

**Card 1: "Describe what you want to build"**
Icon: FileText (Lucide)
Body: "Answer simple questions about your project. The method turns your answers into a clear plan that AI can follow."
Maya note: Like filling out a form — not writing code.

**Card 2: "Build it one step at a time"**
Icon: Layers (Lucide)
Body: "Each step is small and testable. You check if it works before moving on. No giant leap of faith."
Maya note: Like building with Lego — one piece at a time, and you can always see the instructions.

**Card 3: "Catch problems before they grow"**
Icon: ShieldCheck (Lucide)
Body: "Built-in checkpoints ask: does this still match what you need? If something's wrong, you fix it early — not after everything's built."
Maya note: Like spell-check, but for your whole project.

### Proof Section

Title: "This method was used to build a real tool"

Brief story (3-4 sentences):
"The Community Grants Hub helps small Australian nonprofits manage their grant reporting. It was built from scratch using Outcome Vine Coding — one step at a time, with AI doing the coding. It went through 8 development phases, including one where things went wrong and had to be fixed. It's live right now."

**Button:** "Visit the Community Grants Hub →" (opens grants-hub.netlify.app in new tab)

Subtle note: "Built with Windsurf (an AI coding assistant) in a single session."

### Footer
- "Made by Kamunity" with link to kamunity.ai
- "Outcome Vine Coding is open methodology — use it, share it, improve it."
- Minimal, not cluttered

---

## Visual Design

- **Color palette:** Indigo-600 primary (#4F46E5), with slate grays for text. White background. Subtle indigo gradient on hero.
- **Typography:** System font stack (Inter if available, fallback to system). Large hero text (4xl mobile, 6xl desktop). Body 18px for readability.
- **Spacing:** Generous whitespace. Sections separated by 80-120px padding.
- **Cards:** Rounded corners, subtle shadow, hover lift effect. Indigo icon accent.
- **Mobile:** Stack all columns. Full-width CTA button. Larger touch targets.

---

## What's Explicitly NOT Built

- Interactive widget (Phase 2)
- Brian lean-in sections (Phase 2-3)
- Case study page (Phase 3)
- SEO meta tags beyond basics (Phase 4)
- Analytics or tracking (never, per Constitution)
- Backend/API calls (not needed)
