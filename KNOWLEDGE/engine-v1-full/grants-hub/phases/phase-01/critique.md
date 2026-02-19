# Phase 1 Critique: Make It Real

**Date:** 2026-02-14

---

## Constitutional Check

### 1. Real Users, Real Problems ✅
- Data persistence is the most fundamental gap between demo and tool
- Anonymous auth means zero friction — a treasurer can start immediately
- No account creation barrier, no email required
- Fallback to localStorage means the tool is never worse than before

### 2. Triage Still Applies ✅
- Checked for existing tools — nothing serves this specific niche (localStorage→Supabase grant acquittal helper)
- Using Supabase (existing service) rather than building custom backend
- Not reinventing auth — using Supabase's built-in anonymous sign-in

### 3. Progressive Enhancement ✅
- Site works in both modes: cloud (Supabase) and local (localStorage)
- All existing features preserved exactly
- Loading state prevents flash of empty content
- Graceful degradation if Supabase is unreachable

### 4. Evidence Changes the Plan ✅
- Research confirmed the phase goal was correct
- Non-audited acquittal requirements confirmed the existing report format is adequate
- Anonymous auth pattern validated by Supabase's own documentation as the right approach for this use case

### 5. Sovereignty ✅
- No tracking added
- No analytics
- User data stored in their own Supabase-backed rows, protected by RLS
- Clear indicator of where data is stored (cloud vs browser)
- No data shared with third parties

### 6. Harm Check ✅
- Financial advice disclaimer preserved
- No new claims about compliance
- Tool is a data organiser, not a compliance validator
- Browser-only mode warning is honest about data durability risk

### 7. Ship It ✅
- Site in `site/` folder is deployable right now
- Works in browser-only mode immediately
- Cloud mode activates once human runs migrations + enables anonymous auth

---

## Bias Check

**Technology bias:** Chose normalized schema over JSON blob. This adds complexity but is justified by future phases (multi-grant). If we never build multi-grant, the JSON blob would have been simpler. This is a mild bet on the future.

**Complexity bias:** The save/sync logic is more complex than a simple localStorage write. However, the complexity is encapsulated in `sbSaveGrant()` and the user never sees it. The UX is simpler (automatic cloud save vs manual export/import).

**Assumption bias:** Assumed that anonymous auth is acceptable as the only auth method for Phase 1. This means if a user clears their browser, they lose cloud data access permanently. This mirrors the existing localStorage behavior, so it's not a regression, but it's worth flagging.

---

## What I Learned

1. **Supabase anonymous auth is underused** — it's perfect for tools that need to "just work" without onboarding. More projects should use this pattern.

2. **The migration from localStorage to Supabase is one-directional** — we don't handle the reverse (cloud → localStorage if user goes offline after initial sync). This is a known gap for Phase 1.

3. **ID format change matters** — moving from base36 timestamps to UUIDs means the migration must remap all category references in expenses. This worked in testing but is a fragile point.

4. **N+1 save pattern** — the current `sbSaveGrant()` does individual upserts for each category and expense. For a typical small grant (4-6 categories, 10-50 expenses), this is fine. For larger datasets, it would need batching. This is acceptable debt for Phase 1.

5. **The report narrative needed special handling** — it's edited in ReportTab but needs to persist through the grant state. The `onBlur` pattern avoids excessive saves while ensuring data isn't lost.

---

## Risks for Future Phases

- **Anonymous user accumulation:** Supabase will accumulate anonymous user records. May need cleanup strategy if tool gets traffic.
- **No data export from cloud:** If a user wants to leave, they can print the report but can't export raw data. Phase 2 or 3 should address this.
- **Session management:** If the Supabase session expires, the app may fail silently. Currently handled by showing "local" mode, but could be confusing.
