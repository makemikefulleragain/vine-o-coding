# KAMUNITY NERVE CENTRE
## The Map, The Cheat Sheet, The Action List
### Updated: Feb 20, 2026

*This is the one document you read when you sit down. It tells you what's here, how to use it, what's waiting, and what to do next. Think of it as the pause menu in a game — map, inventory, quest log, controls.*

---

## THE MAP — What's In This Folder

```
Kamunity-Tabletop-Plan/                    ← YOU ARE HERE
│
├── BRAIN/                                 ← The Constitution. Read first, always.
│   ├── CONSTITUTION.md                       11 inviolable principles
│   ├── ECOSYSTEM.md                          Every live site, repo, domain mapped
│   ├── STATE.md                              Current pulse — safety, money, blockers
│   ├── SAFETY_GATES.md                       16 binary gates, 3 blocking ALIKE
│   ├── WHO.md                                Priya, the Triad, allies, anti-personas
│   ├── kamunity-safety-threat-model.md       Full threat model across all surfaces
│   └── INCIDENT_RESPONSE.md                 Operationalised incident response plan (Feb 20)
│
├── PLAN/                                  ← The Strategy. What we're doing and when.
│   ├── PHASE_QUEUE.md                        11 phases, KP-01 to KP-11, prioritised
│   ├── RHYTHM.md                             Weekly/monthly/quarterly cadences
│   ├── DECISION_LOG.md                       29 decisions logged with rationale
│   ├── kamunity-master-roadmap.md            Weekly → monthly → quarterly roadmap
│   └── campfire-phase-plan.md                Phase execution plan for this consolidation
│
├── ENGINE/                                ← The Build Instructions. How AI builds.
│   ├── RUNNER.md                             Vine-o-Code v2 — the full RALF loop
│   └── TEMPLATES/                            Starter docs for new projects
│       ├── CONSTITUTION_TEMPLATE.md
│       ├── MISSION_TEMPLATE.md
│       └── PHASE_QUEUE_TEMPLATE.md
│
├── KNOWLEDGE/                             ← The Library. Research, history, learnings.
│   ├── THREE_SPEEDS.md                       FactoryK → VineCode → Auto-RALF explained
│   ├── kai-constitution.md                   Kai's AI personality + constraints
│   ├── kai-vine-code-scope.md                Kai deepening scope doc
│   ├── ai-groundwork-scope.md                AI foundations scope doc
│   ├── nlnet-application-draft.md            NLnet funding application draft
│   ├── OPUS_HANDOFF_20250220.md              Feb 20, 2026 Opus strategic session handoff (fully actioned)
│   ├── kai-OPUS_HANDOFF.md                   Previous AI session handoff notes
│   ├── kai-manual-tasks.md                   Manual tasks for Kai development
│   ├── ecosystem-state.json                  Machine-readable ecosystem snapshot
│   ├── Grant hub.docx                        Original grant hub concept doc
│   ├── Local Area Nerd Network bios.docx     LANN concept bios
│   ├── vine-o-code-improvement-review.md     Engine methodology review
│   ├── kitchen-table-windy-scope.md          Kitchen Table build scope doc
│   ├── MIKE_FULLER_PROFILE.md                Verified profile: career, methodology, philosophy (Feb 20)
│   ├── KAMUNITY_GAP_ANALYSIS_20260220.md     Gap analysis from Opus strategic session (Feb 20)
│   ├── engine-v1/                            Vine-o-Code v1 key docs (6 files)
│   ├── engine-v1-full/                       Complete RALF engine with all trails
│   │   ├── research/ (5 iterations)          Raw research findings
│   │   ├── synthesis/ (5 iterations)         Themed analysis
│   │   ├── specs/ (5 iterations)             Buildable specifications
│   │   ├── critiques/ (5 iterations)         Self-critiques
│   │   ├── builds/                           Build instructions (iteration 05)
│   │   ├── auto/ auto_run2/ auto_run3/       3 autonomous runs (17 outcomes)
│   │   ├── grants-hub/                       Full grants-hub project source
│   │   ├── nonna_knits_club/                 Full nonna's knitting source
│   │   └── outcome-vine/                     Superseded vine-o-coding source
│   └── RESEARCH/                             PDFs + docs (Lean Startup, AI in PM, etc.)
│
├── PROJECTS/                              ← Live Codebases. Things that are deployed.
│   ├── README.md                             Move instructions + status
│   ├── ai-readiness/                         → kamunity-ai-readiness.netlify.app
│   └── sovereignty-audit/                    → kamunity-audit.netlify.app
│
├── WORKSHOP/                              ← Experiments. Play. Prototypes.
│   ├── engine-prototypes-auto1/              5 prototypes (sovereignty calc, templates...)
│   ├── engine-prototypes-auto2/              6 outcomes (2 built, 2 rec, 2 escalated)
│   ├── engine-prototypes-auto3/              6 outcomes (4 built, 2 recommended)
│   ├── HeroGameTest/                         Simple HTML/JS game
│   ├── Kamunity-Prototype/                   Early Kamunity experiment
│   └── KamunityCardGame/                     Card game experiment
│
├── ARCHIVE/                               ← Everything preserved. Nothing deleted.
│   ├── _HISTORY_INDEX.md                     Full provenance of every old folder
│   ├── phase-0-audit-report.md               Phase 0 audit (completed)
│   ├── kamunity-unified-system-recommendation.md  Original recommendation (accepted)
│   ├── kitchen-table-v2.html                 Superseded prototype (data extracted)
│   └── files.zip                             Legacy archive
│
├── kitchen-table/                         ← Mission Control dashboard (PWA) — deployed
│   ├── index.html (Today) + 8 more pages (tasks, phases, ecosystem, allies, money, safety, gaps, source)
│   ├── sovereignty-calculator.html           Standalone Sovereignty Calculator tool (Feb 20)
│   ├── copilot-check.html                    Standalone Copilot Risk Check tool (Feb 20)
│   ├── js/data.js (47 tasks, 7 phases, 16 sites, 16 allies)
│   ├── js/waymaker.js (Waymaker AI — voice input, abilities modal, /shortcuts, honesty rules)
│   ├── js/source.js (Source editor — 5-file browser editor, saves to disk locally)
│   ├── js/widgets.js (Today widgets — rhythm reminder, NLnet countdown, ally radar)
│   ├── js/auth.js (password gate — sessionStorage)
│   ├── js/brief.js (Mon/Wed/Sat audio brief player)
│   ├── data/ (BRAIN/PLAN snapshots for Netlify deployment)
│   ├── data/task-specs/ (47 task spec files — t1.md through t47.md)
│   ├── netlify/functions/waymaker.mjs (Claude API proxy)
│   ├── netlify/functions/markdown.mjs (serves data/ snapshots)
│   ├── server.py (local server + /api/files + Claude + ElevenLabs)
│   └── audio/ (generated MP3 briefs — gitignored)
│
├── tools/                                 ← Client-facing deliverables (printable, shareable)
│   └── ai-safety-checklist.html              Printable AI safety one-pager for community orgs
│
├── .windsurf/workflows/                   ← Windsurf slash commands (7 total)
│   ├── new-session.md, session-end.md
│   ├── uat.md, safety-review.md
│   ├── weekly-rhythm.md, deploy-check.md
│   └── restart-server.md                     Stops + restarts server.py + opens browser
│
├── NERVE_CENTRE_MAP.md                    ← THIS FILE — start here
└── WHATS_NEXT.md                          ← Nerve centre roadmap
```

---

## THE CHEAT SHEET — How To Do Things

### Starting an AI Session (Cascade / Windsurf)

| Want to... | Open this folder | Say this |
|---|---|---|
| Build something | Kamunity-Tabletop-Plan | "Read BRAIN/ and ENGINE/RUNNER.md. Build [task] from PLAN/PHASE_QUEUE.md" |
| Research something | Kamunity-Tabletop-Plan | "Read BRAIN/ and KNOWLEDGE/. Research [topic]" |
| Update the plan | Kamunity-Tabletop-Plan | "Read BRAIN/STATE.md and PLAN/. Update [what changed]" |
| Draft a document | Kamunity-Tabletop-Plan | "Read BRAIN/WHO.md. Draft [doc] for [audience]" |
| Review a prototype | Kamunity-Tabletop-Plan | "Look at WORKSHOP/engine-prototypes-auto1/[name]. Review it." |

### Key Shortcuts

| Action | Command / Location |
|---|---|
| **Run Kitchen Table** | Type `/restart-server` in Windsurf — or: `python server.py` (from `kitchen-table/`) then open `localhost:8732` |
| **Check what's next** | Read `PLAN/PHASE_QUEUE.md` — KP-01 is current |
| **Check what's blocked** | Read `BRAIN/SAFETY_GATES.md` — 3 critical gates block ALIKE |
| **Check the pulse** | Read `BRAIN/STATE.md` — updated Feb 19 |
| **Log a decision** | Append to `PLAN/DECISION_LOG.md` with date + rationale |
| **Start a new project** | Copy templates from `ENGINE/TEMPLATES/` → fill in blanks |
| **Find research** | Browse `KNOWLEDGE/engine-v1-full/research/` or `KNOWLEDGE/RESEARCH/` |
| **See all live sites** | Read `BRAIN/ECOSYSTEM.md` — 18 Netlify sites mapped |
| **Weekly check-in** | Follow `PLAN/RHYTHM.md` — Monday 30 min (or 15 min minimum) |

### Deploying

| Project | Type | How to Deploy |
|---|---|---|
| ai-readiness | Drag & drop | Build: `npm run build` → drag `dist/` to Netlify |
| sovereignty-audit | Drag & drop | Build: `npm run build` → drag `dist/` to Netlify |
| grants-hub | Drag & drop | (in engine-v1-full/) Build → drag to Netlify |
| nonna's knitting | Drag & drop | (in engine-v1-full/) Build → drag to Netlify |
| kamunity.org | Git push | Push to `kamunity-org` repo → auto-deploys |
| kamunity.ai | Git push | Push to `kamunity` repo → auto-deploys |
| wedding | Git push | Push to `NeoKamunityWedding` repo → auto-deploys |
| kitchen-table | Git push | Push to `kamunity-kitchen-table` repo → Netlify auto-deploys. Local: `/restart-server` |

---

## KEY PROTOCOLS

### The Safety Protocol
```
Before ANY phase advances to BUILD:
1. Read BRAIN/SAFETY_GATES.md
2. Check all applicable gates
3. If any CRITICAL gate fails → STOP, write blocked.md
4. If any HIGH gate fails → PAUSE, write what's needed
5. Update BRAIN/STATE.md with current status
```

### The Build Protocol (Vine-o-Code v2)
```
RESEARCH → TRIAGE → SPEC → BUILD → CRITIQUE → CONFIDENCE SCORE → FORWARD
                ↑                                        ↓
                └── Below 60? STOP. 60-79? PAUSE. 80+? PROCEED.
```

### The "New Session" Protocol
```
Every new AI session reads these files FIRST:
1. BRAIN/CONSTITUTION.md  (what we believe)
2. BRAIN/STATE.md         (where we are)
3. BRAIN/SAFETY_GATES.md  (what's dangerous)
4. PLAN/PHASE_QUEUE.md    (what we're doing)
5. ENGINE/RUNNER.md       (how to build)
Total read time: ~3 minutes. Then the AI has full context.
```

### The Decision Protocol
```
When making a significant choice:
1. Check BRAIN/CONSTITUTION.md — does this violate any principle?
2. Check BRAIN/WHO.md — does this serve Priya? Could it harm vulnerable people?
3. Log it in PLAN/DECISION_LOG.md with date + rationale + what it affects
```

### The Three Speeds Protocol
```
Need a prototype fast?     → Auto-RALF (WORKSHOP/)
Need a proper build?       → Vine-o-Code v2 (ENGINE/RUNNER.md)
Need core infrastructure?  → FactoryK (full narrative treatment)
See KNOWLEDGE/THREE_SPEEDS.md for the full methodology.
```

---

## CHANNELS — Where Work Happens

| Channel | What It Does | Access |
|---|---|---|
| **Windsurf (Cascade)** | Builds code, drafts docs, manages the nerve centre | This IDE |
| **Claude / ChatGPT** | Research, drafting, strategic thinking | Web browser |
| **Kitchen Table** | Visual dashboard — tasks, phases, allies, safety | `localhost:8732` |
| **Netlify** | Deploys all 18 sites | netlify.com (kamunity1 account) |
| **GitHub** | Source control for git-connected projects | github.com/makemikefulleragain |
| **OneDrive** | Syncs this entire folder across devices | Automatic |
| **ElevenLabs** | Voice synthesis — Kai audio, content narration, accessibility | elevenlabs.io |

### The AI Triad

| AI | Role | Where It Works |
|---|---|---|
| **Wayfinder (Kai)** | Public-facing. Encounters with community orgs. | kamunity.org |
| **Waymaker** | Internal. Operational intelligence for Mike. | Kitchen Table / future |
| **Cascade** | Build engine. Code, docs, architecture. | Windsurf IDE |

---

## STATUS REPORT — Where Things Stand (Feb 19, 2026)

### What Got Built Today (Morning)
- 7-layer Campfire Architecture — fully populated
- 20+ documents across BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/
- 2 project codebases moved into PROJECTS/
- Full engine-v1 extracted and catalogued (5 iterations, 17 prototypes)
- THREE_SPEEDS methodology documented

### What Got Built Today (Evening)
- Waymaker Brief pipeline: STATE.md → Claude → ElevenLabs TTS → MP3 → Kitchen Table player
- Three brief types: Week Opener (Mon), Mid-Week Pulse (Wed), Week Wrap (Sat)
- 250-word punchy format with Kai capabilities nudge
- Off-day placeholder with next brief day + test-generate link
- 3 new decisions logged. 27 total.

### Safety Status
- **3 critical gates block ALIKE showcase:** Kai crisis protocol, prompt injection testing, disclaimer text
- **API keys still in Word doc** in `important teck/` folder — needs secure move
- **No backup strategy** for Supabase/Netlify data

### Financial Status
- Pre-revenue. Zero income from Kamunity tools.
- NLnet application drafted (in KNOWLEDGE/)
- 4 service offerings defined (in kitchen-table data)
- MTD: $0

### Live Sites: 18 on Netlify
- 8 core tools (kamunity.org, kamunity.ai, audit, readiness, grants, nonna's, vine-o-coding, factoryk)
- 3 auto-named (need renaming)
- 4 archive candidates
- 3 with custom domains (kamunity.org, kamunity.ai, kamunitydemo.org)

---

## ACTION ITEMS — What's Waiting To Be Done

### This Week (Critical)

| # | Action | Time | Tool / Channel |
|---|---|---|---|
| 1 | **Write Kai's crisis protocol** — system prompt for mental health, DV, self-harm | 2h | Cascade + KNOWLEDGE/kai-constitution.md |
| 2 | **Run prompt injection tests** on Kai | 1h | Manual testing on kamunity.org |
| 3 | **Add disclaimer text** to kamunity.org, audit, readiness sites | 1h | Cascade (code edit) |
| 4 | **Move API keys** from `important teck/` to secure location | 15m | Manual (Windows Credential Manager or .env) |
| 5 | **Weekly check-in** per RHYTHM.md — update STATE.md | 30m | Cascade or manual |

### Before ALIKE Meeting

| # | Action | Time | Tool / Channel |
|---|---|---|---|
| 6 | **Prep ALIKE demo flow** — what to show, in what order | 1h | Cascade (draft doc) |
| 7 | **Draft AI Safety Checklist one-pager** for ALIKE | 1h | Cascade |
| 8 | **Test sovereignty-calculator prototype** for demo potential | 30m | Open WORKSHOP/engine-prototypes-auto1/sovereignty-calculator/build/index.html |
| 9 | **Polish kamunity.org** encounter flow for live demo | 2h | Cascade (code) |

### This Month

| # | Action | Time | Tool / Channel |
|---|---|---|---|
| 10 | **Draft WALGA LGA pitch** | 2h | Cascade + KNOWLEDGE/ |
| 11 | **Polish NLnet application** | 3h | Cascade + KNOWLEDGE/nlnet-application-draft.md |
| 12 | **Generate Kai voice** with ElevenLabs for audio encounters | 2h | ElevenLabs + kamunity.org integration |
| 13 | **Email template blitz** — ALIKE, Activate MH, Volunteering WA | 1h | Cascade (using WHO.md ally data) |
| 14 | **Set up first revenue stream** — consulting offer page | 2h | Cascade (new page on kamunity.org?) |

### Prototype Goldmine (Pick Any)

These are working prototypes sitting in WORKSHOP/ waiting to be tested, polished, or integrated:

| Prototype | What It Does | Potential Use |
|---|---|---|
| **Sovereignty Calculator** | Shows hidden cost of "free" SaaS | Demo at ALIKE, embed in kamunity.org |
| **Room Type Templates** | JSON-driven room templates with preview | Integrate into kamunity.ai |
| **Notification Preferences** | Per-room/type/frequency controls | Integrate into kamunity.ai |
| **Six Reactions** | Value-typed reactions (Fact/Fun/Spicy...) | User testing with community members |
| **Data Export** | Client-side ZIP of all your data | Integrate into kamunity.ai (sovereignty!) |
| **Community Asset Register** | Inter-org asset sharing | Pitch to WALGA LGAs |
| **Meeting Notes Summariser** | Text → structured summary | Internal use immediately |
| **Community Garden Planner** | Plot map, planting calendar, roster | Pitch to community gardens |
| **QR Code Check-In** | Event attendance with CSV export | Use at next community event |
| **Grant Acquittal Helper** | Budget tracker + printable report | Test with a real grant |
| **Community Noticeboard** | Category-filtered, auto-expiring | Pitch to neighbourhood houses |

### Ideas The Engine Wisely Didn't Build (But Researched)

| Idea | Engine Said | Use Instead |
|---|---|---|
| Decision making tool | Use **Loomio** (worker co-op, 12+ years, OSS) | Recommend to allies |
| Event ticketing | Use **Humanitix** (Australian, charity, free for free events) | Recommend to allies |
| Survey tool | Use **LimeSurvey** or **Formbricks** (mature OSS) | Recommend to allies |
| Volunteer tracker | Use **Track It Forward** or **Jibble** (free, proven in AU) | Recommend to allies |
| Chat platform | Use **Element/Matrix**, **Mattermost**, or **Zulip** (all OSS) | Evaluate for kamunity.ai |

*These "don't build" recommendations are as valuable as the builds — they're ready-made advice for community organisations asking "what tool should we use?"*

---

## BY THE NUMBERS

| Metric | Count |
|---|---|
| Documents in BRAIN/ | 5 |
| Documents in PLAN/ | 3 |
| Documents in ENGINE/ | 4 |
| Documents in KNOWLEDGE/ | 21 + full engine archive |
| Live Netlify sites | 18 |
| GitHub repos | 7 |
| Working prototypes | 11 |
| Research iterations | 5 (with full audit trails) |
| Decisions logged | 32 |
| Safety gates defined | 16 |
| Phases in queue | 11 |
| Allies mapped | 16 |
| Tasks tracked | 47 |

---

*"You have more built than you think. You have more documented than most organisations ever will. The nerve centre's job is to make sure none of it gets lost, and all of it gets used."*
