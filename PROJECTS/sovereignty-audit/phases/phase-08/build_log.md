# Phase 8 Build Log: Enhanced Toolkit

**Date:** 2026-02-17
**Build attempts:** 1/3
**Status:** SUCCESS

---

## What Was Built

### 1. Interactive Tool Inventory Table (`ToolInventoryTable.jsx`)
- Fillable table with columns: Tool Name, What It Does, Cost/mo, Who Manages, Can Export?, Notes
- Add/remove rows dynamically
- Can Export? uses dropdown (Yes/No/Partial/Unknown)
- Auto-saves to localStorage (`ku-tool-inventory`)
- Download as CSV
- Summary dashboard: tools tracked, total monthly cost, no-export count, key-person risk detection
- Integrated into VendorLockin guide page

### 2. Cost Comparison Calculator (`CostCalculator.jsx`)
- Side-by-side comparison: current tool + cost vs alternative + cost
- Per-row savings indicator
- Summary: current monthly, alternative monthly, monthly savings, annual savings
- Collapsible NFP alternatives reference panel with 8 common nonprofit deals
- Auto-saves to localStorage (`ku-cost-calculator`)
- Download comparison as CSV
- Integrated into CostTransparency guide page

### 3. Deeper Checklist Sections

**DataOwnership** (was 3 sections / 17 items → now 5 sections / 29 items):
- Added: "4. Backup Strategy" (6 items)
- Added: "5. Data Retention & Deletion" (6 items)

**VendorLockin** (was 1 section / 4 items → now 4 sections / 23 items):
- Added: "2. Assess Your Switching Costs" (6 items)
- Added: "3. Contract & Terms Review" (6 items)
- Added: "4. Migration Planning Checklist" (7 items)
- Replaced static table with interactive ToolInventoryTable

**CostTransparency** (was 2 sections / 12 items → now 4 sections / 24 items):
- Added: "5. Budget Planning Checklist" (6 items)
- Added: "6. Tool Consolidation Assessment" (6 items)
- Added CostCalculator interactive component

**AIReadiness** (was 1 section / 5 items → now 3 sections / 20 items):
- Added: "5. AI Tool Evaluation Checklist" (8 items)
- Added: "6. Team AI Training Readiness" (7 items)

**Total checklist items: 38 → 96 (2.5x increase)**

### 4. Downloadable Word-Compatible Templates (`templateExport.js`)
- HTML files saved as .doc (opens in Word, Google Docs, LibreOffice)
- Styled with Calibri, tables, highlighted fill-in fields, color-coded sections
- **AI Use Policy Template** — complete one-page policy with fill-in-the-blank fields
- **Tool Inventory Template** — 15-row table with 8 columns + summary section
- **Data Location Map Template** — data locations, admin access register, backup status, emergency contacts
- **Cost Audit Worksheet** — subscription tracker, hidden costs table, savings opportunities, grant reporting

Each template has a download button on its respective guide page with "Opens in Word or Google Docs" label.

### Build Result
```
✓ 74 modules transformed.
dist/index.html                   5.01 kB │ gzip:   1.66 kB
dist/assets/index-DP8apZa4.css  47.04 kB │ gzip:   8.16 kB
dist/assets/index-BW4DohEh.js  407.87 kB │ gzip: 117.38 kB
✓ built in 5.08s
```

### New Files
- `src/components/ToolInventoryTable.jsx`
- `src/components/CostCalculator.jsx`
- `src/utils/templateExport.js`

### Modified Files
- `src/components/guides/DataOwnership.jsx` — 2 new sections + Data Map template download
- `src/components/guides/VendorLockin.jsx` — 3 new sections + ToolInventoryTable + Word template download
- `src/components/guides/CostTransparency.jsx` — 2 new sections + CostCalculator + Word template download
- `src/components/guides/AIReadiness.jsx` — 2 new sections + AI Policy template download

### Zero New npm Dependencies

---

## UAT Fixes (Post-Deploy)

### FillableChecklist Redesign
- **Rich item objects**: Items are now objects with `label`, `inputType`, `placeholder`, `options`, `offlineOnly`, `offlineReason` (backwards compatible with plain strings)
- **Input types**: `text`, `textarea`, `dropdown`, `number`, `none` — each renders the appropriate form control
- **Status per item**: Every item gets a status selector: Done / In progress / Needs verification / N/A
- **Always-visible data entry**: No more hidden-on-hover single-line text input. Data fields and notes are always visible
- **Offline markers**: Items marked `offlineOnly: true` show a clear "Offline" badge with download icon, grey background, and reason text explaining why it must be done in the Word template
- **Legend bar**: Progress bar area now shows a colour legend (green = fill in online, grey = complete offline, amber = needs verification)
- **Verification counter**: Shows count of items flagged as needing verification

### All 4 Guides Converted to Rich Items
- **DataOwnership**: 29 items → 14 dropdowns, 8 textareas, 3 text, 2 offline, 2 number
- **VendorLockin**: 23 items → 14 dropdowns, 3 textareas, 3 text, 1 offline, 1 none, 1 text
- **CostTransparency**: 24 items → 11 dropdowns, 5 textareas, 4 number, 3 text, 1 offline
- **AIReadiness**: 20 items → 14 dropdowns, 2 textareas, 2 text, 1 offline, 1 textarea

### CSV Export Updated
- Now exports 6 columns: Section, Item, Done, Status, Your Data, Notes
- Handles both string items and rich item objects (backwards compatible)

### Privacy Policy Rewritten (v2.0)
- Added "Data Stored on Your Device" section listing all localStorage keys
- Added "Downloadable Templates" section explaining client-side generation
- Updated "How the Audit Works" to cover checklists, tool inventory, cost calculator
- Added "What We Don't Collect" items for toolkit data and tool inventory
- Added version history (v1.0 → v2.0)
- Corrected all claims about data handling to reflect localStorage persistence

### Terms of Use Created (v1.0)
- New `/terms` route and `Terms.jsx` component
- Covers: tool purpose, free use, what it does/doesn't do, data handling, templates, external links, liability, IP, consulting, governing law
- Version history section
- Added to footer Company links

### Build Result (Post-UAT)
```
✓ 75 modules transformed.
dist/index.html                   5.01 kB │ gzip:   1.66 kB
dist/assets/index-Dae_GZsD.css  47.96 kB │ gzip:   8.27 kB
dist/assets/index-BfWXQ1p_.js  436.16 kB │ gzip: 124.03 kB
✓ built in 4.31s
```
