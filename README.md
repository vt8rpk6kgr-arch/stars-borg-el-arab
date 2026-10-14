# ⭐️ نجوم برج العرب — Borg El Arab Stars ⚽

منصة تفاعلية متكاملة لملعب كرة القدم الخماسي ببرج العرب، تجمع بين أجواء ألعاب الأركيد الكلاسيكية وكروت فيفا التسعينات (FIFA '98 Retro Style).

![Borg El Arab Stars](https://img.shields.io/badge/FIFA-90s_Retro_Cards-FFD700?style=for-the-badge&logo=retro-arch)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

---

## 🌟 المميزات الرئيسية

### 1. كروت فيفا التسعينات (90s FIFA Retro Cards) 🎴
- تصميم درع مذهب مقصوص (**Die-Cut Shield**) مستوحى من كروت Panini و FIFA 98.
- تقييم رقمي مائل ضخم (**OVR Rating**) وعلم مصر الذهبي وخانة المركز (**ATT / MID / DEF / GK**).
- شبكة إحصائيات سداسية (**PAC, SHO, PAS, DRI, DEF, PHY**) بألوان النيون الفسفوري والأورانج والبينك.
- **رفع صورة اللاعب**: إمكانية رفع صورة كل لاعب فورياً لتظهر داخل برواز كارت الفيفا التسعيناتي.

### 2. غرفة إدارة المباراة الحية للأدمن (`/admin/matches`) ⏱️
- **مؤقت إلكتروني تفاعلي**: تحكم في دقائق المباراة، إيقاف/استئناف الوقت، وقت بدل ضائع، واستراحة الشوطين.
- **تسجيل الأهداف وخيار الجيست (Guest)**:
  - تسجيل أهداف للاعبين المسجلين في قوائم الفرق.
  - خيار حصري لتسجيل هدف من **لاعب ضيف / Guest (غير مسجل)** مع إدخال اسمه واحتساب الهدف في النتيجة فورياً وتسميعه في الإحصائيات.

### 3. كوميكس واستيكرز الكورة المصرية (`/fun`) 📰🏷️
- حكايات وقفشات ملاعب الحارة والشوارع المصرية ("صاحب الكورة والملعب"، "الكورة فوق السطح وحارس العمارة"، "عزومة الكشري بعد الماتش").
- ألبوم استيكرز الحريفة ("الحريف"، "سد عالي"، "مسمار النص"، "أبو تريكة الجيل").

### 4. هيدر متجاوب بالكامل للموبايل والديسكتوب 📱💻
- **على الديسكتوب**: شريط علوي كامل وسلس يحتوي على جميع الأقسام.
- **على الموبايل**: شريط سريع لأهم الأقسام + زر **`MORE ☰`** يفتح قائمة منسدلة أنيقة تحتوي على كافة أقسام الملعب الـ 9.

### 5. نظام الحجز والفرق والبطولات 🏆
- حجز المواعيد بالساعة ومنع الحجز المزدوج على مستوى قاعدة البيانات (**Atomic Booking**).
- إدارة الفرق والتحديات المفتوحة وبطولات الدوري وخروج المغلوب.
- لوحة شرف تفاعلية للهدافين وصناع اللعب ونجوم الـ MVP.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom Neon Retro Tokens & CRT Scanlines
- **State & Data**: TanStack Query (React Query) + Supabase Client
- **Audio**: Web Audio API (8-bit Synthesized Retro Sounds)
- **Backend / Database**: Supabase (Postgres, RLS, Views, Functions, Storage)
- **Deployment**: Vercel (SPA Rewrites via `vercel.json`)

---

## 🚀 التشغيل المحلي (Local Development)

```bash
# تثبيت الاعتماديات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء النسخة الإنتاجية
npm run build

# معاينة النسخة الإنتاجية
npm run preview
```

---

## 🗄️ إعداد قاعدة بيانات Supabase

1. أنشئ مشروعاً جديداً في [Supabase](https://supabase.com).
2. في **SQL Editor**، نفّذ ملف المخطط الكامل:
   `supabase/migrations/20241014_init_schema.sql`
3. نفّذ ملف البيانات التجريبية:
   `supabase/seed.sql`
4. أضف متغيرات البيئة في ملف `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 📄 الترخيص
هذا المشروع مخصص لملعب نجوم برج العرب.
