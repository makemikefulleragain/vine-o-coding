# Iteration 01 — Confidence Score
# Landscape Scan: What do communities actually need?

**Date:** 2025-02-13
**Scoring rule:** Write justification BEFORE the number. (CONFIDENCE_MODEL.md, Anti-Gaming Rule #4)

---

## Dimension 1: Research Signal Strength (0-25)

**Justification:**
- 5 web searches conducted, yielding results across academic (Frontiers), sector (Beeck Center/Georgetown, WACOSS, ACOSS), community voice (Reddit threads, Medium), and platform analysis (Nextdoor, Loomio, Decidim)
- Approximately 8-10 distinct source types across Tiers 1-4
- Primary community voice present: BSS volunteer direct quotes, Reddit community organisers, London grassroots groups
- Australian context present but thin: WACOSS digital inclusion project, ACOSS digital divide brief — both address digital inclusion broadly, not community platform needs specifically
- No direct voice from digitally excluded communities (survivor bias acknowledged)
- No direct Aboriginal or Torres Strait Islander community voice

**Deductions:**
- -3 for limited Australian/local context (WACOSS/ACOSS are broad, not platform-specific)
- -3 for no voice from digitally excluded communities

**Base score:** 14 (5-7 sources, multiple perspectives, includes primary community voice)
**After deductions:** 14 - 3 - 3 = **8**

---

## Dimension 2: Source Convergence (0-25)

**Justification:**
- Strong agreement across sources that tool fragmentation is a real problem
- Strong agreement that accessibility and digital inclusion are barriers
- Strong agreement that data sovereignty matters
- Strong agreement that trust/relationships are foundational
- Divergence on solutions: some sources imply "build better tools," others imply "build capacity to use existing tools," others imply "the problem isn't technical"
- The convergence is on PROBLEMS, not on SOLUTIONS — this places us at 11-15 range ("sources agree on the need but diverge on approach")

**Deductions:**
- -3 for possible echo chamber: community tech discourse tends to attract people who believe in tech solutions. Those who rejected digital tools entirely are not represented.

**Base score:** 13 (agree on need, diverge on approach)
**After deductions:** 13 - 3 = **10**

---

## Dimension 3: Constitutional Alignment (0-25)

**Justification:**
- Spec explicitly applies sovereignty principle throughout
- Triage was applied honestly — resolved at Extend/Integrate, not Build
- Harm potential was assessed (low at current stage)
- Transparency maintained — all queries, sources, and reasoning logged
- Critique identified and flagged buildability bias (Constitution Principle 4)
- Critique identified the spec's tendency toward technical framing over capacity-building
- The spec does NOT actively exemplify all Constitutional principles — it's directional, not fully formed

**Deductions:**
- No deductions warranted. Triage was honestly applied. Sovereignty was explicitly considered. Harm potential was assessed.

**Base score:** 17 (actively serves sovereignty, transparency, and community ownership, but not yet exemplary)
**After deductions:** **17**

---

## Dimension 4: Triage Honesty (0-25)

**Justification:**
- Triage evaluated 8 specific existing solutions by name (Loomio, Decidim, CiviCRM, Hylo, Mighty Networks, Open Food Network, Baserow/NocoDB stack, Nextdoor)
- Triage resolved at Extend/Integrate (levels 3-4), not Build (level 5)
- The critique further challenged whether Connect (level 2 — capacity building on existing tools) was dismissed too quickly
- The recommendation is to investigate Hylo and Loomio extension before building — this is honest triage
- However: evaluation of existing solutions was breadth-first, not depth-first. None were tested or evaluated in detail. Hylo especially needs much deeper assessment.

**Deductions:**
- No deductions warranted. Existing solutions were named and compared. No premature Build recommendation.

**Base score:** 16 (thorough triage; clear documentation of why existing solutions don't fully meet the need)
**After deductions:** **16**

---

## TOTAL SCORE

| Dimension | Score |
|-----------|-------|
| Research Signal Strength | 8 |
| Source Convergence | 10 |
| Constitutional Alignment | 17 |
| Triage Honesty | 16 |
| **TOTAL** | **51** |

---

## Routing: ESCALATE (40-59 range)

Per ENGINE.md: "Do NOT write build instructions. Write an escalation brief explaining the ambiguity."

**This is expected and appropriate for a landscape scan.** The first iteration casts a wide net. A score of 51 reflects:
- Real but incomplete research (signal and convergence are honest but limited)
- Strong constitutional alignment (the process is working correctly)
- Honest triage (existing solutions were seriously evaluated)

The ambiguity is genuine: the research identifies clear problems but the solution space remains wide open. Multiple equally valid paths exist (Extend Loomio, Extend Hylo, Integrate existing tools, Focus on capacity building, Seek more community voice before deciding). This is exactly the kind of ambiguity the escalation threshold is designed to catch.

---

## What Would Raise Confidence for Iteration 02

1. **Direct evaluation of Hylo and Loomio** — architecture, governance, community health, extensibility (+5-8 signal)
2. **Australian community organisation voice** — even one direct source from WACOSS network, community houses, or Aboriginal organisations (+3-5 signal, +3 convergence)
3. **Testing the "capacity building vs. platform" question** — are communities asking for a new tool, or for help using existing tools? (+3-5 convergence)
4. **Addressing digitally excluded community voice** — via digital inclusion studies that report community testimony (+3 signal)
