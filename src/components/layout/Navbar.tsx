import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelIcon } from '../ui/PixelIcon';
import { retroSound } from '@/lib/sound';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [soundOn, setSoundOn] = useState(retroSound.isEnabled());

  useEffect(() => {
    setSoundOn(retroSound.isEnabled());
  }, []);

  const toggleSound = () => {
    const nextState = retroSound.toggle();
    setSoundOn(nextState);
  };

  const navLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/book', label: 'احجز' },
    { to: '/teams', label: 'الفرق' },
    { to: '/matches', label: 'النتايج' },
    { to: '/tournaments', label: 'البطولات' },
    { to: '/stats', label: 'لوحة الشرف' },
    { to: '/fun', label: 'الكوميكس والاستيكرز' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090A0F]/95 border-b-[3px] border-line backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      {/* 80s/90s Neon Ribbon (فسفوري، أورانج، بينك، أصفر، سماوي) */}
      <div className="italia-ribbon-stripe" />

      <div className="max-w-[1100px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo with Neon Arcade Vibe */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#25F143] border-[2px] border-ink flex items-center justify-center shadow-[var(--shadow-x-sm)_2px_0_#0E4218] group-hover:translate-x-[var(--shadow-x-sm)] group-hover:translate-y-[2px] transition-transform">
            <PixelIcon name="star" size={24} color="#090A0F" />
          </div>
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl text-paper-cream leading-none tracking-wide">
                نجوم برج العرب
              </span>
              <span className="font-pixel text-[9px] bg-[#FF007F] text-white px-1.5 py-0.5 border border-ink font-bold shadow-[1px_1px_0_var(--ink)]">
                '90
              </span>
            </div>
            <span className="font-pixel text-[8px] text-[#FF6600] tracking-widest mt-0.5 font-bold">
              NEON 5-A-SIDE STADIUM
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-display text-base">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-3 py-1.5 border-[2px] transition-none
                  ${
                    isActive
                      ? 'bg-[#25F143] text-[#090A0F] border-ink shadow-[var(--shadow-x-sm)_2px_0_#0E4218] font-bold'
                      : 'border-transparent text-paper-cream/80 hover:text-[#25F143] hover:bg-white/5'
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Sound Toggle & Auth */}
        <div className="flex items-center gap-2">
          {/* 8-bit Sound Mute / Unmute */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'كتم الصوت' : 'تشغيل الصوت'}
            title={soundOn ? 'صوت 8-bit شغال' : 'صوت 8-bit مكتوم'}
            className="w-10 h-10 border-[2px] border-line bg-[#11131C] flex items-center justify-center shadow-[var(--shadow-x-sm)_2px_0_var(--ink)] hover:border-[#25F143]"
          >
            <PixelIcon
              name={soundOn ? 'volume-on' : 'volume-off'}
              size={18}
              color={soundOn ? '#25F143' : '#FF007F'}
            />
          </button>

          {/* User profile button in Neon Orange */}
          <Link
            to="/me"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF6600] text-white border-[2px] border-ink font-display text-sm shadow-[var(--shadow-x-sm)_2px_0_var(--ink)] hover:bg-[#FF7A1A] active:translate-x-[var(--shadow-x-sm)] active:translate-y-[2px]"
          >
            <PixelIcon name="user" size={14} color="#FFFFFF" />
            <span>حسابي</span>
          </Link>

          {/* Admin shortcut */}
          <Link
            to="/admin"
            className="text-[10px] font-pixel text-paper-cream/40 hover:text-[#FF007F] px-1 py-1"
            title="لوحة الإدارة"
          >
            [ADMIN]
          </Link>
        </div>
      </div>
    </header>
  );
};
