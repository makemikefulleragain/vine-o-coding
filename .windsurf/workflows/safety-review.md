---
description: Full safety gates review and STATE.md update
---

# Safety Review — Check All Gates

Runs through every safety gate in SAFETY_GATES.md, updates status, and flags blockers.

## Steps

1. Read the current safety state:
   - Open `BRAIN/SAFETY_GATES.md` — read all 16 gates
   - Open `BRAIN/STATE.md` — read the Safety Status section
   - Cross-reference with Kitchen Table safety data in `kitchen-table/js/data.js`

2. For each gate, check:
   - Is the status still accurate? (PASS / FAIL / OPEN / NOT YET TESTED)
   - Has anything changed since last review?
   - If FAIL or OPEN: what's the resolution path? Is it blocked by something?

3. Focus on CRITICAL gates (these block ALIKE showcase):
   - G1: Crisis protocol — WA crisis numbers hardcoded in Kai
   - G2: Prompt injection — 3 adversarial scenarios tested
   - G3: Disclaimer text — visible on all public-facing sites
   - G4: ALIKE-specific — demo safe for disability sector audience

4. Check HIGH gates:
   - G5-G8: Data handling, emotional dependency, cultural safety, incident response

5. Report summary:
   - "Safety Review [date]: [X] PASS, [Y] FAIL, [Z] NOT YET TESTED"
   - List any gates whose status changed
   - Identify the #1 safety priority right now

6. Update documents:
   - Update `BRAIN/SAFETY_GATES.md` with any status changes
   - Update `BRAIN/STATE.md` Safety Status section
   - Log any safety decisions in `PLAN/DECISION_LOG.md`

7. If any CRITICAL gate is newly FAILING:
   - Flag immediately: "⚠️ CRITICAL safety gate [X] is failing — this blocks [Y]"
   - Suggest immediate action
   - Consider whether to halt other work until resolved

// turbo
8. Commit: `git add -A && git commit -m "safety review: [date] — [summary]"`
