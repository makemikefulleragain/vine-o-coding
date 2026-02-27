# KAMUNITY GLOBAL STATE
## What's Live, What's Building, What's Blocked
### Last Updated: Feb 27, 2026 (HitLoop Phase 5 built + confirmed — self-improving research engine live, 2 runs scored 7.94)

*This document is the pulse check. Any AI session reads this first to know: where are we right now?*

---

## Current Period: Pre-Launch Sprint

**Week of Feb 24-28, 2026** — Meeting prep, safety-critical items, ecosystem stabilisation.

### Session Highlight (Feb 27 — HitLoop Research Engine)
Community Signal **Phase 5 HITLOOP** built, deployed, and first research runs confirmed. Root cause R&R: Netlify scheduled functions are cron-only, not HTTP-invocable — split into `hitloop-scheduler.mjs` (cron wrapper) + `research-engine-background.mjs` (HTTP background function with 15-min timeout). First trigger: 3 initial research topics seeded (funding+governance, digital-tools+workforce, housing+health-wellbeing). Two runs confirmed successful in Supabase `research_runs` table (scores: 7.94 both). Daily cron fires at 3am AWST. Mob Field Report path (`[FIELD]` email prefix) deployed via `signal-ingest.mjs` — untested via real Resend inbound. Key architectural learning: always use the thin-scheduler → background-function pattern for long-running Netlify work. Memory saved. R&R doc at `phases/phase-5-hitloop/review-reflect.md`. PHASES.md updated with Phase 5 HITLOOP (Phases 5-8 renumbered).

### Session Highlight (Feb 27 — Strategic Architecture)
Community Signal System extended from 4-phase pipeline to **7-phase full-loop organism**. Phases 5 (BROADCAST), 6 (LISTEN), and 7 (RETURN) architected through dialectical session with Mike. Key insights: (1) LinkedIn is a sensing surface, not a publishing tool — comments are signals, consented and public, zero overhead for respondents. (2) Content Studio is the publishing arm of the same system — not a separate thing. (3) The gift is Phase 7: Return — unconditional, following the constitutional triage order (Find → Connect → Extend → Integrate → Make). (4) Late.dev API selected for LinkedIn scheduling — free tier (20 posts/month, 2 profiles) sufficient to start, $13/month Build tier if volume grows. (5) Rural WA explicitly added as design constraint from the start — country-first architecture, not city-export. (6) Phase transition framing: Perth community sector is below Kauffman’s edge of chaos threshold due to chronic underfunding and fragmentation — Community Signal System is the cooperative substrate that makes the leap possible. MISSION.md updated to reflect full loop. STATE.md updated. CHANGELOG entry added.

### Session Highlight (Feb 26 — Late Evening)
Community Signal **ALL 4 PHASES COMPLETE**. Phase 4 OFFER built and UAT-passed end-to-end: (1) Supabase tables `opted_in_contacts` + `outreach_queue` with RLS policies. (2) Opt-in card in Kai (`kamunity-consulting`) — R&R triggered after card wouldn't surface; root cause: client strips card JSON from history before sending back to server, so server's history-based checks always failed. Fixed with stateless message-count injection (5+ messages → inject opt-in once, append `[opt-in-shown]` marker, client strips for display but keeps in history). (3) `opt-in.mjs` Netlify function stores contact + consent. (4) `dm-send.mjs` generates personalised DMs via Claude, queues for Mike's review, sends via Resend. (5) Kitchen Table Outreach view: contacts list, Draft DM button (picks artifact from commons library), approve/send. (6) Unsubscribe mechanism. (7) Resend API key configured (sandbox mode — custom domain needed for production). **Full UAT loop passed**: opted in via Kai → contact in Supabase → drafted DM → approved → email delivered to inbox. Second R&R: `generate-thing-background.mjs` wasn't firing — root cause: sync proxy's `fetch()` wasn't awaited, Netlify killed context before trigger completed. Fixed: awaited fetch + broadened batch query filter. **Community Signal System is now live**: Signal → Pattern → Triage → Generate → Opt-in → Draft → Approve → Send.

### Session Highlight (Feb 25 — Morning)
KP-10 UAT bug-fix session. Two root-cause fixes deployed: (1) Task expand action buttons — `id="ta-${t.id}"` was inside a plain string (not template literal) so `getElementById('ta-t6')` always returned null and buttons never appeared; rewritten as proper string concatenation. (2) `grantAsk()` function was missing — Money view grant cards called it but it didn't exist; added with full Waymaker context prompt. Ask Waymaker now confirmed wired on every data point: Tasks, Safety, Gaps, Roadmap phases, Entity drawer, Allies, Grants (Money), Prototypes, Command Day sweep. Deployed to https://coruscating-naiad-c0ccb9.netlify.app. node --check passes (IDE TS lint errors are false positives — control.js treated as TSX). KP-10 UAT still required on Mike's phone before archiving old system.

### Session Highlight (Feb 24 — Evening)
KP-10 Kitchen Table Control Centre — R&R triggered after multiple bugs found in live control.html. Root cause: features assumed ported from old system were never actually there. 10 fixes applied: brief endpoint path, canonical data (48 tasks/16 allies/13 gaps), Waymaker FAB ported from waymaker.js, Allies view (tier grouping, action buttons), NLnet countdown + ally radar widgets, Sensory Sweep button, Prototypes view (16 items), ElevenLabs brief-audio.mjs Netlify Function + Listen button, all Ask Waymaker buttons (Tasks/Safety/Gaps) now call _wmSend() not clipboard, task click-to-expand detail. R&R doc written at kitchen-table/phases/kp-10/review-reflect.md. UAT still pending (live test on Mike's phone required before archiving old system). Process change: no new features until UAT passes on live URL.

### Session Highlight (Feb 24 — Afternoon)
Strategic phase reordering: with KP-03 (Revenue) achieved, Option B (Ecosystem Polish - KP-04, KP-06) and Option C (Value Creation - KP-08, KP-09) are prioritised over Option A (WALGA/NLnet). Anthropic API key upgraded to Build tier; `claude-sonnet-4-5-20250929` reinstated across all four ecosystem endpoints (`kamunity.org`, `kamunity-consulting`, `kamunity-reflection`, `kitchen-table`). Kitchen Table v3 visual overhaul deployed to match the new Parchment & Ember aesthetic of the public tools, including a new Revenue Pipeline widget and dynamic priority-based task filtering for the Today view. Perth Community Services Directory integrated into Kai (kamunity.org). KP-09 (Community Rooms) parked for a future session.

### Session Highlight (Feb 21 — Morning)
kamunity-consulting Phase 3 refinements + ecosystem stitch complete. Fixes: CSP violations (7 inline styles → CSS classes), Netlify Function ESM syntax fix (exports.handler → export const handler), model switched to claude-3-haiku-20240307 (3-5-haiku not on current API tier), Australian English instruction added to Kai system prompt, favicon (🔥 data URI) on all 4 pages. Ecosystem stitch: ecosystem-state.json v0.4.0, showcase.ts (7 items now includes consulting), kai-cards.ts (consulting card added), route.ts (Kai knows kamunityconsulting.com + surfaces card on consulting queries), llms-full.txt, site/llms.txt created. BRAIN/ECOSYSTEM.md (13 live sites), kitchen-table/js/data.js (consulting site added), kitchen-table/data/ECOSYSTEM.md synced, DECISION_LOG.md (2 new decisions). kamunity-org committed + pushed → Netlify CI/CD deploying. Phase 4 (free resource) on hold — real traffic needed. DNS cutover from Wix still pending.

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
| Kitchen Table | ✅ Live | https://coruscating-naiad-c0ccb9.netlify.app/control.html — control.html is ACTIVE system. Views: Command Day, Tasks, Roadmap, Allies, Matrix, Zones, Safety, Gaps, Money, Prototypes, Sector Pulse, Match+Make, Outreach. UAT bug-fix deployed Feb 25: task expand buttons + grantAsk. |
| Waymaker FAB | ✅ Live | 🔮 floating orb in control.html. 11 shortcuts. Conversation history. Calls /.netlify/functions/waymaker. |
| Waymaker Brief | ✅ Live on Netlify | Text brief + ElevenLabs audio via brief-audio.mjs. 🎙 Listen button on brief card. Works on mobile. |
| Community Signal System | ✅ Live | https://community-signal.netlify.app — Phase 5 HITLOOP live. Signal → Pattern → Triage → Generate → Opt-in → Draft → Approve → Send → **Research Loop**. Supabase backend, Claude Sonnet 4.5 research, Resend email. Daily cron 3am AWST. |
| Campfire Architecture | ✅ Complete | All 7 layers built. BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, WORKSHOP/, ARCHIVE/. |

---

## Safety Status (from Kitchen Table)

### CRITICAL — Must resolve before public showcase

| ID | Item | Status |
|---|---|---|
| S1 | Crisis protocol — WA resources hardcoded into Kai | ✅ Done — UAT passed Feb 19 |
| S2 | Prompt injection testing (3 scenarios) | ✅ Done — UAT passed Feb 19 |
| S3 | Professional indemnity insurance | ✅ Done |
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
| Revenue | $10,000–$20,000 received (Kamunity Consulting) + $10,000 outstanding invoice. First paid engagement achieved. |
| API costs | Not yet active. $50/month cap planned (Anthropic Claude API). |
| Insurance | Active (KP-03 completed). |
| Grants | NLnet NGI Zero Commons — drafting. Deadline April 1, 2026. |
| Legal entity | Incorporated/active (KP-03 completed). |
| Personal runway | Gap g7 mitigated by initial consulting revenue. |

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
- **Safety items:** 13 (S1 ✅ S2 ✅ S3 ✅ S5 ✅ done — 0 critical open)
- **Allies mapped:** 16 (3 meetings imminent, 3 to contact, rest mapped)
- **Kitchen Table:** v2 live data — Source editor, Waymaker reads full BRAIN/PLAN markdown, Today widgets, voice input, abilities modal, /shortcuts (Next: v3 visual overhaul to match new tools)
- **Kai encounter cards (new):** /calculator (Sovereignty Calculator) + /copilot-check (Copilot Risk Check) live on kamunity.org
- **kamunity.org showcase:** 5 live tools (was 3 before this session)
- **Windsurf workflows:** 7 (incl. /restart-server added tonight)
- **Meeting prep:** PLAN/meeting-briefs.md written for all 3 meetings (Feb 24 week)
- **AI Safety Checklist:** tools/ai-safety-checklist.html — print-ready leave-behind
- **Revenue:** $10k-$20k received + $10k outstanding invoice (Kamunity Consulting)
- **Days to NLnet deadline:** ~41

---

---

## Next Session Should...

1. **Community Signal Phase 5 HITLOOP — remaining items** — (a) Test `[FIELD]` Mob Field Report via real Resend inbound email to `signals@delisava.resend.app` with subject `[FIELD] <topic>`. Verify `research_strategy` row appears with `source_type: mob_field`, `priority_weight: 1.5`. (b) Monitor `research_runs` after daily cron (3am AWST) — check score evolution. (c) Phase 5 fully complete when 7 days of automated runs visible with score data.
2. **Community Signal Phase 6 — BROADCAST** (previously Phase 5) — Build Content Studio view in Kitchen Table. Three new Netlify Functions: `post-draft.mjs`, `post-schedule.mjs`. Late.dev API account setup (free tier). Connect to existing pattern pipeline. Four-column Draft/Polish/Scheduled/Published view.
2. **Community Signal Phase 6 — LISTEN** — Route LinkedIn comment ingestion back into `signal-ingest.mjs`. Late.dev inbox API or manual paste fallback to start.
3. **Community Signal Phase 7 — RETURN** — Gift triage layer in Kitchen Table. Research enrichment per strong signal. Gift recommendation engine using constitutional triage order. Connects to existing `dm-send.mjs` pipeline.
4. **LinkedIn post drafts** — Write first batch of posts across three types. Spicy sector truth-telling. Signal-derived insights. Personal Mike voice. Schedule via Content Studio once built.
5. **Community Signal — ready for real traffic** — (previously item 1, still valid) — All 4 phases live. Next: (a) Verify custom sending domain in Resend dashboard (kamunity.org or similar) to replace sandbox `onboarding@resend.dev`. (b) Start real Kai conversations on kamunity-consulting to accumulate signals. (c) Monitor Sector Pulse for pattern emergence. (d) When patterns hit threshold, run Triage + Generate. (e) When opted-in contacts exist, draft + send first real DM.
2. **Community Signal — production checklist** — (a) Supabase RLS policies tested with non-service-role key. (b) Rate limiting on opt-in endpoint (prevent spam). (c) GDPR-compliant data retention policy documented. (d) Unsubscribe flow tested end-to-end.
3. **UAT on mobile** — hard refresh https://coruscating-naiad-c0ccb9.netlify.app/control.html on Mike's phone: confirm task expand shows action buttons, Ask Waymaker opens orb on Tasks/Safety/Gaps/Grants/Roadmap/Entities.
4. **After UAT passes** — archive old index.html system (todo P3-1). Then KP-10 is COMPLETE.
5. **NLnet draft** — April 1 deadline is ~35 days away. KNOWLEDGE/nlnet-application-draft.md needs finishing. Community Signal is now a live demonstrable system to include in application.
6. **DNS cutover** — when ready: point kamunityconsulting.com from Wix to Netlify.
7. **MIKE_FULLER_PROFILE.md is ready** — use it for NLnet bio, ALIKE meeting prep. Key pitch facts: RAC $500K in 9 months, WA Health Hackathon win, WALGA 3-engagement relationship.

---

## Next Session Should…

- **DNS cutover** — when Mike is ready: point kamunityconsulting.com from Wix to Netlify (`kamunity-consulting-new`). After cutover: ask Cascade to update CSP `form-action` directive in `netlify.toml` from `https://kamunity-consulting-new.netlify.app` to `https://kamunityconsulting.com`.
- **kamunity.ai "built-by" card investigation** — read the `kamunity` repo (private, at `C:\Users\mikef\NeoKamunity\kamunity\`) to understand how the "Built by Kamunity" card system works. Check if consulting site can be registered.
- **KP-02 meeting prep** — ALIKE, Activate MH, AI Speaker briefs still pending (see PLAN/PHASE_QUEUE.md KP-02).
- **Mike photo for about.html** — when received, update `PROJECTS/kamunity-consulting/site/about.html` and redeploy via Netlify CLI.
- **KP-09 Community Rooms** — Begin work on the Supabase/Next.js implementation for the wedding room and community topic rooms.

---

*Update this document weekly (Monday mornings) as part of RHYTHM.md cadence. Every number here should reflect reality, not aspiration.*
