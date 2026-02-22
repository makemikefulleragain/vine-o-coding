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
**Status:** COMPLETE ✅ (2026-02-22)

**Goal:** Ship a deployed, working Kai-centred mirror interface with curated data, parchment aesthetic, and the core conversation experience.

**Done When:**
- [x] Kai orb renders with ember→blue state transitions on parchment background
- [x] Split screen layout works (desktop L/R, mobile top/bottom)
- [x] Dynamic text input (3→6 rows, grow then scroll, mic button, submit)
- [x] Floating text output (mid-screen, expands up, fades at top, scrollable)
- [x] Kai responds via Netlify Function (Claude API, crisis protocol hardcoded)
- [x] Presentation cards appear with gift/story/exchange content
- [x] Backpack toggle works (add/not now/not for me, status, 2 latent options)
- [x] Modal cards work (about, feedback via Netlify form)
- [x] G1, G2, G4, G13 safety gates pass
- [x] llms.txt, cross-links, disclaimers present
- [x] Deployed to Netlify — https://kamunity-reflection.netlify.app

**Dependencies:** None — greenfield.
**Safety Gates:** G1, G2, G4, G13 (critical). G10, G11, G12 (medium — proceed with flag).

---

## Phase 2: Data Layer — Signal Detection
**Timeline:** 2026-02-22
**Status:** CLOSED ✅ (2026-02-22) — shipped with known limitations

**Goal:** Auto-populated RAG pipeline that reads public signals (Facebook, Eventbrite, Ethical Jobs, ACNC) to detect need/have signals and pre-populate exchange possibilities before any org sits down.

**Done When:**
- [x] Signal taxonomy defined — `src/data/wa-sectors.js` (need/have signals per sector)
- [x] WA sector intelligence — 6 sectors, 18 WA org profiles, exchange templates (public data)
- [x] ACNC data.gov.au API integration — live WA charity count by sector (3s timeout, graceful fallback)
- [x] Kai references real WA orgs in "like them" stories (sector-detected, hedged language)
- [x] Exchange possibilities include confidence rating and HOW explanation
- [x] Sector detection from conversation keywords — server-side, transparent
- [x] Compact all-sector map — all 18 orgs always in prompt, cross-sector exchange patterns
- [x] Exchange calibration — documented patterns vs inferred pairings with hedging language
- [x] System prompt redesigned — stage-driven architecture (5 stages, Q1→Q4→synthesis)
- [x] Voice I/O — TTS toggle (SpeechSynthesis, AU English), continuous mic (Web Speech API)
- [x] Chat formatting — paragraph splits, scroll-to-start of new messages
- [x] JSON parsing hardened — truncation fallback, raw-JSON guard, dangling card strip
- [ ] At least 2 more live public data sources (Ethical Jobs, Eventbrite — deferred)
- [ ] Scheduled data refresh (Netlify scheduled functions — deferred)

**Known Limitations (Haiku model ceiling):**
- Kai still uses banned phrases ("I see", praise, filler) — Haiku ignores prohibitions over long conversations
- Word limit (60w) not reliably enforced — responses drift to 80-120 words by mid-conversation
- Advice still given despite mirror-only instruction — "I'd suggest..." slips through
- Closing synthesis cards sometimes render as raw JSON in message text instead of structured cards
- Conversation feels like a "nice chat" rather than achieving something — the reframes and exchange cards need stronger model to land with conviction

**Fix paths for Phase 2+:**
1. Upgrade to Claude 3.5 Sonnet (better instruction following, ~10x cost)
2. Client-side enforcement (strip banned phrases, truncate word limit, catch JSON card leaks)
3. Both

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
| 2026-02-22 | Phase 1 complete — deployed to https://kamunity-reflection.netlify.app | User tested and confirmed, API key set | 
| 2026-02-22 | Phase 2 started — sector intelligence layer | wa-sectors.js (6 sectors, 20+ WA orgs), ACNC integration, sector detection server-side in kai.js |
| 2026-02-22 | Phase 2 closed — shipped with known Haiku limitations | All-sector map, stage-driven prompt redesign, voice I/O, JSON hardening, exchange calibration. Haiku model ceiling hit: banned phrases ignored, word limits drift, advice leaks. Fix paths documented. |

---

*Review this queue at every FORWARD step. If the priority order no longer makes sense, change it and log why.*
