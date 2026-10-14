import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelIcon, PixelIconName } from '../ui/PixelIcon';
import { retroSound } from '@/lib/sound';

interface NavItem {
  to: string;
  label: string;
  desc?: string;
  icon: PixelIconName;
  badge?: string;
  highlightColor?: string;
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [soundOn, setSoundOn] = useState(retroSound.isEnabled());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(retroSound.isEnabled());
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSound = () => {
    const nextState = retroSound.toggle();
    setSoundOn(nextState);
  };

  const allNavSections: NavItem[] = [
    { to: '/', label: 'الرئيسية', desc: 'ماتش الليلة وأحدث الأخبار', icon: 'star', highlightColor: '#25F143' },
    { to: '/book', label: 'احجز', desc: 'جدول المواعيد والحجز الفوري', icon: 'calendar', badge: 'خصم', highlightColor: '#FFE500' },
    { to: '/teams', label: 'الفرق', desc: 'فرق ناقصها لاعيبة وتحديات', icon: 'users', badge: 'تحدي', highlightColor: '#4CC9F0' },
    { to: '/matches', label: 'النتايج', desc: 'نتائج ومواعيد الجولات', icon: 'ball', badge: 'LIVE', highlightColor: '#FF4D4D' },
    { to: '/tournaments', label: 'البطولات', desc: 'دوري الصيف وجدول الترتيب', icon: 'trophy', badge: 'كأس', highlightColor: '#FFE500' },
    { to: '/stats', label: 'لوحة الشرف', desc: 'أساطير الهدافين وكروت فيفا 90s', icon: 'fire', badge: 'FIFA 90s', highlightColor: '#FF6600' },
    { to: '/fun', label: 'الكوميكس والاستيكرز', desc: 'قفشات الحارة وألبوم الحريفة', icon: 'crown', badge: 'جديد', highlightColor: '#FF007F' },
    { to: '/me', label: 'حسابي', desc: 'بياناتي وكارت اللاعب المخصص', icon: 'user', highlightColor: '#25F143' },
    { to: '/admin', label: 'لوحة الإدارة', desc: 'إدارة الوقت والأهداف الحية', icon: 'shield', badge: 'ADMIN', highlightColor: '#FF007F' },
  ];

  // Quick links visible in mobile header sub-bar
  const mobileQuickLinks = allNavSections.slice(0, 4);

  return (
    <header className="sticky top-0 z-40 bg-[#090A0F]/95 border-b-[3px] border-line backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      {/* 80s/90s Neon Ribbon (فسفوري، أورانج، بينك، أصفر، سماوي) */}
      <div className="italia-ribbon-stripe" />

      {/* Main Bar */}
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

        {/* Desktop Navigation Links — Left Exactly As Is */}
        <nav className="hidden lg:flex items-center gap-1 font-display text-base">
          {allNavSections.slice(0, 7).map((link) => {
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

        {/* Action Controls: Sound Toggle, Profile, Admin & Mobile MORE trigger */}
        <div className="flex items-center gap-2">
          {/* 8-bit Sound Mute / Unmute */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'كتم الصوت' : 'تشغيل الصوت'}
            title={soundOn ? 'صوت 8-bit شغال' : 'صوت 8-bit مكتوم'}
            className="w-9 h-9 sm:w-10 sm:h-10 border-[2px] border-line bg-[#11131C] flex items-center justify-center shadow-[var(--shadow-x-sm)_2px_0_var(--ink)] hover:border-[#25F143]"
          >
            <PixelIcon
              name={soundOn ? 'volume-on' : 'volume-off'}
              size={18}
              color={soundOn ? '#25F143' : '#FF007F'}
            />
          </button>

          {/* Desktop User profile button in Neon Orange */}
          <Link
            to="/me"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF6600] text-white border-[2px] border-ink font-display text-sm shadow-[var(--shadow-x-sm)_2px_0_var(--ink)] hover:bg-[#FF7A1A] active:translate-x-[var(--shadow-x-sm)] active:translate-y-[2px]"
          >
            <PixelIcon name="user" size={14} color="#FFFFFF" />
            <span>حسابي</span>
          </Link>

          {/* Desktop Admin shortcut */}
          <Link
            to="/admin"
            className="hidden sm:inline-block text-[10px] font-pixel text-paper-cream/40 hover:text-[#FF007F] px-1 py-1"
            title="لوحة الإدارة"
          >
            [ADMIN]
          </Link>

          {/* Mobile MORE Button Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="عرض جميع أقسام الملعب"
            className={`
              lg:hidden flex items-center gap-1 px-2.5 py-1.5 border-[2px] font-pixel text-[11px] font-bold select-none
              ${
                isMobileMenuOpen
                  ? 'bg-[#FF007F] text-white border-white shadow-[var(--shadow-x-sm)_2px_0_#000]'
                  : 'bg-[#FFE500] text-black border-ink shadow-[var(--shadow-x-sm)_2px_0_#000] hover:bg-yellow-300'
              }
              active:translate-x-[var(--shadow-x-sm)] active:translate-y-[2px]
            `}
          >
            <span>{isMobileMenuOpen ? '✕ إغلاق' : 'MORE ☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Header: Quick section links + MORE button */}
      <div className="lg:hidden border-t border-white/10 bg-[#0B0C14] px-3 py-1.5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          {mobileQuickLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-2.5 py-1 text-xs font-display border whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-[#25F143] text-black border-[#25F143] font-bold shadow-sm'
                      : 'bg-black/40 text-paper-cream/80 border-white/10 hover:border-white/40'
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Highlighted MORE button on the sub-strip */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-1 px-2 py-1 bg-[#FF6600] text-white font-display text-xs font-bold border border-ink shadow-sm whitespace-nowrap hover:bg-[#FF7A1A]"
        >
          <span>باقي الأقسام</span>
          <span className="font-pixel text-[9px]">{isMobileMenuOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Mobile Expanded MORE Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-[102px] bg-black/80 backdrop-blur-sm z-40 animate-fade-in"
          />

          {/* Expanded Drawer Container */}
          <div className="fixed inset-x-0 top-[102px] z-50 bg-[#0A0C14] border-b-[4px] border-[#25F143] shadow-[0_15px_35px_rgba(0,0,0,0.95)] max-h-[calc(100vh-110px)] overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#25F143] animate-pulse rounded-full" />
                <span className="font-display text-lg text-[#FFE500]">
                  جميع أقسام نجوم برج العرب 🎮
                </span>
              </div>
              <span className="font-pixel text-[9px] text-white/50">90s RETRO</span>
            </div>

            {/* All Sections Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allNavSections.map((sec) => {
                const isActive = location.pathname === sec.to;
                return (
                  <Link
                    key={sec.to}
                    to={sec.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      p-3 border-[2px] flex items-center justify-between transition-transform
                      ${
                        isActive
                          ? 'bg-[#25F143]/15 border-[#25F143] text-white shadow-[var(--shadow-x-sm)_2px_0_#0E4218]'
                          : 'bg-black/60 border-white/15 text-paper-cream hover:border-[#25F143]'
                      }
                      active:scale-[0.98]
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 border border-white/20 bg-[#12141F] flex items-center justify-center flex-shrink-0"
                        style={{ color: sec.highlightColor || '#25F143' }}
                      >
                        <PixelIcon name={sec.icon} size={20} color={sec.highlightColor || '#25F143'} />
                      </div>
                      <div className="text-start">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-bold text-white">
                            {sec.label}
                          </span>
                          {sec.badge && (
                            <span className="font-pixel text-[8px] bg-[#FF007F] text-white px-1 py-0.2">
                              {sec.badge}
                            </span>
                          )}
                        </div>
                        {sec.desc && (
                          <span className="block text-[11px] text-white/60 font-body">
                            {sec.desc}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="font-pixel text-xs text-white/40">←</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Admin & Profile Footer inside drawer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <Link
                to="/me"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#FF6600] font-display hover:underline flex items-center gap-1"
              >
                <span>👤 ملف اللاعب الشخصي</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#FF007F] font-pixel text-[10px] hover:underline"
              >
                [غرفة تحكم الإدارة]
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
