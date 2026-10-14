-- ============================================================================
-- ⭐️ نجوم برج العرب (Borg El Arab Stars) — Complete Supabase Database Schema
-- File: supabase/migrations/20241014_init_schema.sql
-- ============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PROFILES (1:1 with auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  nickname text,
  phone text not null,
  role text not null default 'player' check (role in ('player', 'admin')),
  position text check (position in ('GK', 'DEF', 'MID', 'ATT')),
  avatar_sticker text,
  avatar_url text,
  fifa_pac int default 85 check (fifa_pac between 40 and 99),
  fifa_sho int default 85 check (fifa_sho between 40 and 99),
  fifa_pas int default 85 check (fifa_pas between 40 and 99),
  fifa_dri int default 85 check (fifa_dri between 40 and 99),
  fifa_def int default 65 check (fifa_def between 40 and 99),
  fifa_phy int default 80 check (fifa_phy between 40 and 99),
  created_at timestamptz default now()
);

-- Index for phone queries & role lookups
create index if not exists idx_profiles_role on public.profiles (role);

-- ----------------------------------------------------------------------------
-- 2. PITCH SETTINGS (Single row, admin editable)
-- ----------------------------------------------------------------------------
create table if not exists public.pitch_settings (
  id int primary key default 1 check (id = 1),
  open_hour int not null default 16,            -- 4 PM
  close_hour int not null default 26,           -- 2 AM (next day)
  slot_minutes int not null default 60,
  price_per_slot_egp int not null default 300,
  whatsapp_number text default '201012345678',
  cancel_before_hours int not null default 3,
  address text default 'برج العرب القديمة — بجوار محطة القطار'
);

-- Insert default pitch setting row if not exists
insert into public.pitch_settings (id, open_hour, close_hour, slot_minutes, price_per_slot_egp, whatsapp_number, cancel_before_hours)
values (1, 16, 26, 60, 300, '201012345678', 3)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 3. TEAMS & TEAM MEMBERS
-- ----------------------------------------------------------------------------
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  captain_id uuid not null references public.profiles(id),
  color text default '#25F143',
  badge text,
  max_players int not null default 5,
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (team_id, player_id)
);

create index if not exists idx_team_members_player on public.team_members(player_id);

-- ----------------------------------------------------------------------------
-- 4. BOOKINGS (Hourly pitch slots)
-- ----------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  slot_start timestamptz not null,
  booked_by uuid references public.profiles(id),
  team_a uuid references public.teams(id),
  team_b uuid references public.teams(id),
  is_open_challenge boolean default false,
  kind text not null default 'team' check (kind in ('team', 'private', 'blocked')),
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  note text,
  created_at timestamptz default now()
);

-- Database-level protection against double-booking
create unique index if not exists one_active_booking_per_slot
  on public.bookings (slot_start) where status = 'confirmed';

-- ----------------------------------------------------------------------------
-- 5. TOURNAMENTS & TOURNAMENT TEAMS
-- ----------------------------------------------------------------------------
create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  format text not null check (format in ('league', 'knockout')),
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'finished')),
  starts_on date,
  ends_on date,
  champion_team uuid references public.teams(id),
  created_at timestamptz default now()
);

create table if not exists public.tournament_teams (
  tournament_id uuid references public.tournaments(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  primary key (tournament_id, team_id)
);

-- ----------------------------------------------------------------------------
-- 6. MATCHES
-- ----------------------------------------------------------------------------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id),
  tournament_id uuid references public.tournaments(id),
  round_label text,
  home_team uuid not null references public.teams(id),
  away_team uuid not null references public.teams(id),
  home_score int default 0,
  away_score int default 0,
  status text not null default 'scheduled' check (status in ('scheduled', 'live', 'pending_review', 'final')),
  current_minute int default 0,
  submitted_by uuid references public.profiles(id),
  played_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- 7. GOALS (With Registered Squad Scorer OR Guest / لاعب ضيف Option)
-- ----------------------------------------------------------------------------
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  team_id uuid not null references public.teams(id),
  scorer_id uuid references public.profiles(id),  -- nullable when is_guest or own-goal
  is_guest boolean not null default false,        -- User requirement: guest goal support
  guest_name text,                                -- e.g. "كابتن محمود (ضيف)"
  assist_id uuid references public.profiles(id),
  minute int,
  is_own_goal boolean not null default false
);

create index if not exists idx_goals_match on public.goals (match_id);
create index if not exists idx_goals_scorer on public.goals (scorer_id);

-- ----------------------------------------------------------------------------
-- 8. FUN LAYER: MVP VOTES, COMICS, STICKERS, ACTIVITY FEED
-- ----------------------------------------------------------------------------
create table if not exists public.mvp_votes (
  match_id uuid references public.matches(id) on delete cascade,
  voter_id uuid references public.profiles(id) on delete cascade,
  player_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (match_id, voter_id)
);

create table if not exists public.comics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,
  caption text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.player_stickers (
  player_id uuid references public.profiles(id) on delete cascade,
  sticker_id text not null,
  earned_at timestamptz default now(),
  primary key (player_id, sticker_id)
);

create table if not exists public.activity_feed (
  id bigint generated always as identity primary key,
  type text not null, -- 'goal','match_final','booking','team_created','team_full','sticker','tournament'
  actor_id uuid references public.profiles(id),
  payload jsonb not null default '{}',
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- 9. SAFE PUBLIC VIEWS
-- ----------------------------------------------------------------------------

-- Public profile view (hides private phone number)
create or replace view public.v_public_profiles as
select
  id,
  full_name,
  nickname,
  position,
  avatar_sticker,
  avatar_url,
  fifa_pac,
  fifa_sho,
  fifa_pas,
  fifa_dri,
  fifa_def,
  fifa_phy,
  created_at
from public.profiles;

-- Public bookings view (hides private admin note & booked_by)
create or replace view public.v_public_bookings as
select
  b.id,
  b.slot_start,
  b.team_a,
  b.team_b,
  b.is_open_challenge,
  b.kind,
  b.status,
  ta.name as team_a_name,
  tb.name as team_b_name
from public.bookings b
left join public.teams ta on b.team_a = ta.id
left join public.teams tb on b.team_b = tb.id;

-- Top scorers view (computed from final matches, registered players)
create or replace view public.v_top_scorers as
select
  p.id as player_id,
  p.full_name,
  p.nickname,
  p.position,
  p.avatar_url,
  p.avatar_sticker,
  coalesce(t.name, 'حر') as team_name,
  count(g.id)::int as goals_count,
  count(distinct m.id)::int as matches_count
from public.goals g
join public.matches m on g.match_id = m.id
join public.profiles p on g.scorer_id = p.id
left join public.team_members tm on tm.player_id = p.id
left join public.teams t on tm.team_id = t.id
where m.status = 'final'
  and g.is_own_goal = false
  and g.is_guest = false
group by p.id, p.full_name, p.nickname, p.position, p.avatar_url, p.avatar_sticker, t.name
order by goals_count desc;

-- Top assists view
create or replace view public.v_top_assists as
select
  p.id as player_id,
  p.full_name,
  p.nickname,
  p.position,
  p.avatar_url,
  count(g.id)::int as assists_count
from public.goals g
join public.matches m on g.match_id = m.id
join public.profiles p on g.assist_id = p.id
where m.status = 'final'
group by p.id, p.full_name, p.nickname, p.position, p.avatar_url
order by assists_count desc;

-- Standings view per tournament
create or replace view public.v_standings as
with team_matches as (
  select
    m.tournament_id,
    m.home_team as team_id,
    case when m.home_score > m.away_score then 1 else 0 end as won,
    case when m.home_score = m.away_score then 1 else 0 end as drawn,
    case when m.home_score < m.away_score then 1 else 0 end as lost,
    m.home_score as gf,
    m.away_score as ga
  from public.matches m
  where m.status = 'final' and m.tournament_id is not null
  union all
  select
    m.tournament_id,
    m.away_team as team_id,
    case when m.away_score > m.home_score then 1 else 0 end as won,
    case when m.away_score = m.home_score then 1 else 0 end as drawn,
    case when m.away_score < m.home_score then 1 else 0 end as lost,
    m.away_score as gf,
    m.home_score as ga
  from public.matches m
  where m.status = 'final' and m.tournament_id is not null
)
select
  tm.tournament_id,
  t.id as team_id,
  t.name as team_name,
  t.color as team_color,
  count(*)::int as played,
  sum(tm.won)::int as won,
  sum(tm.drawn)::int as drawn,
  sum(tm.lost)::int as lost,
  sum(tm.gf)::int as goals_for,
  sum(tm.ga)::int as goals_against,
  (sum(tm.gf) - sum(tm.ga))::int as goal_diff,
  (sum(tm.won) * 3 + sum(tm.drawn))::int as points
from team_matches tm
join public.teams t on tm.team_id = t.id
group by tm.tournament_id, t.id, t.name, t.color
order by points desc, goal_diff desc, goals_for desc;

-- ----------------------------------------------------------------------------
-- 10. TRIGGERS & SECURITY FUNCTIONS
-- ----------------------------------------------------------------------------

-- Function: Auto-create public.profiles upon auth.users signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    nickname,
    phone,
    role,
    position
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'لاعب جديد'),
    new.raw_user_meta_data->>'nickname',
    coalesce(new.raw_user_meta_data->>'phone', '01000000000'),
    'player',
    coalesce(new.raw_user_meta_data->>'position', 'MID')
  );
  return new;
end;
$$;

-- Trigger: On auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function: Prevent role escalation (non-admin cannot elevate role)
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text;
begin
  if auth.uid() is not null and new.role <> old.role then
    select role into caller_role from public.profiles where id = auth.uid();
    if caller_role is distinct from 'admin' then
      raise exception 'غير مسموح بتعديل الصلاحيات إلا من قبل الإدارة.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists check_role_escalation on public.profiles;
create trigger check_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- Function: Enforce max 5 players per team
create or replace function public.check_team_max_players()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count int;
  max_limit int;
  team_label text;
begin
  select count(*), max(t.max_players), max(t.name)
    into current_count, max_limit, team_label
  from public.team_members tm
  join public.teams t on tm.team_id = t.id
  where tm.team_id = new.team_id;

  if current_count >= coalesce(max_limit, 5) then
    raise exception 'الفريق مكتمل بالعدد الأقصى (% لاعبين)!', coalesce(max_limit, 5);
  end if;

  -- Activity feed notification if full after join
  if (current_count + 1) = coalesce(max_limit, 5) then
    insert into public.activity_feed (type, actor_id, payload)
    values ('team_full', new.player_id, json_build_object('team_id', new.team_id, 'team_name', team_label));
  end if;

  return new;
end;
$$;

drop trigger if exists trigger_enforce_team_size on public.team_members;
create trigger trigger_enforce_team_size
  before insert on public.team_members
  for each row execute function public.check_team_max_players();

-- ----------------------------------------------------------------------------
-- 11. RPC: Atomic Slot Booking
-- ----------------------------------------------------------------------------
create or replace function public.book_slot(
  p_slot_start timestamptz,
  p_team_name text,
  p_is_open_challenge boolean default false,
  p_kind text default 'team'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_team_id uuid;
  v_booking_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'يجب تسجيل الدخول لإتمام الحجز.';
  end if;

  if p_slot_start <= now() then
    raise exception 'لا يمكن حجز موعد في الماضي.';
  end if;

  -- 1. Check or create team for the booking captain
  select id into v_team_id from public.teams where name = trim(p_team_name) and captain_id = v_user_id limit 1;

  if v_team_id is null then
    insert into public.teams (name, captain_id, max_players)
    values (trim(p_team_name), v_user_id, 5)
    returning id into v_team_id;

    -- Add captain as first member
    insert into public.team_members (team_id, player_id)
    values (v_team_id, v_user_id)
    on conflict do nothing;
  end if;

  -- 2. Create confirmed booking
  insert into public.bookings (
    slot_start,
    booked_by,
    team_a,
    is_open_challenge,
    kind,
    status
  ) values (
    p_slot_start,
    v_user_id,
    v_team_id,
    p_is_open_challenge,
    p_kind,
    'confirmed'
  )
  returning id into v_booking_id;

  -- 3. Log activity feed
  insert into public.activity_feed (type, actor_id, payload)
  values ('booking', v_user_id, json_build_object(
    'booking_id', v_booking_id,
    'team_id', v_team_id,
    'team_name', p_team_name,
    'slot_start', p_slot_start
  ));

  return jsonb_build_object(
    'success', true,
    'booking_id', v_booking_id,
    'team_id', v_team_id,
    'slot_start', p_slot_start
  );
end;
$$;

-- ----------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.pitch_settings enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.bookings enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_teams enable row level security;
alter table public.matches enable row level security;
alter table public.goals enable row level security;
alter table public.mvp_votes enable row level security;
alter table public.comics enable row level security;
alter table public.player_stickers enable row level security;
alter table public.activity_feed enable row level security;

-- Helper to check admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- PROFILES RLS
create policy "Public can read profiles metadata" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admin has full profile access" on public.profiles
  for all using (public.is_admin());

-- PITCH SETTINGS RLS
create policy "Public can read pitch settings" on public.pitch_settings
  for select using (true);

create policy "Admin can update pitch settings" on public.pitch_settings
  for update using (public.is_admin());

-- TEAMS RLS
create policy "Public can view teams" on public.teams
  for select using (true);

create policy "Registered users can create teams" on public.teams
  for insert with check (auth.role() = 'authenticated');

create policy "Captain or admin can update team" on public.teams
  for update using (captain_id = auth.uid() or public.is_admin());

-- TEAM MEMBERS RLS
create policy "Public can view team members" on public.team_members
  for select using (true);

create policy "Players can join team or captain can add" on public.team_members
  for insert with check (auth.role() = 'authenticated');

create policy "Player can leave or captain can remove" on public.team_members
  for delete using (
    player_id = auth.uid()
    or exists (select 1 from public.teams where id = team_id and captain_id = auth.uid())
    or public.is_admin()
  );

-- BOOKINGS RLS
create policy "Public can read bookings" on public.bookings
  for select using (true);

create policy "Authenticated users can book" on public.bookings
  for insert with check (auth.role() = 'authenticated');

create policy "Booker or admin can cancel" on public.bookings
  for update using (booked_by = auth.uid() or public.is_admin());

-- MATCHES & GOALS RLS
create policy "Public can view matches" on public.matches
  for select using (true);

create policy "Captain or admin can insert/update matches" on public.matches
  for all using (
    public.is_admin()
    or exists (select 1 from public.teams where (id = home_team or id = away_team) and captain_id = auth.uid())
  );

create policy "Public can view goals" on public.goals
  for select using (true);

create policy "Captain or admin can insert goals" on public.goals
  for insert with check (
    public.is_admin()
    or exists (
      select 1 from public.matches m
      join public.teams t on (t.id = m.home_team or t.id = m.away_team)
      where m.id = match_id and t.captain_id = auth.uid()
    )
  );

create policy "Admin can delete goals" on public.goals
  for delete using (public.is_admin());

-- FUN & FEED RLS
create policy "Public can view comics" on public.comics
  for select using (is_published = true or public.is_admin());

create policy "Admin can manage comics" on public.comics
  for all using (public.is_admin());

create policy "Public can view player stickers" on public.player_stickers
  for select using (true);

create policy "Public can view activity feed" on public.activity_feed
  for select using (true);

create policy "Public can view mvp votes" on public.mvp_votes
  for select using (true);

create policy "Players can vote MVP once per match" on public.mvp_votes
  for insert with check (auth.uid() = voter_id);
