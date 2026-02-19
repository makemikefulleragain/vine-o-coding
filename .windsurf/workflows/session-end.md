---
description: End-of-session review, cleanup, and commit — the source-of-truth confirmer
---

# Session End — Close The Loop

Every Cascade session should end here. This ensures nothing drifts and the source of truth stays true.

## Steps

1. **Session summary — what changed?**
   - List the files created, modified, or moved this session
   - Summarise in 2-3 bullet points: what was the goal, what got done, what's still open

2. **STATE.md check:**
   - Open `BRAIN/STATE.md`
   - Does it reflect what just happened?
   - Update: Campfire Architecture Status, infrastructure, honest numbers, session highlight
   - Update "Last Updated" timestamp

3. **Safety gate check:**
   - Did this session affect any safety items?
   - If yes: update `BRAIN/SAFETY_GATES.md` with new status
   - If a CRITICAL gate was resolved or newly broken, flag it

4. **Decision log:**
   - Were any significant decisions made this session?
   - If yes: append to `PLAN/DECISION_LOG.md` with rationale
   - Format: `| DEC-XX | [date] | [decision] | [rationale] | [affected area] |`

5. **Phase queue check:**
   - Did this session complete or advance a phase?
   - If yes: update `PLAN/PHASE_QUEUE.md` status
   - Any new blockers discovered?

6. **WHATS_NEXT.md check:**
   - Did this session complete any nerve centre roadmap item?
   - If yes: mark it ✅ DONE with date

7. **NERVE_CENTRE_MAP.md check:**
   - Were any files or folders added/moved?
   - If yes: update the map to reflect the new structure

8. **Uncommitted changes check:**
   - Run `git status` — are there uncommitted changes?
   - If yes: stage and commit with a descriptive message
// turbo
   - `git add -A`
   - `git commit -m "[session summary]"`

9. **Handoff note:**
   - Is there anything the next session needs to know that isn't in STATE.md?
   - If yes: add a "Next Session Should..." note to STATE.md
   - Confirm: "Source of truth confirmed. Everything committed. Ready for next session."
