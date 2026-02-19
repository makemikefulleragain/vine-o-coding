# Phase 1 Build Log — The Quiz

## Build Date: 2026-02-18

## What Was Built

### Project Scaffold
- **Vite** + **React 18** + **Tailwind CSS 3** + **Recharts** + **React Router 6**
- Full project structure: `src/`, `public/`, config files, `.gitignore`
- Netlify-ready: `_redirects` for SPA routing, `llms.txt` for ecosystem discoverability

### Pages & Components
1. **Layout** (`Layout.jsx`) — Header with nav, footer with sovereignty notice and companion link
2. **Landing** (`Landing.jsx`) — Hero, value cards, "Is this for you?" persona section, funder note, dual CTAs
3. **Quiz** (`Quiz.jsx`) — 12 questions, one per screen, 4-point Likert, progress bar, dot navigation, back/forward, keyboard support
4. **Results** (`Results.jsx`) — Overall score badge, radar chart, sensitive data warning (conditional), dimension breakdowns with progress bars, personalised recommendations (3 cards based on lowest dimensions), funder note, screenshot prompt
5. **RadarChart** (`RadarChart.jsx`) — Recharts radar with moss green theme, responsive, tooltips

### Data & Logic
- `questions.js` — 12 questions across 4 dimensions with answer options
- `recommendations.js` — Band labels, descriptions, dimension-specific recommendations (4 bands × 4 dimensions = 16 recommendation sets), sensitive data warning text
- `scoring.js` — Dimension scoring (1-4 → 0-100%), overall score, band classification, sensitive data detection, top recommendation selection

### Design
- Moss green (#4A7C59) accent — distinct from kamunity-audit's ember red
- Warm off-white background (#FAFAF5)
- System font stack for speed and accessibility
- Cards with subtle borders, rounded corners
- Mobile-first responsive layout

### Static Assets
- SVG favicon (moss green K logo)
- `_redirects` for Netlify SPA routing
- `llms.txt` for AI ecosystem discoverability

## Build Result

```
✓ 657 modules transformed
dist/index.html       0.67 kB
dist/assets/*.css    15.73 kB (3.49 kB gzip)
dist/assets/*.js    552.14 kB (162.95 kB gzip)
✓ built in 33.13s
```

### Note on Bundle Size
The JS bundle is 552KB (163KB gzipped) — slightly over the 500KB warning threshold. This is primarily Recharts + D3 dependencies. Acceptable for Phase 1. Can be code-split in a future phase if needed.

## Build Attempts: 1/3 (success on first attempt)

## What's Working
- Landing page loads with clear value proposition
- Quiz presents questions one at a time with progress tracking
- All 12 questions answerable with 4-point scale
- Back/forward navigation within quiz
- Results page renders radar chart + dimension scores + recommendations
- Sensitive data warning triggers when Safety & Ethics questions score 1
- Funder note displayed on both landing and results
- Fully client-side — no data collection or transmission
- Mobile-responsive design
- Keyboard navigable

## Known Limitations (for future phases)
- No localStorage persistence (answers lost on page refresh)
- No PDF export of results
- No toolkit pages yet (Phase 2)
- No service pages yet (Phase 3)
- Bundle could be code-split for better performance
