# Phase 1 Human Actions Required

**Date:** 2026-02-14

These actions must be completed before the cloud features of Phase 1 will work. The site is functional in browser-only mode until these are done.

---

## Action 1: Enable Anonymous Sign-Ins in Supabase

**Where:** Supabase Dashboard → Authentication → Providers
**Steps:**
1. Go to https://supabase.com/dashboard and open your project
2. Navigate to **Authentication** in the left sidebar
3. Click **Providers**
4. Find **Anonymous Sign-In** (may be under "Anonymous" or at the bottom of the providers list)
5. Toggle it **ON**
6. Click **Save**

**Why:** Without this, the app cannot create anonymous sessions and will fall back to localStorage mode.

---

## Action 2: Run SQL Migration — Create Tables

**Where:** Supabase Dashboard → SQL Editor
**Steps:**
1. Go to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the entire contents of `phases/phase-01/migrations/001_create_tables.sql`
4. Click **Run**
5. Verify: you should see "Success" and no errors

---

## Action 3: Run SQL Migration — Add RLS Policies

**Where:** Supabase Dashboard → SQL Editor
**Steps:**
1. Click **New Query** again
2. Copy and paste the entire contents of `phases/phase-01/migrations/002_add_rls.sql`
3. Click **Run**
4. Verify: you should see "Success" and no errors

**Verification:** Go to **Table Editor** → you should see three tables: `grants`, `budget_categories`, `expenses`. Each should show a shield icon indicating RLS is enabled.

---

## Action 4: Deploy Updated Site to Netlify

**Where:** Netlify dashboard or CLI
**Steps:**
- **Option A (drag-and-drop):** Go to your Netlify site → Deploys → drag the `site/` folder onto the deploy area
- **Option B (CLI):** Run `netlify deploy --prod --dir=site` from the `grants-hub` directory
- **Option C (Git):** If connected to Git, just push the changes

---

## What's Blocked Until These Actions Are Complete

- Cloud data persistence (anonymous auth + tables)
- Data migration from localStorage to cloud
- Multi-device access

**What still works without these actions:**
- Everything in browser-only mode (localStorage) — same as before Phase 1
- The app gracefully falls back and shows "💾 Browser only" indicator
