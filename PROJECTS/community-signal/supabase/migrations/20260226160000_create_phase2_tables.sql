-- Phase 2: PROPAGATE — community_signals, community_offers, patterns tables
-- community_signals: anonymous bilateral signals submitted via Kai signal card or Mob field form
-- community_offers:  anonymous offers of resources/knowledge submitted bilaterally
-- patterns:          aggregated patterns that have passed (or are pending) the traceability test
-- No personal data stored anywhere. Structurally impossible to link signals to individuals.

-- ── community_signals ────────────────────────────────────────────────────────

create table if not exists community_signals (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- What the community is trying to do (anonymous, sector-level only)
  need_summary  text not null,          -- one sentence, generalised at point of entry
  sector_tags   text[] not null default '{}',
  org_size      text check (org_size in ('micro','small','medium','large','unknown')),
  region        text default 'WA',      -- generalised — never suburb/postcode

  -- Source channel (never the person)
  source        text not null check (source in ('kai','mob-field','manual')),

  -- Traceability state
  traceability_verdict    text check (traceability_verdict in ('PASS','FAIL','REVIEW','PENDING')),
  traceability_reasoning  jsonb,         -- full Claude response stored for audit
  pattern_id              uuid,          -- FK to patterns table once aggregated

  -- Review state
  reviewed      boolean not null default false,
  reviewed_at   timestamptz,
  review_notes  text
);

create index idx_community_signals_tags    on community_signals using gin (sector_tags);
create index idx_community_signals_created on community_signals (created_at desc);
create index idx_community_signals_pattern on community_signals (pattern_id) where pattern_id is not null;
create index idx_community_signals_verdict on community_signals (traceability_verdict);

alter table community_signals enable row level security;
-- No RLS policies = service role only (data sovereignty)

-- ── community_offers ──────────────────────────────────────────────────────────

create table if not exists community_offers (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- What the community org has to offer (anonymous, sector-level only)
  offer_summary text not null,
  sector_tags   text[] not null default '{}',
  org_size      text check (org_size in ('micro','small','medium','large','unknown')),
  region        text default 'WA',

  -- Source channel
  source        text not null check (source in ('kai','mob-field','manual')),

  -- Matching state (populated by pattern-detect.mjs)
  matched_signal_id  uuid,              -- FK to community_signals if a match is found
  match_confidence   text check (match_confidence in ('high','medium','low')),

  -- Review state
  reviewed      boolean not null default false,
  reviewed_at   timestamptz,
  review_notes  text
);

create index idx_community_offers_tags    on community_offers using gin (sector_tags);
create index idx_community_offers_created on community_offers (created_at desc);

alter table community_offers enable row level security;
-- No RLS policies = service role only (data sovereignty)

-- ── patterns ──────────────────────────────────────────────────────────────────

create table if not exists patterns (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Pattern description (generalised, stripped of identifying detail)
  summary       text not null,
  sector_tags   text[] not null default '{}',
  signal_count  integer not null default 0,   -- number of independent signals contributing
  earliest_signal_at  timestamptz,
  latest_signal_at    timestamptz,

  -- Traceability gate
  traceability_verdict    text not null default 'PENDING'
                          check (traceability_verdict in ('PASS','FAIL','REVIEW','PENDING')),
  traceability_reasoning  jsonb,
  traceability_checked_at timestamptz,

  -- Publication state (human-controlled)
  status        text not null default 'accumulating'
                check (status in ('accumulating','ready','published','skipped')),
  newsletter_draft  text,        -- Waymaker-generated draft, human edits before publish
  substack_draft    text,
  linkedin_draft    text,
  drafts_generated_at timestamptz,

  -- Human review
  reviewed      boolean not null default false,
  reviewed_at   timestamptz,
  review_notes  text
);

create index idx_patterns_tags    on patterns using gin (sector_tags);
create index idx_patterns_status  on patterns (status);
create index idx_patterns_verdict on patterns (traceability_verdict);
create index idx_patterns_created on patterns (created_at desc);

alter table patterns enable row level security;
-- No RLS policies = service role only (data sovereignty)
