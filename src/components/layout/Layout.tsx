import React from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-pitch-night text-paper-cream relative">
      <Navbar />
      
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};
