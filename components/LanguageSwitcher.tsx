"use client";

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

const localeCodes: Record<Locale, string> = {
  en: 'EN',
  th: 'TH',
};

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = params.locale as Locale;

  const handleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    // Replace the locale segment in the current pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium text-[#5b6d65]"
      aria-label="Language switcher"
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-[#5b6d65]/40">|</span>}
          <button
            type="button"
            onClick={() => handleChange(locale)}
            aria-current={locale === currentLocale}
            className={`rounded px-1 transition ${
              locale === currentLocale
                ? 'font-semibold text-[#2f3a36]'
                : 'text-[#5b6d65]/70 hover:text-[#2f3a36]'
            }`}
          >
            {localeCodes[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
