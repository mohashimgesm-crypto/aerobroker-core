// ════════════════════════════════════════════════════════════════
// مولّدات بيانات Schema.org (JSON-LD)
// مبنية على الحقول الفعلية لجدول listings فقط.
// ════════════════════════════════════════════════════════════════
import {SEO_CONFIG, DEFAULT_LOCALE, socialLinks, type SeoLocale} from './config';
import type {ListingRow} from '@/lib/supabase/types';

type JsonLdObject = Record<string, unknown>;

const {baseUrl, siteName} = SEO_CONFIG;

// بناء رابط مطلق ضمن لغة معيّنة
function localizedUrl(locale: SeoLocale | string, path = ''): string {
  return `${baseUrl}/${locale}${path}`;
}

// مخطّط المنظّمة (AeroBroker)
export function organizationSchema(): JsonLdObject {
  const sameAs = socialLinks();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description: SEO_CONFIG.defaultDescription[DEFAULT_LOCALE],
    ...(sameAs.length > 0 ? {sameAs} : {})
  };
}

// مخطّط الموقع مع إجراء بحث (SearchAction)
export function websiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    inLanguage: ['ar', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      // البحث في هذا المشروع يتمّ ضمن صفحات التصفّح عبر المعامل q
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${localizedUrl(DEFAULT_LOCALE, '/browse/ultralight')}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// مخطّط الإعلان (Product + Offer) — يستخدم حقول جدول listings الفعلية
export function listingSchema(listing: ListingRow, locale: SeoLocale | string): JsonLdObject {
  const name = `${listing.make} ${listing.model}`;
  const description =
    (locale === 'ar' ? listing.description_ar : listing.description_en) ??
    SEO_CONFIG.defaultDescription[(locale as SeoLocale) in SEO_CONFIG.defaultDescription ? (locale as SeoLocale) : DEFAULT_LOCALE];

  const url = localizedUrl(locale, `/listing/${listing.slug}`);

  const schema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    sku: listing.slug,
    category: listing.category,
    brand: {
      '@type': 'Brand',
      name: listing.make
    },
    // الصور مطلقة بالفعل (روابط Wikimedia)
    ...(listing.images.length > 0 ? {image: listing.images} : {}),
    // سنة الصنع إن توفّرت
    ...(listing.year != null ? {productionDate: String(listing.year)} : {}),
    // الحالة (طائرات مستعملة) — تُعرض كقيمة إضافية أيضاً
    ...(listing.condition
      ? {
          itemCondition: 'https://schema.org/UsedCondition',
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'condition',
              value: listing.condition
            }
          ]
        }
      : {})
  };

  // عرض السعر فقط إذا كان السعر ظاهراً ومتوفّراً
  if (listing.price_visible && listing.price_usd != null) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: listing.price_usd,
      availability: 'https://schema.org/InStock',
      url
    };
  }

  return schema;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// مخطّط مسار التنقّل (Breadcrumbs)
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
