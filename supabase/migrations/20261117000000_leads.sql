-- By Lado: leads from the consult form, the extension-check quiz and the guide download.
create extension if not exists pgcrypto;
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('consult','quiz','guide')),
  name text check (name is null or char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone text check (phone is null or char_length(phone) between 6 and 40),
  whatsapp_ok boolean default false,
  type text, slots text[], message text check (message is null or char_length(message) <= 5000),
  calc jsonb, quiz jsonb, lang text default 'nl', page text, utm jsonb, files text[] default '{}',
  status text not null default 'nieuw'
);
alter table public.leads enable row level security;
drop policy if exists "anon insert" on public.leads;
create policy "anon insert" on public.leads for insert to anon with check (true);

create or replace function public.leads_rate_limit() returns trigger language plpgsql security definer as $$
begin
  if (select count(*) from public.leads where lower(email) = lower(new.email) and created_at > now() - interval '10 minutes') >= 3 then raise exception 'rate_limited'; end if;
  if (select count(*) from public.leads where created_at > now() - interval '10 minutes') >= 30 then raise exception 'rate_limited'; end if;
  return new;
end $$;
drop trigger if exists leads_rate_limit on public.leads;
create trigger leads_rate_limit before insert on public.leads for each row execute function public.leads_rate_limit();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('haarfotos', 'haarfotos', false, 10485760, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;
drop policy if exists "anon upload haarfotos" on storage.objects;
create policy "anon upload haarfotos" on storage.objects for insert to anon with check (bucket_id = 'haarfotos');
