import React from 'react';
import { PixelBadge } from './PixelBadge';
import { PixelIcon } from './PixelIcon';

export interface ScorerItem {
  id: string;
  name: string;
  minute?: number | null;
  isOwnGoal?: boolean;
}

interface ScoreboardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  homeScorers?: ScorerItem[];
  awayScorers?: ScorerItem[];
  status?: 'scheduled' | 'live' | 'final' | 'pending_review';
  roundLabel?: string;
  dateLabel?: string;
  className?: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  homeTeam,
  awayTeam,
  homeScore = 0,
  awayScore = 0,
  homeScorers = [],
  awayScorers = [],
  status = 'final',
  roundLabel,
  dateLabel,
  className = '',
}) => {
  return (
    <div
      className={`
        relative bg-[#0B0C12] border-[4px] border-line
        shadow-[var(--shadow-x)_6px_0_#0E4218]
        p-4 md:p-6 overflow-hidden text-center
        ${className}
      `}
    >
      {/* 80s/90s Neon Flag ribbon along the scoreboard */}
      <div className="italia-ribbon-stripe absolute top-0 inset-x-0" />

      {/* Background CRT scanlines */}
      <div className="scanlines absolute inset-0 opacity-30 pointer-events-none" />

      {/* Top Header: Round & Status */}
      <div className="relative z-10 flex items-center justify-between border-b-[2px] border-line pb-2 mb-4 text-xs font-semibold">
        <span className="text-[#FF6600] flex items-center gap-1 font-bold">
          <PixelIcon name="trophy" size={14} color="#FF6600" />
          {roundLabel || 'مباراة ودية — ملعب نجوم البرج'}
        </span>

        <div>
          {status === 'live' && (
            <PixelBadge variant="live" isBlinking>
              LIVE • مباشر
            </PixelBadge>
          )}
          {status === 'final' && (
            <span className="font-pixel text-[11px] text-white bg-[#FF007F] blink-retro tracking-widest px-2 py-0.5 border border-ink font-bold shadow-[2px_2px_0_#000]">
              FULL TIME
            </span>
          )}
          {status === 'scheduled' && (
            <span className="text-paper-cream/80">{dateLabel || 'قريباً'}</span>
          )}
        </div>
      </div>

      {/* Main Board: Teams and Digital Score */}
      <div className="relative z-10 grid grid-cols-5 items-center gap-2 md:gap-4 my-2">
        {/* Home Team */}
        <div className="col-span-2 text-center md:text-start">
          <h3 className="font-display text-lg md:text-2xl text-paper-cream leading-tight truncate">
            {homeTeam}
          </h3>
          <span className="text-xs text-[#25F143] font-bold">أصحاب الأرض</span>
        </div>

        {/* LED Digital Score (Press Start 2P) in Phosphor Lime */}
        <div className="col-span-1 bg-black border-[3px] border-[#25F143] py-2 px-1 shadow-inner flex items-center justify-center gap-1 md:gap-2">
          <span className="font-pixel text-xl md:text-3xl text-[#25F143] drop-shadow-[0_0_12px_rgba(37,241,67,0.9)]">
            {homeScore ?? 0}
          </span>
          <span className="font-pixel text-xs md:text-sm text-[#FF007F]">:</span>
          <span className="font-pixel text-xl md:text-3xl text-[#25F143] drop-shadow-[0_0_12px_rgba(37,241,67,0.9)]">
            {awayScore ?? 0}
          </span>
        </div>

        {/* Away Team */}
        <div className="col-span-2 text-center md:text-end">
          <h3 className="font-display text-lg md:text-2xl text-paper-cream leading-tight truncate">
            {awayTeam}
          </h3>
          <span className="text-xs text-[#FF6600] font-bold">الضيوف</span>
        </div>
      </div>

      {/* Scorers Section */}
      {(homeScorers.length > 0 || awayScorers.length > 0) && (
        <div className="relative z-10 grid grid-cols-2 gap-4 border-t-[2px] border-line pt-3 mt-4 text-xs">
          {/* Home Scorers */}
          <div className="text-start space-y-1">
            {homeScorers.map((s) => (
              <div key={s.id} className="flex items-center gap-1 text-paper-cream/90">
                <span>⚽</span>
                <span className="font-bold">{s.name}</span>
                {s.minute && (
                  <span className="font-pixel text-[9px] text-sun-yellow">
                    '{s.minute}
                  </span>
                )}
                {s.isOwnGoal && <span className="text-card-red text-[10px]">(ع.م)</span>}
              </div>
            ))}
          </div>

          {/* Away Scorers */}
          <div className="text-end space-y-1">
            {awayScorers.map((s) => (
              <div key={s.id} className="flex items-center justify-end gap-1 text-paper-cream/90">
                {s.isOwnGoal && <span className="text-card-red text-[10px]">(ع.م)</span>}
                {s.minute && (
                  <span className="font-pixel text-[9px] text-sun-yellow">
                    '{s.minute}
                  </span>
                )}
                <span className="font-bold">{s.name}</span>
                <span>⚽</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
