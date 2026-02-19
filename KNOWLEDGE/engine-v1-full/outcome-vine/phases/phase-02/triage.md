# Phase 2 Triage — Make It Walkable

**Date:** 2026-02-15

---

## What's the Highest-Value Thing to Build?

The interactive widget — a 6-step wizard that takes a user from "I have an idea" to "here are my foundation documents and my AI assistant prompt." This is the core product of the entire site.

## Does Something Already Exist?

**No.** Research confirmed:
- Project KickStart (desktop software) does guided project planning but generates Gantt charts, not AI-assistant-ready documents.
- No tool generates foundation documents for AI-assisted coding.
- No wizard helps non-technical users structure a project for an AI coding assistant.

This is genuinely novel. Nothing to link to or integrate with.

## Is the Phase Goal Still Right?

**Yes.** The Phase 1 critique identified the disabled "Start Building" button as the biggest tension. The widget resolves it.

**One refinement:** The original scope mentioned "5-6 steps." Research confirms 6 steps is right:

1. **Your Idea** — what, who, why
2. **Your Users** — specific person + situation
3. **Your Boundaries** — what it's NOT, safety
4. **Your First Steps** — priorities, phase 1-3
5. **Your Setup** — deployment, tools
6. **Review & Download** — preview, edit, download ZIP, copy prompt

## Scoping Decisions

### IN scope
- 6-step wizard with progress bar
- Companion examples (Grants Hub + Recipe Remix) at each step
- Brian lean-in expandable sections at each step
- Document generation (6 markdown files)
- Opening prompt generation (copyable text)
- ZIP download (via JSZip)
- Individual document copy-to-clipboard
- Mobile responsive
- Route: `/widget` (replaces disabled "Start Building" button)

### OUT of scope
- Saving/resuming progress (client-side session only)
- User accounts or cloud storage
- Document editing after generation (they can edit the downloaded files)
- Multiple AI assistant support (examples use Windsurf; documents are generic)
- Template customization beyond what the wizard generates

## Technical Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| State management | React useState in parent | 6 steps, simple form data. No need for Redux/Zustand. |
| ZIP generation | JSZip + file-saver | Industry standard, well-maintained, ~45KB |
| Document templates | Template literal strings | Simple, no build-time dependency, easy to maintain |
| Example display | Collapsible tabs per step | Research: inline examples reduce context-switching |
| Brian sections | `<details>` with styled summary | Native HTML, accessible, no JS needed for expand/collapse |
| Routing | React Router `/widget` | Already installed from Phase 1 |

## Risk Assessment

| Risk | Likelihood | Mitigation |
|---|---|---|
| Widget feels like homework | Medium | Keep questions short, make examples prominent, celebrate completion |
| Generated docs feel generic | Medium | Natural language templates, interpolate user's exact words |
| 6 steps too many | Low | Research says 5-7 is sweet spot. Progress bar reduces perceived length. |
| Mobile layout breaks | Medium | Mobile-first design. Test at 375px. |
| JSZip bundle size | Low | ~45KB gzipped. Acceptable for core functionality. |

## Decision: BUILD

Proceed to SPEC.
