export const locales = ['en', 'th'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  th: 'ไทย',
};

// Optional: Add flag emojis for visual representation
export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  th: '🇹🇭',
};
