import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import type {Database} from './types';

// عميل Supabase للخادم (Server Components / Route Handlers / Server Actions)
// في Next.js 16 صارت دالة cookies() غير متزامنة (async) ويجب انتظارها.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({name, value, options}) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // يُستدعى setAll من Server Component لا يمكنه تعديل الكوكيز —
            // هذا آمن طالما الوسيط (proxy) يتولّى تحديث الجلسة.
          }
        }
      }
    }
  );
}
