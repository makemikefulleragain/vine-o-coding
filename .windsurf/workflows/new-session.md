---
description: Start a new Cascade session with full context
---

# New Session Protocol

Every Cascade session starts here. This ensures the AI has current context before doing any work.

## Steps

1. Pull the Kitchen Table repo to sync any remote changes:
   - `git -C kitchen-table pull origin main`
   - This catches any commits pushed directly to the kitchen-table repo since the last session
   - (BRAIN/ and PLAN/ are the source of truth — kitchen-table/data/ is a deploy snapshot. Changes only flow BRAIN/PLAN → kitchen-table/data/, never the reverse.)

2. Read the global constitution and current state:
   - Open and read `BRAIN/CONSTITUTION.md` — the 11 inviolable principles
   - Open and read `BRAIN/STATE.md` — current pulse check

3. Check STATE.md freshness:
   - Look at the "Last Updated" date
   - If older than 7 days, flag it: "STATE.md is stale — should we update it first?"
   - If current, confirm: "STATE.md looks current as of [date]"

4. Read the active phase queue:
   - Open `PLAN/PHASE_QUEUE.md`
   - Identify which phase is ACTIVE and what's NEXT
   - Note any BLOCKED items

5. Check safety status:
   - Glance at `BRAIN/SAFETY_GATES.md`
   - Report any CRITICAL gates that are still OPEN

6. Ask the operator:
   - "What would you like to work on today?"
   - Suggest the top 1-2 priorities based on what you've read
   - If a specific project, also read its `PROJECTS/[name]/CONSTITUTION.md`

7. Before starting work, confirm:
   - Which speed? (FactoryK / Vine-o-Code / Auto-RALF)
   - Any constraints or time limits?
   - Safety gates relevant to this work?

## After the session
- Update `BRAIN/STATE.md` if anything material changed
- Log any decisions in `PLAN/DECISION_LOG.md`
- Commit changes: `git add -A && git commit -m "[brief description]"`
