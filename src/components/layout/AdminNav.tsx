import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const AdminNav: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'الرئيسية' },
    { to: '/admin/bookings', label: 'الحجوزات' },
    { to: '/admin/players', label: 'اللاعبين' },
    { to: '/admin/teams', label: 'الفرق' },
    { to: '/admin/tournaments', label: 'البطولات' },
    { to: '/admin/matches', label: 'المباريات والنتائج' },
    { to: '/admin/content', label: 'المحتوى والكوميكس' },
    { to: '/admin/settings', label: 'الإعدادات' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 border-b-2 border-line mb-6 scrollbar-none">
      {links.map((link) => {
        const isActive = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`
              px-3 py-1.5 font-display text-sm whitespace-nowrap border-[2px] transition-none
              ${
                isActive
                  ? 'bg-sun-yellow text-ink border-ink font-bold shadow-[var(--shadow-x-sm)_2px_0_var(--ink)]'
                  : 'bg-pitch-night/60 text-paper-cream/80 border-line hover:border-paper-cream'
              }
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
