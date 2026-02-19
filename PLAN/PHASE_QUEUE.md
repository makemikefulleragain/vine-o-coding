# KAMUNITY UNIFIED PHASE QUEUE
## Cross-Project Priority Queue
### Last Updated: Feb 19, 2026

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

### KP-01: Safety Critical — Kai Crisis Protocol + Disclaimers
**Project:** Kamunity Ecosystem (cross-cutting)
**Priority:** CRITICAL — blocks ALIKE showcase and all public promotion
**Timeline:** This week (before Feb 24)

**Goal:** Every public-facing tool is safe for vulnerable users to encounter.

**Done When:**
- [ ] WA crisis resources hardcoded into Kai's system prompt (not AI-generated)
- [ ] Kai tested with 3 crisis scenarios — redirects to humans every time
- [ ] Kai tested with 3 prompt injection attempts — constitution holds
- [ ] Honest disclaimers on ALL public sites (kamunity.org, .ai, audit, readiness, vine-o-code)
- [ ] Results documented

**Dependencies:** None. This is the first thing.
**Safety Gates:** G1, G3, G4 must PASS after this phase.

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

## NEXT

### KP-03: Revenue Infrastructure
**Project:** Kamunity Consulting
**Priority:** HIGH — survival dependency
**Timeline:** Weeks 2-3

**Goal:** Be ready to invoice when the first client says yes.

**Done When:**
- [ ] One-page consulting offer document (4 services, transparent two-tier pricing)
- [ ] Invoicing set up (Xero/Wave)
- [ ] ABN sorted
- [ ] Professional indemnity insurance active (Safety Gate G5)
- [ ] WACOSS emailed (digitalinclusion@wacoss.org.au)
- [ ] Spacecubed contacted

**Dependencies:** KP-02 (meetings may generate first client)
**Safety Gates:** G5 must PASS before first paid engagement.

---

### KP-04: Kai Deepening — Ecosystem Knowledge + Inline Tools
**Project:** kamunity.org (Kai)
**Priority:** NORMAL
**Timeline:** Weeks 2-4

**Goal:** Kai knows the full ecosystem and can run tools conversationally.

**Done When:**
- [ ] ecosystem-state-full.json deployed to Kai's data source
- [ ] Kai can describe all ecosystem sites (not just link — explain what each does)
- [ ] Kai runs AI Readiness quiz inline (questions as cards, results interpreted)
- [ ] Kai runs Vine-o-Code 6 questions conversationally (outputs foundation doc pack)
- [ ] All ecosystem sites cross-linked + llms.txt updated

**Dependencies:** KP-01 (safety first)

---

### KP-05: NLnet Application
**Project:** Kamunity Grants
**Priority:** HIGH (deadline-driven)
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

### KP-06: Campfire Architecture — Codebase Consolidation
**Project:** Infrastructure
**Priority:** NORMAL
**Timeline:** Weeks 3-4

**Goal:** All code in one place, all history preserved, clean forward state.

**Done When:**
- [ ] Archive zip created (all 26 folders + provenance index)
- [ ] Folder structure created (BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, WORKSHOP/, ARCHIVE/)
- [ ] Active projects moved to PROJECTS/
- [ ] Valuable docs extracted to KNOWLEDGE/
- [ ] CI/CD verified for kamunity.org, kamunity.ai, wedding
- [ ] Auto-named Netlify sites renamed
- [ ] Old Netlify sites archived
- [ ] Old GitHub repos set to private with archive notes
- [ ] important teck/ moved to secure location

**Dependencies:** Phase 0 audit (DONE), Phase 1 BRAIN/ (DONE), Phase 2 PLAN/+ENGINE/ (this phase)

---

### KP-07: WALGA Project
**Project:** WALGA (live client)
**Priority:** HIGH (active engagement)
**Timeline:** Ongoing

**Goal:** Deliver value to WALGA. Learn from the engagement. Document methodology.

**Done When:**
- [ ] Scope defined (to be determined based on WALGA needs)
- [ ] Kitchen Table zone created for WALGA tracking
- [ ] Methodology learnings documented for reuse

**Dependencies:** KP-03 (invoicing infrastructure)

---

## FUTURE

### KP-08: Perth Community Services Directory
**Project:** kamunity.org ecosystem
**Priority:** NORMAL
**Timeline:** Weeks 5-8

**Goal:** 13-domain directory with referral intelligence. Start with 3 domains.

**Done When:**
- [ ] 3 initial domains selected and populated (disability, mental health, digital inclusion)
- [ ] Each entry: org, plain-language description, location, contact, eligibility, cost, verified date
- [ ] Referral intelligence layer: needs → services mapping
- [ ] Kai can surface directory results conversationally

---

### KP-09: Community Rooms
**Project:** kamunity.ai
**Priority:** NORMAL
**Timeline:** Weeks 7-12

**Goal:** Async discussion spaces with Kai as host. Wedding room is first test case.

**Done When:**
- [ ] Supabase persistence for rooms
- [ ] Kai hosts conversations
- [ ] Community moderation model defined
- [ ] Wedding room live and used by family/guests
- [ ] At least one community topic room live

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

---

*The queue is reviewed weekly. Priorities shift based on real evidence, not assumptions. If a phase is BLOCKED, it drops until the blocker is resolved. The queue serves the mission — the mission doesn't serve the queue.*
