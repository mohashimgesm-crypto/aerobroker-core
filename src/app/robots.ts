import type {MetadataRoute} from 'next';
import {SEO_CONFIG} from '@/lib/seo/config';

const {baseUrl} = SEO_CONFIG;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // منع زحف مسارات الـ API فقط
      disallow: '/api'
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
