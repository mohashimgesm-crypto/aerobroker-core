// ════════════════════════════════════════════════════════════════
// مساعد بناء الـ Metadata: canonical + hreflang (ar/en) + OG + Twitter
// ════════════════════════════════════════════════════════════════
import type {Metadata} from 'next';
import {SEO_CONFIG, LOCALES, DEFAULT_LOCALE, OG_LOCALE, type SeoLocale} from './config';

interface BuildMetadataParams {
  locale: SeoLocale | string;
  // المسار بعد بادئة اللغة، مثل '' للرئيسية أو '/browse/ultralight'
  path?: string;
  // عنوان خاص بالصفحة (يُضاف إليه اسم الموقع تلقائياً)
  title?: string;
  description?: string;
  // صور OpenGraph (روابط مطلقة)
  images?: string[];
  noIndex?: boolean;
}

// تطبيع اللغة إلى لغة مدعومة
function normalizeLocale(locale: SeoLocale | string): SeoLocale {
  return (LOCALES as readonly string[]).includes(locale) ? (locale as SeoLocale) : DEFAULT_LOCALE;
}

export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  images,
  noIndex = false
}: BuildMetadataParams): Metadata {
  const loc = normalizeLocale(locale);
  const {baseUrl, siteName} = SEO_CONFIG;

  const desc = description ?? SEO_CONFIG.defaultDescription[loc];
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonical = `${baseUrl}/${loc}${path}`;

  // hreflang لكل لغة + x-default (يشير للّغة الافتراضية)
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${baseUrl}/${l}${path}`;
  }
  languages['x-default'] = `${baseUrl}/${DEFAULT_LOCALE}${path}`;

  const ogImages = images && images.length > 0 ? images : undefined;

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description: desc,
    keywords: SEO_CONFIG.keywords[loc],
    alternates: {
      canonical,
      languages
    },
    ...(SEO_CONFIG.googleVerification
      ? {verification: {google: SEO_CONFIG.googleVerification}}
      : {}),
    ...(noIndex ? {robots: {index: false, follow: false}} : {}),
    openGraph: {
      type: 'website',
      url: canonical,
      siteName,
      title: fullTitle,
      description: desc,
      locale: OG_LOCALE[loc],
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => OG_LOCALE[l]),
      ...(ogImages ? {images: ogImages} : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      ...(ogImages ? {images: ogImages} : {})
    }
  };
}
