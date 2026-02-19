---
description: Set up a new project with Vine-o-Code foundation docs
---

# New Project Setup

Creates a new project folder in PROJECTS/ with all required foundation documents from ENGINE/TEMPLATES/.

## Steps

1. Ask the operator:
   - What's the project name? (kebab-case, e.g. `community-directory`)
   - One-line purpose?
   - Which tech stack? (React/Vite/Tailwind default, or other)
   - Who is the primary user? (default: Priya)
   - Any specific safety concerns?

2. Create the project folder:
// turbo
   - `mkdir PROJECTS/[project-name]`

3. Copy and fill the foundation docs from ENGINE/TEMPLATES/:
   - Copy `CONSTITUTION_TEMPLATE.md` → `PROJECTS/[name]/CONSTITUTION.md`
   - Copy `MISSION_TEMPLATE.md` → `PROJECTS/[name]/MISSION.md`
   - Copy `PHASE_QUEUE_TEMPLATE.md` → `PROJECTS/[name]/PHASE_QUEUE.md`
   - Fill in the placeholders with the answers from step 1

4. Update ecosystem docs:
   - Add the new project to `BRAIN/ECOSYSTEM.md` if it will have a public URL
   - Add to `PLAN/PHASE_QUEUE.md` if it needs a phase entry
   - Log the decision in `PLAN/DECISION_LOG.md`

5. Initialize the codebase:
   - Create appropriate project scaffolding (Vite, Next.js, etc.)
   - Add `.gitignore` appropriate for the stack
   - Ensure the project folder has its own README.md

6. Confirm with operator:
   - Show the filled CONSTITUTION.md for review
   - Confirm the phase queue entry
   - Ask: "Ready to start building?"

// turbo
7. Commit: `git add -A && git commit -m "new project: [name] — foundation docs created"`
