# COMMUNITY SIGNAL SYSTEM — MISSION

## What

A full-cycle sensing, matching, making, publishing, and returning system that runs underneath Kai. It listens to Perth's community sector, finds patterns, generates useful things in response, publishes back to the network transparently, and returns gifts to the people whose signal made it possible.

It breathes. Inhale: signal from the sector. Exhale: value returned to the sector.

## Who It Serves

Operations coordinators, CEOs, and workers in Western Australian community sector organisations — particularly small NFPs (under 20 staff) who don't have dedicated tech people. The person evaluating this in a 3-minute window between meetings.

Secondarily: rural and remote WA community organisations, designed in from the start as a genuine constraint, not an afterthought. If it works with intermittent connectivity and tiny organisational capacity, it works everywhere.

## Who It Does NOT Serve

Vendors. Platforms seeking data. Anyone who wants to extract value from community signal. This system is structurally incapable of surveillance — not by policy, by architecture.

## Why

99% of value exchange in communities is latent and invisible to current systems. Orgs solving the same problems don't know each other exist. Patterns that could generate useful templates, policies, and tools go unrecognised because no one is listening at scale. Communities are tenant farmers in the compute economy — renting tools that extract their data and lock them in.

Perth's community sector is chronically underfunded (14% below award wages, compounding for a decade), operating in survival mode, heads-down — invisible to each other. The sector cannot self-organise toward a phase transition without first becoming legible to itself.

This system makes the invisible visible without making the private public. It is the cooperative substrate that makes the leap possible.

## The Full Loop

```
SENSE → PATTERN → TRIAGE → GENERATE →
BROADCAST → LISTEN → RESEARCH → RETURN
```

**SENSE:** Signals flow in from Kai conversations, LinkedIn comments, RSS feeds, field observations, email.

**PATTERN:** Claude finds what multiple orgs are independently asking about.

**TRIAGE:** Constitutional check — Find → Connect → Extend → Integrate → Make. Never build what exists.

**GENERATE:** Tools, templates, resources, newsletter content — made or found, human-reviewed.

**BROADCAST:** Publish back to the network via LinkedIn and Substack. Transparently. AI-generated posts disclosed. Spicy feedback-gathering posts. Signal-derived insights. All human-approved before sending. Scheduled via Late.dev API.

**LISTEN:** Comments and responses on published content flow back in as new signals. The loop closes.

**RESEARCH:** For strong individual signals — public research on the person and org. Who are they? What do they actually need? What gift fits?

**RETURN:** A gift. Unconditional. Following the triage order: Find something that exists → Connect them to someone in the network → Extend an existing Kamunity tool → Integrate with prosocial tech ecosystem → Make something new (last resort). The gift is the exhale.

## The LinkedIn Signal Layer

LinkedIn is a primary weak-tie sensing surface. Comments on published posts are signals — consented, public, zero overhead for respondents. The Content Studio (Kitchen Table view) manages the full pipeline: Claude drafts posts by type, Mike polishes and approves, Late.dev API schedules delivery, comments return as signals.

Post types:
- **Personal/organic** — Mike's voice, no disclosure needed
- **Signal-generated** — "Kai's been listening. Lots of orgs asking about X lately..."
- **Spicy/feedback-gathering** — "🤖 AI-assisted | [provocative question]. Drop your truth below 👇"
- **Pop culture hook** — "🤖 Generated | [hook]. Community sector reality check."

Full transparency on AI generation is constitutional, not optional. It is also differentiating — the sector is drowning in performed authenticity.

## Done Condition

The system is done when:

1. Kai can tell you what Perth's community sector is worried about this week — grounded in real signal, not hallucination
2. When 5+ orgs independently surface the same need, a useful template/tool/resource exists within 48 hours — made or found, not just pointed at
3. When Person A needs something and Person B has it, the connection happens — with consent, transparency, and a human in the loop
4. When a strong individual signal is identified, a researched, appropriate gift is returned — unconditionally, with no ask attached
5. Published content generates comments that re-enter the sensing pipeline — the loop is genuinely closed
6. When Mike is unavailable, the system still functions — the Mob carries it
7. When the system fails, it fails honestly — "we don't have capacity this week" not silence

## Constitutional Grounding

This project operates under BRAIN/CONSTITUTION.md. Specifically:

* **Principle 1 (Sovereignty):** Communities own their signal. No extraction. The gift is not a funnel.
* **Principle 2 (Triage):** Find → Connect → Extend → Integrate → Make. We don't build what already exists. This applies to gifts as much as tools.
* **Principle 6 (Transparency):** Every match discloses its reasoning. Every publication is human-reviewed. AI-generated content is always labelled.
* **Principle 10 (Ontological Honesty):** The system says what it is. "This post was generated by AI to gather community feedback" is not a caveat — it is the system being honest about itself in public.

## Interfaces

* **Reads from:** BRAIN/ECOSYSTEM.md, KNOWLEDGE/ecosystem-state.json, LinkedIn comments (via Late.dev API or manual), RSS feeds, Kai conversations
* **Writes to:** Supabase (anonymous signals, offers, contacts, opted-in outreach queue), commons library, Content Studio draft queue
* **Publishes via:** LinkedIn (personal + Kamunity page via Late.dev API), Substack, email (all human-reviewed and approved)
* **Returns via:** Resend email (gifting pipeline), direct LinkedIn engagement (human-mediated)
* **Connects to:** Kai (kamunity.org) via signal cards and generative mode
* **Does NOT touch:** PROJECTS/kamunity-org/ codebase directly — interfaces only

## Gift Inventory (what can be returned)

The triage order applies — start at Find, only reach Make as last resort:

| Tier | Gift Type | Examples |
|---|---|---|
| Find | Point to existing resource | Prosocial tech directory, sector peak body, government program |
| Connect | Introduce to someone in the network | ALIKE connection, WACOSS relationship, sector peer |
| Extend | Adapt existing Kamunity tool | Sovereignty Audit customised for their sector, AI Readiness for their board |
| Integrate | Connect to prosocial tech ecosystem | CiviCRM, Loomio, Open Food Network, Decidim setup guidance |
| Make | Build something new | FactoryK output, Vine-o-Code sprint, research report, sector brief |

Other giftable capabilities: a research sprint, a framing session, an ontological jailbreak conversation, a Vine-o-Code methodology walkthrough, legitimacy (ALIKE/WALGA relationship), sector credibility.

## Repo

Standalone. Own GitHub repo. Deploys to Netlify independently of kamunity.org.
