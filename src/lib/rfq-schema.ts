import {z} from 'zod';

// مخطّط التحقق من نموذج طلب عرض السعر — مشترك بين العميل والخادم.
// رسائل الخطأ مفاتيح تُترجم لاحقاً عبر next-intl.
export const rfqSchema = z.object({
  buyer_name: z.string().min(1, {error: 'required'}),
  buyer_email: z.email({error: 'invalidEmail'}),
  buyer_phone: z.string().optional(),
  buyer_country: z.string().optional(),
  message: z.string().optional(),
  listing_id: z.string().optional()
});

export type RfqInput = z.infer<typeof rfqSchema>;
