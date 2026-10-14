import React, { useState } from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';

export const AdminContentPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إدارة المحتوى والكوميكس</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          رفع كوميكس جديدة، التحكم في النشر على الموقع، ومراجعة معرض الصور.
        </p>
      </div>

      <AdminNav />

      <PixelCard variant="paper" headerFoil="رفع كوميكس جديد 📰" className="p-5 max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('سيتم تفعيل رفع الصور إلى Supabase Storage في المرحلة المخصصة.');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-display text-sm text-ink mb-1">عنوان الكوميكس</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: لما الكورة تطير في الجنينة"
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
            />
          </div>

          <div>
            <label className="block font-display text-sm text-ink mb-1">التعليق / الكابشن</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="اكتب قفشة أو نكتة خماسي لطيفة..."
              rows={3}
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
            />
          </div>

          <div>
            <label className="block font-display text-sm text-ink mb-1">ملف الصورة</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs text-ink file:me-3 file:py-1 file:px-3 file:border-2 file:border-ink file:bg-sun-yellow file:font-display cursor-pointer"
            />
          </div>

          <PixelButton variant="yellow" size="md" fullWidth type="submit">
            رفع ونشر الكوميكس 🚀
          </PixelButton>
        </form>
      </PixelCard>
    </div>
  );
};
