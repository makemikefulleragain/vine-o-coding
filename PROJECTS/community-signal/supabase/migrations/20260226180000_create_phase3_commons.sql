-- Phase 3: MATCH + MAKE — commons_library table
-- Stores generated documents, templates, policies, and guides.
-- Attributed to pattern, never to a person or individual organisation.
-- Human review required before anything enters the public commons.

create table if not exists commons_library (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Source pattern (required — everything attributed to pattern, not person)
  pattern_id    uuid not null references patterns(id) on delete cascade,

  -- Triage result (what the match-engine decided)
  triage_result text not null check (triage_result in ('FIND','CONNECT','EXTEND','INTEGRATE','MAKE')),
  triage_reasoning  text,
  existing_tool     text,              -- tool name if triage was FIND/CONNECT/EXTEND/INTEGRATE
  existing_tool_fit text,              -- what it does well / where it falls short

  -- Generated artifact
  artifact_type text not null check (artifact_type in ('template','policy','guide','bridge','tool-connection')),
  artifact_title    text not null,
  artifact_content  text not null,     -- the actual document (markdown)
  commons_version   text,              -- de-personalised version for public commons
  substack_scaffold text,
  linkedin_scaffold text,

  -- Org context used in generation
  target_org_profile  text,            -- e.g. "disability services, under 20 staff, WA metro"
  sector_tags         text[] not null default '{}',

  -- Human review gate (nothing publishes without approval)
  review_status text not null default 'pending'
                check (review_status in ('pending','approved','rejected','published')),
  reviewed_by   text,
  reviewed_at   timestamptz,
  review_notes  text,

  -- Quality check flags (Priya test)
  quality_check_passed  boolean,
  quality_check_notes   text
);

create index idx_commons_pattern    on commons_library (pattern_id);
create index idx_commons_triage     on commons_library (triage_result);
create index idx_commons_status     on commons_library (review_status);
create index idx_commons_tags       on commons_library using gin (sector_tags);
create index idx_commons_created    on commons_library (created_at desc);
create index idx_commons_type       on commons_library (artifact_type);

alter table commons_library enable row level security;
-- No RLS policies = service role only (data sovereignty)
