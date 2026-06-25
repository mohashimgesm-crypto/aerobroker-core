import type {Category} from './supabase/types';

// الفئات المدعومة في هذه المرحلة
export const CATEGORIES: readonly Category[] = ['ultralight', 'helicopter', 'machinery'] as const;

// التحقق أن قيمة المسار فئة صالحة
export function isValidCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
