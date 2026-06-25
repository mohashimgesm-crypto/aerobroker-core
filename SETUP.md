# إعداد AeroBroker — ربط Supabase

تم بناء نواة المشروع بالكامل. لتشغيل البيانات (الإعلانات + طلبات عروض الأسعار)
اتبع الخطوات التالية بعد إنشاء مشروع Supabase.

## 1) المفاتيح (Environment variables)

انسخ ملف المثال ثم املأ القيم من لوحة Supabase (`Project Settings → API`):

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

## 2) تطبيق قاعدة البيانات (Migrations + Seed)

ملفات SQL جاهزة في مجلد `supabase/`:

- `supabase/migrations/20260624000001_listings.sql` — جدول الإعلانات + RLS (قراءة عامة للنشِط فقط)
- `supabase/migrations/20260624000002_rfq_requests.sql` — جدول طلبات عروض الأسعار + RLS (إدخال عام، لا قراءة عامة)
- `supabase/seed.sql` — 8 إعلانات تجريبية واقعية

**الطريقة الأسهل (محرّر SQL في لوحة Supabase):**
افتح `SQL Editor` وشغّل محتوى الملفات الثلاثة بالترتيب أعلاه (migrations أولاً ثم seed).

**أو عبر Supabase CLI:**

```bash
supabase link --project-ref YOUR-REF
supabase db push          # يطبّق ملفات migrations
# ثم نفّذ seed.sql عبر psql أو محرّر SQL
```

## 3) التشغيل

```bash
npm run dev
```

ثم افتح:

- `http://localhost:3000/ar/browse/ultralight` — تصفّح بالعربية (RTL)
- `http://localhost:3000/en/browse/helicopter` — تصفّح بالإنجليزية (LTR)

## ملاحظات تقنية

- هذا المشروع على **Next.js 16**: تمّت تسمية الـ middleware باسم **`proxy`** (`src/proxy.ts`)،
  و`params`/`searchParams` صارت `Promise` ويجب انتظارها.
- حاسبة التكاليف تحتسب الضريبة على قاعدة (CIF + الجمارك) وهي القاعدة المعتادة للاستيراد.
- أنواع قاعدة البيانات معرّفة يدوياً في `src/lib/supabase/types.ts` وتطابق ملفات الـ migration.
