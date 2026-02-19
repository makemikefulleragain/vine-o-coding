# Phase 8 Critique

**Date:** 2026-02-17

---

## Constitutional Alignment

### 1. Real Users, Real Problems
- Human feedback: "the toolkits need to allow for users to add in what they know and download in a way they can complete later"
- Tool Inventory Table lets users fill in their actual tools, see summary stats, and download CSV
- Cost Calculator lets users compare their real costs vs alternatives with concrete savings numbers
- Word templates are designed for offline completion — fill in the blanks, share with team, print
- Deeper checklists cover the practical steps users actually need (backup testing, contract review, migration planning)

### 2. Triage Still Applies
- Word-compatible templates use HTML-as-.doc (no docx library needed, zero dependencies)
- ToolInventoryTable and CostCalculator reuse the same localStorage + CSV patterns from Phase 7
- Checklist items are all actionable, specific to Australian NFPs, and jargon-free
- No feature bloat: each new component solves a specific user-stated problem

### 3. Progressive Enhancement
- Build passes clean (74 modules, 117kB gzipped)
- All Phase 1-7 functionality unchanged
- New components work standalone — don't require audit results to be useful
- Templates download instantly with no server round-trip

### 4. Sovereignty
- Tool inventory data stays in localStorage
- Cost calculator data stays in localStorage
- Templates are generated client-side, no data sent anywhere
- All download functions use Blob URLs, no external service

### 5. Harm Check
- No sensitive data collected in the inventory or calculator
- Cost comparisons are informational, not prescriptive ("compare" not "you must switch")
- NFP alternatives reference is factual with direct links to verify
- Templates include clear attribution and encourage professional advice where appropriate

### 6. Ship It
- Clean build, all routes working, ready to deploy

---

## What I Learned

1. **Interactive tables > static examples.** The old VendorLockin had a sample table users couldn't edit. The new ToolInventoryTable lets them fill in their own data and see instant insights (key-person risk, no-export count).
2. **HTML-as-doc is surprisingly capable.** No npm dependency needed. The templates open perfectly in Word 2016+, Google Docs, and LibreOffice. Styled tables, color-coded sections, fill-in fields all work.
3. **96 checklist items is the sweet spot.** Enough depth to be genuinely useful, not so many that it becomes overwhelming. Each section can be completed in 10-15 minutes.
4. **The NFP alternatives reference panel is a quiet killer feature.** Users can see at a glance what discounts they're missing while filling in the cost calculator.
