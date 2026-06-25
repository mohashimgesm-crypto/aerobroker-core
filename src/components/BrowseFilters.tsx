'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import {CATEGORIES} from '@/lib/categories';
import type {Category} from '@/lib/supabase/types';

interface Props {
  category: Category;
  countries: string[];
  initial: {
    q: string;
    country: string;
    minPrice: string;
    maxPrice: string;
  };
}

// شريط الفلاتر (مكوّن عميل): يبني عنوان URL جديداً عند التطبيق
export function BrowseFilters({category, countries, initial}: Props) {
  const t = useTranslations('Browse');
  const tc = useTranslations('Categories');
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<Category>(category);
  const [q, setQ] = useState(initial.q);
  const [country, setCountry] = useState(initial.country);
  const [minPrice, setMinPrice] = useState(initial.minPrice);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (country) params.set('country', country);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    const qs = params.toString();
    router.push(`/browse/${selectedCategory}${qs ? `?${qs}` : ''}`);
  }

  function reset() {
    setQ('');
    setCountry('');
    setMinPrice('');
    setMaxPrice('');
    router.push(`/browse/${selectedCategory}`);
  }

  const fieldClass =
    'w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky focus:outline-none';

  return (
    <form
      onSubmit={apply}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-4"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        {t('filtersTitle')}
      </h2>

      {/* البحث النصي */}
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className={fieldClass}
      />

      {/* الفئة */}
      <label className="flex flex-col gap-1 text-sm text-slate-400">
        {t('categoryLabel')}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Category)}
          className={fieldClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {tc(c)}
            </option>
          ))}
        </select>
      </label>

      {/* الدولة */}
      <label className="flex flex-col gap-1 text-sm text-slate-400">
        {t('countryLabel')}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={fieldClass}
        >
          <option value="">{t('allCountries')}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* نطاق السعر */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm text-slate-400">
          {t('minPrice')}
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-400">
          {t('maxPrice')}
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-sky px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          {t('apply')}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/30"
        >
          {t('reset')}
        </button>
      </div>
    </form>
  );
}
