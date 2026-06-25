// ════════════════════════════════════════════════════════════════
// إعدادات SEO المركزية لـ AeroBroker
// مُكيّفة مع البنية الفعلية: لغتان فقط (ar/en)، جدول listings فقط.
// ════════════════════════════════════════════════════════════════

// اللغات المدعومة (مطابقة لـ src/i18n/routing.ts)
export const LOCALES = ['ar', 'en'] as const;
export type SeoLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: SeoLocale = 'ar';

// عنوان الموقع الأساسي — يُقرأ من المتغيّر البيئي مع قيمة احتياطية
const RAW_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerobroker.vercel.app';
// إزالة أي شرطة مائلة زائدة في النهاية
const baseUrl = RAW_BASE_URL.replace(/\/+$/, '');

export const SEO_CONFIG = {
  baseUrl,
  siteName: 'AeroBroker',

  // الأوصاف الافتراضية لكل لغة
  defaultDescription: {
    ar: 'AeroBroker — سوق وساطة موثوق لشراء وبيع الطائرات الخفيفة والمروحيات ومعدّات الطيران من بائعين موثوقين، مع حماية بياناتك وتواصل آمن عبر الوسيط.',
    en: 'AeroBroker — a trusted brokerage marketplace to buy and sell light aircraft, helicopters, and aviation machinery from verified sellers, with protected data and secure broker-handled communication.'
  } as Record<SeoLocale, string>,

  // الكلمات المفتاحية لكل لغة
  keywords: {
    ar: [
      'طائرات خفيفة',
      'طائرات فوق خفيفة',
      'مروحيات للبيع',
      'معدّات طيران',
      'وساطة طائرات',
      'شراء طائرة',
      'بيع طائرة'
    ],
    en: [
      'light aircraft',
      'ultralight aircraft',
      'helicopters for sale',
      'aviation machinery',
      'aircraft brokerage',
      'buy aircraft',
      'sell aircraft'
    ]
  } as Record<SeoLocale, string[]>,

  // روابط التواصل الاجتماعي (تُملأ لاحقاً — تُستخدم في sameAs)
  social: {
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  } as Record<string, string>,

  // رمز تحقّق Google Search Console (يُملأ لاحقاً)
  googleVerification: ''
} as const;

// خريطة لغة OpenGraph (language_TERRITORY)
export const OG_LOCALE: Record<SeoLocale, string> = {
  ar: 'ar_AR',
  en: 'en_US'
};

// قائمة روابط التواصل غير الفارغة (لاستخدامها في Schema.sameAs)
export function socialLinks(): string[] {
  return Object.values(SEO_CONFIG.social).filter((v) => v.length > 0);
}
