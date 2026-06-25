import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getListingBySlug} from '@/lib/listings';
import {formatPrice, formatNumber} from '@/lib/format';
import {Gallery} from '@/components/Gallery';
import {ListingActions} from '@/components/ListingActions';

export default async function ListingDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const listing = await getListingBySlug(slug);
  if (!listing) {
    notFound();
  }

  const t = await getTranslations('Listing');
  const tc = await getTranslations('Categories');
  const tcond = await getTranslations('Conditions');

  const title = `${listing.make} ${listing.model}`;
  const descriptionField = locale === 'ar' ? listing.description_ar : listing.description_en;

  // بناء صفوف المواصفات (نعرض فقط القيم المتوفّرة)
  const specs: {label: string; value: string}[] = [];
  if (listing.year != null) specs.push({label: t('year'), value: String(listing.year)});
  if (listing.flying_hours != null)
    specs.push({label: t('flyingHours'), value: formatNumber(locale, listing.flying_hours)});
  if (listing.engine_model)
    specs.push({label: t('engineModel'), value: listing.engine_model});
  if (listing.max_speed_kmh != null)
    specs.push({
      label: t('maxSpeed'),
      value: `${formatNumber(locale, listing.max_speed_kmh)} ${t('unitKmh')}`
    });
  if (listing.range_km != null)
    specs.push({
      label: t('range'),
      value: `${formatNumber(locale, listing.range_km)} ${t('unitKm')}`
    });
  if (listing.mtow_kg != null)
    specs.push({
      label: t('mtow'),
      value: `${formatNumber(locale, listing.mtow_kg)} ${t('unitKg')}`
    });
  if (listing.seats != null)
    specs.push({label: t('seats'), value: formatNumber(locale, listing.seats)});
  if (listing.condition)
    specs.push({label: t('condition'), value: tcond(listing.condition)});
  specs.push({label: t('category'), value: tc(listing.category)});
  specs.push({label: t('country'), value: listing.country});
  if (listing.city) specs.push({label: t('city'), value: listing.city});
  if (listing.shipping_weight_kg != null)
    specs.push({
      label: t('shippingWeight'),
      value: `${formatNumber(locale, listing.shipping_weight_kg)} ${t('unitKg')}`
    });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href={`/browse/${listing.category}`}
        className="text-sm text-slate-400 hover:text-sky"
      >
        ← {t('backToBrowse')}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* العمود الأيسر: المعرض والوصف */}
        <div className="flex flex-col gap-8">
          <Gallery images={listing.images} alt={title} />

          {descriptionField ? (
            <section>
              <h2 className="mb-3 text-xl font-bold text-white">{t('descriptionTitle')}</h2>
              <p className="leading-relaxed text-slate-300">{descriptionField}</p>
            </section>
          ) : null}
        </div>

        {/* العمود الأيمن: العنوان والسعر والمواصفات والإجراءات */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <div className="mt-3">
              {listing.price_visible && listing.price_usd != null ? (
                <span className="text-3xl font-bold text-sky">
                  {formatPrice(locale, listing.price_usd)}
                </span>
              ) : (
                <span className="text-xl font-medium text-slate-300">
                  {t('priceOnRequest')}
                </span>
              )}
              {listing.negotiable ? (
                <span className="ms-3 text-sm text-slate-400">· {t('negotiable')}</span>
              ) : null}
            </div>
          </div>

          {/* شبكة المواصفات */}
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-surface p-4">
                <dt className="text-xs text-slate-400">{spec.label}</dt>
                <dd className="mt-1 font-medium text-slate-100">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <ListingActions
            listingId={listing.id}
            listingTitle={title}
            price={listing.price_visible ? listing.price_usd : null}
            weightKg={listing.shipping_weight_kg}
            category={listing.category}
            locale={locale}
          />

          {/* ملاحظة الحماية */}
          <p className="rounded-xl border border-sky/20 bg-sky/5 p-4 text-sm text-slate-300">
            🔒 {t('protectionNote')}
          </p>
        </div>
      </div>
    </main>
  );
}
