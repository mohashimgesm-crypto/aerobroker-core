import type {MetadataRoute} from 'next';
import {SEO_CONFIG, LOCALES, DEFAULT_LOCALE} from '@/lib/seo/config';
import {CATEGORIES} from '@/lib/categories';
import {getListingsForSitemap} from '@/lib/listings';

// إعادة توليد خريطة الموقع كل ساعة
export const revalidate = 3600;

const {baseUrl} = SEO_CONFIG;

// بناء كائن hreflang لكل لغة لمسار معيّن
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${baseUrl}/${l}${path}`;
  }
  return languages;
}

// بناء مدخل sitemap واحد (url باللغة الافتراضية + بدائل اللغات)
function entry(
  path: string,
  options: {
    lastModified?: string | Date;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority?: number;
    images?: string[];
  } = {}
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}/${DEFAULT_LOCALE}${path}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {languages: languagesFor(path)},
    ...(options.images && options.images.length > 0 ? {images: options.images} : {})
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // الصفحات الثابتة: الرئيسية + صفحة تصفّح لكل فئة
  const staticEntries: MetadataRoute.Sitemap = [
    entry('', {changeFrequency: 'weekly', priority: 1}),
    ...CATEGORIES.map((category) =>
      entry(`/browse/${category}`, {changeFrequency: 'daily', priority: 0.8})
    )
  ];

  // الإعلانات النشطة من قاعدة البيانات (تُرجع [] إن لم تُضبط المفاتيح)
  const listings = await getListingsForSitemap();
  const listingEntries: MetadataRoute.Sitemap = listings.map((listing) =>
    entry(`/listing/${listing.slug}`, {
      lastModified: listing.updated_at,
      changeFrequency: 'weekly',
      priority: 0.7,
      images: listing.images
    })
  );

  return [...staticEntries, ...listingEntries];
}
