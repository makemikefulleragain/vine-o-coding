# KAMUNITY DECISION LOG
## Decisions, Rationale & What They Affect
### Started: Feb 19, 2026

*Every significant decision gets logged here with rationale. Future sessions read this to understand why things are the way they are. No decision is too small if it affects the system.*

---

## Format

| Date | Decision | Rationale | Affects |
|---|---|---|---|

---

## Decisions

| Date | Decision | Rationale | Affects |
|---|---|---|---|
| 2026-02-18 | Kai IS the kamunity.org landing page (encounter interface) | The encounter IS the site. No separate landing page needed. | kamunity.org architecture |
| 2026-02-18 | Zero data collection in Phase 1 | The absence of tracking IS the value proposition for community orgs burned by surveillance tech. | All tools, API design |
| 2026-02-18 | Constitution uses "Founder's Draft" label | Community will rewrite via constitutional convention at 20+ org threshold. Honesty about current governance. | CONSTITUTION.md, public messaging |
| 2026-02-19 | Crisis protocol is pre-launch requirement | Non-negotiable safety. 3 critical gates block public showcase. Cannot demo to ALIKE without this. | KP-01, all public sites |
| 2026-02-19 | Professional indemnity insurance before first paid engagement | Risk mitigation for consulting. Legal exposure otherwise. | KP-03, revenue timeline |
| 2026-02-19 | Broaden sensing beyond tech sector | Community is more than tech. ALIKE (disability), Shelter WA (housing), YACWA (youth), WAAMH (mental health) etc. | Ecosystem state, ally network |
| 2026-02-19 | Two Kais: Wayfinder (public) + Waymaker (internal) | Same API, different system prompts, different document scope. Security boundary clear. Wayfinder never sees internal strategy. | API architecture, system prompts, BRAIN/ access control |
| 2026-02-19 | Kitchen Table = mission control with project zones | Central dashboard for Waymaker + Mike. Zones: Kamunity Build, WALGA, Wedding, Meetings. | Kitchen Table v4 design |
| 2026-02-19 | Transcript → Waymaker → structured data → routed to zones | Meeting transcripts processed by Claude API. Extracts: action items, decisions, contacts, dates. Human confirms before committing. | Kitchen Table v4, Waymaker system prompt |
| 2026-02-19 | Wedding lives in a Kamunity Room | Dogfooding community rooms (Phase 3 feature) with real use case. Family/guests collaborate on planning. | KP-09, wedding planning |
| 2026-02-19 | kamunitydemo.org kept as playground | Messy by design. Holds key build/feature/UX ideas. Not archived. | ECOSYSTEM.md, Netlify sites |
| 2026-02-19 | outcome-vine superseded by vine-o-coding | Archive candidate. vine-o-coding.netlify.app is the current version. | Netlify cleanup (KP-06) |
| 2026-02-19 | nonnas-knitting-circle + grants-hub = live (community testing) | Real people testing in the wild. Not experiments. Keep active. | ECOSYSTEM.md |
| 2026-02-19 | Campfire Architecture adopted (7 layers) | BRAIN/, PLAN/, ENGINE/, KNOWLEDGE/, PROJECTS/, WORKSHOP/, ARCHIVE/. Single OneDrive folder. All AI sessions read BRAIN/ first. | Everything |
| 2026-02-19 | WORKSHOP/ folder added to architecture | Mike needs a creative sandbox for experiments, prototypes, media, NotebookLM podcasts, OpenAI chat exports. Things graduate to PROJECTS/ when real. | Folder structure, KP-06 |
| 2026-02-19 | Archive everything, delete nothing | All history preserved in zip + provenance index. Old GitHub repos set to private (not deleted). Case study material. | KP-06, ARCHIVE/ |
| 2026-02-19 | Vibe Coded/ + HeroGameTest/ → WORKSHOP/ (not archive) | Active experiments that will become projects or remain as creative play. | KP-06, folder audit |
| 2026-02-19 | community-hub-app/ → ARCHIVE | Old experiment. Not connected to any live site. | KP-06 |
| 2026-02-19 | kamunity-org-rebuild (Netlify) → ARCHIVE | Old attempt, superseded by current kamunity.org. | KP-06, Netlify cleanup |
| 2026-02-19 | 4 auto-named Netlify sites renamed | adorable-dango → kamunity-greenfield-plan, subtle-starship → kamunity-system-map, starlit-unicorn → factoryk-needs-journey, candid-donut → kamunity-mycelium | KP-06, ECOSYSTEM.md |
| 2026-02-19 | Constitution upgraded to v2 (11 principles) | Added: Cultural Safety, Trust Mark Integrity, Ontological Honesty, Ecosystem Coherence. PAUSE.md added. Confidence scoring reweighted (Constitutional Alignment = 35/100). | BRAIN/CONSTITUTION.md |
| 2026-02-19 | Cascade is third role in the triad (not a Kai variant) | Waymaker tells Cascade what to build. Cascade builds. Mike approves. Different tool, different interface, different cost structure. | WHO.md, workflow design |
| 2026-02-19 | important teck/ is a security concern | API keys in a Word doc. Must not go in archive zip. Move to secure location. | KP-06, security |
| 2026-02-19 | WALGA project added to phase queue as KP-07 | Live client, going well, needs tracking alongside other projects. | PHASE_QUEUE.md |
| 2026-02-19 | OpenAI chat export noted as future task | Valuable conversations, artifacts, reports, budgets saved in OpenAI. Get out eventually. Not urgent. | PARKING LOT |
| 2026-02-19 | Waymaker Brief is private — Kitchen Table + local server only | Audio brief reads STATE.md (internal ops data). Never public. Never deployed to static Netlify. Needs server.py to run. | Kitchen Table deploy strategy, ElevenLabs pipeline |
| 2026-02-19 | Mon/Wed/Sat brief cadence (3x/week, not daily) | Daily would cost ~40,500 credits/month (40%). 3x/week = ~16,200/month (16%) — preserves 84k credits for Kai Wayfinder, podcasts, one-offs. Natural rhythm: opener/pulse/wrap. | ElevenLabs credit budget, brief pipeline |
| 2026-02-19 | Three brief types: Week Opener, Mid-Week Pulse, Week Wrap | Different prompts per day — Monday fires up the week, Wednesday checks course, Saturday reflects + resets. Each has tailored 6-part structure + Kai capabilities nudge. | server.py brief system prompts, brief.js UI |
| 2026-02-19 | Kitchen Table v2: live data via server.py /api/files + Netlify function | Local reads real BRAIN/PLAN files. Deployed reads bundled data/ snapshots. Write back (round-trip) local only — Netlify is read-only. Keeps deployment simple without write infrastructure. | server.py, markdown.mjs, waymaker.js |
| 2026-02-19 | No import.meta.url in Netlify functions — use process.cwd() | esbuild converts ESM→CJS; import.meta.url crashes at runtime (502). process.cwd() = /var/task in Lambda where included_files land. Lesson learned. | netlify/functions/markdown.mjs |
| 2026-02-19 | Meeting briefs stored in PLAN/ and synced to kitchen-table/data/ | Waymaker reads them as live context. Source editor exposes them for in-browser editing. Single source of truth in PLAN/. | PLAN/meeting-briefs.md, kitchen-table/data/ |
| 2026-02-19 | tools/ folder added for client-facing deliverables | Printable one-pagers, leave-behinds, templates — not internal docs, not code. Separate from BRAIN/ (strategy) and KNOWLEDGE/ (library). | Campfire Architecture, tools/ai-safety-checklist.html |
| 2026-02-20 | Waymaker crash fix: loadState() returns undefined — read arrays directly | loadState() mutates TASKS/SAFETY_ITEMS/GAPS in place; capturing return as `state` then accessing state.safety threw on every message send. Minimal fix: call without capturing return. Also fixed s.title → s.text (wrong property name). | kitchen-table/js/waymaker.js |
| 2026-02-20 | Ecosystem tab expanded: Prototypes + Recommended Ecosystem sections | 17 working WORKSHOP/ prototypes now visible in Kitchen Table. Principle 2 (Triage) made operationally visible — recommended external tools shown alongside what Kamunity builds. | kitchen-table/ecosystem.html, kitchen-table/js/data.js |
| 2026-02-20 | ROADMAP.md created for each PROJECTS/ folder | Per-site development queues — user feedback log, now/next/later queue, research questions, change log. Waymaker and Cascade can surface per-site roadmaps. Pre-populated from known context. | PROJECTS/*/ROADMAP.md |
| 2026-02-20 | Nonna's URL corrected: nonnas.netlify.app → nonnas-knitting-circle.netlify.app | data.js had wrong URL. ECOSYSTEM.md is source of truth. Also added Grants Hub URL (grants-hub.netlify.app) which was blank. | kitchen-table/js/data.js |
| 2026-02-20 | Waymaker honesty rules added to system prompt | Waymaker was claiming "I'll work on it" and suggesting it had taken background actions. Explicit HONESTY ABOUT CAPABILITIES section added — forbids claiming actions not actually taken. Constitutional Principle 10 (Ontological Honesty) made operational. | kitchen-table/js/waymaker.js |
| 2026-02-20 | Abilities modal + /shortcuts added to Waymaker | 8 slash commands (/status, /today, /tasks, /allies, /gaps, /draft, /spec, /safety) with discoverability modal. Shortcut shows original command in chat but sends expanded prompt to Claude — avoids confusing users with wall of text attributed to them. | kitchen-table/js/waymaker.js, kitchen-table/css/kitchen.css |
| 2026-02-20 | Sovereignty Calculator + Copilot Check: standalone pages built + card registry entries added | Tools built as standalone HTML in kitchen-table/ (sovereignty-calculator.html, copilot-check.html). Card registry entries added to kai-cards.ts. **NOT YET deployed as Next.js routes on kamunity.org** — /calculator and /copilot-check pages still need building. Next step: create src/app/calculator/ and src/app/copilot-check/ in kamunity-org. | kitchen-table/*.html, kai-cards.ts (registry only) |
| 2026-02-20 | t47 (Waymaker conversation memory) queued with full spec | Waymaker suggested it had implemented memory. It had not — localStorage chat history was already working (that's the foundation). t47 defines the real next step: a 💾 Save Session export button generating structured markdown. Phase B: inject past insights into system prompt. | kitchen-table/js/data.js, kitchen-table/data/task-specs/t47.md |
| 2026-02-20 | MIKE_FULLER_PROFILE.md established as verified internal source of truth for Mike's professional identity | Needed for NLnet bio, ALIKE meeting prep, ally emails, Kai context. LinkedIn (full experience + projects) + Tech'o'Space Ep 27 as primary verified sources. Living document — update as new data surfaces. | KNOWLEDGE/MIKE_FULLER_PROFILE.md |
| 2026-02-21 | kamunity-consulting built as standalone static site (not under kamunity.org or kamunity.ai) | Different audience (paying clients), different tone, Wix replacement urgency, clean separation of concerns, faster to ship as static HTML. Replaces Wix site. Phases 1–3 complete in one session. | ECOSYSTEM.md, PROJECTS/kamunity-consulting/ |
| 2026-02-21 | Kai FAB on kamunity-consulting is Phase 5 early entry — used claude-3-haiku-20240307 | claude-3-5-haiku-20241022 not available on current API tier (404). Classic Haiku available all tiers, same speed profile. Kai FAB gives consulting clients a taste of the ecosystem and drives kamunity.org discovery. Netlify Function proxy keeps API key server-side. | PROJECTS/kamunity-consulting/netlify/functions/kai.js |

| 2026-02-22 | Kamunity Reflection created as new project (PROJECTS/kamunity-reflection/) | opu46 conversation with Claude Opus produced deep philosophical framing: "community self-perception infrastructure" — not a calculator but a mirror. kamunity-mirror.html proof-of-concept validated in meeting context. Users: Priya, ALIKE WA, Activate MH, The Pack Music. Stack: React + Vite + Tailwind + Netlify Functions. Confidence 91/100. | PROJECTS/kamunity-reflection/, BRAIN/ECOSYSTEM.md, PLAN/PHASE_QUEUE.md |
| 2026-02-22 | Kamunity Reflection interface: Kai orb (ember→blue glow), split screen, floating text, parchment aesthetic — NOT the dark soil/mycelium of the prototype | Interface centred on Kai as glowing orb (not a chatbox). Parchment matches kamunity.org + kamunity-consulting design language. Value exchange (swaps/loops/chains) as early feature. RAG pipeline Phase 2. | PROJECTS/kamunity-reflection/DESIGN.md, site/ |
| 2026-02-23 | Fork architecture: Act 1 (identity, 4 mirror questions) → choice → Path A (relational) or Path B (practical) | Single prompt trying to do identity + relational depth + exchange matching simultaneously was too complex for Haiku. Three focused prompts, each with one job, dramatically reduces instruction complexity. Fork moment is a natural pause that respects different user intents. | kai.js (3 prompts), App.jsx (phase state + fork UI) |
| 2026-02-23 | Cards held silently during Act 1, released on fork transition ("Christmas morning") | Accumulating cards in side columns during identity questions distracted from the mirror work. Holding them and revealing all at once on fork transition creates a moment of discovery — the user didn't know it was Christmas. Backpack opens automatically. | App.jsx (heldCards state), BackpackPanel.jsx |
| 2026-02-23 | Model upgrade blocked — API key only allows claude-3-haiku-20240307 | claude-3-5-haiku-20241022 and claude-3-5-sonnet-20241022 both return 404. Current Anthropic API key is on free/basic tier. Upgrade requires credit card → Build tier. Cost: ~$0.004/conv (3.5 Haiku) or ~$0.02/conv (Sonnet). One-line swap in kai.js once upgraded. Documented as Phase 3 trigger. | kai.js, PHASE_QUEUE.md Phase 3 |
| 2026-02-23 | Phase 4 reframed as "The Peer Layer — Commons Making Itself Visible" | The opu46 conversation established the founding vision: scarcity is an information problem, not a resource problem. The POTS illustration is the wound that knows the shape of the solution — profit-motivated latent value extraction vs connection for the right reason. Phase 4 opens the peer layer (person-to-person) beyond the current org layer. Constitutional principles documented: consent as architecture, ACCO sovereignty, community governance of matching logic. | PHASE_QUEUE.md Phase 4, future prompt design |
| 2026-02-23 | Landing page added as UI state 0 — no direct-to-chat entry | Strangers landing on the site had no context before the conversation started. Landing page provides: pitch, what happens (01/02/03), transparency (AI disclaimer, data policy, crisis numbers), single CTA. Crumpets line sets tone. | LandingPage.jsx, App.jsx (uiState: landing/act1/act2) |
| 2026-02-24 | KP-03 Revenue Infrastructure Complete | Survival milestone reached. Kamunity Consulting generated $10k-$20k with $10k outstanding. Insurance (S3) active. The gap between architectural maturity and operational survival is bridged. | Financial state, STATE.md, PHASE_QUEUE.md |
| 2026-02-24 | Kitchen Table v3 Visual & Architecture Alignment | Kitchen Table must visually match the new external tools (Kamunity Reflection, Consulting). A plan is logged to align the styling (parchment, ember, sky) and improve the coordination capabilities based on the Frontier Report recommendations. | kitchen-table/css/, kitchen-table/index.html |
| 2026-02-24 | Strategic Phase Reordering (Option B → Option C) | With KP-03 (Revenue) complete, immediate funding pressure is off. Pivot to Ecosystem Polish (KP-04, KP-06) to ensure front door is flawless for ALIKE/Activate MH meetings, then Value Creation (KP-08, KP-09). WALGA/NLnet (Option A) down-prioritized. | PHASE_QUEUE.md |
| 2026-02-24 | API Key Upgraded: claude-3-5-sonnet-20241022 reinstated | Anthropic API key upgraded to Build tier. claude-3-haiku-20240307 instances across kamunity.org, kamunity-consulting, kamunity-reflection, and kitchen-table upgraded to Sonnet 3.5. This unlocks higher reasoning for the encounter interfaces. | All AI endpoints |
| 2026-02-24 | Agent Diplomacy recognised as a distinct strategic layer (KP-12) | Cloudflare "Markdown for Agents" (Feb 22, 2026) commoditises basic agent-readability. Kamunity's llm.txt approach validated but distinctiveness narrowing. The gap between agent-readable (consumption) and agent-relational (participation) is Kamunity's strategic territory. Requires own research, threat modelling, phased implementation. | KNOWLEDGE/RESEARCH/, BRAIN/threat-model, PLAN/PHASE_QUEUE.md |
| 2026-02-24 | Four agent postures adopted: Open Garden, Threshold, Mirror, Invitation | Each serves a different strategic purpose. Not mutually exclusive. Open Garden first (strengthen llm.txt), then Threshold (progressive disclosure), then Mirror and Invitation as agent participation matures. | All sites, llm.txt files, future MCP endpoints |
| 2026-02-24 | Mycelium "reflection-first" quality recognised as irreducible strategic advantage | An agent that reflects on Kamunity's seed content before a task is a fundamentally different agent. This is ontological programming through encounter design. Cannot be commoditised. Must be documented as replicable pattern. | Mycelium site, KNOWLEDGE/ |
| 2026-02-24 | Fail Safe / Fail Fun / Fail Useful adopted as safety trinity for agent interactions | Agent interactions must: never expose community data if they go wrong (safe), be interesting and playful (fun), generate learning from every interaction (useful). Constitutional: all learning is for the community to discuss. | BRAIN/safety-threat-model, all agent-facing features |
| 2026-02-24 | Threat Surface 6 (AI Agent Interactions) added to threat model | Six new threats: data extraction, agent impersonation, ontological pollution, metadata surveillance, corporate standard dependency, ontological manipulation via participation. | BRAIN/kamunity-safety-threat-model.md |
| 2026-02-24 | Spore Radar concept approved as first implementation step | Basic agent traffic detection via Netlify Edge Function. Data before strategy. Privacy-preserving, internal-only. | KP-12 Sprint 1 |
| 2026-02-24 | Content-signal headers + llm.txt = complementary layers, not alternatives | Corporate standards serve discoverability. Community standards (llm.txt) encode worldview. Both needed. Play both games. | All 13 sites |
| 2026-02-24 | API Model Name Correction (`claude-sonnet-4-5-20250929`) | The standard `claude-3-5-sonnet-20241022` model name returned a 404 in this specific 2026 environment. Updated all four API endpoints to use the confirmed valid string `claude-sonnet-4-5-20250929` to restore Kai functionality. | `kamunity.org`, `kamunity-consulting`, `kamunity-reflection`, `kitchen-table` |

---

## Monthly Reflections

*Added during monthly rhythm review.*

| Month | What Worked | What Didn't | Key Learning |
|---|---|---|---|
| Feb 2026 | Campfire Architecture session — full system designed in one sitting | — | Having all context in one place (Kitchen Table data + roadmap + threat model) made synthesis possible |

---

*Update this log whenever a decision is made. Read it when you need to understand "why is it like this?" The rationale column is the most important — it prevents future you from undoing past decisions without understanding them.*
