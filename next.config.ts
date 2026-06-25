import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

// ربط إعدادات الطلب الخاصة بـ next-intl
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // تثبيت جذر المشروع لتجنّب التقاط ملف قفل في مجلد أعلى
  turbopack: {
    root: path.resolve('.')
  },
  // السماح بصور الإعلانات من Wikimedia Commons فقط (محصور بمسار الملفات للأمان)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
