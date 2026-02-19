# STATE.md — Outcome Vine Coding Site

**Last updated:** 2026-02-15 (Phase 8 complete — smooth animations + page split + mobile nav)
**Current phase:** Phase 8 complete. Deployed. Awaiting Round 5 testing.
**Deployed URL:** https://vine-o-coding.netlify.app
**Stack:** Vite 6.4.1 + React 19 + Tailwind CSS 4 + JSZip → Netlify

---

## What Exists

### Foundation Documents
- `CONSTITUTION.md` — operating principles, personas, companion examples, relationship to grants-hub
- `MISSION.md` — local liberation through accessible AI-assisted coding
- `RUNNER.md` — engine instructions (the Windsurf prompt)
- `PHASE_QUEUE.md` — 5-phase hypothesis (Clear → Walkable → Learnable → Findable → Lived)
- `SETUP.md` — human infrastructure steps
- `STATE.md` — this file

### Site (Vite + React 19 + Tailwind CSS 4) — Phase 8
- Component architecture: App, ScrollToTop, Header (with mobile hamburger), Footer, FeedbackButton, FeedbackWidget, MethodologyFlow, Toolkit, Hero, Process, Proof, FadeIn (CSS transitions), Home + Widget (10 components) + Method + CaseStudy (Timeline, TimelineNode, DeepDives [with RichBlock]) + OurStory (vineTimelineData) + MethodologySummary + About
- React Router DOM for client-side routing: /, /widget, /method, /case-study, /our-story, /about (6 routes)
- Lucide React icons, JSZip, FileSaver
- **Landing page (/)** with:
  - Hero section: "Build real things with AI — even if you've never coded before"
  - Three-step process cards: Describe → Build → Catch (with Maya-friendly analogies)
  - Proof section: Grants-hub story with 3 stat cards (8 phases, 1 failure caught, Live now)
  - CTA to grants-hub.netlify.app (opens in new tab)
  - "Start Building" button links to /widget (activated in Phase 2)
  - Sticky header with Sprout logo icon + "Start Building" nav button
  - Footer with Kamunity branding
- **Interactive Widget (/widget)** with:
  - 6-step wizard: Your Idea → Your Users → Boundaries → First Steps → Setup → Review
  - Progress bar with numbered steps (labels on desktop, numbers on mobile)
  - Companion examples at every step (Grants Hub + Recipe Remix, tabbed)
  - Brian "lean-in" expandable sections at every step (`<details>` with theory references)
  - Form validation (Next disabled until required fields filled)
  - Document generation: CONSTITUTION.md, MISSION.md, RUNNER.md, PHASE_QUEUE.md, SETUP.md, STATE.md
  - Opening prompt generation (copyable, ready to paste into AI assistant)
  - ZIP download (all 6 documents, client-side via JSZip)
  - Copy-to-clipboard per document
  - "What to do next" section with 3 numbered steps + AI assistant links
- **Case Study (/case-study)** with:
  - Interactive vertical timeline: 8 grants-hub phases with expandable detail
  - Status-coded nodes: emerald (success), amber (failure), indigo (recovery)
  - Phase 2 Review & Reflect node expanded by default (the star of the story)
  - "Lesson" callout in each expanded node
  - 4 methodology deep dives (accordion): Phases as hypotheses, Confidence scoring, Review & Reflect, Human-AI collaboration
  - Each deep dive has Maya summary (visible) + Brian depth (expandable)
  - Downloadable methodology summary (markdown, ~2 pages)
  - "Ready to build something?" CTA linking to /widget
  - "See the full story →" link from landing page Proof section
- Indigo/white/slate color palette (visual continuity with grants-hub)
- Mobile responsive (Tailwind mobile-first)
- **UX fixes** (Phase 5):
  - ScrollToTop on every route change
  - Sticky progress bar in widget (stays visible while scrolling)
  - FadeIn entrance animations (Intersection Observer) on landing page
  - Maya content pass: shorter headlines, tighter copy, less jargon
- **Trust pages** (Phase 5):
  - /about page: About Kamunity, FAQ (8 questions), Privacy Policy, Terms of Use
  - Footer links to About, Privacy (#anchor), Terms (#anchor)
- **Feedback** (Phase 6):
  - Floating feedback button toggles in-page anonymous feedback widget
  - Emoji reaction picker (❤️ 🤔 💡 🐛) + optional text
  - Netlify Forms backend (anonymous, no tracking)
  - Email fallback (mike@kamunityconsulting.com) on error
- **Animated visuals** (Phase 6):
  - MethodologyFlow: 7-step animated cycle (Research → Forward) with play/reset
  - On landing page and case study page
  - Pure CSS/React, no animation library
- **Brian further reading** (Phase 6):
  - 8 external links across 4 deep dives (Lean Startup, Toyota, Wikipedia, MindTools)
- **Rich deep dives** (Phase 7):
  - Key lesson box always visible per dive (no click required)
  - Further reading links always visible
  - Expandable "Read the full analysis" with magazine-style: subheadings, pull-quote boxes (indigo border), RichBlock renderer
- **Vine-o-coding live case study** (Phase 7):
  - 7-phase emerald timeline showing this site's own development
  - "You're reading a live case study" callout
  - Phase 7 shows spinning loader + "In progress" badge
- **SEO** (Phase 4):
  - Per-route document.title via custom useDocTitle hook
  - Open Graph + Twitter Card meta tags in index.html
  - JSON-LD WebApplication structured data
  - robots.txt + sitemap.xml
  - netlify.toml with build config, SPA redirect, cache headers
- Build: `npm run build` → dist/ (0 errors, 0 warnings, 1635 modules, 449KB / 137KB gzip)
- Dev: `npm run dev` → http://localhost:5173

### Reference Material (sibling project)
- `../grants-hub/` — the Community Grants Hub, Exhibit A for the methodology
  - 8 phases of documentation (research, triage, spec, critique, confidence, build logs)
  - Live at https://grants-hub.netlify.app
  - Includes a Phase 2 failure + Review & Reflect recovery — key teaching moment

### Infrastructure
- Vite 6.4.1 build system
- 101 npm packages, 0 vulnerabilities
- JSZip 3.x + FileSaver 2.x for client-side ZIP generation
- netlify.toml (build config, SPA redirect, cache headers)
- Build output: dist/ folder ready for Netlify drag-and-drop deploy

---

## What's Been Built (Phase History)

### Phase 0: Foundation (2026-02-15) — COMPLETE
- Human and engine discussed the methodology extraction
- Named the approach "Outcome Vine Coding"
- Agreed on structure: website with interactive widget + methodology report + case study
- Two personas defined: Maya (9th grader), Brian (3rd year uni)
- Two companion examples: Community Grants Hub (real) + Recipe Remix (hypothetical)
- Foundation documents written
- Project located at `kamunity-engine/outcome-vine/` (sibling to `grants-hub/`)

### Phase 1: Make It Clear (2026-02-15) — COMPLETE
- Scaffolded Vite + React 19 + Tailwind CSS 4 project
- Built landing page with Hero, Process (3 cards), and Proof sections
- Maya-friendly language throughout (9th grader clarity test passed)
- Proof section highlights grants-hub including the Phase 2 failure recovery
- Disabled "Start Building" CTA with honest "Soon" badge
- Clean build: 0 errors, dist/ deployable
- Confidence score: 85/100

### Phase 2: Make It Walkable (2026-02-15) — COMPLETE
- 6-step interactive widget at /widget
- Steps: Your Idea → Your Users → Boundaries → First Steps → Setup → Review & Download
- Companion examples (Grants Hub + Recipe Remix) at every step in tabbed panel
- Brian "lean-in" expandable sections at every step with theory references
- Document generation: 6 markdown files (CONSTITUTION, MISSION, RUNNER, PHASE_QUEUE, SETUP, STATE)
- Opening prompt generation (copyable, ready to paste into AI assistant)
- ZIP download via JSZip (all 6 documents, client-side)
- Copy-to-clipboard per document + opening prompt
- "What to do next" instructions with AI assistant links
- "Start Building" CTA activated (header + hero → /widget)
- Netlify SPA routing (_redirects)
- Clean build: 0 errors, 1619 modules, 392KB (122KB gzip)
- Confidence score: 84/100

### Phase 3: Make It Learnable (2026-02-15) — COMPLETE
- Case study page at /case-study with interactive vertical timeline (8 grants-hub phases)
- Phase 2 failure + Review & Reflect recovery highlighted (expanded by default)
- 4 methodology deep dives: Phases as hypotheses, Confidence scoring, Review & Reflect, Human-AI collaboration
- Two-layer content: Maya summaries visible, Brian depth expandable
- Downloadable methodology summary (markdown, ~2 pages)
- Landing page Proof section updated with "See the full story →" link
- Header nav updated with "Case Study" link
- Tailwind v4 gradient classes fixed (bg-gradient-to-br → bg-linear-to-br)
- Clean build: 0 errors, 1626 modules, 417KB (130KB gzip)
- Confidence score: 83/100

### Phase 4: Make It Findable (2026-02-15) — COMPLETE
- Per-route document.title (useDocTitle custom hook)
- Open Graph + Twitter Card meta tags in index.html
- JSON-LD WebApplication structured data (schema.org)
- robots.txt + sitemap.xml in public/
- netlify.toml: build config, SPA redirect, immutable cache headers for hashed assets
- Removed _redirects (replaced by netlify.toml)
- Clean build: 0 errors, 1627 modules, 417KB (130KB gzip)
- Confidence score: 82/100
- **Awaiting human action:** First deploy to Netlify, URL updates, cross-link with grants-hub, gather user feedback

### Phase 5: Make It Lived (2026-02-15) — COMPLETE
- Driven by UAT feedback (5 items from real user testing)
- Bug fix: ScrollToTop component (pages now start at top on navigation)
- Bug fix: Sticky progress bar in widget (stays visible while scrolling form)
- FadeIn entrance animations on landing page (Intersection Observer, staggered)
- Maya content pass: shorter headlines, tighter copy, less jargon
- /about page: About Kamunity, FAQ (8 questions), Privacy Policy, Terms of Use
- Floating feedback button (mailto: link, bottom-right)
- Header nav updated (About link, removed redundant Home link)
- Footer updated with About, Privacy, Terms links
- Sitemap updated with /about
- Clean build: 0 errors, 1631 modules, 426KB (132KB gzip)
- Confidence score: 86/100 (highest — evidence-driven phase)
- **Awaiting human action:** Redeploy to Netlify, verify fixes, broader user testing

### Phase 6: Make It Honest & Visual (2026-02-15) — COMPLETE
- Driven by Round 2 UAT feedback (7 items from 2 testers)
- Truthfulness audit: "5 short steps" replaces "5 simple questions", privacy policy updated for Netlify Forms
- Animated MethodologyFlow component (7-step play-through) on landing + case study
- Anonymous feedback widget (Netlify Forms: emoji + optional text, <90 sec)
- Brian further reading links in all 4 deep dives (8 external links)
- Desktop spacing tightened across all pages (less scrolling)
- FeedbackButton converted from mailto to widget toggle
- Hidden Netlify form in index.html for bot detection
- Hotfix: Netlify Forms `data-netlify="true"`, Process card truthfulness, Toolkit "What you'll need" section, Hero clarified
- New file: `src/components/Toolkit.jsx` — links to Windsurf, Cursor, Copilot, Netlify, Vercel, GitHub Pages
- Final build: 0 errors, 1634 modules, 443KB (136KB gzip)
- Confidence score: 84/100
- **Deployed:** https://vine-o-coding.netlify.app
- Round 3 UAT received → feeds Phase 7

### Phase 7: Make It Rich & Shareable (2026-02-15) — COMPLETE
- Driven by Round 3 UAT feedback (3 items from both testers)
- DeepDives refactored: lessons + links always visible, detail in expandable
- Magazine-style expanded content: RichBlock renderer with headings, pullquotes
- Vine-o-coding live case study: 7-phase emerald timeline on case study page
- New file: `src/lib/vineTimelineData.js`
- Final build: 0 errors, 1635 modules, 449KB (137KB gzip)
- Confidence score: 82/100
- **Deployed:** https://vine-o-coding.netlify.app
- Security R&R addendum: security headers, AI privacy notices, generated doc security guidance

### Phase 8: Make It Smooth & Navigable (2026-02-15) — COMPLETE
- Driven by Round 4 UAT feedback (2 items)
- FadeIn flicker fixed: CSS transitions replace keyframe animations
- Case study page split into 3 pages: /method, /case-study, /our-story
- Mobile hamburger nav added (collapses at <768px)
- Active page highlighting in nav
- New files: `src/pages/Method.jsx`, `src/pages/OurStory.jsx`
- Sitemap updated with new routes
- Final build: 0 errors, 1637 modules, 460KB (140KB gzip)
- Confidence score: 85/100
- **Deployed:** https://vine-o-coding.netlify.app

---

## Known Gaps

- ~~No code yet~~ (fixed in Phase 1)
- ~~No visual design~~ (fixed in Phase 1)
- ~~No interactive widget~~ (fixed in Phase 2)
- ~~No case study or deep dives~~ (fixed in Phase 3)
- ~~No SEO~~ (fixed in Phase 4)
- ~~No trust pages~~ (fixed in Phase 5 — About, FAQ, Privacy, Terms)
- ~~No feedback mechanism~~ (fixed in Phase 5 — floating button)
- ~~Scroll-to-top bug~~ (fixed in Phase 5)
- ~~Sticky progress bar~~ (fixed in Phase 5)
- ~~No feedback mechanism~~ → ~~mailto button~~ (Phase 5) → Netlify Forms widget (Phase 6)
- ~~Untruthful copy~~ (fixed in Phase 6 — "5 short steps", privacy policy)
- ~~Deep dives hide value behind click~~ (fixed in Phase 7 — lessons + links always visible)
- ~~FadeIn flicker~~ (fixed in Phase 8 — CSS transitions)
- ~~Case study page too long~~ (fixed in Phase 8 — split into 3 pages)
- ~~No mobile nav~~ (fixed in Phase 8 — hamburger menu)
- No accessibility audit (flagged in Phase 1 critique)
- No illustrated characters/pictorial animations (Maya's request)
- Blog-style editorial Our Story not yet built (timeline exists, narrative deferred)
- No automated tests for widget or case study
- No error handling for edge cases in widget
- Placeholder URL (outcome-vine.netlify.app) needs updating after deploy
- Footer anchor links (#privacy, #terms) need browser verification
- Netlify Forms needs deployment verification (hidden form detection)
- Maya may want richer visuals (illustrated characters, not just animated flow)
- No reduced-motion support for animations

---

## Unresolved Questions

| Question | Phase | Notes |
|---|---|---|
| ~~Exact widget steps and fields~~ | ~~Phase 2~~ | Resolved: 6 steps, 14 fields |
| ~~How much grants-hub detail in case study~~ | ~~Phase 3~~ | Resolved: title + outcome per phase, 3 phases with expanded treatment, expandable detail on all |
| ~~Whether to support AI assistants beyond Windsurf~~ | ~~Phase 2~~ | Resolved: docs are generic, links to Windsurf + Cursor + Copilot |
| Custom domain | Phase 5+ | outcome-vine.kamunity.ai? outcomevine.dev? TBD |
| Accessibility audit | Phase 5+ | ARIA landmarks, screen reader testing, keyboard navigation |
| Widget completion rate | Phase 5 | No analytics — need feedback mechanism or user testing |
| What real users actually need | Phase 5 | Site built without user feedback — Phase 5 must be evidence-driven |
