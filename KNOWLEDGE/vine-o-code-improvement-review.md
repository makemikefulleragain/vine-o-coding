# Vine-o-Code Starting Docs — Improvement Review
## Kamunity Context · Feb 2026

---

## 1. What These Documents Are

The six-file foundation pack produced by the Outcome Vine Coding widget scaffolds an AI-assisted development process called the **RALF Engine**. It gives an AI coding assistant everything it needs to build a real, deployed product through sequential phases.

| File | Purpose |
|---|---|
| `CONSTITUTION.md` | Inviolable principles, user persona, tech constraints, confidence scoring, kill switch |
| `MISSION.md` | Strategic outcome, north star, who it's for, what it's not |
| `PHASE_QUEUE.md` | Mutable hypothesis-driven phase list with change log |
| `RUNNER.md` | AI assistant instructions — the 7-step phase loop |
| `SETUP.md` | Human infrastructure steps (deploy, etc.) |
| `STATE.md` | Live project status, updated after each phase |

The **Phase Loop** in `RUNNER.md` is the engine:
```
RESEARCH → TRIAGE → SPEC → BUILD → CRITIQUE → CONFIDENCE SCORE → FORWARD
```
Each step writes to `phases/phase-XX/[step].md` — a transparent, auditable trail.

The project in these example docs is **Kamunity AI Readiness** (ai-readiness.netlify.app) — the 12-question self-assessment with personalised recommendations for community organisations.

---

## 2. What's Strong — Preserve These

These elements are excellent and should be kept exactly as-is in any improved version:

- **"Priya" as primary persona** — "Does this serve Priya?" is the right design discipline for every decision.
- **Confidence scoring rubric** (4 × 25 dimensions) — rigorous, transparent, and well-routed (80+ build / 60-79 flag / below 60 reassess).
- **Phases as hypotheses, not contracts** — explicitly permitting reordering, replacement, and splitting avoids executing a plan that's already wrong.
- **Human Handoff Points** (`HUMAN_ACTION.md`) — separating what AI can do from what requires human action is correct architecture for a solo operator.
- **Kill Switch** (`STOP.md`) — binary, reliable, simple.
- **"Leave site in working state after every phase"** — the most important engineering discipline in the pack. Never accumulate unbuildable work.
- **"DO NOT ask questions in chat. Write decisions to files."** — eliminates chatty AI / interrupted workflow loop.

---

## 3. Document-by-Document Findings

### 3.1 CONSTITUTION.md

**Template artefact.** "Kamunity AI  Readiness" has a double space throughout — a generation artefact to clean before use.

**Kill Switch is binary with no middle tier.** `STOP.md` = halt immediately. But sometimes work should pause (not halt) — a solo operator who needs to pause for a week shouldn't have to use the same mechanism as a permanent shutdown.

> **Fix:** Add `PAUSE.md` = "finish current step, don't start next." RUNNER checks for both. `STOP.md` = halt. `PAUSE.md` = complete step, then wait.

**Confidence below 60 has no resolution path.** "Reassess" is not an action. When a phase scores below 60, what specifically happens next?

> **Fix:** Below 60 = write `phases/phase-XX/blocked.md` with specific blocking questions. Update STATE.md to `BLOCKED`. Write to HUMAN_ACTION.md. Do not proceed.

**Tech stack hardcoded to React/Tailwind/Vite.** Correct for AI Readiness. Not correct for the methodology as a whole — Kitchen Table uses vanilla JS. These are project-level constraints, not methodology-level constraints.

> **Fix:** Add a `### Project-Specific Constraints` label to that section so it's clear it doesn't apply globally.

**MISSING: Cultural Safety principle.** Kamunity operates on Whadjuk Noongar boodja and builds tools for Aboriginal Community Controlled Organisations. The CONSTITUTION has Sovereignty and a Harm Check, but no Cultural Safety principle. This is a gap against Kitchen Table Safety Item S8 ("Cultural safety + Acknowledgment review — HIGH severity") and Task t45 ("Genuine engagement, not rubber stamp").

> **Add as Principle 8:**
> ```
> ### 8. Cultural Safety
> Kamunity operates on Whadjuk Noongar boodja. Every tool,
> document, and encounter acknowledges this. Acknowledgments
> require Noongar review — not generated text. When building
> tools that serve ACCOs, consult before building, not after.
> ```

**MISSING: Trust Mark principle.** Vine-o-Code is public. Anyone can claim to have used it. There is no mechanism to distinguish a tool Kamunity reviewed from one a bad actor built using the same scaffold. This is live risk: Kitchen Table Gap g1 ("How distinguish legitimate tools from scam sites?"), Safety Item S4 (critical severity), Task t46.

> **Add as Principle 9:**
> ```
> ### 9. Trust Mark Integrity
> "Built by Kamunity" = Kamunity reviewed it.
> "Built using Vine Coding" = methodology only.
> These are different claims and must never be conflated.
> A community reporting mechanism must exist before Vine-o-Code
> is publicly promoted as a standalone build methodology.
> ```

**MISSING: Incident Response.** The CONSTITUTION defines what to build, not what to do when something goes wrong. Kitchen Table Safety Item S7 (HIGH severity) and Task t44 have a clear draft protocol:

> **Add to Harm Check section:**
> ```
> ### Incident Response
> If a tool causes harm: (1) Identify clearly. (2) Assess severity —
> is it ongoing? (3) Immediate action — does the site need to come
> down? (4) Communicate transparently — who was affected?
> (5) Document fully. (6) Update the threat model. Do not hide incidents.
> ```

**MISSING: Ecosystem Integration principle.** Each project is treated as standalone but Kamunity has 9 live interconnected sites with shared design language, cross-links, and shared `llms.txt`. A new site that doesn't cross-link fragments the ecosystem.

> **Add to Technical Constraints:**
> ```
> ### Ecosystem Integration
> Every Kamunity site: cross-links to kamunity.org and relevant
> sister tools; includes llms.txt for AI discoverability; shares
> the campfire design language; carries honest AI disclaimers
> aligned with the Kamunity constitution. No site is an island.
> ```

**API dependency unaddressed.** The Sovereignty principle says "user data belongs to users" but doesn't acknowledge that Kai depends on Anthropic's API — which is a sovereignty risk. Kitchen Table Gap g6 names this. The CONSTITUTION should acknowledge it as an accepted risk with a path (sovereign model = Phase 5).

---

### 3.2 MISSION.md

**"Not for" left blank.** "Define this during Phase 1 research" is good practice for genuinely unknown projects. But for Kamunity AI Readiness, exclusions are already known from the broader ecosystem context. Leaving it blank means Phase 1 research rediscovers what's already known.

> **Pre-populate with known exclusions:**
> - For-profit businesses using AI for commercial gain (refer to paid consulting)
> - Individuals (tool is for org-level decision makers)
> - Technical developers (not the audience for readiness guidance)
> - Orgs seeking IT procurement advice

**North star is Find/Understand/Use/Trust — missing Return and Share.** Community orgs don't use tools once — they return when context changes, and they spread tools person-to-person. These are the organic growth and sustained impact mechanisms.

> **Add:**
> ```
> 5. Return to it as their situation changes
> 6. Share it with colleagues and peer organisations
> ```

**No sustainability plan.** MISSION.md describes the outcome but not who maintains it post-launch or on what budget. Feeds directly into Kitchen Table Gap g7 (personal financial runway) — the most existentially untracked gap in the whole system.

---

### 3.3 PHASE_QUEUE.md

**Formatting bug — template bleedthrough.** Every phase description duplicates its title:
```
### Phase 1: The Quiz (Make it real):** The 12-question...
**Goal:** The Quiz (Make it real):** The 12-question...
```
The generation template leaked. Must be cleaned before use.

**Phase 4+ is too vague.** "Whatever research reveals" is correct process but gives no provisional direction. By Phase 4 a solo operator may be 6+ months in with revenue pressure. Provisional candidates should be listed.

> **Suggest adding provisional Phase 4 directions:**
> - Local Kai instances for neighbourhood orgs (Kitchen Table p4)
> - Community Rooms / async discussion spaces (Kitchen Table p3)
> - Perth Community Services Directory (Kitchen Table p2)
> - Methodology licensing / train-the-trainer

**No "Done When" criteria per phase.** Goals exist but no binary acceptance criteria for completion. "Done" expands indefinitely without explicit criteria.

> **Add `### Done When:` to each phase** — 3-5 measurable, binary statements.

**Phase dependencies not explicit.** Phase 2 (Toolkit) depends on Phase 1 working. Phase 3 (Services) doesn't technically depend on Phase 2. Explicit dependencies help when reordering.

**Queue Change Log too sparse.** One entry. This log is the most valuable long-term artefact — it shows why decisions changed. Must be written to as part of every FORWARD step.

---

### 3.4 RUNNER.md

**"Max 5 web searches per phase" is calibrated to the wrong variable.** Five is right for a research step. It's wrong for a build step (should be zero unless resolving a specific error) and might be too few for a thorough research step on a complex domain.

> **Recalibrate by step:**
> - Research: up to 8 targeted searches
> - Triage: 0–2 (validate assumptions only)
> - Build: 0 (search only for specific error resolution)
> - Critique: 0–2 (validate constitutional claims)

**"Max 3 attempts to build before escalating" — escalate to whom?** For a solo operator, escalating means writing HUMAN_ACTION.md and blocking. But the document doesn't say this. An AI could interpret "escalate" as trying a fundamentally different approach — potentially breaking working state.

> **Clarify:** After 3 failed build attempts, write `BUILD_BLOCKED.md`, update STATE.md as `BUILD_BLOCKED`, write HUMAN_ACTION.md. Do not attempt a 4th approach without human input.

**No multi-session continuity protocol.** Work may pause for days or weeks. The current instruction (read 5 docs + STATE.md, continue) doesn't handle stale STATE.md, human changes the AI doesn't know about, or deadline-sensitive items that have changed status.

> **Add Session Start Checklist:**
> ```
> ## Session Start
> 1. Read STATE.md — note last update timestamp
> 2. Check for unacknowledged HUMAN_ACTION.md files
> 3. Check for STOP.md or PAUSE.md
> 4. Note real-world time elapsed — deadline-sensitive tasks still on track?
> 5. If STATE.md is >7 days old, flag to human before proceeding
> ```

**HUMAN_ACTION.md has no acknowledgment mechanism.** AI writes the file and continues. If the human doesn't see it, work proceeds on incorrect assumptions. Session Start Checklist (above) addresses this by checking for unacknowledged handoff files.

**CRITIQUE happens after BUILD+DEPLOY — too late for safety-sensitive tools.** Constitutional alignment should be checked at SPEC, before any code is written, not after it's already live.

> **Add Constitutional Pre-check to SPEC step:** "Before writing the build spec, confirm the planned implementation doesn't violate any CONSTITUTION.md principle. Resolve concerns before building."

**No cross-ecosystem health check.** Kitchen Table Task t13 ("Verify ALL live sites stable — run every phase") makes this a recurring obligation. RUNNER doesn't mention it.

> **Add to BUILD step:** "After building, verify all cross-linked ecosystem sites still load correctly. Document in build_log.md."

---

### 3.5 STATE.md

**Too sparse for a multi-project ecosystem.** Correct for a brand new project (Phase 0). Inadequate for ongoing work across 9+ sites and 16 active relationships.

**Missing: Ally/outreach tracking.** Kitchen Table tracks 16 allies across 5 status stages. For AI Readiness, relationships with WACOSS, Linkwest, and Infoxchange directly affect Phase 2+ success — none of this is in STATE.md.

**Missing: Financial/grant state.** Kitchen Table tracks 4 grant opportunities with deadlines. STATE.md tracks nothing financial. For a solo operator with personal runway concerns (Gap g7), financial state IS operational state.

**Missing: "What didn't work."** Phase history records completed phases. A learning log of failed approaches is equally valuable, especially across multi-session work.

> **Expand STATE.md template to include:**
> ```markdown
> ## Active Relationships
> [ally name]: [status] — [next action]
>
> ## Grant Pipeline
> [grant name]: [deadline] — [status]
>
> ## What Didn't Work
> [phase]: [approach] — [why abandoned]
> ```

---

### 3.6 SETUP.md

**No llms.txt step.** The CONSTITUTION mentions Kamunity's `llms.txt` for AI discoverability. SETUP.md doesn't include creating or updating it. Every new Kamunity site must have this — it should be a setup step.

**No monitoring.** Even a free uptime monitor (UptimeRobot) takes 2 minutes to configure. Silent failure (site down, no one knows) is a real risk for a solo operator.

**No rollback procedure.** Netlify has instant rollback via the Deploys dashboard. One sentence would cover this but it's completely missing.

> **Add:** "If a build breaks the live site: Netlify dashboard → Site → Deploys → click previous deploy → Publish deploy. Instant rollback. No data loss."

---

## 4. Methodology Process Improvements

### 4.1 Enhanced Phase Loop

```
RESEARCH → TRIAGE → SPEC [+PRE-FLIGHT] → BUILD → TEST → CRITIQUE → CONFIDENCE → FORWARD
```

Additions vs current:
- **Pre-flight** at SPEC: constitutional alignment + safety gates checked before code written
- **TEST** as explicit step between BUILD and CRITIQUE: acceptance criteria from spec.md verified before critique
- **Cross-ecosystem check** in FORWARD: all live sites verified still working

### 4.2 Safety Gates

The methodology needs a concept of **gates** — safety items that must be resolved before a phase can advance. Drawn from Kitchen Table Safety Items S1–S13:

| Gate | Requirement | Severity | Blocks |
|---|---|---|---|
| Crisis protocol | WA crisis numbers hardcoded + tested in Kai | Critical | Any phase touching Kai |
| Prompt injection | 3 scenarios tested and passed | Critical | Any phase touching Kai |
| Indemnity | Professional insurance in place | Critical | First paid engagement |
| Disclaimers | AI wayfinder disclaimer on all public pages | High | Any public-facing phase |
| Incident response | Plan documented | High | Phase 2 onwards |

These are not tasks. They are gates. A phase cannot advance if a critical gate is open.

### 4.3 Confidence Score Recalibration

Current weighting (25/25/25/25) is miscalibrated for vulnerable-user contexts. Proposed adjustment:

| Dimension | Current | Suggested | Rationale |
|---|---|---|---|
| Research Signal | 25 | 20 | Necessary but not decisive |
| Source Convergence | 25 | 20 | Same |
| Constitutional Alignment | 25 | 35 | Vulnerable users = safety must dominate |
| Build Confidence | 25 | 25 | Unchanged |

A feature with perfect research/build scores but constitutional concerns scores 65/100 — correctly triggering "build with flags" instead of "build."

### 4.4 Autonomous Decision Log

"DO NOT ask questions in chat. Write decisions to files." is correct for workflow. But it creates a hidden decision record. Suggest each phase writes `phases/phase-XX/decisions.md` logging every significant autonomous decision — options considered, choice made, reasoning. This is the audit trail that builds human trust in AI-assisted development over time.

---

## 5. Kitchen Table Signal Integration

### 5.1 Safety Items → Methodology Actions

| Item | Severity | Methodology Action |
|---|---|---|
| S1: Crisis protocol | Critical | CONSTITUTION Harm Check — mandatory gate |
| S2: Prompt injection | Critical | RUNNER CRITIQUE step — mandatory test |
| S3: Indemnity | Critical | CONSTITUTION principle — no paid work without insurance |
| S4: Trust marks | Critical | CONSTITUTION Trust Mark principle (see §3.1) |
| S5: Disclaimers | High | CONSTITUTION Ecosystem Integration requirement |
| S6: Data safety | High | CONSTITUTION Harm Check — explicit PII handling section |
| S7: Incident response | High | CONSTITUTION Harm Check section (see §3.1) |
| S8: Cultural safety | High | CONSTITUTION principle #8 (see §3.1) |

### 5.2 Gaps → Methodology Implications

| Gap | Implication |
|---|---|
| g1: Trust mark | CONSTITUTION needs Trust Mark principle before Vine-o-Code is publicly promoted |
| g2: Auspicing | STATE.md should track legal entity status; PHASE_QUEUE should note grant dependency |
| g3: Legal entity | Blocks g2 and Lotterywest. Should appear in MISSION.md sustainability section |
| g4: Directory verification | PHASE_QUEUE Phase 2 "Done When" must address who verifies ongoing content |
| g5: Rooms moderation | PHASE_QUEUE Phase 3 spec must include moderation model — not an afterthought |
| g6: API dependency | CONSTITUTION Sovereignty principle should name the dependency and path to sovereign model |
| g7: Financial runway | **Most critical untracked gap. Nothing in any doc addresses solo operator sustainability.** |
| g13: Kitchen Table maintenance | Every methodology doc needs a maintenance rhythm. See §6.3 RHYTHM.md below. |

### 5.3 Task t27 — Conversational Mode Implication

Task t27: "Kai runs Vine-o-Code questions inline — output: foundation doc pack (downloadable)."

This means Vine-o-Code must work in two modes:
- **File mode:** Documents read by AI coding assistant at session start
- **Conversational mode:** Questions asked by Kai, answers generate the docs

The six foundation documents should be designed for both contexts. Each doc should have a corresponding set of generative questions that Kai can ask conversationally to produce it. The example docs partially do this (PHASE_QUEUE.md says "generated by Outcome Vine Coding widget") but don't expose the question structure.

---

## 6. Proposed New Documents

### 6.1 ECOSYSTEM.md (New — for all Kamunity projects)

Documents that every Vine-o-Code project receives when building within the Kamunity ecosystem. Prevents fragmentation. Documents constitutional inheritance and cross-site obligations.

Sections: What Exists (live sites with URLs) · Constitutional Inheritance requirements · Pre-Phase Cross-Ecosystem Check procedure.

### 6.2 SAFETY_GATES.md (New)

Lists critical and high gates with binary status. Checked at CRITIQUE step. Gate status written to `phases/phase-XX/safety_gates.md`. Critical gates open = do not advance phase.

### 6.3 RHYTHM.md (New)

The methodology has no concept of ongoing maintenance. After phases are done, tools go stale. For a solo operator, this is the difference between current and rotting.

Cadences:
- **Weekly (15 mins):** Scan sector news, update ecosystem state, check for unacknowledged HUMAN_ACTION files, update STATE.md
- **Monthly:** Left Field Challenge (1 unexpected scenario), live site check, grant deadline review, safety gate review
- **Quarterly:** Full CONSTITUTION review, ally status progression audit, PHASE_QUEUE update from real feedback

### 6.4 DECISIONS.md (New — per phase)

Autonomous decision log. Written during every phase. Every significant choice logged with: options considered, choice made, reasoning. Cumulative audit trail that builds human trust in AI-assisted development over time.

---

## 7. Prioritised Improvement Actions

### Immediate (before next build session)

1. **Add Cultural Safety principle to CONSTITUTION.md** — values gap, not technical. Required before engaging ACCOs or Aboriginal-connected orgs.
2. **Add Trust Mark principle to CONSTITUTION.md** — Vine-o-Code is already live. The scam tool risk (S4, critical severity) is active now.
3. **Add Incident Response to CONSTITUTION.md** — required before any live tool touches vulnerable users.
4. **Add PAUSE.md tier to RUNNER.md** — gives solo operator a non-destructive pause mechanism.
5. **Fix PHASE_QUEUE.md template bleedthrough** — formatting bug makes docs look unprofessional and reduces AI parsing accuracy.

### Short-Term (before Phase 1 build begins)

6. **Add Session Start Checklist to RUNNER.md** — multi-session continuity is a real risk for solo operators.
7. **Add Constitutional Pre-check to SPEC step in RUNNER.md** — catch alignment issues before code is written, not after.
8. **Expand STATE.md template** — add ally state, grant pipeline, and "what didn't work" sections.
9. **Add "Done When" criteria to each PHASE_QUEUE entry** — prevents indefinite phase expansion.
10. **Add llms.txt and rollback steps to SETUP.md** — ecosystem discoverability and recovery procedure.

### Medium-Term (before Vine-o-Code is publicly promoted as a methodology)

11. **Create SAFETY_GATES.md** — safety gate concept must exist before the methodology builds tools that touch vulnerable users.
12. **Create ECOSYSTEM.md** — prevents fragmentation as more projects join the ecosystem.
13. **Recalibrate confidence scoring** — Constitutional Alignment should weight 35/100, not 25/100, for vulnerable-user tools.
14. **Design conversational mode** — expose the question structure that generates each foundation doc, for use in Kai inline mode (Task t27).
15. **Address Gap g7 (financial runway)** — the most existentially untracked gap in the system. Add a sustainability section to MISSION.md for every project.

### Structural (methodology version 2)

16. **Create RHYTHM.md** — operational cadences for solo operator sustainability.
17. **Add DECISIONS.md to phase loop** — autonomous decision audit trail.
18. **Add explicit TEST step to phase loop** — separate build verification from philosophical critique.
19. **Add cross-ecosystem health check to FORWARD step** — verify all live sites still work after every phase.
20. **Version the methodology itself** — RUNNER.md should have a version number. Projects should record which version they were built with.

---

## 8. Summary Assessment

The Vine-o-Code foundation document pack is a **genuinely strong methodology** for AI-assisted product development. The phase loop, confidence scoring, persona anchoring, and "phases as hypotheses" are all well-designed. It is better than most structured development processes being used today.

The gaps are primarily in three areas:

**Safety depth.** The Harm Check and Sovereignty principles exist but are not operational enough. Cultural safety, trust marks, incident response, and API dependency risk need to be constitutionalized — not left as task-level items.

**Multi-project ecosystem awareness.** The docs treat each project as standalone. Kamunity is a 9-site interconnected ecosystem. Every new project needs to inherit constitutional obligations and contribute to (not fragment) the ecosystem.

**Solo operator sustainability.** Multi-session continuity, financial runway, and maintenance rhythm are not addressed. A methodology built for a solo operator must account for gaps in time, context, and energy. Without this, the tools get built but slowly go stale.

The Kitchen Table data provides a rich signal set that directly maps to these gaps — the safety items (S1–S13), the open gaps (g1–g13), and the task detail notes contain the specific content that would fill the most critical holes. The methodology and the operational command centre are designed to be used together; making that integration explicit is the highest-leverage improvement available.

---
*Review generated using the Kitchen Table — cross-referenced against CONSTITUTION.md, MISSION.md, PHASE_QUEUE.md, RUNNER.md, SETUP.md, STATE.md, data.js, and kitchen-table-windy-scope.md.*
