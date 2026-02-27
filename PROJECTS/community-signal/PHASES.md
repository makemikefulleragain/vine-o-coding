# COMMUNITY SIGNAL SYSTEM — PHASES

*Vine-o-Code v2 build queue. Each phase has a done condition. No phase starts until the previous phase's done condition is met. Each phase leaves the system in a better state than before.*

---

## Phase 0: SCAFFOLDING
**Duration:** 1 session
**What:** Create all project documents. No code.

### Done Condition
- [x] MISSION.md exists and is reviewed
- [x] PHASES.md exists (this document)
- [x] ROADMAP.md exists
- [x] CHANGELOG.md exists, starts at v4.0
- [x] prompts/signal-extraction.md exists and is reviewed
- [x] prompts/traceability-test.md exists and is reviewed
- [x] prompts/match-make.md exists and is reviewed
- [x] data/prosocial-tech-directory.json is seeded with known tools
- [x] SPEC.md (v4.0) is in place
- [x] Constitutional check: nothing in these documents conflicts with BRAIN/CONSTITUTION.md
- [x] Mike has reviewed and approved all documents

**Constitutional check:** Does anything here conflict with BRAIN/CONSTITUTION.md? Flag before proceeding.

---

## Phase 1: SENSE
**Duration:** Week 1-2
**What:** Layer 1 — Kai learns to read the weather.

### Build Order
1. `netlify/functions/signal-ingest.mjs` — email ingestion endpoint
2. RSS parser feeding same pipeline
3. `netlify/functions/signal-filter.mjs` — 3-stage weak tie filtering (uses prompts/signal-extraction.md)
4. Signal taxonomy v1 (seeded from ecosystem-state.json categories)
5. Kitchen Table "Sector Pulse" view — what's happening, what's changed, what's emerging
6. Supabase table: sector_signals (anonymous, timestamped, tagged)

### Done Condition
- [x] A forwarded sector newsletter email arrives at the endpoint and produces a structured signal
- [x] An RSS feed item from WACOSS or WALGA is parsed and produces a structured signal
- [x] A weak tie source is scored, and items below threshold are discarded with reason (1 discarded in e2e test)
- [x] Pulse view shows this week's signal summary in Kitchen Table
- [x] Mike can review and approve/reject signals in 10 minutes on a Monday morning
- [x] No personal data stored anywhere — sector-level only
- [x] Sources attributed on every signal
- [x] `llms.txt` exists at site root (Constitution Principle 11 — ecosystem coherence)

### Does NOT include
- Signal cards in Kai (that's Phase 2)
- Newsletter generation (that's Phase 2)
- Matching or making (that's Phase 3)

---

## Phase 1.5: PRODUCTION SOURCES
**Duration:** Week 2
**What:** Connect the sensing infrastructure to real WA community sector sources, build automated source discovery, and seed the Sector + Organisation Constellation graphs from ingested signals.

### Build Order

**1. RSS Source Registry** — `data/rss-sources.json`
- Schema: `{ id, name, url, website, sector_tags[], fetch_frequency, tier, priority, small_cohort_flag, status, notes }`
- **Tier 1 — Automated RSS (weekly fetch):**
  - WACOSS (WA Council of Social Service) — sector news, policy, cost of living reports
  - WALGA (WA Local Government Association) — local govt community services, budget submissions
  - Linkwest — neighbourhood centres, digital inclusion, grant opportunities
  - YACWA (Youth Affairs Council WA) — youth sector policy, awards, media releases
  - WAAMH (WA Association for Mental Health) — community mental health, NDIS, conferences
- **Tier 2 — Automated RSS (fortnightly fetch):**
  - ECCWA (Ethnic Communities Council WA) — multicultural services, settlement
  - Shelter WA — housing and homelessness policy
  - Carers WA — carer support, NDIS, aged care
  - Financial Counselling Network WA — financial inclusion, debt, hardship
- **Tier 3 — Manual email submission (weekly):**
  - City of Perth Public Notices — https://perth.wa.gov.au/public-notices
  - City of Bayswater Community News — https://www.bayswater.wa.gov.au/city-and-council/news
  - WA Government Announcements — https://www.wa.gov.au/government/announcements
  - WA Government Media Statements — https://www.wa.gov.au/government/media-statements
  - PerthNow Local News — curated community-relevant articles
  - Reddit r/perth — curated threads (community services, NFP, volunteering). RSS available at https://www.reddit.com/r/perth/.rss
  - LinkedIn WA community sector — curated posts from sector leaders (manual review only — no API)
  - Facebook sector peak body pages — curated announcements (manual review only — API restricted)
- **Tier 4 — Manual email submission (fortnightly):**
  - Lotterywest grant announcements — funded projects, new rounds
  - WA Dept of Communities grants — community sector funding rounds
  - Local council grant rounds — community development, placemaking
  - Community newspaper highlights — via Linkwest CRC network (40+ community papers)
- **Tier 5 — IDENTIFIED BUT DEFERRED (pending consultation):**
  - **Aboriginal & Torres Strait Islander sources:** CASWA, AHCWA, Coalition of Peaks WA members, Reconciliation WA
    - Status: `identified_pending_consultation`
    - Blocker: Requires Aboriginal consultation and cultural safety protocols before any activation
    - Flags: `small_cohort: true`, `requires_cultural_protocol: true`
  - **High-risk vulnerable group sources:** Centre for Women's Safety and Wellbeing (DV peak body WA), women's refuges, homelessness crisis services, refugee and asylum seeker services
    - Status: `identified_high_risk_defer`
    - Blocker: Requires specialist consultation and enhanced traceability protocols
    - Flags: `small_cohort: true`, `vulnerable_cohort: true`, `requires_specialist_review: true`
  - **No Tier 5 source may be activated without documented consultation outcomes and Mike's explicit approval.**

**2. RSS Scheduler Function** — `netlify/functions/rss-scheduler.mjs`
- Netlify scheduled function (daily cron at 6am AWST)
- Reads `rss-sources.json`, filters by `fetch_frequency` and `status: 'active'`
- Calls `signal-ingest?mode=rss` for each source due for fetch
- Handles rate limiting and retries (3 attempts with exponential backoff)
- Graceful degradation: if one source fails, others continue
- Updates source metadata with `last_fetch` timestamp and status
- Logs success/failure to Supabase `source_fetch_log` table

**3. Email Ingestion Pipeline**
- Dedicated email address: `signals@kamunity.org` (or subdomain)
- Email service integration (choose one at build time):
  - Option A: Mailgun Inbound Parse → webhook to `signal-ingest`
  - Option B: SendGrid Inbound Parse → webhook to `signal-ingest`
  - Option C: Zapier Email Parser → HTTP POST to `signal-ingest`
- Email parsing: extract sender domain → auto-detect source; strip signatures; forward to `signal-ingest` with `source_type: 'email'`
- Security: `INGEST_SECRET` in webhook OR sender whitelist. Rate limit: max 50 emails/day per sender domain.
- Manual email template for Tier 3/4 sources (subject: `[MANUAL] Source Name - Date`, body: Source / Date / URL / Item blocks)

**4. Source Discovery Engine** — `netlify/functions/source-discovery.mjs`
- Triggered: Weekly cron (Sunday 6am AWST) OR manual trigger from Kitchen Table
- **RSS Autodiscovery:** Parse HTML `<link rel="alternate" type="application/rss+xml">` tags from seed URLs and sector directory member websites
- **Sector Directory Crawling:** WACOSS member directory, WALGA 139 councils, Linkwest 140+ centres, YACWA members, WAAMH 200+ member services — extract org names and website URLs, run RSS autodiscovery
- **Related Organization Discovery:** Extract outbound `.org.au`, `.gov.au`, `.asn.au` links from approved sources, filter for WA-based orgs, run RSS autodiscovery
- **Scoring algorithm** (0–1):
  - Domain authority: `.gov.au` +0.3, `.org.au`/`.asn.au` +0.2
  - Discovery source: peak body member list +0.4, approved source link +0.3, grant recipient +0.2
  - WA-specific content mention +0.2, RSS feed quality (5+ recent items) +0.1
  - Small cohort detection: if sector has <20 orgs in WA, set `small_cohort_flag: true`
- Store candidates in Supabase `discovered_sources` table with status `pending_review`
- Safety guardrails: no auto-approval, max 50 sites crawled/week, robots.txt compliance, duplicate detection, auto-reject if RSS contains personal data

**5. Kitchen Table "Sources" View**
- Nav button: 📡 Sources (alongside Sector Pulse)
- **Active Sources tab:** Name | Type | Tier | Last Fetch | Status | Signal Count (7d) | Actions (Test Fetch, Edit, Pause/Resume, View Signals). Colour coded: green / yellow / red by failure count.
- **Discovered Sources tab:** Org Name | Website | RSS URL | Discovered Via | Relevance Score | Small Cohort Flag | Actions (Preview Feed, Approve, Reject, Flag). Batch approve/reject by score threshold.
- **Manual Checklist tab:** Weekly list of Tier 3/4 sources with last submission timestamps. Alert if >10 days since last submission. "Skip this week" toggle.
- **Add Source form:** Name, RSS URL, sector tags, fetch frequency, tier, small cohort flag, notes. Validation: test RSS URL before saving.

**6. Source Verification Protocol**
- Before scheduler activates any source: RSS valid and parseable, content is sector-level (no personal data), attribution clear, small cohort check applied, Mike approves in Kitchen Table
- Unapproved sources visible in Sources view but not fetched. Workflow: Add → Test fetch → Review sample signals → Approve.

**7. Monitoring and Alerting**
- Red alert badge in Kitchen Table if source fails 3+ consecutive times
- Dead source flag if failures continue 30+ consecutive days
- Signal volume alert if source produces 10x normal volume (possible spam/bot)

**8. Sector Constellation** — `sector_constellation` Supabase table
- Enhancement to `signal-filter.mjs`: after tagging a signal, extract all sector tag pairs and increment co-occurrence counts
- Schema: `{ tag_a, tag_b, co_occurrence_count, last_seen, strength }`
- Supabase RPC: `increment_tag_cooccurrence(tag_a, tag_b)`
- Kitchen Table 🌐 Constellation view — **Sector Map tab:**
  - Network graph of sector tag co-occurrences
  - Nodes sized by signal count, edges weighted by co-occurrence strength
  - Interactive: click node to filter Sector Pulse by that tag
  - Surfaces: emerging sector clusters, cross-sector themes, source gaps

**9. Organisation Constellation** — `org_constellation` Supabase table
- Enhancement to `signal-filter.mjs`: after tag extraction, use Claude NER to extract organisation mentions from signal content
- Match extracted org names against known source registry (`rss-sources.json`)
- For co-mentioned orgs, upsert edge in `org_constellation` table
- Schema: `{ org_a, org_b, relationship_type, signal_count, last_seen, context_summary }`
- Kitchen Table 🌐 Constellation view — **Organisation Network tab:**
  - Network graph of organisation co-mentions
  - Nodes = organisations sized by mention frequency
  - Edges weighted by co-mention count; click edge to see source signals
  - Surfaces: collaboration opportunities, sector bridges, isolated orgs
- Privacy note: Organisation Constellation tracks publicly visible organisations only — never individuals

### Done Condition
- [ ] `data/rss-sources.json` exists with at least 9 active WA sector sources (5 Tier 1, 4 Tier 2) and all Tier 5 sources documented with deferral status and consultation requirements
- [ ] RSS scheduler runs daily at 6am AWST and successfully fetches from all active sources
- [ ] Email forwarding configured and tested — test email appears in Sector Pulse within 5 minutes
- [ ] At least 3 Tier 3 manual sources submitted weekly for 2 consecutive weeks
- [ ] Kitchen Table Sources view live with Active Sources, Discovered Sources, and Manual Checklist tabs
- [ ] Source discovery engine runs weekly and surfaces at least 5 new candidate sources
- [ ] Mike has reviewed and approved/rejected at least 10 discovered sources
- [ ] At least 7 consecutive days of automated signal ingestion with no manual intervention required
- [ ] At least 20 signals accumulated in Sector Pulse from real automated sources
- [ ] Sector Constellation shows at least 20 tag co-occurrence relationships after 7 days of ingestion
- [ ] Organisation Constellation shows at least 10 org co-mention relationships
- [ ] Kitchen Table 🌐 Constellation view displays Sector Map and Organisation Network tabs
- [ ] Small cohort sectors correctly flagged in source metadata
- [ ] No unresolved source failures in the last 48 hours

### Does NOT include
- Signal cards in Kai (that's Phase 2)
- Newsletter generation (that's Phase 2)
- Matching or making (that's Phase 3)
- Person Constellation / bilateral need ↔ offer matching (that's Phase 4 — requires opt-in consent first)
- Web scraping for sources without RSS (manual submission only)
- Social media API automation (LinkedIn, Facebook, Twitter — manual review only)
- Aboriginal & Torres Strait Islander source activation (pending consultation — Tier 5)
- High-risk vulnerable group source activation (pending specialist review — Tier 5)

### Constitutional Checks
- **Principle 3 (Privacy):** No sources publishing personal data. Sector-level news and policy only. Individual case studies filtered by `signal-filter.mjs`.
- **Principle 7 (Traceability):** Small cohort sources flagged. Aggregation rules enforced. Organisation Constellation tracks public orgs only — never individuals.
- **Principle 11 (Ecosystem Coherence):** All active sources are WA community sector peak bodies, trusted sector news, or verified local government community services channels.

### Ethical Constraints
- Aboriginal & Torres Strait Islander sources identified (CASWA, AHCWA, Coalition of Peaks WA members) but deferred pending appropriate consultation with ACCO representatives and cultural safety protocols. Self-determination principle applies.
- High-risk vulnerable group sources identified (DV services, homelessness crisis, refugee services) but deferred pending specialist consultation. Re-identification risk, safety risk, and trauma-informed practice requirements must be addressed first.

---

## Phase 2: PROPAGATE
**Duration:** Week 2-3
**What:** Layer 2 — Signal moves in all directions.

### Build Order
1. Signal card v2 for Kai (bilateral: need + offer, smart trigger after 3+ exchanges)
2. Supabase tables: community_signals + community_offers (anonymous)
3. Kitchen Table "Signals" view (tag cloud, themes, emerging patterns)
4. Newsletter template — Kai-drafted, weekly cadence
5. Commons auto-draft pipeline (pattern → Substack draft + LinkedIn scaffold → human review queue)
6. Mob contribution interface (simple "add signal from field" in Kitchen Table)
7. Aggregation principle enforcement (traceability test from prompts/traceability-test.md)
8. Monthly commons report template (Waymaker-generated, human-reviewed)

### Done Condition
- [x] Kai can surface the bilateral signal card at the right moment (not a timer, depth-triggered)
- [x] A signal submitted via Kai is stored anonymously in Supabase
- [x] Kitchen Table shows emerging patterns from accumulated signals
- [x] A newsletter draft is auto-generated from this week's patterns — human reviews before send
- [x] The traceability test correctly blocks publication when cohort is too small
- [x] The traceability test correctly allows publication when pattern is safely anonymous
- [x] A Mob member can add a field signal through Kitchen Table
- [ ] Signals from sensitive/small-cohort sectors are automatically flagged for heightened scrutiny (larger cohort required, extra human review) — traceability test enforces this via sensitivity dimension elevation; dedicated cohort-size guard pending e2e confirmation
<!-- PLACEHOLDER: Specific handling rules for high-risk sector groups to be added after appropriate consultation. -->

### Does NOT include
- Matching signals to people (that's Phase 3)
- Sending DMs (that's Phase 4)
- Human handoff (that's Phase 5)

---

## Phase 3: MATCH + MAKE
**Duration:** Week 3-4
**What:** Layer 3 — Waymaker finds connections, Kai makes things.

### Build Order
1. Prosocial tech directory loaded (from data/prosocial-tech-directory.json)
2. Triage logic: check directory BEFORE any generation step
3. Waymaker match + make prompt (from prompts/match-make.md)
4. Kai generative mode: context-aware document generation mid-conversation
5. Commons library (Supabase: accumulated templates, searchable)
6. Constellation graph: bilateral need/offer matching across opted-in members
7. Auto-draft pipeline: pattern → thing → commons draft + social scaffold → human queue

### Done Condition
- [x] When a pattern matches an existing prosocial tool, triage returns "CONNECT" or "EXTEND" — not "MAKE"
- [x] When nothing exists, Kai generates a useful document (template, policy, framework) sized to the sector/org
- [x] The generated thing is good enough that a small NFP ops coordinator would actually use it — UAT PASSED Feb 26
- [x] Waymaker presents the full package: thing + context + proposed publication + match + triage reasoning
- [x] Mike can ship, refine, or skip in one decision
- [x] Commons library accumulates templates attributed to pattern, not person
- [ ] Constellation graph shows bilateral connections (need ↔ offer) — deferred to Phase 4+

### Does NOT include
- Sending anything to anyone outside the system (that's Phase 4)
- Human handoff (that's Phase 5)

---

## Phase 4: OFFER
**Duration:** Week 4-6
**What:** Layer 4 — The gift is the thing itself.

### Build Order
1. Opt-in card for Kai (single field, explicit consent)
2. Supabase: opted_in_contacts (consent timestamp, sector tags, nothing else)
3. DM generator (Waymaker prompt → email WITH thing attached)
4. Email send via Netlify + Resend/Postmark
5. Kitchen Table "Outreach" view (pending, sent, response tracking)
6. Unsubscribe mechanism (instant, no questions, all data deleted)
7. Feedback loop ("did this land?" → improves future generation)

### Done Condition
- [ ] A real person opts in after a positive Kai encounter
- [ ] When a match is found, a DM is drafted with the thing attached — not behind a link
- [ ] The DM includes transparent matching reason
- [ ] Mike reviews and approves the DM before send
- [ ] The DM contains nothing that traces back to the signal source
- [ ] Unsubscribe works in one click and deletes all stored data
- [ ] At least one person responds with "this is useful" (or tells us why it isn't)

### Does NOT include
- Human handoff routing (that's Phase 6)

---

## Phase 5: HITLOOP
**Duration:** Week 5-6
**What:** Layer 5 — Self-improving research engine. The system generates its own intelligence.

### Build Order
1. `research_strategy` + `research_runs` Supabase tables (migration)
2. `research-engine-background.mjs` — Background function: select topics → Claude research → ingest → grade → evolve
3. `hitloop-scheduler.mjs` — Daily cron wrapper (3am AWST) → calls research-engine-background via HTTP
4. `signal-ingest.mjs` — `[FIELD]` detection for Mob Field Reports → seeds `research_strategy`
5. Dual input paths: system-generated topics (from constellation patterns) + Mob Field Reports (human email)
6. Self-improvement loop: signal scores grade research quality → low performers retired → new topics seeded

### Done Condition
- [x] `research_strategy` and `research_runs` tables exist in Supabase
- [x] Research engine generates research via Claude Sonnet 4.5 and ingests into signal pipeline
- [x] At least 2 research runs complete with scored signals (confirmed: 7.94 avg score)
- [x] Background function returns 202 and processes asynchronously
- [x] Daily scheduler configured (hitloop-scheduler at 0 19 * * * UTC / 3am AWST)
- [ ] Mob Field Report email with `[FIELD]` prefix seeds research_strategy via Resend inbound
- [ ] Strategy evolution: low scorers retired after 5+ runs, constellation hot spots seed new topics
- [ ] At least 7 days of automated research with score improvement visible

### Does NOT include
- Real-time research (batch only, daily cron)
- Multi-model routing (Claude Sonnet 4.5 only for cost control)
- Human review of research before ingestion (fully automated pipeline)

### R&R Log
- **2026-02-27:** Netlify scheduled functions are cron-only, not HTTP-invocable. Split into scheduler + background function. See `phases/phase-5-hitloop/review-reflect.md`.

---

## Phase 6: HANDOFF
**Duration:** Month 2+
**What:** Layer 5 — The coffee only a human can pour.

### Build Order
1. Kitchen Table "Mob" availability widget (weekly Y/N + skills tags)
2. Handoff routing logic in Waymaker (match response to available human)
3. Response notification system (email → Kitchen Table alert)
4. Mob interface (Kitchen Table panel or lightweight protected page)
5. Tier 3 honest-delay template ("everyone's at capacity this week")
6. Tier 4 capacity alarm (chronic shortage flags strategic review)

### Done Condition
- [ ] When someone responds to a DM, the right human is notified
- [ ] If Mike is unavailable, a Mob member is matched by skills + sector
- [ ] If no one is available, the honest-delay response goes out (not silence)
- [ ] If Tier 3 triggers 3+ weeks running, Kitchen Table flags it as strategic problem
- [ ] At least one successful coffee happens — response → human connection → real help
- [ ] The person helped is invited (not pressured) to become someone who helps next

---

## Future Phases (not yet scoped)

### Phase 7: FEDERATION
Multiple Kamunity instances interoperating while maintaining community control. First-wave partners: ALIKE, The Pack, WACOSS/WALGA connections.

### Phase 8: SELF-IMPROVEMENT
The system uses its own signal data to improve its own methodology. Autocatalytic loop. Vine-o-Code building better Vine-o-Code.

### Phase 9: HANDOVER
The system is fully operated by the Mob. Mike is optional. Kamunity is community infrastructure, not a founder's project.
