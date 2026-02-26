# WINDY MISSION: Community Signal System — Phase 0 (Scaffolding)

**Date:** Feb 26, 2026
**From:** Opus encounter (N++ session) via Mike
**Priority:** HIGH — this is the next major build after Kitchen Table stabilisation

---

## Context

We're building a five-layer community signal system that runs underneath Kai. It senses what Perth's community sector needs, finds or makes useful things in response, and connects people — all with human review at every step.

The full spec is in PROJECTS/community-signal/SPEC.md (v4.0).

---

## Your First Task: Phase 0 — Verify and Complete Scaffolding

**Do NOT write any code yet.**

The following documents have been prepared by the Opus encounter. Your job is to:

1. Read BRAIN/CONSTITUTION.md first
2. Read each document below
3. Flag any conflicts with BRAIN/CONSTITUTION.md
4. Flag any gaps or inconsistencies between documents
5. Confirm the scaffolding is complete and internally consistent

### Documents to verify:

```
PROJECTS/community-signal/
├── SPEC.md                              ← The v4.0 spec (master document)
├── MISSION.md                           ← Purpose, who, why, done condition
├── PHASES.md                            ← Build queue with done conditions per phase
├── ROADMAP.md                           ← Timeline and dependencies
├── CHANGELOG.md                         ← Starts at v4.0
├── prompts/
│   ├── signal-extraction.md             ← Weak tie filtering prompt (Layer 1)
│   ├── traceability-test.md             ← Aggregation principle check (Layers 2-4)
│   └── match-make.md                    ← Triage + generation prompt (Layer 3)
├── data/
│   └── prosocial-tech-directory.json    ← Seeded prosocial tech lookup (Layer 3)
└── WINDY-PROMPT.md                      ← This document
```

### Constitutional check questions:

- Does MISSION.md align with BRAIN/CONSTITUTION.md principles?
- Does the triage order in match-make.md match Constitution Principle 2?
- Does the traceability test enforce the privacy requirements in BRAIN/CONSTITUTION.md?
- Does the signal extraction prompt avoid personal data collection per Constitution Principle 1?
- Are there any implicit assumptions in the prompts that conflict with constitutional values?

### Consistency check questions:

- Do the done conditions in PHASES.md match what the SPEC.md says each layer does?
- Does the prosocial tech directory cover the tools mentioned in BRAIN/ECOSYSTEM.md?
- Do the prompts reference the same field names as the Supabase tables described in the SPEC?
- Does ROADMAP.md timeline align with PHASES.md estimates?
- Does CHANGELOG.md accurately describe what changed from v3 to v4?

---

## After Scaffolding Verification

Once Mike has reviewed your verification report and confirmed Phase 0 is complete, proceed to Phase 1 (SENSE). The build order for Phase 1 is in PHASES.md.

**Do not start Phase 1 until Phase 0 done conditions are all checked off.**

---

## Interfaces

This project:
- Reads from: BRAIN/ECOSYSTEM.md, KNOWLEDGE/ecosystem-state.json
- Has its own Supabase tables (to be created in Phase 1)
- Has its own Netlify deployment (separate from kamunity.org)
- Interfaces with Kai via signal cards (Phase 2) — does NOT modify PROJECTS/kamunity-org/ directly
- Interfaces with Kitchen Table via new views (Phases 1-5)

---

## Vine-o-Code Principles (reminders)

- Documents first, code second
- Each layer independently deployable
- Test at each phase before proceeding
- Triage before build — even for this build
- Constitution checked at every step
- The prompts ARE the implementation — treat them as code
