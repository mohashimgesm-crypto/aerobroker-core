import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// في Next.js 16 أصبح "middleware" يسمّى "proxy".
// نستخدم وسيط next-intl لاكتشاف اللغة وإعادة التوجيه إلى المسار المناسب.
export default createMiddleware(routing);

export const config = {
  // تطبيق الوسيط على كل المسارات عدا الملفات الداخلية والأصول الثابتة
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
