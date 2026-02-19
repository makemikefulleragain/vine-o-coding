-- Phase 1 Migration: Create core tables for grants, budget categories, and expenses
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ============================================================
-- UP MIGRATION
-- ============================================================

-- Grants table
CREATE TABLE IF NOT EXISTS public.grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  funder text NOT NULL DEFAULT '',
  grant_name text NOT NULL DEFAULT '',
  amount numeric(12,2) NOT NULL DEFAULT 0,
  deadline date,
  narrative text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Budget categories table
CREATE TABLE IF NOT EXISTS public.budget_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id uuid NOT NULL REFERENCES public.grants(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  budgeted numeric(12,2) NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id uuid NOT NULL REFERENCES public.grants(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.budget_categories(id) ON DELETE SET NULL,
  date date,
  description text NOT NULL DEFAULT '',
  amount numeric(12,2) NOT NULL DEFAULT 0,
  receipt_ref text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_grants_user_id ON public.grants(user_id);
CREATE INDEX IF NOT EXISTS idx_budget_categories_grant_id ON public.budget_categories(grant_id);
CREATE INDEX IF NOT EXISTS idx_expenses_grant_id ON public.expenses(grant_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category_id ON public.expenses(category_id);

-- Auto-update updated_at on grants
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS grants_updated_at ON public.grants;
CREATE TRIGGER grants_updated_at
  BEFORE UPDATE ON public.grants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- DOWN MIGRATION (rollback)
-- ============================================================
-- To rollback, run:
--
-- DROP TRIGGER IF EXISTS grants_updated_at ON public.grants;
-- DROP FUNCTION IF EXISTS public.update_updated_at();
-- DROP TABLE IF EXISTS public.expenses;
-- DROP TABLE IF EXISTS public.budget_categories;
-- DROP TABLE IF EXISTS public.grants;
