-- Create profiles table
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  avatar_url text,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- Create progress table
create table if not exists progress (
  user_id uuid references auth.users on delete cascade,
  store text not null,
  data jsonb not null,
  updated_at timestamptz default now(),
  primary key (user_id, store)
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table progress enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone" on profiles
  for select using (is_public = true or auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can delete their own profile" on profiles
  for delete using (auth.uid() = id);

-- Progress Policies
create policy "Users can modify their own progress" on progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Progress is viewable if user profile is public" on progress
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = progress.user_id and profiles.is_public = true
    )
  );
