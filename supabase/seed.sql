-- ============================================================================
-- ⭐️ نجوم برج العرب (Borg El Arab Stars) — Demo Seed Data
-- File: supabase/seed.sql
-- ============================================================================

-- Note: In production Supabase, users are created via Auth.
-- Here we populate mock profiles & records for initial testing and demonstration.

-- 1. Profiles
insert into public.profiles (id, full_name, nickname, phone, role, position, avatar_sticker, fifa_pac, fifa_sho, fifa_pas, fifa_dri, fifa_def, fifa_phy)
values
  ('11111111-1111-1111-1111-111111111111', 'أحمد زيزو', 'القناص', '01012345678', 'admin', 'ATT', 'stk-1', 89, 92, 84, 88, 58, 80),
  ('22222222-2222-2222-2222-222222222222', 'عمر القناص', 'الفهد', '01212345678', 'player', 'ATT', 'stk-2', 91, 86, 78, 84, 52, 76),
  ('33333333-3333-3333-3333-333333333333', 'محمود تريكة', 'المايسترو', '01112345678', 'player', 'MID', 'stk-3', 80, 82, 90, 87, 64, 75),
  ('44444444-4444-4444-4444-444444444444', 'كريم شيكا', 'الساحر', '01512345678', 'player', 'MID', 'stk-4', 86, 84, 85, 92, 45, 70),
  ('55555555-5555-5555-5555-555555555555', 'إسلام بونو', 'السد العالي', '01099887766', 'player', 'GK', 'stk-6', 65, 40, 68, 62, 90, 88),
  ('66666666-6666-6666-6666-666666666666', 'إبراهيم حسن', 'مسمار النص', '01299887766', 'player', 'DEF', 'stk-10', 78, 60, 75, 72, 88, 92)
on conflict (id) do update set
  full_name = excluded.full_name,
  role = excluded.role;

-- 2. Teams
insert into public.teams (id, name, captain_id, color, badge, max_players)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'نسور كينج مريوط', '11111111-1111-1111-1111-111111111111', '#25F143', '🦅', 5),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'فهود برج العرب', '22222222-2222-2222-2222-222222222222', '#FF6600', '🐆', 5),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'أبطال الحارة', '33333333-3333-3333-3333-333333333333', '#FFE500', '⚡', 5),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'دراويش بهيج', '66666666-6666-6666-6666-666666666666', '#FF007F', '🛡️', 5)
on conflict (id) do nothing;

-- 3. Team Members
insert into public.team_members (team_id, player_id)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '66666666-6666-6666-6666-666666666666')
on conflict do nothing;

-- 4. Tournaments
insert into public.tournaments (id, name, format, status, starts_on, ends_on)
values
  ('e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', 'دوري الصيف — نجوم البرج 2026', 'league', 'live', current_date - 14, current_date + 14)
on conflict (id) do nothing;

-- 5. Matches
insert into public.matches (id, tournament_id, round_label, home_team, away_team, home_score, away_score, status, current_minute, played_at)
values
  (
    'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
    'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
    'الجولة 4',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    7, 5, 'final', 60, now() - interval '2 hours'
  )
on conflict (id) do nothing;

-- 6. Goals (Including Registered Scorers AND Guest Scorers)
insert into public.goals (match_id, team_id, scorer_id, is_guest, guest_name, minute, is_own_goal)
values
  -- Home team goals
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 12, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 28, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', false, null, 35, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 50, false),
  -- Guest goal for home team (Requirement verification!)
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null, true, 'كابتن محمود (ضيف)', 54, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', false, null, 58, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null, true, 'حسام قنديل (ضيف)', 59, false),

  -- Away team goals
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', false, null, 15, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', false, null, 42, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', false, null, 45, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null, true, 'مروان زائر (ضيف)', 52, false),
  ('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null, true, 'أحمد صبري (ع.م)', 57, true)
on conflict do nothing;

-- 7. Player Stickers
insert into public.player_stickers (player_id, sticker_id)
values
  ('11111111-1111-1111-1111-111111111111', 'stk-1'),
  ('11111111-1111-1111-1111-111111111111', 'stk-2'),
  ('11111111-1111-1111-1111-111111111111', 'stk-4'),
  ('22222222-2222-2222-2222-222222222222', 'stk-2'),
  ('22222222-2222-2222-2222-222222222222', 'stk-8'),
  ('33333333-3333-3333-3333-333333333333', 'stk-3'),
  ('55555555-5555-5555-5555-555555555555', 'stk-6')
on conflict do nothing;
