# COMMUNITY SIGNAL SYSTEM — CHANGELOG

## v5.0.0 — Feb 27, 2026 — Full Loop Architecture (planned)

**Source:** Strategic session with Mike — dialectical design session

### Architected (not yet built)

Three new phases extending the system from a 4-phase pipeline to a 7-phase full-loop organism:

**Phase 5: BROADCAST**
* `Content Studio` view in Kitchen Table — four-column pipeline (Draft / Polish / Scheduled / Published)
* Three post types: Personal/organic (Mike-written), Signal-generated (pattern-derived), Auto-generated (spicy/feedback-gathering/pop-culture)
* Full AI disclosure baked into generated post templates — constitutional, not optional
* `post-draft.mjs` Netlify Function — Claude generates post from signal/type prompt
* `post-schedule.mjs` Netlify Function — calls Late.dev API with content + UTC timestamp
* Late.dev API integration — free tier (20 posts/month, 2 profiles: Mike personal + Kamunity page); $13/month Build tier if volume grows
* Connects to existing: Community Signal pattern pipeline (signal-generated posts), Kitchen Table Outreach view pattern (approve/send)

**Phase 6: LISTEN**
* Comments on published LinkedIn posts flow back in as new signals via Late.dev inbox API (paid tier) or manual ingestion via existing `signal-ingest.mjs`
* Full loop closes: Broadcast → comment → signal → pattern → generate → broadcast
* Comment triage: Claude scores for signal strength, sector relevance, capacity indicators, openness, research hooks
* Strong signals surface in Kitchen Table triage dashboard with commenter context

**Phase 7: RETURN (The Gift)**
* Research engine runs on strong signals — public profile, org website, sector presence
* Gift recommendation follows constitutional triage order: Find → Connect → Extend → Integrate → Make
* Gift inventory drawn from full Kamunity capability spectrum (see MISSION.md Gift Inventory table)
* Kitchen Table triage dashboard: person, org, signal score, key quote, research summary, recommended gift, one-click draft response
* Gift delivery via existing DM/email pipeline (dm-send.mjs + Resend)
* Unconditional. No ask attached. No funnel.

### Additional architectural decisions
* Rural WA added as explicit design constraint from the start — country-first, not city-export. If it works with intermittent connectivity and tiny orgs, it works everywhere. Doug's work as the rural pathway.
* LinkedIn sensing layer formalised as primary weak-tie surface — comments are consented, public, zero-overhead signals
* Phase transition framing: Perth community sector needs legibility to self-organise. CSS is the cooperative substrate that makes the leap possible.

### Constitutional checks (pre-build)
* Principle 1 (Sovereignty): Gift is not a funnel. Unconditional return is structurally enforced — no ask, no tracking of gift recipients for conversion.
* Principle 2 (Triage): Gift recommendation engine follows Find → Connect → Extend → Integrate → Make. Build is always last resort.
* Principle 6 (Transparency): All AI-generated posts labelled. All gifts disclosed as gifts.
* Principle 10 (Ontological Honesty): System says what it is in public. AI disclosure is differentiating, not embarrassing.

---

## v4.5.0 — Phase 1.5 PRODUCTION SOURCES (planned)

**Source:** Cascade — Phase 1.5 (PRODUCTION SOURCES) spec

### Planned

* `data/rss-sources.json` — 4-tier source registry (Tier 1-4 active, Tier 5 deferred pending consultation): WACOSS, WALGA, Linkwest, YACWA, WAAMH + ECCWA, Shelter WA, Carers WA, Financial Counselling Network + Tier 3/4 manual sources. Aboriginal/Islander and high-risk vulnerable sources documented with consultation requirements but NOT activated.
* `netlify/functions/rss-scheduler.mjs` — daily cron (6am AWST), reads `rss-sources.json`, fetches all active sources, retries with backoff, logs to `source_fetch_log` Supabase table
* Email ingestion pipeline — `signals@kamunity.org` inbound email → email service (Mailgun/SendGrid/Zapier) → `signal-ingest` webhook
* `netlify/functions/source-discovery.mjs` — weekly cron (Sunday 6am AWST), RSS autodiscovery, sector directory crawling (WALGA 139 councils, Linkwest 140+ centres, WACOSS/YACWA/WAAMH member lists), org link extraction, relevance scoring (0–1), stores candidates in `discovered_sources` Supabase table for human review
* Kitchen Table `📡 Sources` view — Active Sources tab, Discovered Sources tab (approve/reject candidates), Manual Checklist tab (Tier 3/4 weekly workflow)
* `sector_constellation` Supabase table + enhancement to `signal-filter.mjs` — extract tag pairs from each signal, increment co-occurrence counts via `increment_tag_cooccurrence` RPC
* `org_constellation` Supabase table + enhancement to `signal-filter.mjs` — Claude NER extracts organisation mentions, upserts co-mention edges (public orgs only, never individuals)
* Kitchen Table `🌐 Constellation` view — Sector Map tab (tag network, click-to-filter) + Organisation Network tab (org co-mention graph, click edge to see source signals)
* New Supabase migration: `source_fetch_log`, `discovered_sources`, `sector_constellation`, `org_constellation` tables

### Constitutional checks passed (pre-build)
* Principle 3 (Privacy): no personal data sources; individual case studies filtered by `signal-filter.mjs`
* Principle 7 (Traceability): small cohort flag on all applicable sources; org constellation tracks public orgs only
* Principle 11 (Ecosystem Coherence): all active sources are WA sector peak bodies, trusted news, or verified local govt channels

---

## v4.2.0 — Phase 2 PROPAGATE build — ✅ UAT PASSED

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

### UAT Passed

* Signal via Kai → stored in `community_signals` ✅
* ⚡ Detect patterns → pattern created with traceability verdict ✅
* ✍ Draft → newsletter/LinkedIn copy generated in queue ✅
* Field signal via Kitchen Table Mob form → stored anonymously ✅
* Traceability FAIL correctly blocks small-cohort pattern ✅

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
