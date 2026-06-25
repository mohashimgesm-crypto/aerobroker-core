'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {RfqModal} from './RfqModal';
import {CalculatorModal} from './CalculatorModal';
import type {Category} from '@/lib/supabase/types';

interface Props {
  listingId: string;
  listingTitle: string;
  price: number | null;
  weightKg: number | null;
  category: Category;
  locale: string;
}

// أزرار الإجراءات في صفحة الإعلان (طلب عرض سعر + حاسبة التكاليف)
export function ListingActions({
  listingId,
  listingTitle,
  price,
  weightKg,
  category,
  locale
}: Props) {
  const t = useTranslations('Listing');
  const [open, setOpen] = useState<'rfq' | 'calc' | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen('rfq')}
          className="flex-1 rounded-xl bg-sky px-6 py-3 text-center text-base font-semibold text-bg transition-opacity hover:opacity-90"
        >
          {t('requestQuote')}
        </button>
        <button
          type="button"
          onClick={() => setOpen('calc')}
          className="flex-1 rounded-xl border border-sky/40 px-6 py-3 text-center text-base font-semibold text-sky transition-colors hover:bg-sky/10"
        >
          {t('costCalculator')}
        </button>
      </div>

      {open === 'rfq' ? (
        <RfqModal
          listingId={listingId}
          listingTitle={listingTitle}
          onClose={() => setOpen(null)}
        />
      ) : null}

      {open === 'calc' ? (
        <CalculatorModal
          price={price}
          weightKg={weightKg}
          category={category}
          locale={locale}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
