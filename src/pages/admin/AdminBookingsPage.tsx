import React from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';

export const AdminBookingsPage: React.FC = () => {
  const bookings = [
    { id: '1', time: '06:00 م', team: 'نسور كينج مريوط', captain: 'أحمد زيزو', phone: '01012345678', status: 'مؤكد', price: 300 },
    { id: '2', time: '07:00 م', team: 'متاح للحجز', captain: '-', phone: '-', status: 'متاح', price: 300 },
    { id: '3', time: '08:00 م', team: 'أبطال الحارة', captain: 'محمود تريكة', phone: '01212345678', status: 'مؤكد', price: 300 },
    { id: '4', time: '09:00 م', team: 'كتيبة الرعب (تحدي مفتوح)', captain: 'محمد عضل', phone: '01112345678', status: 'مؤكد', price: 300 },
    { id: '5', time: '10:00 م', team: 'صيانة الملعب وتغيير لمبات', captain: 'الإدارة', phone: '-', status: 'مقفول', price: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إدارة حجوزات الملعب</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          جدول المواعيد اليومي، الحجز اليدوي عبر الهاتف، وقفل الفترات للصيانة.
        </p>
      </div>

      <AdminNav />

      <div className="flex justify-between items-center">
        <span className="font-display text-lg text-paper-cream">جدول مواعيد اليوم (14 أكتوبر 2026)</span>
        <PixelButton variant="green" size="sm">
          + إضافة حجز يدوي (تليفون/كاش)
        </PixelButton>
      </div>

      <PixelCard variant="arcade" className="p-0 overflow-x-auto">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="bg-black/60 border-b-2 border-line text-paper-cream/60 font-pixel">
              <th className="p-3 text-start">الساعة</th>
              <th className="p-3 text-start">الفريق / الملاحظة</th>
              <th className="p-3 text-start">الكابتن</th>
              <th className="p-3 text-start">الموبايل</th>
              <th className="p-3 text-center">الحالة</th>
              <th className="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-line hover:bg-white/5">
                <td className="p-3 font-pixel text-sun-yellow">{b.time}</td>
                <td className="p-3 font-display text-base text-paper-cream">{b.team}</td>
                <td className="p-3">{b.captain}</td>
                <td className="p-3 font-pixel text-[11px] text-sky-cyan">{b.phone}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-0.5 font-bold ${
                      b.status === 'مؤكد'
                        ? 'bg-pitch-green text-ink'
                        : b.status === 'متاح'
                        ? 'bg-sun-yellow text-ink'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-1 space-x-reverse">
                  {b.status === 'مؤكد' && (
                    <button className="text-card-red font-bold hover:underline">
                      إلغاء الحجز
                    </button>
                  )}
                  {b.status === 'متاح' && (
                    <button className="text-sun-yellow font-bold hover:underline">
                      قفل الساعة
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PixelCard>
    </div>
  );
};
