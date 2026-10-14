import React from 'react';
import { retroSound } from '@/lib/sound';

export type PixelButtonVariant = 
  | 'yellow' 
  | 'green' 
  | 'orange' 
  | 'pink' 
  | 'danger' 
  | 'cream' 
  | 'dark' 
  | 'outline';

export type PixelButtonSize = 'sm' | 'md' | 'lg';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PixelButtonVariant;
  size?: PixelButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      retroSound.playClick();
      if (onClick) onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'yellow':
        return 'bg-sun-yellow text-ink border-ink hover:bg-[#FFF04D]';
      case 'green':
        return 'bg-[#25F143] text-ink font-bold border-ink hover:bg-[#4DFF66] shadow-[var(--shadow-x)_4px_0_#0E4218]';
      case 'orange':
        return 'bg-[#FF6600] text-white font-bold border-ink hover:bg-[#FF7A1A] shadow-[var(--shadow-x)_4px_0_#803300]';
      case 'pink':
        return 'bg-[#FF007F] text-white font-bold border-ink hover:bg-[#FF2E93] shadow-[var(--shadow-x)_4px_0_#800040]';
      case 'danger':
        return 'bg-card-red text-white border-ink hover:bg-[#FF4D82]';
      case 'cream':
        return 'bg-paper-cream text-ink border-ink hover:bg-white';
      case 'dark':
        return 'bg-[#11131C] text-paper-cream border-[#25F143] hover:bg-[#1A1D2A]';
      case 'outline':
        return 'bg-transparent text-paper-cream border-line hover:bg-white/10';
      default:
        return 'bg-sun-yellow text-ink border-ink';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm min-h-[38px]';
      case 'md':
        return 'px-5 py-2.5 text-base min-h-[44px]';
      case 'lg':
        return 'px-6 py-3.5 text-lg min-h-[52px] font-display';
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-display select-none cursor-pointer
        border-[3px] border-solid
        transition-none
        ${getSizeStyles()}
        ${getVariantStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed shadow-none'
            : `
              shadow-[var(--shadow-x)_4px_0_var(--ink)]
              hover:shadow-[var(--shadow-x)_5px_0_var(--ink)]
              active:translate-x-[var(--shadow-x-sm)] active:translate-y-[2px]
              active:shadow-[var(--shadow-x-sm)_2px_0_var(--ink)]
            `
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
