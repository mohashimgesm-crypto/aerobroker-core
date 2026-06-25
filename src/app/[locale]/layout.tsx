import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import '../globals.css';

// توليد صفحات ثابتة لكل لغة مدعومة
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Common'});
  return {
    title: `${t('appName')} — ${t('tagline')}`,
    description: t('tagline')
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // في Next.js 16 صار params وعداً (Promise) ويجب انتظاره
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // تمكين العرض الثابت (static rendering) مع next-intl
  setRequestLocale(locale);

  // اتجاه الصفحة: العربية من اليمين لليسار، الإنجليزية من اليسار لليمين
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} className="antialiased">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
