import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelIcon, PixelIconName } from '../ui/PixelIcon';

interface BottomNavItem {
  to: string;
  label: string;
  icon: PixelIconName;
}

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const items: BottomNavItem[] = [
    { to: '/', label: 'الرئيسية', icon: 'star' },
    { to: '/book', label: 'احجز', icon: 'calendar' },
    { to: '/teams', label: 'الفرق', icon: 'users' },
    { to: '/matches', label: 'النتايج', icon: 'ball' },
    { to: '/me', label: 'أنا', icon: 'user' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#090A0F]/95 border-t-[3px] border-line backdrop-blur-md pb-safe">
      <nav className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex flex-col items-center justify-center gap-1 select-none
                transition-none
                ${
                  isActive
                    ? 'text-[#25F143] bg-[#25F143]/15 font-bold border-t-2 border-[#25F143]'
                    : 'text-paper-cream/60 hover:text-paper-cream'
                }
              `}
            >
              <PixelIcon
                name={item.icon}
                size={18}
                color={isActive ? '#25F143' : 'currentColor'}
              />
              <span className="text-[11px] font-display leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
