import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localeDetection: true,  // Automatically detect user's locale
});

// Export localized navigation helpers
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
