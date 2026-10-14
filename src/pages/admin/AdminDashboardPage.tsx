import React from 'react';
import { Link } from 'react-router-dom';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const AdminDashboardPage: React.FC = () => {
  const kpis = [
    { title: 'حجوزات النهارده', value: '7 ساعات', color: 'text-pitch-green' },
    { title: 'حجوزات الأسبوع', value: '38 ساعة', color: 'text-sky-cyan' },
    { title: 'لاعيبة مسجلين', value: '42 لاعب', color: 'text-paper-cream' },
    { title: 'فرق ناقصها لاعيبة', value: '3 فرق', color: 'text-card-red', badge: 'عاجل' },
    { title: 'نتايج بانتظار الاعتماد', value: '2 نتيجة', color: 'text-sun-yellow', badge: 'مراجعة' },
    { title: 'إيراد متوقع النهارده', value: '2,100 ج', color: 'text-sun-yellow', sub: 'الدفع كاش' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
              <PixelIcon name="star" size={28} color="var(--sun-yellow)" />
              <span>لوحة تحكم إدارة الملعب</span>
            </h1>
            <p className="font-body text-xs text-paper-cream/70 mt-1">
              إدارة الحجوزات، اللاعبين، اعتماد نتائج المباريات، والتحكم في إعدادات الملعب.
            </p>
          </div>
          <span className="font-pixel text-[11px] bg-card-red text-white px-2 py-1 border border-ink">
            ADMIN ROOT
          </span>
        </div>
      </div>

      <AdminNav />

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <PixelCard key={i} variant="arcade" className="p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] text-paper-cream/70 font-semibold">{k.title}</span>
                {k.badge && (
                  <span className="font-pixel text-[8px] bg-card-red text-white px-1">
                    {k.badge}
                  </span>
                )}
              </div>
              <div className={`font-display text-2xl mt-2 ${k.color}`}>{k.value}</div>
            </div>
            {k.sub && <span className="text-[10px] text-paper-cream/40 mt-1">{k.sub}</span>}
          </PixelCard>
        ))}
      </div>

      {/* Quick Actions & Pending Results Queue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PixelCard variant="paper" headerFoil="مراجعة نتائج المباريات ⚽" className="p-4">
          <div className="space-y-3">
            <div className="p-3 bg-white border border-ink/30 flex justify-between items-center">
              <div>
                <div className="font-display text-base text-ink">
                  نسور كينج مريوط (7) : فهود برج العرب (5)
                </div>
                <div className="text-xs text-ink/60">
                  مقدمة بواسطة: كابتن أحمد زيزو • منذ ساعتين
                </div>
              </div>
              <div className="flex gap-1">
                <PixelButton variant="green" size="sm">
                  اعتماد ✓
                </PixelButton>
                <PixelButton variant="danger" size="sm">
                  رفض
                </PixelButton>
              </div>
            </div>

            <div className="p-3 bg-white border border-ink/30 flex justify-between items-center">
              <div>
                <div className="font-display text-base text-ink">
                  كتيبة الرعب (3) : أبطال الحارة (2)
                </div>
                <div className="text-xs text-ink/60">
                  مقدمة بواسطة: كابتن محمد عضل • منذ 4 ساعات
                </div>
              </div>
              <div className="flex gap-1">
                <PixelButton variant="green" size="sm">
                  اعتماد ✓
                </PixelButton>
                <PixelButton variant="danger" size="sm">
                  رفض
                </PixelButton>
              </div>
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="arcade" className="p-4">
          <h3 className="font-display text-xl text-paper-cream mb-3">إجراءات سريعة للإدارة</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/admin/bookings">
              <PixelButton variant="yellow" size="sm" fullWidth>
                حجز يدوي / قفل ساعة
              </PixelButton>
            </Link>
            <Link to="/admin/tournaments">
              <PixelButton variant="green" size="sm" fullWidth>
                إنشاء بطولة جديدة
              </PixelButton>
            </Link>
            <Link to="/admin/content">
              <PixelButton variant="dark" size="sm" fullWidth>
                رفع كوميكس جديد
              </PixelButton>
            </Link>
            <Link to="/admin/settings">
              <PixelButton variant="outline" size="sm" fullWidth>
                تعديل سعر الساعة
              </PixelButton>
            </Link>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
