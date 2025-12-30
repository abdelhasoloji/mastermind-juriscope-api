create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  status text not null,
  progress int,
  payload jsonb,
  result jsonb,
  error text,
  created_by uuid not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
