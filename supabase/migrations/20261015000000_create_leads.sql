-- Lead capture table for the quote / estimate forms.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- The public site (anon key) may only insert. Reading leads requires the
-- service role (Supabase dashboard) or an authenticated policy you add later.
drop policy if exists "Allow anonymous lead inserts" on public.leads;
create policy "Allow anonymous lead inserts"
  on public.leads
  for insert
  to anon
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(phone) between 7 and 40
    and char_length(coalesce(message, '')) <= 5000
  );
