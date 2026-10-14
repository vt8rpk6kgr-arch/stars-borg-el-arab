import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock team detail
  const team = {
    id: id || 'team-3',
    name: 'دراويش بهيج',
    captain: 'إبراهيم حسن',
    color: '#FF4D4D',
    membersCount: 3,
    maxPlayers: 5,
    players: [
      { id: 'p1', name: 'إبراهيم حسن', role: 'كابتن', pos: 'MID', goals: 8 },
      { id: 'p2', name: 'أحمد صبري', role: 'لاعب', pos: 'DEF', goals: 2 },
      { id: 'p3', name: 'يوسف جمال', role: 'لاعب', pos: 'ATT', goals: 5 },
    ],
    stats: { played: 10, won: 4, drawn: 1, lost: 5, goalsFor: 28, goalsAgainst: 31 },
  };

  const emptySlotsCount = Math.max(0, team.maxPlayers - team.players.length);

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `ناقصنا لاعيبة في فريق «${team.name}» في نجوم برج العرب ⚽ سجل وانضم لينا هنا:\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="w-5 h-5 border-[2px] border-ink shadow-[var(--shadow-x-sm)_2px_0_var(--ink)]"
              style={{ backgroundColor: team.color }}
            />
            <h1 className="font-display text-3xl text-sun-yellow">{team.name}</h1>
          </div>
          <p className="font-body text-xs text-paper-cream/70 mt-1">
            كابتن الفريق: <span className="text-paper-cream font-bold">{team.captain}</span> • {team.players.length} من {team.maxPlayers} لاعيبة
          </p>
        </div>

        <div className="flex gap-2">
          <PixelButton
            variant="green"
            size="md"
            onClick={shareOnWhatsApp}
            className="bg-[#25D366] hover:bg-[#20ba59] text-pitch-night border-ink"
          >
            <PixelIcon name="whatsapp" size={18} color="#FFFFFF" />
            <span>شير على واتساب</span>
          </PixelButton>
        </div>
      </div>

      {/* 5 Pixel Squad Slots */}
      <section>
        <h2 className="font-display text-xl text-paper-cream mb-3 flex items-center gap-2">
          <PixelIcon name="users" size={18} color="var(--sky-cyan)" />
          <span>تشكيل الخماسي ({team.players.length}/5)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Filled slots */}
          {team.players.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`}>
              <div className="bg-[#FFFDF6] border-[3px] border-ink p-2 text-center flex flex-col justify-between h-44 shadow-[var(--shadow-x-sm)_3px_0_var(--ink)] hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="flex justify-between items-center text-[9px] font-pixel text-ink/70 border-b border-ink/20 pb-1 mb-1">
                    <PixelBadge variant={player.pos as any}>{player.pos}</PixelBadge>
                    <span className="font-bold text-card-red">
                      {player.role === 'كابتن' ? '⭐ كابتن' : '#90'}
                    </span>
                  </div>

                  {/* Photo area */}
                  <div className="w-14 h-14 bg-gradient-to-b from-[#2E6DBE]/20 to-[#1C4D94]/30 border border-ink mx-auto flex items-center justify-center text-2xl shadow-[1px_1px_0_var(--ink)]">
                    ⚽
                  </div>

                  {/* Mini team flag ribbon */}
                  <div className="h-1.5 w-full flex my-1">
                    <div className="h-full w-1/3 bg-card-red" />
                    <div className="h-full w-1/3 bg-white" />
                    <div className="h-full w-1/3 bg-pitch-green" />
                  </div>

                  <div className="font-display text-base text-ink leading-tight mt-1 truncate">
                    {player.name}
                  </div>
                </div>

                <div className="font-pixel text-[10px] text-pitch-deep font-bold border-t border-ink/20 pt-1">
                  {player.goals} ⚽ أهداف
                </div>
              </div>
            </Link>
          ))}

          {/* Empty dashed slots */}
          {Array.from({ length: emptySlotsCount }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="border-[3px] border-dashed border-line bg-black/30 p-3 h-40 flex flex-col items-center justify-center text-center space-y-2 select-none"
            >
              <div className="font-pixel text-2xl text-paper-cream/30">؟</div>
              <div className="text-xs text-paper-cream/60 font-body">مكان شاغر</div>
              <PixelButton variant="yellow" size="sm">
                انضم للفريق
              </PixelButton>
            </div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <PixelCard variant="arcade" className="p-3 text-center">
          <div className="font-pixel text-xs text-paper-cream/60">مباريات</div>
          <div className="font-display text-2xl text-sun-yellow mt-1">{team.stats.played}</div>
        </PixelCard>
        <PixelCard variant="arcade" className="p-3 text-center">
          <div className="font-pixel text-xs text-pitch-green">فوز</div>
          <div className="font-display text-2xl text-pitch-green mt-1">{team.stats.won}</div>
        </PixelCard>
        <PixelCard variant="arcade" className="p-3 text-center">
          <div className="font-pixel text-xs text-sun-yellow">تعادل</div>
          <div className="font-display text-2xl text-sun-yellow mt-1">{team.stats.drawn}</div>
        </PixelCard>
        <PixelCard variant="arcade" className="p-3 text-center">
          <div className="font-pixel text-xs text-card-red">خسارة</div>
          <div className="font-display text-2xl text-card-red mt-1">{team.stats.lost}</div>
        </PixelCard>
      </section>
    </div>
  );
};
