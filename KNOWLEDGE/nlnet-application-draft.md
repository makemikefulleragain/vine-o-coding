# NLnet NGI Zero Commons Fund — Application Draft

**Deadline: April 1, 2026 (12:00 CEST)**
**Fund: NGI Zero Commons Fund**
**Requested amount: €35,000 (AUD ~$56,000)**

---

## Project Name

**Kai: A Constitutionally-Governed Community AI for Digital Sovereignty**

## Abstract (max 1200 characters)

Kai is a constitutionally-grounded AI presence for community organisations, built as part of Kamunity — an open-source ecosystem providing communities with sovereign digital tools. Unlike corporate AI assistants, Kai operates under an explicit constitution that prohibits surveillance, data extraction, dark patterns, and vendor lock-in. Communities use Kai to navigate digital tools, assess their sovereignty and AI readiness, access free resources, and connect to the prosocial tech ecosystem.

The project develops Kai from its current API-based MVP toward a community-governed AI whose constitutional values are determined through deliberative democratic process (building on Anthropic's Collective Constitutional AI research and the Polis platform). The end state is an open-source, self-hostable community AI presence whose constitution is written by the community it serves — a genuine digital commons.

All code is open source. All tools are free. All data is community-owned. The constitutional framework, methodology, and tooling are designed for adoption by any community worldwide.

## Describe the project

### The Problem

Community organisations worldwide are being forced into dependency on corporate digital infrastructure. In Western Australia alone, 11% of the population is highly digitally excluded, while the organisations serving them rely on tools that extract data, create vendor lock-in, and deploy dark patterns. The arrival of AI has intensified this: Microsoft Copilot is being pushed into donated NFP Office 365 subscriptions, Google's Gemini is appearing in Workspace, and community workers are using ChatGPT with no guidelines, no training, and no understanding of where their data goes.

No community-serving AI exists that is: constitutionally governed, transparent about its values and limitations, designed to prevent dependency rather than create it, and owned by the communities it serves.

### What We've Built

Kamunity is an ecosystem of community-owned digital tools:

- **Digital Sovereignty Audit** — free self-assessment helping orgs understand their vendor lock-in, data exposure, and digital costs (kamunity-audit.netlify.app)
- **AI Readiness Assessment** — free quiz mapping community orgs' AI understanding, current use, safety posture, and readiness to act, with personalised recommendations
- **Free Toolkit** — guides, prompt kits, safety checklists, and tool comparisons for community organisations
- **FactoryK** — an AI factory that builds tools from plain-language requests, with constitutional guardrails that prevent building surveillance tools or dark patterns
- **The Constellation** — ally tracking and outreach tool mapping 120+ organisations in the prosocial tech ecosystem
- **Vine-o-Coding** — the development methodology enabling rapid, constitutionally-grounded site building

**Kai** is the encounter interface that ties this ecosystem together — a constitutionally-grounded AI presence that lives on kamunity.org and helps communities find their way through the tools, knowledge, and connections available to them.

### What This Grant Funds

**Phase 1: Kai Constitutional MVP (Months 1-3)**
- Finalise and deploy the Kai Constitution (Founder's Draft — explicitly temporary, designed for community rewriting)
- Build the Liquid UI encounter interface — where tools and resources surface based on conversation context, not navigation menus
- Integrate with Claude API with constitutional system prompt
- Deploy free toolkit, audit cross-links, and sector awareness
- Publish all code, constitution, and methodology as open source

**Phase 2: Community Intelligence Layer (Months 3-6)**
- Build RAG pipeline connecting Kai to ecosystem content and sector feeds
- Implement optional persistence with community consent (Supabase, fully exportable)
- Develop anonymised pattern recognition ("67% of orgs in our network have no AI policy")
- Create community contribution pipeline for ecosystem updates
- Document the constitutional AI methodology for replication

**Phase 3: Toward Community Governance (Months 6-12)**
- Integrate Polis for community constitutional deliberation
- Design and facilitate the first community constitutional convention
- Evaluate sovereign model options (open-source LLMs fine-tuned on community-written constitution)
- Publish research and methodology for other communities to adopt
- Present at Solidarity AI Conference (Bangkok, November 2026) and Infoxchange Conference (Melbourne, May 2026)

### Why This is a Digital Commons Contribution

1. **The Constitution is the Commons.** The Kai Constitution, methodology, and constitutional AI framework are designed for any community to adopt. A neighbourhood centre in Perth, a cooperative in Barcelona, an Indigenous organisation in Aotearoa — any community can take this framework, write their own constitution, and deploy their own Kai.

2. **The Code is the Commons.** All code is open source, self-hostable, and designed for zero vendor lock-in — including from Kamunity itself.

3. **The Methodology is the Commons.** The Vine-o-Coding development method, the constitutional guardrail framework, and the deliberative governance process are documented for replication.

4. **The Research is the Commons.** This project extends Anthropic's Collective Constitutional AI research from academic experiment to community-deployed reality. The findings will be published openly.

### Relevance to NGI Zero Commons Fund

This project directly serves the fund's goals of strengthening the internet as a public good:
- **Open source** — all code, constitutions, and methodology
- **Privacy by design** — zero data collection by default, constitutional prohibition on surveillance
- **Community ownership** — designed for self-hosting and community governance
- **Digital sovereignty** — explicitly anti-lock-in, pro-community-control
- **Accessibility** — WCAG 2.1 AA, plain language, mobile-first, serving digitally excluded populations

Previous NLnet grantees in this space include Bonfire Networks, CryptPad, and Peertube. Kai extends this tradition by adding constitutional AI governance to community-owned infrastructure.

## Technical Architecture

- **Frontend:** Static HTML/JS/CSS deployed on Netlify (or any static host)
- **AI:** Claude API (Phase 1-2), with evaluation of Llama/Mistral fine-tuning for Phase 3
- **Persistence:** Supabase (opt-in only, Phase 2+), fully exportable
- **Deliberation:** Polis integration (Phase 3) for constitutional governance
- **Accessibility:** WCAG 2.1 AA, semantic HTML, full keyboard navigation
- **Privacy:** Zero tracking, no cookies (except essential), no analytics beyond aggregate server logs
- **Licensing:** AGPL-3.0 for code, CC BY-SA 4.0 for constitutional documents

## Budget Breakdown (€35,000)

| Item | Amount | Notes |
|------|--------|-------|
| Development — Kai MVP & Liquid UI | €8,000 | Phase 1 build, testing, deployment |
| Development — RAG pipeline & persistence | €6,000 | Phase 2 community intelligence layer |
| Development — Polis integration & governance tooling | €5,000 | Phase 3 deliberative infrastructure |
| API costs (12 months) | €2,000 | Claude API for Kai conversations |
| Infrastructure (12 months) | €1,000 | Hosting, domains, Supabase |
| Documentation & methodology | €4,000 | Open-source docs, replication guides |
| Community engagement & testing | €3,000 | User testing with WA community orgs |
| Conference presentations | €3,000 | Solidarity AI Bangkok, Infoxchange Melbourne |
| Project coordination | €3,000 | 12 months of project management |
| **Total** | **€35,000** | |

## Applicant

**Mike Fuller**
Kamunity
Perth / Mandjoogoordap, Western Australia

Kamunity is a community-owned digital infrastructure platform providing tools for digital sovereignty — no vendor lock-in, no data harvesting, constitutional guardrails against surveillance and dark patterns. The ecosystem includes multiple deployed tools serving community organisations in Western Australia.

## Related Work

- Anthropic's Collective Constitutional AI (Huang et al., 2024) — proved communities can write AI constitutions through deliberation
- OSCCAI — open-source platform for community constitutional AI alignment
- Bonfire Networks (NLnet grantee) — modular federated community platform
- Te Hiku Media — Indigenous-governed AI for te reo Māori (tikanga-based governance)
- Decidim — participatory democracy platform (technopolitical governance model)
- CARE Principles for Indigenous Data Governance — constitutional framework for community data
- Platform Cooperativism Consortium's "Solidarity Stack" — cooperative digital infrastructure
- Polis — ML-augmented deliberative democracy (used in Taiwan's vTaiwan, Anthropic's CCAI)

---

*Draft prepared February 2026. For submission by April 1, 2026.*
*All materials will be refined based on community feedback and continued development.*
