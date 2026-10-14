import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { RetroFifaCard } from '@/components/ui/RetroFifaCard';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { getPlayerPhoto } from '@/lib/photoStorage';

export const StatsPage: React.FC = () => {
  const [tab, setTab] = useState<'scorers' | 'assists' | 'mvp'>('scorers');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const topScorers = [
    {
      rank: 1,
      id: 'p1',
      name: 'أحمد زيزو',
      nickname: 'القناص',
      team: 'نسور كينج مريوط',
      value: 14,
      position: 'ATT',
      rating: 88,
      variant: 'gold' as const,
      badge: '🥇 #1 SCORER',
      stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    },
    {
      rank: 2,
      id: 'p2',
      name: 'عمر القناص',
      nickname: 'الفهد',
      team: 'فهود برج العرب',
      value: 11,
      position: 'ATT',
      rating: 85,
      variant: 'special' as const,
      badge: '🥈 #2 SCORER',
      stats: { pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 },
    },
    {
      rank: 3,
      id: 'p3',
      name: 'محمود تريكة',
      nickname: 'المايسترو',
      team: 'أبطال الحارة',
      value: 9,
      position: 'MID',
      rating: 83,
      variant: 'gold' as const,
      badge: '🥉 #3 SCORER',
      stats: { pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 },
    },
    {
      rank: 4,
      id: 'p4',
      name: 'كريم شيكا',
      nickname: 'الساحر',
      team: 'نسور كينج مريوط',
      value: 7,
      position: 'MID',
      rating: 81,
      variant: 'gold' as const,
      badge: '#4 SCORER',
      stats: { pac: 86, sho: 84, pas: 85, dri: 92, def: 45, phy: 70 },
    },
    {
      rank: 5,
      id: 'p5',
      name: 'إبراهيم حسن',
      nickname: 'مسمار النص',
      team: 'دراويش بهيج',
      value: 6,
      position: 'DEF',
      rating: 79,
      variant: 'special' as const,
      badge: '#5 SCORER',
      stats: { pac: 78, sho: 60, pas: 75, dri: 72, def: 88, phy: 92 },
    },
  ];

  const topAssists = [
    {
      rank: 1,
      id: 'p3',
      name: 'محمود تريكة',
      nickname: 'المايسترو',
      team: 'أبطال الحارة',
      value: 10,
      position: 'MID',
      rating: 83,
      variant: 'gold' as const,
      badge: '🥇 #1 ASSIST',
      stats: { pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 },
    },
    {
      rank: 2,
      id: 'p4',
      name: 'كريم شيكا',
      nickname: 'الساحر',
      team: 'نسور كينج مريوط',
      value: 8,
      position: 'MID',
      rating: 81,
      variant: 'special' as const,
      badge: '🥈 #2 ASSIST',
      stats: { pac: 86, sho: 84, pas: 85, dri: 92, def: 45, phy: 70 },
    },
    {
      rank: 3,
      id: 'p1',
      name: 'أحمد زيزو',
      nickname: 'القناص',
      team: 'نسور كينج مريوط',
      value: 6,
      position: 'ATT',
      rating: 88,
      variant: 'gold' as const,
      badge: '🥉 #3 ASSIST',
      stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    },
    {
      rank: 4,
      id: 'p5',
      name: 'إبراهيم حسن',
      nickname: 'مسمار النص',
      team: 'دراويش بهيج',
      value: 5,
      position: 'DEF',
      rating: 79,
      variant: 'special' as const,
      badge: '#4 ASSIST',
      stats: { pac: 78, sho: 60, pas: 75, dri: 72, def: 88, phy: 92 },
    },
    {
      rank: 5,
      id: 'p2',
      name: 'عمر القناص',
      nickname: 'الفهد',
      team: 'فهود برج العرب',
      value: 4,
      position: 'ATT',
      rating: 85,
      variant: 'gold' as const,
      badge: '#5 ASSIST',
      stats: { pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 },
    },
  ];

  const topMvps = [
    {
      rank: 1,
      id: 'p1',
      name: 'أحمد زيزو',
      nickname: 'القناص',
      team: 'نسور كينج مريوط',
      value: 5,
      position: 'ATT',
      rating: 88,
      variant: 'gold' as const,
      badge: '👑 KING OF MVP',
      stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    },
    {
      rank: 2,
      id: 'p2',
      name: 'عمر القناص',
      nickname: 'الفهد',
      team: 'فهود برج العرب',
      value: 4,
      position: 'ATT',
      rating: 85,
      variant: 'special' as const,
      badge: '⭐ 4x MVP',
      stats: { pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 },
    },
    {
      rank: 3,
      id: 'p6',
      name: 'إسلام بونو',
      nickname: 'السد العالي',
      team: 'نسور كينج مريوط',
      value: 3,
      position: 'GK',
      rating: 84,
      variant: 'gold' as const,
      badge: '🧤 TOP GK MVP',
      stats: { pac: 65, sho: 40, pas: 68, dri: 62, def: 90, phy: 88 },
    },
    {
      rank: 4,
      id: 'p3',
      name: 'محمود تريكة',
      nickname: 'المايسترو',
      team: 'أبطال الحارة',
      value: 3,
      position: 'MID',
      rating: 83,
      variant: 'gold' as const,
      badge: '⭐ 3x MVP',
      stats: { pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 },
    },
    {
      rank: 5,
      id: 'p4',
      name: 'كريم شيكا',
      nickname: 'الساحر',
      team: 'نسور كينج مريوط',
      value: 2,
      position: 'MID',
      rating: 81,
      variant: 'special' as const,
      badge: '⭐ 2x MVP',
      stats: { pac: 86, sho: 84, pas: 85, dri: 92, def: 45, phy: 70 },
    },
  ];

  const currentList = tab === 'assists' ? topAssists : tab === 'mvp' ? topMvps : topScorers;
  const unitLabel = tab === 'assists' ? 'صناعة' : tab === 'mvp' ? 'مرات MVP' : 'أهداف';

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[#FFE500] flex items-center gap-2">
            <PixelIcon name="star" size={28} color="#FFE500" />
            <span>لوحة الشرف — كروت فيفا التسعينات ⚽</span>
          </h1>
          <p className="font-body text-paper-cream/80 text-sm mt-1">
            أفضل الهدافين وصناع اللعب ونجوم المباريات في تاريخ الملعب بنظام كروت فيفا 90s.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-black border border-white/20 p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 font-display text-xs ${
              viewMode === 'cards'
                ? 'bg-[#25F143] text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            🎴 كروت فيفا 90s
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 font-display text-xs ${
              viewMode === 'list'
                ? 'bg-[#25F143] text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            📋 جدول سريع
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b-2 border-line">
        <button
          onClick={() => setTab('scorers')}
          className={`px-4 py-2 font-display text-base border-b-4 transition-colors ${
            tab === 'scorers'
              ? 'border-[#FFE500] text-[#FFE500] font-bold bg-[#FFE500]/10'
              : 'border-transparent text-paper-cream/60 hover:text-white'
          }`}
        >
          ⚽ قائمة الهدافين
        </button>
        <button
          onClick={() => setTab('assists')}
          className={`px-4 py-2 font-display text-base border-b-4 transition-colors ${
            tab === 'assists'
              ? 'border-[#25F143] text-[#25F143] font-bold bg-[#25F143]/10'
              : 'border-transparent text-paper-cream/60 hover:text-white'
          }`}
        >
          👟 صناع اللعب
        </button>
        <button
          onClick={() => setTab('mvp')}
          className={`px-4 py-2 font-display text-base border-b-4 transition-colors ${
            tab === 'mvp'
              ? 'border-[#FF007F] text-[#FF007F] font-bold bg-[#FF007F]/10'
              : 'border-transparent text-paper-cream/60 hover:text-white'
          }`}
        >
          👑 أبطال MVP
        </button>
      </div>

      {/* Display: 90s FIFA Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {currentList.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`} className="w-full flex justify-center">
              <RetroFifaCard
                name={player.name}
                nickname={player.nickname}
                position={player.position}
                rating={player.rating}
                photoUrl={getPlayerPhoto(player.id)}
                teamName={player.team}
                goals={player.value}
                matches={12}
                badgeRank={player.badge}
                variant={player.variant}
                stats={player.stats}
              />
            </Link>
          ))}
        </div>
      ) : (
        /* Display: Quick List View */
        <div className="space-y-2">
          {currentList.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`}>
              <PixelCard
                variant="arcade"
                className="p-3 flex items-center justify-between hover:translate-x-[var(--shadow-x-sm)] hover:translate-y-[2px] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-base w-8 text-center text-[#FFE500]">
                    #{player.rank}
                  </span>

                  <div className="w-10 h-10 border border-[#FFE500] overflow-hidden bg-black flex items-center justify-center font-pixel text-xs text-white">
                    {getPlayerPhoto(player.id) ? (
                      <img
                        src={getPlayerPhoto(player.id)!}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      '⚽'
                    )}
                  </div>

                  <div>
                    <h4 className="font-display text-lg text-white">{player.name}</h4>
                    <span className="text-xs text-white/60">{player.team}</span>
                  </div>
                </div>

                <div className="font-pixel text-lg text-[#25F143] bg-black/60 px-3 py-1 border border-line">
                  {player.value} {unitLabel}
                </div>
              </PixelCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
