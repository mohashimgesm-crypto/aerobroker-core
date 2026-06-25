import {defineRouting} from 'next-intl/routing';

// إعداد التوجيه متعدد اللغات: العربية (RTL) افتراضية + الإنجليزية (LTR)
export const routing = defineRouting({
  // اللغات المدعومة في هذه المرحلة فقط
  locales: ['ar', 'en'],
  // اللغة الافتراضية: العربية
  defaultLocale: 'ar',
  // إضافة بادئة اللغة دائماً في المسار (مثل /ar/browse و /en/browse)
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
