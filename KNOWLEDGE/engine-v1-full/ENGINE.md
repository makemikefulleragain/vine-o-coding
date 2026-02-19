# ENGINE.md
# RALF Loop Specification — Research, Attempt, Learn, Forward

---

## Overview

This engine runs an autonomous research-driven development loop. Each iteration:
1. Researches expressed community needs
2. Synthesises findings into actionable themes
3. Specs a buildable next step
4. Self-critiques against the Constitution
5. Scores confidence
6. Either proceeds, flags, or escalates

**Read CONSTITUTION.md before every iteration.**

---

## Loop Structure

### Phase 1: RESEARCH

**Goal:** Mine the web and available sources for expressed community needs related to the current focus area.

**Sources (in priority order):**
1. Academic research and sector reports (WACOSS, ACOSS, government consultations)
2. Community organisation peak bodies and publications
3. Prosocial tech project documentation (what they got right and wrong)
4. Reddit, forums, community discussion spaces (raw unfiltered voice)
5. Failed platform post-mortems and user complaints
6. News and journalism about community tech

**Process:**
- Run 5-8 targeted web searches
- For each result, extract: the expressed need, who expressed it, what context, what was tried before, why it failed
- Note contradictions — where communities disagree with each other
- Note gaps — what's conspicuously absent from the discourse

**Output:** Write findings to `research/iteration_XX_raw.md`

---

### Phase 2: SYNTHESISE

**Goal:** Cluster research findings into actionable themes with signal strength.

**Process:**
- Group related findings into themes (e.g., "people want local discovery but hate algorithmic feeds")
- For each theme, assess:
  - **Signal strength:** How many independent sources express this? (1-2 = weak, 3-5 = moderate, 6+ = strong)
  - **Convergence:** Do sources agree on what's needed, or just that something's wrong? (high/medium/low)
  - **Existing solutions:** What already addresses this? How well?
  - **Buildability:** Could this be addressed with technology, or is it fundamentally relational?
- Rank themes by: (signal strength × convergence) - existing solution adequacy

**Cross-cutting constraints:** Carry forward any themes from previous iterations that were identified as constraints (not just specs). For example, if a previous iteration identified "trust" as illegible-but-essential, apply it as a filter on all new themes.

**Output:** Write to `synthesis/iteration_XX_themes.md`

---

### Phase 3: SPEC

**Goal:** Take the highest-ranked theme and translate it into a buildable micro-spec.

**Process:**
- Write a clear problem statement grounded in the research
- Define what "done" looks like — acceptance criteria that are testable
- Apply the Triage check: Find → Connect → Extend → Integrate → Build
- If Triage resolves before Build, document what you found and why building is unnecessary
- If Build is warranted, write: what to build, what stack, what the minimal viable version looks like
- Include what this does NOT solve and why that's okay for now

**Output:** Write to `specs/iteration_XX_spec.md`

---

### Phase 4: CRITIQUE

**Goal:** Argue against your own spec. Honestly.

**Process:**
- Read CONSTITUTION.md again
- Ask each of these questions and answer honestly:
  1. Does this serve community sovereignty, or does it create dependency?
  2. Am I building because it's needed, or because building is what I do?
  3. Does something already exist that does this well enough?
  4. Could this be misused to concentrate power or extract value?
  5. Am I optimising for the measurable at the expense of the illegible?
  6. Would a real community organisation actually use this? Why or why not?
  7. Is the need I identified real, or did I construct it from cherry-picked sources?
- If any answer raises a flag, revise the spec or recommend against building

**Output:** Write to `critiques/iteration_XX_critique.md`

---

### Phase 5: CONFIDENCE SCORE

**Goal:** Assess your confidence in the current spec and route accordingly.

**Scoring factors:**
- Research signal strength (0-25)
- Source convergence (0-25)
- Constitutional alignment (0-25)
- Triage honesty (0-25)

**Total: 0-100**

**Routing:**
- **80-100:** Write build instructions. Proceed to Phase 6.
- **60-79:** Write build instructions with uncertainty flags. Proceed to Phase 6 with review request.
- **40-59:** Do NOT write build instructions. Write an escalation brief explaining the ambiguity. STOP.
- **0-39:** Constitutional review. Something is wrong with the framing. STOP.

**Output:** Write to `confidence/iteration_XX_score.md`

---

### Phase 6: FORWARD

**Goal:** Prepare the output for the next step.

**If proceeding (80+):**
- Write build instructions to `builds/iteration_XX_build.md`
- Update `LEARNING_LOG.md` with what was learned
- Update `STATE.md` with current position
- Identify the next research focus for the next iteration

**If flagging (60-79):**
- Write build instructions with explicit uncertainty markers
- Write a human review brief to `reviews/iteration_XX_review.md`
- Update `LEARNING_LOG.md`
- WAIT for human input before next iteration

**If escalating (below 60):**
- Write escalation brief to `escalations/iteration_XX_escalation.md`
- Update `LEARNING_LOG.md`
- STOP. Do not proceed.

---

## Iteration Management

- Each iteration gets a sequential number (01, 02, 03...)
- All files for an iteration use the same number
- `STATE.md` always reflects where we are
- `LEARNING_LOG.md` accumulates across iterations
- Never delete previous iteration files — they are the trail

---

## Recognising the Handoff Point

There will come an iteration where the most valuable next action is fundamentally human, not agentic — conducting community conversations, attending meetings, building relationships. When you reach this point:

1. Name it explicitly: "The next useful action requires human engagement, not more research."
2. Design what the human engagement should look like — questions, who to talk to, what to listen for.
3. Prepare materials that support the human engagement — conversation guides, context briefs, one-pagers.
4. Then STOP and hand off. Do not simulate community input. Do not substitute more web research for actual human conversation.

This handoff is not a failure of the engine. It is the engine fulfilling its purpose: getting to the point where human action is the clear next step, with the best possible preparation.

### Alternative: Structured Web Listening

When direct human community engagement is the ideal next step but would create a bottleneck, the engine may conduct **structured web listening** as a substitute — mining existing community discourse from forums, social media, local government consultation portals, community newsletters, and organisational publications.

This is NOT equivalent to community conversation. It must be flagged as web-derived voice, not direct testimony. But it can:
- Surface expressed needs that already exist in public discourse
- Reduce the number of direct conversations needed by identifying patterns first
- Test whether the engine's previous findings hold when exposed to more diverse sources
- Provide input with known properties for evaluating the engine's own reliability

When using structured web listening, apply the same source hierarchy from RESEARCH_PROTOCOL.md and flag all findings as Tier 3 (Lived Experience) unless they come from organisational publications (Tier 1-2).

---

## First Iteration Focus

Start with the broadest question: **What do communities actually need from a platform like Kamunity?**

Don't narrow too early. The first iteration is a landscape scan. Subsequent iterations will drill into the highest-signal themes.
