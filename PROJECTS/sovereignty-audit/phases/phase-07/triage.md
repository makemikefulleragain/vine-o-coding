# Phase 7 Triage

**Date:** 2026-02-17

---

## IN SCOPE

1. **Audit persistence** - save/load results in localStorage
2. **Results page upgrade** - inline toolkit recommendations per dimension with priority
3. **Fillable toolkit guides** - interactive checklists with notes, localStorage persistence
4. **Download toolkit as CSV** - export filled-in guide data for offline completion
5. **ToolkitTracker redesign** - right sidebar, collapsible, audit score summary
6. **Return visit experience** - landing page welcome back, toolkit progress
7. **Audit prominence** - CTAs on guide pages for non-audited users

## OUT OF SCOPE

- Supabase persistence (user explicitly said "don't want to share data")
- Calendly integration (still deferred)
- Image-based sharing
- Multi-user features

## BUILD ORDER

1. Audit persistence utility + Quiz save
2. Results page upgrade (inline toolkit recs)
3. Fillable checklist component (shared across all 4 guides)
4. Refactor all 4 guide pages to use fillable component
5. Download CSV functionality
6. ToolkitTracker redesign (right sidebar, collapsible)
7. Return visit (Landing page + Toolkit page)
8. Audit prominence CTAs
9. Build + verify + deploy
