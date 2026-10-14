import React from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const ProfilePage: React.FC = () => {
  const profile = {
    name: 'أحمد زيزو',
    nickname: 'القناص',
    phone: '01012345678',
    position: 'ATT',
    role: 'player',
    teams: [{ id: 'team-1', name: 'نسور كينج مريوط', isCaptain: true }],
    bookings: [
      { id: 'b1', date: 'الليلة 08:00 مساءً', status: 'confirmed', opponent: 'فهود برج العرب' },
    ],
    stickersCount: 5,
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b-[3px] border-ink pb-4">
        <div>
          <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
            <PixelIcon name="user" size={28} color="var(--sun-yellow)" />
            <span>الملف الشخصي للاعب</span>
          </h1>
          <p className="font-body text-xs text-paper-cream/70 mt-1">
            إدارة بياناتك، فرقك، وحجوزاتك الحالية في الملعب.
          </p>
        </div>

        <Link to={`/players/p1`}>
          <PixelButton variant="yellow" size="sm">
            عرض كارتي 🎴
          </PixelButton>
        </Link>
      </div>

      {/* Info Card */}
      <PixelCard variant="paper" className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-sun-yellow border-[3px] border-ink flex items-center justify-center text-3xl shadow-[var(--shadow-x-sm)_2px_0_var(--ink)]">
            ⚽
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl text-ink">{profile.name}</h2>
              <PixelBadge variant={profile.position as any}>{profile.position}</PixelBadge>
            </div>
            <div className="text-xs text-ink/70">
              رقم الموبايل: <span className="font-pixel text-[11px]">{profile.phone}</span>
            </div>
            <div className="text-xs text-pitch-deep font-bold mt-1">
              الاستيكرز المجمعة: {profile.stickersCount} استيكر
            </div>
          </div>
        </div>
      </PixelCard>

      {/* My Teams */}
      <section className="space-y-3">
        <h3 className="font-display text-xl text-paper-cream flex items-center gap-2">
          <PixelIcon name="users" size={20} color="var(--pitch-green)" />
          <span>فرقي المسجلة</span>
        </h3>

        {profile.teams.map((t) => (
          <PixelCard key={t.id} variant="arcade" className="p-3 flex items-center justify-between">
            <div>
              <span className="font-display text-lg text-paper-cream">{t.name}</span>
              <span className="text-xs text-sun-yellow block">
                {t.isCaptain ? '⭐ كابتن الفريق' : 'عضو'}
              </span>
            </div>
            <Link to={`/teams/${t.id}`}>
              <PixelButton variant="outline" size="sm">
                صفحة الفريق ←
              </PixelButton>
            </Link>
          </PixelCard>
        ))}
      </section>

      {/* My Bookings */}
      <section className="space-y-3">
        <h3 className="font-display text-xl text-paper-cream flex items-center gap-2">
          <PixelIcon name="calendar" size={20} color="var(--sky-cyan)" />
          <span>حجوزاتي القادمة</span>
        </h3>

        {profile.bookings.map((b) => (
          <PixelCard key={b.id} variant="arcade" className="p-3 flex items-center justify-between">
            <div>
              <span className="font-display text-base text-paper-cream">{b.date}</span>
              <span className="text-xs text-paper-cream/60 block">ضد: {b.opponent}</span>
            </div>
            <span className="font-pixel text-xs text-pitch-green bg-pitch-deep/40 px-2 py-1 border border-pitch-green">
              مؤكد
            </span>
          </PixelCard>
        ))}
      </section>
    </div>
  );
};
