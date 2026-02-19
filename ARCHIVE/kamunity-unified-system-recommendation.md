# THE CAMPFIRE ARCHITECTURE
## Recommendation: Kamunity as a Unified Knowledge System
### Feb 2026

---

## The Question

Can all of Kamunity's files, builds, knowledge, plans, safety model, ally network,
and build methodology live in one OneDrive folder that networks and knows everything —
with a Vine-o-Code v2+ engine that helps realise and enable the plan?

**Answer: Yes. And most of the pieces already exist.**

The gap is not new functionality. It's connective tissue — the folder structure,
bridge documents, and engine upgrades that turn six separate tools into one
self-aware operational system.

---

## What Exists Today (The Pieces)

| Piece | File(s) | What It Does | What It Doesn't Do |
|---|---|---|---|
| **The Plan** | `kamunity-master-roadmap.md` | Timeline from this week to Nov 2026. Tasks, revenue targets, metrics, decision log, risk register. | Not connected to Kitchen Table data. Static markdown — no state tracking. |
| **The Dashboard** | `kitchen-table/` (8 HTML pages + JS/CSS) | Interactive operational command centre. 46 tasks, 16 allies, 13 safety items, 13 gaps. localStorage state. | Data frozen in `data.js`. No connection to roadmap or threat model. |
| **The Safety Model** | `kamunity-safety-threat-model.md` | 5 threat surfaces, 20+ scenarios, 50+ mitigations. Honest risk assessment. | No connection to Kitchen Table safety items. No live status tracking. |
| **The Build Engine** | `Example vineocode starting docs/` (6 files) | RALF Engine phase loop. Constitution, mission, runner, phases, state. | Single-project only. No ecosystem awareness. No connection to plan. |
| **The Scope** | `kitchen-table-windy-scope.md` | Kitchen Table build specification. | Served its purpose — consumed by the build. |
| **The Review** | `vine-o-code-improvement-review.md` | 20 prioritised improvements to the methodology. | Not yet implemented. |

Six tools that each work alone but don't know about each other.

---

## The Recommendation

### Reorganise into three layers inside one folder:

```
Kamunity-Tabletop-Plan/
│
├── BRAIN/                          ← Layer 1: What any AI reads first
│   ├── CONSTITUTION.md             ← Kamunity principles (upgraded from Vine-o-Code)
│   ├── ECOSYSTEM.md                ← All 16 sites, status, URLs, cross-links
│   ├── STATE.md                    ← Global state: what's live, building, blocked
│   ├── SAFETY_GATES.md             ← Phase advancement gates from threat model
│   └── WHO.md                      ← Priya + anti-personas + ally summary
│
├── PLAN/                           ← Layer 2: Where the work is tracked
│   ├── MASTER_ROADMAP.md           ← The timeline (existing, moved here)
│   ├── PHASE_QUEUE.md              ← Active phase queue (replaces per-project queues)
│   ├── DECISION_LOG.md             ← Cumulative decisions across all projects
│   └── RHYTHM.md                   ← Weekly/monthly/quarterly maintenance cadences
│
├── ENGINE/                         ← Layer 3: How work gets done
│   ├── RUNNER.md                   ← Vine-o-Code v2 engine instructions
│   ├── TEMPLATES/                  ← Foundation doc templates for new projects
│   │   ├── constitution-template.md
│   │   ├── mission-template.md
│   │   └── phase-queue-template.md
│   └── WORKFLOWS/                  ← Windsurf workflows for common operations
│       ├── new-project.md
│       ├── ecosystem-health-check.md
│       └── weekly-review.md
│
├── KNOWLEDGE/                      ← Accumulated intelligence
│   ├── THREAT_MODEL.md             ← Safety threat model (existing, moved here)
│   ├── ALLIES.md                   ← Full constellation data + status
│   ├── GRANTS.md                   ← Grant pipeline with deadlines
│   ├── SERVICES.md                 ← Consulting services + pricing
│   └── RESEARCH/                   ← Accumulated research from all phases
│       └── (populated by engine during phase work)
│
├── PROJECTS/                       ← Individual project workspaces
│   ├── kitchen-table/              ← The dashboard app (existing, moved here)
│   ├── ai-readiness/               ← AI Readiness foundation docs + phases/
│   ├── kai/                        ← Kai config, system prompts, ecosystem JSON
│   └── (future projects scaffolded by engine)
│
└── ARCHIVE/                        ← Completed/superseded docs
    ├── kitchen-table-v2.html       ← Original prototype
    ├── kitchen-table-windy-scope.md
    └── Example vineocode starting docs/
```

---

## What You Get — Layer by Layer

### Layer 1: THE BRAIN (Context That Travels)

**What it is:** 5 canonical documents that any AI assistant reads at session start.
Whether you open Windsurf, paste into Claude, or load into Kai — reading BRAIN/ gives
full Kamunity context in under 2 minutes of token processing.

**What it unlocks:**
- **Session portability.** Start a new Cascade session, point it at BRAIN/, and it knows
  everything: what's live, what's building, what's blocked, who the allies are, what the
  safety gates require. No re-explaining. No context loss between sessions.
- **Multi-assistant awareness.** If you use different AI tools (Cascade for code, Claude
  for strategy, Kai for encounters), they all read the same BRAIN/ and operate from the
  same truth.
- **Constitutional inheritance.** Every project scaffolded inside this folder automatically
  inherits the CONSTITUTION. It's not a suggestion — it's the root document.

**What's required to build it:**
- Write `ECOSYSTEM.md` — extract from Kitchen Table `data.js` SITES array + enrich with URLs
  and cross-link obligations. (~30 min, I can draft this)
- Write `STATE.md` — aggregate current status from roadmap + Kitchen Table. (~30 min, I can draft this)
- Write `SAFETY_GATES.md` — extract critical/high gates from threat model. (~20 min, I can draft this)
- Write `WHO.md` — Priya persona + ally summary. (~15 min, I can draft this)
- Upgrade `CONSTITUTION.md` — add Cultural Safety, Trust Mark, Incident Response,
  Ecosystem Integration principles per the improvement review. (~30 min, I can draft this)

**Total effort: ~2 hours of document writing. No code changes.**

---

### Layer 2: THE PLAN (Self-Tracking Roadmap)

**What it is:** The master roadmap, phase queue, decision log, and operational rhythm —
all in one place, all referencing each other.

**What it unlocks:**
- **The plan knows its own status.** PHASE_QUEUE.md references Kitchen Table task IDs.
  When tasks are completed in the Kitchen Table, the plan is updated. When the plan changes,
  Kitchen Table data should reflect it.
- **Decision archaeology.** Every strategic decision across all projects logged in one
  place with reasoning. Six months from now, you can trace WHY something was built the way
  it was.
- **Maintenance rhythm.** RHYTHM.md defines what happens weekly/monthly/quarterly. This is
  the document that prevents everything from going stale. It's the answer to Kitchen Table
  Gap g13 ("Kitchen Table maintenance rhythm? Only useful if used.").

**What's required to build it:**
- Move `kamunity-master-roadmap.md` → `PLAN/MASTER_ROADMAP.md`
- Write `PLAN/PHASE_QUEUE.md` — unified queue across all projects, replacing per-project
  queues. References Kitchen Table phase data (p1–p6). (~45 min, I can draft this)
- Write `PLAN/DECISION_LOG.md` — seed with existing decisions from roadmap + Kitchen Table
  + Vine-o-Code review. (~30 min, I can draft this)
- Write `PLAN/RHYTHM.md` — weekly/monthly/quarterly cadences. (~20 min, I can draft this)

**Total effort: ~2 hours of document writing + folder moves. No code changes.**

---

### Layer 3: THE ENGINE (Vine-o-Code v2)

**What it is:** An upgraded RALF Engine that reads the BRAIN, follows the PLAN, checks
SAFETY_GATES, and builds projects inside PROJECTS/.

**What it unlocks:**
- **Orchestrated builds.** The engine doesn't just build one project — it reads the global
  state, checks what's highest priority across the whole ecosystem, and proposes what to
  work on next.
- **Safety-gated phases.** Before advancing any phase, the engine checks SAFETY_GATES.md.
  Critical gates open = phase blocked. No exceptions.
- **Knowledge compounding.** Research from Phase 1 of AI Readiness gets written to
  KNOWLEDGE/RESEARCH/. When Phase 1 of Perth Directory starts, that research is already
  available. Every project makes the next project smarter.
- **New project scaffolding.** Need a new Kamunity site? The engine reads TEMPLATES/,
  generates foundation docs inheriting the CONSTITUTION, and scaffolds a new project in
  PROJECTS/. This is what Task t27 (Kai runs Vine-o-Code inline) needs.
- **Windsurf workflows.** Common operations codified as `.windsurf/workflows/` — start new
  project, run ecosystem health check, do weekly review. You type `/weekly-review` and
  Cascade knows what to do.

**What's required to build it:**
- Write `ENGINE/RUNNER.md` — Vine-o-Code v2 runner with all improvements from the review:
  session start checklist, pre-flight safety check, cross-ecosystem health check,
  recalibrated confidence scoring, autonomous decision logging. (~1 hour, I can draft this)
- Write 3 foundation doc templates. (~45 min, I can draft these)
- Write 3 Windsurf workflows. (~30 min, I can draft these)

**Total effort: ~2.5 hours of document writing. No code changes.**

---

### KNOWLEDGE/ (Accumulated Intelligence)

**What it is:** Project-independent knowledge that persists across all phases and projects.

**What it unlocks:**
- **Ally state is project-independent.** WACOSS is relevant to AI Readiness, Perth
  Directory, Kitchen Table, and grant applications. Their status should live in one place,
  not duplicated across project data files.
- **Grant pipeline is live.** Deadlines tracked. Status updated. Visible from any project
  context.
- **Research compounds.** Phase research from any project becomes available to all projects.
  A finding about community org digital literacy from AI Readiness research informs Perth
  Directory design.

**What's required to build it:**
- Move `kamunity-safety-threat-model.md` → `KNOWLEDGE/THREAT_MODEL.md`
- Write `KNOWLEDGE/ALLIES.md` — extract from Kitchen Table data, enrich with notes.
  (~30 min, I can draft this)
- Write `KNOWLEDGE/GRANTS.md` — extract from Kitchen Table data. (~15 min, I can draft this)
- Write `KNOWLEDGE/SERVICES.md` — extract from Kitchen Table data. (~15 min, I can draft this)
- Create empty `KNOWLEDGE/RESEARCH/` directory.

**Total effort: ~1 hour of document writing + folder moves.**

---

## What You Get — The Full Picture

When all four layers are in place:

### Ability 1: Any AI Session Has Full Context
Open Windsurf. The workspace is this folder. Any assistant reads BRAIN/ (5 docs, <3 min)
and knows: what Kamunity is, what's live, what's building, who matters, what's dangerous,
and what's next. No re-explaining. No context window wasted on catch-up.

### Ability 2: The Plan Executes Itself (With You Driving)
The ENGINE reads the PLAN and proposes the next highest-value phase. You approve or
redirect. Safety gates are checked automatically. Research is written to KNOWLEDGE/.
Decisions are logged. STATE.md is updated. The plan doesn't go stale because the engine
updates it as part of every phase.

### Ability 3: New Projects Inherit Everything
Need to build Perth Directory? The engine scaffolds it in PROJECTS/perth-directory/ using
TEMPLATES/. It inherits the CONSTITUTION. It reads KNOWLEDGE/ALLIES.md to know who's
relevant. It reads KNOWLEDGE/RESEARCH/ for existing findings. It checks SAFETY_GATES.md
before advancing. The project starts at 80% context instead of zero.

### Ability 4: Kitchen Table Becomes the Dashboard of the System
Right now Kitchen Table has frozen data in data.js. In the next code iteration, data.js
could read from the KNOWLEDGE/ and PLAN/ markdown files — or more practically, the
KNOWLEDGE/ files become the canonical source and data.js is regenerated from them. The
Kitchen Table becomes a live dashboard of the entire system, not a standalone app with
hardcoded data.

### Ability 5: Single Point of Failure Mitigation (CC3 in Threat Model)
The biggest risk in the threat model is "Single point of failure: Mike." This architecture
is the direct mitigation. If you share this OneDrive folder with a collaborator, they can
read BRAIN/ and understand everything. If you're unavailable for a week, the STATE.md
and RHYTHM.md tell someone else exactly what needs attention.

### Ability 6: Vine-o-Code v2 Becomes a Product
The TEMPLATES/ and ENGINE/RUNNER.md together ARE the Vine-o-Code methodology, packaged.
Task t27 (Kai runs Vine-o-Code inline) becomes: Kai asks the template questions, generates
foundation docs from the templates, and outputs a project scaffold that a user drops into
their own folder and points an AI assistant at. The methodology IS the product.

---

## What's Required — Summary

### Phase A: Folder + Documents (No Code)

| Action | Effort | Who |
|---|---|---|
| Create folder structure (BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, ARCHIVE/) | 10 min | Mike (folder moves) |
| Move existing files to new locations | 10 min | Mike |
| Write BRAIN/ documents (5 files) | 2 hours | Cascade can draft |
| Write PLAN/ documents (4 files) | 2 hours | Cascade can draft |
| Write ENGINE/ documents (runner + templates + workflows) | 2.5 hours | Cascade can draft |
| Write KNOWLEDGE/ documents (allies, grants, services) | 1 hour | Cascade can draft |
| **Total** | **~8 hours** | **Mostly Cascade drafting, Mike reviewing** |

### Phase B: Kitchen Table Integration (Code)

| Action | Effort | Who |
|---|---|---|
| Update Kitchen Table data.js to align with KNOWLEDGE/ files | 2-3 hours | Cascade |
| Add "Sync from KNOWLEDGE/" workflow | 1 hour | Cascade |
| Kitchen Table reads STATE.md for live status display | 1-2 hours | Cascade |
| **Total** | **~5 hours** | **Cascade builds, Mike reviews** |

### Phase C: Engine Operational (Ongoing)

| Action | Effort | Who |
|---|---|---|
| Run first Vine-o-Code v2 phase on a real project | 2-3 hours | Cascade + Mike |
| Refine RUNNER.md based on first run | 30 min | Cascade |
| Establish weekly rhythm (RHYTHM.md) | 15 min/week | Mike |
| **Total** | **~3 hours + ongoing 15 min/week** | **Collaborative** |

### Grand Total to Full Functionality

**Phase A (documents only, no code): ~8 hours of drafting**
**Phase B (code integration): ~5 hours**
**Phase C (engine operational): ~3 hours + ongoing rhythm**

**~16 hours total to a unified, self-aware operational system.**

That's 2 focused days. Not 2 months.

---

## Is This Too Big?

No. Here's why:

1. **The pieces already exist.** The roadmap, threat model, Kitchen Table data, and
   Vine-o-Code docs contain ~95% of the content needed. The work is reorganisation and
   bridge-building, not creation from scratch.

2. **Phase A requires zero code.** It's pure document writing and folder moves. If it
   doesn't work out, you delete some folders. No risk.

3. **Each layer is independently useful.** BRAIN/ alone (5 documents) transforms every
   future AI session. You don't need the full system to get value from the first step.

4. **It's the same work you're already doing, structured differently.** The master roadmap
   IS the plan. The threat model IS the safety gates. The Kitchen Table data IS the
   knowledge. Right now they're disconnected files. This just gives them addresses and
   introduces them to each other.

5. **It directly addresses the #1 risk.** The threat model's CC3 (Single point of failure:
   Mike) is mitigated by a system where the knowledge is externalised, structured, and
   readable by anyone — human or AI — who opens the folder.

---

## What I Can Do Right Now (If You Say Go)

Without changing any code, I can draft:

1. **BRAIN/CONSTITUTION.md** — upgraded with Cultural Safety, Trust Mark, Incident Response,
   Ecosystem Integration principles
2. **BRAIN/ECOSYSTEM.md** — all 16 sites with status and cross-link obligations
3. **BRAIN/STATE.md** — current global state aggregated from all sources
4. **BRAIN/SAFETY_GATES.md** — critical and high gates extracted from threat model
5. **BRAIN/WHO.md** — Priya persona + ally network summary
6. **PLAN/PHASE_QUEUE.md** — unified cross-project phase queue
7. **PLAN/RHYTHM.md** — weekly/monthly/quarterly cadences
8. **ENGINE/RUNNER.md** — Vine-o-Code v2 engine instructions

That's 8 documents. The skeleton of the whole system. You review, adjust, and decide
whether to proceed to folder moves and code integration.

---

## The One Sentence Version

*Everything Kamunity knows, plans, builds, and protects — in one folder that any AI
assistant can read in 3 minutes and any human collaborator can understand in 15.*

---

*"The Kitchen Table is where you spread everything out and see what connects to what."
This recommendation is just making the table bigger.*
