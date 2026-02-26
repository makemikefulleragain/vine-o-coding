# COMMUNITY SIGNAL SYSTEM — CHANGELOG

## v4.2.0 — Phase 2 PROPAGATE build

**Source:** Cascade — Phase 2 (PROPAGATE) build

### Added

* `netlify/functions/signal-store.mjs` — anonymous bilateral signal/offer storage endpoint; accepts `type: signal|offer`, `sector_tags`, `org_size`, `region`, `source: kai|mob-field|manual`; `INGEST_SECRET` auth; no personal data accepted
* `netlify/functions/pattern-detect.mjs` — Claude-powered aggregation: groups `community_signals` into patterns, runs full traceability test (from `prompts/traceability-test.md`) per pattern, writes to `patterns` table, matches `community_offers` to patterns by tag overlap; GET `?mode=patterns` returns list for Kitchen Table
* `netlify/functions/newsletter-draft.mjs` — Kai-drafted newsletter/Substack/LinkedIn content from PASS patterns; GET `?mode=queue` returns human review queue; POST `?mode=approve` approves or skips a draft — **nothing published without human review**
* `supabase/migrations/20260226160000_create_phase2_tables.sql` — three new tables with RLS (service role only): `community_signals`, `community_offers`, `patterns`
* Kitchen Table `🧬 Patterns` nav + view panel — shows detected patterns with traceability verdict, signal count, tags, draft actions
* Kitchen Table `⚡ Detect patterns` button — triggers `pattern-detect` pass on demand
* Kitchen Table `✍ Draft` button — triggers `newsletter-draft` generation for PASS patterns
* Kitchen Table `Newsletter queue` tab — shows Kai-drafted newsletter/LinkedIn copy with Approve/Skip/Copy actions
* Kitchen Table Mob field signal form — collapsible `➕ Add field signal` form with need/offer type, taxonomy tag dropdown, org size selector; submits to `signal-store`
* Kai signal card v2 (`kamunity-consulting`) — bilateral form card injected into Kai chat at conversation depth (after specific challenge described); need/offer tabs, taxonomy tag + org size dropdowns, submits anonymously to `signal-store`; CSS added to `style.css`

### Deployed

* `community-signal.netlify.app` — 3 new functions: `signal-store`, `pattern-detect`, `newsletter-draft`
* `coruscating-naiad-c0ccb9.netlify.app` — Kitchen Table with Patterns view + Mob form
* `kamunity-consulting-new.netlify.app` — Kai with bilateral signal card + CSS
* Supabase migration pushed: `community_signals`, `community_offers`, `patterns` tables live

### Pending (e2e test required)

* Submit a signal via Kai → verify it appears in `community_signals` Supabase table
* Run ⚡ Detect patterns in Kitchen Table → verify pattern created with traceability verdict
* Trigger ✍ Draft → verify newsletter/LinkedIn copy generated in queue
* Submit field signal via Kitchen Table Mob form → verify stored anonymously
* Confirm traceability FAIL correctly blocks small-cohort pattern from proceeding to draft

---

## v4.1.0 — Feb 26, 2026

**Source:** Cascade — Phase 1 (SENSE) build

### Added

* `netlify/functions/signal-ingest.mjs` — email + manual ingestion endpoint with `INGEST_SECRET` auth
* `netlify/functions/signal-filter.mjs` — 3-stage weak tie filtering pipeline (Claude scoring → tag matching → Supabase write)
* `netlify/functions/signals-read.mjs` — read + review endpoint for Kitchen Table (mode: pulse / review / all)
* `data/signal-taxonomy.json` — seeded tag taxonomy for WA community sector (funding, governance, digital, housing, workforce, advocacy, climate, health, children, disability, homelessness)
* `public/llms.txt` — ecosystem coherence file (Constitution Principle 11)
* `supabase/migrations/20260226070504_create_sector_signals.sql` — `sector_signals` table with RLS-ready schema
* `package.json` — `@anthropic-ai/sdk`, `@supabase/supabase-js`, `rss-parser` dependencies
* `netlify.toml` — functions + publish config, esbuild bundler
* Kitchen Table `📡 Sector Pulse` view — signal cards with Approve/Reject/Ask Waymaker actions

### Deployed

* Community Signal site live: **https://community-signal.netlify.app**
* Kitchen Table updated with Sector Pulse nav button and view panel
* Supabase project linked: `tyyrcythlhazrchybzuq`

### Fixed

* `signal-filter.mjs` — replaced `fs/promises` file-based taxonomy load with inline `TAXONOMY_TAGS` array (Netlify `process.cwd()` path was unreliable, causing 502s)
* `signal-ingest.mjs` — changed `forwardToFilter` from fire-and-forget to synchronous await with error propagation (Netlify function-to-function HTTP calls are unreliable async)

### Verified (Feb 26, 2026 e2e test)

* Manual POST to `signal-ingest` → Claude scored 2 signals (high confidence, avg 7.7), discarded 1 below threshold
* Both signals stored in Supabase `sector_signals` table with tags: `funding`, `emergency-relief`, `advocacy`
* Sector Pulse view in Kitchen Table displayed "2 signals — this week" with correct scores, tags, attribution
* Approve/Reject/Ask WM actions rendered correctly on each card
* New tag proposed: `demand-forecasting` (flagged for human review)

### Pending (human actions)

* Supabase migration push (`supabase db push`) — requires DB password (if not already run)
* RSS feed test: WACOSS or WALGA feed → structured signal (Phase 1 final done condition)

---

## v4.0.1 — Feb 26, 2026

**Source:** Cascade — Phase 0 verification and fixes

### Fixed

* Directory structure corrected — `prompts/` and `data/` subdirectories created; `signal-extraction.md`, `traceability-test.md`, `match-make.md` moved to `prompts/`; `prosocial-tech-directory.json` moved to `data/`
* High-risk sector references (ACCO, DV) removed from prompts and spec pending appropriate consultation — replaced with generic "high-risk/small-cohort sector" language and `<!-- PLACEHOLDER -->` comments throughout
* `llms.txt` added to Phase 1 done conditions (Constitution Principle 11)
* Kamunity Grants Hub added as seed entry to `data/prosocial-tech-directory.json` (highest `wa_sector_fit: 9` — most likely FIND result for grant acquittal patterns)
* Phase 0 done conditions ticked off following Cascade verification review

### Constitutional check result

* All 11 Constitution principles assessed — PASS except cultural safety (Principle 8) which is now correctly gated behind a PLACEHOLDER requiring consultation before any high-risk sector guidance is added
* Consistency check: PHASES.md ↔ SPEC.md ↔ prompts field names — all aligned

---

## v4.0 — Feb 26, 2026

**Source:** Opus encounter (N++ session)

### Changed from v3.0

* Aggregation threshold replaced with constitutional principle (traceability test) — fixed number of 5 was arbitrary and unsafe for small cohorts
* Weak tie sensing given real implementation architecture — 3-stage filtering pipeline with scoring, tagging, decay
* Layer 5 (Handoff) given 4-tier graceful degradation — honest failure over silent failure
* Triage implementation made concrete — prosocial tech directory with automated check before generation
* Prose cut ~30% — same ideas, fewer words
* Propagation map shows branching flow
* Prompts directory created — extraction, traceability, match-make prompts are explicit artifacts
* Vine-o-Code document scaffolding created — MISSION, PHASES, ROADMAP, CHANGELOG, prompts, data seed

### Added

* prompts/signal-extraction.md — weak tie filtering prompt
* prompts/traceability-test.md — aggregation principle enforcement
* prompts/match-make.md — generation + triage prompt
* data/prosocial-tech-directory.json — seeded prosocial tech lookup
* MISSION.md — project purpose and done condition
* PHASES.md — build queue with done conditions per phase
* ROADMAP.md — timeline and dependencies
* WINDY-PROMPT.md — phased build instructions for Windsurf

## v3.0 — Feb 26, 2026

**Source:** Mike (manual spec)

* Commons becomes generative and self-publishing
* Layer 3 Input A reframed — the pattern IS the brief
* Input B adds triage principle and bridging
* Privacy architecture made constitutional — no traceability, aggregation threshold enforced
* Five-layer architecture established: SENSE → PROPAGATE → MATCH+MAKE → OFFER → HANDOFF
