import 'server-only';
import {createClient as createSupabaseClient} from '@supabase/supabase-js';
import type {Database} from './types';

// عميل قراءة عام بلا كوكيز (لا يستخدم next/headers).
// مناسب للمسارات القابلة للتوليد الثابت/ISR مثل sitemap،
// لأن قراءة الكوكيز تُجبر المسار على العرض الديناميكي.
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {auth: {persistSession: false, autoRefreshToken: false}}
  );
}
