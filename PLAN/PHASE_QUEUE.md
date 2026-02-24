# KAMUNITY UNIFIED PHASE QUEUE
## Cross-Project Priority Queue
### Last Updated: Feb 20, 2026

*This queue is a hypothesis, not a contract. Evidence changes the plan. Phases can be reordered, split, or replaced based on what reality reveals.*

*Phases are listed in priority order across ALL active projects. The queue answers: "What's the single most important thing to build next?"*

---

## How Phases Work

Each phase follows the Vine-o-Code v2 loop:
```
RESEARCH → TRIAGE → SPEC → BUILD → CRITIQUE → CONFIDENCE SCORE → FORWARD
```

Before BUILD, check SAFETY_GATES.md. If any critical/high gate fails → BLOCKED.

**Done When** criteria are binary (yes/no). A phase is done when ALL criteria pass. No partial credit.

---

## ACTIVE

### ~~KP-01: Safety Critical — Kai Crisis Protocol + Disclaimers~~ ✅ COMPLETE — Feb 19, 2026
**Project:** Kamunity Ecosystem (cross-cutting)
**Priority:** CRITICAL — blocks ALIKE showcase and all public promotion
**Timeline:** This week (before Feb 24)

**Goal:** Every public-facing tool is safe for vulnerable users to encounter.

**Done When:**
- [x] WA crisis resources hardcoded into Kai's system prompt (not AI-generated)
- [x] Kai tested with 3 crisis scenarios — redirects to humans every time
- [x] Kai tested with 3 prompt injection attempts — constitution holds
- [x] Honest disclaimers on ALL public sites (kamunity.org, .ai, audit, readiness, vine-o-code)
- [x] Results documented — see PLAN/kp-01-safety-tests.md, UAT signed off Feb 19

**Dependencies:** None. This is the first thing.
**Safety Gates:** G1 ✅ G3 ✅ G4 ✅ — all PASS

---

### KP-02: Meeting Prep — ALIKE, Activate MH, AI Speaker
**Project:** Kamunity Ecosystem (relationships)
**Priority:** HIGH — three meetings next week
**Timeline:** This week (before Feb 24)

**Goal:** Walk into each meeting with context, demo flow, and clear outcome goals.

**Done When:**
- [ ] 5-minute ALIKE demo flow prepared and tested
- [ ] ALIKE priorities researched (website, socials, recent media)
- [ ] Activate MH value proposition written (bridge "AI is scary" → "here's how we make it safe")
- [ ] International AI Speaker researched (topics, community, location)
- [ ] AI Safety Checklist one-pager created as leave-behind

**Dependencies:** KP-01 (Kai must be safe before demo)

---

### ~~KP-04: Kai Deepening — Ecosystem Knowledge + Inline Tools~~ ✅ COMPLETE
**Project:** kamunity.org (Kai)
**Priority:** HIGH (Option B)
**Timeline:** Weeks 2-3

**Goal:** Kai knows the full ecosystem and can run tools conversationally.

**Done When:**
- [x] ecosystem-state-full.json deployed to Kai's data source — v0.2.0 with 11-site full_site_registry. Feb 20.
- [x] Kai can describe all ecosystem sites — full_site_registry in ecosystem-state.json + strengthened system prompt. Feb 20.
- [x] Kai runs AI Readiness quiz inline (questions as cards, results interpreted)
- [x] Kai runs Vine-o-Code 6 questions conversationally (outputs foundation doc pack)
- [x] All ecosystem sites cross-linked + llms.txt updated — sovereignty-audit + ai-readiness footers + llms.txt updated. Feb 20.

**Dependencies:** KP-01 (safety first)

---

### ~~KP-06: Campfire Consolidation — Codebase Consolidation~~ ✅ COMPLETE
**Project:** Infrastructure
**Priority:** HIGH (Option B)
**Timeline:** Weeks 3-4

**Goal:** All code in one place, all history preserved, clean forward state.

**Done When:**
- [x] Archive zip created (all 26 folders + provenance index)
- [x] Folder structure created (BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, WORKSHOP/, ARCHIVE/)
- [x] Active projects moved to PROJECTS/
- [x] Valuable docs extracted to KNOWLEDGE/
- [x] CI/CD verified for kamunity.org, kamunity.ai, wedding
- [x] Auto-named Netlify sites renamed
- [x] Old Netlify sites archived
- [x] Old GitHub repos set to private with archive notes
- [x] important teck/ moved to secure location

**Dependencies:** Phase 0 audit (DONE), Phase 1 BRAIN/ (DONE), Phase 2 PLAN/+ENGINE/ (this phase)

---

## NEXT

### ~~KP-08: Perth Community Services Directory~~ ✅ COMPLETE — Feb 24, 2026
**Project:** kamunity.org ecosystem
**Priority:** NORMAL (Option C)
**Timeline:** Weeks 4-6

**Goal:** 13-domain directory with referral intelligence. Start with 3 domains.

**Done When:**
- [x] Data structure defined (`perth-directory.ts`)
- [x] Initial domains populated (Disability, MH, Digital Inclusion)
- [x] Kai matching logic integrated (system prompt)
- [x] Tested with Persona (Priya)

### KP-09: Community Rooms (Active)
**Project:** kamunity.ai
**Priority:** NORMAL (Option C)
**Timeline:** Weeks 6-10

**Goal:** Async discussion spaces with Kai as host either in the kamunity.ai site or as a stand alone room on its own github/netlify/supabase/resend/etc. Wedding room is first test case for a solo room and kamunity.ai is the first test for a collection of rooms.

**Done When:**
- [ ] Supabase persistence for rooms
- [ ] Kai hosts conversations
- [ ] Community moderation model defined
- [ ] Wedding room live and used by family/guests
- [ ] At least one community topic room live

---

### ~~KP-03: Revenue Infrastructure~~ ✅ COMPLETE — Feb 24, 2026
**Project:** Kamunity Consulting
**Priority:** HIGH — survival dependency
**Timeline:** Weeks 2-3

**Goal:** Be ready to invoice when the first client says yes.

**Done When:**
- [x] One-page consulting offer document (4 services, transparent two-tier pricing)
- [x] Invoicing set up (Xero/Wave)
- [x] ABN sorted
- [x] Professional indemnity insurance active (Safety Gate G5)
- [x] WACOSS emailed (digitalinclusion@wacoss.org.au)
- [x] Spacecubed contacted

**Dependencies:** KP-02 (meetings may generate first client)
**Safety Gates:** G5 must PASS before first paid engagement. (✅ PASSED)

---

### KP-07: WALGA Project
**Project:** WALGA (live client)
**Priority:** NORMAL (Shifted pending scope)
**Timeline:** Ongoing

**Goal:** Deliver value to WALGA. Learn from the engagement. Document methodology.

**Done When:**
- [ ] Scope defined (to be determined based on WALGA needs)
- [ ] Kitchen Table zone created for WALGA tracking
- [ ] Methodology learnings documented for reuse

**Dependencies:** KP-03 (invoicing infrastructure)

---

### KP-05: NLnet Application
**Project:** Kamunity Grants
**Priority:** NORMAL (Shifted for Option B/C delivery focus)
**Timeline:** Before April 1, 2026 (12:00 CEST)

**Goal:** Complete, polished NLnet NGI Zero Commons application submitted.

**Done When:**
- [ ] NLnet submission format researched and adapted
- [ ] Legal entity / fiscal host question resolved
- [ ] Budget breakdown based on actual costs
- [ ] Kai live URL + constitution included as evidence
- [ ] 1-2 reviewers have reviewed before submission
- [ ] Submitted before deadline

**Dependencies:** KP-01 (sites must be safe), KP-04 (sites should be polished)

---

### KP-10: Kitchen Table v4 — Zones + Waymaker
**Project:** Kitchen Table
**Priority:** NORMAL
**Timeline:** After KP-06 (consolidation)

**Goal:** Kitchen Table becomes mission control with project zones + Waymaker integration.

**Done When:**
- [ ] Zones: Kamunity Build, WALGA, Wedding, Meetings
- [ ] KNOWLEDGE/ sync (allies, grants, services from canonical source)
- [ ] Transcript intake (paste → Waymaker processes → routes to zones)
- [ ] Waymaker system prompt drafted and tested

---

### KP-11: Vine-o-Code as Product
**Project:** Vine-o-Code / Kai
**Priority:** NORMAL
**Timeline:** After KP-04

**Goal:** Vine-o-Code methodology packaged as a deliverable (Task t27).

**Done When:**
- [ ] Trust mark system designed (Safety Gate G9)
- [ ] Data safety warnings in all Vine-o-Code outputs (Safety Gate G7)
- [ ] Cultural safety review completed (Safety Gate G6)
- [ ] Kai delivers Vine-o-Code inline
- [ ] Foundation doc templates in ENGINE/TEMPLATES/

---

### KP-12: Agent Diplomacy — From Agent-Readable to Agent-Relational
**Project:** Kamunity Ecosystem (cross-cutting)
**Priority:** NORMAL (tactical urgency on Sprint 1; strategic items are Phase 3+)
**Timeline:** Phased — immediate tactical work (Sprint 1), protocol design (Sprint 2), participatory layer (Phase 3+)

**Goal:** Kamunity sites develop an immune system AND a diplomacy corps for AI agent visitors. Move from passive content serving to intentional, constitutional, layered agent engagement. Protect community sovereignty while exploring agent participation.

**Context:** Cloudflare "Markdown for Agents" (Feb 22, 2026) commoditises basic agent-readability. Kamunity's llm.txt approach is validated but distinctiveness narrowing. The strategic territory is the gap between content consumption and community participation. See KNOWLEDGE/RESEARCH/AGENT_DIPLOMACY_LANDSCAPE_2026.md for full analysis.

**Sprint 1: Sensing & Strengthening (This Month)**

Done When:
- [ ] Agent traffic detection live on at least kamunity.org — Spore Radar v0.1 (Netlify Edge Function logging User-Agent + Accept headers, categorising human/agent/unknown)
- [ ] All 13 active sites audited for current agent-visibility (what does each serve to `Accept: text/markdown`?)
- [ ] All llm.txt files enriched with ontological content — not just "what this site does" but "what this site believes and how it wants to be engaged with"
- [ ] `/.well-known/llms.txt` added to all sites (emerging convention path) alongside existing `/llms.txt`
- [ ] Custom response headers added where Netlify allows (content-signal equivalent: consent terms for AI training, search, input)
- [ ] Spore Radar data reviewed after 2 weeks — first evidence of what agents are actually visiting

**Sprint 2: Protocol Design (Next Month)**

Done When:
- [ ] Threshold protocol spec written — multi-layer agent engagement documented in KNOWLEDGE/ (public layer → orientation layer → participation layer; triggers for progression)
- [ ] Community passport concept sketched — what credentials an agent needs to interact with rooms on behalf of a member
- [ ] Position paper drafted on agent consent — "what does mutual consent look like between a community and a language model?"
- [ ] Mycelium encounter pattern documented as a replicable design pattern — "reflection-first agent engagement" methodology

**Sprint 3: Participatory Layer (Phase 3+ — Not Before Community Rooms Exist)**

Done When:
- [ ] MCP endpoint feasibility assessed for Kamunity rooms
- [ ] Six-reaction system evaluated as first MCP-exposed community action
- [ ] Agent contribution labelling designed — community always knows when an agent participated
- [ ] Human-in-the-loop verification tested for all consequential agent actions
- [ ] Ontological fingerprinting concept prototyped — content carrying Kamunity origin trace
- [ ] Constitutional convention explicitly considers agent participation governance

**Dependencies:** Sprint 1: None. Sprint 2: Sprint 1 data. Sprint 3: KP-09 (Community Rooms must exist).
**Safety Gates:** Threat Surface 6 (BRAIN/kamunity-safety-threat-model.md) — all six agent threats assessed before Sprint 3.
**Confidence Score:** 90/100 — BUILD (Sprint 1-2 immediately; Sprint 3 queued behind KP-09)

---

## PARKING LOT (Not Scheduled)

| Item | Why It's Parked | Trigger to Activate |
|---|---|---|
| Sovereign model evaluation | Phase 5+ territory | 20+ orgs in network OR API dependency becomes risk |
| Polis integration | Needs 20+ org threshold | Constitutional convention planning begins |
| OpenAI chat export | Valuable but not urgent | WORKSHOP/ folder exists, free afternoon |
| NotebookLM podcasts archive | Content preservation | WORKSHOP/ folder exists |
| Infoxchange speaker proposal | May 6-8 conference | CFP deadline approaches |
| Solidarity AI Bangkok | Nov 12-15 | CFP opens |
| Local Kai instances | Phase 4 territory | Community rooms proven, demand exists |

---

## Change Log

| Date | Change | Rationale |
|---|---|---|
| 2026-02-19 | Queue created from Kitchen Table phases + master roadmap + session planning | Unified cross-project priority needed |
| 2026-02-19 | KP-01 (Safety) placed above all else | 3 critical safety gates block public showcase |
| 2026-02-19 | KP-06 (Consolidation) added | Campfire Architecture decision |
| 2026-02-19 | KP-07 (WALGA) added | Live client project needs tracking |
| 2026-02-19 | WORKSHOP/ concept added to KP-06 | Mike needs a creative sandbox folder |
| 2026-02-20 | KP-04: 3 of 5 items ticked — ecosystem-state v0.2.0, cross-links, Kai system prompt strengthened | Evening session completing Opus gap analysis tasks |
| 2026-02-20 | KP-02: AI Safety Checklist leave-behind created (tools/ai-safety-checklist.html) | Done in earlier session |

---

*The queue is reviewed weekly. Priorities shift based on real evidence, not assumptions. If a phase is BLOCKED, it drops until the blocker is resolved. The queue serves the mission — the mission doesn't serve the queue.*
