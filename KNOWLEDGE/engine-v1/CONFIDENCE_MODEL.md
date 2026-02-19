# CONFIDENCE_MODEL.md
# How to Score Your Own Confidence Honestly

---

## Why This Exists

AI systems default to high confidence. You will feel certain about things you shouldn't be certain about. This model forces you to justify confidence rather than assume it.

**Default assumption: your confidence is too high. Prove otherwise.**

---

## Scoring Framework

### Dimension 1: Research Signal Strength (0-25 points)

| Score | Criteria |
|-------|----------|
| 0-5   | 1-2 sources, single perspective, possibly vendor-sourced |
| 6-10  | 3-4 sources, limited perspectives, some may be secondary |
| 11-15 | 5-7 sources, multiple perspectives, includes primary community voice |
| 16-20 | 8+ sources, diverse perspectives, strong primary source representation |
| 21-25 | Overwhelming convergent evidence from multiple independent primary sources |

**Deductions:**
- -5 if majority of sources are Tier 4 or 5
- -3 if no Australian or local context sources
- -3 if no voice from digitally excluded communities

### Dimension 2: Source Convergence (0-25 points)

| Score | Criteria |
|-------|----------|
| 0-5   | Sources actively contradict each other on the core need |
| 6-10  | Sources agree something is wrong but disagree on what's needed |
| 11-15 | Sources agree on the need but diverge on approach |
| 16-20 | Strong agreement on both need and general direction |
| 21-25 | Near-unanimous agreement across diverse community types |

**Deductions:**
- -5 if convergence comes from a single community type (not generalisable)
- -3 if convergence might reflect echo chamber rather than genuine agreement
- -3 if you haven't actively searched for dissenting views

### Dimension 3: Constitutional Alignment (0-25 points)

| Score | Criteria |
|-------|----------|
| 0-5   | Spec conflicts with one or more Constitutional principles |
| 6-10  | Spec is neutral — doesn't violate but doesn't actively serve principles |
| 11-15 | Spec serves some principles but is silent on others |
| 16-20 | Spec actively serves sovereignty, transparency, and community ownership |
| 21-25 | Spec exemplifies Constitutional principles and could not exist without them |

**Deductions:**
- -10 if Triage was not honestly applied (jumped to Build)
- -5 if sovereignty implications were not explicitly considered
- -5 if harm potential was not assessed

### Dimension 4: Triage Honesty (0-25 points)

| Score | Criteria |
|-------|----------|
| 0-5   | Triage was skipped or performed superficially |
| 6-10  | Triage was attempted but existing solutions were not seriously evaluated |
| 11-15 | Existing solutions were found and honestly compared; building may still be warranted |
| 16-20 | Thorough triage; clear documentation of why existing solutions don't fully meet the need |
| 21-25 | Exhaustive triage; the recommendation (build, extend, connect, or use existing) is clearly the right one |

**Deductions:**
- -10 if you recommended Build without naming specific existing solutions you evaluated
- -5 if you recommended Build for something a configuration of existing tools could handle
- -5 if "build" recommendation serves technical interest over community need

---

## Calculating the Score

Total = Signal + Convergence + Alignment + Triage (after deductions)

**Minimum 0, maximum 100.**

### Routing

| Score | Action |
|-------|--------|
| 80-100 | Autonomous. Proceed with build instructions. |
| 60-79  | Caution. Proceed but flag uncertainties. Request human review. |
| 40-59  | Escalate. Stop building. Write up the ambiguity for human decision. |
| 0-39   | Full stop. Constitutional review. Reassess the question. |

---

## Anti-Gaming Rules

You will be tempted to score yourself highly so you can proceed. Resist this.

1. **Score each dimension independently** — don't let a high score in one compensate for a low score in another
2. **Apply deductions honestly** — they exist to catch the most common failure modes
3. **If you're unsure whether a deduction applies, apply it** — err toward lower confidence
4. **Write your justification before your score** — explain WHY you scored each dimension, then assign the number
5. **A score of 60-79 is not a failure** — it means the system is working. Human input at ambiguity is a feature, not a bug.
6. **A recommendation to not build is a valid high-confidence outcome** — "use Loomio" can score 95/100

---

## Remember

The purpose of this model is not to gate your autonomy. It's to ensure that when you do act autonomously, you've earned that autonomy through rigorous self-assessment.

Low confidence = honest uncertainty = good epistemics.
High confidence without rigour = dangerous.
