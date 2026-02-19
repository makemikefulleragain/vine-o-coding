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

---

## Monthly Reflections

*Added during monthly rhythm review.*

| Month | What Worked | What Didn't | Key Learning |
|---|---|---|---|
| Feb 2026 | Campfire Architecture session — full system designed in one sitting | — | Having all context in one place (Kitchen Table data + roadmap + threat model) made synthesis possible |

---

*Update this log whenever a decision is made. Read it when you need to understand "why is it like this?" The rationale column is the most important — it prevents future you from undoing past decisions without understanding them.*
