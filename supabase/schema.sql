create table if not exists diagnostic_runs (
  id text primary key,
  symptom text not null,
  suspected_cause text not null,
  recommendation text not null,
  opened_ticket boolean not null default false,
  created_at timestamptz not null default now()
);
