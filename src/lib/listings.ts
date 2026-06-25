import 'server-only';
import {createClient} from './supabase/server';
import type {Category, ListingRow} from './supabase/types';

// التحقق من توفّر إعدادات Supabase (قد لا تكون مضبوطة بعد قبل ربط المشروع)
function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export interface ListingFilters {
  category?: Category;
  q?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
}

// إزالة المحارف التي قد تكسر صيغة فلتر .or في PostgREST
function sanitizeSearch(value: string) {
  return value.replace(/[,()]/g, ' ').trim();
}

// جلب الإعلانات النشطة مع فلاتر اختيارية
export async function getListings(filters: ListingFilters = {}): Promise<ListingRow[]> {
  if (!hasSupabaseEnv()) {
    // لم تُضبط المفاتيح بعد — نُرجع قائمة فارغة بدل رمي خطأ
    return [];
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', {ascending: false});

    if (filters.category) query = query.eq('category', filters.category);
    if (filters.country) query = query.eq('country', filters.country);
    if (typeof filters.minPrice === 'number') query = query.gte('price_usd', filters.minPrice);
    if (typeof filters.maxPrice === 'number') query = query.lte('price_usd', filters.maxPrice);

    if (filters.q) {
      const q = sanitizeSearch(filters.q);
      if (q) query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%`);
    }

    const {data, error} = await query;
    if (error) {
      console.error('getListings error:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getListings exception:', err);
    return [];
  }
}

// جلب إعلان واحد عبر الـ slug
export async function getListingBySlug(slug: string): Promise<ListingRow | null> {
  if (!hasSupabaseEnv()) return null;

  try {
    const supabase = await createClient();
    const {data, error} = await supabase
      .from('listings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      console.error('getListingBySlug error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('getListingBySlug exception:', err);
    return null;
  }
}

// قائمة الدول المتوفّرة (لفلتر الدولة) ضمن فئة معيّنة
export async function getCountries(category?: Category): Promise<string[]> {
  if (!hasSupabaseEnv()) return [];

  try {
    const supabase = await createClient();
    let query = supabase.from('listings').select('country').eq('status', 'active');
    if (category) query = query.eq('category', category);

    const {data, error} = await query.returns<{country: string}[]>();
    if (error || !data) return [];

    const unique = Array.from(new Set(data.map((r) => r.country))).filter(Boolean);
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  } catch {
    return [];
  }
}
