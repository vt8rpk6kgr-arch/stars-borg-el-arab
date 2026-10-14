import React from 'react';

export type PixelBadgeVariant = 
  | 'GK' 
  | 'DEF' 
  | 'MID' 
  | 'ATT' 
  | 'live' 
  | 'final' 
  | 'pending' 
  | 'common' 
  | 'rare' 
  | 'epic'
  | 'yellow'
  | 'orange'
  | 'pink';

interface PixelBadgeProps {
  variant?: PixelBadgeVariant;
  children: React.ReactNode;
  className?: string;
  isBlinking?: boolean;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  variant = 'yellow',
  children,
  className = '',
  isBlinking = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'GK':
        return 'bg-[#FF6600] text-black border-ink font-bold';
      case 'DEF':
        return 'bg-[#00E5FF] text-black border-ink font-bold';
      case 'MID':
        return 'bg-[#25F143] text-black border-ink font-bold';
      case 'ATT':
        return 'bg-[#FF007F] text-white border-ink font-bold';
      case 'live':
        return 'bg-[#FF007F] text-white border-ink font-pixel';
      case 'final':
        return 'bg-[#0E4218] text-[#25F143] border-ink font-bold';
      case 'pending':
        return 'bg-sun-yellow text-ink border-ink font-bold';
      case 'orange':
        return 'bg-[#FF6600] text-black border-ink font-bold';
      case 'pink':
        return 'bg-[#FF007F] text-white border-ink font-bold';
      case 'common':
        return 'bg-paper-cream text-ink border-ink';
      case 'rare':
        return 'bg-[#00E5FF] text-ink border-ink shimmer-blue';
      case 'epic':
        return 'bg-[#FF007F] text-white border-ink shimmer-pink';
      case 'yellow':
      default:
        return 'bg-sun-yellow text-ink border-ink';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2 py-0.5 text-xs font-bold
        border-[2px] shadow-[var(--shadow-x-sm)_2px_0_var(--ink)]
        select-none uppercase
        ${isBlinking ? 'blink-retro' : ''}
        ${getVariantStyles()}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
