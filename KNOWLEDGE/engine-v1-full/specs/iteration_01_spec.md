# Iteration 01 — Spec
# Theme: The Integration Gap — Communities Need Connected Tools, Not More Tools

**Date:** 2025-02-13
**Iteration focus:** Landscape scan
**Theme rank:** #1 (score: 7)

---

## Problem Statement (Grounded in Research)

Community organisations — especially grassroots mutual aid groups — are forced to stitch together 5-10 disconnected tools (Google Sheets, Slack/WhatsApp, Airtable, Zapier, payment apps, phone hotlines) to coordinate basic operations. This creates:

1. **Technical dependency:** Systems break when the one tech-savvy volunteer leaves
2. **Data fragmentation:** Information lives in silos with no shared view
3. **Accessibility barriers:** Each additional tool adds a login, a learning curve, and an exclusion vector
4. **Sovereignty loss:** Most of these tools are commercial, data-extractive, and US-hosted

This was documented across BSS mutual aid (Brooklyn), London community groups, Australian digital inclusion research, and open-source community tool reviews. The pattern is consistent: communities know what they need to DO but lack integrated, accessible, sovereignty-respecting infrastructure to do it.

---

## What "Done" Looks Like — But Not Yet

This is Iteration 01 — a landscape scan. The spec here is **directional**, not buildable. It identifies what a solution would need to address. Subsequent iterations will drill into specific components.

A solution to the Integration Gap would need to:

1. **Unify core coordination functions** under a single accessible interface: communication, task coordination, resource sharing, decision-making, and contact/member management
2. **Remain accessible** to people whose only current digital tool is email or a phone
3. **Preserve sovereignty** — self-hostable, data-portable, open source, no vendor lock-in
4. **Support trust dynamics** — not replace in-person relationships but reduce the friction of coordination
5. **Allow progressive complexity** — simple to start, more capable as the group grows

---

## TRIAGE CHECK (Constitutional Principle #2)

### 1. FIND — Does a solution already exist?

**Loomio** — Cooperative decision-making. Open source, worker-owned cooperative. Strong sovereignty model. BUT: solves only decision-making, not coordination/communication/resource-sharing. UI is "utilitarian" and struggles with adoption among less-technical users.

**Decidim** — Participatory governance and civic engagement. Open source. Strong on democratic process. BUT: designed for municipal/institutional scale, not grassroots mutual aid. Heavy setup requirements.

**CiviCRM** — Constituent relationship management. Open source, mature. BUT: designed for formal nonprofits, steep learning curve, primarily a database not a coordination tool. Requires technical administration.

**Hylo** — Attempts integrated community coordination (posts, offers/requests, groups, maps). Open source (recently). BUT: limited adoption, unclear long-term governance model, US-centric.

**Mighty Networks** — Integrated community platform with courses, events, discussion. BUT: proprietary, expensive ($$$), creates vendor dependency. Violates sovereignty principle.

**Open Food Network** — Open source food distribution coordination. BUT: domain-specific (food systems), not general community coordination.

**Baserow/NocoDB + Loomio + Matrix** — Open source stack that could theoretically cover data + decisions + communication. BUT: requires technical integration, no unified UX, each component has its own learning curve.

**Nextdoor** — Hyperlocal community platform. BUT: proprietary, ad-funded, documented failure at community building (see research). Cautionary example, not a solution.

### 2. CONNECT — Can we connect people to an existing solution?

**Partially.** For specific needs:
- Groups needing decision-making → **Loomio** (strong recommendation)
- Groups needing civic participation → **Decidim** (if institutional scale)
- Formal nonprofits needing CRM → **CiviCRM**
- Groups needing communication → **Matrix/Element** or **Signal groups**

But NO existing tool or simple combination addresses the integrated coordination need identified in research. The gap is real.

### 3. EXTEND — Can we extend something that exists?

**Most promising candidates for extension:**

- **Loomio** — Could be extended with coordination/task features and communication. Already open source with cooperative governance. BUT: extending Loomio into a general coordination platform may conflict with its focused design philosophy.

- **Hylo** — Already attempts the integrated model. Could be extended with better accessibility, sovereignty features, and Australian community context. BUT: governance model unclear, limited community, would need to assess maintainer responsiveness.

- **CiviCRM** — Could theoretically be extended with front-end coordination features. BUT: architecture is oriented around formal nonprofit operations, not mutual aid coordination.

### 4. INTEGRATE — Can we integrate existing tools?

**The API/federation approach:** Build a thin integration layer that connects Loomio (decisions) + Matrix (communication) + a simple task/coordination tool + CiviCRM (contacts) with a unified, accessible front-end.

**Pros:** Respects each tool's strengths. Preserves sovereignty of individual components. Doesn't reinvent wheels.

**Cons:** Integration is its own complexity. Each upstream tool evolves independently. The unified UX is the hard part, and it's exactly the part you'd have to build.

### 5. BUILD — Only if none of the above work.

**Assessment:** Triage resolves at levels 3-4 (Extend or Integrate), not level 5 (Build from scratch).

The most honest answer is: **Investigate Extend (Hylo or Loomio) or Integrate (federation of existing tools) before committing to Build.** This requires deeper evaluation of specific tools in subsequent iterations.

---

## Recommended Next Steps (Not Build Instructions)

This iteration is a landscape scan. The spec does not warrant build instructions because:

1. The research has significant gaps (Indigenous community voice, rural contexts, non-English speakers)
2. Triage resolved at Extend/Integrate, which requires deeper investigation of specific tools
3. The accessibility challenge (Theme B) has no clear technical solution yet

**Iteration 02 should focus on:** Deep evaluation of Loomio and Hylo as extension candidates — their architecture, governance, community, limitations, and suitability for the integration gap identified here.

**Iteration 03 should focus on:** The accessibility-efficiency paradox (Theme B) — how do existing platforms handle low-digital-literacy users? What design patterns exist for hybrid digital/analog community infrastructure?

---

## What This Spec Does NOT Solve

- **Accessibility for digitally excluded people** — acknowledged as critical, deferred to dedicated iteration
- **Trust and relationship dynamics** — not addressable through specification
- **Governance and moderation models** — requires separate investigation
- **Cultural safety for Indigenous communities** — requires direct community engagement, not web research
- **Environmental integration** — identified in Kamunity vision but not yet grounded in research
