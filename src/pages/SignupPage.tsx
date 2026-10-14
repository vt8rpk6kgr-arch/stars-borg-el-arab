import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { Mascot } from '@/components/ui/Mascot';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('ATT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('إنشاء الحساب في المرحلة 2 مع تفعيل Supabase Auth والـ RLS.');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <Mascot size={64} mood="wink" />
        <h1 className="font-display text-3xl text-sun-yellow mt-2">تسجيل لاعب جديد</h1>
        <p className="font-body text-xs text-paper-cream/80">
          انضم لعالم نجوم البرج، احجز، واصنع تاريخك الكروي!
        </p>
      </div>

      <PixelCard variant="arcade" className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              اسم الشهرة / الاسم بالكامل
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="مثال: أحمد زيزو"
              className="w-full bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream focus:border-sun-yellow outline-none text-sm font-body"
            />
          </div>

          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              رقم الموبايل (واتساب)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              pattern="01[0125][0-9]{8}"
              className="w-full bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream focus:border-sun-yellow outline-none text-sm font-body"
            />
            <span className="text-[10px] text-paper-cream/50 mt-1 block">
              رقمك سري وخاص بكابتن الفريق فقط لتنسيق الماتشات.
            </span>
          </div>

          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              المركز المفضل في الملعب
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full bg-[#070D17] border-[2px] border-ink p-2 text-paper-cream focus:border-sun-yellow outline-none text-sm font-body"
            >
              <option value="GK">حارس مرمى (GK)</option>
              <option value="DEF">مدافع (DEF)</option>
              <option value="MID">لاعب وسط (MID)</option>
              <option value="ATT">مهاجم (ATT)</option>
            </select>
          </div>

          <div>
            <label className="block font-display text-sm text-paper-cream mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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

          <PixelButton variant="green" size="md" fullWidth type="submit">
            إنشاء حساب لاعب ⚽
          </PixelButton>
        </form>

        <div className="mt-4 pt-4 border-t border-line text-center text-xs text-paper-cream/70">
          عندك حساب بالفعل؟{' '}
          <Link to="/login" className="text-sun-yellow font-bold hover:underline">
            سجل دخولك هنا
          </Link>
        </div>
      </PixelCard>
    </div>
  );
};
