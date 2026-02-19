# Iteration 01 — Escalation Brief
# Confidence Score: 51/100 — Genuine Ambiguity Requires Human Input

**Date:** 2025-02-13
**Phase reached:** All 6 phases completed. Escalating per confidence routing.

---

## What Was Found

The landscape scan identified 5 themes from 5 web searches across academic, sector, community voice, and platform analysis sources:

1. **The Integration Gap** (highest signal) — Communities stitch together 5-10 disconnected tools and the system breaks when the tech-savvy volunteer leaves
2. **The Accessibility-Efficiency Paradox** — Digital tools exclude the people who most need community support
3. **Data Sovereignty** — Communities need to own their data and processes; strong frameworks exist (Indigenous data sovereignty, platform cooperativism)
4. **Trust Resists Platforming** — Trust and relationships are foundational but cannot be built by technology; Nextdoor is the cautionary tale
5. **Governance/Moderation** — Good tools exist (Loomio, Decidim) but adoption, not technology, is the bottleneck

---

## Why Confidence Is Below 60

### 1. The research has significant voice gaps
- **No direct Aboriginal or Torres Strait Islander community voice** about platform needs. Indigenous data sovereignty frameworks were found in academic literature, but no direct community testimony from Australian Indigenous organisations.
- **No voice from digitally excluded communities.** The people most affected by the accessibility paradox don't write blog posts or Reddit threads. WACOSS/ACOSS research addresses digital inclusion broadly but not community platform needs specifically.
- **Dominated by US/UK sources.** Australian community context is thin.
- **No rural/remote community perspective.** Most sources describe urban organising.

### 2. Multiple equally valid paths exist
The research supports at least four distinct responses, and I cannot determine which is correct without human judgment:

**Path A: Extend Hylo** — Hylo already attempts integrated community coordination. Investigate whether it meets 70%+ of the need and contribute to it rather than building from scratch.

**Path B: Extend Loomio** — Loomio has the strongest sovereignty model (worker-owned cooperative, open source). Investigate whether decision-making can be extended into broader coordination.

**Path C: Integrate existing tools** — Build a thin, open-source integration layer connecting Loomio (decisions) + Matrix (communication) + simple coordination tools. Unified accessible front-end.

**Path D: Don't build — invest in capacity** — The tool fragmentation problem might be better addressed by training, documentation, and community-of-practice support for existing tools, rather than by building another tool.

These paths are not just technically different — they reflect different **values priorities**:
- Path A optimises for speed-to-impact
- Path B optimises for sovereignty and governance alignment
- Path C optimises for modularity and choice
- Path D optimises for humility and non-technical intervention

**This is a political question, not a technical one.** It's above the engine's pay grade.

### 3. Buildability bias detected
The critique identified that the theme ranking favours buildable problems over important-but-illegible ones. Trust (Theme D) scored lower than Integration Gap (Theme A) partly because trust is harder to spec. The Constitution warns against exactly this: "Am I scoring this because it's important, or because it's measurable?"

---

## What Human Input Is Needed

### Decision 1: Which path to investigate in Iteration 02?
- **A (Extend Hylo)**, **B (Extend Loomio)**, **C (Integrate)**, or **D (Capacity building)**?
- Or: investigate A and B in parallel? Or A and D?
- The engine cannot make this choice because it's a values decision about what kind of intervention Kamunity should be.

### Decision 2: How to address voice gaps?
- Should the engine search specifically for Australian community sector sources in Iteration 02?
- Are there specific organisations, networks, or publications the human knows about that the engine should search for?
- Is direct community engagement (outside the engine's scope) needed before proceeding?

### Decision 3: Is the "Integration Gap" framing correct?
- The critique raised the possibility that the research evidence supports "capacity building on existing tools" just as strongly as "build/extend an integrated platform."
- Does the human's understanding of Kamunity's purpose align with the Integration Gap framing, or is a different framing more appropriate?

---

## Recommendation

**If forced to choose:** Investigate Path A (Hylo) and Path D (capacity building) in parallel in Iteration 02. This tests the most actionable technical path against the most constitutionally humble non-technical path. Whichever yields higher confidence should guide Iteration 03.

**But I'd rather not be forced to choose.** This is genuinely ambiguous, and the engine is designed to escalate genuine ambiguity rather than push through it.

---

## Files Written This Iteration

- `research/iteration_01_raw.md` — Raw research findings (7 findings, contradictions, gaps)
- `synthesis/iteration_01_themes.md` — 5 themes ranked with signal strength
- `specs/iteration_01_spec.md` — Directional spec for Integration Gap with full Triage
- `critiques/iteration_01_critique.md` — Self-critique answering all 7 Constitutional questions
- `confidence/iteration_01_score.md` — Score breakdown: 51/100
- `escalations/iteration_01_escalation.md` — This file
