import React, { useState } from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';

export const AdminTournamentsPage: React.FC = () => {
  const [tourName, setTourName] = useState('');
  const [format, setFormat] = useState('league');

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إدارة وتنظيم البطولات</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          إنشاء بطولات دوري أو خروج مغلوب، وتوليد جدول المباريات آلياً.
        </p>
      </div>

      <AdminNav />

      {/* Tournament Wizard Form */}
      <PixelCard variant="paper" headerFoil="معالج إنشاء بطولة جديدة 🏆" className="p-5 max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('سيتم تفعيل معالج توليد المباريات والجدول بالكامل في مرحلة البطولات.');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-display text-sm text-ink mb-1">اسم البطولة</label>
            <input
              type="text"
              required
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              placeholder="مثال: دوري أبطال برج العرب الخريفي"
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
            />
          </div>

          <div>
            <label className="block font-display text-sm text-ink mb-1">نظام البطولة</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
            >
              <option value="league">دوري نقاط (مجموعة واحدة)</option>
              <option value="knockout">خروج مغلوب (شجرة تصفيات كلاسيكية)</option>
            </select>
          </div>

          <PixelButton variant="green" size="md" fullWidth type="submit">
            + إنشاء البطولة وتوليد المباريات
          </PixelButton>
        </form>
      </PixelCard>
    </div>
  );
};
