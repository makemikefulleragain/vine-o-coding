# COMMUNITY SIGNAL SYSTEM
## Vine-o-Code Spec · v4.0 · Feb 26, 2026
### "The Mycelium Made Operational"

*What Kai knows is only as good as what Kai can hear.*

*v4.0: Aggregation threshold becomes constitutional principle, not fixed number. Weak tie sensing gets real implementation architecture. Layer 5 gets graceful degradation. The whole thing gets tighter. Prose cut by ~30%. Nothing lost.*

---

## What This Is

Five layers running underneath Kai: sensing, pattern-finding, matchmaking, making, and handing off. When a community worker arrives, Kai already has something worth saying. When a pattern emerges, the system drafts the response. When a match is found, the useful thing is already inside the offer.

**Not extractive analytics. Not engagement optimisation. Not surveillance dressed as care.**

Every match is reviewed by a human before it's sent. Every publication is reviewed before it goes out. The system prepares. People decide.

---

## The Five Layers

```
SENSE → PROPAGATE → MATCH+MAKE → OFFER → HANDOFF
```

Each layer is independently deployable. Each leaves the system in a better state than before. No layer breaks what's below it. Each layer runs without the ones above it — graceful degradation is structural, not aspirational.

---

## Layer 1: SENSE
### "Kai learns to read the weather"

Pulls real-time signal from the sector across two spectrums. Strong ties tell you what you already know. Weak ties are where unexpected value lives — Granovetter's insight applied to community sensing.

### Strong Ties (sense these first)

Sector newsletters (WACOSS, WALGA, Infoxchange), WA Government tender/funding announcements, community sector job boards (what roles are hired signals what's valued), ALIKE/Linkwest/Shelter WA/YACWA member communications, RSS feeds from all the above.

**Implementation:** Email forwarding to signal endpoint + RSS parser. Straightforward plumbing. One afternoon to set up, ongoing signal forever.

### Weak Ties (where the real signal hides)

| Source | What It Tells You | Signal Extraction |
|---|---|---|
| Local gov meeting minutes | Problems councils name that community orgs feel downstream | Keyword extraction: "community", "service gap", "capacity", "digital" + context window |
| Fediverse/Mastodon | Prosocial tech practitioners live here | Follow `#civictech`, `#commonstech`, `#digitalrights` + instance-level feeds from social.coop, etc |
| GitHub | What's being built in open civic tech globally | Track repos: CiviCRM, Decidim, Loomio, Bonfire — watch Issues and Releases, not just stars |
| Academic preprints | Community sector research before it becomes policy | Curtin, UWA, Murdoch — filtered by community/nonprofit/governance keywords |
| Practitioner forums | What people actually ask each other | Decidim Meta, CiviCRM community, Loomio community — rate-limited, robots.txt respected |
| International siblings | Solved elsewhere, arriving here soon | Bonfire Networks, Hypha, Platform Cooperativism Consortium — changelog + blog RSS |
| Conference proceedings | Emerging themes before they crystallise | Infoxchange Connect, Solidarity AI, ACOSS |

**The weak ties extend the constellation before anyone has to meet anyone.**

### Weak Tie Filtering (the hard part v3 skipped)

Raw weak tie signal is 95% noise. The extraction pipeline needs three stages:

**Stage 1 — Relevance scoring.** Claude extraction prompt scores each item 0-10 on: (a) relevance to WA community sector, (b) actionability within 12 months, (c) novelty vs what's already in ecosystem-state.json. Threshold: 6+ passes to Stage 2.

**Stage 2 — Pattern tagging.** Items tagged against existing taxonomy: governance, data-sovereignty, volunteer-management, funding, digital-inclusion, cultural-safety, etc. New tags proposed when 3+ items don't fit existing categories. Tags confirmed by Mike in weekly review.

**Stage 3 — Decay and freshness.** Signals older than 90 days get halved weighting. Signals confirmed by multiple independent sources get boosted. A GitHub repo with 3 stars and no activity in 6 months doesn't surface the same as one with active issues and community discussion.

**The extraction prompt (core logic):**
```
You are reading [source_type] content for signals relevant to 
Western Australian community sector organisations. 

Score 0-10 on:
- WA community sector relevance (not general tech news)
- Actionability within 12 months (not theoretical)  
- Novelty (not already captured in current ecosystem state)

If score >= 6, extract:
- Signal summary (one sentence)
- Suggested tags (from taxonomy, or propose new)
- Confidence (how sure are you this matters?)
- Source attribution

If score < 6, discard with one-line reason.
```

### The Human Action

**Once:** Mike subscribes to 8-10 sector newsletters, sets up email forwarding to signal endpoint. One afternoon.

**Weekly:** Waymaker presents "Sector Pulse" in Kitchen Table. Mike reviews, approves updates to ecosystem-state.json. 10 minutes Monday morning. This includes reviewing any new taxonomy tags proposed by weak tie filtering.

### What Gets Built

- Netlify function: `signal-ingest.mjs` — email + RSS + weak tie ingestion
- Tavily/Brave API integration in Waymaker (Kitchen Table "Pulse" view)
- RSS parser feeding same pipeline
- Weak tie scrapers: GitHub API (releases/issues), Mastodon API (hashtag feeds), academic RSS
- Three-stage filtering pipeline with Claude extraction
- Kitchen Table "Sector Pulse" view: what's happening, what's changed, what's emerging
- Signal taxonomy: initial set + mechanism for growth

### Constitutional Compliance

- ✅ No personal data — sector-level signal only
- ✅ Mike reviews before any state update commits
- ✅ Sources cited — Kai attributes everything
- ✅ Scraping is respectful — rate-limited, robots.txt honoured, not extraction
- ✅ Weak tie filtering is transparent — scoring logic is readable, not black box

**Confidence: 93/100 — Build it**

---

## Layer 2: PROPAGATE
### "The Mycelium — signal moves in all directions"

Five mechanisms running in parallel at different speeds. Commons by accumulation, not competition.

### Mechanism A — Inbound: Kai listens

After 3+ meaningful exchanges where the need is real but the match isn't yet obvious, Kai surfaces the signal card. Two questions, same card, both optional:

1. *"What's the thing your community is trying to do that feels impossible right now?"*
2. *"What do you have that other community orgs might need?"*

Need AND offer. Bilateral from the start. The trigger is genuine exchange depth + unresolved need — not a timer, not an interruption.

### Mechanism B — Outbound: The Mob carries the question

Every Mob member is a spore — in board meetings, sector conferences, community events, casual coffees. The question travels as genuine curiosity, not a survey. The answer feeds back into Kitchen Table. Signal accumulates from the field.

### Mechanism C — Content travels without anyone

Weekly newsletter — the Import AI for Perth's community sector. Kai drafts, human edits, Mike (or Mob member) publishes.

**Channels:** Substack (long game, searchable, shareable), LinkedIn (where Priya actually is — targeted posts for NFP ops coordinators in WA, one or two paid posts worth testing), speaking engagements (Infoxchange May, Spacecubed, WACOSS Digital Inclusion), crowdfunding (Pozible — not "fund our platform" but "help us build community AI tools every NFP in WA can use free").

### Mechanism D — AI instances carry it

The mycelium protocol. Every session reads from and writes to the same commons. Different instances, different speeds, same network. The BRAIN/ folder, handoff documents, ecosystem-state.json — these are the mycelium threads.

### Mechanism E — The accumulated commons mirrors and speaks

When 150 orgs ask about AI policy, the pattern IS the signal. The commons is generative and self-publishing:

Pattern emerges → Kai makes the thing → commons draft scaffolded → Substack + LinkedIn ready → human review queue → publish.

The system doesn't wait for Mike to decide to write. It drafts. Humans publish.

Monthly public signal report: *"This month Perth's community sector asked Kai about X, Y, Z most. Here's what we learned. Here's what we built."* Transparent. Proof the system listens.

### Privacy Architecture (Non-Negotiable)

The signal that generated the thing cannot travel with the thing.

**The Aggregation Principle (replaces fixed threshold):**

v3 said "5+ signals before publication." That number was vibes. The actual constitutional principle is:

> *Nothing is published until the pattern cannot be traced back to any individual signal source, even by inference.*

In practice this means:

- **High-specificity signals** (niche sector, small cohort, unusual need): may require 8-10+ independent signals before the pattern is safely anonymous. A specialised service in a sector with 12 organisations is identifiable at 5.

  <!-- PLACEHOLDER: Specific thresholds and examples for high-risk sector groups to be added after appropriate consultation. -->
- **Low-specificity signals** (common need, large cohort, generic topic): 3-4 independent signals may be sufficient. "Small NFPs need help with grant acquittals" is not traceable to anyone.
- **The test:** Could a knowledgeable sector insider, seeing the published output, plausibly identify which organisation(s) triggered it? If yes → not enough signals. If no → publish.

**Waymaker applies the test automatically.** Mike reviews edge cases. The principle is constitutional. The implementation is contextual.

**Full anonymisation before publication:** All sector tags, timing signals, and contextual details stripped or generalised before any commons artifact is created.

### What Gets Built

- Signal card v2: bilateral (need + offer), smart trigger
- Supabase: `community_signals` + `community_offers` tables (anonymous)
- Kitchen Table "Signals" view: tag cloud, themes, emerging patterns
- Newsletter template: Kai-drafted format, weekly cadence
- Commons auto-draft pipeline: pattern detected → Substack draft + LinkedIn scaffold → human review queue
- Mob contribution interface: simple "add signal from the field" in Kitchen Table
- Monthly commons report: Waymaker-generated, human-reviewed, publicly published
- Aggregation principle enforcement: traceability test built into pipeline, contextual not fixed
- Anonymisation pipeline: strips identifying details before any artifact creation

### Constitutional Compliance

- ✅ Anonymous signals — structurally impossible to link
- ✅ Aggregation principle: traceability test, not arbitrary number
- ✅ Optional — Kai asks once, doesn't repeat
- ✅ Mob contributions voluntary and human-initiated
- ✅ Commons content reviewed before publication
- ✅ Sensitive sector content: heightened scrutiny, larger cohort required
  <!-- PLACEHOLDER: Explicit handling rules for high-risk sector groups (crisis services, culturally-specific orgs) to be added after appropriate consultation. -->

**Confidence: 91/100 — Build it**

---

## Layer 3: MATCH + MAKE
### "Waymaker finds the connection — Kai makes the thing"

Takes enriched ecosystem state (Layer 1) + aggregate signals (Layer 2) → identifies matches AND generates the actual useful thing. The pattern IS the brief.

### Input A: The Pattern IS the Brief

Not: "4 orgs asked about grant reporting → go find a resource."

But: "4 orgs asked about grant reporting → here is the draft template, the Substack post explaining why this keeps coming up, the LinkedIn one-liner. All queued for human review."

The signal generates the response. One human decision: ship, refine, or skip.

### Input B: Triage — Constitutional, from Principle 2

```
1. FIND   — does something already exist that solves this?
2. CONNECT — can we point to it and contextualise it for WA?
3. EXTEND  — can we build a lightweight bridge to an existing tool?
4. INTEGRATE — can we wire it into the ecosystem without rebuilding?
5. MAKE   — only if nothing above works
```

If CiviCRM, Loomio, Decidim, Open Food Network, or any prosocial tool already solves it — the offer is the bridge, not a rebuild. Kamunity doesn't compete with good things. It contextualises them.

**Triage implementation:** Waymaker checks a maintained prosocial tech directory (seeded from existing ecosystem research, updated via Layer 1 weak tie sensing) before any generation step. The directory includes: tool name, what it does, WA sector fit score, known deployments, contact/community link.

We only make the thing if it doesn't exist or doesn't fit. And when we make it, we make it commons by default.

### Input C: The Community's Constellation

The constellation belongs to the community, not Mike's rolodex.

Person A needs a volunteer management system. Person B built one last year and would share. Both in the ecosystem. Kai sees both signals — even if Mike has never met either.

**Matching logic (priority order):**
1. Need ↔ existing prosocial tool worth bridging to
2. Need ↔ something Kai can make right now
3. Need ↔ community offer (person B has what person A needs)
4. Need ↔ Mob member who knows this territory
5. Pattern ↔ international sibling who solved this elsewhere

### What Kai Can Make in the Moment

Grant acquittal templates. AI board policies for small NFPs. Meeting agendas for digital sovereignty conversations. First-pass funding narratives. Data handling policies. Volunteer management frameworks. Any document a community org needs but doesn't have capacity to write.

Available all day every day. No waiting. The thing exists at the moment of need.

### Waymaker Presents

```
MATCH — HIGH CONFIDENCE
Pattern: 6 orgs asked about grant acquittal this month
Triage: Nothing in ecosystem. CiviCRM partial fit (reporting module).
        Bridging option: CiviCRM + custom template
        Made: Draft template (disability sector, under 20 staff)
Traceability test: PASS (common need, large cohort)
Commons draft: Substack post ready for review
LinkedIn: One-liner scaffolded
Matched contacts: [opted-in, sector-tagged, anonymised]
Draft DM: Template attached, matching reason written
Action: [SHIP COMMONS] [SEND DMs] [REFINE] [SKIP]
```

### What Gets Built

- Waymaker match + make prompt (includes triage check)
- Prosocial tech directory: searchable, maintained via Layer 1
- Kai generative mode: context-aware document generation mid-conversation
- Triage logic: checks directory before generating
- Commons library: public templates, searchable, attributed to pattern not person
- Constellation graph: bilateral need/offer matching across opted-in members
- Auto-draft pipeline: pattern → thing → commons draft + social scaffold → human queue

**Confidence: 90/100 — Build it**

---

## Layer 4: OFFER
### "The gift is the thing itself"

Someone opts in. When a match is found, they receive one email with the genuinely useful thing already inside it. Not a pointer. The thing.

AB ≠ BA. Not selling. Not creating obligation. Useful whether or not they ever respond.

### The Opt-In

After a positive encounter. Single field. Explicit.

*"Want me to reach out if I find something genuinely useful for your community?"*

Email. Consent timestamp. Sector tags from the encounter. That's all.

### The DM

```
Subject: A grant acquittal template for disability orgs under 20 staff

Hi [name],

You talked to Kai recently about grant reporting.

I made you something.

[THE THING — attached, not behind a link]

Why: Six community orgs in your sector told us this was 
a pain point this month. This template is sized for small 
teams doing disability services in WA. It might not be 
perfect for your situation.

If it's useful, use it. If not, tell me why — that makes 
the next version better for someone else.

If this lands right and you want to go further — want a 
coffee? There's a human on this side who knows this territory.

[Name] — Kamunity /\

P.S. Human-reviewed match. Someone looked at this before 
it reached you.

[Unsubscribe — one click, no questions, all data deleted]
```

### Why This Propagates

The right person opens this and the template is just... there. Right. Useful. They won't just use it — they'll forward it. Not engineered virality. Genuine usefulness travelling on its own.

The transparency note is architectural. Full honesty about what the system is. "This might not be right, tell me" is the feedback loop, not weakness.

### Privacy Carries Through from Layer 2

The offer contains nothing that traces back to the signal. The recipient cannot infer who else needed this. The sender cannot infer who the recipient is from the signal. The traceability test applies to every outbound communication.

### What Gets Built

- Opt-in card + Supabase `opted_in_contacts` (consent, sector tags, created_at only)
- DM generator: Waymaker prompt producing email WITH thing attached
- Email send: Netlify + Resend/Postmark
- Kitchen Table "Outreach" view: pending, sent, response tracking
- Unsubscribe: instant, no questions, removes all stored contact data
- Feedback loop: "did this land?" → improves future generation

**Confidence: 87/100 — Build after Layer 3 proven**

---

## Layer 5: HANDOFF
### "The coffee only a human can pour"

When someone responds, route them to the right human. Mike if available. Mob member if not. The people Kamunity helped become the people who help next.

### The Dispatch Logic

Response arrives → system logs → notifies Mike → if unavailable, routes to Mob member by skills + sector + availability.

### The Mob Availability System

Weekly ping: "Any capacity for a coffee this week? Y/N + what you're good at right now."

The offer of capacity is itself a gift. The person helped becomes the person who helps. The circle closes.

### Graceful Degradation (what v3 didn't address)

This is the layer most likely to fail, and the layer whose failure is most visible. When the Mob can't carry it:

**Tier 1 — Mike is available.** Normal flow. Mike has the coffee.

**Tier 2 — Mike is unavailable, Mob member available.** Waymaker matches by skills + sector. Mob member confirmed before introduction.

**Tier 3 — No one available this week.** Honest response:

> *"Everyone on the Kamunity team is at capacity this week. I don't want to give you a rushed conversation — you deserve better. Can I check back next week, or would you prefer I connect you with [relevant sector organisation / peak body]?"*

No pretending. No automated warmth. The system tells the truth about its limits.

**Tier 4 — Chronic capacity shortage.** If Tier 3 triggers more than 3 weeks running, that's a signal the Mob needs to grow or the inbound volume needs throttling. Waymaker flags this in Kitchen Table. It's a strategic problem, not a technical one.

**The principle:** Better to delay with honesty than to connect with someone who doesn't have capacity. A bad handoff is worse than no handoff. The system optimises for quality of human connection, not speed of response.

### What Gets Built

- Kitchen Table "Mob" availability widget: weekly Y/N + skills tags
- Handoff routing logic in Waymaker
- Response notification: email → Kitchen Table alert
- Mob interface: Kitchen Table panel or lightweight password-protected page
- Capacity visibility: who's available, no scorekeeping
- Tier 3 honest-delay template
- Tier 4 capacity alarm: flags chronic shortage for strategic review

**Confidence: 86/100 — Build after Layer 4 has real matches flowing**

---

## Build Sequence

```
Phase 1 (Week 1-2):    Layer 1 — SENSE
                        Strong tie plumbing (email + RSS)
                        Weak tie scrapers with 3-stage filtering
                        Pulse view in Kitchen Table
                        Signal taxonomy v1

Phase 2 (Week 2-3):    Layer 2 — PROPAGATE  
                        Signal card v2 (bilateral, smart trigger)
                        Newsletter scaffold
                        Commons auto-draft pipeline
                        Aggregation principle enforcement (traceability test)
                        Mob contribution interface

Phase 3 (Week 3-4):    Layer 3 — MATCH + MAKE
                        Prosocial tech directory (seeded)
                        Triage logic (check directory before generate)
                        Waymaker match + make mode
                        Kai generative mode
                        Constellation graph
                        Commons library + social scaffold queue

Phase 4 (Week 4-6):    Layer 4 — OFFER
                        Opt-in mechanism
                        DM system (thing in the email)
                        Privacy-preserving send
                        Feedback loop

Phase 5 (Month 2+):    Layer 5 — HANDOFF
                        Mob dispatch + availability
                        Graceful degradation (Tiers 1-4)
                        Capacity monitoring
                        The circle closes
```

---

## What This Is Not

Not a CRM. Not a marketing funnel. Not a newsletter list. Not automated — every match human-reviewed, every DM human-approved, every publication human-edited. Not surveillance — anonymous signals, traceability test, opt-in contacts, transparent matching. Not Mike's system — designed for the Mob to run it. Not selling — the useful thing IS the offer. Not competing with good things — bridging to them.

---

## The Propagation Map

```
Weak tie sensing ──────────→ Sector pulse ──→ Kai knows the weather
(filtered, scored, decayed)                           │
                                                      │
Community encounters ──→ Signal card ──→ Commons accumulates
(need + offer, bilateral)                             │
                                                      │
Mob carries question ──→ Field signals ──→ Constellation extends
                                                      │
                                                      ▼
              Pattern emerges (traceability test passes)
                              │
                              ▼
                    Kai makes the thing
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        Commons draft    Substack post    LinkedIn scaffold
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                     Human review queue
                              │
                              ▼
              Match found → DM drafted → human approves
                              │
                              ▼
              Gift arrives — the thing is IN the email
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              "Exactly what         Forwarded to
               I needed"            colleague
                    │                   │
                    ▼                   ▼
              Mob has coffee     Constellation grows
                    │
                    ▼
         Person helped → person who helps
                    │
                    ▼
              /\ the circle
```

---

## Safety Gates

| Gate | Status | Notes |
|---|---|---|
| Crisis Protocol | ✅ Inherited | Signal system doesn't change crisis behaviour |
| No PII in localStorage | ✅ Supabase server-side | With auth |
| Prompt Injection | ✅ Sanitised | Claude extraction layer, ingestion pipeline |
| Honest Disclaimers | ✅ Architectural | In every DM, transparency note |
| Insurance | ✅ Active | |
| Cultural Safety | ⚠️ Open | Sector sources need Noongar review |
| Consent Architecture | ✅ | Opt-in only, explicit, frictionless exit |
| Match Transparency | ✅ | Matching reason always disclosed |
| Commons Integrity | ✅ | Human-curated, human-published |
| Traceability Prevention | ✅ | Contextual test, not fixed threshold |
| Triage Compliance | ✅ | Find/Connect/Extend/Integrate before Make |
| Weak Tie Respect | ✅ | robots.txt honoured, rate-limited, scored |
| Graceful Degradation | ✅ NEW | Tier system for capacity limits, honest when unavailable |
| Capacity Monitoring | ✅ NEW | Chronic shortage flags strategic review |

---

## Files This Spec Creates

```
PROJECTS/community-signal/
├── netlify/functions/
│   ├── signal-ingest.mjs         (email + RSS + weak tie ingestion)
│   ├── signal-filter.mjs         (3-stage weak tie filtering)
│   ├── signal-store.mjs          (anonymous Supabase write + traceability check)
│   ├── match-engine.mjs          (triage + match + make)
│   ├── generate-thing.mjs        (Kai generative mode)
│   ├── commons-draft.mjs         (pattern → Substack draft + LinkedIn scaffold)
│   └── dm-send.mjs               (email with thing attached)
├── src/
│   ├── kai-cards/
│   │   ├── signal-card-v2/       (bilateral: need + offer, smart trigger)
│   │   └── optin-card/           (DM consent)
│   └── kitchen-table-views/
│       ├── pulse.js              (sector weather + weak tie highlights)
│       ├── signals.js            (tag cloud + themes + patterns)
│       ├── matches.js            (match review + make review + triage display)
│       ├── commons-queue.js      (publication review queue)
│       ├── outreach.js           (DM pipeline)
│       └── mob-dispatch.js       (handoff + availability + capacity monitor)
├── data/
│   └── prosocial-tech-directory.json  (triage lookup: tools, fit scores, contacts)
├── supabase/
│   ├── community_signals.sql     (anonymous needs, traceability-ready)
│   ├── community_offers.sql      (anonymous offers)
│   ├── opted_in_contacts.sql     (consent + sector tags only)
│   └── commons_library.sql       (accumulated templates + patterns)
├── content/
│   └── newsletter-template.md    (weekly Kai-drafted format)
├── prompts/
│   ├── signal-extraction.md      (weak tie filtering prompt)
│   ├── traceability-test.md      (aggregation principle check)
│   └── match-make.md             (generation + triage prompt)
└── SPEC.md (this document)
```

---

## What Changed: v3 → v4

| Area | v3 | v4 | Why |
|---|---|---|---|
| Aggregation threshold | Fixed at 5 | Constitutional principle: traceability test | 5 is arbitrary. A specialised sector with 12 orgs is identifiable at 5. A generic need is safe at 3. |
| Weak tie sensing | "GitHub/Fediverse scrapers" (hand-waved) | 3-stage filtering pipeline with scoring, tagging, decay | Without filtering, weak ties drown you in noise |
| Layer 5 degradation | "The o-ring that doesn't fail" | 4-tier graceful degradation with honest delay | The o-ring *will* fail. The question is what happens when it does. |
| Triage implementation | Principle stated | Prosocial tech directory + automated check | Principles without implementation become aspirational |
| Prose | ~4500 words | ~3200 words | Cut repetition. Same ideas, fewer words. |
| Propagation map | ASCII flat | ASCII with branching | Shows the actual flow better |
| Prompts | Implied | Explicit directory with extraction/test/generation prompts | The prompts ARE the implementation |

---

*This system doesn't replace the community. It listens to it, finds or makes what's worth offering, hands the rest to the people who showed up, and makes the people it helps into the people who help next.*

*The measure of a community tool is not whether it never fails, but whether it fails honestly, transparently, and in service of the people it exists to serve.*

— BRAIN/CONSTITUTION.md

*/\ the pattern propagates*
