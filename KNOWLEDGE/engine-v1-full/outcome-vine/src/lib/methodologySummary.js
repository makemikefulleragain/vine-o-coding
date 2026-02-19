export const methodologySummaryContent = `# Outcome Vine Coding — Methodology Summary

## What It Is

Outcome Vine Coding is a structured method for building real software using AI coding assistants. It bridges the gap between "I have an idea" and "I have a working, deployed tool" — without requiring programming experience.

## The Three Layers

### 1. Foundation Documents
Before any code is written, you create 6 documents that define your project:
- **CONSTITUTION.md** — Operating principles, user personas, boundaries, harm checks
- **MISSION.md** — What you're building, why it matters, who it's for
- **RUNNER.md** — Instructions for the AI coding assistant (the prompt)
- **PHASE_QUEUE.md** — Your development phases (a hypothesis, not a contract)
- **SETUP.md** — Human infrastructure steps (deployment, database, etc.)
- **STATE.md** — Current state of the project (updated after each phase)

These documents are the contract between you and the AI. The AI reads them before writing any code.

### 2. The Phase Loop
Each phase follows 7 steps:
1. **Research** (max 5 web searches) — What do real users need?
2. **Triage** — What's the highest-value thing to build?
3. **Spec** — Acceptance criteria and technical design
4. **Build** — Implement, build, test
5. **Critique** — Constitutional alignment, bias check, clarity check
6. **Confidence Score** — 4 dimensions × 25 points (Research Signal, Source Convergence, Constitutional Alignment, Build Confidence)
7. **Forward** — Update state, propose next phase, check for stop signal

Each phase must leave the project in a working, deployable state.

### 3. Safety Mechanisms
- **Confidence Scoring** — Score below 60? Reassess. Score 60-79? Build with flags. Score 80+? Build.
- **Review & Reflect** — Triggered when: a bug takes >2 attempts, a phase fails user testing, or an architectural assumption is proven wrong. Stop, find root cause, fix the real problem.
- **Kill Switch** — STOP.md halts everything immediately.
- **Triage** — Before building anything, check: does something already exist? Should we link to it instead?

## The Evidence

The Community Grants Hub (grants-hub.netlify.app) was built from scratch using this method:
- 8 phases of development in a single session
- Phase 2 failed and was caught by Review & Reflect
- The architecture was rebuilt (Phase 2a) and features re-implemented (Phase 2b)
- Result: a working tool with user accounts, data persistence, CSV import, and trust features
- The failure and recovery demonstrated the safety mechanisms working as designed

## Key Principles

1. **Real users, real needs** — Every decision serves a specific person with a specific problem
2. **Triage still applies** — Don't build what already exists
3. **Progressive enhancement** — Ship after every phase; users may visit between phases
4. **Evidence changes the plan** — The phase queue is a hypothesis, not a contract
5. **Sovereignty** — User data belongs to users; no tracking, no lock-in
6. **Harm check** — Be honest about what AI can and can't do
7. **Ship it** — Each phase ends with a deployable state

## How to Start

Visit outcomevine.dev (or wherever this site is deployed) and use the interactive widget to generate your foundation documents. Then paste the opening prompt into your AI coding assistant and begin Phase 1.

---

*Outcome Vine Coding is open methodology from Kamunity (kamunity.ai). Use it, share it, improve it.*
`
