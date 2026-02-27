-- Kitchen Table cross-device state sync
-- Single JSONB row per user — stores all localStorage state centrally

CREATE TABLE IF NOT EXISTS kt_state (
  user_id text PRIMARY KEY DEFAULT 'mike',
  tasks jsonb NOT NULL DEFAULT '{}',
  safety jsonb NOT NULL DEFAULT '{}',
  gaps jsonb NOT NULL DEFAULT '{}',
  entities jsonb NOT NULL DEFAULT '{}',
  journal jsonb NOT NULL DEFAULT '[]',
  mtd text NOT NULL DEFAULT '$0',
  waymaker_history jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: only service role can read/write (Kitchen Table uses service key via Netlify function)
ALTER TABLE kt_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role only" ON kt_state
  USING (auth.role() = 'service_role');
