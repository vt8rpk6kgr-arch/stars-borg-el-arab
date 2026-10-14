# Architectural & Design Decisions

## Visual System: 80s/90s Retro Neon Arcade & Sticker Album
- **Style Direction**: Saturated late-80s / 90s retro cyber-arcade soccer aesthetic requested by user:
  - **Background**: Deep Pitch Black (`#090A0F` / `#040406` / `#11131C`) with subtle CRT scanlines.
  - **Phosphor Green (فسفوري)**: `#25F143` (Electric phosphor lime turf, LED scores, active navigation tabs, buttons).
  - **Electric Orange (أورانج)**: `#FF6600` (Call to action highlights, GK badges, profile buttons, ribbons).
  - **Hot Neon Pink (بينك)**: `#FF007F` (Full Time blinking badges, '90 brand tags, ATT badges, card drop-shadows).
  - **Arcade Yellow (أصفر مضيء)**: `#FFE500` (Hero titles, trophy accents).
  - **Sticker Cards**: Clean cream paper (`#FFFDF2` / `#FFFDF6`) with double borders, corner 1990 speedballs, and tricolor flag ribbons for authentic Panini collectible feel.
  - **Typography & Digits**: Arabic display headings using `Lalezar`, body in `Cairo`, and digital scores/badges in `Press Start 2P`.

## Phase 1: Project Scaffold & Design Foundation
- **UI & Layout Direction**: Mobile-first single column, thumb-reachable bottom navigation on mobile devices (`/`, `/book`, `/teams`, `/matches`, `/me`), top navbar on desktop. Maximum container width capped at 1100px.
- **RTL & Logical Properties**: Full native Arabic RTL (`dir="rtl"`). Custom shadow variable `--shadow-x: -4px` ensures hard pixel drop-shadows correctly project leftwards for Arabic layouts.
- **Stepped Animations**: Stepped timing functions (`steps(2)`, `steps(4)`) mimic authentic 8-bit arcade refresh rates without dragging down frame rates. Fully disabled when `prefers-reduced-motion` is active.
- **Web Audio 8-bit Generator**: Embedded synthesis using the Web Audio API without any external mp3/wav audio files. Off by default with toggle state saved in `localStorage`.
- **Inline Pixel SVGs**: All icons and mascots ("نجمة") are drawn strictly via `<rect>` coordinates on 16x16 / 32x32 grids to eliminate third-party font/icon asset overhead.
- **Routing**: Full React Router v6 setup with route-level `lazy()` imports to preserve initial bundle size well under 250KB.
