-- Portfolio schema for Supabase.
-- Apply with the Supabase SQL Editor, or `supabase db push` if using the CLI.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  long_description text not null default '',
  category text not null default '',
  type text not null default 'development'
    check (type in ('development', 'design')),
  date date,
  client text not null default '',
  image text not null default '',
  images text[] not null default '{}',
  technologies text[] not null default '{}',
  github_url text,
  live_url text,
  behance_url text,
  preview_url text,
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null default '',
  email text not null,
  subject text not null default '',
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- Projects: anyone can read, only signed-in admins can write.
drop policy if exists "Projects are publicly readable" on public.projects;
create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- Messages: anyone can submit, only signed-in admins can read/update/delete.
drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read messages" on public.messages;
create policy "Admins can read messages"
  on public.messages for select
  to authenticated
  using (true);

drop policy if exists "Admins can update messages" on public.messages;
create policy "Admins can update messages"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete messages" on public.messages;
create policy "Admins can delete messages"
  on public.messages for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Table privileges (RLS policies still filter which rows are visible)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: public bucket for project images, admin-only writes.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "Project images are publicly readable" on storage.objects;
create policy "Project images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
