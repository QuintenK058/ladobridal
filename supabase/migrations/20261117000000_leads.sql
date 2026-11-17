-- Leads from the availability / quote funnel.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  wedding_date  date,
  wedding_month text,
  wedding_year  text,
  service       text not null check (service in ('complete','kapsel','visagie','gasten','destination')),
  region        text not null,
  country       text,
  venue         text,
  persons       text,
  mother        boolean default false,
  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone         text not null check (char_length(phone) between 6 and 40),
  source        text,
  message       text check (char_length(message) <= 5000),
  calc          jsonb,
  lang          text default 'nl',
  page          text,
  utm           jsonb,
  files         text[] default '{}',
  status        text not null default 'nieuw'
);

alter table public.leads enable row level security;

-- The website (anon key) may only INSERT. Nobody can read leads with the anon key.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads" on public.leads for insert to anon with check (true);

-- Server-side rate limit: max 3 leads per email and max 20 overall per 10 minutes.
create or replace function public.leads_rate_limit() returns trigger language plpgsql security definer as $$
begin
  if (select count(*) from public.leads where lower(email) = lower(new.email) and created_at > now() - interval '10 minutes') >= 3 then
    raise exception 'rate_limited';
  end if;
  if (select count(*) from public.leads where created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'rate_limited';
  end if;
  return new;
end $$;
drop trigger if exists leads_rate_limit on public.leads;
create trigger leads_rate_limit before insert on public.leads for each row execute function public.leads_rate_limit();

-- Inspiration photos: private bucket, anon may upload only (max 10 MB, images only).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('inspiratie', 'inspiratie', false, 10485760, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;

drop policy if exists "anon can upload inspiration" on storage.objects;
create policy "anon can upload inspiration" on storage.objects for insert to anon with check (bucket_id = 'inspiratie');
