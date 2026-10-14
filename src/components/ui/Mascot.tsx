import React from 'react';

interface MascotProps {
  size?: number;
  mood?: 'happy' | 'offside' | 'sad' | 'wink';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 64,
  mood = 'happy',
  className = '',
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* "نجمة" — The 8-bit Star & Ball Retro Mascot */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className="pixelated mascot-bounce shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Star Points / Hair */}
        <rect x="14" y="2" width="4" height="4" fill="#FFD23F" />
        <rect x="13" y="4" width="6" height="2" fill="#FFD23F" />
        <rect x="4" y="10" width="4" height="4" fill="#FFD23F" />
        <rect x="24" y="10" width="4" height="4" fill="#FFD23F" />

        {/* Head / Body Outline */}
        <rect x="10" y="6" width="12" height="20" fill="#0E1A2B" />
        <rect x="8" y="8" width="16" height="16" fill="#0E1A2B" />
        <rect x="6" y="10" width="20" height="12" fill="#0E1A2B" />

        {/* Face Base (White Paper) */}
        <rect x="10" y="8" width="12" height="16" fill="#F4EAD0" />
        <rect x="8" y="10" width="16" height="12" fill="#F4EAD0" />

        {/* Cheeks */}
        <rect x="9" y="17" width="2" height="2" fill="#FF4D4D" opacity="0.6" />
        <rect x="21" y="17" width="2" height="2" fill="#FF4D4D" opacity="0.6" />

        {/* Eyes based on mood */}
        {mood === 'happy' && (
          <>
            <rect x="11" y="13" width="3" height="3" fill="#1A1A2E" />
            <rect x="18" y="13" width="3" height="3" fill="#1A1A2E" />
            <rect x="12" y="13" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="13" width="1" height="1" fill="#FFFFFF" />
            {/* Smile */}
            <rect x="14" y="18" width="4" height="2" fill="#1A1A2E" />
            <rect x="13" y="17" width="1" height="1" fill="#1A1A2E" />
            <rect x="18" y="17" width="1" height="1" fill="#1A1A2E" />
          </>
        )}

        {mood === 'wink' && (
          <>
            <rect x="11" y="13" width="3" height="3" fill="#1A1A2E" />
            <rect x="12" y="13" width="1" height="1" fill="#FFFFFF" />
            {/* Wink right eye */}
            <rect x="17" y="15" width="4" height="1" fill="#1A1A2E" />
            {/* Smile */}
            <rect x="14" y="18" width="4" height="2" fill="#1A1A2E" />
          </>
        )}

        {mood === 'offside' && (
          <>
            {/* Big alert eyes */}
            <rect x="10" y="12" width="4" height="4" fill="#1A1A2E" />
            <rect x="18" y="12" width="4" height="4" fill="#1A1A2E" />
            <rect x="11" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="19" y="13" width="2" height="2" fill="#FFFFFF" />
            {/* Whistle in mouth */}
            <rect x="13" y="18" width="6" height="3" fill="#FFD23F" />
            <rect x="19" y="17" width="2" height="2" fill="#1A1A2E" />
            {/* Red Card in hand */}
            <rect x="25" y="6" width="5" height="7" fill="#FF4D4D" />
            <rect x="24" y="5" width="7" height="9" stroke="#1A1A2E" strokeWidth="1" fill="none" />
          </>
        )}

        {mood === 'sad' && (
          <>
            <rect x="11" y="14" width="3" height="3" fill="#1A1A2E" />
            <rect x="18" y="14" width="3" height="3" fill="#1A1A2E" />
            {/* Frown */}
            <rect x="14" y="19" width="4" height="1" fill="#1A1A2E" />
            <rect x="13" y="20" width="1" height="1" fill="#1A1A2E" />
            <rect x="18" y="20" width="1" height="1" fill="#1A1A2E" />
          </>
        )}

        {/* Small Football Boots */}
        <rect x="10" y="26" width="4" height="3" fill="#1EAE53" />
        <rect x="18" y="26" width="4" height="3" fill="#E52828" />
      </svg>
      <span className="panini-box text-[10px] mt-1">نجمة '90 ⚽</span>
    </div>
  );
};
