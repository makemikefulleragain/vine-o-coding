# STATE.md — Kamunity Consulting Website
## kamunityconsulting.com rebuild · Feb 2026

**Last updated:** 2026-02-20 (Phases 1, 2, 3 complete — site live on temp URL)
**Current phase:** Phases 1–3 complete. Phase 4 pending evidence from real traffic.
**Deployed URL (temp):** https://kamunity-consulting-new.netlify.app ← TEST HERE
**Production URL (Wix, still live):** kamunityconsulting.com — DO NOT TOUCH until DNS cutover confirmed
**Netlify Site ID:** 58c1e640-1879-432e-91a9-577bf78e03bd
**Netlify Admin:** https://app.netlify.com/projects/kamunity-consulting-new
**Stack:** Static HTML + CSS + vanilla JS. Netlify deployment.

---

## What Exists

### Foundation Documents (this pack)
- `CONSTITUTION.md` — operating principles, two-door architecture, locked copy, technical constraints
- `MISSION.md` — strategic outcome, what done looks like, who it's for
- `PHASE_QUEUE.md` — four phases defined (hypothesis)
- `RUNNER.md` — points to ENGINE/RUNNER.md in Kamunity-Tabletop-Plan
- `SETUP.md` — human infrastructure steps
- `STATE.md` — this file

### Locked Assets (from design session)
**Front door copy — Version 3 (Priya)**
> Good work is possible. Even here. Especially here.
> We've sat in those meetings. We know what you're carrying.
> And we know the thing you haven't said out loud yet.
>
> You've already seen it, haven't you.
> That thing that would change everything.
> That's where we start.
>
> One path improves the system.
> The other questions it.

**Front door copy — Version 4 (CEO)**
> Cutting hours. Reducing services. Doing it anyway.
> The WA community sector is carrying more than it should have to.
> You don't need another framework. You need someone who's been inside it.
>
> You've already seen it, haven't you.
> That thing that would change everything.
> That's where we start.
>
> One path improves the system.
> The other questions it.

**Door labels and proof points**
- Door 1: **Fix the shit things** / RAC. $500k found in 9 months. Nobody got fired.
- Door 2: **Do the impossible thing** / WA Health hackathon. Won it by going outside and talking to actual humans.

### Source Material Available
- `KNOWLEDGE/MIKE_FULLER_PROFILE.md` — comprehensive Mike profile (career, methodology, proof points, philosophy)
- BRAIN/ ecosystem docs in Kamunity-Tabletop-Plan
- Tech'o'Space Podcast Ep 27 (reviewed in full — https://youtu.be/6evn1-Y_FpQ)

### Infrastructure
- Site live at https://kamunity-consulting-new.netlify.app (Netlify, temp URL)
- Wix site still live at kamunityconsulting.com — leave it until DNS cutover confirmed by human
- Netlify Site ID: 58c1e640-1879-432e-91a9-577bf78e03bd

### Site Files Built
```
site/
  index.html          — front door, two-version URL parameter routing
  fix.html            — red door, QA/improvement, Netlify form
  impossible.html     — blue door, innovation/AI, Netlify form
  about.html          — Mike page, origin story, career arc, photo placeholder
  css/style.css       — campfire design system
  js/version.js       — URL parameter copy routing
netlify.toml          — publish = "site", redirects, security headers
```

---

## What's Been Built (Phase History)

### Phase 0: Foundation (2026-02-20) — COMPLETE
- Design session between Mike and Claude Sonnet 4.6
- Copy written, debated, locked
- Two-door architecture confirmed
- Static HTML stack confirmed
- Foundation docs written

### Phase 1: Front Door (2026-02-20) — COMPLETE
- index.html with Version 4 (CEO) default copy
- `?v=priya` URL parameter serves Version 3 (Priya) copy
- Two door buttons: ember red (fix) + deep blue (impossible)
- Proof whisper below buttons
- Deployed to Netlify temp URL

### Phase 2: Behind the Doors (2026-02-20) — COMPLETE
- fix.html — red door, what it is, pub description, 3 proof items, Netlify form
- impossible.html — blue door, what it is, pub description, 4 proof items, AI sovereignty note, Netlify form
- Both pages cross-link to opposite door

### Phase 3: Mike Page (2026-02-20) — COMPLETE
- about.html — Glasgow origin, quality systems arc, career range as proof, ecosystem context
- Photo placeholder — needs human action

---

## Known Gaps / Pending Human Actions

See HUMAN_ACTION.md for full list. Summary:
- **DNS cutover:** Wix → Netlify (blocks going live at kamunityconsulting.com)
- **Netlify Forms email:** Confirm mike@kamunityconsulting.com as notification email in Netlify dashboard
- **Mike photo:** Needed for about.html — placeholder currently shown
- **CSP update:** `form-action` in netlify.toml needs kamunityconsulting.com added when domain goes live

---

## Active Risks

| Risk | Level | Mitigation |
|---|---|---|
| Wix domain locked or DNS complicated | Medium | HUMAN_ACTION.md written. Wix stays live until cutover confirmed. |
| Copy drifts from locked version | Low | version.js text matches CONSTITUTION.md exactly. Critiqued. |
| Netlify Forms not routing to Mike | Medium | Needs email notification confirmed in Netlify dashboard before first real inquiry |
| Photo placeholder goes live | Low | Acceptable for soft launch. Flag in HUMAN_ACTION.md. |

---

## Ecosystem Connections

| Site | Relationship | Status |
|---|---|---|
| K.org (kamunity.org) | Get it done — link from footer | Exists, cross-link in footer |
| K.ai | Get connected — link from footer | Link when live |
| AI Readiness tool | Free resource candidate for Phase 4 | Live at kamunity-audit.netlify.app |
| Kamunity Tabletop Plan | Source of BRAIN/ and ENGINE/ | Active |
