'use client';

import {useState, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import {Modal} from './Modal';
import {formatPrice} from '@/lib/format';
import {
  calculateImportCost,
  IMPORT_COUNTRIES,
  COUNTRY_NAMES,
  type ImportCountry
} from '@/lib/calculator';
import type {Category} from '@/lib/supabase/types';

interface Props {
  price: number | null;
  weightKg: number | null;
  category: Category;
  locale: string;
  onClose: () => void;
}

// نافذة حاسبة تكاليف الاستيراد — تفاعلية حسب الدولة
export function CalculatorModal({price, weightKg, category, locale, onClose}: Props) {
  const t = useTranslations('Calculator');
  const [country, setCountry] = useState<ImportCountry>('AE');

  const breakdown = useMemo(() => {
    if (price == null) return null;
    return calculateImportCost({
      price,
      weightKg: weightKg ?? 0,
      category,
      country
    });
  }, [price, weightKg, category, country]);

  const fmt = (v: number) => formatPrice(locale, v);

  return (
    <Modal title={t('title')} onClose={onClose}>
      {price == null ? (
        <p className="text-slate-300">{t('noPrice')}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-400">{t('intro')}</p>

          {/* اختيار دولة الوجهة */}
          <label className="flex flex-col gap-1 text-sm text-slate-400">
            {t('selectCountry')}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as ImportCountry)}
              className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-slate-100 focus:border-sky focus:outline-none"
            >
              {IMPORT_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {locale === 'ar' ? COUNTRY_NAMES[c].ar : COUNTRY_NAMES[c].en}
                </option>
              ))}
            </select>
          </label>

          {/* تفصيل التكاليف */}
          {breakdown ? (
            <dl className="divide-y divide-white/5 rounded-xl border border-white/10">
              <Row label={t('aircraftPrice')} value={fmt(breakdown.price)} />
              <Row label={t('freight')} value={fmt(breakdown.freight)} />
              <Row label={t('insurance')} value={fmt(breakdown.insurance)} />
              <Row label={t('cif')} value={fmt(breakdown.cif)} />
              <Row label={t('customs')} value={fmt(breakdown.customs)} />
              <Row label={t('vat')} value={fmt(breakdown.vat)} />
              <Row label={t('portHandling')} value={fmt(breakdown.portHandling)} />
              <Row label={t('total')} value={fmt(breakdown.total)} highlight />
            </dl>
          ) : null}

          <p className="text-xs text-slate-500">{t('note')}</p>
        </div>
      )}
    </Modal>
  );
}

function Row({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className={highlight ? 'font-bold text-white' : 'text-slate-400'}>{label}</dt>
      <dd className={highlight ? 'text-lg font-bold text-sky' : 'font-medium text-slate-200'}>
        {value}
      </dd>
    </div>
  );
}
