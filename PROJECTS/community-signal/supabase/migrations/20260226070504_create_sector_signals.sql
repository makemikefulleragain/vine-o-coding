-- Phase 1: SENSE — sector_signals table
-- Stores anonymised weak-tie signals extracted by signal-filter.mjs
-- No personal data stored. Source attribution is text only, never PII.
-- Decay weighting applied at query time, not stored here.

create table if not exists sector_signals (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Signal content (from signal-extraction.md JSON output)
  summary               text not null,
  relevance_score       numeric(4,1) not null check (relevance_score between 0 and 10),
  actionability_score   numeric(4,1) not null check (actionability_score between 0 and 10),
  novelty_score         numeric(4,1) not null check (novelty_score between 0 and 10),
  average_score         numeric(4,1) not null check (average_score between 0 and 10),
  confidence            text not null check (confidence in ('high', 'medium', 'low')),
  why_it_matters        text not null,

  -- Taxonomy tags (array of strings, from sector taxonomy)
  tags                  text[] not null default '{}',
  new_tag_proposed      text,            -- queued for human review before adding to taxonomy

  -- Source attribution (text only — never PII)
  source_type           text not null,   -- e.g. 'rss', 'email', 'manual'
  source_name           text not null,   -- e.g. 'WACOSS Newsletter'
  source_attribution    text not null,   -- brief attribution string

  -- Source confirmation for decay weighting (Stage 3)
  confirmed_source_count  integer not null default 1,

  -- Review state
  reviewed              boolean not null default false,
  reviewed_at           timestamptz,
  review_notes          text,

  -- Pattern matching linkage (populated in Phase 3)
  pattern_id            uuid             -- FK to patterns table (Phase 3)
);

-- Index for pattern matching queries (Phase 3)
create index idx_sector_signals_tags on sector_signals using gin (tags);
create index idx_sector_signals_created_at on sector_signals (created_at desc);
create index idx_sector_signals_reviewed on sector_signals (reviewed) where reviewed = false;

-- Row Level Security: no public read — service role only
alter table sector_signals enable row level security;

-- No RLS policies = service role only access (Netlify Functions use service role key)
-- Public anon key has zero access to this table by design (data sovereignty)
