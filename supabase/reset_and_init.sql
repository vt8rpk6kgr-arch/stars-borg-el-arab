-- ============================================================================
-- ⭐️ نجوم برج العرب (Borg El Arab Stars) — Complete Reset & Setup Script
-- File: supabase/reset_and_init.sql
-- Run this in Supabase Dashboard -> SQL Editor -> Click RUN
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. CLEAN RESET (مسح نظيف لجميع الجداول السابقة)
-- ----------------------------------------------------------------------------
drop schema if exists public cascade;
create schema public;

-- Restore standard schema permissions
grant all on schema public to postgres;
grant all on schema public to public;
grant all on schema public to anon;
grant all on schema public to authenticated;
grant all on schema public to service_role;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PROFILES (بيانات وكروت اللاعبين)
-- Note: id is UUID without hard FK to auth.users so demo seed data works cleanly,
-- while auth triggers seamlessly sync real authenticated users upon signup.
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
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

create index idx_profiles_role on public.profiles (role);

-- ----------------------------------------------------------------------------
-- 2. PITCH SETTINGS (إعدادات الملعب وسعر الساعة والواتساب)
-- ----------------------------------------------------------------------------
create table public.pitch_settings (
  id int primary key default 1 check (id = 1),
  open_hour int not null default 16,            -- 4 PM
  close_hour int not null default 26,           -- 2 AM (next day)
  slot_minutes int not null default 60,
  price_per_slot_egp int not null default 300,
  whatsapp_number text default '201012345678',
  cancel_before_hours int not null default 3,
  address text default 'برج العرب القديمة — بجوار محطة القطار'
);

insert into public.pitch_settings (id, open_hour, close_hour, slot_minutes, price_per_slot_egp, whatsapp_number, cancel_before_hours)
values (1, 16, 26, 60, 300, '201012345678', 3)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 3. TEAMS & SQUAD MEMBERS (الفرق وتشكيل الخماسي)
-- ----------------------------------------------------------------------------
create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  captain_id uuid not null references public.profiles(id) on delete cascade,
  color text default '#25F143',
  badge text,
  max_players int not null default 5,
  created_at timestamptz default now()
);

create table public.team_members (
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (team_id, player_id)
);

create index idx_team_members_player on public.team_members(player_id);

-- ----------------------------------------------------------------------------
-- 4. BOOKINGS (حجوزات الملعب)
-- ----------------------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  slot_start timestamptz not null,
  booked_by uuid references public.profiles(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled', 'blocked')),
  price_egp int not null default 300,
  is_open_challenge boolean default false,
  notes text,
  created_at timestamptz default now(),
  constraint uq_booking_slot unique (slot_start)
);

create index idx_bookings_slot on public.bookings (slot_start);

-- ----------------------------------------------------------------------------
-- 5. TOURNAMENTS (البطولات والدوريات)
-- ----------------------------------------------------------------------------
create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  format text not null default 'league' check (format in ('league', 'knockout')),
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'finished')),
  starts_on date,
  ends_on date,
  champion_team_id uuid references public.teams(id),
  created_at timestamptz default now()
);

create table public.tournament_teams (
  tournament_id uuid references public.tournaments(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  primary key (tournament_id, team_id)
);

-- ----------------------------------------------------------------------------
-- 6. MATCHES (المباريات الرسمية)
-- ----------------------------------------------------------------------------
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid references public.tournaments(id) on delete set null,
  booking_id uuid references public.bookings(id) on delete set null,
  home_team uuid not null references public.teams(id) on delete cascade,
  away_team uuid not null references public.teams(id) on delete cascade,
  home_score int not null default 0,
  away_score int not null default 0,
  status text not null default 'scheduled' check (status in ('scheduled', 'live', 'final', 'pending_approval')),
  current_minute int default 0,
  played_at timestamptz default now(),
  round_label text default 'مباراة ودية',
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- 7. GOALS (الأهداف الحية — مع دعم لاعب ضيف Guest)
-- ----------------------------------------------------------------------------
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  scorer_player_id uuid references public.profiles(id) on delete set null,
  is_guest boolean not null default false,
  guest_name text,
  assist_player_id uuid references public.profiles(id) on delete set null,
  minute int not null default 0,
  is_own_goal boolean not null default false,
  created_at timestamptz default now()
);

create index idx_goals_match on public.goals (match_id);
create index idx_goals_scorer on public.goals (scorer_player_id);

-- ----------------------------------------------------------------------------
-- 8. MVP VOTES (تصويت رجل المباراة)
-- ----------------------------------------------------------------------------
create table public.mvp_votes (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  voter_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  constraint uq_match_voter unique (match_id, voter_id)
);

-- ----------------------------------------------------------------------------
-- 9. COMICS & STICKERS (كوميكس واستيكرز الكورة المصرية)
-- ----------------------------------------------------------------------------
create table public.comics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text,
  image_url text not null,
  author_id uuid references public.profiles(id) on delete set null,
  is_published boolean default true,
  likes_count int default 0,
  created_at timestamptz default now()
);

create table public.stickers (
  id text primary key,
  title text not null,
  quote text not null,
  category text not null,
  badge_color text not null,
  rarity text not null default 'common',
  icon text not null default '⚽'
);

create table public.player_stickers (
  player_id uuid references public.profiles(id) on delete cascade,
  sticker_id text references public.stickers(id) on delete cascade,
  unlocked_at timestamptz default now(),
  primary key (player_id, sticker_id)
);

-- ----------------------------------------------------------------------------
-- 10. ACTIVITY FEED (شريط أخبار الملعب الحي)
-- ----------------------------------------------------------------------------
create table public.activity_feed (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('goal', 'result', 'booking', 'comic', 'mvp', 'sticker')),
  title text not null,
  content text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index idx_activity_created on public.activity_feed (created_at desc);

-- ----------------------------------------------------------------------------
-- 11. VIEWS (لوحة الشرف وجدول الترتيب)
-- ----------------------------------------------------------------------------
create or replace view public.leaderboard_scorers as
select
  coalesce(p.id::text, g.guest_name, 'لاعب ضيف') as player_id,
  coalesce(p.full_name, g.guest_name, 'لاعب ضيف') as player_name,
  coalesce(p.nickname, 'ضيف') as nickname,
  coalesce(p.avatar_sticker, 'stk-1') as avatar_sticker,
  coalesce(p.position, 'ATT') as position,
  coalesce(p.fifa_pac, 85) as fifa_pac,
  coalesce(p.fifa_sho, 85) as fifa_sho,
  coalesce(p.fifa_pas, 85) as fifa_pas,
  coalesce(p.fifa_dri, 85) as fifa_dri,
  coalesce(p.fifa_def, 65) as fifa_def,
  coalesce(p.fifa_phy, 80) as fifa_phy,
  t.name as team_name,
  count(g.id) as goals_count
from public.goals g
left join public.profiles p on p.id = g.scorer_player_id
join public.teams t on t.id = g.team_id
where g.is_own_goal = false
group by p.id, p.full_name, p.nickname, p.avatar_sticker, p.position, p.fifa_pac, p.fifa_sho, p.fifa_pas, p.fifa_dri, p.fifa_def, p.fifa_phy, t.name, g.guest_name
order by goals_count desc;

create or replace view public.tournament_standings as
with match_records as (
  select
    m.tournament_id,
    m.home_team as team_id,
    case when m.home_score > m.away_score then 1 else 0 end as win,
    case when m.home_score = m.away_score then 1 else 0 end as draw,
    case when m.home_score < m.away_score then 1 else 0 end as loss,
    m.home_score as gf,
    m.away_score as ga
  from public.matches m where m.status = 'final' and m.tournament_id is not null
  union all
  select
    m.tournament_id,
    m.away_team as team_id,
    case when m.away_score > m.home_score then 1 else 0 end as win,
    case when m.away_score = m.home_score then 1 else 0 end as draw,
    case when m.away_score < m.home_score then 1 else 0 end as loss,
    m.away_score as gf,
    m.home_score as ga
  from public.matches m where m.status = 'final' and m.tournament_id is not null
)
select
  mr.tournament_id,
  t.id as team_id,
  t.name as team_name,
  count(*) as played,
  sum(mr.win) as won,
  sum(mr.draw) as drawn,
  sum(mr.loss) as lost,
  sum(mr.gf) as goals_for,
  sum(mr.ga) as goals_against,
  (sum(mr.gf) - sum(mr.ga)) as goal_diff,
  (sum(mr.win) * 3 + sum(mr.draw)) as points
from match_records mr
join public.teams t on t.id = mr.team_id
group by mr.tournament_id, t.id, t.name
order by points desc, goal_diff desc, goals_for desc;

-- ----------------------------------------------------------------------------
-- 12. TRIGGERS (مزامنة التسجيل وصلاحيات الإدارة)
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'لاعب جديد'),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    'player'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users if available
do $$
begin
  if exists (select 1 from pg_tables where schemaname = 'auth' and tablename = 'users') then
    drop trigger if exists on_auth_user_created on auth.users;
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute function public.handle_new_user();
  end if;
end $$;

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

-- ----------------------------------------------------------------------------
-- 13. ROW LEVEL SECURITY (RLS)
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
alter table public.stickers enable row level security;
alter table public.player_stickers enable row level security;
alter table public.activity_feed enable row level security;

-- Profiles Policies
create policy "Public can read profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admin has full profile access" on public.profiles for all using (public.is_admin());

-- Pitch Settings Policies
create policy "Public can read pitch settings" on public.pitch_settings for select using (true);
create policy "Admin can update pitch settings" on public.pitch_settings for update using (public.is_admin());

-- Teams Policies
create policy "Public can view teams" on public.teams for select using (true);
create policy "Authenticated users can create teams" on public.teams for insert with check (auth.role() = 'authenticated');
create policy "Captain or admin can update team" on public.teams for update using (captain_id = auth.uid() or public.is_admin());

-- Team Members Policies
create policy "Public can view team members" on public.team_members for select using (true);
create policy "Players can join team" on public.team_members for insert with check (auth.role() = 'authenticated');
create policy "Player can leave or captain remove" on public.team_members for delete using (
  player_id = auth.uid()
  or exists (select 1 from public.teams where id = team_id and captain_id = auth.uid())
  or public.is_admin()
);

-- Bookings Policies
create policy "Public can read bookings" on public.bookings for select using (true);
create policy "Authenticated users can book" on public.bookings for insert with check (auth.role() = 'authenticated');
create policy "Booker or admin can cancel" on public.bookings for update using (booked_by = auth.uid() or public.is_admin());

-- Matches & Goals Policies
create policy "Public can view matches" on public.matches for select using (true);
create policy "Captain or admin can update matches" on public.matches for all using (
  public.is_admin()
  or exists (select 1 from public.teams where (id = home_team or id = away_team) and captain_id = auth.uid())
);

create policy "Public can view goals" on public.goals for select using (true);
create policy "Captain or admin can insert goals" on public.goals for insert with check (
  public.is_admin()
  or exists (
    select 1 from public.matches m
    join public.teams t on (t.id = m.home_team or t.id = m.away_team)
    where m.id = match_id and t.captain_id = auth.uid()
  )
);
create policy "Admin can delete goals" on public.goals for delete using (public.is_admin());

-- MVP & Stickers & Comics Policies
create policy "Public can view mvp votes" on public.mvp_votes for select using (true);
create policy "Players can vote MVP" on public.mvp_votes for insert with check (auth.uid() = voter_id);
create policy "Public can view comics" on public.comics for select using (is_published = true or public.is_admin());
create policy "Admin can manage comics" on public.comics for all using (public.is_admin());
create policy "Public can view stickers" on public.stickers for select using (true);
create policy "Public can view player stickers" on public.player_stickers for select using (true);
create policy "Public can view activity feed" on public.activity_feed for select using (true);

-- ----------------------------------------------------------------------------
-- 14. DEMO SEED DATA (بيانات اللاعبين والفرق والمباريات النموذجية)
-- ----------------------------------------------------------------------------
insert into public.profiles (
  id, full_name, nickname, phone, role, position, avatar_sticker, fifa_pac, fifa_sho, fifa_pas, fifa_dri, fifa_def, fifa_phy
) values
  ('11111111-1111-1111-1111-111111111111', 'أحمد زيزو', 'القناص', '01012345678', 'admin', 'ATT', 'stk-1', 89, 92, 84, 88, 58, 80),
  ('22222222-2222-2222-2222-222222222222', 'عمر القناص', 'الفهد', '01212345678', 'player', 'ATT', 'stk-2', 91, 86, 78, 84, 52, 76),
  ('33333333-3333-3333-3333-333333333333', 'محمود تريكة', 'المايسترو', '01112345678', 'player', 'MID', 'stk-3', 80, 82, 90, 87, 64, 75),
  ('44444444-4444-4444-4444-444444444444', 'كريم شيكا', 'الساحر', '01512345678', 'player', 'MID', 'stk-4', 86, 84, 85, 92, 45, 70),
  ('55555555-5555-5555-5555-555555555555', 'إسلام بونو', 'السد العالي', '01099887766', 'player', 'GK', 'stk-6', 65, 40, 68, 62, 90, 88),
  ('66666666-6666-6666-6666-666666666666', 'إبراهيم حسن', 'مسمار النص', '01299887766', 'player', 'DEF', 'stk-10', 78, 60, 75, 72, 88, 92)
on conflict (id) do update set
  full_name = excluded.full_name,
  nickname = excluded.nickname,
  phone = excluded.phone,
  role = excluded.role,
  position = excluded.position,
  fifa_pac = excluded.fifa_pac,
  fifa_sho = excluded.fifa_sho,
  fifa_pas = excluded.fifa_pas,
  fifa_dri = excluded.fifa_dri,
  fifa_def = excluded.fifa_def,
  fifa_phy = excluded.fifa_phy;

-- Teams
insert into public.teams (id, name, captain_id, color, badge, max_players)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'نسور كينج مريوط', '11111111-1111-1111-1111-111111111111', '#25F143', '🦅', 5),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'فهود برج العرب', '22222222-2222-2222-2222-222222222222', '#FF6600', '🐆', 5),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'أبطال الحارة', '33333333-3333-3333-3333-333333333333', '#FFE500', '⚡', 5),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'دراويش بهيج', '66666666-6666-6666-6666-666666666666', '#FF007F', '🛡️', 5)
on conflict (id) do nothing;

-- Squad Members
insert into public.team_members (team_id, player_id)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '66666666-6666-6666-6666-666666666666')
on conflict do nothing;

-- Tournament
insert into public.tournaments (id, name, format, status, starts_on, ends_on)
values
  ('e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', 'دوري الصيف — نجوم البرج 2026', 'league', 'live', current_date - 14, current_date + 14)
on conflict (id) do nothing;

-- Match
insert into public.matches (id, tournament_id, round_label, home_team, away_team, home_score, away_score, status, current_minute, played_at)
values
  (
    'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
    'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
    'الجولة 4',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    7,
    5,
    'final',
    60,
    now() - interval '2 hours'
  )
on conflict (id) do nothing;

-- Live Goals (including guest scorer)
insert into public.goals (match_id, team_id, scorer_player_id, is_guest, guest_name, minute, is_own_goal)
values
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 12, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 28, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', false, null, 35, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null, true, 'كابتن محمود (ضيف)', 41, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 50, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', false, null, 15, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', false, null, 42, false)
on conflict do nothing;

-- ----------------------------------------------------------------------------
-- SUCCESS MESSAGE
-- ----------------------------------------------------------------------------
select 'SUCCESS: Database schema and demo data initialized cleanly!' as status;
