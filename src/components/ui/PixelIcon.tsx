import React from 'react';

export type PixelIconName = 
  | 'ball' 
  | 'trophy' 
  | 'boot' 
  | 'whistle' 
  | 'goal' 
  | 'star' 
  | 'shield' 
  | 'crown' 
  | 'calendar' 
  | 'user' 
  | 'users' 
  | 'fire' 
  | 'whatsapp'
  | 'volume-on'
  | 'volume-off'
  | 'arrow-left'
  | 'plus'
  | 'check';

interface PixelIconProps {
  name: PixelIconName;
  size?: number;
  className?: string;
  color?: string;
}

export const PixelIcon: React.FC<PixelIconProps> = ({
  name,
  size = 20,
  className = '',
  color = 'currentColor',
}) => {
  // All icons drawn with pixel grid <rect>s on a 16x16 coordinate space
  const renderIconContent = () => {
    switch (name) {
      case 'ball':
        return (
          <>
            {/* 16x16 Classic Pixel Football */}
            <rect x="5" y="1" width="6" height="2" fill={color} />
            <rect x="3" y="3" width="2" height="2" fill={color} />
            <rect x="11" y="3" width="2" height="2" fill={color} />
            <rect x="1" y="5" width="2" height="6" fill={color} />
            <rect x="13" y="5" width="2" height="6" fill={color} />
            <rect x="3" y="11" width="2" height="2" fill={color} />
            <rect x="11" y="11" width="2" height="2" fill={color} />
            <rect x="5" y="13" width="6" height="2" fill={color} />
            {/* Center Pentagons */}
            <rect x="7" y="6" width="2" height="3" fill="#1A1A2E" />
            <rect x="6" y="7" width="4" height="2" fill="#1A1A2E" />
            <rect x="4" y="5" width="2" height="2" fill="#1A1A2E" />
            <rect x="10" y="5" width="2" height="2" fill="#1A1A2E" />
            <rect x="5" y="10" width="2" height="2" fill="#1A1A2E" />
            <rect x="9" y="10" width="2" height="2" fill="#1A1A2E" />
          </>
        );

      case 'trophy':
        return (
          <>
            {/* Golden Cup */}
            <rect x="3" y="2" width="10" height="2" fill={color} />
            <rect x="2" y="4" width="2" height="3" fill={color} />
            <rect x="12" y="4" width="2" height="3" fill={color} />
            <rect x="4" y="4" width="8" height="4" fill={color} />
            <rect x="5" y="8" width="6" height="2" fill={color} />
            <rect x="6" y="10" width="4" height="2" fill={color} />
            <rect x="7" y="12" width="2" height="1" fill={color} />
            <rect x="4" y="13" width="8" height="2" fill={color} />
          </>
        );

      case 'boot':
        return (
          <>
            {/* Football Boot */}
            <rect x="4" y="5" width="3" height="4" fill={color} />
            <rect x="7" y="7" width="6" height="4" fill={color} />
            <rect x="13" y="9" width="2" height="2" fill={color} />
            <rect x="3" y="9" width="11" height="2" fill={color} />
            {/* Studs */}
            <rect x="4" y="11" width="2" height="2" fill="#FF4D4D" />
            <rect x="8" y="11" width="2" height="2" fill="#FF4D4D" />
            <rect x="12" y="11" width="2" height="2" fill="#FF4D4D" />
          </>
        );

      case 'whistle':
        return (
          <>
            <rect x="2" y="6" width="6" height="6" fill={color} />
            <rect x="8" y="8" width="6" height="3" fill={color} />
            <rect x="8" y="5" width="2" height="3" fill="#FFD23F" />
            <rect x="4" y="8" width="2" height="2" fill="#1A1A2E" />
          </>
        );

      case 'goal':
        return (
          <>
            {/* Goal Posts & Net */}
            <rect x="2" y="3" width="12" height="2" fill={color} />
            <rect x="2" y="5" width="2" height="9" fill={color} />
            <rect x="12" y="5" width="2" height="9" fill={color} />
            {/* Net meshes */}
            <rect x="5" y="6" width="1" height="7" fill={color} opacity="0.5" />
            <rect x="8" y="6" width="1" height="7" fill={color} opacity="0.5" />
            <rect x="11" y="6" width="1" height="7" fill={color} opacity="0.5" />
            <rect x="4" y="8" width="8" height="1" fill={color} opacity="0.5" />
            <rect x="4" y="11" width="8" height="1" fill={color} opacity="0.5" />
          </>
        );

      case 'star':
        return (
          <>
            <rect x="7" y="1" width="2" height="3" fill={color} />
            <rect x="6" y="4" width="4" height="2" fill={color} />
            <rect x="1" y="5" width="14" height="2" fill={color} />
            <rect x="3" y="7" width="10" height="2" fill={color} />
            <rect x="5" y="9" width="6" height="3" fill={color} />
            <rect x="3" y="12" width="3" height="3" fill={color} />
            <rect x="10" y="12" width="3" height="3" fill={color} />
          </>
        );

      case 'crown':
        return (
          <>
            <rect x="2" y="4" width="2" height="3" fill={color} />
            <rect x="7" y="2" width="2" height="5" fill={color} />
            <rect x="12" y="4" width="2" height="3" fill={color} />
            <rect x="2" y="7" width="12" height="3" fill={color} />
            <rect x="2" y="11" width="12" height="3" fill={color} />
            {/* Gems */}
            <rect x="4" y="12" width="2" height="1" fill="#FF4D4D" />
            <rect x="7" y="12" width="2" height="1" fill="#4CC9F0" />
            <rect x="10" y="12" width="2" height="1" fill="#FF4D4D" />
          </>
        );

      case 'fire':
        return (
          <>
            <rect x="7" y="2" width="2" height="3" fill="#FF4D4D" />
            <rect x="6" y="5" width="4" height="3" fill="#FF4D4D" />
            <rect x="4" y="8" width="8" height="3" fill="#FF4D4D" />
            <rect x="3" y="11" width="10" height="3" fill="#FF4D4D" />
            <rect x="6" y="8" width="4" height="4" fill="#FFD23F" />
            <rect x="7" y="9" width="2" height="2" fill="#FFFFFF" />
          </>
        );

      case 'calendar':
        return (
          <>
            <rect x="2" y="3" width="12" height="11" fill={color} />
            <rect x="4" y="1" width="2" height="3" fill="#1A1A2E" />
            <rect x="10" y="1" width="2" height="3" fill="#1A1A2E" />
            <rect x="4" y="6" width="8" height="6" fill="#1A1A2E" />
            <rect x="5" y="7" width="2" height="2" fill={color} />
            <rect x="9" y="7" width="2" height="2" fill={color} />
            <rect x="5" y="10" width="2" height="1" fill={color} />
            <rect x="9" y="10" width="2" height="1" fill={color} />
          </>
        );

      case 'user':
        return (
          <>
            <rect x="6" y="2" width="4" height="4" fill={color} />
            <rect x="5" y="7" width="6" height="2" fill={color} />
            <rect x="3" y="9" width="10" height="5" fill={color} />
          </>
        );

      case 'users':
        return (
          <>
            <rect x="4" y="2" width="4" height="3" fill={color} />
            <rect x="2" y="6" width="8" height="4" fill={color} />
            <rect x="10" y="3" width="3" height="3" fill={color} opacity="0.8" />
            <rect x="10" y="7" width="4" height="4" fill={color} opacity="0.8" />
          </>
        );

      case 'whatsapp':
        return (
          <>
            <rect x="3" y="2" width="10" height="10" fill="#2FBF71" />
            <rect x="2" y="12" width="4" height="2" fill="#2FBF71" />
            <rect x="1" y="14" width="2" height="1" fill="#2FBF71" />
            {/* Phone handset silhouette in white */}
            <rect x="5" y="5" width="2" height="3" fill="#FFFFFF" />
            <rect x="6" y="7" width="3" height="2" fill="#FFFFFF" />
            <rect x="8" y="8" width="2" height="3" fill="#FFFFFF" />
          </>
        );

      case 'volume-on':
        return (
          <>
            <rect x="2" y="5" width="4" height="6" fill={color} />
            <rect x="6" y="3" width="3" height="10" fill={color} />
            <rect x="11" y="4" width="1" height="8" fill={color} />
            <rect x="13" y="2" width="1" height="12" fill={color} />
          </>
        );

      case 'volume-off':
        return (
          <>
            <rect x="2" y="5" width="4" height="6" fill={color} />
            <rect x="6" y="3" width="3" height="10" fill={color} />
            <rect x="11" y="6" width="4" height="2" fill="#FF4D4D" />
          </>
        );

      case 'arrow-left':
        return (
          <>
            <rect x="7" y="3" width="2" height="2" fill={color} />
            <rect x="5" y="5" width="2" height="2" fill={color} />
            <rect x="3" y="7" width="10" height="2" fill={color} />
            <rect x="5" y="9" width="2" height="2" fill={color} />
            <rect x="7" y="11" width="2" height="2" fill={color} />
          </>
        );

      case 'plus':
        return (
          <>
            <rect x="7" y="3" width="2" height="10" fill={color} />
            <rect x="3" y="7" width="10" height="2" fill={color} />
          </>
        );

      case 'check':
        return (
          <>
            <rect x="3" y="8" width="2" height="2" fill={color} />
            <rect x="5" y="10" width="2" height="2" fill={color} />
            <rect x="7" y="12" width="2" height="2" fill={color} />
            <rect x="9" y="8" width="2" height="4" fill={color} />
            <rect x="11" y="5" width="2" height="4" fill={color} />
          </>
        );

      default:
        return <rect x="4" y="4" width="8" height="8" fill={color} />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`pixelated shrink-0 inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {renderIconContent()}
    </svg>
  );
};
