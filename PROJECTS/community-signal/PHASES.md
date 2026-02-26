# COMMUNITY SIGNAL SYSTEM — PHASES

*Vine-o-Code v2 build queue. Each phase has a done condition. No phase starts until the previous phase's done condition is met. Each phase leaves the system in a better state than before.*

---

## Phase 0: SCAFFOLDING
**Duration:** 1 session
**What:** Create all project documents. No code.

### Done Condition
- [x] MISSION.md exists and is reviewed
- [x] PHASES.md exists (this document)
- [x] ROADMAP.md exists
- [x] CHANGELOG.md exists, starts at v4.0
- [x] prompts/signal-extraction.md exists and is reviewed
- [x] prompts/traceability-test.md exists and is reviewed
- [x] prompts/match-make.md exists and is reviewed
- [x] data/prosocial-tech-directory.json is seeded with known tools
- [x] SPEC.md (v4.0) is in place
- [x] Constitutional check: nothing in these documents conflicts with BRAIN/CONSTITUTION.md
- [x] Mike has reviewed and approved all documents

**Constitutional check:** Does anything here conflict with BRAIN/CONSTITUTION.md? Flag before proceeding.

---

## Phase 1: SENSE
**Duration:** Week 1-2
**What:** Layer 1 — Kai learns to read the weather.

### Build Order
1. `netlify/functions/signal-ingest.mjs` — email ingestion endpoint
2. RSS parser feeding same pipeline
3. `netlify/functions/signal-filter.mjs` — 3-stage weak tie filtering (uses prompts/signal-extraction.md)
4. Signal taxonomy v1 (seeded from ecosystem-state.json categories)
5. Kitchen Table "Sector Pulse" view — what's happening, what's changed, what's emerging
6. Supabase table: sector_signals (anonymous, timestamped, tagged)

### Done Condition
- [x] A forwarded sector newsletter email arrives at the endpoint and produces a structured signal
- [x] An RSS feed item from WACOSS or WALGA is parsed and produces a structured signal
- [x] A weak tie source is scored, and items below threshold are discarded with reason (1 discarded in e2e test)
- [x] Pulse view shows this week's signal summary in Kitchen Table
- [x] Mike can review and approve/reject signals in 10 minutes on a Monday morning
- [x] No personal data stored anywhere — sector-level only
- [x] Sources attributed on every signal
- [x] `llms.txt` exists at site root (Constitution Principle 11 — ecosystem coherence)

### Does NOT include
- Signal cards in Kai (that's Phase 2)
- Newsletter generation (that's Phase 2)
- Matching or making (that's Phase 3)

---

## Phase 2: PROPAGATE
**Duration:** Week 2-3
**What:** Layer 2 — Signal moves in all directions.

### Build Order
1. Signal card v2 for Kai (bilateral: need + offer, smart trigger after 3+ exchanges)
2. Supabase tables: community_signals + community_offers (anonymous)
3. Kitchen Table "Signals" view (tag cloud, themes, emerging patterns)
4. Newsletter template — Kai-drafted, weekly cadence
5. Commons auto-draft pipeline (pattern → Substack draft + LinkedIn scaffold → human review queue)
6. Mob contribution interface (simple "add signal from field" in Kitchen Table)
7. Aggregation principle enforcement (traceability test from prompts/traceability-test.md)
8. Monthly commons report template (Waymaker-generated, human-reviewed)

### Done Condition
- [x] Kai can surface the bilateral signal card at the right moment (not a timer, depth-triggered)
- [x] A signal submitted via Kai is stored anonymously in Supabase
- [x] Kitchen Table shows emerging patterns from accumulated signals
- [x] A newsletter draft is auto-generated from this week's patterns — human reviews before send
- [x] The traceability test correctly blocks publication when cohort is too small
- [x] The traceability test correctly allows publication when pattern is safely anonymous
- [x] A Mob member can add a field signal through Kitchen Table
- [ ] Signals from sensitive/small-cohort sectors are automatically flagged for heightened scrutiny (larger cohort required, extra human review) — traceability test enforces this via sensitivity dimension elevation; dedicated cohort-size guard pending e2e confirmation
<!-- PLACEHOLDER: Specific handling rules for high-risk sector groups to be added after appropriate consultation. -->

### Does NOT include
- Matching signals to people (that's Phase 3)
- Sending DMs (that's Phase 4)
- Human handoff (that's Phase 5)

---

## Phase 3: MATCH + MAKE
**Duration:** Week 3-4
**What:** Layer 3 — Waymaker finds connections, Kai makes things.

### Build Order
1. Prosocial tech directory loaded (from data/prosocial-tech-directory.json)
2. Triage logic: check directory BEFORE any generation step
3. Waymaker match + make prompt (from prompts/match-make.md)
4. Kai generative mode: context-aware document generation mid-conversation
5. Commons library (Supabase: accumulated templates, searchable)
6. Constellation graph: bilateral need/offer matching across opted-in members
7. Auto-draft pipeline: pattern → thing → commons draft + social scaffold → human queue

### Done Condition
- [ ] When a pattern matches an existing prosocial tool, triage returns "CONNECT" or "EXTEND" — not "MAKE"
- [ ] When nothing exists, Kai generates a useful document (template, policy, framework) sized to the sector/org
- [ ] The generated thing is good enough that a small NFP ops coordinator would actually use it
- [ ] Waymaker presents the full package: thing + context + proposed publication + match + triage reasoning
- [ ] Mike can ship, refine, or skip in one decision
- [ ] Commons library accumulates templates attributed to pattern, not person
- [ ] Constellation graph shows bilateral connections (need ↔ offer)

### Does NOT include
- Sending anything to anyone outside the system (that's Phase 4)
- Human handoff (that's Phase 5)

---

## Phase 4: OFFER
**Duration:** Week 4-6
**What:** Layer 4 — The gift is the thing itself.

### Build Order
1. Opt-in card for Kai (single field, explicit consent)
2. Supabase: opted_in_contacts (consent timestamp, sector tags, nothing else)
3. DM generator (Waymaker prompt → email WITH thing attached)
4. Email send via Netlify + Resend/Postmark
5. Kitchen Table "Outreach" view (pending, sent, response tracking)
6. Unsubscribe mechanism (instant, no questions, all data deleted)
7. Feedback loop ("did this land?" → improves future generation)

### Done Condition
- [ ] A real person opts in after a positive Kai encounter
- [ ] When a match is found, a DM is drafted with the thing attached — not behind a link
- [ ] The DM includes transparent matching reason
- [ ] Mike reviews and approves the DM before send
- [ ] The DM contains nothing that traces back to the signal source
- [ ] Unsubscribe works in one click and deletes all stored data
- [ ] At least one person responds with "this is useful" (or tells us why it isn't)

### Does NOT include
- Human handoff routing (that's Phase 5)

---

## Phase 5: HANDOFF
**Duration:** Month 2+
**What:** Layer 5 — The coffee only a human can pour.

### Build Order
1. Kitchen Table "Mob" availability widget (weekly Y/N + skills tags)
2. Handoff routing logic in Waymaker (match response to available human)
3. Response notification system (email → Kitchen Table alert)
4. Mob interface (Kitchen Table panel or lightweight protected page)
5. Tier 3 honest-delay template ("everyone's at capacity this week")
6. Tier 4 capacity alarm (chronic shortage flags strategic review)

### Done Condition
- [ ] When someone responds to a DM, the right human is notified
- [ ] If Mike is unavailable, a Mob member is matched by skills + sector
- [ ] If no one is available, the honest-delay response goes out (not silence)
- [ ] If Tier 3 triggers 3+ weeks running, Kitchen Table flags it as strategic problem
- [ ] At least one successful coffee happens — response → human connection → real help
- [ ] The person helped is invited (not pressured) to become someone who helps next

---

## Future Phases (not yet scoped)

### Phase 6: FEDERATION
Multiple Kamunity instances interoperating while maintaining community control. First-wave partners: ALIKE, The Pack, WACOSS/WALGA connections.

### Phase 7: SELF-IMPROVEMENT
The system uses its own signal data to improve its own methodology. Autocatalytic loop. Vine-o-Code building better Vine-o-Code.

### Phase 8: HANDOVER
The system is fully operated by the Mob. Mike is optional. Kamunity is community infrastructure, not a founder's project.
