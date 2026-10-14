import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const TournamentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'table' | 'matches' | 'scorers'>('table');

  const tournament = {
    id: id || 'tour-1',
    name: 'دوري نجوم برج العرب الصيفي',
    format: 'league',
    status: 'live',
    standings: [
      { rank: 1, team: 'نسور كينج مريوط', played: 6, won: 5, drawn: 1, lost: 0, gf: 24, ga: 10, pts: 16 },
      { rank: 2, team: 'فهود برج العرب', played: 6, won: 4, drawn: 1, lost: 1, gf: 19, ga: 12, pts: 13 },
      { rank: 3, team: 'أبطال الحارة', played: 6, won: 3, drawn: 2, lost: 1, gf: 16, ga: 14, pts: 11 },
      { rank: 4, team: 'دراويش بهيج', played: 6, won: 2, drawn: 0, lost: 4, gf: 12, ga: 18, pts: 6 },
    ],
    topScorers: [
      { rank: 1, name: 'أحمد زيزو', team: 'نسور كينج مريوط', goals: 9 },
      { rank: 2, name: 'عمر القناص', team: 'فهود برج العرب', goals: 7 },
      { rank: 3, name: 'محمود تريكة', team: 'أبطال الحارة', goals: 5 },
    ],
  };

  return (
    <div className="space-y-6">
      <Link to="/tournaments" className="inline-flex items-center gap-1 text-sm text-sky-cyan font-bold hover:underline">
        <PixelIcon name="arrow-left" size={14} color="var(--sky-cyan)" />
        <span>العودة لكل البطولات</span>
      </Link>

      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">{tournament.name}</h1>
        <p className="font-body text-paper-cream/80 text-sm mt-1">
          نظام النقاط: 3 نقاط للفوز، 1 للتعادل، 0 للخسارة. أول الترتيب يتوج بطلاً للدوري.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-line">
        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 font-display text-base border-b-4 ${
            activeTab === 'table'
              ? 'border-sun-yellow text-sun-yellow font-bold'
              : 'border-transparent text-paper-cream/60 hover:text-paper-cream'
          }`}
        >
          جدول الترتيب
        </button>
        <button
          onClick={() => setActiveTab('scorers')}
          className={`px-4 py-2 font-display text-base border-b-4 ${
            activeTab === 'scorers'
              ? 'border-sun-yellow text-sun-yellow font-bold'
              : 'border-transparent text-paper-cream/60 hover:text-paper-cream'
          }`}
        >
          هدافين البطولة
        </button>
      </div>

      {/* Standings Table Tab */}
      {activeTab === 'table' && (
        <PixelCard variant="arcade" className="p-0 overflow-x-auto">
          <table className="w-full text-start border-collapse text-sm">
            <thead>
              <tr className="bg-black/60 border-b-[2px] border-ink text-paper-cream/60 font-pixel text-xs">
                <th className="p-3 text-center">#</th>
                <th className="p-3 text-start">الفريق</th>
                <th className="p-3 text-center">لعب</th>
                <th className="p-3 text-center">فوز</th>
                <th className="p-3 text-center">تعادل</th>
                <th className="p-3 text-center">خسارة</th>
                <th className="p-3 text-center">له</th>
                <th className="p-3 text-center">عليه</th>
                <th className="p-3 text-center text-sun-yellow">نقاط</th>
              </tr>
            </thead>
            <tbody>
              {tournament.standings.map((row) => (
                <tr
                  key={row.rank}
                  className="border-b border-line hover:bg-white/5 transition-colors"
                >
                  <td className="p-3 text-center font-pixel text-xs">
                    {row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : row.rank}
                  </td>
                  <td className="p-3 font-display text-base text-paper-cream">{row.team}</td>
                  <td className="p-3 text-center font-pixel text-xs">{row.played}</td>
                  <td className="p-3 text-center font-pixel text-xs text-pitch-green">{row.won}</td>
                  <td className="p-3 text-center font-pixel text-xs text-sun-yellow">{row.drawn}</td>
                  <td className="p-3 text-center font-pixel text-xs text-card-red">{row.lost}</td>
                  <td className="p-3 text-center font-pixel text-xs">{row.gf}</td>
                  <td className="p-3 text-center font-pixel text-xs">{row.ga}</td>
                  <td className="p-3 text-center font-pixel text-sm text-sun-yellow font-bold bg-sun-yellow/10">
                    {row.pts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PixelCard>
      )}

      {/* Top Scorers Tab */}
      {activeTab === 'scorers' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tournament.topScorers.map((s) => (
            <PixelCard key={s.rank} variant="paper" className="p-4 text-center">
              <div className="font-pixel text-xs text-card-red mb-1">RANK #{s.rank}</div>
              <div className="font-display text-xl text-ink">{s.name}</div>
              <div className="text-xs text-ink/70">{s.team}</div>
              <div className="mt-3 font-pixel text-2xl text-pitch-deep bg-pitch-green/20 py-1 border border-pitch-deep">
                {s.goals} ⚽
              </div>
            </PixelCard>
          ))}
        </div>
      )}
    </div>
  );
};
