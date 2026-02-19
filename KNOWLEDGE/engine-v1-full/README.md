# Kamunity RALF Engine
# Research → Attempt → Learn → Forward

An autonomous research-driven development engine for building community infrastructure.

## Structure

```
kamunity-engine/
├── CONSTITUTION.md          # Inviolable principles (read before every iteration)
├── ENGINE.md                # RALF loop specification
├── RESEARCH_PROTOCOL.md     # How to research honestly
├── CONFIDENCE_MODEL.md      # How to score confidence
├── LEARNING_LOG.md          # Accumulated learning (grows over time)
├── STATE.md                 # Current engine state
├── STOP.md                  # Create this file to halt all operations
├── research/                # Raw research findings per iteration
├── synthesis/               # Themed synthesis per iteration
├── specs/                   # Buildable specs per iteration
├── critiques/               # Self-critique per iteration
├── confidence/              # Confidence scores per iteration
├── builds/                  # Build instructions (only for 80+ confidence)
├── reviews/                 # Human review briefs (60-79 confidence)
├── escalations/             # Escalation briefs (below 60 confidence)
└── output/                  # Any generated artifacts
```

## How to Run

1. Read CONSTITUTION.md
2. Read ENGINE.md
3. Check STATE.md for current position
4. Execute the next phase of the current iteration
5. Update STATE.md and LEARNING_LOG.md

## Safety

- CONSTITUTION.md is immutable during a run
- STOP.md halts everything
- Below 60% confidence = mandatory human escalation
- Maximum 20 API calls per iteration
- Maximum 5 web searches per research phase
- No deployment, no external service access, no account creation
