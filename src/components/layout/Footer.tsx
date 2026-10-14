import React from 'react';
import { PixelIcon } from '../ui/PixelIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pb-20 lg:pb-8 border-t-[3px] border-ink bg-[#122E5C] text-paper-cream/90 text-sm">
      {/* Decorative Italia '90 Flag Ribbon Strip */}
      <div className="italia-ribbon-stripe" />

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          {/* Pitch info with Panini 90 branding */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-display text-3xl text-sun-yellow drop-shadow-[0_2px_0_var(--ink)]">
                نجوم برج العرب
              </span>
              <span className="panini-box text-xs">
                BORG '90
              </span>
            </div>
            <p className="text-paper-cream/80 max-w-md font-body text-xs leading-relaxed">
              ملعب خماسي نجيل صناعي معتمد، إضاءة ليلية كاملة، غرف تبديل ملابس، وبطولات دورية بطابع كأس العالم وألبومات استيكرز التسعينات. برج العرب، الإسكندرية.
            </p>
            <p className="font-display text-sun-yellow mt-2 text-base">
              "احجز، كمّل فريقك، سجّل جون، وخش لوحة الشرف." ⚽
            </p>
          </div>

          {/* Quick Contact & WhatsApp button */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href="https://wa.me/201000000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%AC%D8%B2%20%D9%85%D9%84%D8%B9%D8%A8%20%D9%86%D8%AC%D9%88%D9%85%20%D8%A8%D8%B1%D8%AC%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-pitch-night font-display text-lg border-[3px] border-ink shadow-[var(--shadow-x)_4px_0_var(--ink)] hover:bg-[#20ba59] active:translate-x-[var(--shadow-x-sm)] active:translate-y-[2px]"
            >
              <PixelIcon name="whatsapp" size={20} color="#FFFFFF" />
              <span>تواصل مع إدارة الملعب واتساب</span>
            </a>
            <span className="text-xs text-paper-cream/70 font-bold bg-black/30 px-2 py-0.5 border border-line">
              الدفع كاش في الملعب قبل بدء الماتش (300 ج)
            </span>
          </div>
        </div>

        {/* Bottom copyright & arcade vibe note */}
        <div className="mt-8 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between text-xs text-paper-cream/60">
          <span>© {new Date().getFullYear()} نجوم برج العرب — تصميم كلاسيكي بروح كأس العالم إيطاليا 90</span>
          <span className="font-pixel text-[9px] mt-2 sm:mt-0 text-sun-yellow">
            WORLD CUP 1990 • VINTAGE STICKER ALBUM EDITION
          </span>
        </div>
      </div>
    </footer>
  );
};
