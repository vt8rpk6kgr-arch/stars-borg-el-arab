import React from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const MatchesPage: React.FC = () => {
  const matches = [
    {
      id: 'm-1',
      home: 'نسور كينج مريوط',
      away: 'فهود برج العرب',
      homeScore: 7,
      awayScore: 5,
      status: 'final',
      date: 'الليلة 08:00 م',
      round: 'دوري الصيف — الجولة 4',
      topScorer: 'أحمد زيزو (3 أهداف)',
    },
    {
      id: 'm-2',
      home: 'أبطال الحارة',
      away: 'دراويش بهيج',
      homeScore: 4,
      awayScore: 4,
      status: 'final',
      date: 'أمس 09:00 م',
      round: 'مباراة ودية',
      topScorer: 'محمود تريكة (2 أهداف)',
    },
    {
      id: 'm-3',
      home: 'كتيبة الرعب',
      away: 'شباب الساحل',
      homeScore: null,
      awayScore: null,
      status: 'scheduled',
      date: 'الليلة 11:00 م',
      round: 'كأس التحدي',
      topScorer: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
          <PixelIcon name="ball" size={28} color="var(--sun-yellow)" />
          <span>نتايج ومواعيد المباريات</span>
        </h1>
        <p className="font-body text-paper-cream/80 text-sm mt-1">
          أحدث النتايج الرسمية والماتشات القادمة في ملعب نجوم برج العرب.
        </p>
      </div>

      <div className="space-y-3">
        {matches.map((m) => (
          <Link key={m.id} to={`/matches/${m.id}`}>
            <PixelCard
              variant="arcade"
              className="p-4 hover:translate-x-[var(--shadow-x-sm)] hover:translate-y-[2px] transition-transform"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-paper-cream/60 font-semibold">
                  <span>{m.round}</span> • <span className="text-sky-cyan">{m.date}</span>
                </div>

                <PixelBadge
                  variant={m.status === 'final' ? 'final' : 'yellow'}
                  isBlinking={m.status === 'live'}
                >
                  {m.status === 'final' ? 'انتهت' : 'قريباً'}
                </PixelBadge>
              </div>

              <div className="grid grid-cols-5 items-center gap-2 my-3 text-center">
                <div className="col-span-2 text-start font-display text-lg text-paper-cream">
                  {m.home}
                </div>

                <div className="col-span-1 bg-black/60 border border-line py-1 px-2 font-pixel text-lg text-sun-yellow">
                  {m.status === 'final' ? `${m.homeScore} : ${m.awayScore}` : 'VS'}
                </div>

                <div className="col-span-2 text-end font-display text-lg text-paper-cream">
                  {m.away}
                </div>
              </div>

              {m.topScorer && (
                <div className="text-xs text-sun-yellow/90 flex items-center gap-1.5 pt-2 border-t border-line">
                  <span>⭐ هداف المباراة:</span>
                  <span className="font-bold">{m.topScorer}</span>
                </div>
              )}
            </PixelCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
