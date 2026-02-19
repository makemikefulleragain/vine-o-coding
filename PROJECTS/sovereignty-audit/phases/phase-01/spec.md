# Phase 1 Spec — The Free Audit

**Date:** 2026-02-17

---

## Acceptance Criteria

1. **Landing page** loads in <2 seconds, explains the tool in <30 seconds of reading
2. **10 questions** covering 4 dimensions (Data Ownership, Vendor Lock-in, Cost Transparency, AI Readiness)
3. **Each question** has 3-4 answer options with weighted scores
4. **Progress indicator** shows how far through the audit the user is
5. **Results page** shows:
   - Overall sovereignty score (0-100) with a named stage
   - Per-dimension score with traffic-light colour (green/amber/red)
   - 1-2 specific recommendations per dimension
   - Sensitive data flag with specialist referral if applicable
6. **Zero data transmission** — everything runs client-side
7. **No tracking** — no analytics, no cookies, no third-party scripts
8. **Mobile-responsive** — Priya is on her laptop between meetings
9. **Deployable** — `npm run build` produces a working `dist/`
10. **Accessible** — semantic HTML, keyboard navigation, sufficient contrast

---

## Scoring Model

### Dimensions (25 points each, 100 total)

**Data Ownership (25 pts)** — Who controls your data? Could you export it? Who else can see it?
- Q1: Where does your organisation primarily store files and documents?
- Q2: Could you export all your data and leave your current tools tomorrow?
- Q3: Who has admin/owner access to your main digital accounts?

**Vendor Lock-in (25 pts)** — How dependent are you on specific vendors? What's your switching cost?
- Q4: How many of your core tools come from a single provider (e.g. all Google or all Microsoft)?
- Q5: Do you have a written record of all the digital tools/subscriptions your org uses?

**Cost Transparency (25 pts)** — Do you know what you're actually paying? In money, time, AND data?
- Q6: Do you know the total monthly cost of all your digital tools and subscriptions?
- Q7: Are you using paid tools where free or low-cost alternatives exist?

**AI Readiness (25 pts)** — Are you prepared for the AI shift? Are you using AI tools safely?
- Q8: Is your team currently using any AI tools (ChatGPT, Copilot, Gemini, etc.)?
- Q9: Does your organisation have guidelines for how staff should use AI tools?
- Q10: Do you know what data your AI tools are trained on or have access to?

### Answer Scoring

Each answer maps to a point value within its dimension's allocation. Example:
- "Yes, we have full export capability" → high points
- "I'm not sure" → low points
- "No, we're locked in" → zero points

### Named Stages

| Score Range | Stage Name | Colour |
|------------|------------|--------|
| 0-25 | Exposed | Red |
| 26-50 | Aware | Amber |
| 51-75 | Progressing | Light Green |
| 76-100 | Sovereign | Green |

Per-dimension stages use the same ranges scaled to 25 points:
| Score Range | Status | Colour |
|------------|--------|--------|
| 0-6 | At Risk | Red |
| 7-13 | Developing | Amber |
| 14-19 | Good | Light Green |
| 20-25 | Strong | Green |

### Sensitive Data Flag

If Q1 answers suggest data is stored in consumer-grade tools AND the org type (inferred from context or added as a pre-question) involves vulnerable populations, surface:
> "Your organisation may handle sensitive client data. We strongly recommend speaking with a specialist about data security before making changes. This audit is a conversation starter, not a compliance assessment."

---

## Technical Design

### Stack
- **React 18** + **Tailwind CSS 3** + **Vite 5**
- Single-page app with client-side routing (React Router)
- No backend, no database, no API calls
- Build output: `dist/` for Netlify static deployment

### Component Structure
```
src/
  main.jsx           — React entry point
  App.jsx            — Router setup
  index.css          — Tailwind imports
  components/
    Layout.jsx       — Common header/footer
    Landing.jsx      — Hero + CTA
    Quiz.jsx         — Question flow + progress
    Results.jsx      — Score display + recommendations
  data/
    questions.js     — Question definitions + scoring
    recommendations.js — Per-dimension recommendation text
  utils/
    scoring.js       — Score calculation logic
```

### Design
- Clean, professional, trustworthy — not corporate, not playful
- Kamunity brand colours (to be established — start with a warm, community-oriented palette)
- Large readable text, clear CTAs
- Mobile-first responsive layout

### Routing
- `/` — Landing page
- `/audit` — Quiz flow
- `/results` — Results page (receives scores via React state/context)
