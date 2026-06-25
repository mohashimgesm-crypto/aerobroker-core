import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {buildMetadata} from '@/lib/seo/metadata';
import {organizationSchema, websiteSchema} from '@/lib/seo/schema';
import {JsonLd} from '@/components/seo/JsonLd';
import '../globals.css';

// توليد صفحات ثابتة لكل لغة مدعومة
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// الـ metadata الافتراضية للموقع (canonical + hreflang + OG + Twitter)
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Common'});
  return buildMetadata({
    locale,
    path: '',
    title: t('tagline')
  });
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
        {/* بيانات Schema.org على مستوى الموقع كله */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
