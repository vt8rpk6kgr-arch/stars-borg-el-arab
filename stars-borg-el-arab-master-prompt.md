# MASTER PROMPT — "نجوم برج العرب" (Borg El Arab Stars)
### Retro 5-a-side football pitch website — bookings, teams, tournaments, stats, fun

> Send this whole document to your coding editor / agent. Follow it literally. Where something is ambiguous, pick the simplest option, note the assumption in `DECISIONS.md`, and keep going.

---

## 0. HOW TO READ THIS DOCUMENT

- You are building a **complete, working, deployable** website. Not a mockup.
- Priorities, in order: **(1) it works and is secure, (2) it is easy for a 15-year-old to use on a phone, (3) it is fun and looks unmistakably retro, (4) it stays simple to maintain.**
- The site UI is **100% Arabic, RTL**. All code, comments, variable names, commit messages and docs are in **English**. Arabic strings in this document are the exact UI copy to use (you may improve wording but keep the Egyptian-friendly, playful tone).
- Output rules are in Section 14 — read them before writing any code.

---

## 1. VISION

A tiny neighborhood football world for one 5-a-side pitch in Borg El Arab.

Players open the site on their phone, see who scored last night, book an hour, create a team, get friends to join with one WhatsApp link, enter tournaments, collect pixel stickers, read football comics, and climb the scorers' table. The pitch admin runs everything from a private dashboard.

**Feel:** an old arcade cabinet crossed with a 90s football sticker album. Playful, loud, competitive, but dead simple.

**One-line pitch:** *"احجز، كمّل فريقك، سجّل جون، وخش لوحة الشرف."*

**Success looks like:** a player can go from opening the link to a confirmed booking with a team in under 60 seconds on a mid-range Android phone with average Egyptian mobile data.

---

## 2. USERS & ROLES

| Role | Who | Can do |
|---|---|---|
| **Visitor** | not logged in | View home, results, scorers, standings, tournaments, comics, stickers, open teams. Cannot book or join. |
| **Player** | any registered account | Everything a visitor can + book a slot (becomes captain), create a team, join/leave teams, edit own profile, vote MVP, collect stickers. |
| **Captain** | player who created a team | Everything a player can + manage own team (kick/invite), submit match results & scorers for own team's matches. |
| **Admin** | pitch owner/staff | Full dashboard: all bookings, players, teams, tournaments, results, content, settings. Results entered by admin are instantly approved. |

- There is **one admin account at launch**; the schema must support more than one (`profiles.role = 'admin'`). The first admin is created manually by running one SQL line in Supabase (document it in README).
- **Admin accounts are never created through public signup.** Role can only be changed by an admin (enforced by RLS / trigger, not just the UI).

---

## 3. DESIGN PHILOSOPHY

### 3.1 Retro direction (two styles, blended on purpose)
1. **8-bit arcade / pixel art** — chunky pixels, hard edges, hard drop-shadows, "INSERT COIN" energy, scoreboard LED digits, pixel icons (ball, boots, trophy, whistle, goal, star).
2. **80s–90s paper football cards & stickers** — player cards with a foil-ish header, rating number, position badge, tiny stat rows; sticker-album pages with torn-edge / die-cut sticker look.

**Blend rule:** *Arcade for the UI chrome* (buttons, nav, scoreboards, HUD, badges). *Paper-card for content* (player cards, team cards, stickers, comics panels).

### 3.2 Colour palette (CSS variables — use exactly these tokens)
```
--pitch-night:  #0E1A2B;  /* main dark background (floodlit night) */
--pitch-green:  #2FBF71;  /* primary / grass */
--pitch-deep:   #0F5132;  /* dark grass, section bands */
--sun-yellow:   #FFD23F;  /* highlights, goals, CTAs */
--card-red:     #FF4D4D;  /* red card, danger, live */
--sky-cyan:     #4CC9F0;  /* info, links, secondary */
--paper-cream:  #F4EAD0;  /* sticker/card paper */
--ink:          #1A1A2E;  /* text on paper, outlines */
--line:         #FFFFFF22;/* subtle dividers on dark */
```
- Default theme is **dark (floodlit night)**. Cream paper cards sit on it. Do not build a light mode in v1.
- Contrast: body text on dark must pass WCAG AA. Never put yellow text on cream.

### 3.3 Typography
- **Arabic headings:** `Lalezar` (chunky, blocky — closest to arcade feel in Arabic) or `Reem Kufi`. 
- **Arabic body:** `Cairo` or `Tajawal` (weights 500/700) — readable on small screens.
- **Numbers, scores, Latin labels, HUD:** `Press Start 2P` (pixel font). **Important:** Press Start 2P has **no Arabic glyphs** — use it only for digits/Latin (scores, "VS", "LIVE", ratings, timers). Never apply it to Arabic text.
- Use Western digits (0–9) everywhere. Format dates with `Intl.DateTimeFormat('ar-EG-u-nu-latn', { timeZone: 'Africa/Cairo' })`.
- Self-host or use `next/font`-style preloading via `<link rel="preload">`; set `font-display: swap`.

### 3.4 Pixel language (implementation rules)
- Borders: 3–4px solid `--ink` or `--pitch-night`. **Corners square**, no border-radius (max 2px).
- Shadows: hard, offset, no blur — e.g. `box-shadow: 4px 4px 0 var(--ink)`. In RTL, mirror the offset so shadows fall to the **left** (use a CSS variable `--shadow-x: -4px` for RTL).
- Images/sprites: `image-rendering: pixelated`. All icons are **inline SVG pixel-grid art** drawn with `<rect>`s on a 16×16 or 24×24 grid (no icon fonts, no external icon libs).
- Backgrounds: subtle scanline overlay (`repeating-linear-gradient`, ~4% opacity), optional pixel grass-stripe band on section dividers.
- Buttons: chunky, 2-state — rest and pressed (`translate(2px,2px)` + shadow shrinks).
- Layout: mobile-first, single column, thumb-reachable bottom navigation bar on mobile; top bar on desktop. Max content width 1100px.
- Use **CSS logical properties** (`margin-inline-start`, `padding-inline`, `inset-inline-end`) so RTL just works. Set `<html lang="ar" dir="rtl">`.
- Touch targets ≥ 44px.

### 3.5 Tone of copy
Egyptian-Arabic, playful, short. Examples:
- Empty state: "لسه محدش سجّل جون… كن أول واحد! ⚽"
- Team needs players: "ناقصنا 2 لاعيبة! 🚨"
- Booking success: "تم الحجز! اللعب هيبقى نار 🔥"
- Error: "حصلت غلطة بسيطة، جرّب تاني."

---

## 4. TECH STACK (keep it simple)

| Layer | Choice |
|---|---|
| Frontend | **Vite + React 18 + TypeScript** |
| Routing | **React Router v6** (separate pages, as requested) |
| Styling | **Tailwind CSS** + CSS variables above (configure `rtl` support; use logical utilities `ms-`, `me-`, `ps-`, `pe-`, `text-start`) |
| Data fetching | `@supabase/supabase-js` + **TanStack Query** |
| Backend / DB / Auth | **Supabase** (Postgres + Auth + Row Level Security + Storage + Realtime) |
| Hosting | **Vercel** (frontend) — `vercel.json` with SPA rewrite to `index.html` |
| Source | **GitHub** repo, `main` auto-deploys to Vercel |
| Validation | `zod` on all forms |
| Animations | CSS only + tiny React state. **No heavy animation libs.** |

**Do not** add a custom server, Redux, UI kits (MUI/Chakra), or icon libraries.

**Env vars** (Vercel + `.env.local`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Never ship the service-role key to the client. Provide `.env.example`.

**Auth:** Supabase email + password. Signup form collects: full name, email, password, **phone** (Egyptian format `01[0125]xxxxxxxx`, validated), preferred position (optional). Phone is saved in `profiles`. **Phone numbers are visible only to: the owner, admins, and the captain of a team the player belongs to** (enforce via RLS, not the UI). Email confirmation: **off for v1** to keep onboarding frictionless (note in README how to turn it on).

---

## 5. DATA MODEL (Supabase / Postgres)

Create everything as SQL migrations in `/supabase/migrations/` with RLS enabled on **every** table.

```sql
-- PROFILES (1:1 with auth.users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  nickname text,                       -- shown on cards (optional)
  phone text not null,                 -- private, see RLS
  role text not null default 'player' check (role in ('player','admin')),
  position text check (position in ('GK','DEF','MID','ATT')),
  avatar_sticker text,                 -- id of a built-in sticker used as avatar
  created_at timestamptz default now()
);

-- SETTINGS (single row, admin editable)
create table pitch_settings (
  id int primary key default 1 check (id = 1),
  open_hour int not null default 16,   -- local Cairo hour pitch opens
  close_hour int not null default 26,  -- 26 = 2 AM next day (hours may exceed 24)
  slot_minutes int not null default 60,
  price_per_slot_egp int not null default 300,   -- placeholder, admin edits
  whatsapp_number text,
  cancel_before_hours int not null default 3
);

-- TEAMS
create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  captain_id uuid not null references profiles(id),
  color text default '#2FBF71',
  badge text,                          -- built-in sticker/badge id
  max_players int not null default 5,
  created_at timestamptz default now()
);
create table team_members (
  team_id uuid references teams on delete cascade,
  player_id uuid references profiles on delete cascade,
  joined_at timestamptz default now(),
  primary key (team_id, player_id)
);

-- BOOKINGS (one pitch, hourly slots)
create table bookings (
  id uuid primary key default gen_random_uuid(),
  slot_start timestamptz not null,     -- always stored as a real instant; display in Africa/Cairo
  booked_by uuid references profiles(id),     -- null allowed for admin walk-in/phone bookings
  team_a uuid references teams(id),
  team_b uuid references teams(id),           -- optional opponent ("open challenge" if null & is_open_challenge)
  is_open_challenge boolean default false,
  kind text not null default 'team' check (kind in ('team','private','blocked')),
  status text not null default 'confirmed' check (status in ('confirmed','cancelled')),
  note text,
  created_at timestamptz default now()
);
-- Prevent double booking at the database level:
create unique index one_active_booking_per_slot
  on bookings (slot_start) where status = 'confirmed';

-- TOURNAMENTS
create table tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  format text not null check (format in ('league','knockout')),
  status text not null default 'upcoming' check (status in ('upcoming','live','finished')),
  starts_on date, ends_on date,
  champion_team uuid references teams(id),
  created_at timestamptz default now()
);
create table tournament_teams (
  tournament_id uuid references tournaments on delete cascade,
  team_id uuid references teams on delete cascade,
  primary key (tournament_id, team_id)
);

-- MATCHES
create table matches (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings,
  tournament_id uuid references tournaments,
  round_label text,                    -- 'الجولة 3' / 'نصف النهائي'
  home_team uuid not null references teams,
  away_team uuid not null references teams,
  home_score int, away_score int,
  status text not null default 'scheduled'
    check (status in ('scheduled','pending_review','final')),   -- only 'final' counts in stats
  submitted_by uuid references profiles,
  played_at timestamptz,
  created_at timestamptz default now()
);

-- GOALS (source of truth for scorers & assists)
create table goals (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches on delete cascade,
  team_id uuid not null references teams,      -- team that is credited with the goal
  scorer_id uuid references profiles,          -- null if own-goal by unknown
  assist_id uuid references profiles,
  minute int,
  is_own_goal boolean default false
);

-- FUN LAYER
create table mvp_votes (
  match_id uuid references matches on delete cascade,
  voter_id uuid references profiles on delete cascade,
  player_id uuid references profiles on delete cascade,
  primary key (match_id, voter_id)             -- one vote per voter per match
);
create table comics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,                    -- Supabase Storage bucket 'comics'
  caption text,
  is_published boolean default true,
  created_at timestamptz default now()
);
create table player_stickers (                 -- sticker collection (earned or admin-granted)
  player_id uuid references profiles on delete cascade,
  sticker_id text not null,                    -- id from the built-in sticker library
  earned_at timestamptz default now(),
  primary key (player_id, sticker_id)
);
create table activity_feed (
  id bigint generated always as identity primary key,
  type text not null,                          -- 'goal','match_final','booking','team_created','team_full','sticker','tournament'
  actor_id uuid references profiles,
  payload jsonb not null default '{}',
  created_at timestamptz default now()
);
```

### 5.1 Derived views (stats are **computed in SQL views**, never stored manually)
Create views: `v_top_scorers`, `v_top_assists`, `v_player_stats` (matches, goals, assists, wins, MVP count), `v_standings(tournament_id)` (P/W/D/L/GF/GA/GD/Pts — 3 pts win, 1 draw), `v_team_stats`, `v_monthly_scorers` (current Cairo month). **Only matches with `status = 'final'` count.**

### 5.2 Triggers / functions
- On `auth.users` insert → create `profiles` row from `raw_user_meta_data`.
- On `team_members` insert → enforce `max_players` (reject the 6th member); when count hits max, insert `activity_feed` `team_full`.
- On `matches` → `final`: insert `activity_feed` entries, auto-award stickers (see 8.4), update tournament champion if the final is done.
- Block privilege escalation: a non-admin must never be able to update `profiles.role`.
- Booking creation must go through an RPC `book_slot(slot_start, team_name)` that validates: inside opening hours, in the future, not within a blocked slot, user is logged in, not double-booked (the unique index is the final guard). It creates the team + captain membership + booking in **one transaction**.

### 5.3 Row Level Security (summary — implement fully)
- Public read: teams, team_members (names only, **not phones**), bookings (slot_start + status + team name only — expose via a safe view, hide `note`/`booked_by`), matches, goals, tournaments, comics (published), activity_feed, stats views.
- `profiles`: everyone can read `id, full_name, nickname, position, avatar_sticker` through a public view `v_public_profiles`; **`phone` only for self, admin, and the captain of a team the player is in**.
- Players: insert/update/delete only their own rows (membership, votes, profile fields except `role`).
- Captain: update own team; insert/update matches+goals **only for matches where their team plays** and only while the match is not `final`; their submissions become `pending_review`.
- Admin: full access (policy `using ((select role from profiles where id = auth.uid()) = 'admin')`).
- Storage: `comics` bucket public-read, admin-write.

---

## 6. SITEMAP (separate pages)

| Route | Page | Access |
|---|---|---|
| `/` | **Home** — results & scorers first | public |
| `/book` | **الحجز** — slot picker | public view, login to book |
| `/teams` | **الفرق** — all teams + "فرق ناقصها لاعيبة" board | public |
| `/teams/:id` | Team page — squad, stats, join button, **share-to-WhatsApp** | public |
| `/matches` | Results & fixtures list (filter by tournament/date) | public |
| `/matches/:id` | **Match page** — score, scorers, assists, MVP vote, timeline | public |
| `/tournaments` | Tournaments list | public |
| `/tournaments/:id` | Table / bracket + fixtures + top scorers of the tournament | public |
| `/stats` | **لوحة الشرف** — top scorers, assists, MVPs, best teams, scorer of the month | public |
| `/players/:id` | **Player card** (retro card with stats, stickers earned) | public |
| `/fun` | **الكوميكس والاستيكرز** — comics gallery + sticker album | public |
| `/login`, `/signup` | Auth | public |
| `/me` | My profile, my team(s), my bookings, my stickers | player |
| `/admin` | Dashboard home | admin |
| `/admin/bookings` | Day/week grid, create/cancel/block | admin |
| `/admin/players` | Search players, see phone, grant stickers | admin |
| `/admin/teams` | Manage teams | admin |
| `/admin/tournaments` | Create tournament, add teams, generate fixtures | admin |
| `/admin/matches` | Enter/approve results & goals | admin |
| `/admin/content` | Upload comics, publish/unpublish | admin |
| `/admin/settings` | Hours, price, WhatsApp number, cancel policy | admin |

Global: sticky nav (mobile bottom bar: الرئيسية / احجز / الفرق / النتايج / أنا), 404 page with a pixel "OFFSIDE!" joke, route-level lazy loading.

---

## 7. PAGE SPECS

### 7.1 Home `/` (results & scorers are the hero)
Order top → bottom:
1. **Pixel scoreboard hero** — last finished match: team names, big LED-style score (Press Start 2P), scorers listed under each team with ⚽ and minute. Subtle "FULL TIME" blink.
2. **قادم قريب** — next 3 bookings/matches today with times.
3. **هدافين الليلة / الأسبوع** — top 5 scorers (toggle: اليوم / الأسبوع / كل الوقت) as mini pixel cards.
4. **فرق ناقصها لاعيبة 🚨** — up to 3 team cards with progress "3/5" pixel bar + "انضم" button.
5. **آخر الأحداث** — live `activity_feed` (goals, new teams, team complete, stickers earned, bookings).
6. **CTA** — big "احجز ساعتك" arcade button (yellow).
7. Footer: pitch name, WhatsApp button, address placeholder (admin editable later).

### 7.2 Booking `/book`
- Date strip (next 14 days) → hourly slot grid generated from `pitch_settings` (handles hours past midnight, e.g. 1 AM slot belongs to the previous "pitch day").
- Slot states: متاح (green), محجوز (red, shows team name), مقفول/صيانة (grey), فات (disabled).
- Tap slot → bottom sheet: team name (new team) **or** pick one of my teams, checkbox "ابحث عن فريق منافس (تحدي مفتوح)", shows **price** and "الدفع كاش في الملعب".
- On confirm → `book_slot` RPC → success screen with **"ابعت الدعوة على واتساب"** button (see 8.1).
- Estimated cost per player shown live: `price ÷ confirmed players` (updates as people join).
- Cancel allowed by captain until `cancel_before_hours` before start; after that only admin.
- **If the team is not full by match time, nothing happens** (booking stays confirmed). Do not auto-cancel.
- Show timezone-correct times (**Africa/Cairo**, Egypt observes DST — always convert with the timezone, never a fixed +2/+3 offset).

### 7.3 Teams `/teams` & `/teams/:id`
- Team card: colour stripe, badge, name, captain, "3/5", next booking.
- Team page: squad as 5 pixel "slots" (filled = player mini-card, empty = dashed "؟" slot with "انضم" button), team stats (W/D/L, goals), recent matches, **WhatsApp share**, captain-only controls (rename, kick player, transfer captaincy, cancel booking).
- A player can be in multiple teams. Joining a full team is blocked with a friendly message.

### 7.4 Match page `/matches/:id`
- Big score, date/time, tournament + round label.
- **Scorers list per team** ("هدافين المباراة") with minute and assists; own goals marked "(ع.م)".
- **MVP vote** (players who were in either squad, or simply any logged-in player — choose any logged-in player in v1; one vote per match) — winner shown with a pixel crown after `final`.
- Captain/admin: "سجّل النتيجة" form — scores + add goal rows (scorer dropdown from squad, assist optional, minute optional). Captain submissions → `pending_review`; admin one-tap approve/reject. Admin entries are `final` immediately.
- Validation: number of goal rows per team must equal the entered score before submit.

### 7.4b Tournaments
- **League:** admin picks teams → system generates round-robin fixtures (single or double leg) → live table from `v_standings`.
- **Knockout:** admin picks teams (4/8/16, handle byes) → bracket page as a simple pixel tree; winner advances when a match turns `final` (draw → admin enters penalty winner, store as `round_label` note + `winner_team` override).
- Tournament page tabs: الجدول / المباريات / الهدافين / (لو knockout) الشجرة.
- Champion gets a golden pixel trophy sticker + feed event.

### 7.5 Stats `/stats` — لوحة الشرف
Tabs: **الهدافين** (all-time / هداف الشهر), **صناع اللعب** (assists), **MVP**, **أحسن فرق**, **الأكثر التزاماً** (attendance — optional v2). Each row: rank, pixel avatar sticker, name, number. Top 3 get gold/silver/bronze pixel medals. Tap row → player card.

### 7.6 Player card `/players/:id` (the "paper sticker card")
Cream card with foil header, avatar sticker, name/nickname, position badge, **rating** (0–99, computed from goals/assists/wins/MVPs with a simple documented formula in `lib/rating.ts`), stat rows (مباريات, أهداف, أسيست, فوز, MVP), and a grid of earned stickers. "Share card" button → downloads a PNG (use `html-to-image`; lazy-load it).

### 7.7 Fun `/fun`
- **Sticker album** — built-in library (see 8.4), grid of die-cut pixel stickers; owned = colourful, locked = grey silhouette with hint ("سجّل هاتريك").
- **Comics** — gallery of admin-uploaded football comics (lazy images, lightbox with swipe, caption, "اللي بعده"). Seed 3 placeholder comic panels drawn as inline SVG so the page is never empty.
- Daily rotating **"كوميكس اليوم"** card on Home footer area (picked by date from published comics).

### 7.8 Admin dashboard `/admin`
Top row of **pixel KPI tiles**: حجوزات النهارده, حجوزات الأسبوع, لاعيبة مسجلين, فرق ناقصها لاعيبة, نتايج منتظرة موافقة (badge), إيراد متوقع النهارده (price × confirmed slots; cash note).
- **Bookings grid:** day view with all hourly slots; tap → details (team, captain name + phone + WhatsApp link), cancel, block slot (maintenance/rain), add manual booking (phone/walk-in).
- **Players:** table with search by name/phone, role, teams, goals; export CSV.
- **Results queue:** pending captain submissions with approve/edit/reject.
- **Tournaments:** wizard (name → format → teams → generate fixtures).
- **Content:** upload comics (image → Supabase Storage → row), publish toggle, delete.
- **Settings:** hours, price, WhatsApp number, cancellation window.
- Admin pages are **desktop-friendly but usable on mobile**.

---

## 8. FEATURES — MUST-HAVE vs FUN LAYER

### 8.1 WhatsApp sharing (high value, very low effort)
Every team/booking has a button that opens `https://wa.me/?text=` with a prefilled Arabic message and link, e.g.:
"ناقصنا لاعيبة في فريق «{team}» يوم {date} الساعة {time} في نجوم برج العرب ⚽ سجّل هنا: {url}"
Also a **"تواصل مع الملعب"** floating WhatsApp button using `pitch_settings.whatsapp_number`.

### 8.2 Open challenges
A booking with `is_open_challenge = true` appears in a **"تحدي مفتوح"** list; another captain taps "اقبل التحدي" → becomes `team_b`, a `match` (status `scheduled`) is created automatically.

### 8.3 MVP voting & achievements
- MVP vote after each final match.
- **Badges** (stored as stickers) awarded automatically by the trigger/function: أول جون، هاتريك (3 goals in a match), 5/10/25 جون، صانع ألعاب (5 assists), MVP، الكابتن (created a team), بطل بطولة، 10 مباريات، "البديل الذهبي" (joined a team that was 1 player short — fun!).

### 8.3b Fair-play & loyalty (light)
- **Attendance** is not tracked in v1. Leave a nullable column plan in `DECISIONS.md` for a future "no-show" counter. Do not build it now.

### 8.4 Sticker library (built-in, no uploads)
- ~30 stickers defined in `src/data/stickers.ts` as `{ id, nameAr, hintAr, rarity: 'common'|'rare'|'epic', svg }` where `svg` is hand-drawn **pixel-grid SVG** (ball, boots, gloves, trophy, whistle, red card, yellow card, goal net, crown, rocket, fire, shield, star, mascot, etc.).
- **Mascot:** a pixel football character named **"نجمة"** (original design, nothing copyrighted) used on empty states, 404, loading screens and as default avatar.
- Never use real clubs, real players, logos or copyrighted characters.
- Rarity styling: common = plain border, rare = blue shimmer, epic = gold shimmer (pure CSS).
- Avatars: a player picks any owned sticker as their avatar.

### 8.5 Small delighters (cheap, do them)
- Goal celebration: when a match goes final, the match page plays a short pixel confetti burst (CSS) once.
- Scoreboard digits "tick" (steps animation) when numbers change.
- Konami-code Easter egg → unlocks a hidden sticker.
- Funny empty states, funny 404.

### 8.6 Explicitly OUT of scope for v1 (put in `ROADMAP.md`)
Online payments, SMS/OTP, push notifications, native app, live in-game scoring, video, chat, multiple pitches, referee assignment, prediction game, auto-generated comic match reports, season archive.

---

## 9. MOTION LANGUAGE

- Everything is **stepped**, not smooth: use `animation-timing-function: steps(4)` / `steps(6)` for movement to mimic low frame-rate sprites.
- Allowed motions: button press, 2-frame idle bounce on the mascot, blinking "LIVE"/"FULL TIME", sticker "slap in" (scale 1.3 → 1 with 3 steps + slight rotate), confetti burst, page transitions as a quick 4-step wipe (< 250ms), progress bars filling in blocks.
- **Respect `prefers-reduced-motion`** — disable all non-essential animation.
- Optional 8-bit sound effects (goal, click): **off by default**, toggle in nav, preference saved in `localStorage`. Generate sounds with the Web Audio API (no audio files) to keep the bundle tiny.
- Performance budget: Lighthouse mobile ≥ 90 Performance/Accessibility, JS < 250KB gz on first load (lazy-load routes, admin, charts, html-to-image).

---

## 10. ACCESSIBILITY, SECURITY, QUALITY

- Semantic HTML, visible focus rings (thick yellow outline), `aria-label`s in Arabic, form errors announced.
- All writes validated twice: `zod` on client **and** RLS/DB constraints on server. Treat the client as hostile.
- No secrets in the repo. `.gitignore` covers `.env*`.
- Rate-limit-ish protections: disable submit buttons while pending; debounce searches.
- Error boundaries per route; friendly Arabic error screen with a retry button.
- Basic tests: unit tests (Vitest) for `rating.ts`, standings calculation helper, slot generation (including past-midnight and DST), and the WhatsApp message builder.

---

## 11. DEPLOYMENT

1. GitHub repo → import in Vercel (framework preset: Vite). Add the two env vars. `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
2. Supabase: run migrations, create `comics` bucket (public), create first admin via SQL (documented in README):
   `update profiles set role = 'admin' where id = '<USER_UUID>';`
3. Seed script `supabase/seed.sql`: `pitch_settings` row, 6 fake players, 3 teams, 1 tournament, 4 matches with goals, 5 sample activity events — **clearly marked as demo data, easy to delete** (one `delete` script).
4. Add a tiny GitHub Action that pings the Supabase REST endpoint once a day so a free-tier project doesn't pause from inactivity (document it in README).
5. README (English) with setup, env vars, how to become admin, how to deploy, how to reset demo data.

---

## 12. FOLDER STRUCTURE (suggested)

```
/src
  /components   (ui primitives: PixelButton, PixelCard, Scoreboard, StickerCard, PlayerCard, TeamSlots, Medal…)
  /pages        (one file per route)
  /pages/admin
  /hooks        (useAuth, useBookings, useStats…)
  /lib          (supabase.ts, rating.ts, slots.ts, whatsapp.ts, format.ts)
  /data         (stickers.ts, copy.ts)
  /styles       (tokens.css, pixel.css, rtl.css)
/supabase/migrations
/supabase/seed.sql
DECISIONS.md  ROADMAP.md  README.md
```

---

## 13. ACCEPTANCE CHECKLIST (the agent must self-verify at the end)

- [ ] Everything renders correctly in RTL on a 360px-wide phone; no horizontal scroll.
- [ ] A new user can sign up, book an hour, create a team, share on WhatsApp, and a second user can join.
- [ ] Two users cannot book the same slot (test concurrent attempt — DB rejects the second).
- [ ] The 6th player cannot join a 5-player team.
- [ ] A non-admin cannot read other users' phones or change their own role (test via the Supabase client).
- [ ] A captain's submitted result is `pending_review` and does **not** change stats until an admin approves it.
- [ ] League table and top scorers update after approval and match the goals rows.
- [ ] Booking times are correct in Africa/Cairo, including slots after midnight.
- [ ] Admin can block a slot, cancel a booking, upload a comic, and create a tournament.
- [ ] `prefers-reduced-motion` respected; keyboard navigation works; contrast passes AA.
- [ ] Build passes (`npm run build`), tests pass, Lighthouse mobile ≥ 90.

---

## 14. OUTPUT RULES  (READ BEFORE WRITING CODE)

1. **Build in phases. Do not try to output everything at once.**
   - **Phase 1:** project scaffold, design tokens, fonts, RTL setup, UI primitives (PixelButton, PixelCard, Scoreboard, nav), router with empty pages, Supabase client, `vercel.json`.
   - **Phase 2:** SQL migrations + RLS + views + triggers + seed; auth (signup/login/profile).
   - **Phase 3:** booking (`/book`, `book_slot` RPC), teams, join flow, WhatsApp sharing, open challenges.
   - **Phase 4:** matches, goals entry, approval flow, stats views, Home, Stats, Match, Player card pages.
   - **Phase 5:** tournaments (league + knockout), admin dashboard (all admin pages), settings.
   - **Phase 6:** fun layer (stickers, comics, badges, MVP, delighters), polish, accessibility, tests, README/DECISIONS/ROADMAP.
2. At the end of **every phase**: list what was built, what to test manually, and any assumption made. Then print exactly this line on its own and **stop**:

   `⏸ CONTINUE DOCUMENT — reply "continue" to start Phase N+1`

3. If you hit an output-length limit **mid-file**, stop at a clean boundary, state exactly which file and which function you stopped in, and print `⏸ CONTINUE DOCUMENT`. When told to continue, resume from that exact point without repeating finished code.
4. Never use placeholders like `// TODO implement` or `...rest of code`. Every file you output must be complete and runnable.
5. Always show the **full path** above each file's code block.
6. Do not invent features outside this document. Anything extra goes to `ROADMAP.md`.
7. Keep dependencies minimal; justify any addition in `DECISIONS.md`.
8. When something conflicts with Section 0's priority order, the higher priority wins.

**Start now with Phase 1.**
