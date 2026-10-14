import React from 'react';
import { Link } from 'react-router-dom';
import { Scoreboard } from '@/components/ui/Scoreboard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelCard } from '@/components/ui/PixelCard';
import { RetroFifaCard } from '@/components/ui/RetroFifaCard';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { Mascot } from '@/components/ui/Mascot';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 1. Scoreboard Hero */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl md:text-2xl text-sun-yellow flex items-center gap-2">
            <PixelIcon name="fire" size={20} color="var(--sun-yellow)" />
            <span>ماتش الليلة الماضي</span>
          </h2>
          <span className="font-pixel text-[10px] text-paper-cream/60">
            RESULT // MATCH #104
          </span>
        </div>

        <Scoreboard
          homeTeam="نسور كينج مريوط"
          awayTeam="فهود برج العرب"
          homeScore={7}
          awayScore={5}
          status="final"
          roundLabel="دوري الصيف — الجولة 4"
          homeScorers={[
            { id: '1', name: 'أحمد زيزو', minute: 12 },
            { id: '2', name: 'أحمد زيزو', minute: 28 },
            { id: '3', name: 'كريم شيكا', minute: 35 },
            { id: '4', name: 'أحمد زيزو', minute: 50 },
          ]}
          awayScorers={[
            { id: '5', name: 'عمر القناص', minute: 15 },
            { id: '6', name: 'عمر القناص', minute: 42 },
            { id: '7', name: 'طارق حامد (ع.م)', minute: 48, isOwnGoal: true },
          ]}
        />
      </section>

      {/* 2. قادم قريب (Next 3 bookings/matches) */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl text-paper-cream flex items-center gap-2">
            <PixelIcon name="calendar" size={18} color="var(--sky-cyan)" />
            <span>قادم قريب الليلة</span>
          </h2>
          <Link to="/book" className="text-xs text-sky-cyan font-bold hover:underline">
            عرض كل المواعيد ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PixelCard variant="arcade" className="p-3">
            <div className="flex justify-between items-center text-xs text-sun-yellow font-pixel mb-1">
              <span>08:00 PM</span>
              <span className="text-pitch-green">مؤكد</span>
            </div>
            <div className="font-display text-base text-paper-cream">
              أبطال الحارة <span className="text-xs font-pixel text-paper-cream/50">VS</span> شباب الساحل
            </div>
            <div className="text-[11px] text-paper-cream/60 mt-1">حجز خماسي كامل</div>
          </PixelCard>

          <PixelCard variant="arcade" className="p-3">
            <div className="flex justify-between items-center text-xs text-sun-yellow font-pixel mb-1">
              <span>09:00 PM</span>
              <span className="text-card-red blink-retro">تحدي مفتوح</span>
            </div>
            <div className="font-display text-base text-paper-cream">
              كتيبة الرعب <span className="text-xs font-pixel text-paper-cream/50">VS</span> ؟ (في انتظار منافس)
            </div>
            <div className="text-[11px] text-sky-cyan mt-1 font-bold">
              اضغط هنا لقبول التحدي!
            </div>
          </PixelCard>

          <PixelCard variant="arcade" className="p-3">
            <div className="flex justify-between items-center text-xs text-sun-yellow font-pixel mb-1">
              <span>10:00 PM</span>
              <span className="text-pitch-green">مؤكد</span>
            </div>
            <div className="font-display text-base text-paper-cream">
              نجوم الهوارية <span className="text-xs font-pixel text-paper-cream/50">VS</span> دراويش بهيج
            </div>
            <div className="text-[11px] text-paper-cream/60 mt-1">بطولة الكأس — ربع النهائي</div>
          </PixelCard>
        </div>
      </section>

      {/* 3. هدافين الليلة / الأسبوع */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl text-paper-cream flex items-center gap-2">
            <PixelIcon name="boot" size={18} color="var(--sun-yellow)" />
            <span>لوحة الهدافين</span>
          </h2>
          <Link to="/stats" className="text-xs text-sun-yellow hover:underline">
            لوحة الشرف كاملة ←
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          {/* 90s FIFA Card #1 */}
          <Link to="/players/p1" className="w-full flex justify-center">
            <RetroFifaCard
              name="أحمد زيزو"
              nickname="القناص"
              position="ATT"
              rating={88}
              teamName="نسور كينج مريوط"
              goals={14}
              matches={12}
              badgeRank="🥇 #1 SCORER"
              variant="gold"
              stats={{ pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 }}
            />
          </Link>

          {/* 90s FIFA Card #2 */}
          <Link to="/players/p2" className="w-full flex justify-center">
            <RetroFifaCard
              name="عمر القناص"
              nickname="الفهد"
              position="ATT"
              rating={85}
              teamName="فهود برج العرب"
              goals={11}
              matches={11}
              badgeRank="🥈 #2 SCORER"
              variant="special"
              stats={{ pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 }}
            />
          </Link>

          {/* 90s FIFA Card #3 */}
          <Link to="/players/p3" className="w-full flex justify-center">
            <RetroFifaCard
              name="محمود تريكة"
              nickname="المايسترو"
              position="MID"
              rating={83}
              teamName="أبطال الحارة"
              goals={9}
              matches={10}
              badgeRank="🥉 #3 SCORER"
              variant="gold"
              stats={{ pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 }}
            />
          </Link>
        </div>
      </section>

      {/* 4. فرق ناقصها لاعيبة 🚨 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl text-card-red flex items-center gap-2">
            <span className="blink-retro">🚨</span>
            <span>فرق ناقصها لاعيبة الليلة!</span>
          </h2>
          <Link to="/teams" className="text-xs text-sky-cyan hover:underline">
            كل الفرق ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PixelCard variant="arcade" className="p-4 border-card-red">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-card-red text-white px-2 py-0.5 font-bold">
                  ناقص 2 لاعيبة!
                </span>
                <h3 className="font-display text-lg text-paper-cream mt-2">
                  فريق دراويش بهيج
                </h3>
                <p className="text-xs text-paper-cream/70">
                  الماتش النهارده الساعة 10:00 مساءً • المركز المطلوب: دفاع ووسط
                </p>
              </div>

              <div className="text-center font-pixel text-xs bg-black/60 p-2 border border-line">
                <span className="text-sun-yellow">3/5</span>
                <div className="w-16 h-2 bg-pitch-night border border-ink mt-1">
                  <div className="h-full bg-pitch-green" style={{ width: '60%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to="/teams" className="flex-1">
                <PixelButton variant="green" size="sm" fullWidth>
                  انضم للفريق الآن
                </PixelButton>
              </Link>
            </div>
          </PixelCard>

          <PixelCard variant="arcade" className="p-4 border-card-red">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-card-red text-white px-2 py-0.5 font-bold">
                  ناقص حارس مرمى! 🧤
                </span>
                <h3 className="font-display text-lg text-paper-cream mt-2">
                  كتيبة الرعب
                </h3>
                <p className="text-xs text-paper-cream/70">
                  الماتش النهارده الساعة 09:00 مساءً • محتاجين جون شاطر
                </p>
              </div>

              <div className="text-center font-pixel text-xs bg-black/60 p-2 border border-line">
                <span className="text-sun-yellow">4/5</span>
                <div className="w-16 h-2 bg-pitch-night border border-ink mt-1">
                  <div className="h-full bg-pitch-green" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to="/teams" className="flex-1">
                <PixelButton variant="green" size="sm" fullWidth>
                  أنا الحارس! سجلني
                </PixelButton>
              </Link>
            </div>
          </PixelCard>
        </div>
      </section>

      {/* 5. Big Arcade Booking CTA in Neon Black */}
      <section className="bg-gradient-to-b from-[#141724] to-[#090A0F] border-[4px] border-[#FF007F] p-6 md:p-8 text-center shadow-[var(--shadow-x)_6px_0_#FF6600] relative overflow-hidden">
        <div className="scanlines absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-lg mx-auto space-y-4">
          <Mascot size={72} mood="happy" />
          <h2 className="font-display text-3xl md:text-5xl text-[#FFE500] drop-shadow-[0_2px_10px_rgba(255,229,0,0.4)]">
            جاهز تلعب الماتش الجاي؟
          </h2>
          <p className="font-body text-sm md:text-base text-paper-cream/90">
            احجز ساعتك في ثواني، اختار ميعادك، وكمّل فريقك بضغطة زرار على واتساب!
          </p>
          <div className="pt-2">
            <Link to="/book">
              <PixelButton variant="green" size="lg" className="w-full sm:w-auto text-2xl px-8 py-4">
                ⚽ احجز ساعتك الآن (300 ج)
              </PixelButton>
            </Link>
          </div>
          <p className="font-pixel text-[10px] text-[#25F143] pt-1">
            INSERT COIN • CASH PAYMENT AT THE PITCH
          </p>
        </div>
      </section>
    </div>
  );
};
