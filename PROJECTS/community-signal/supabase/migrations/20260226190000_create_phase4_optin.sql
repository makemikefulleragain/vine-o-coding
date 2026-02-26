-- Phase 4: OFFER — opted-in contacts table
-- Constitutional: consent is architecture. Nothing stored without explicit opt-in.
-- Nothing sent without human (Mike) approval.
-- Unsubscribe deletes ALL data instantly, no questions.

create table if not exists opted_in_contacts (
  id                uuid primary key default gen_random_uuid(),

  -- Identity (minimum viable — no more than needed)
  email             text not null unique,
  first_name        text,
  org_name          text,
  sector_tags       text[] default '{}',

  -- Consent record (constitutional requirement)
  consent_given_at  timestamptz not null default now(),
  consent_source    text not null,        -- 'kai-consulting', 'kai-kamunity', 'manual'
  consent_text      text not null,        -- exact text shown at opt-in moment

  -- Matching context (from Kai conversation — no signal source detail)
  interest_summary  text,                 -- what they said they were working on
  pattern_tags      text[] default '{}',  -- sector/theme tags from conversation

  -- Outreach state
  last_contacted_at timestamptz,
  contact_count     int default 0,
  unsubscribed_at   timestamptz,          -- null = active; set = unsubscribed

  -- Metadata
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Outreach queue: one row per DM sent or pending
create table if not exists outreach_queue (
  id                uuid primary key default gen_random_uuid(),
  contact_id        uuid not null references opted_in_contacts(id) on delete cascade,
  library_id        uuid references commons_library(id) on delete set null,

  -- The message
  subject           text not null,
  body_text         text not null,        -- plain text version (the actual email)
  artifact_title    text,
  artifact_content  text,                 -- included inline, not as attachment

  -- Matching rationale (transparent, non-identifying)
  match_reason      text,                 -- "We generated this because we're seeing X pattern"

  -- Review + send state
  status            text not null default 'pending',
  -- pending | approved | sent | bounced | responded
  reviewed_by       text,
  reviewed_at       timestamptz,
  sent_at           timestamptz,
  resend_message_id text,                 -- Resend delivery ID

  -- Response tracking
  responded_at      timestamptz,
  response_notes    text,

  -- Metadata
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Indexes
create index if not exists opted_in_contacts_email_idx on opted_in_contacts(email);
create index if not exists opted_in_contacts_active_idx on opted_in_contacts(unsubscribed_at) where unsubscribed_at is null;
create index if not exists outreach_queue_status_idx on outreach_queue(status);
create index if not exists outreach_queue_contact_idx on outreach_queue(contact_id);
