# Phase 01 — Spec
## kamunity-consulting · Front Door + Behind the Doors + Mike Page

**Date:** 2026-02-20
**Engine step:** SPEC

---

## Safety Gate Pre-Flight

Applicable gates:
- **No tracking/extraction:** ✅ No analytics, no cookies, no third-party scripts
- **Locked copy:** ✅ Using exact text from CONSTITUTION.md — no paraphrasing
- **Netlify free tier only:** ✅ Static HTML, no paid features
- **No DNS changes:** ✅ Deploying to temp URL only — HUMAN_ACTION.md for cutover
- **Mobile first:** ✅ iPhone 12 viewport constraint drives all sizing decisions

No critical/high safety gates will fail after this build.

---

## Files Being Built

```
PROJECTS/kamunity-consulting/
  netlify.toml              ← deployment config (publish = "site")
  site/
    index.html              ← Phase 1: front door
    fix.html                ← Phase 2: red door
    impossible.html         ← Phase 2: blue door
    about.html              ← Phase 3: Mike page
    css/
      style.css             ← shared campfire design system
    js/
      version.js            ← URL parameter copy routing
```

---

## index.html Spec

### Layout
- Full viewport hero (`100dvh`) — content centered vertically
- Minimal header: wordmark "Kamunity Consulting" top-left, nav link "About" top-right
- Hero: copy block centered, two door buttons below
- Footer: minimal — ecosystem links + contact email

### Copy Blocks (from CONSTITUTION.md — locked)

**Version 4 (default — CEO):**
```
Cutting hours. Reducing services. Doing it anyway.
The WA community sector is carrying more than it should have to.
You don't need another framework. You need someone who's been inside it.

You've already seen it, haven't you.
That thing that would change everything.
That's where we start.

One path improves the system.
The other questions it.
```

**Version 3 (?v=priya — Priya):**
```
Good work is possible. Even here. Especially here.
We've sat in those meetings. We know what you're carrying.
And we know the thing you haven't said out loud yet.

You've already seen it, haven't you.
That thing that would change everything.
That's where we start.

One path improves the system.
The other questions it.
```

### Routing
- `js/version.js` reads `URLSearchParams` on DOMContentLoaded
- If `v=priya` → inject Version 3 hook copy
- All other (default/`v=ceo`) → inject Version 4 hook copy
- Shared copy (lines 4–9) is in static HTML — no swap needed

### Door Buttons
- Button 1: "Fix the shit things →" → links to `/fix.html` · ember red
- Button 2: "Do the impossible thing →" → links to `/impossible.html` · deep blue

### Proof points (below buttons, brief)
- "RAC. $500k found in 9 months. Nobody got fired."
- "WA Health hackathon. Won it by going outside and talking to actual humans."

---

## fix.html Spec

- Nav: wordmark back to home + "About" + "Or try the other door →" (links to impossible.html)
- H1: "Fix the shit things"
- Subhead: "For the competent, slightly exhausted person who knows what's wrong."
- What it is: QA, process improvement, strategy, team alignment (paragraph form — not bullets)
- The pub description: warm, direct, Mike's voice — "good people, fix the shit things, no drama"
- Proof block: RAC $500k / WALGA / ALIKE strategy — specific, no vague testimonials
- Netlify form: name, organisation, email, "what's going on" textarea — `data-netlify="true"`
- Footer: same as index

---

## impossible.html Spec

- Nav: wordmark + "About" + "Or try the other door →" (links to fix.html)
- H1: "Do the impossible thing"
- Subhead: "For the slightly feral person who's been told no too many times."
- What it is: design sprints, hackathons, AI integration, human-centred design (paragraph form)
- The pub description: "slightly feral, never heard no, co-conspirators"
- Proof block: WA Health hackathon / Youth placemaking / Western Power hackathon
- Same Netlify form structure
- Footer: same as index

---

## about.html Spec

- Nav: wordmark + back to home
- No CV format. Single flowing page.
- Human paragraph: Glasgow chugger → community AI — Mike's actual arc
- Career proof of range: brewing → mining → disability → community (prose, not timeline)
- Captain America framing implicit: the methodology, not the hero
- Ecosystem context: brief — links to K.org
- Photo: placeholder space (flagged in HUMAN_ACTION.md)
- Footer: same as index

---

## CSS Design System

### Colors
- `--parchment: #FFFBF5` — background (warm white)
- `--ink: #1C1917` — primary text (warm almost-black)
- `--smoke: #57534E` — secondary text
- `--faint: #A8A29E` — metadata/labels
- `--rule: #E7E5E4` — dividers
- `--ember: #C2410C` — ember orange (primary brand, Door 1 CTA)
- `--ember-deep: #9A3412` — hover/active ember
- `--ember-light: #FED7AA` — ember tint (backgrounds)
- `--sky: #1E40AF` — deep blue (Door 2)
- `--sky-light: #DBEAFE` — sky tint

### Typography
- Headings: Georgia, serif — honest, warm, not corporate
- Body: system-ui, -apple-system, 'Segoe UI', sans-serif
- No Google Fonts, no web font requests

### Spacing
- Base unit: 1rem (16px)
- Generous whitespace — not cramped

---

## Done When

- [ ] index.html loads, above-fold copy visible on 390px width viewport without scroll
- [ ] Version 4 copy renders by default
- [ ] Version 3 copy renders on `?v=priya`
- [ ] Both door buttons visible and clickable on mobile
- [ ] fix.html and impossible.html linked and functional
- [ ] Each door page has working Netlify form structure (requires Netlify deployment to activate)
- [ ] about.html linked and readable
- [ ] No tracking scripts, no Google Fonts, no external JS libraries
- [ ] Deployed to Netlify temp URL
- [ ] HUMAN_ACTION.md written for DNS cutover + email confirmation
