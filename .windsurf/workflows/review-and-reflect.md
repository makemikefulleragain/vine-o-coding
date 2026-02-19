---
description: Review and Reflect protocol — triggered when a phase fails UAT, a bug takes >2 attempts to fix, or an architectural assumption is proven wrong
---

# Review & Reflect Protocol

This is the engine's Andon cord. When something systemic goes wrong, don't patch — stop, understand, adjust the process, then resume from a known-good state.

## When to Trigger

- A bug takes **more than 2 attempts** to isolate or fix
- A phase **fails UAT** after being marked complete
- An **architectural assumption** is proven wrong during build
- The engine is **symptom-chasing** instead of root-cause fixing

## Steps

### 1. STOP
- Halt all code changes immediately
- Do not attempt another fix

### 2. DOCUMENT (write to `phases/phase-XX/review-reflect.md`)

Answer these five questions:

**What happened?**
- Factual description of the failure, not interpretation
- Include the sequence of attempted fixes

**What was the root cause?**
- Distinguish between the proximate cause (the bug) and the systemic cause (why the bug existed and wasn't caught)

**Why didn't the normal flow catch it?**
- What test, check, or verification was missing?
- Was the phase marked complete without proof of working?

**What process changes are needed?**
- Tests to add
- Phase structure changes
- Architecture changes
- Workflow changes

**What is the reset point?**
- The last assessed-to-be-solid state
- What needs to be reverted
- What documentation should be preserved

### 3. RESET
- Revert code to the identified reset point
- Keep all documentation (research, triage, spec, critique) — the thinking is valid even if the implementation failed
- Update `STATE.md` and `PHASE_QUEUE.md` to reflect the reset

### 4. RESTRUCTURE
- Insert any new phases needed (e.g., infrastructure, refactoring)
- Add testing requirements to phase acceptance criteria
- Update `CONSTITUTION.md` if technical constraints need to change (with evidence)

### 5. RESUME
- Proceed with the updated phase queue
- The first thing built in the resumed phase should be the test that would have caught the original failure

## Principles

- **Resetting is not failure.** Building on a broken foundation wastes more time than going back.
- **Preserve the thinking.** Research, specs, and designs are valuable even when implementation needs rework.
- **Fix the process, not just the bug.** If the same class of failure could happen again, the process needs to change.
- **Every reset should make the engine stronger.** The R&R document becomes a learning artifact for future phases.
