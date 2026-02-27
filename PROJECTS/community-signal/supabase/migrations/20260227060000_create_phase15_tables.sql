-- Phase 1.5: PRODUCTION SOURCES
-- Creates: source_fetch_log, discovered_sources, sector_constellation, org_constellation

-- ── source_fetch_log ──────────────────────────────────────────────────────────
-- Tracks every RSS scheduler fetch attempt (success or failure)

create table if not exists source_fetch_log (
  id               bigint generated always as identity primary key,
  source_id        text        not null,
  source_name      text        not null,
  fetched_at       timestamptz not null default now(),
  status           text        not null check (status in ('success','failure','skipped')),
  signals_queued   int         not null default 0,
  error_message    text,
  duration_ms      int
);

create index idx_source_fetch_log_source_id  on source_fetch_log (source_id);
create index idx_source_fetch_log_fetched_at on source_fetch_log (fetched_at desc);

-- RLS: service role only
alter table source_fetch_log enable row level security;
create policy "Service role only" on source_fetch_log
  using (auth.role() = 'service_role');


-- ── discovered_sources ────────────────────────────────────────────────────────
-- Candidate sources found by the source-discovery engine, awaiting human review

create table if not exists discovered_sources (
  id               bigint generated always as identity primary key,
  org_name         text        not null,
  website_url      text        not null,
  rss_url          text,
  discovered_via   text        not null,   -- e.g. 'walga_member_list', 'approved_source_link', 'sector_directory'
  relevance_score  numeric(4,3) not null default 0,
  small_cohort_flag boolean    not null default false,
  status           text        not null default 'pending_review'
                   check (status in ('pending_review','approved','rejected','flagged')),
  reviewed_by      text,
  reviewed_at      timestamptz,
  notes            text,
  discovered_at    timestamptz not null default now()
);

create index idx_discovered_sources_status       on discovered_sources (status);
create index idx_discovered_sources_relevance    on discovered_sources (relevance_score desc);
create index idx_discovered_sources_discovered_at on discovered_sources (discovered_at desc);

alter table discovered_sources enable row level security;
create policy "Service role only" on discovered_sources
  using (auth.role() = 'service_role');


-- ── sector_constellation ──────────────────────────────────────────────────────
-- Tracks co-occurrence of sector taxonomy tags across all ingested signals.
-- Updated by signal-filter.mjs on every signal write.

create table if not exists sector_constellation (
  id                  bigint generated always as identity primary key,
  tag_a               text    not null,
  tag_b               text    not null,
  co_occurrence_count int     not null default 1,
  last_seen           date    not null default current_date,
  -- Derived strength: normalised 0-1 at query time (count / max count in table)
  constraint uq_tag_pair unique (tag_a, tag_b),
  constraint ck_tag_order check (tag_a < tag_b)   -- enforce canonical ordering (a < b alphabetically)
);

create index idx_sector_constellation_tags on sector_constellation (tag_a, tag_b);
create index idx_sector_constellation_count on sector_constellation (co_occurrence_count desc);

alter table sector_constellation enable row level security;
create policy "Service role only" on sector_constellation
  using (auth.role() = 'service_role');

-- RPC: atomically increment co-occurrence count (upsert)
create or replace function increment_tag_cooccurrence(p_tag_a text, p_tag_b text)
returns void language plpgsql security definer as $$
declare
  v_a text := least(p_tag_a, p_tag_b);
  v_b text := greatest(p_tag_a, p_tag_b);
begin
  insert into sector_constellation (tag_a, tag_b, co_occurrence_count, last_seen)
  values (v_a, v_b, 1, current_date)
  on conflict (tag_a, tag_b) do update
    set co_occurrence_count = sector_constellation.co_occurrence_count + 1,
        last_seen            = current_date;
end;
$$;


-- ── org_constellation ─────────────────────────────────────────────────────────
-- Tracks co-mention of organisations across ingested signals.
-- Updated by signal-filter.mjs NER step on every signal write.
-- Tracks PUBLIC organisations only — never individuals.

create table if not exists org_constellation (
  id                  bigint generated always as identity primary key,
  org_a               text    not null,
  org_b               text    not null,
  relationship_type   text    not null default 'co-mention',
  signal_count        int     not null default 1,
  last_seen           date    not null default current_date,
  context_summary     text,    -- brief note on nature of relationship (e.g. 'digital inclusion project partnership')
  constraint uq_org_pair unique (org_a, org_b),
  constraint ck_org_order check (org_a < org_b)   -- enforce canonical ordering
);

create index idx_org_constellation_orgs  on org_constellation (org_a, org_b);
create index idx_org_constellation_count on org_constellation (signal_count desc);

alter table org_constellation enable row level security;
create policy "Service role only" on org_constellation
  using (auth.role() = 'service_role');

-- RPC: atomically increment org co-mention count (upsert)
create or replace function increment_org_comention(
  p_org_a text,
  p_org_b text,
  p_context text default null
)
returns void language plpgsql security definer as $$
declare
  v_a text := least(p_org_a, p_org_b);
  v_b text := greatest(p_org_a, p_org_b);
begin
  insert into org_constellation (org_a, org_b, signal_count, last_seen, context_summary)
  values (v_a, v_b, 1, current_date, p_context)
  on conflict (org_a, org_b) do update
    set signal_count     = org_constellation.signal_count + 1,
        last_seen        = current_date,
        context_summary  = coalesce(p_context, org_constellation.context_summary);
end;
$$;
