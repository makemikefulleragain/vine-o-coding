# PHASE_QUEUE.md — Kamunity Reflection

*This queue is a hypothesis, not a contract. Evidence changes the plan.*

---

## How Phases Work

Each phase follows the Vine-o-Code v2 loop (see ENGINE/RUNNER.md):
```
RESEARCH → TRIAGE → SPEC → BUILD → CRITIQUE → CONFIDENCE SCORE → FORWARD
```

Before BUILD, check BRAIN/SAFETY_GATES.md for applicable gates.

---

## Phase 1: Foundation Interface
**Timeline:** Session 1 (Feb 22, 2026)
**Status:** IN PROGRESS

**Goal:** Ship a deployed, working Kai-centred mirror interface with curated data, parchment aesthetic, and the core conversation experience.

**Done When:**
- [ ] Kai orb renders with ember→blue state transitions on parchment background
- [ ] Split screen layout works (desktop L/R, mobile top/bottom)
- [ ] Dynamic text input (3→6 rows, grow then scroll, mic button, submit)
- [ ] Floating text output (mid-screen, expands up, fades at top, scrollable)
- [ ] Kai responds via Netlify Function (Claude API, crisis protocol hardcoded)
- [ ] Presentation cards appear with gift/story/exchange content
- [ ] Backpack toggle works (add/not now/not for me, status, 2 latent options)
- [ ] Modal cards work (about, feedback via Netlify form)
- [ ] G1, G2, G4, G13 safety gates pass
- [ ] llms.txt, cross-links, disclaimers present
- [ ] Deployed to Netlify

**Dependencies:** None — greenfield.
**Safety Gates:** G1, G2, G4, G13 (critical). G10, G11, G12 (medium — proceed with flag).

---

## Phase 2: Data Layer — Signal Detection
**Timeline:** After Phase 1 UAT + evidence of engagement
**Status:** Not started

**Goal:** Auto-populated RAG pipeline that reads public signals (Facebook, Eventbrite, Ethical Jobs, ACNC) to detect need/have signals and pre-populate exchange possibilities before any org sits down.

**Done When:**
- [ ] Signal taxonomy defined and documented (need vs have indicators)
- [ ] At least 3 public data sources ingesting on schedule
- [ ] Kai can reference real local examples in "like them" stories
- [ ] Exchange possibilities include confidence rating and HOW explanation
- [ ] Data pipeline is transparent (users can ask "how did you find that?")

**Dependencies:** Phase 1 complete. Real user engagement as evidence signal.
**Safety Gates:** G2 (public data only, no PII), G6 (no ACCO data without consultation), G12 (hallucination risk increases with RAG — must test).

---

## Phase 3: Value Exchange Matching
**Timeline:** After Phase 2 stable + 10+ org interactions
**Status:** Not started

**Goal:** Kai identifies and surfaces swap, loop, and chain exchange possibilities between specific organisations — with transparency about the match logic.

**Done When:**
- [ ] Swap detection working (A has X + needs Y, B has Y + needs X)
- [ ] Loop detection working (A→B→C→A three-way)
- [ ] Chain surfaced as "possible, not certain" with explicit reasoning
- [ ] "Like them" stories populate from real matched cases (not just curated)
- [ ] Decision history working: "3 orgs faced this fork — here's what each chose"
- [ ] Constitution alignment check: matches optimise for community impact, not engagement

**Dependencies:** Phase 2 data pipeline stable.

---

## Phase 4: Decision History + Peer Corpus
**Timeline:** Evidence-gated
**Status:** Not started

**Goal:** Build the commons of recognition stories — real examples of the "moment of recognition and what they did next" — surfaced as peer mirrors.

**Done When:**
- [ ] Opt-in story capture mechanism (consent-based, org can review before it goes in)
- [ ] Stories anonymised at org discretion
- [ ] Corpus searchable by Kai for decision proximity matches
- [ ] "You too?" moment is a real feature, not a promise

**Dependencies:** Phase 3 + real engagement + consent framework.

---

## Phase 4+: Based on Evidence

*What comes next depends on what Phases 1–3 reveal. Do not plan beyond what evidence supports.*

Possible directions:
- Kai-facilitated introductions between matched orgs
- Sector-specific modules (peer support, arts, ACCO — each with distinct starting questions)
- Kitchen Table integration: Reflection as lead signal feeding Waymaker
- Open-source release of the value exchange matching logic for community governance

---

## Change Log

| Date | Change | Rationale |
|---|---|---|
| 2026-02-22 | Queue created | Initial hypothesis based on opu46 conversation + kamunity-mirror.html prototype + user confirmation |

---

*Review this queue at every FORWARD step. If the priority order no longer makes sense, change it and log why.*
