import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

const CATEGORIES = ['ultralight', 'helicopter', 'machinery'] as const;

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

// محتوى الصفحة كمكوّن منفصل ليستخدم useTranslations
function HomeContent() {
  const t = useTranslations('Home');
  const tc = useTranslations('Categories');
  const tn = useTranslations('Common');

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-sky">
        {tn('appName')}
      </span>

      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
        {t('title')}
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
        {t('subtitle')}
      </p>

      <Link
        href="/browse/ultralight"
        className="rounded-full bg-sky px-8 py-3 text-base font-semibold text-bg transition-opacity hover:opacity-90"
      >
        {t('browseCta')}
      </Link>

      {/* روابط سريعة لكل فئة */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/browse/${category}`}
            className="rounded-2xl border border-white/10 bg-surface p-6 text-lg font-medium text-slate-100 transition-colors hover:border-sky/50"
          >
            {tc(category)}
          </Link>
        ))}
      </div>
    </main>
  );
}
