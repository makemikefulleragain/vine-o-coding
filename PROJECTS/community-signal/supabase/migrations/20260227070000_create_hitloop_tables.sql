-- HitLoop: Self-improving research engine
-- Creates: research_strategy, research_runs

-- ── research_strategy ─────────────────────────────────────────────────────
-- Tracks research topics, their performance, and evolution over time.
-- Fed by two sources:
--   1. System-generated (from high-scoring signals + constellation patterns)
--   2. Mob Field Reports (human-submitted via [FIELD] email prefix)

create table if not exists research_strategy (
  id                bigint generated always as identity primary key,
  topic             text        not null unique,
  source_type       text        not null check (source_type in ('system', 'mob_field')),
  prompt_template   text        not null,
  score_avg         numeric(4,2) not null default 5.0,
  run_count         int         not null default 0,
  last_run_at       timestamptz,
  priority_weight   numeric(3,2) not null default 1.0,  -- mob_field starts at 1.5, system at 1.0
  status            text        not null default 'active'
                    check (status in ('active', 'paused', 'retired')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  notes             text
);

create index idx_research_strategy_status on research_strategy (status);
create index idx_research_strategy_score  on research_strategy (score_avg desc);
create index idx_research_strategy_priority on research_strategy (priority_weight desc);

alter table research_strategy enable row level security;
create policy "Service role only" on research_strategy
  using (auth.role() = 'service_role');


-- ── research_runs ──────────────────────────────────────────────────────────
-- Tracks each execution of the research engine.
-- Links generated signals back to the research topic that spawned them.

create table if not exists research_runs (
  id                bigint generated always as identity primary key,
  strategy_id       bigint      not null references research_strategy(id) on delete cascade,
  run_at            timestamptz not null default now(),
  prompt_used       text        not null,
  signals_generated int         not null default 0,
  avg_score         numeric(4,2),
  duration_ms       int,
  status            text        not null check (status in ('success', 'failure', 'partial')),
  error_message     text
);

create index idx_research_runs_strategy on research_runs (strategy_id);
create index idx_research_runs_run_at   on research_runs (run_at desc);

alter table research_runs enable row level security;
create policy "Service role only" on research_runs
  using (auth.role() = 'service_role');


-- ── Helper function: Update strategy score after run ──────────────────────

create or replace function update_research_strategy_score(
  p_strategy_id bigint,
  p_new_avg_score numeric
)
returns void language plpgsql security definer as $$
begin
  update research_strategy
  set score_avg   = (score_avg * run_count + p_new_avg_score) / (run_count + 1),
      run_count   = run_count + 1,
      last_run_at = now(),
      updated_at  = now()
  where id = p_strategy_id;
end;
$$;
