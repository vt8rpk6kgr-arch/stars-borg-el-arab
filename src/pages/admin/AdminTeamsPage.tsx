import React from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';

export const AdminTeamsPage: React.FC = () => {
  const teams = [
    { id: '1', name: 'نسور كينج مريوط', captain: 'أحمد زيزو', members: 5, matches: 11, wins: 8 },
    { id: '2', name: 'فهود برج العرب', captain: 'عمر القناص', members: 5, matches: 11, wins: 6 },
    { id: '3', name: 'أبطال الحارة', captain: 'محمود تريكة', members: 5, matches: 10, wins: 5 },
    { id: '4', name: 'دراويش بهيج', captain: 'إبراهيم حسن', members: 3, matches: 10, wins: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إدارة الفرق المسجلة</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          متابعة قوائم الفرق، الكباتن، وحالة اكتمال القوائم.
        </p>
      </div>

      <AdminNav />

      <PixelCard variant="arcade" className="p-0 overflow-x-auto">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="bg-black/60 border-b-2 border-line text-paper-cream/60 font-pixel">
              <th className="p-3 text-start">اسم الفريق</th>
              <th className="p-3 text-start">الكابتن</th>
              <th className="p-3 text-center">العدد</th>
              <th className="p-3 text-center">المباريات</th>
              <th className="p-3 text-center">الفوز</th>
              <th className="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id} className="border-b border-line hover:bg-white/5">
                <td className="p-3 font-display text-base text-paper-cream">{t.name}</td>
                <td className="p-3">{t.captain}</td>
                <td className="p-3 text-center font-pixel text-sun-yellow">{t.members}/5</td>
                <td className="p-3 text-center font-pixel">{t.matches}</td>
                <td className="p-3 text-center font-pixel text-pitch-green">{t.wins}</td>
                <td className="p-3 text-center space-x-1 space-x-reverse">
                  <button className="text-sky-cyan hover:underline font-bold">
                    تعديل
                  </button>
                  <button className="text-card-red hover:underline font-bold">
                    حذف
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
