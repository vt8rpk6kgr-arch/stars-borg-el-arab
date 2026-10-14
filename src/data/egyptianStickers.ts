export interface EgyptianSticker {
  id: string;
  name: string;
  category: 'street' | 'skill' | 'humor' | 'honor';
  hint: string;
  rarity: 'common' | 'rare' | 'epic';
  icon: string;
  color: string;
}

export const EGYPTIAN_STICKERS: EgyptianSticker[] = [
  {
    id: 'stk-1',
    name: 'الحريف ⭐',
    category: 'skill',
    hint: 'اروغ 3 لاعيبة ورا بعض في ماتش واحد',
    rarity: 'epic',
    icon: '⚽',
    color: '#FFE500',
  },
  {
    id: 'stk-2',
    name: 'صاحب الكورة 👑',
    category: 'street',
    hint: 'أنشئ فريقك الخاص واحجز الساعة باسمك',
    rarity: 'rare',
    icon: '👑',
    color: '#FF007F',
  },
  {
    id: 'stk-3',
    name: 'صاروخ برج العرب 🚀',
    category: 'skill',
    hint: 'سجل هدف من نص ملعبك مباشرة في المرمى',
    rarity: 'epic',
    icon: '🚀',
    color: '#FF6600',
  },
  {
    id: 'stk-4',
    name: 'جون ع الطاير 👟',
    category: 'skill',
    hint: 'سجل هدف على الطاير (Volley) بلمسة واحدة',
    rarity: 'rare',
    icon: '👟',
    color: '#25F143',
  },
  {
    id: 'stk-5',
    name: 'حارس عمارة 🧤',
    category: 'honor',
    hint: 'حافظ على نظافة شباكك ماتشين كاملين',
    rarity: 'epic',
    icon: '🧤',
    color: '#00E5FF',
  },
  {
    id: 'stk-6',
    name: 'كشري النصر 🍲',
    category: 'humor',
    hint: 'اكسب ماتش الديربي بين الفرق المحلية',
    rarity: 'common',
    icon: '🍲',
    color: '#FF6600',
  },
  {
    id: 'stk-7',
    name: 'البديل الذهبي ⚡',
    category: 'honor',
    hint: 'انزل في الشوط التاني وسجل جون الفوز',
    rarity: 'rare',
    icon: '⚡',
    color: '#FFE500',
  },
  {
    id: 'stk-8',
    name: 'مسمار خط النص 🪛',
    category: 'skill',
    hint: 'اقطع 10 كرات صحيحة في ماتش واحد',
    rarity: 'common',
    icon: '🛡️',
    color: '#25F143',
  },
  {
    id: 'stk-9',
    name: 'كعب دائر 🌀',
    category: 'skill',
    hint: 'اصنع هدف بتمريرة بالكعب لزميلك',
    rarity: 'rare',
    icon: '🌀',
    color: '#FF007F',
  },
  {
    id: 'stk-10',
    name: 'هاتريك الحارة 🔥',
    category: 'honor',
    hint: 'سجل 3 أهداف في نفس الماتش',
    rarity: 'epic',
    icon: '🔥',
    color: '#FF6600',
  },
  {
    id: 'stk-11',
    name: 'تسلل عند المحطة 🚩',
    category: 'humor',
    hint: 'العب 5 ماتشات رسمية في الدوري',
    rarity: 'common',
    icon: '🚩',
    color: '#FF007F',
  },
  {
    id: 'stk-12',
    name: 'كابتن الفرقة 🎖️',
    category: 'honor',
    hint: 'قود فريقك للفوز ببطولة رسمية',
    rarity: 'epic',
    icon: '🎖️',
    color: '#FFE500',
  },
];
