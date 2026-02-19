# Phase 6 Build Log — Make It Honest & Visual

**Date:** 2026-02-15
**Build attempt:** 1 of 3
**Trigger:** Round 2 UAT feedback (7 items)

---

## UAT Feedback Addressed

| # | Feedback | Type | Fix |
|---|---|---|---|
| 1 | Feedback email wrong | Bug | Updated to mike@kamunityconsulting.com (in error fallback) |
| 2 | Maya wants animated methodology flow | Feature | MethodologyFlow component with play/reset |
| 3 | Case study needs visuals + Brian wants links | Feature | MethodologyFlow on case study + further reading links in all 4 deep dives |
| 4 | Too much scrolling on desktop | UX | Tightened section padding across all pages |
| 5 | Email opens without asking + need anonymous feedback | Feature | Netlify Forms feedback widget (emoji + text, <90 sec) |
| 6 | "5 simple questions" is untruthful | Copy | Changed to "5 short steps" |
| 7 | Truthfulness must apply everywhere | Audit | Updated privacy policy, FAQ, Hero copy |

## New Files Created

| File | Purpose |
|---|---|
| `src/components/FeedbackWidget.jsx` | Structured anonymous feedback (Netlify Forms) |
| `src/components/MethodologyFlow.jsx` | Animated 7-step methodology flow with play/reset |

## Files Modified

| File | Change |
|---|---|
| `src/components/FeedbackButton.jsx` | Converted from mailto link to widget toggle button |
| `src/App.jsx` | Added useState for feedback, imported FeedbackWidget |
| `index.html` | Added hidden Netlify form for bot detection |
| `src/components/Hero.jsx` | "5 short steps" (truthful), tighter padding |
| `src/components/Process.jsx` | Tighter section padding |
| `src/components/Proof.jsx` | Tighter section padding |
| `src/components/DeepDives.jsx` | Added further reading links (8 links across 4 dives), tighter spacing |
| `src/components/Timeline.jsx` | Tighter section padding |
| `src/components/MethodologySummary.jsx` | Tighter section padding |
| `src/pages/Home.jsx` | Added MethodologyFlow section between Process and Proof |
| `src/pages/CaseStudy.jsx` | Added MethodologyFlow section before Timeline, tighter spacing |
| `src/pages/About.jsx` | Truthful FAQ, updated privacy for Netlify Forms, tighter spacing |

## Build Output
```
dist/index.html                   2.53 kB │ gzip:   0.91 kB
dist/assets/index-C1uT7_VE.css   38.42 kB │ gzip:   7.14 kB
dist/assets/index-CYl21BMh.js   438.88 kB │ gzip: 135.01 kB
✓ built in 20.30s
```

0 errors, 0 warnings. 1633 modules.

### Bundle Size Progression
| Phase | JS (raw) | JS (gzip) | CSS (gzip) |
|---|---|---|---|
| Phase 1 | 244 KB | 77 KB | 4.8 KB |
| Phase 2 | 392 KB | 122 KB | 5.9 KB |
| Phase 3 | 417 KB | 130 KB | 6.2 KB |
| Phase 4 | 417 KB | 130 KB | 6.2 KB |
| Phase 5 | 426 KB | 132 KB | 6.5 KB |
| Phase 6 | 439 KB | 135 KB | 7.1 KB |

Phase 6 added 13KB raw / 3KB gzip. No new dependencies.

### Hotfix Deploy (post-UAT verification)

Additional fixes applied after initial deploy and live verification:

| # | Fix | Detail |
|---|---|---|
| 8 | Netlify Forms not detected | Changed `netlify` → `data-netlify="true"`, `hidden` → `style="display:none"` |
| 9 | Process card still said "5 simple questions" | → "Walk through 5 short steps. The method turns your answers into a plan you can hand to an AI coding assistant." |
| 10 | Site implies it builds the app | Added Toolkit section: 3 cards explaining This Site / AI Coding Assistant / Hosting |
| 11 | Hero implied site does everything | → "Walk through a few short steps to describe your idea. Get a complete plan. Drop it into an AI coding assistant and start building." |

New file: `src/components/Toolkit.jsx` — "What you'll need" section with links to Windsurf, Cursor, Copilot, Netlify, Vercel, GitHub Pages.

Final build: 1634 modules, 443KB (136KB gzip). Deployed to https://vine-o-coding.netlify.app.

## Design Decisions

1. **Netlify Forms over Google Forms** — native to hosting platform, no external dependency, anonymous by default, free tier (100/month).
2. **Emoji reaction picker** — faster than typing, structured data, works on mobile. 4 options: Love it, Confused, Idea, Bug.
3. **MethodologyFlow as pure React + CSS** — no animation library. useState drives step progression with setTimeout. Nodes scale/fade based on active state.
4. **Further reading links in DeepDives** — 2 links per dive, all to Wikipedia or established sources. Opens in new tab.
5. **Privacy policy updated for truthfulness** — we now DO collect anonymous feedback data. "We only collect what you choose to send us" replaces "we don't collect anything."
6. **"5 short steps" instead of "5 simple questions"** — the widget has 5 sections with 8 required + 7 optional fields. "5 short steps" is accurate. "5 simple questions" was not.
