import React from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const TournamentsPage: React.FC = () => {
  const tournaments = [
    {
      id: 'tour-1',
      name: 'دوري نجوم برج العرب الصيفي',
      format: 'league',
      formatLabel: 'دوري نقاط',
      status: 'live',
      statusLabel: 'جاري الآن',
      teamsCount: 8,
      champion: null,
      dates: '1 أكتوبر — 30 أكتوبر 2026',
    },
    {
      id: 'tour-2',
      name: 'كأس التحدي السريع (خروج المغلوب)',
      format: 'knockout',
      formatLabel: 'خروج مغلوب',
      status: 'upcoming',
      statusLabel: 'يبدأ قريباً',
      teamsCount: 16,
      champion: null,
      dates: '5 نوفمبر 2026',
    },
    {
      id: 'tour-3',
      name: 'بطولة افتتاح الملعب الرمضانية',
      format: 'knockout',
      formatLabel: 'خروج مغلوب',
      status: 'finished',
      statusLabel: 'انتهت',
      teamsCount: 8,
      champion: 'نسور كينج مريوط 🏆',
      dates: 'رمضان الماضي',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
          <PixelIcon name="trophy" size={28} color="var(--sun-yellow)" />
          <span>بطولات ملعب نجوم البرج</span>
        </h1>
        <p className="font-body text-paper-cream/80 text-sm mt-1">
          بطولات دورية وجوائز وكؤوس كلاسيكية لأبطال برج العرب وكينج مريوط.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tournaments.map((t) => (
          <Link key={t.id} to={`/tournaments/${t.id}`}>
            <PixelCard
              variant="arcade"
              className="p-4 hover:translate-x-[var(--shadow-x-sm)] hover:translate-y-[2px] transition-transform"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs text-sky-cyan font-bold">{t.formatLabel}</span>
                  <h3 className="font-display text-xl text-paper-cream">{t.name}</h3>
                  <div className="text-xs text-paper-cream/60">{t.dates}</div>
                </div>

                <PixelBadge
                  variant={t.status === 'live' ? 'live' : t.status === 'finished' ? 'final' : 'yellow'}
                  isBlinking={t.status === 'live'}
                >
                  {t.statusLabel}
                </PixelBadge>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
                <span className="text-paper-cream/80">{t.teamsCount} فرق مشاركة</span>
                {t.champion ? (
                  <span className="text-sun-yellow font-display text-sm">البطل: {t.champion}</span>
                ) : (
                  <span className="text-pitch-green font-bold">عرض الجدول والمباريات ←</span>
                )}
              </div>
            </PixelCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
