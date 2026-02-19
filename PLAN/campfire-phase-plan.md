# CAMPFIRE ARCHITECTURE — Phase Execution Plan
## From Scattered to Unified · Feb 2026

---

## What We've Done So Far (This Session)

| Deliverable | File | Status |
|---|---|---|
| Vine-o-Code improvement review (20 improvements) | `vine-o-code-improvement-review.md` | Done |
| Campfire Architecture recommendation | `kamunity-unified-system-recommendation.md` | Done |
| Wayfinder / Waymaker / Cascade triad design | Discussed, not yet documented | Captured below |
| GitHub audit (7 repos mapped) | Captured below | Done |
| Netlify audit (18 sites mapped) | Captured below | Done |
| Kitchen Table zones + transcript pipeline | Discussed, not yet documented | Captured below |

### Key Decisions Made This Session

| Decision | Rationale |
|---|---|
| Two Kais: Wayfinder (public) + Waymaker (internal) | Same API, different scope. Security boundary is clear. |
| Kitchen Table = mission control for Waymaker + Mike | Central dashboard with zones: Kamunity, WALGA, Wedding, Meetings |
| Transcript → Waymaker → data → routed to zones | Claude API extraction + routing. ~20 lines of logic. |
| Wedding lives in a Kamunity Room | Dogfooding community rooms (Phase 3 feature) with real use case |
| kamunitydemo.org = keep as playground | Messy by design. Holds key build/feature/UX ideas. |
| outcome-vine = superseded by vine-o-coding | Archive candidate |
| nonnas-knitting-circle + grants-hub = live in the wild | Keep, being tested by real people |
| Auto-named sites = need examining + proper naming | Not tests — a mix of projects and planning |
| Archive everything, delete nothing | All history preserved. Clean forward state. |

---

## The Phases

### How to Read This Plan

Each phase follows a mini version of the Vine-o-Code loop:

```
DO → CHECK → REFLECT → DECIDE (continue / adjust / pause)
```

Phases are sequential. Don't start a phase until the previous phase's CHECK
passes. Each CHECK is a set of yes/no questions — if any answer is "no," stop
and resolve before continuing.

**Estimated total: 3-4 sessions across 1-2 weeks.**
**No code changes until Phase 3.**

---

## PHASE 0: AUDIT & UNDERSTAND
*"Know what you have before you move anything"*

### DO (Cascade)

**0.1 — Examine the 4 auto-named Netlify sites**
Visit each URL, document what it is, suggest a proper name:
- adorable-dango-3479db.netlify.app
- subtle-starship-d0bdac.netlify.app
- starlit-unicorn-6440fb.netlify.app
- candid-donut-4ec289.netlify.app

**0.2 — Audit all 26 code folders**
Scan every folder in OneDrive/Dev_Code/ (17 folders) and local C:\Users\mikef\ (9 folders).
For each: list key files, last modified, likely purpose, size.
Output: triage table with recommended action (ACTIVE / ARCHIVE / DUPLICATE).

**0.3 — Write the full infrastructure map**
Combine GitHub repos + Netlify sites + code folders + Kitchen Table ecosystem
data into one complete map showing what connects to what.

### CHECK (Mike reviews)

- [ ] Do the auto-named site descriptions look right?
- [ ] Does the folder triage table match your memory of what each folder is?
- [ ] Is the infrastructure map accurate — any connections I missed?
- [ ] Any folders I flagged as ARCHIVE that are actually active?

### REFLECT

> Before moving on: Do we understand the full landscape? Are there any other
> code locations, repos, or sites not captured? Any surprises in the audit?
> Does the Campfire Architecture still feel right given what we found?

### DECIDE

- If map is complete and accurate → proceed to Phase 1
- If surprises found → update the map, re-check, then proceed
- If the architecture needs adjusting → update recommendation doc first

---

## PHASE 1: DOCUMENT THE BRAIN
*"Give every future AI session instant full context"*

No folders moved. No code changed. Pure document writing.

### DO (Cascade drafts, Mike reviews)

**1.1 — BRAIN/CONSTITUTION.md**
Upgrade the Vine-o-Code constitution with the 5 additions from the improvement review:
Cultural Safety, Trust Mark, Incident Response, Ecosystem Integration, API Dependency
acknowledgment. Scoped to Kamunity (not per-project).

**1.2 — BRAIN/ECOSYSTEM.md**
All live Kamunity sites with: URL, purpose, deploy method, status.
Cross-link obligations. llms.txt requirements.
Source: Kitchen Table sites data + Netlify audit.

**1.3 — BRAIN/STATE.md**
Current global state: what's live, what's building, what's blocked.
Active relationships summary. Grant pipeline. Financial state.
Source: Kitchen Table data + master roadmap.

**1.4 — BRAIN/SAFETY_GATES.md**
Critical and high gates extracted from the threat model.
Binary checklist format. Checked before phase advancement.
Source: threat model + Kitchen Table safety items.

**1.5 — BRAIN/WHO.md**
Priya persona. Anti-personas. Ally network summary.
The Wayfinder/Waymaker/Cascade triad documented.
Source: Vine-o-Code CONSTITUTION + Kitchen Table allies data.

### CHECK (Mike reviews each document)

- [ ] CONSTITUTION: Do the new principles feel right? Anything missing?
- [ ] ECOSYSTEM: Are all live sites captured? Any URLs wrong?
- [ ] STATE: Does this reflect reality right now, today?
- [ ] SAFETY_GATES: Are the right items at critical/high? Anything to add/remove?
- [ ] WHO: Does Priya still feel like the right anchor? Triad make sense documented?

### REFLECT

> Before moving on: Read all 5 BRAIN/ docs as if you're an AI assistant seeing
> them for the first time. Within 3 minutes of reading, would you understand:
> What Kamunity is? What's live? What's dangerous? Who matters? What's next?
>
> If yes → the BRAIN works.
> If no → what's missing?

### DECIDE

- If BRAIN/ reads well as a standalone context pack → proceed to Phase 2
- If gaps found → fill them before moving on
- If any document feels wrong → rewrite before it becomes foundational

---

## PHASE 2: DOCUMENT THE PLAN + ENGINE
*"The system that tracks and builds"*

Still no folders moved. Still no code. Documents only.

### DO (Cascade drafts, Mike reviews)

**2.1 — PLAN/PHASE_QUEUE.md**
Unified cross-project phase queue. References Kitchen Table phase data.
Each phase has: Goal, Rationale, Done When (3-5 binary criteria), Dependencies.
Covers: Kamunity ecosystem, WALGA, Wedding.

**2.2 — PLAN/RHYTHM.md**
Weekly/monthly/quarterly cadences.
What gets checked, what gets updated, what gets reviewed.
This is the document that prevents everything from going stale.

**2.3 — PLAN/DECISION_LOG.md**
Seeded with decisions from this session + master roadmap + Kitchen Table.
Format: Date | Decision | Rationale | Affects.

**2.4 — ENGINE/RUNNER.md**
Vine-o-Code v2 engine instructions. All improvements from the review:
- Session Start Checklist
- Pre-flight safety check at SPEC
- Cross-ecosystem health check at FORWARD
- Recalibrated confidence scoring (Constitutional Alignment = 35/100)
- Autonomous decision logging
- PAUSE.md tier (in addition to STOP.md)
- Build attempt escalation path clarified

**2.5 — ENGINE/TEMPLATES/** (3 foundation doc templates)
Constitution, Mission, Phase Queue templates that new projects inherit from.

### CHECK (Mike reviews)

- [ ] PHASE_QUEUE: Does the priority order feel right?
- [ ] PHASE_QUEUE: Are the "Done When" criteria actually measurable?
- [ ] RHYTHM: Is the weekly cadence realistic for a solo operator?
- [ ] RUNNER: Would you trust an AI operating under these instructions?
- [ ] TEMPLATES: Would these produce good foundation docs for a new project?

### REFLECT

> Before moving on: The PLAN/ and ENGINE/ are the operational heart.
> Try this test: imagine you're starting a brand new AI session next week.
> You point the assistant at BRAIN/ + PLAN/ + ENGINE/.
> Can it: (a) know what to work on? (b) know how to work? (c) know when to stop?
>
> If all three are yes → the system works on paper.
> If not → what's the gap?

### DECIDE

- If system reads well on paper → proceed to Phase 3 (first real changes)
- If RUNNER needs iteration → refine before it drives real work
- If overwhelmed → PAUSE. The documents aren't going anywhere.

---

## PHASE 3: CONSOLIDATE THE CODEBASE
*"First real changes. Reversible. Careful."*

This is where folders move. Everything gets archived first.

### DO (Mike executes, Cascade guides)

**3.1 — Create the archive**
Zip ALL existing code folders into `ARCHIVE/kamunity-history-feb2026.zip`.
Write `ARCHIVE/_HISTORY_INDEX.md` with provenance for every folder.
**This happens BEFORE any folder is moved.**

**3.2 — Create the folder structure**
Create: `BRAIN/`, `PLAN/`, `ENGINE/`, `KNOWLEDGE/`, `PROJECTS/`, `ARCHIVE/`
inside Kamunity-Tabletop-Plan/ (or a renamed root folder if preferred).

**3.3 — Place the documents**
Move all Phase 1 + Phase 2 documents into their correct folders.
Move existing docs: master roadmap → PLAN/, threat model → KNOWLEDGE/.

**3.4 — Move active project code**
Move active projects into PROJECTS/:
- kitchen-table/ → PROJECTS/kitchen-table/
- AI Readiness code → PROJECTS/ai-readiness/
- Kai/kamunity.org code → PROJECTS/kamunity-org/
- kamunity.ai code → PROJECTS/kamunity-ai/
- Wedding code → PROJECTS/wedding/
- WALGA project → PROJECTS/walga/
- Vine-o-Code site → PROJECTS/vine-o-coding/
- Other active projects as identified in Phase 0 audit

**3.5 — Verify CI/CD**
For the 3 GitHub-connected sites (kamunity.org, kamunity.ai, wedding):
- Confirm the Git remote still points to the right repo after folder move
- Confirm Netlify deploys still trigger correctly
- Test with a trivial commit (whitespace or comment) to verify pipeline

**3.6 — Rename auto-named Netlify sites**
Using names recommended in Phase 0 audit + your approval.

### CHECK (Critical — verify before proceeding)

- [ ] Archive zip exists and is complete?
- [ ] All active sites still load at their URLs?
- [ ] CI/CD still works for kamunity.org, kamunity.ai, wedding?
- [ ] Kitchen Table still works locally (python server test)?
- [ ] No broken cross-links between ecosystem sites?
- [ ] Folder structure matches the Campfire Architecture diagram?

### REFLECT

> This is the most consequential phase. Take 24 hours before proceeding.
> Check all live sites manually. Check the archive is complete.
> Ask: Is anything missing? Did anything break?
>
> This is also a good moment to update STATE.md with the new reality.

### DECIDE

- If everything works → proceed to Phase 4
- If anything broke → fix it before touching code
- If the structure feels wrong → adjust now, it's cheap to rename folders

---

## PHASE 4: GIT/NETLIFY CLEANUP
*"Lean and clean — but nothing lost"*

### DO (Mike executes with Cascade guidance)

**4.1 — Archive old GitHub repos**
For repos confirmed as superseded (kamunity-10july, kamunity-demo, mvb-prototype, Kamunity-MVP):
- Ensure they're set to private (some already are)
- Add a README note: "Archived Feb 2026. History preserved. Superseded by [current project]."
- Do NOT delete — Git history is the case study

**4.2 — Archive old Netlify sites**
For sites confirmed as superseded (outcome-vine, kamunity-10kjuly, kamunitymvb, kamunity-org-rebuild):
- Screenshot each site first (visual archive)
- Delete the Netlify project (the code is in the zip archive + GitHub history)
- Log in ARCHIVE/_HISTORY_INDEX.md

**4.3 — Rename active Netlify sites**
Give proper names to auto-named sites (per Phase 0 recommendations + your approval).

**4.4 — Update BRAIN/ECOSYSTEM.md**
Reflect the cleaned-up state. Only active sites listed. Archive sites documented in ARCHIVE/.

**4.5 — Verify kamunitydemo.org**
Confirm domain is still registered. Document its purpose ("messy-by-design playground").
Ensure it's in ECOSYSTEM.md as a special-purpose site.

### CHECK

- [ ] All live sites still work?
- [ ] GitHub repos: only active ones are public, old ones are private with archive note?
- [ ] Netlify: only active sites remain, count reduced from 18 to ~10-12?
- [ ] ECOSYSTEM.md accurately reflects the cleaned state?
- [ ] Domain registrations confirmed for all custom domains?

### REFLECT

> Count: How many GitHub repos do you have now? How many Netlify sites?
> Compare to before. Does it feel cleaner? More manageable?
>
> Key question: Could someone else (or an AI) look at your GitHub + Netlify
> and understand what each project is and why it exists?

### DECIDE

- If clean and clear → proceed to Phase 5
- If more cleanup needed → do it now while momentum is fresh
- If ready to start building → Phase 5 is the first code phase

---

## PHASE 5: KITCHEN TABLE v4 (First Code Phase)
*"The dashboard earns its name"*

This is the first phase that changes code. Everything before was documents and folders.

### DO (Cascade builds, Mike reviews)

**5.1 — Add zones to Kitchen Table**
Extend data.js to support project zones (Kamunity Build, WALGA, Wedding).
Each zone has its own tasks, phases, and status.
Today view shows tasks across all zones.

**5.2 — Connect Kitchen Table to KNOWLEDGE/**
Kitchen Table reads from (or syncs with) KNOWLEDGE/ALLIES.md, GRANTS.md, SERVICES.md.
Single source of truth: KNOWLEDGE/ files are canonical, data.js is generated/synced.

**5.3 — Add transcript intake**
Simple paste-or-upload interface. Sends to Claude API via Waymaker system prompt.
Returns structured data: action items, decisions, contacts, dates.
Routes to correct zone. Human confirms before committing.

**5.4 — Waymaker system prompt**
Draft the Kai Waymaker system prompt. It reads BRAIN/ + PLAN/ + KNOWLEDGE/.
Internal use only. Never public-facing.

### CHECK

- [ ] Kitchen Table still works with all original functionality?
- [ ] New zones appear and are usable?
- [ ] Transcript intake produces sensible structured output?
- [ ] Waymaker system prompt produces useful operational responses?
- [ ] No new data leaks into Wayfinder's scope?

### REFLECT

> Use the system for one full week before proceeding.
> Track: What worked? What was annoying? What did you never use?
> Update PLAN/DECISION_LOG.md with real-world findings.
>
> This is the evidence that changes the plan.

### DECIDE

- If useful after 1 week → proceed to Phase 6
- If zones feel wrong → redesign before adding more
- If transcript pipeline is unreliable → simplify or defer

---

## PHASE 6+: EXPAND BASED ON EVIDENCE
*"Whatever reality reveals"*

Candidates based on what we know today:

- **Windsurf workflows** — `/weekly-review`, `/new-project`, `/ecosystem-check`
- **Kitchen Table ↔ Waymaker live loop** — Waymaker proposes, KT displays, you approve
- **Community rooms integration** — wedding room is the test case
- **WALGA learnings → consulting methodology** — real project becomes repeatable
- **Vine-o-Code v2 templates packaged** — methodology as product (Task t27)

But Phase 6 is defined by what you learn in Phase 5, not by what we plan today.

---

## Timeline (Realistic, Not Optimistic)

| Phase | Effort | Calendar | Dependencies |
|---|---|---|---|
| **Phase 0: Audit** | 2-3 hours | This session | None |
| **Phase 1: BRAIN docs** | 3-4 hours | This session or next | Phase 0 CHECK passed |
| **Phase 2: PLAN + ENGINE docs** | 3-4 hours | Next session | Phase 1 CHECK passed |
| **Phase 3: Consolidate** | 2-3 hours | Same or next session | Phase 2 CHECK passed |
| **Phase 4: Git/Netlify cleanup** | 1-2 hours | Same session as Phase 3 | Phase 3 CHECK passed (24hr wait) |
| **Phase 5: Kitchen Table v4** | 5-8 hours | Following week | Phase 4 CHECK passed |
| **Phase 6+: Evidence-driven** | Ongoing | After 1 week of Phase 5 use | Phase 5 REFLECT completed |

**Phases 0-2: Pure documents. Zero risk. ~8 hours.**
**Phases 3-4: Folder moves + cleanup. Low risk (archive first). ~4 hours.**
**Phase 5: First code. Medium risk (new features). ~6 hours.**

---

## The One Rule

**Every phase: archive before changing. Check before proceeding. Reflect before deciding.**

Nothing is lost. Nothing is rushed. Every step makes the next step clearer.

---

## Current Inventory (For Reference)

### GitHub Repos (7)
| Repo | Private | Updated | Status |
|---|---|---|---|
| kamunity-org | No | Feb 18, 2026 | ACTIVE — kamunity.org |
| kamunity | Yes | Feb 9, 2026 | ACTIVE — kamunity.ai |
| NeoKamunityWedding | Yes | Dec 22, 2025 | ACTIVE — wedding |
| kamunity-10july | No | Nov 20, 2025 | ARCHIVE candidate |
| kamunity-demo | No | Sep 22, 2025 | KEEP — kamunitydemo.org playground |
| mvb-prototype | Yes | Jun 15, 2025 | ARCHIVE candidate |
| Kamunity-MVP | Yes | Mar 6, 2025 | ARCHIVE candidate |

### Netlify Sites (18)
| Site | URL | Repo | Status |
|---|---|---|---|
| kamunityai | kamunity.org | kamunity-org | ACTIVE |
| sparkling-moxie-60ba41 | kamunity.ai | kamunity | ACTIVE |
| fariha-mike-wedding-2026 | wedding | NeoKamunityWedding | ACTIVE |
| kamunity-ai-readiness | ai-readiness.netlify.app | none | ACTIVE |
| kamunity-audit | kamunity-audit.netlify.app | none | ACTIVE |
| vine-o-coding | vine-o-coding.netlify.app | none | ACTIVE |
| nonnas-knitting-circle | nonnas-knitting-circle.netlify.app | none | ACTIVE (live testing) |
| grants-hub | grants-hub.netlify.app | none | ACTIVE (live testing) |
| factoryk1 | factoryk1.netlify.app | none | ACTIVE |
| outcome-vine | outcome-vine.netlify.app | none | ARCHIVE (superseded by vine-o-coding) |
| kamunity-demo | kamunitydemo.org | kamunity-demo | KEEP (playground) |
| kamunity-org-rebuild | kamunity-org-rebuild.netlify.app | none | TRIAGE (examine) |
| kamunity-10kjuly | kamunity-10kjuly.netlify.app | kamunity-10july | ARCHIVE candidate |
| kamunitymvb | kamunitymvb.netlify.app | mvb-prototype | ARCHIVE candidate |
| adorable-dango-3479db | adorable-dango-3479db.netlify.app | none | TRIAGE (examine + rename) |
| subtle-starship-d0bdac | subtle-starship-d0bdac.netlify.app | none | TRIAGE (examine + rename) |
| starlit-unicorn-6440fb | starlit-unicorn-6440fb.netlify.app | none | TRIAGE (examine + rename) |
| candid-donut-4ec289 | candid-donut-4ec289.netlify.app | none | TRIAGE (examine + rename) |

### Code Folders — OneDrive/Dev_Code/ (17)
Audit pending (Phase 0.2)

### Code Folders — C:\Users\mikef\ (9)
Audit pending (Phase 0.2)

---

*This plan follows its own advice: DO → CHECK → REFLECT → DECIDE at every step.*
*The plan serves the mission. The mission doesn't serve the plan.*
