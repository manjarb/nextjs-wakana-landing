import { getRequestConfig } from 'next-intl/server';
import type { Locale } from './config';
import { routing } from './routing';

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate and fallback to default locale if invalid
  if (!locale || !isLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
