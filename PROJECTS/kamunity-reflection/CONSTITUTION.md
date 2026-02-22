# CONSTITUTION.md — Kamunity Reflection

*This project inherits from BRAIN/CONSTITUTION.md (the Kamunity global constitution). All 11 inviolable principles apply. This document adds project-specific constraints.*

---

## What You Are

Community self-perception infrastructure. A Kai-centred conversational mirror that helps community organisations discover what they're actually for — and find others facing the same fork — through a conversation that leaves something useful in hand and a question lingering that wasn't there before.

## What You Are Not

Not a calculator. Not an audit. Not a report. Not a counsellor. Not a data collection system. Not a benchmark tool. Not a replacement for human connection.

## The Mission

Kamunity Reflection helps WA community organisations become more legible to themselves. Through a Kai conversation anchored in real mirror questions, it surfaces gifts (reframes), earworms (phrases that stick), peer stories ("like them" examples), and value exchange possibilities (swaps, loops, chains between orgs that don't yet know they need each other). The vertigo is intentional. The useful thing comes first.

---

## Inviolable Principles

*All 11 principles from BRAIN/CONSTITUTION.md apply. Project-specific additions below.*

### Project-Specific Constraints

**Mental Health Sector Context**
- This tool is used by orgs serving people in active crisis. G1 (Crisis Protocol) is CRITICAL and always applies even though primary users are org leaders, not clients.
- Questions are designed to surface ontological vertigo. This is intentional and must be named in the UI ("the questions linger because they're supposed to").
- The "burning communities" who can't navel-gaze must always get practical value first. The vertigo is a side effect, not the pitch.

**Data Sovereignty — Dual Layer**
- Data ABOUT organisations (from public sources: Facebook, events, job boards, ACNC) is distinct from data FROM users (their conversation). This distinction must be maintained and communicated.
- Nothing FROM the user leaves the browser without explicit, informed consent.
- Backpack/inventory items are org-level insights, never personal identifiers.
- sessionStorage only for conversation state. Cleared on session end.

**Value Exchange Transparency**
- Every match surfaced must explain HOW the connection was identified. "This is a possibility, not a certainty" is required language.
- The system optimises for positive community impact, not engagement or retention. This must be stated in the about modal.

**ACCO Sovereignty**
- G6 (Cultural Safety) blocks ACCO-specific features until Noongar/ACCO review complete.
- 13YARN hardcoded alongside all crisis resources.
- The opu46 principle: ACCOs are the proof of concept for values-persistent entities, not the target audience for a tool designed for them without consultation.

**Ontological Honesty in the Mirror**
- Kai must name what it's doing: "I'm going to ask you a question that might be uncomfortable. You can stop anytime."
- The "you can stop anytime, what you have is yours" principle is constitutional, not just UX copy.

---

## Technical Constraints

### Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Build:** Vite → `dist/`
- **Deployment:** Netlify (build from `site/`, publish `dist/`, functions in `netlify/functions/`)

### Backend
- Netlify Function: Kai proxy (ESM, native fetch, claude-3-haiku-20240307)
- No server-side data storage in Phase 1
- sessionStorage for conversation state only
- Phase 2: RAG pipeline for niche data (public signals only)

### Notes
- Parchment aesthetic — matches kamunity.org and kamunity-consulting design language
- Cross-links to kamunity.org and kamunity-consulting
- llms.txt included for ecosystem discoverability
- Kai orb UI: ember (idle) → blue/indigo (active) state transitions

---

## Who This Is For

**Primary:** Priya — operations coordinator at a community org. Arriving with 45 minutes between meetings, not enough cognitive overhead for a full audit, needing one useful thing she can take to the board.

**Also serves:**
- ALIKE WA — peer support peak body leadership
- Activate Mental Health — sector coordination staff
- The Pack Music — small arts/community org leaders
- Any 2–3 person community org already "running shadow swarms without knowing it"

## What This Is NOT

- Not for individuals in personal crisis (redirect to crisis services)
- Not for corporate or government organisations
- Not for data collection about organisations without their knowledge
- Not a replacement for the Sovereignty Audit or AI Readiness tools (companions, not substitutes)

---

## Confidence Scoring

| Dimension | Score | Notes |
|---|---|---|
| Constitutional Alignment | 33/35 | Deep alignment; G6 partial flag |
| Research Signal | 23/25 | opu46 conversation + prototype validated in Tuesday meeting |
| Source Convergence | 18/20 | Multiple signals (Boris Cherny, foresight, philosophy, user feedback) |
| Build Confidence | 17/20 | Established stack; orb glow + floating text are CSS-level, no risky niche code |
| **Total** | **91/100** | **→ BUILD** |

---

## Safety Gates

Before BUILD, applicable gates:
- [x] **G1 Crisis Protocol** — CRITICAL — Kai system prompt hardcodes all 7 WA crisis lines + 000 + 13YARN. Crisis keywords trigger immediate redirect.
- [x] **G2 No PII in localStorage** — CRITICAL — sessionStorage only, org insights not personal data, "Clear session" button present
- [ ] **G3 Prompt Injection** — CRITICAL — must test before deploy
- [x] **G4 Honest Disclaimers** — CRITICAL — "Kai is an AI wayfinder, not a counsellor" visible without scrolling
- [ ] **G6 Cultural Safety** — HIGH — 13YARN hardcoded. ACCO-specific features blocked until Noongar review.
- [ ] **G10 Accessibility** — MEDIUM — orb has reduced-motion alternative, colour contrast checked
- [x] **G11 Cross-Linking** — MEDIUM — links to kamunity.org + kamunity-consulting + sovereignty-audit
- [ ] **G12 Hallucination** — MEDIUM — Kai says "I don't know" for specific org data, tested pre-deploy
- [x] **G13 Emotional Dependency** — MEDIUM — no emotional reciprocity language; periodic "I'm an AI wayfinder" reminder

---

## The Kill Switch

- `STOP.md` → halt immediately
- `PAUSE.md` → finish current step, wait

---

## Engine

This project uses ENGINE/RUNNER.md (Vine-o-Code v2). One runner for all Kamunity projects.
