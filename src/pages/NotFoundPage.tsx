import React from 'react';
import { Link } from 'react-router-dom';
import { Mascot } from '@/components/ui/Mascot';
import { PixelButton } from '@/components/ui/PixelButton';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <Mascot size={96} mood="offside" />

      <div className="font-pixel text-4xl sm:text-6xl text-card-red mt-4 blink-retro">
        404
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-sun-yellow mt-2">
        تسلل صريح! (OFFSIDE!) 🚩
      </h1>

      <p className="font-body text-paper-cream/80 text-sm max-w-md mt-2">
        الكورة خرجت برة الخط والصفحة دي مش موجودة في ملعب نجوم البرج. ارجع لنص الملعب وكمل لعب!
      </p>

      <div className="mt-6">
        <Link to="/">
          <PixelButton variant="green" size="lg">
            ⚽ العودة للرئيسية
          </PixelButton>
        </Link>
      </div>
    </div>
  );
};
