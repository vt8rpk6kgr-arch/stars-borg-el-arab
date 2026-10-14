import React, { useState } from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelBadge } from '@/components/ui/PixelBadge';

export const AdminPlayersPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const players = [
    { id: '1', name: 'أحمد زيزو', phone: '01012345678', position: 'ATT', role: 'admin', team: 'نسور كينج مريوط', goals: 14, stickers: 5 },
    { id: '2', name: 'عمر القناص', phone: '01212345678', position: 'ATT', role: 'player', team: 'فهود برج العرب', goals: 11, stickers: 3 },
    { id: '3', name: 'محمود تريكة', phone: '01112345678', position: 'MID', role: 'player', team: 'أبطال الحارة', goals: 9, stickers: 4 },
    { id: '4', name: 'إبراهيم حسن', phone: '01512345678', position: 'MID', role: 'player', team: 'دراويش بهيج', goals: 6, stickers: 2 },
  ];

  const filtered = players.filter((p) =>
    p.name.includes(search) || p.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إدارة اللاعبين المسجلين</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          عرض بيانات اللاعبين وأرقام هواتفهم، وتعيين الأدوار ومنح الاستيكرز.
        </p>
      </div>

      <AdminNav />

      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم أو رقم التليفون..."
          className="w-full sm:w-80 bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream text-xs outline-none focus:border-sun-yellow"
        />

        <PixelButton variant="yellow" size="sm">
          تصدير ملف Excel / CSV 📥
        </PixelButton>
      </div>

      <PixelCard variant="arcade" className="p-0 overflow-x-auto">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="bg-black/60 border-b-2 border-line text-paper-cream/60 font-pixel">
              <th className="p-3 text-start">الاسم</th>
              <th className="p-3 text-start">رقم الموبايل (سري)</th>
              <th className="p-3 text-center">المركز</th>
              <th className="p-3 text-center">الدور</th>
              <th className="p-3 text-start">الفريق</th>
              <th className="p-3 text-center">الأهداف</th>
              <th className="p-3 text-center">الاستيكرز</th>
              <th className="p-3 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-line hover:bg-white/5">
                <td className="p-3 font-display text-base text-paper-cream">{p.name}</td>
                <td className="p-3 font-pixel text-sky-cyan">{p.phone}</td>
                <td className="p-3 text-center">
                  <PixelBadge variant={p.position as any}>{p.position}</PixelBadge>
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`font-pixel text-[10px] px-2 py-0.5 ${
                      p.role === 'admin' ? 'bg-card-red text-white' : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    {p.role}
                  </span>
                </td>
                <td className="p-3">{p.team}</td>
                <td className="p-3 text-center font-pixel text-sun-yellow">{p.goals}</td>
                <td className="p-3 text-center font-pixel text-pitch-green">{p.stickers}</td>
                <td className="p-3 text-center">
                  <button className="text-sun-yellow hover:underline font-bold">
                    منح استيكر 🎁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PixelCard>
    </div>
  );
};
