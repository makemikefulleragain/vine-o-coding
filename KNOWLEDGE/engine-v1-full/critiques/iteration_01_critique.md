# Iteration 01 — Critique
# Self-Assessment Against the Constitution

**Date:** 2025-02-13
**Constitution re-read:** Yes, immediately before writing this critique.

---

## Question 1: Does this serve community sovereignty, or does it create dependency?

**Assessment: MOSTLY ALIGNED, with a caution.**

The spec explicitly resolved Triage at Extend/Integrate rather than Build. It recommends investigating Loomio and Hylo — both open source — before building anything. The sovereignty principle is embedded in the recommended approach.

**Caution:** The "integration layer" concept (connecting Loomio + Matrix + CiviCRM) could itself become a dependency point. If Kamunity becomes the glue that holds a community's toolstack together, removing Kamunity breaks everything. This needs to be addressed in subsequent iterations — the integration layer itself must be sovereignty-respecting (open source, replaceable, data-portable).

---

## Question 2: Am I building because it's needed, or because building is what I do?

**Assessment: GENUINE RISK — flagging this honestly.**

The synthesis identified "Integration Gap" as the #1 theme. But I notice that "integration" is inherently a BUILDING frame. I clustered research findings in a way that points toward "build something that connects things" rather than, for example, "help communities learn to use Loomio effectively" (which is a Connect/Capacity-building frame, not a Build frame).

The BSS case study shows that communities CAN stitch tools together — and they DID, successfully. The pain is real (technical volunteer dependency), but the solution might be better documentation, training, and community of practice rather than a new platform.

**Self-check:** Am I scoring the Integration Gap highly because it's the most buildable theme? The Accessibility-Efficiency Paradox (Theme B) and Trust (Theme D) are arguably more important but less buildable. Per Constitution Principle 4: "Am I scoring this because it's important, or because it's measurable?"

**Honest answer:** Possibly. The Integration Gap is the most actionable theme for a technical engine. That doesn't make it the most important theme for communities.

---

## Question 3: Does something already exist that does this well enough?

**Assessment: PARTIALLY.**

- **Hylo** attempts exactly this — integrated community coordination. It deserves much deeper evaluation before we proceed. If Hylo already does 70% of what's needed, the answer is "use Hylo and contribute to it," not "build Kamunity."
- **Loomio** is excellent for its domain. The question is whether communities need ONE integrated tool or whether they need BETTER SUPPORT using existing tools.
- **The WhatsApp + paper flyers model** actually works for many communities. BSS served 1,400 households. The question "do communities need a platform?" has not been definitively answered — many communities say they need better coordination, but they may mean "we need another volunteer," not "we need another app."

**Flag:** The spec should more seriously consider "capacity building and training on existing tools" as the Triage-level-2 (Connect) answer. I may have moved past Connect too quickly.

---

## Question 4: Could this be misused to concentrate power or extract value?

**Assessment: LOW RISK at current stage, but requires vigilance.**

The spec doesn't propose building anything yet. The direction (Extend/Integrate open source tools) inherently resists power concentration.

**Future risk:** An "integration layer" could become a chokepoint. If the integration is proprietary or complex, whoever controls it controls community access to their own tools. The spec must insist on open standards and data portability at the integration layer, not just the individual tools.

---

## Question 5: Am I optimising for the measurable at the expense of the illegible?

**Assessment: YES, partially.**

The theme ranking scored Trust (Theme D) at 4 — lower than Integration Gap (7) — primarily because trust has low "buildability." But the Constitution says: privilege the important over the measurable.

Every source I read said trust and relationships are the foundation. BSS chose "conversations with neighbors — even at the expense of efficiency." Nextdoor failed because it optimised engagement metrics over community wellbeing.

**Corrective:** Theme D (Trust) should not be treated as a lower-priority spec. It should be treated as a CONSTRAINT on all other specs. Any integration solution must be evaluated against: "Does this support or undermine trust-based relationships?"

The synthesis document notes this but the theme ranking doesn't fully reflect it. This is a limitation of the scoring methodology, not a failure of the research.

---

## Question 6: Would a real community organisation actually use this?

**Assessment: UNCERTAIN — this is the key question I cannot answer from web research alone.**

The spec doesn't propose a specific tool yet, so this question is premature. But at the directional level:

- A mutual aid group that currently uses WhatsApp + Google Sheets might adopt a simpler integrated tool IF it reduced their coordination burden AND was easy to set up AND didn't require a technical volunteer to maintain.
- A formal nonprofit might adopt CiviCRM extensions IF their existing CRM is failing them.
- An Aboriginal Community Controlled Organisation has needs I have not yet researched directly. I cannot answer this question for them.

**Critical gap:** I have not spoken to (or found direct testimony from) a single Australian community organisation about their specific platform needs. The research is dominated by US and UK sources. This significantly limits applicability.

---

## Question 7: Is the need I identified real, or did I construct it from cherry-picked sources?

**Assessment: THE NEED IS REAL. The framing may be constructed.**

The tool fragmentation problem is independently documented across multiple continents, community types, and source tiers. It's not cherry-picked.

HOWEVER — I framed this as an "Integration Gap" (suggesting a technical solution) rather than, say, a "Coordination Support Gap" (suggesting capacity building) or a "Digital Literacy Gap" (suggesting training). The same evidence could support any of these framings. I chose the one that's most amenable to technical action because I am a technical engine.

**Self-correction:** The next iteration should explicitly consider non-technical responses to the same research findings. "Build an integration layer" is one possible response. "Create a guide for community groups on how to use Loomio + Matrix effectively" is another. "Fund digital literacy training" is a third. Triage demands we evaluate all three.

---

## Summary: Should the Spec Proceed?

**Verdict: Proceed with caution, but the spec is DIRECTIONAL, not actionable.**

The spec correctly identifies that this iteration is a landscape scan and does not propose build instructions. The Triage was applied honestly and resolved at Extend/Integrate. The research signal is real and convergent.

**Key revisions based on critique:**
1. Next iteration must seriously evaluate Hylo before proposing anything new
2. Next iteration must consider non-technical responses (capacity building, training, documentation)
3. Trust (Theme D) must be treated as a constraint on all future specs, not a lower-priority theme
4. Australian and Indigenous community voice must be sought directly — web research from US/UK sources is insufficient
5. The "buildability" bias in theme ranking should be acknowledged and corrected

**Confidence impact:** The critique lowers my confidence from what it would otherwise be. The research is solid, but the framing has identifiable biases toward technical solutions, and significant community voice gaps remain.
