import React, { useState } from 'react';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelIcon } from '@/components/ui/PixelIcon';

export const BookPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate 7 days starting today
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      index: i,
      name: i === 0 ? 'اليوم' : i === 1 ? 'غداً' : d.toLocaleDateString('ar-EG', { weekday: 'short' }),
      dateStr: d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }),
    };
  });

  // Sample slots from 4 PM to 2 AM
  const slots = [
    { time: '04:00 PM', status: 'past', label: 'فات' },
    { time: '05:00 PM', status: 'past', label: 'فات' },
    { time: '06:00 PM', status: 'booked', label: 'محجوز (فريق النسور)' },
    { time: '07:00 PM', status: 'available', label: 'متاح' },
    { time: '08:00 PM', status: 'booked', label: 'محجوز (أبطال الحارة)' },
    { time: '09:00 PM', status: 'available', label: 'متاح' },
    { time: '10:00 PM', status: 'booked', label: 'محجوز (دراويش بهيج)' },
    { time: '11:00 PM', status: 'available', label: 'متاح' },
    { time: '12:00 AM', status: 'available', label: 'متاح' },
    { time: '01:00 AM', status: 'blocked', label: 'صيانة' },
    { time: '02:00 AM', status: 'available', label: 'متاح' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-[3px] border-ink pb-4">
        <h1 className="font-display text-3xl text-sun-yellow flex items-center gap-2">
          <PixelIcon name="calendar" size={28} color="var(--sun-yellow)" />
          <span>احجز ساعتك في الملعب</span>
        </h1>
        <p className="font-body text-paper-cream/80 text-sm mt-1">
          اختار اليوم والميعاد المناسب، وحدد إذا كنت محتاج منافس (تحدي مفتوح) أو حجز لفريقك.
        </p>
      </div>

      {/* Date Picker Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDate === day.index;
          return (
            <button
              key={day.index}
              onClick={() => setSelectedDate(day.index)}
              className={`
                px-4 py-2 border-[2px] border-ink flex flex-col items-center min-w-[85px]
                ${
                  isSelected
                    ? 'bg-sun-yellow text-ink font-bold shadow-[var(--shadow-x)_3px_0_var(--ink)]'
                    : 'bg-pitch-night/80 text-paper-cream hover:bg-[#16273e]'
                }
              `}
            >
              <span className="font-display text-sm">{day.name}</span>
              <span className="font-pixel text-[10px] opacity-80">{day.dateStr}</span>
            </button>
          );
        })}
      </div>

      {/* Slot Status Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold bg-pitch-night/60 p-3 border border-line">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-pitch-green border border-ink" />
          <span>متاح (300 ج)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-card-red border border-ink" />
          <span>محجوز</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-gray-600 border border-ink" />
          <span>مقفول / صيانة</span>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((s, idx) => {
          const isSelected = selectedSlot === s.time;
          const isAvailable = s.status === 'available';

          return (
            <PixelCard
              key={idx}
              variant="arcade"
              onClick={() => isAvailable && setSelectedSlot(s.time)}
              className={`
                p-3 text-center cursor-pointer transition-none select-none
                ${
                  isSelected
                    ? 'border-sun-yellow bg-pitch-deep shadow-[var(--shadow-x)_4px_0_var(--sun-yellow)]'
                    : ''
                }
                ${
                  s.status === 'booked'
                    ? 'border-card-red/60 bg-card-red/10 cursor-not-allowed opacity-80'
                    : ''
                }
                ${
                  s.status === 'blocked' || s.status === 'past'
                    ? 'border-line bg-black/40 cursor-not-allowed opacity-50'
                    : ''
                }
              `}
            >
              <div className="font-pixel text-sm text-sun-yellow">{s.time}</div>
              <div
                className={`text-xs mt-1 font-bold ${
                  s.status === 'available'
                    ? 'text-pitch-green'
                    : s.status === 'booked'
                    ? 'text-card-red'
                    : 'text-paper-cream/40'
                }`}
              >
                {s.label}
              </div>
            </PixelCard>
          );
        })}
      </div>

      {/* Booking confirmation prompt when slot selected */}
      {selectedSlot && (
        <PixelCard variant="paper" className="p-4 border-[3px] border-sun-yellow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-pixel text-xs text-pitch-deep">SELECTED SLOT // ميعاد الحجز</div>
              <div className="font-display text-xl text-ink mt-0.5">
                الساعة {selectedSlot} • السعر: 300 جنيه (الدفع كاش في الملعب)
              </div>
              <p className="text-xs text-ink/70">
                سيتطلب منك تسجيل اسم الفريق لتأكيد الحجز فورياً.
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <PixelButton variant="green" size="md">
                تأكيد حجز الميعاد ⚽
              </PixelButton>
              <PixelButton
                variant="outline"
                size="md"
                onClick={() => setSelectedSlot(null)}
                className="text-ink border-ink"
              >
                إلغاء
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      )}
    </div>
  );
};
