import type {Category} from './supabase/types';

// ════════════════════════════════════════════════════════════════
// حاسبة تكاليف استيراد الطائرات
// ════════════════════════════════════════════════════════════════

// الدول المدعومة للاستيراد (رمز ISO)
export const IMPORT_COUNTRIES = ['AE', 'SA', 'EG', 'QA', 'KW', 'JO'] as const;
export type ImportCountry = (typeof IMPORT_COUNTRIES)[number];

// نسب الجمارك حسب الدولة
const CUSTOMS_RATE: Record<ImportCountry, number> = {
  AE: 0.05,
  SA: 0.05,
  EG: 0.2,
  QA: 0.05,
  KW: 0.05,
  JO: 0.1
};

// نسب ضريبة القيمة المضافة حسب الدولة
const VAT_RATE: Record<ImportCountry, number> = {
  AE: 0.05,
  SA: 0.15,
  EG: 0.14,
  QA: 0,
  KW: 0,
  JO: 0.16
};

// أسماء الدول (للعرض)
export const COUNTRY_NAMES: Record<ImportCountry, {ar: string; en: string}> = {
  AE: {ar: 'الإمارات', en: 'United Arab Emirates'},
  SA: {ar: 'السعودية', en: 'Saudi Arabia'},
  EG: {ar: 'مصر', en: 'Egypt'},
  QA: {ar: 'قطر', en: 'Qatar'},
  KW: {ar: 'الكويت', en: 'Kuwait'},
  JO: {ar: 'الأردن', en: 'Jordan'}
};

// تكلفة الشحن الجوي لكل كيلوغرام (دولار)
const FREIGHT_RATE_PER_KG = 8.5;
// نسبة التأمين من (السعر + الشحن)
const INSURANCE_RATE = 0.005;

// مناولة الميناء حسب الفئة
function getPortHandling(category: Category): number {
  // الطائرات فوق الخفيفة أخفّ وأرخص في المناولة
  return category === 'ultralight' ? 800 : 1800;
}

export interface CostInput {
  price: number; // سعر الطائرة بالدولار
  weightKg: number; // وزن الشحن بالكيلوغرام
  category: Category;
  country: ImportCountry;
}

export interface CostBreakdown {
  price: number;
  freight: number;
  insurance: number;
  cif: number;
  customs: number;
  vat: number;
  portHandling: number;
  total: number;
}

// حساب التفصيل الكامل لتكلفة الاستيراد
export function calculateImportCost(input: CostInput): CostBreakdown {
  const {price, weightKg, category, country} = input;

  const freight = weightKg * FREIGHT_RATE_PER_KG;
  const insurance = (price + freight) * INSURANCE_RATE;
  const cif = price + freight + insurance;

  const customs = cif * CUSTOMS_RATE[country];
  // الضريبة تُحتسب على (القيمة CIF + الجمارك) كقاعدة استيراد معتادة
  const vat = (cif + customs) * VAT_RATE[country];
  const portHandling = getPortHandling(category);

  const total = price + freight + insurance + customs + vat + portHandling;

  return {price, freight, insurance, cif, customs, vat, portHandling, total};
}
