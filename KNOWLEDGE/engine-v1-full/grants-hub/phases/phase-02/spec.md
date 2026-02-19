# Phase 2 Spec: Make It Useful

**Date:** 2026-02-14

---

## Acceptance Criteria

1. **Multi-grant list view** — User sees all their grants with key info (funder, name, amount, deadline, % spent)
2. **Create new grant** — User can create a new grant from the list view
3. **Switch between grants** — Clicking a grant opens it in the existing detail view
4. **Back to list** — User can navigate back to the grant list from any tab
5. **Archive/delete grant** — User can remove a grant they no longer need
6. **Narrative guidance** — Report tab narrative section includes structured prompts to prevent acquittal red flags
7. **JSON data export** — User can download all their grant data as a JSON file
8. **All existing features preserved** — Setup, expenses, dashboard, report tabs work exactly as before within a grant
9. **Works in both storage modes** — Multi-grant works in both cloud (Supabase) and localStorage fallback

---

## Technical Design

### Navigation Architecture

```
App
├── Loading screen (while initializing)
├── Grant List View (new — default when no grant selected)
│   ├── Grant cards (funder, name, amount, deadline, % spent, status)
│   ├── "New Grant" button
│   └── JSON export button
└── Grant Detail View (existing tabs, with "← Back to Grants" header)
    ├── Grant Setup tab
    ├── Expenses tab
    ├── Dashboard tab
    └── Report tab (with narrative guidance)
```

### State Changes

Current state model:
```js
grant = { funder, grantName, amount, deadline, narrative, categories, expenses }
```

New state model:
```js
grants = [grant1, grant2, ...] // array of grants (localStorage mode)
// OR loaded individually from Supabase (cloud mode)
selectedGrantId = null | "uuid" // which grant is open
```

### Grant List View

- Shows all grants as cards in a responsive grid
- Each card shows: funder, grant name, total amount, amount spent, % progress bar, deadline, days remaining
- Color-coded deadline indicator (green >30 days, amber 1-30 days, red overdue)
- "New Grant" button creates a blank grant and opens it
- Cards are clickable → opens grant detail view
- Delete button on each card (with confirmation)

### Grant Detail View Changes

- Add "← Back to Grants" link above the tab bar
- Current grant's funder + name shown as a subtitle
- All existing tabs work identically
- When navigating back, grant state is already saved (debounced auto-save)

### Narrative Guidance (Report Tab)

Replace the bare textarea with structured prompts:

```
Program Narrative

What activities were delivered during this period?
[textarea]

How many people participated or benefited? Include numbers where possible.
[textarea]

Were there any challenges or changes to the original plan? How were they addressed?
[textarea]

What would you do differently next time? What did you learn?
[textarea]

Additional notes (optional)
[textarea]
```

All fields concatenate into the `narrative` field for storage and print display. On load, if the narrative is a plain string (from Phase 1), show it in the "Additional notes" field.

### JSON Export

- Button on grant list view: "📥 Export All Data"
- Downloads a JSON file with all grants, categories, expenses
- Filename: `grants-hub-export-YYYY-MM-DD.json`
- Includes metadata: export date, number of grants

### localStorage Multi-Grant

In localStorage mode, the storage key changes:
- Old: `gah_grant` (single grant object)
- New: `gah_grants` (array of grant objects, each with an `id`)
- Migration: on load, if `gah_grant` exists but `gah_grants` doesn't, wrap the single grant in an array

### Supabase Multi-Grant

No schema changes needed. The `grants` table already supports multiple rows per `user_id`. Changes are:
- `sbLoadGrant(userId)` → `sbLoadAllGrants(userId)` — loads all grants for user
- `sbSaveGrant(userId, grant)` — unchanged, works per-grant
- `sbDeleteGrant(grantId)` — new function for deletion

---

## No Migration SQL Needed

Phase 1 schema already supports multi-grant. No database changes required.

---

## Human Actions Required

- Deploy updated `site/` folder to Netlify after build
- No Supabase changes needed (schema already supports multi-grant)
