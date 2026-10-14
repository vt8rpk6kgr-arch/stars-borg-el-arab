# دليل الرفع والربط — نجوم برج العرب (GitHub, Vercel & Supabase)

تهانينا! تم بناء منصة "نجوم برج العرب" بالكامل مع:
1. **كروت فيفا التسعينات (FIFA '98 Retro Cards)** مع درع مذهب، تقييم رقمي، إحصائيات PAC/SHO/PAS/DRI/DEF/PHY، وإمكانية رفع صورة كل لاعب فورياً لتظهر داخل الكارت.
2. **غرفة تحكم الأدمن في المباريات الحية (`/admin/matches`)**: إدارة مؤقت المباراة، إيقاف واستئناف الوقت، تسجيل الأهداف الحية للاعب مسجل أو **لاعب ضيف (Guest)** مع احتسابها في النتيجة والإحصائيات مباشرة.
3. **كوميكس واستيكرز الكورة المصرية (`/fun`)**: قفشات ملاعب الحارة والشوارع المصرية وألبوم الاستيكرز التفاعلي.

---

## 1. الرفع على GitHub 🐙

المستودع المحلي تم تجهيزه وتثبيت أول Commit بنجاح. لرفعه على حسابك في GitHub:

1. قم بإنشاء مستودع جديد (New Repository) فارغ على حسابك في GitHub باسم: `stars-borg-el-arab`.
2. شغّل الأوامر التالية في Terminal:

```bash
# اربط المستودع برابط GitHub الخاص بك (استبدل USERNAME باسم حسابك):
git remote add origin https://github.com/USERNAME/stars-borg-el-arab.git

# تأكد من الفرع الرئيسي main
git branch -M main

# ارفع الكود
git push -u origin main
```

---

## 2. إعداد وقاعدة بيانات Supabase ⚡

1. سجّل دخولك إلى [Supabase](https://supabase.com) وأنشئ مشروعاً جديداً باسم `stars-borg-el-arab`.
2. اختر كلمة سر قوية لقاعدة البيانات واختر أقرب منطقة (مثلاً `eu-central-1` فرانكفورت).
3. بعد اكتمال إنشاء المشروع:
   - افتح قائمة **SQL Editor** من القائمة الجانبية.
   - اضغط **New Query** وانسخ محتوى ملف الميجريشن:
     `supabase/migrations/20241014_init_schema.sql`
   - اضغط **Run** لتنفيذ وإنشاء كل الجداول (الجداول، الصلاحيات RLS، الدوال الآمنة، ودعم أهداف الضيوف Guest).
   - اضغط **New Query** مرة أخرى وانسخ محتوى ملف البيانات التجريبية:
     `supabase/seed.sql`
   - اضغط **Run** لإضافة الفرق واللاعبين والمباريات التجريبية.
4. للحصول على مفاتيح الربط:
   - اذهب إلى **Project Settings** ← **API**.
   - انسخ **Project URL** وضعها كـ `VITE_SUPABASE_URL`.
   - انسخ **anon public key** وضعها كـ `VITE_SUPABASE_ANON_KEY`.
5. لترقية حسابك كـ Admin:
   - بعد التسجيل لأول مرة في الموقع، شغّل في SQL Editor:
     ```sql
     update public.profiles set role = 'admin' where phone = '01012345678';
     ```

---

## 3. الرفع والتشغيل على Vercel 🚀

### الطريقة الأولى: من لوحة تحكم Vercel (موصى بها)
1. افتح [Vercel](https://vercel.com) واضغط **Add New...** ← **Project**.
2. اختر مستودع `stars-borg-el-arab` من حساب GitHub الخاص بك واضغط **Import**.
3. في إعدادات **Environment Variables**، أضف المتغيرين التاليين:
   - `VITE_SUPABASE_URL`: رابط مشروعك في Supabase.
   - `VITE_SUPABASE_ANON_KEY`: المفتاح العام (anon key) من Supabase.
4. إعدادات البناء الافتراضية محددة تلقائياً:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. اضغط **Deploy** وخلال أقل من دقيقة سيكون موقعك لايف!

### الطريقة الثانية: عبر Vercel CLI في سطر الأوامر
```bash
npx vercel
```
ثم اتبع التعليمات على الشاشة وأضف المتغيرات عبر لوحة تحكم المشروع.
