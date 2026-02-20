# KAMUNITY GLOBAL STATE
## What's Live, What's Building, What's Blocked
### Last Updated: Feb 20, 2026 (late evening — MIKE_FULLER_PROFILE.md fully populated from LinkedIn + Tech'o'Space Ep 27)

*This document is the pulse check. Any AI session reads this first to know: where are we right now?*

---

## Current Period: Pre-Launch Sprint

**Week of Feb 19-23, 2026** — Meeting prep, safety-critical items, ecosystem stabilisation.

### Session Highlight (Feb 20 — Late Evening)
MIKE_FULLER_PROFILE.md created in KNOWLEDGE/ as verified source of truth for Mike's professional identity. Full LinkedIn experience + projects integrated: dated career timeline 1999–present, Perth relocation confirmed April 2007 (Joy Global start), The Pack Music Co-op documented (Founding Partner 2017, Deputy Chair 2021), WALGA scope confirmed (3 separate engagements Apr–Jan 2025), “chugger” origin corrected (was Regional Best Practice Manager at Fruitful On-Street Fundraising, Edinburgh), 10-project consulting table added, Open Questions: 4 of 5 answered and closed. Profile committed to nerve centre git.

### Session Highlight (Feb 20 — Evening)
Cascade completed the 4 Opus-identified gap tasks (KNOWLEDGE/KAMUNITY_GAP_ANALYSIS_20260220.md): (1) /calculator + /copilot-check confirmed live on kamunity.org — merged with remote implementations (remote had working pages from previous session; this session added correct /calculator + /copilot-check internal URLs to showcase.ts, fixed sovereignty-calculator + copilot-check kai-cards, strengthened Kai system prompt with explicit Microsoft/Copilot card surfacing triggers). (2) ecosystem-state.json updated to v0.2.0 with full 11-site registry (full_site_registry block) so Kai can answer "what do you have?" accurately. (3) llms-full.txt updated on kamunity.org + llms.txt on sovereignty-audit + ai-readiness updated with ecosystem cross-links. (4) sovereignty-audit + ai-readiness footers updated with Sovereignty Calculator + Copilot Check + Kai cross-links. All 3 repos committed + pushed to GitHub → Netlify CI/CD deploying. t12 ✅ t15 ✅ t29 ✅ (constitution page was already built; public/data/constitution.md confirmed present).

### Session Highlight (Feb 20 — Afternoon)
Opus handoff KNOWLEDGE/OPUS_HANDOFF_20250220.md reviewed in full — all Cascade build tasks confirmed done. Five items completed: (1) Voice recording transcript bug fixed (e.results[i][0].transcript). (2) Waymaker honesty rules added to system prompt — no more fake agency claims. (3) Abilities modal + /shortcuts added to Waymaker chat header — full discoverability layer with 8 commands. (4) Sovereignty Calculator + Copilot Check promoted to kamunity.org as full Next.js pages (/calculator, /copilot-check) and as Kai encounter cards — Kai now surfaces them when users mention Microsoft/Copilot/tool costs. (5) t47 formally queued with spec file. Code review caught 4 bugs (missing animation class, external Link→a, font-sans→font-fraunces, shortcut displayText) — all fixed and committed. kamunity.org now has 5 live showcase tools + /calculator + /copilot-check.

### Session Highlight (Feb 20 — Morning)
Opus handoff reviewed (KNOWLEDGE/OPUS_HANDOFF_20250220.md). Four tasks completed and UAT passed: (1) Waymaker crash fixed — loadState() returns undefined, state.safety threw on every message send; fixed by reading mutated arrays directly. Also fixed s.title → s.text property name. (2) Ecosystem tab: Prototypes section (17 WORKSHOP/ builds) + Recommended Ecosystem section (6 external tools, Principle 2 made visible) added. (3) URL data fixes: Nonna's Knitting corrected, Grants Hub URL added. (4) ROADMAP.md created for all 5 PROJECTS/ folders — pre-populated with current state, improvement queue, research questions.

### Session Highlight (Feb 19 — Morning)
Massive consolidation + build session. Campfire Architecture fully built. Waymaker AI chat live in Kitchen Table. 17 prototypes extracted from engine. Root directory cleaned. Version control initialized. Windsurf workflows created.

### Session Highlight (Feb 19 — Evening, Part 1)
ElevenLabs Waymaker Brief pipeline built end-to-end. STATE.md → Claude → ElevenLabs TTS → MP3 → Kitchen Table audio player. Three brief types: Week Opener (Mon), Mid-Week Pulse (Wed), Week Wrap (Sat). ~16,200 ElevenLabs credits/month. First test brief generated and played successfully.

### Session Highlight (Feb 19 — Late Evening, Kitchen Table v2)
Kitchen Table v2 complete in one session. Live data round-trip from BRAIN/PLAN markdown. Key deliverables: `/api/files` GET+POST in server.py (reads/writes BRAIN/ + PLAN/ live), `/.netlify/functions/markdown` serves bundled snapshots on Netlify, `✏️ Source` editor tab (5-file editor, save-to-disk, dirty state), Waymaker now reads full raw markdown files as context (not data.js summaries), Today page widgets (weekly rhythm reminder, NLnet urgency countdown, ally radar), `tools/ai-safety-checklist.html` printable leave-behind for ALIKE demo, `PLAN/meeting-briefs.md` full prep for all 3 meetings. Kitchen Table deployed to Netlify (kamunity-kitchen-table.netlify.app) with password gate. `/restart-server` Windsurf workflow created.

### Session Highlight (Feb 19 — Evening, Part 4)
All 6 core sites now on GitHub CI/CD (sovereignty-audit, ai-readiness, vine-o-coding migrated from drag-and-drop). UAT fixes: G4 disclaimers moved to footers on all sites, crisis card fixed (tel: → website link, all 7 WA crisis lines shown). /uat workflow created. 14/14 deploy-check confirmed healthy.

### Session Highlight (Feb 19 — Evening, Part 3)
Deploy-check run: 14/14 sites healthy. kamunity.org was 404 — root cause: missing `@netlify/plugin-nextjs` in netlify.toml + package.json. Fix pushed and confirmed working (200). Also corrected ECOSYSTEM.md tech stack (Next.js, not HTML/JS).

### Session Highlight (Feb 19 — Evening, Part 2)
KP-01 Safety Sprint complete (code built, awaiting deploy + manual test). G1: Full WA crisis protocol hardcoded into Kai system prompt (route.ts) — all 7 crisis lines + strict behavioral rules. G4: Honest disclaimers added to all 5 public sites (kamunity.org, kamunity.ai, sovereignty-audit, ai-readiness, vine-o-code) — all visible without scrolling. G3: Full test script created (PLAN/kp-01-safety-tests.md) — 9 scenarios ready to run manually. Vine-o-code source located: kamunity-engine/outcome-vine/

Three meetings next week:
1. ALIKE WA CEO — disability sector showcase
2. Activate Mental Health Board — interview for board appointment
3. International AI Speaker — potential collaboration + revenue

---

## What's Live

| System | Status | Notes |
|---|---|---|
| Kai (kamunity.org) | ✅ Live | @netlify/plugin-nextjs fix deployed Feb 19. 200 confirmed. /calculator + /copilot-check pages added Feb 20. |
| kamunity.ai | ✅ Live | Community rooms platform. |
| Sovereignty Audit | ✅ Live | Free self-assessment tool. |
| AI Readiness | ✅ Live | 12-question quiz + toolkit. |
| Vine-o-Code site | ✅ Live | Methodology site. |
| FactoryK Showcase | ✅ Live | "The Factory by the Fire" narrative. |
| Nonna's Knitting | ✅ Live | Proof of concept, community testing. |
| Grants Hub | ✅ Live | Grant reporting tool, community testing. |
| Wedding site | ✅ Live | Planning site, community rooms dogfood. |
| Kitchen Table | ✅ Live | kamunity-kitchen-table.netlify.app — password protected. v2: live data, Source editor, Today widgets. |
| Waymaker (Kai) | ✅ Live | AI ops assistant in Kitchen Table. Reads full BRAIN/PLAN markdown files as context. Deployed + local. |
| Waymaker Brief | 🔊 Live locally | Mon/Wed/Sat audio brief. STATE.md → Claude → ElevenLabs TTS. Plays in Kitchen Table. |
| Campfire Architecture | ✅ Complete | All 7 layers built. BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, WORKSHOP/, ARCHIVE/. |

---

## Safety Status (from Kitchen Table)

### CRITICAL — Must resolve before public showcase

| ID | Item | Status |
|---|---|---|
| S1 | Crisis protocol — WA resources hardcoded into Kai | ✅ Done — UAT passed Feb 19 |
| S2 | Prompt injection testing (3 scenarios) | ✅ Done — UAT passed Feb 19 |
| S3 | Professional indemnity insurance | ⚠️ Open |
| S4 | Scam tools via Vine-o-Code — trust mark design | ⚠️ Needs design |

### HIGH — Resolve this sprint

| ID | Item | Status |
|---|---|---|
| S5 | Honest disclaimers on ALL sites | ✅ Done — UAT passed Feb 19 |
| S6 | Data safety warning in Vine-o-Code outputs | ⚠️ Open |
| S7 | Incident response plan | ⚠️ Open |
| S8 | Cultural safety + Acknowledgment review | ⚠️ Open |
| S9 | Emotional dependency safeguards | ✅ Designed |

---

## Financial State

| Category | Status |
|---|---|
| Revenue | $0 — pre-revenue. First paid engagement target: March. |
| API costs | Not yet active. $50/month cap planned (Anthropic Claude API). |
| Insurance | Not yet obtained. Required before first paid engagement. |
| Grants | NLnet NGI Zero Commons — drafting. Deadline April 1, 2026. |
| Legal entity | Not yet incorporated. Gap g3 — Co-op? Social enterprise? Association? |
| Personal runway | Gap g7 — survival during pre-revenue ramp. |

### Revenue Pipeline

| Service | NFP Price | Standard Price | Duration |
|---|---|---|---|
| Digital Sovereignty Audit | $2,500–$4,000 | $5,000–$8,000 | Half day + report |
| AI Readiness Workshop | $1,500–$2,500 | $3,500–$5,000 | Half day |
| AI Strategy Session | $800–$1,200 | $1,800–$2,500 | 2 hours |
| Full Digital Needs Mapping | $3,000–$5,000 | $8,000–$15,000 | Multi-session |

Revenue target: $5-8K/month by April 2026.

### Grant Pipeline

| Grant | Deadline | Amount | Status |
|---|---|---|---|
| NLnet NGI Zero Commons | April 1, 2026 | €5–50K (asking €35K) | Drafting |
| Lotterywest Grassroots | Rolling mid-2026 | $5–50K AUD | Need auspicing partner |
| WA Dept Communities | Two rounds/yr | Up to $20K | Monitoring |
| Spacecubed Innovation Fund | Rolling | Various | Investigate |

---

## Active Relationships

### Meetings This/Next Week

| Ally | Type | Status | Outcome Goal |
|---|---|---|---|
| ALIKE WA CEO | Disability peak body | Meeting scheduled | Member org pipeline + workshop booking |
| Activate Mental Health | MH board opportunity | Interview scheduled | Board appointment + governance credibility |
| International AI Speaker | AI training + coder community | Meeting scheduled | Paid workshops + international network |

### To Contact (Priority)

| Ally | Why | Action |
|---|---|---|
| WACOSS | $3.9M Digital Inclusion Project, 1,500 workers | Email digitalinclusion@wacoss.org.au |
| Linkwest | 140+ neighbourhood centres | Introduce tools |
| Spacecubed | Innovation hub, workshops, scholarships | Explore hosting |

### International (To Contact)

| Ally | Why |
|---|---|
| Bonfire Networks | Federated platform, NLnet funded, philosophical sibling |
| Hypha Worker Co-op | Toronto, cooperative AI, technical collaboration |

---

## Build Phases (from Kitchen Table)

| Phase | Focus | Timeline | Status |
|---|---|---|---|
| **Phase 1** | Deepen Kai + Safety | Now — 2 weeks | 🔴 Active |
| **Phase 2** | Perth Directory | Weeks 3-6 | ⏳ Next |
| **Phase 3** | Community Rooms | Weeks 7-12 | ⏳ Next |
| **Phase 4** | Kai Goes Local | Months 4-6 | 🔮 Future |
| **Phase 5** | Sovereign Model | Months 6-12 | 🔮 Future |
| **Phase 6** | Beyond Perth | Year 2 | 🔮 Future |

---

## Campfire Architecture Status

| Layer | Status | Files |
|---|---|---|
| BRAIN/ | ✅ Complete | CONSTITUTION.md, ECOSYSTEM.md, STATE.md, SAFETY_GATES.md, WHO.md, kamunity-safety-threat-model.md |
| PLAN/ | ✅ Complete | PHASE_QUEUE.md, RHYTHM.md, DECISION_LOG.md, kamunity-master-roadmap.md, campfire-phase-plan.md |
| ENGINE/ | ✅ Complete | RUNNER.md (Vine-o-Code v2), TEMPLATES/ (3 templates) |
| KNOWLEDGE/ | ✅ Complete | THREE_SPEEDS.md, engine-v1/, engine-v1-full/ (complete RALF engine), 10+ research/scope docs |
| PROJECTS/ | ✅ Complete | All 5 codebases present: ai-readiness/, sovereignty-audit/, kamunity-org/, kamunity-ai/, wedding/. npm install done. |
| WORKSHOP/ | ✅ Complete | 17 engine prototypes (auto1/2/3), HeroGameTest, Kamunity-Prototype, KamunityCardGame |
| ARCHIVE/ | ✅ Complete | _HISTORY_INDEX.md, phase-0-audit-report.md, unified-recommendation.md, kitchen-table-v2.html, files.zip |

### Infrastructure
| System | Status |
|---|---|
| Version control | ✅ Git initialized. Kitchen Table on GitHub (kamunity-kitchen-table). Nerve centre tracked. |
| Windsurf workflows | ✅ 7 slash commands: new-session, session-end, uat, safety-review, weekly-rhythm, deploy-check, restart-server |
| Waymaker AI chat | ✅ Live in Kitchen Table (all 9 pages). Reads full BRAIN/PLAN markdown files. |
| Waymaker Brief | ✅ Mon/Wed/Sat audio brief pipeline. ElevenLabs TTS. Audio player on Today page. |
| Kitchen Table | ✅ Deployed to Netlify (kamunity-kitchen-table.netlify.app). Password protected. v2 live data. |
| Source Editor | ✅ Browser-based editor for BRAIN/PLAN files. Local: saves to disk. Netlify: read-only. |
| Meeting prep | ✅ PLAN/meeting-briefs.md — full briefs for ALIKE, Activate MH, AI Speaker. |
| AI Safety Checklist | ✅ tools/ai-safety-checklist.html — printable leave-behind. |
| Root directory | ✅ Cleaned. Only NERVE_CENTRE_MAP.md + WHATS_NEXT.md at root. |

---

## Known Blockers

| Blocker | Affects | Resolution Path |
|---|---|---|
| No crisis protocol in Kai | Cannot safely promote to ALIKE or public | Hardcode WA resources into system prompt |
| No insurance | Cannot do paid consulting | Get quotes, purchase before first engagement |
| No legal entity | Cannot receive NLnet funding directly | Research fiscal host or incorporation options |
| Single point of failure (Mike) | Everything | Documentation + community capacity building (long-term) |

---

## Key Dates

| Date | Event |
|---|---|
| Feb 24-28 | Three meetings (ALIKE, Activate MH, AI Speaker) |
| April 1 | NLnet submission deadline (12:00 CEST) |
| May 6-8 | Infoxchange Conference, Melbourne (submit proposal) |
| Nov 12-15 | Solidarity AI Conference, Bangkok (research CFP) |

---

## The Honest Numbers

- **Sites live:** 13 active (Kitchen Table now deployed) + 1 playground + 4 pending archive
- **PROJECTS/ codebases:** 5 (ai-readiness, sovereignty-audit, kamunity-org, kamunity-ai, wedding)
- **GitHub repos:** 8 (4 active incl. kamunity-kitchen-table, 1 playground, 3 archive)
- **Netlify projects:** 19 (target: reduce to ~14 after cleanup)
- **Nerve centre:** 1 consolidated folder, git-tracked
- **Tasks tracked:** 47 across 7 phases (t47 Waymaker conversation memory added Feb 20)
- **Safety items:** 13 (S1 ✅ S2 ✅ S5 ✅ done — 1 critical open: insurance)
- **Allies mapped:** 16 (3 meetings imminent, 3 to contact, rest mapped)
- **Kitchen Table:** v2 live data — Source editor, Waymaker reads full BRAIN/PLAN markdown, Today widgets, voice input, abilities modal, /shortcuts
- **Kai encounter cards (new):** /calculator (Sovereignty Calculator) + /copilot-check (Copilot Risk Check) live on kamunity.org
- **kamunity.org showcase:** 5 live tools (was 3 before this session)
- **Windsurf workflows:** 7 (incl. /restart-server added tonight)
- **Meeting prep:** PLAN/meeting-briefs.md written for all 3 meetings (Feb 24 week)
- **AI Safety Checklist:** tools/ai-safety-checklist.html — print-ready leave-behind
- **Revenue:** $0
- **Days to NLnet deadline:** ~41

---

---

## Next Session Should...

1. **Monday brief** — test the Week Opener brief on Monday Feb 23 (first real use)
2. **Meeting week (Feb 24)** — use meeting-briefs.md + print AI Safety Checklist before each meeting
3. **Demo flow** — open kamunity.org → Kai mode → type "We use Microsoft 365, Teams, Copilot" → confirm /calculator + /copilot-check cards surface. This is the ALIKE demo moment.
4. **Post-meeting** — update STATE.md + allies page within 24hrs of each meeting (use Source editor)
5. **Insurance** — get PI insurance quotes before first paid engagement (S3 still open — CRITICAL)
6. **NLnet draft** — April 1 deadline is ~40 days away. KNOWLEDGE/nlnet-application-draft.md needs finishing.
7. **server.py FILE_MAP** — add 5 ROADMAP.md entries (manual step — see kitchen-table/netlify/functions/markdown.mjs FILE_KEYS for format)
8. **Priya audio story** — 400-word script + ElevenLabs generation before ALIKE meeting (Opus handoff Part 3 Move 1)
9. **MIKE_FULLER_PROFILE.md is ready** — use it for NLnet bio section, ALIKE meeting prep, ally emails. Key pitch facts: RAC $500K in 9 months, WA Health Hackathon win, WALGA 3-engagement relationship, Captain America = the Kamunity archetype.

---

*Update this document weekly (Monday mornings) as part of RHYTHM.md cadence. Every number here should reflect reality, not aspiration.*
