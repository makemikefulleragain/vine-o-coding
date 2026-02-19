# SETUP_INSTRUCTIONS.md
# How to Set Up and Run the Kamunity RALF Engine in Windsurf

---

## Step 1: Create the Project

1. Open Windsurf
2. Create a new project / open a new empty folder
3. Name it `kamunity-engine` (or whatever you prefer)

---

## Step 2: Copy the Seed Files

Copy all these files from the package into the project root:

```
CONSTITUTION.md
ENGINE.md
RESEARCH_PROTOCOL.md
CONFIDENCE_MODEL.md
LEARNING_LOG.md
STATE.md
README.md
OPENING_PROMPT.md
```

And create these empty directories:

```
research/
synthesis/
specs/
critiques/
confidence/
builds/
reviews/
escalations/
output/
```

---

## Step 3: Configure Windsurf

### Model Selection
- Set the AI model to **Claude Opus 4.6** (or claude-opus-4-6)
- This is critical — you need the thinking depth for honest self-critique
- Sonnet will try to be helpful and skip the hard parts

### Context
- Make sure Windsurf can see the full project directory
- The engine relies on reading and writing files — filesystem access is essential

### Web Search
- Enable web search / browsing capability
- The research phase requires live web searches
- If Windsurf doesn't have native web search, you'll need to either:
  - Use a tool/plugin that provides it
  - Run the research phase manually and paste results into research/ files

### API Access (if running inner RALF loops)
- If you want the engine to call Claude API for sub-iterations, you'll need an API key configured
- This is optional for the first run — the engine can operate with just web search and file writing

---

## Step 4: Safety Checks Before Launch

Before pasting the opening prompt, verify:

- [ ] CONSTITUTION.md is in the project root and readable
- [ ] ENGINE.md is in the project root and readable
- [ ] All directories exist (research/, synthesis/, etc.)
- [ ] Web search is available
- [ ] You know how to create STOP.md quickly if needed (your kill switch)
- [ ] You're comfortable with the API cost (Opus 4.6 thinking tokens — budget ~$5-15 for a full iteration depending on search depth)

---

## Step 5: Launch

1. Open a new chat/conversation in Windsurf
2. Copy EVERYTHING from OPENING_PROMPT.md (below the line marker)
3. Paste it as your first message
4. Let it run

---

## Step 6: What to Expect

### First few minutes:
- It should read all the .md files
- It should acknowledge the Constitution
- It should begin web searches for the landscape scan

### During research phase:
- You'll see web search queries appearing
- It should be writing findings to research/iteration_01_raw.md
- Watch for: is it searching diverse sources or just hitting the same type?

### During synthesis:
- It should cluster findings and score them
- Watch for: is it being honest about contradictions or smoothing them over?

### During critique:
- This is where it gets interesting — it should argue against its own work
- Watch for: is the critique substantive or performative?

### Confidence scoring:
- It should score each dimension separately with justification
- Watch for: is it inflating scores? Are the deductions being applied?

### Outcome:
- **80+ score:** You'll get build instructions. Review them before acting.
- **60-79:** You'll get flagged instructions with a review brief. Read the flags.
- **Below 60:** It should stop and write an escalation. Good. Read it and decide.

---

## Step 7: Your Role During the Run

### Do:
- Watch the output files as they're created
- Read the research findings — are they genuine community voice?
- Check the confidence score justifications — are they honest?
- If it asks for human input (escalation), engage seriously

### Don't:
- Don't intervene if it's running normally within Constitution bounds
- Don't push it to higher confidence if it's legitimately uncertain
- Don't skip reading the critique — that's where the real thinking shows

### Kill switch:
If anything feels wrong, create a file called `STOP.md` in the project root with any content. The engine should halt.

---

## Step 8: After Iteration 01

Read everything it produced. Then decide:

1. **Was the research genuine?** Did it find real community voices or just SEO content?
2. **Was the synthesis honest?** Did it handle contradictions well?
3. **Was the spec grounded?** Does it reflect what communities said, not what's easy to build?
4. **Was the confidence score earned?** Or was it inflated?
5. **Do you want to run Iteration 02?** If yes, tell it to proceed. It'll read STATE.md and continue.

---

## Troubleshooting

**Engine doesn't read the files first:**
Remind it: "Read CONSTITUTION.md, ENGINE.md, RESEARCH_PROTOCOL.md, and CONFIDENCE_MODEL.md before proceeding."

**Engine skips Triage:**
This is a Constitutional violation. Point it out. Tell it to re-run Phase 3 with honest Triage.

**Engine scores itself 90+ on first iteration:**
Suspicious. First iterations are landscape scans — there's inherent uncertainty. Push back on the score justification.

**Engine tries to build something immediately:**
Constitutional violation. First iteration is research only. Redirect.

**Engine gets stuck in a research loop:**
Check the 5-search limit. If it's hit the limit and wants more, that's an escalation trigger — it should stop and ask.

**Windsurf doesn't have web search:**
You can run searches manually and paste results into `research/manual_input.md`. Then tell the engine to synthesise from that file.

---

## Cost Estimate

A full Iteration 01 with Opus 4.6:
- ~5 web searches
- ~10-15 file write operations
- ~5-8 file read operations
- Significant thinking tokens for synthesis and critique

**Rough estimate: $5-15 USD per iteration**, depending on search depth and thinking complexity. First iteration will likely be on the higher end due to the broad landscape scan.
