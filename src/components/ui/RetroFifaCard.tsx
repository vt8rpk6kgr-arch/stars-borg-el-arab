import React from 'react';

export interface FifaCardStats {
  pac?: number; // السرعة
  sho?: number; // التسديد
  pas?: number; // التمرير
  dri?: number; // المراوغة
  def?: number; // الدفاع
  phy?: number; // البدنية
}

interface RetroFifaCardProps {
  name: string;
  nickname?: string;
  position: 'GK' | 'DEF' | 'MID' | 'ATT' | string;
  rating: number;
  photoUrl?: string | null;
  teamName: string;
  goals?: number;
  matches?: number;
  stats?: FifaCardStats;
  badgeRank?: string; // e.g. '#1 SCORER' or 'CAPTAIN'
  variant?: 'gold' | 'silver' | 'bronze' | 'special';
  className?: string;
  onClick?: () => void;
}

export const RetroFifaCard: React.FC<RetroFifaCardProps> = ({
  name,
  nickname,
  position,
  rating,
  photoUrl,
  teamName,
  goals,
  matches,
  stats = { pac: 85, sho: 88, pas: 80, dri: 86, def: 65, phy: 82 },
  badgeRank,
  variant = 'gold',
  className = '',
  onClick,
}) => {
  // Determine card shield theme
  const getCardTheme = () => {
    switch (variant) {
      case 'gold':
        return {
          cardBg: 'from-[#D4AF37] via-[#FFF2A3] to-[#AA7C11]',
          innerBg: 'bg-[#15161E]',
          border: 'border-[#FFD700]',
          ribbonBg: 'bg-gradient-to-r from-[#AA7C11] via-[#FFD700] to-[#AA7C11]',
          textColor: 'text-[#FFD700]',
          glow: 'shadow-[0_0_20px_rgba(255,215,0,0.35)]',
        };
      case 'special':
        return {
          cardBg: 'from-[#FF007F] via-[#FF6600] to-[#25F143]',
          innerBg: 'bg-[#0E0F17]',
          border: 'border-[#FF007F]',
          ribbonBg: 'bg-gradient-to-r from-[#FF007F] to-[#FF6600]',
          textColor: 'text-[#25F143]',
          glow: 'shadow-[0_0_20px_rgba(255,0,127,0.4)]',
        };
      default:
        return {
          cardBg: 'from-[#D4AF37] via-[#FFF2A3] to-[#AA7C11]',
          innerBg: 'bg-[#15161E]',
          border: 'border-[#FFD700]',
          ribbonBg: 'bg-gradient-to-r from-[#AA7C11] via-[#FFD700] to-[#AA7C11]',
          textColor: 'text-[#FFD700]',
          glow: 'shadow-[0_0_20px_rgba(255,215,0,0.35)]',
        };
    }
  };

  const theme = getCardTheme();

  return (
    <div
      onClick={onClick}
      className={`
        relative select-none transition-all duration-200
        hover:scale-[1.02] cursor-pointer
        ${className}
      `}
      style={{ width: '100%', maxWidth: '300px' }}
    >
      {/* 90s FIFA Authentic Die-Cut Shield Border */}
      <div
        className={`
          p-1.5 bg-gradient-to-b ${theme.cardBg}
          border-[3px] border-[#090A0F]
          shadow-[var(--shadow-x)_6px_0_#090A0F]
          ${theme.glow}
        `}
        style={{
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 88%, 50% 100%, 0% 88%)',
        }}
      >
        {/* Inner Card Container */}
        <div
          className={`${theme.innerBg} text-paper-cream p-3 pb-8 relative overflow-hidden`}
          style={{
            clipPath:
              'polygon(0% 0%, 100% 0%, 100% 88%, 50% 100%, 0% 88%)',
          }}
        >
          {/* Top Vintage Card Watermark & 90s FIFA Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
            <div className="flex items-center gap-1">
              <span className="font-pixel text-[8px] bg-black text-[#25F143] px-1 py-0.5 border border-white/20">
                FIFA '98
              </span>
              <span className="font-pixel text-[8px] text-[#FF6600]">STARS</span>
            </div>
            {badgeRank && (
              <span className="font-pixel text-[8px] bg-[#FF007F] text-white px-1.5 py-0.5 border border-black font-bold animate-pulse">
                {badgeRank}
              </span>
            )}
          </div>

          {/* Player Rating & Position + Portrait Stage */}
          <div className="grid grid-cols-12 gap-1 items-center mb-2">
            {/* Left Rating Shield Column */}
            <div className="col-span-4 flex flex-col items-center justify-center border-l border-white/10 pl-1">
              <div className="font-pixel text-3xl font-extrabold text-[#FFE500] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {rating}
              </div>
              <span className="font-pixel text-[9px] text-[#25F143] font-bold mt-1">
                {position}
              </span>
              {/* Mini Egyptian Flag / Logo */}
              <div className="w-6 h-4 border border-black flex flex-col mt-2 shadow-sm">
                <div className="h-1/3 bg-[#E52828]" />
                <div className="h-1/3 bg-white flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                </div>
                <div className="h-1/3 bg-black" />
              </div>
              <span className="text-[9px] font-bold text-white/50 mt-0.5">EGY</span>
            </div>

            {/* Right Player Photo / Cutout */}
            <div className="col-span-8 flex justify-center items-center relative">
              <div className="w-24 h-28 relative rounded-sm overflow-hidden border-[2px] border-[#FFE500]/60 bg-gradient-to-t from-black via-[#1B2338] to-[#2E6DBE]/40 flex items-center justify-center shadow-inner">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl filter drop-shadow">⚽</span>
                    <span className="text-[9px] font-pixel text-white/60 mt-1">NO PHOTO</span>
                  </div>
                )}
                {/* 90s Card Light Glare Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Name & Team Ribbon Bar */}
          <div className="my-2 text-center bg-gradient-to-r from-black via-[#1E2333] to-black border-y-2 border-[#FFE500] py-1 shadow">
            <h3 className="font-display text-xl text-[#FFE500] leading-tight truncate px-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {name}
            </h3>
            <div className="text-[11px] font-bold text-white/80">
              {nickname ? `«${nickname}» • ` : ''}{teamName}
            </div>
          </div>

          {/* 90s FIFA 6-Attribute Stats Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 bg-black/60 border border-white/10 p-2 text-xs font-semibold">
            <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
              <span className="font-pixel text-[10px] text-[#25F143]">{stats.pac ?? 85}</span>
              <span className="text-white/70 text-[10px]">سرعة PAC</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
              <span className="font-pixel text-[10px] text-[#25F143]">{stats.dri ?? 86}</span>
              <span className="text-white/70 text-[10px]">مراوغة DRI</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
              <span className="font-pixel text-[10px] text-[#FF6600]">{stats.sho ?? 88}</span>
              <span className="text-white/70 text-[10px]">تسديد SHO</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
              <span className="font-pixel text-[10px] text-[#00E5FF]">{stats.def ?? 65}</span>
              <span className="text-white/70 text-[10px]">دفاع DEF</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-pixel text-[10px] text-[#FFE500]">{stats.pas ?? 80}</span>
              <span className="text-white/70 text-[10px]">تمرير PAS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-pixel text-[10px] text-[#FF007F]">{stats.phy ?? 82}</span>
              <span className="text-white/70 text-[10px]">بدني PHY</span>
            </div>
          </div>

          {/* Bottom Pitch Stats: Goals & Matches */}
          {(goals !== undefined || matches !== undefined) && (
            <div className="flex justify-around items-center pt-2 text-center text-xs">
              {goals !== undefined && (
                <div>
                  <span className="font-pixel text-sm text-[#FF007F] font-bold">
                    {goals} ⚽
                  </span>
                  <span className="block text-[9px] text-white/60">أهداف</span>
                </div>
              )}
              {matches !== undefined && (
                <div>
                  <span className="font-pixel text-sm text-[#25F143] font-bold">
                    {matches} 🏃
                  </span>
                  <span className="block text-[9px] text-white/60">مباريات</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
