import React from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const TeamsPage: React.FC = () => {
  const teams = [
    {
      id: 'team-1',
      name: 'نسور كينج مريوط',
      captain: 'أحمد زيزو',
      color: '#2FBF71',
      members: 5,
      max: 5,
      nextMatch: 'الليلة 10:00 م',
      stats: { w: 8, d: 2, l: 1 },
    },
    {
      id: 'team-2',
      name: 'فهود برج العرب',
      captain: 'عمر القناص',
      color: '#FFD23F',
      members: 5,
      max: 5,
      nextMatch: 'غداً 08:00 م',
      stats: { w: 6, d: 3, l: 2 },
    },
    {
      id: 'team-3',
      name: 'دراويش بهيج',
      captain: 'إبراهيم حسن',
      color: '#FF4D4D',
      members: 3,
      max: 5,
      nextMatch: 'الليلة 09:00 م',
      stats: { w: 4, d: 1, l: 5 },
    },
    {
      id: 'team-4',
      name: 'كتيبة الرعب',
      captain: 'محمد عضل',
      color: '#4CC9F0',
      members: 4,
      max: 5,
      nextMatch: 'الليلة 11:00 م',
      stats: { w: 5, d: 0, l: 3 },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
            <PixelIcon name="users" size={28} color="var(--sun-yellow)" />
            <span>فرق ملعب نجوم البرج</span>
          </h1>
          <p className="font-body text-paper-cream/80 text-sm mt-1">
            شوف الفرق المسجلة، وانضم لفريق ناقصه لاعيبة أو أنشئ فريقك الخاص.
          </p>
        </div>

        <Link to="/book">
          <PixelButton variant="green" size="md">
            + تكوين فريق وحجز
          </PixelButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((t) => {
          const isFull = t.members >= t.max;
          return (
            <PixelCard key={t.id} variant="arcade" className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border border-ink"
                      style={{ backgroundColor: t.color }}
                    />
                    <h3 className="font-display text-xl text-paper-cream">{t.name}</h3>
                  </div>

                  <span
                    className={`font-pixel text-xs px-2 py-0.5 border border-ink ${
                      isFull
                        ? 'bg-pitch-night text-pitch-green'
                        : 'bg-card-red text-white blink-retro'
                    }`}
                  >
                    {isFull ? 'فريق كامل' : `ناقص ${t.max - t.members}!`}
                  </span>
                </div>

                <div className="mt-3 text-xs text-paper-cream/70 space-y-1">
                  <div>الكابتن: <span className="text-paper-cream font-bold">{t.captain}</span></div>
                  <div>الماتش القادم: <span className="text-sun-yellow">{t.nextMatch}</span></div>
                  <div>
                    السجل:{' '}
                    <span className="font-pixel text-[11px] text-pitch-green">{t.stats.w}ف</span>{' '}
                    <span className="font-pixel text-[11px] text-sun-yellow">{t.stats.d}ت</span>{' '}
                    <span className="font-pixel text-[11px] text-card-red">{t.stats.l}خ</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                <div className="text-xs font-pixel text-sun-yellow">
                  {t.members}/{t.max} لاعيبة
                </div>

                <Link to={`/teams/${t.id}`}>
                  <PixelButton variant={isFull ? 'outline' : 'yellow'} size="sm">
                    {isFull ? 'تفاصيل الفريق' : 'انضم للفريق ⚽'}
                  </PixelButton>
                </Link>
              </div>
            </PixelCard>
          );
        })}
      </div>
    </div>
  );
};
