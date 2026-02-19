-- Phase 5.5: Tester signup table for opt-in feedback participants
-- UP
CREATE TABLE IF NOT EXISTS tester_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  source text DEFAULT 'about_page',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE tester_signups ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own signup
CREATE POLICY "Users can insert own signup"
  ON tester_signups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Service role can read all (for admin/outreach)
CREATE POLICY "Service role reads all"
  ON tester_signups FOR SELECT
  TO service_role
  USING (true);

-- DOWN (rollback)
-- DROP POLICY IF EXISTS "Service role reads all" ON tester_signups;
-- DROP POLICY IF EXISTS "Users can insert own signup" ON tester_signups;
-- DROP TABLE IF EXISTS tester_signups;
