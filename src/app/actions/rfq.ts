'use server';

import {createClient} from '@/lib/supabase/server';
import {rfqSchema, type RfqInput} from '@/lib/rfq-schema';

export interface RfqResult {
  ok: boolean;
  error?: 'validation' | 'config' | 'db';
}

// إجراء خادم: حفظ طلب عرض السعر في قاعدة البيانات
export async function submitRfq(input: RfqInput): Promise<RfqResult> {
  // التحقق من البيانات على الخادم (لا نثق ببيانات العميل)
  const parsed = rfqSchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: 'validation'};

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {ok: false, error: 'config'};
  }

  try {
    const supabase = await createClient();
    const {error} = await supabase.from('rfq_requests').insert({
      listing_id: parsed.data.listing_id || null,
      buyer_name: parsed.data.buyer_name,
      buyer_email: parsed.data.buyer_email,
      buyer_phone: parsed.data.buyer_phone || null,
      buyer_country: parsed.data.buyer_country || null,
      message: parsed.data.message || null
    });

    if (error) {
      console.error('submitRfq error:', error.message);
      return {ok: false, error: 'db'};
    }
    return {ok: true};
  } catch (err) {
    console.error('submitRfq exception:', err);
    return {ok: false, error: 'db'};
  }
}
