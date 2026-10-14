import React, { useState } from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';

export const AdminSettingsPage: React.FC = () => {
  const [openHour, setOpenHour] = useState(16);
  const [closeHour, setCloseHour] = useState(26);
  const [price, setPrice] = useState(300);
  const [whatsapp, setWhatsapp] = useState('01000000000');
  const [cancelHours, setCancelHours] = useState(3);

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow">إعدادات الملعب والتشغيل</h1>
        <p className="font-body text-xs text-paper-cream/70 mt-1">
          التحكم في مواعيد فتح وغلق الملعب، سعر الساعة، رقم الواتساب، وسياسة الإلغاء.
        </p>
      </div>

      <AdminNav />

      <PixelCard variant="paper" headerFoil="بيانات تشغيل الملعب (pitch_settings) ⚙️" className="p-5 max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('تم حفظ الإعدادات بنجاح!');
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display text-xs text-ink mb-1">
                ساعة الفتح (توقيت القاهرة)
              </label>
              <input
                type="number"
                value={openHour}
                onChange={(e) => setOpenHour(Number(e.target.value))}
                className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
              />
              <span className="text-[10px] text-ink/60">16 = 4 عصراً</span>
            </div>

            <div>
              <label className="block font-display text-xs text-ink mb-1">
                ساعة الغلق (بعد منتصف الليل)
              </label>
              <input
                type="number"
                value={closeHour}
                onChange={(e) => setCloseHour(Number(e.target.value))}
                className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
              />
              <span className="text-[10px] text-ink/60">26 = 2 صباحاً</span>
            </div>
          </div>

          <div>
            <label className="block font-display text-xs text-ink mb-1">
              سعر حجز الساعة (بالجنيه المصري EGP)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none font-pixel"
            />
          </div>

          <div>
            <label className="block font-display text-xs text-ink mb-1">
              رقم واتساب الإدارة المعتمد
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none font-pixel"
            />
          </div>

          <div>
            <label className="block font-display text-xs text-ink mb-1">
              سماحية الإلغاء للكابتن (قبل كم ساعة؟)
            </label>
            <input
              type="number"
              value={cancelHours}
              onChange={(e) => setCancelHours(Number(e.target.value))}
              className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none font-pixel"
            />
          </div>

          <PixelButton variant="green" size="md" fullWidth type="submit">
            حفظ الإعدادات في قاعدة البيانات ✓
          </PixelButton>
        </form>
      </PixelCard>
    </div>
  );
};
