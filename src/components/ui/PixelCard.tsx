import React from 'react';

export type PixelCardVariant = 'arcade' | 'paper' | 'sticker' | 'grass' | 'gold' | 'flat' | 'pink' | 'orange';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PixelCardVariant;
  children: React.ReactNode;
  headerFoil?: string;
  className?: string;
  stickerNumber?: string | number;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  variant = 'arcade',
  children,
  headerFoil,
  className = '',
  stickerNumber,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'arcade':
        // Deep Black Arcade Panel with Phosphor or Ink outline
        return 'bg-[#10121A] text-paper-cream border-[3px] border-line shadow-[var(--shadow-x)_5px_0_var(--ink)]';
      case 'paper':
        // Vintage Album Paper
        return 'bg-paper-cream text-ink border-[3px] border-ink shadow-[var(--shadow-x)_5px_0_#FF6600]';
      case 'sticker':
        // 1990 Panini Player Sticker Look with Hot Pink drop shadow
        return 'bg-[#FFFDF6] text-ink border-[3px] border-ink shadow-[var(--shadow-x)_5px_0_#FF007F] p-3';
      case 'grass':
        return 'bg-pitch-deep text-paper-cream border-[3px] border-[#25F143] shadow-[var(--shadow-x)_5px_0_var(--ink)]';
      case 'gold':
        return 'bg-[#10121A] text-paper-cream border-[3px] border-sun-yellow shadow-[var(--shadow-x)_5px_0_var(--sun-yellow)]';
      case 'pink':
        return 'bg-[#10121A] text-paper-cream border-[3px] border-[#FF007F] shadow-[var(--shadow-x)_5px_0_#FF007F]';
      case 'orange':
        return 'bg-[#10121A] text-paper-cream border-[3px] border-[#FF6600] shadow-[var(--shadow-x)_5px_0_#FF6600]';
      case 'flat':
        return 'bg-[#10121A]/80 text-paper-cream border-[2px] border-line';
      default:
        return 'bg-[#10121A] text-paper-cream border-[3px] border-ink';
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${getVariantStyles()}
        ${className}
      `}
      {...props}
    >
      {/* 80s/90s Foil Header Bar */}
      {headerFoil && (
        <div className="bg-gradient-to-r from-[#FF007F] via-[#FF6600] to-[#FFE500] border-b-[3px] border-ink px-3 py-1 font-display text-ink text-sm flex items-center justify-between font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-xs">⚽</span>
            <span className="text-white drop-shadow-[1px_1px_0_var(--ink)]">{headerFoil}</span>
          </div>
          <span className="font-pixel text-[9px] tracking-wider bg-black text-[#25F143] px-1.5 py-0.5 border border-ink">
            {stickerNumber ? `#${stickerNumber}` : 'RETRO 90'}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};
