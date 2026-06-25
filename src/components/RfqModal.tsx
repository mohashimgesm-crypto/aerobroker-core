'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {Modal} from './Modal';
import {rfqSchema, type RfqInput} from '@/lib/rfq-schema';
import {submitRfq} from '@/app/actions/rfq';

interface Props {
  listingId: string;
  listingTitle: string;
  onClose: () => void;
}

// نافذة نموذج طلب عرض سعر (RFQ)
export function RfqModal({listingId, listingTitle, onClose}: Props) {
  const t = useTranslations('Rfq');
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {listing_id: listingId}
  });

  async function onSubmit(data: RfqInput) {
    setServerError(false);
    const res = await submitRfq(data);
    if (res.ok) {
      setSuccess(true);
    } else {
      setServerError(true);
    }
  }

  // ترجمة رسالة خطأ حقل (المفتاح مخزّن في رسالة zod)
  const errText = (key?: string) => (key ? t(key) : null);

  const fieldClass =
    'w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky focus:outline-none';
  const labelClass = 'flex flex-col gap-1 text-sm text-slate-400';
  const errClass = 'text-xs text-red-400';

  if (success) {
    return (
      <Modal title={t('successTitle')} onClose={onClose}>
        <div className="flex flex-col gap-4">
          <p className="text-slate-300">{t('successMessage')}</p>
          <button
            type="button"
            onClick={onClose}
            className="self-start rounded-lg bg-sky px-5 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            {t('close')}
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={t('title')} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <p className="text-sm text-slate-400">
          {t('subtitle')} <span className="text-slate-300">— {listingTitle}</span>
        </p>

        <label className={labelClass}>
          {t('name')}
          <input type="text" {...register('buyer_name')} className={fieldClass} />
          {errors.buyer_name ? (
            <span className={errClass}>{errText(errors.buyer_name.message)}</span>
          ) : null}
        </label>

        <label className={labelClass}>
          {t('email')}
          <input type="email" {...register('buyer_email')} className={fieldClass} />
          {errors.buyer_email ? (
            <span className={errClass}>{errText(errors.buyer_email.message)}</span>
          ) : null}
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            {t('phone')}
            <input
              type="tel"
              dir="ltr"
              {...register('buyer_phone')}
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            {t('country')}
            <input type="text" {...register('buyer_country')} className={fieldClass} />
          </label>
        </div>

        <label className={labelClass}>
          {t('message')}
          <textarea
            rows={4}
            {...register('message')}
            placeholder={t('messagePlaceholder')}
            className={fieldClass}
          />
        </label>

        {serverError ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            <strong className="block">{t('errorTitle')}</strong>
            {t('errorMessage')}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-sky px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </form>
    </Modal>
  );
}
