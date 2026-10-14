import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Scoreboard } from '@/components/ui/Scoreboard';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { retroSound } from '@/lib/sound';

export const MatchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [votedPlayer, setVotedPlayer] = useState<string | null>(null);

  const match = {
    id: id || 'm-1',
    home: 'نسور كينج مريوط',
    away: 'فهود برج العرب',
    homeScore: 7,
    awayScore: 5,
    status: 'final' as const,
    round: 'دوري الصيف — الجولة 4',
    date: '14 أكتوبر 2026 • 08:00 مساءً',
    homeScorers: [
      { id: '1', name: 'أحمد زيزو', minute: 12 },
      { id: '2', name: 'أحمد زيزو', minute: 28 },
      { id: '3', name: 'كريم شيكا', minute: 35 },
      { id: '4', name: 'أحمد زيزو', minute: 50 },
    ],
    awayScorers: [
      { id: '5', name: 'عمر القناص', minute: 15 },
      { id: '6', name: 'عمر القناص', minute: 42 },
      { id: '7', name: 'طارق حامد (ع.م)', minute: 48, isOwnGoal: true },
    ],
    candidates: [
      { id: 'c1', name: 'أحمد زيزو (نسور كينج مريوط)', votes: 8 },
      { id: 'c2', name: 'عمر القناص (فهود برج العرب)', votes: 5 },
      { id: 'c3', name: 'كريم شيكا (نسور كينج مريوط)', votes: 2 },
    ],
  };

  const handleVote = (playerId: string) => {
    setVotedPlayer(playerId);
    retroSound.playGoal();
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/matches" className="inline-flex items-center gap-1 text-sm text-sky-cyan font-bold hover:underline">
        <PixelIcon name="arrow-left" size={14} color="var(--sky-cyan)" />
        <span>العودة لكل المباريات</span>
      </Link>

      {/* Main Scoreboard */}
      <Scoreboard
        homeTeam={match.home}
        awayTeam={match.away}
        homeScore={match.homeScore}
        awayScore={match.awayScore}
        status={match.status}
        roundLabel={match.round}
        dateLabel={match.date}
        homeScorers={match.homeScorers}
        awayScorers={match.awayScorers}
      />

      {/* MVP Voting Section */}
      <section>
        <PixelCard variant="paper" headerFoil="تصويت رجل المباراة 👑" className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="font-display text-xl text-ink">مين كان نجم الماتش؟ (MVP)</h3>
              <p className="text-xs text-ink/70">
                صوت للاعب الأفضل ليحصل على وسام MVP في بطاقته ولوحة الشرف!
              </p>
            </div>
            {votedPlayer && (
              <span className="text-xs font-pixel text-pitch-deep bg-pitch-green/20 px-2 py-1 border border-pitch-deep">
                ✓ تم تسجيل صوتك بنجاح!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {match.candidates.map((c) => {
              const isSelected = votedPlayer === c.id;
              return (
                <div
                  key={c.id}
                  className={`
                    border-[2px] p-3 text-center flex flex-col justify-between
                    ${
                      isSelected
                        ? 'bg-sun-yellow/30 border-ink shadow-[var(--shadow-x)_2px_0_var(--ink)]'
                        : 'bg-white border-ink/40'
                    }
                  `}
                >
                  <div>
                    <div className="font-display text-base text-ink">{c.name}</div>
                    <div className="font-pixel text-[10px] text-ink/60 mt-1">
                      {c.votes + (isSelected ? 1 : 0)} أصوات
                    </div>
                  </div>

                  <div className="mt-3">
                    <PixelButton
                      variant={isSelected ? 'green' : 'yellow'}
                      size="sm"
                      fullWidth
                      disabled={!!votedPlayer}
                      onClick={() => handleVote(c.id)}
                    >
                      {isSelected ? 'صوّتت له ✓' : 'صوّت له 👑'}
                    </PixelButton>
                  </div>
                </div>
              );
            })}
          </div>
        </PixelCard>
      </section>
    </div>
  );
};
