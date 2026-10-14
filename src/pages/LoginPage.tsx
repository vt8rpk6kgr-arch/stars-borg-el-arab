import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Mascot } from '@/components/ui/Mascot';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تسجيل الدخول في المرحلة 2 مع ربط قاعدة بيانات Supabase.');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <Mascot size={64} mood="happy" />
        <h1 className="font-display text-3xl text-sun-yellow mt-2">تسجيل الدخول</h1>
        <p className="font-body text-xs text-paper-cream/80">
          ادخل حسابك عشان تحجز، تنضم لفرق، وتجمع استيكرز
        </p>
      </div>

      <PixelCard variant="arcade" className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="player@example.com"
              className="w-full bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream focus:border-sun-yellow outline-none text-sm font-body"
            />
          </div>

          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream focus:border-sun-yellow outline-none text-sm font-body"
            />
          </div>

          <PixelButton variant="yellow" size="md" fullWidth type="submit">
            تسجيل الدخول ⚽
          </PixelButton>
        </form>

        <div className="mt-4 pt-4 border-t border-line text-center text-xs text-paper-cream/70">
          لسه معندكش حساب؟{' '}
          <Link to="/signup" className="text-sun-yellow font-bold hover:underline">
            أنشئ حساب لاعب جديد الآن
          </Link>
        </div>
      </PixelCard>
    </div>
  );
};
