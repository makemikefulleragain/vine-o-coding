# Phase 7 Research: User-Facing Enhancements

**Date:** 2026-02-17

---

## Human Feedback (verbatim)

> "the 10 questions were great but we ended up in the toolkit and felt like it was extra work because it was a checklist not a template we could fill in or guess at info to confirm later. with a downloaded excel file or doc?"
> "the 2-minute audit needs to be more prominent around the site"
> "the toolkits need to allow for users to add in what they know and download in a way they can complete later or come back... but they still don't want to share their data"
> "the results of the 10 question audit should affect the bits of the toolkit they should do, this should be clear in the results"
> "the sub header in the tools is good but ugly and looks weird. can it be a side bar on the right that shows top line data and expands/goes back to a bar if clicked?"
> "there should be a somewhere else where I can obviously go to or back to to start the process of the audit and see my progress and ROI for continuing, but not pushy or dark patterns or tricks"

## Research Decisions

### 1. Audit Persistence
- localStorage key `ku-audit-results` stores answers + calculated scores
- Results page reads from localStorage when no prop answers (return visit)
- Privacy notice updated: "stored on your device only, clear anytime"

### 2. Fillable Toolkit Guides
- Convert checkboxes to interactive: checkbox + text input for notes
- Per-guide localStorage: `ku-guide-{guideId}` stores checkbox states + notes
- Completion % shown per guide
- Download as CSV (opens in Excel) or Markdown doc

### 3. Results → Toolkit Integration
- Each dimension card shows its recommended guide INLINE
- Priority based on score: red/amber dimensions get prominent CTAs
- Show time estimate and deliverable in the results card itself

### 4. ToolkitTracker Redesign
- Replace sticky sub-header with right sidebar panel
- Shows: audit score mini-summary, guide completion %, current guide
- Collapsible: full panel ↔ slim vertical bar on click
- Mobile: collapses to floating button in bottom-right

### 5. Return Visit Experience
- Landing page detects existing results in localStorage
- Shows "Welcome back" banner with score + "Continue toolkit" or "Retake"
- Toolkit page shows completion status per guide

### 6. Audit Prominence
- Subtle CTAs on toolkit guide pages for users who haven't audited
- Progress/sovereignty dashboard concept (the "somewhere else")

### 7. Download Format
- CSV: universal, opens in Excel/Google Sheets/Numbers
- Simple generation with no npm dependencies (native JS)
- Include: section name, item text, checked status, user notes
