// أدوات تنسيق مشتركة

// تنسيق السعر بالدولار حسب اللغة
export function formatPrice(locale: string, price: number): string {
  const intlLocale = locale === 'ar' ? 'ar' : 'en-US';
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

// تنسيق رقم عادي حسب اللغة
export function formatNumber(locale: string, value: number): string {
  const intlLocale = locale === 'ar' ? 'ar' : 'en-US';
  return new Intl.NumberFormat(intlLocale).format(value);
}
