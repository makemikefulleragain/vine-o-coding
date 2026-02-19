# Iteration 02 — Self-Critique

**Date:** 2025-01-27
**Spec under review:** iteration_02_spec.md ("Coordination Support Gap — Capacity First, Then Tools")
**Constitution re-read:** Yes, confirmed before this critique

---

## 1. Seven Constitutional Questions

### Q1: Does this create dependency? (Sovereignty First)

**Answer: Low risk, but not zero.**

The spec explicitly avoids platform dependency by recommending "neither build nor adopt yet." A capacity-building program centred on peer learning and governance literacy is inherently non-dependent — communities learn skills they own.

**Residual risk:** If KomUnity becomes the sole provider of coordination support, that itself creates dependency. The spec should ensure any capacity-building model is replicable and community-owned, not KomUnity-owned.

**Verdict: PASS with caveat**

### Q2: Did we honestly complete Triage? (Triage Before Build)

**Answer: Yes — Triage led to "don't build yet."**

The spec documents 5 existing solutions that partially address the gap (Infoxchange, Hylo, NTEN, Loomio, Community Houses). It concludes that none fully cover the specific gap identified (peer-led coordination support for Australian grassroots groups). But rather than jumping to Build, it recommends Listen First.

This is the Constitution working as designed: "The best outcome of any iteration might be: 'We should not build this.'"

**Verdict: PASS**

### Q3: Are we grounded in real voices? (Real Voices, Not Assumptions)

**Answer: Partially — and this is the biggest weakness.**

The spec is grounded in:
- Sector reports (Infoxchange 2025 data via Liferay)
- Practitioner voices (Reddit, COVID mutual aid research from I01)
- Platform self-descriptions (Hylo About, Open Collective)

The spec is NOT grounded in:
- Direct Australian community practitioner voices (3 PDF sources unreadable)
- Indigenous Australian perspectives (no sources accessed)
- Actual Hylo users (no testimonials found)

The spec acknowledges this gap and makes "listen first" the top recommendation. But the gap is real: across 2 iterations, zero direct Australian community voices have been obtained.

**Verdict: PARTIAL PASS — acknowledged gap, correct response (listen first), but the gap persists**

### Q4: Are we privileging the measurable over the important? (The Illegible Matters)

**Answer: Risk is moderate.**

The spec centres trust, relationships, and governance — all illegible qualities. It does NOT reduce success to metrics like "number of tools adopted" or "digital literacy scores."

However, the Australian NFP data (22% measure impact, 20% have IT plans) is inherently quantitative. There's a risk of treating these statistics as the full picture when the actual coordination struggles of community groups are more textured and relational than any number captures.

**Verdict: PASS with awareness**

### Q5: Could this be used to harm? (Harm Prevention)

**Answer: Low risk.**

A capacity-building program has low direct harm potential. It doesn't collect data, build surveillance, or concentrate power. The "listen first" approach is inherently consent-based.

**Residual risk:** If "coordination needs assessment" is designed poorly, it could become a data extraction exercise. Must be designed as a community reflection tool, not a survey for KomUnity's benefit.

**Verdict: PASS**

### Q6: Is reasoning traceable? (Transparency)

**Answer: Yes.**

All research queries logged in iteration_02_raw.md. Synthesis reasoning documented in iteration_02_themes.md. Spec decisions traceable to specific research findings. This critique documents the self-assessment.

**Verdict: PASS**

### Q7: Did we skip to Build? (Triage Before Build — redundancy check)

**Answer: No.** The spec explicitly recommends against building. The recommended next steps are all research and community engagement, not development.

**Verdict: PASS**

---

## 2. Trust Constraint Test

The human directive from Iteration 01 escalation: Trust is a cross-cutting constraint on all specs, not a separate theme.

| Spec Element | Trust Constraint Applied? | How? |
|-------------|--------------------------|------|
| Problem statement | Yes | Frames the gap as capacity/governance, not just tools — trust requires competence |
| "Done" looks like | Yes | Centres governance, peer support, meeting people where they are |
| Triage check | Yes | Evaluates existing solutions' trust architecture |
| Build decision | Yes | "Don't build yet" avoids creating untrusted new infrastructure |
| Next steps | Yes | "Listen first" is itself a trust-building act |
| What spec doesn't solve | Yes | Explicitly flags Indigenous data sovereignty as requiring direct engagement |

**Trust constraint verdict: Satisfied.** The spec treats trust as a precondition, not a feature.

---

## 3. Bias Identification

### Bias 1: Research Method Bias
Three critical Australian sources were PDF/binary and inaccessible. This systematically excludes the most authoritative sector reports. The accessible sources (Liferay blog, Hylo website) are less authoritative and potentially biased toward their own products/approaches.

**Severity: High.** The synthesis is built on incomplete evidence, skewed toward sources that are web-accessible and English-language.

### Bias 2: Values Alignment Bias
Hylo's stated values closely mirror the KomUnity Constitution. This creates a risk of confirmation bias — we may be drawn to Hylo because it sounds like us, not because it's the right solution for Australian communities.

**Severity: Medium.** Mitigated by the spec's honest assessment of Hylo's gaps (no AU presence, sustainability risk, no user data).

### Bias 3: Deficit Framing Bias
The "Coordination Support Gap" framing, while better than "Integration Gap," still frames communities as lacking something. Many communities coordinate effectively through informal means (WhatsApp groups, phone trees, physical gatherings) that don't register in technology-focused research.

**Severity: Medium.** The spec's recommendation to "start from where they are" partially addresses this, but the overall framing could be more strengths-based.

### Bias 4: Northern Hemisphere Source Dominance
Hylo (US), NTEN (North America), Beeck Center (US), Reddit (US-dominated). The Australian-specific sources we needed were mostly inaccessible. The research base is disproportionately shaped by Northern Hemisphere contexts.

**Severity: High.** This directly undermines the goal of grounding KomUnity in Australian community needs.

---

## 4. Proposed Revisions for Iteration 03

1. **Source access:** Find alternative ways to access Australian sector data — HTML summaries, news articles citing the reports, or request human assistance to extract key findings from PDFs.
2. **Strengths-based reframe:** Consider reframing from "Coordination Support Gap" to something that acknowledges existing community strengths (e.g., "Coordination Enhancement" or "Digital Complement to Existing Coordination").
3. **Community listening design:** If proceeding to Iteration 03, the priority should be designing the community conversation framework — what questions to ask, who to ask, how to ensure the process itself builds trust.
4. **Hylo hands-on test:** If community listening reveals relevant needs, conduct an actual hands-on evaluation of Hylo with a test group rather than relying on self-description.
5. **Indigenous engagement protocol:** Before any engagement with Aboriginal community-controlled organisations, research and adopt appropriate engagement protocols (e.g., AIATSIS guidelines for ethical research).

---

## 5. Overall Assessment

**Strengths of this iteration:**
- Reframe from "Integration Gap" to "Coordination Support Gap" improved honesty
- Hylo deep-dive was thorough on governance, values, team
- Capacity-building lens produced a genuinely different recommendation than tool-first thinking
- Trust constraint was applied throughout, not bolted on
- Triage produced the constitutionally correct answer: "don't build yet"

**Weaknesses:**
- Australian voice gap persists and is the critical blocker
- Research base still skewed toward accessible, Northern Hemisphere sources
- No user testimony for any platform (Hylo, Loomio, etc.)
- Central tension "resolved" by sequencing (capacity first, then tools) rather than truly resolved through community input
