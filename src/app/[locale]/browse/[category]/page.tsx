import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {isValidCategory} from '@/lib/categories';
import {getListings, getCountries} from '@/lib/listings';
import {ListingCard} from '@/components/ListingCard';
import {BrowseFilters} from '@/components/BrowseFilters';

// تحليل رقم من معامل البحث (أو undefined إن لم يكن صالحاً)
function parseNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function BrowseCategoryPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string; category: string}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}) {
  const {locale, category} = await params;
  setRequestLocale(locale);

  // التحقق أن الفئة صالحة وإلا صفحة 404
  if (!isValidCategory(category)) {
    notFound();
  }

  const sp = await searchParams;
  const q = firstValue(sp.q);
  const country = firstValue(sp.country);
  const minPrice = parseNumber(firstValue(sp.min));
  const maxPrice = parseNumber(firstValue(sp.max));

  const [listings, countries, t, tc] = await Promise.all([
    getListings({category, q, country, minPrice, maxPrice}),
    getCountries(category),
    getTranslations('Browse'),
    getTranslations('Categories')
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* رأس الصفحة */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-slate-400 hover:text-sky">
            ← AeroBroker
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-white">
            {t('title', {category: tc(category)})}
          </h1>
        </div>
        <span className="text-sm text-slate-400">
          {t('resultsCount', {count: listings.length})}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* عمود الفلاتر */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <BrowseFilters
            category={category}
            countries={countries}
            initial={{
              q,
              country,
              minPrice: minPrice?.toString() ?? '',
              maxPrice: maxPrice?.toString() ?? ''
            }}
          />
        </aside>

        {/* شبكة النتائج */}
        <section>
          {listings.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-slate-400">
              {t('noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} locale={locale} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
