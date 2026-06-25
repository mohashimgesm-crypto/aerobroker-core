import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {formatPrice, formatNumber} from '@/lib/format';
import type {ListingRow} from '@/lib/supabase/types';

// بطاقة إعلان واحدة ضمن شبكة التصفّح
export function ListingCard({listing, locale}: {listing: ListingRow; locale: string}) {
  const t = useTranslations('Browse');
  const cover = listing.images[0];

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-sky/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30">
        {cover ? (
          <Image
            src={cover}
            alt={`${listing.make} ${listing.model}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">
            {listing.make} {listing.model}
          </h3>
          {listing.year ? (
            <span className="shrink-0 text-sm text-slate-400">{listing.year}</span>
          ) : null}
        </div>

        <p className="text-sm text-slate-400">{listing.country}</p>

        {listing.flying_hours != null ? (
          <p className="text-sm text-slate-400">
            {t('hours', {hours: formatNumber(locale, listing.flying_hours)})}
          </p>
        ) : null}

        <div className="mt-auto pt-2">
          {listing.price_visible && listing.price_usd != null ? (
            <span className="text-xl font-bold text-sky">
              {formatPrice(locale, listing.price_usd)}
            </span>
          ) : (
            <span className="text-base font-medium text-slate-300">
              {t('priceOnRequest')}
            </span>
          )}
          {listing.negotiable ? (
            <span className="ms-2 text-xs text-slate-500">· {t('negotiable')}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
