# COMMUNITY SIGNAL SYSTEM — MISSION

## What

A five-layer sensing, matching, making, and routing system that runs underneath Kai. It listens to Perth's community sector, finds patterns, generates useful things in response, and connects people who need help with people who can give it.

## Who It Serves

Operations coordinators, CEOs, and workers in Western Australian community sector organisations — particularly small NFPs (under 20 staff) who don't have dedicated tech people. The person evaluating this in a 3-minute window between meetings.

## Who It Does NOT Serve

Vendors. Platforms seeking data. Anyone who wants to extract value from community signal. This system is structurally incapable of surveillance — not by policy, by architecture.

## Why

99% of value exchange in communities is latent and invisible to current systems. Orgs solving the same problems don't know each other exist. Patterns that could generate useful templates, policies, and tools go unrecognised because no one is listening at scale. Communities are tenant farmers in the compute economy — renting tools that extract their data and lock them in.

This system makes the invisible visible without making the private public.

## Done Condition

The system is done when:

1. Kai can tell you what Perth's community sector is worried about this week — grounded in real signal, not hallucination
2. When 5+ orgs independently ask about the same thing, a useful template/tool/resource exists within 48 hours — made or found, not just pointed at
3. When Person A needs something and Person B has it, the connection happens — with consent, transparency, and a human in the loop
4. When Mike is unavailable, the system still functions — the Mob carries it
5. When the system fails, it fails honestly — "we don't have capacity this week" not silence

## Constitutional Grounding

This project operates under BRAIN/CONSTITUTION.md. Specifically:

* **Principle 1 (Sovereignty):** Communities own their signal. No extraction.
* **Principle 2 (Triage):** Find → Connect → Extend → Integrate → Make. We don't build what already exists.
* **Principle 6 (Transparency):** Every match discloses its reasoning. Every publication is human-reviewed.

## Interfaces

* **Reads from:** BRAIN/ECOSYSTEM.md, KNOWLEDGE/ecosystem-state.json
* **Writes to:** Supabase (anonymous signals, offers, contacts), commons library
* **Connects to:** Kai (kamunity.org) via signal cards and generative mode
* **Publishes via:** Substack, LinkedIn, email (all human-reviewed)
* **Does NOT touch:** PROJECTS/kamunity-org/ codebase directly — interfaces only

## Repo

Standalone. Own GitHub repo. Deploys to Netlify independently of kamunity.org.

