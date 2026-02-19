-- Phase 1 Migration: Enable RLS and add policies
-- Run this AFTER 001_create_tables.sql in Supabase SQL Editor

-- ============================================================
-- UP MIGRATION
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- ---- GRANTS policies ----
-- Users can only see their own grants
CREATE POLICY "Users can view own grants"
  ON public.grants FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert grants for themselves
CREATE POLICY "Users can insert own grants"
  ON public.grants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own grants
CREATE POLICY "Users can update own grants"
  ON public.grants FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own grants
CREATE POLICY "Users can delete own grants"
  ON public.grants FOR DELETE
  USING (auth.uid() = user_id);

-- ---- BUDGET CATEGORIES policies ----
-- Users can view categories for their own grants
CREATE POLICY "Users can view own categories"
  ON public.budget_categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = budget_categories.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can insert categories for their own grants
CREATE POLICY "Users can insert own categories"
  ON public.budget_categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = budget_categories.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can update categories for their own grants
CREATE POLICY "Users can update own categories"
  ON public.budget_categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = budget_categories.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can delete categories for their own grants
CREATE POLICY "Users can delete own categories"
  ON public.budget_categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = budget_categories.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- ---- EXPENSES policies ----
-- Users can view expenses for their own grants
CREATE POLICY "Users can view own expenses"
  ON public.expenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = expenses.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can insert expenses for their own grants
CREATE POLICY "Users can insert own expenses"
  ON public.expenses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = expenses.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can update expenses for their own grants
CREATE POLICY "Users can update own expenses"
  ON public.expenses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = expenses.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- Users can delete expenses for their own grants
CREATE POLICY "Users can delete own expenses"
  ON public.expenses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.grants
      WHERE grants.id = expenses.grant_id
      AND grants.user_id = auth.uid()
    )
  );

-- ============================================================
-- DOWN MIGRATION (rollback)
-- ============================================================
-- To rollback, run:
--
-- DROP POLICY IF EXISTS "Users can view own grants" ON public.grants;
-- DROP POLICY IF EXISTS "Users can insert own grants" ON public.grants;
-- DROP POLICY IF EXISTS "Users can update own grants" ON public.grants;
-- DROP POLICY IF EXISTS "Users can delete own grants" ON public.grants;
-- DROP POLICY IF EXISTS "Users can view own categories" ON public.budget_categories;
-- DROP POLICY IF EXISTS "Users can insert own categories" ON public.budget_categories;
-- DROP POLICY IF EXISTS "Users can update own categories" ON public.budget_categories;
-- DROP POLICY IF EXISTS "Users can delete own categories" ON public.budget_categories;
-- DROP POLICY IF EXISTS "Users can view own expenses" ON public.expenses;
-- DROP POLICY IF EXISTS "Users can insert own expenses" ON public.expenses;
-- DROP POLICY IF EXISTS "Users can update own expenses" ON public.expenses;
-- DROP POLICY IF EXISTS "Users can delete own expenses" ON public.expenses;
-- ALTER TABLE public.grants DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.budget_categories DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.expenses DISABLE ROW LEVEL SECURITY;
