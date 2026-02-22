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

## Phase 2+: Conversation Quality Sprint
**Timeline:** 2026-02-23
**Status:** COMPLETE ✅ (2026-02-23) — UAT passed by user

**Trigger:** R&R protocol — Phase 2 UAT failed on conversation quality after 9 prompt iterations. Root cause: Haiku model ceiling, not prompt design. See `phases/phase-02/review-reflect.md`.

**Decision made:** B (client-side enforcement) + architectural redesign. Model upgrade blocked — API key only has access to `claude-3-haiku-20240307`. Newer models (3.5 Haiku, 3.5 Sonnet) require Anthropic Build tier (credit card). Documented in change log.

**Shipped:**
- [x] Fork architecture: Act 1 (identity, 4 mirror questions) → choice → Path A (relational) or Path B (practical)
- [x] Three separate system prompts — identity (pure mirror), relational (depth + stories), practical (exchange matching + sector map)
- [x] `fork: true` signal from Kai after Q4 synthesis — triggers fork UI
- [x] Client-side enforcement: `sanitiseKaiResponse` — strips banned phrases, extracts leaked JSON cards, truncates at 60 words
- [x] Landing page — pitch, transparency, crisis numbers, single CTA
- [x] Act 1: full-width chat, no columns, small ember orb indicator left of Kai messages, cards held silently
- [x] Fork UI: two inline buttons replace text input after synthesis
- [x] Act 2: 4/5 chat + 1/5 orange 🎒 backpack trigger strip
- [x] Backpack panel: slide-in modal, orange header, New (expanded) + Saved (collapsed) sections
- [x] Christmas morning: held cards flood into backpack on fork transition, panel opens automatically
- [x] UAT passed — user confirmed

**Dependencies:** Phase 2 complete ✅
**Safety Gates:** G12 (hallucination risk — test with known orgs like ALIKE WA, The Pack Music)

---

## Phase 3: Model Upgrade + Conversation Depth
**Timeline:** When Anthropic Build tier is activated
**Status:** Blocked — API key tier

**Goal:** Unlock the full conversational quality the architecture was designed for. The fork, prompts, and backpack are built for a model that can actually hold the instructions. Haiku is the ceiling, not the design.

**Trigger:** Add credit card to Anthropic account → Build tier → swap model in `kai.js`.

**Model path:**
1. `claude-3-5-haiku-20241022` — immediate swap, ~$0.004/conversation, significant quality jump
2. `claude-3-5-sonnet-20241022` — best instruction following, ~$0.02/conversation, ideal for the relational path

**Done When:**
- [ ] Model upgraded to at least `claude-3-5-haiku-20241022`
- [ ] Full 8-turn UAT: no banned phrases, ≤60 words, no advice, cards render correctly
- [ ] Relational path (Path A) delivers 2–3 genuine reframes the user wants to keep
- [ ] Practical path (Path B) surfaces at least 1 real exchange card with a named WA org and honest confidence rating
- [ ] Conversation feels like something was achieved — not just a nice chat
- [ ] Decision history: "3 orgs faced this fork — here's what each chose" (requires corpus, see Phase 4)

**Dependencies:** Phase 2+ complete ✅. Anthropic Build tier.
**Safety Gates:** G12 (hallucination risk — test with ALIKE WA, The Pack Music, Activate Mental Health).

---

## Phase 4: The Peer Layer — Commons Making Itself Visible
**Timeline:** Evidence-gated. After Phase 3 UAT passes and real org engagement begins.
**Status:** Not started

### The Vision

Scarcity is mostly an information problem, not a resource problem.

On any street on any day there is already enough — skills, time, knowledge, care, equipment, relationships. The commons already exists. It is invisible to itself.

Kamunity Reflection is the infrastructure that makes the latent visible — without a profit motive distorting the door it comes through.

The current tool operates at the **org layer**: it helps organisations see themselves clearly and find other organisations worth talking to. Phase 4 opens the **peer layer**: two people on the same street who are already each other's resource and don't know it yet.

The POTS illustration: the algorithm found her eventually, but for the worst reason and through the worst door — profit-motivated latent value extraction dressed as community. Kamunity finds the connection for the right reason. That changes everything about the interaction when it happens.

The value was always there. Fully present. 99% latent.

### The Exchange Model

Three types of value exchange — already in the codebase, needs real peer data to power:
- **SWAP**: A has X + needs Y. B has Y + needs X. Direct.
- **LOOP**: A→B→C→A. Three-way.
- **CHAIN**: Longer sequence, surfaced as "possibility worth exploring."

These work for orgs now. Phase 4 makes them work for people.

### Constitutional Principles for Phase 4

1. **Connection for the right reason.** Matches are made to surface latent value between people, not to enrich a dataset or increase engagement metrics.
2. **Consent is the architecture.** Nothing enters the peer corpus without explicit opt-in. People can review, edit, or remove their profile at any time.
3. **The commons governs itself.** The matching logic is transparent and community-auditable. No black box.
4. **Anonymity at discretion.** People choose their own level of visibility. The system works at every level.
5. **Scarcity is the lie we're undoing.** Every design decision is tested against this: does this reinforce scarcity thinking or dissolve it?
6. **ACCO sovereignty.** Aboriginal and Torres Strait Islander community data, stories, and connections are governed by those communities. No ACCO data without explicit consultation and community control. (Safety Gate G6.)

### Conversation Tone for Phase 4

The current Kai voice is calibrated for organisations. The peer layer needs a different register:
- Warmer, less formal — talking to a person, not a CEO
- The four mirror questions adapt: "If you disappeared from your street tomorrow, what would actually be missing?"
- The fork adapts: "Someone to sit with this" vs "Someone nearby who might have what you need"
- The backpack adapts: gifts are personal insights, exchanges are peer connections
- The earworm matters more — it's what someone carries home on the bus

### Done When
- [ ] Consent-based peer profile capture (opt-in, review before it goes in, remove anytime)
- [ ] Peer HAVE/NEED signal model — distinct from org model, personal language
- [ ] Peer corpus searchable by Kai for proximity matches (same suburb, same challenge, complementary skills)
- [ ] "You too?" moment is a real feature — Kai can say "someone two streets away has the same thing" with permission
- [ ] Decision history: real stories from real people who faced the same fork
- [ ] ACCO consultation completed before any First Nations peer data enters the system
- [ ] Community governance model for the matching logic — who audits it, how
- [ ] Kai conversation tone adapted for peer layer (separate prompt set)
- [ ] Privacy impact assessment completed

**Dependencies:** Phase 3 complete. Real org engagement generating stories. Consent framework designed with community input. ACCO consultation.
**Safety Gates:** G2 (PII — peer data is PII, treat accordingly), G6 (ACCO sovereignty), G13 (AI transparency — peers must know they're talking to AI and what happens to their data).

---

## Phase 5+: Based on Evidence

*What comes next depends on what Phases 3–4 reveal. Do not plan beyond what evidence supports.*

Possible directions:
- Kai-facilitated introductions between matched peers and orgs
- Sector-specific peer modules (mental health peer support, arts community, disability — each with distinct starting questions and safety protocols)
- Kitchen Table integration: Reflection as lead signal feeding Waymaker
- Open-source release of the value exchange matching logic for community governance
- The question of whether Kamunity should hold the data at all, or whether the commons should govern itself through a different structure entirely

---

## Change Log

| Date | Change | Rationale |
|---|---|---|
| 2026-02-22 | Queue created | Initial hypothesis based on opu46 conversation + kamunity-mirror.html prototype + user confirmation |
| 2026-02-22 | Phase 1 complete — deployed to https://kamunity-reflection.netlify.app | User tested and confirmed, API key set | 
| 2026-02-22 | Phase 2 started — sector intelligence layer | wa-sectors.js (6 sectors, 20+ WA orgs), ACNC integration, sector detection server-side in kai.js |
| 2026-02-22 | Phase 2 closed — shipped with known Haiku limitations | All-sector map, stage-driven prompt redesign, voice I/O, JSON hardening, exchange calibration. Haiku model ceiling hit: banned phrases ignored, word limits drift, advice leaks. Fix paths documented. |
| 2026-02-23 | Phase 2+ complete — UAT passed | Fork architecture (Act 1 identity → Path A relational / Path B practical), three system prompts, client-side enforcement (sanitiseKaiResponse), landing page, ember orb message indicator, backpack panel slide-in modal, Christmas morning card reveal. Model upgrade blocked — API key only allows claude-3-haiku-20240307. |
| 2026-02-23 | Phase 3 reframed — Model Upgrade + Conversation Depth | Blocked on Anthropic Build tier. One-line swap in kai.js once credit card added. Model path: 3.5 Haiku (~$0.004/conv) → 3.5 Sonnet (~$0.02/conv). |
| 2026-02-23 | Phase 4 rewritten — The Peer Layer | Full vision documented: scarcity as information problem, peer-to-peer exchange (SWAP/LOOP/CHAIN), constitutional principles (consent, ACCO sovereignty, community governance), conversation tone for peer layer, POTS illustration as founding wound. |

---

*Review this queue at every FORWARD step. If the priority order no longer makes sense, change it and log why.*
