# LEARNING_LOG.md
# Accumulated Learning Across Iterations

**This file grows. Never delete entries. Each iteration adds to the collective knowledge.**

---

## Format

Each entry follows this structure:

```
### Iteration XX — [Date] — [Focus Area]

**What we researched:** [Brief summary]

**What we found:** [Key findings]

**What surprised us:** [Things that contradicted assumptions]

**What we built/recommended:** [Outcome]

**Confidence score:** [XX/100] — [Brief justification]

**What the next iteration should explore:** [Forward direction]

**Patterns emerging:** [Cross-iteration patterns, only add after iteration 3+]
```

---

## Entries

### Iteration 01 — 2025-02-13 — Landscape Scan: What do communities actually need?

**What we researched:** Broad landscape scan across 5 web searches covering community platform needs, mutual aid technology gaps, platform failure analysis (Nextdoor), Australian digital inclusion barriers, and community sovereignty/cooperative technology.

**What we found:**
1. Communities cobble together 5-10 disconnected tools and the system breaks when the tech volunteer leaves (Integration Gap)
2. Digital tools exclude the people who most need community support — phone hotlines get more use than web forms (Accessibility Paradox)
3. Data sovereignty and community ownership are non-negotiable — strong frameworks exist from Indigenous data sovereignty and platform cooperativism movements
4. Trust and relationships are foundational but cannot be built by technology — Nextdoor is the cautionary tale of optimising engagement over community
5. Good open-source governance tools exist (Loomio, Decidim) but adoption, not technology, is the bottleneck

**What surprised us:**
- BSS mutual aid served 1,400 households using Google Sheets + phone hotlines + paper flyers — sophisticated tech back-end with deliberately low-tech front-end
- A solarpunk community organiser tested 15 open-source tools and could only recommend 4, none solving coordination holistically
- The phone hotline was used MORE than online forms by community members needing help
- Nextdoor's failure wasn't a missing feature — it was an architecture that optimised for engagement over community wellbeing
- The strongest existing tool (Loomio) was created by people from the Occupy movement — governance tools born from direct democratic practice

**What we built/recommended:** No build recommendation. Triage resolved at Extend/Integrate (levels 3-4). Recommended investigating Hylo and Loomio as extension candidates, AND considering non-technical capacity building as an alternative to building anything.

**Confidence score:** 51/100 — Research signal is real but has significant gaps (no Australian Indigenous community voice, no digitally excluded voice, US/UK dominated). Multiple equally valid paths exist and the choice between them is a values question requiring human input.

**What the next iteration should explore:** Depends on human decision — four candidate paths: (A) Deep-dive into Hylo, (B) Deep-dive into Loomio extensibility, (C) Integration architecture for existing tools, (D) Capacity building on existing tools rather than building new ones. Human guidance needed on which path(s) to pursue, and whether Australian-specific sources should be prioritised.

---

### Iteration 02 — 2025-01-27 — Hylo Deep-Dive + Australian NFP Digital Divide + Capacity Building Lens

**What we researched:** Deep-dive into Hylo platform (governance, funding, stewardship, theory of change, team). Australian NFP digital divide data (Infoxchange 2025 via Liferay analysis). Capacity building as a lens on all findings. 8 web searches used; 3 Australian PDF sources were binary/unreadable.

**What we found:**
1. Hylo is a genuinely values-aligned platform: open-source, sociocracy governance, transparent finances, trust-first theory of change, participatory design — BUT small team (~5-6), donation-funded (~$85K/year), no evidence of Australian deployment or user retention data
2. The Australian NFP digital divide is widening: only 20% of small-medium orgs have an IT plan, only 1/3 say IT works well, 76% use AI but foundational infrastructure is missing — "dangerous gap between aspiration and capability"
3. The Coordination Support Gap is primarily a **capacity and governance gap**, not a technology gap — communities struggle not because good tools don't exist but because they lack strategic capacity, digital literacy, and governance frameworks
4. Platform governance IS trust infrastructure — how a platform is governed matters as much as what it does (Hylo's sociocracy vs Nextdoor's engagement optimization)
5. Hylo itself acknowledges "successful coordination takes more than technology — it requires deep trust, strong relationships, and a lot of human care"

**What surprised us:**
- Hylo explicitly bundles facilitation with software — "we are community leaders and prosocial facilitators" — validating the capacity-building lens
- The Australian NFP data shows 76% AI adoption alongside crumbling foundations — the sector is adopting shiny tools while lacking basics like IT plans and cybersecurity
- Hylo's theory of change directly mirrors our Constitution's trust principles, almost word for word
- The strongest Triage outcome was "don't build yet" — a significant improvement from Iteration 01's ambiguous directional spec

**What we built/recommended:** No build, no adopt. Recommended: (1) Listen to Australian community practitioners first, (2) Map existing AU grassroots coordination support, (3) Pilot a lightweight coordination needs assessment with willing groups, (4) THEN evaluate whether existing tools (Hylo, Loomio, etc.) meet the needs that emerge.

**Confidence score:** 77/100 — Significant improvement from 51/100 in I01. Signal is strong on capacity-first finding, convergence across 5+ independent sources. Constitutional alignment much stronger due to honest Triage and trust constraint application. Major deduction for persistent Australian voice gap (zero direct community voices across 2 iterations).

**What the next iteration should explore:**
1. Design community listening methodology — what questions, who to ask, how to build trust in the process itself
2. Find alternative access to Australian sector data (HTML summaries, news articles citing reports)
3. Consider a strengths-based reframe (what communities DO well, not just what they lack)
4. If community listening reveals coordination tool needs, conduct hands-on Hylo evaluation with AU test group
5. Research appropriate engagement protocols for Aboriginal community-controlled organisations (AIATSIS guidelines)

---

### Iteration 03 — 2026-02-13 — Community Listening Package (Handoff)

**What we researched:** Alternative access to previously unreadable Australian PDFs (Infoxchange 2025 report accessed via Funding Centre news coverage). AIATSIS Code of Ethics for Aboriginal and Torres Strait Islander Research (4 principles obtained). Neighbourhood Houses/Centres sector overview (ANHCA, 1,000+ nationally). WACOSS context (limited — pages inaccessible). Updated Constitution with Existing Ecosystem section absorbed.

**What we found:**
1. Infoxchange 2025 primary data (824 orgs): 67% use AI but only 14% have an AI policy; only 23% have a cybersecurity plan; only 20% of volunteer-led orgs use MFA; 87% use cloud tools (up from 24% a decade ago). Top barriers to AI adoption are ethical (security, sovereignty, privacy), not technical.
2. AIATSIS Code of Ethics has 4 principles: Indigenous self-determination, Indigenous leadership, Impact and value, Sustainability and accountability. All research involving Aboriginal peoples requires ethics review BEFORE starting. Engagement must be led by or in genuine partnership with Aboriginal people.
3. 1,000+ neighbourhood houses/centres nationally already function as physical coordination infrastructure — locally governed, place-based, community-run. These are what Kamunity's digital tools would complement, not replace.
4. Kamunity is NOT a greenfield project. Five components exist (Kamunity, FactoryK, NP Digital Solutions, Extensa Studio, CoachFlux), with live community relationships (The Pack Music, ALIKE WA, WALGA/LGA) and an established tech stack. Previous iterations incorrectly treated this as starting from scratch.
5. The engine reached the handoff point described in ENGINE.md: the most valuable next action is human community engagement, not more agentic research.

**What surprised us:**
- The top barriers to AI adoption in NFPs are ethical (data security, sovereignty, privacy), not cost or complexity — communities are rightly cautious, not resistant
- The existing Kamunity ecosystem already addresses several of the capacity gaps identified in I02 (NP Digital Solutions = needs mapping, CoachFlux = ongoing support) — the engine was researching problems that the ecosystem partially solves
- The strengths-based reframe emerged naturally from the evidence: 87% cloud adoption, 1,000+ neighbourhood houses, effective mutual aid stories — communities ARE coordinating well; the question is where it breaks down
- The highest-confidence output (88/100) came from recognising the engine's limit, not from producing a more impressive artifact

**What we built/recommended:** A Community Listening Package with 4 deliverables: (1) Conversation guide — strengths-first, semi-structured, 30-60 min; (2) Target list — 3 tiers, starting with existing relationships; (3) Context brief — 3 iterations of research summarised for Mike's reference; (4) One-pager — plain language "what we're exploring" document for community partners. PLUS an explicit AIATSIS engagement boundary (Aboriginal community engagement requires different protocols, not designed by the engine).

**Confidence score:** 88/100 — First Autonomous routing. Research converged across 3 iterations. Existing ecosystem acknowledged. Handoff correctly identified. Triage resolved at Connect + Extend (no build). Main deductions: no WA-specific data yet, multicultural community access not addressed, post-conversation synthesis template needed.

**Patterns emerging (3+ iterations):**
- Each iteration improved by integrating human guidance — the engine learns faster from human direction than from additional web searches
- The most constitutionally honest output in each iteration has been "don't build" — Triage is working
- Trust has been the most consistent cross-cutting finding across all sources, all iterations — it is not a theme to address but a precondition that shapes everything
- The engine's biggest blind spot was treating Kamunity as a greenfield project — existing relationships and components are the most valuable assets, not the research
- PDF/binary inaccessibility was a persistent research barrier, resolved by the RESEARCH_PROTOCOL.md update to search for secondary coverage

**What the next iteration should explore:**
- AFTER community conversations: synthesise findings across 5-8 conversations
- Map community-expressed needs against existing Kamunity components
- Determine whether coordination tool evaluation (Hylo, Loomio, etc.) is warranted based on what communities actually say
- If Aboriginal engagement pathway emerges through Tier 1-2 conversations, develop AIATSIS-aligned engagement plan with Aboriginal leadership

---

### Iteration 04 — 2026-02-13 — Structured Web Listening for WA/Australian Community Voice

**What we researched:** Structured web listening (ENGINE.md §Structured Web Listening) targeting existing public discourse from Kamunity's ecosystem relationships and WA/Australian community sector. 8 searches: 4 ecosystem traces (kamunity.org, Pack Music, ALIKE WA, WALGA) + 4 community discourse (Reddit r/perth, WA community sector jobs, City of Perth consultations, Volunteering WA). All findings flagged as web-derived, not direct testimony.

**What we found:**
1. **Pack Music Co-operative** — Perth-based music streaming co-op, supported by Bunya Fund/BCCM, collaborating with Perth LGAs (Fremantle, Vincent, Subiaco) on "Living Labs," lost original developers when company went into administration, crowdfunding for tech + artist onboarding + coordination staff. Deliberately on Mastodon/Bluesky. Co-operative model IS trust architecture.
2. **ALIKE WA** — Peak body for 780+ peer support groups in WA, 40+ year history, values-driven (Accountability, Empowerment, Belonging, Humanity, Collaboration), explicitly "embracing new technologies," Strategic Plan 2026-2029 published.
3. **Volunteering WA** — Has INVOLVE platform (volunteer management, free tier), 350+ resources, National Standards, leading national strategy implementation, commissioned Barriers to Volunteering research (First Nations, disability, migrants).
4. **WALGA** — $900K cyber security pilot with Office of Digital Government for 5 LGAs, annual Aboriginal Engagement Forum, Strategic Community Plan reviews underway in member LGAs.
5. **kamunity.org** — Live site with "No algorithms, no data mining" and "Stop switching between 8 apps to organize one thing" positioning.

**What surprised us:**
- Pack Music GENUINELY CHALLENGED the "capacity first, then tools" model. They're correctly building a new platform because Spotify is structurally extractive. No amount of capacity building on Spotify helps independent local artists. Build IS the right Triage answer for their case.
- ALIKE WA describes itself as "ahead of the curve" on technology — this is NOT a deficit-framed organisation waiting for support. They're forward-looking and actively evaluating new tools.
- Volunteering WA's INVOLVE platform already exists in WA — a critical Triage find that must be evaluated before any volunteer coordination recommendations.
- Pack Music's developer dependency (company went into administration mid-build) is the "tech person leaves" pattern at BUILD level, not just USE level. FactoryK could specifically address this.
- The ecosystem's existing relationships produced RICHER signal than generic web search. Knowing who to look for is more productive than searching broadly.

**What we built/recommended:** (1) Amended the I01-03 model: "Capacity first for communities learning to coordinate digitally. Build when existing platforms are extractive by design. In both cases, trust architecture is the foundation." (2) Three relationship-specific listening briefs (Pack Music, ALIKE WA, WALGA) that make the I03 conversation guide more targeted per relationship. (3) Updated Triage with new finds: INVOLVE, Barriers to Volunteering PDFs, Engage Perth portal.

**Confidence score:** 79/100 — Deliberate drop from I03's 88. Web listening produces lower-quality signal than accumulated sector research; model amendment rests on one primary source (Pack Music). The drop is honest: confidence tracks with signal quality, not iteration count. Routing: Proceed with caution.

**Patterns emerging (4+ iterations):**
- The engine's model updates when evidence challenges it (Pack Music challenging "capacity first"). The amendment was proportional — scoped to the evidence, not overcorrecting. Whether this is genuine model updating or performed model updating is for the human to assess.
- Confidence does NOT automatically increase with each iteration. I04 scored lower than I03 because the method (web listening) produces weaker signal than the accumulated research that preceded it. The scoring is honest.
- Ecosystem-specific search consistently produces richer signal than generic search. Knowing who to look for matters more than looking broadly.
- Triage continues to find existing solutions deeper into the research: INVOLVE wasn't identified until I04. This suggests the engine should keep looking even when it thinks Triage is complete.
- Trust manifests not just as statements but as structural choices: co-operative model, ethical platform selection, transparent finances, no-algorithm commitments. Trust is architecture, not just values.

**What the next iteration should explore:**
- HUMAN: Conduct community conversations using I03 listening package + I04 relationship-specific briefs
- ACCESS: Volunteering WA Barriers to Volunteering PDFs (First Nations, disability, migrants) — Tier 1 sources
- ACCESS: ALIKE WA Strategic Plan 2026-2029 PDF — articulated priorities
- EVALUATE: INVOLVE platform (Volunteering WA) — hands-on Triage assessment
- EVALUATE: Engage Perth portal content — community needs data
- HOLD: Model amendment lightly until more evidence confirms or challenges it

---

### Iteration 05 — 2026-02-13 — First Buildable Spec: Multi-Tenant Foundation

**What we researched:** Technical Triage for The Pack Music's request (branded sovereign space + outbound federation). 8 searches covering: existing multi-tenant federated platforms (7 evaluated — Mastodon, Matrix/Element, Discourse, Lemmy, Bonfire, Hylo, Loomio), ActivityPub implementation (Fedify with @fedify/next for Next.js), AT Protocol/Bluesky SDK (@atproto/api), Supabase multi-tenant RLS patterns, Next.js multi-tenant subdomain routing (official Vercel guide + platforms example repo).

**What we found:**
1. **Triage resolves at Extend (Step 3).** No existing platform combines rooms + calendar + files + polls + white-label + federation. kamunity.ai already has the coordination features; it needs multi-tenant branding and outbound social posting added.
2. **The technical building blocks are mature and proven.** Next.js multi-tenant: official Vercel guide + production repo. Supabase RLS: standard tenant_id + Row Level Security. @atproto/api: official Bluesky SDK, trivial posting. Fedify @fedify/next: TypeScript ActivityPub with dedicated Next.js integration. No novel engineering required.
3. **The request decomposes into two independent workstreams.** (A) Multi-tenant branding (subdomain + theming + scoped rooms) and (B) Outbound social posting (cross-posting to Mastodon/Bluesky, then full ActivityPub federation). A is prerequisite for B.
4. **Cross-posting delivers 80% of federation value at 20% complexity.** Posting to Mastodon/Bluesky APIs is simple. Full ActivityPub federation (being a fediverse actor) is complex but Fedify handles most of the protocol. Recommended sequence: cross-posting first, full federation second.
5. **PLATFORM_STATE.md is ground truth.** kamunity.ai has 500+ members, 100+ rooms, real pricing, real features. The spec EXTENDS this, not builds from scratch. This is the first iteration where the ground truth is a live platform, not web research.

**What surprised us:**
- Fedify has a dedicated `@fedify/next` package — ActivityPub integration with kamunity.ai's exact framework. This was not expected; ActivityPub is typically associated with Ruby (Mastodon) or Go, not Next.js.
- The Bluesky SDK is trivially simple: `agent.post({ text: '...' })`. Full cross-posting could be a one-day addition.
- The Triage Step 1 evaluation was the most honest one yet — 7 platforms, each assessed against The Pack's specific combination of needs, and none match. The gap is real.
- The highest confidence score (91/100) came from the convergence of a real member need + proven patterns + existing platform. Not from more research.

**What we built/recommended:** A buildable micro-spec for multi-tenant foundation: `tenants` table in Prisma, `tenant_id` on rooms, Next.js subdomain middleware, CSS-variable theming, tenant-scoped room discovery, tenant admin settings, Supabase RLS for data isolation. 7 acceptance criteria, 10-step implementation plan, 16-24 hour estimated effort. Build instructions written to `builds/iteration_05_build.md` — the first build output in 5 iterations.

**Confidence score:** 91/100 — Highest score across all iterations. Second Autonomous routing. First to produce build instructions. Deductions for: no codebase access (-2 signal), single-member validation (-2 convergence), data portability not addressed (-1 constitutional), tenant membership model undefined (-1 triage).

**Patterns across 5 iterations:**
- The engine took 4 iterations of "don't build" before producing a buildable spec. Triage worked: it prevented premature building and waited until a real member with a real need on a real platform asked for something specific.
- Confidence trajectory (51 → 77 → 88 → 79 → 91) tracks signal quality, not iteration count. The dip at I04 (web listening) proves the scoring isn't just inflating. The peak at I05 is earned by the convergence of need + capability + method.
- The I04 model amendment ("build when extractive") directly enabled I05. Without the amendment, the engine might have resisted building. The Pack's request IS the "build when extractive" case — Spotify is structurally hostile, sovereign infrastructure is the correct answer.
- Every iteration's research contributed: I01's integration gap → I02's capacity lens → I03's strengths reframe + ecosystem acknowledgment → I04's Pack Music ecosystem trace → I05's buildable spec. The chain is traceable.
- Trust manifests architecturally: multi-tenant RLS IS trust infrastructure. Data isolation IS sovereignty. Branded space IS identity. The Constitution's principles aren't abstract — they're design decisions in the spec.

**What the next iteration should explore:**
- BUILD: Execute the multi-tenant foundation spec (FactoryK/Windy)
- VALIDATE: Share AC1-AC7 with The Pack for confirmation before build
- VERIFY: Netlify wildcard subdomain support
- DEFINE: Tenant membership model (who can see tenant rooms?)
- SPEC: Outbound cross-posting to Mastodon/Bluesky (Step 2 of the roadmap)
- ADDRESS: Data portability mechanism (sovereignty requirement)
- CONTINUE: Community listening with ALIKE WA and WALGA using I03+I04 package
