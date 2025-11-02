# Implementing Multi-Language Support in Next.js with next-intl

This guide provides step-by-step instructions for implementing internationalization (i18n) in a Next.js project using the `next-intl` library. This approach works with Next.js 14+ and the App Router architecture.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Using Translations](#using-translations)
6. [Language Switcher Component](#language-switcher-component)
7. [Adding New Languages](#adding-new-languages)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Next.js 14+ with App Router
- TypeScript (recommended)
- Node.js 18+

---

## Installation

Install the `next-intl` package:

```bash
npm install next-intl
```

---

## Project Structure

Your project will have the following structure for i18n:

```
your-nextjs-project/
├── app/
│   └── [locale]/              # All routes go under this dynamic segment
│       ├── layout.tsx         # Locale-specific layout
│       ├── page.tsx           # Home page
│       └── ...                # All other routes
├── i18n/
│   ├── config.ts              # Locale definitions and configuration
│   ├── routing.ts             # Routing configuration
│   └── request.ts             # Server-side request configuration
├── messages/
│   ├── en.json                # English translations
│   ├── th.json                # Thai translations
│   └── ...                    # Other language files
├── components/
│   └── LanguageSwitcher.tsx   # Language selector component (optional)
└── next.config.ts             # Next.js configuration with next-intl plugin
```

---

## Step-by-Step Setup

### Step 1: Create i18n Configuration Files

#### A. Create `i18n/config.ts`

This file defines your supported locales and their display names:

```typescript
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
```

#### B. Create `i18n/routing.ts`

This file configures the routing behavior:

```typescript
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
```

#### C. Create `i18n/request.ts`

This file handles server-side locale detection and message loading:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate and fallback to default locale if invalid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### Step 2: Create Translation Files

#### A. Create `messages/en.json`

Example English translations:

```json
{
  "common": {
    "appName": "My App",
    "logout": "Logout",
    "login": "Login",
    "save": "Save",
    "cancel": "Cancel"
  },
  "home": {
    "title": "Welcome to My App",
    "description": "This is a multi-language application"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "errors": {
    "notFound": "Page not found",
    "serverError": "Server error occurred"
  }
}
```

#### B. Create `messages/th.json`

Example Thai translations:

```json
{
  "common": {
    "appName": "แอปของฉัน",
    "logout": "ออกจากระบบ",
    "login": "เข้าสู่ระบบ",
    "save": "บันทึก",
    "cancel": "ยกเลิก"
  },
  "home": {
    "title": "ยินดีต้อนรับสู่แอปของฉัน",
    "description": "นี่คือแอปพลิเคชันหลายภาษา"
  },
  "navigation": {
    "home": "หน้าแรก",
    "about": "เกี่ยวกับ",
    "contact": "ติดต่อ"
  },
  "errors": {
    "notFound": "ไม่พบหน้า",
    "serverError": "เกิดข้อผิดพลาดของเซิร์ฟเวอร์"
  }
}
```

### Step 3: Configure Next.js

Update your `next.config.ts` (or `next.config.js`):

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Create the next-intl plugin with the path to your request config
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Your existing Next.js config
};

export default withNextIntl(nextConfig);
```

### Step 4: Restructure Your App Directory

Move all your existing routes under a `[locale]` folder:

**Before:**
```
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

**After:**
```
app/
├── [locale]/              # New dynamic locale folder
│   ├── layout.tsx         # Locale-specific layout (new)
│   ├── page.tsx           # Moved from app/page.tsx
│   ├── about/
│   │   └── page.tsx       # Moved from app/about/page.tsx
│   └── contact/
│       └── page.tsx       # Moved from app/contact/page.tsx
└── layout.tsx             # Keep your root layout if you have global providers
```

### Step 5: Create Locale Layout

Create `app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Note:** If you have a root layout (`app/layout.tsx`) with global providers (like theme providers), keep it and nest the locale-specific content inside.

### Step 6: Update Your Root Layout (if applicable)

If you have `app/layout.tsx` with global providers, update it:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Multi-language application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Let the locale layout handle html and body tags
}
```

---

## Using Translations

### Server Components (Default)

Server Components can directly use the `useTranslations` hook:

```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Client Components

Client Components need the `"use client"` directive:

```typescript
// components/Header.tsx
"use client";

import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');

  return (
    <header>
      <h1>{tCommon('appName')}</h1>
      <nav>
        <a href="/">{t('home')}</a>
        <a href="/about">{t('about')}</a>
        <a href="/contact">{t('contact')}</a>
      </nav>
    </header>
  );
}
```

### Using Variables (ICU MessageFormat)

Translation files support variables using ICU MessageFormat:

**Translation file:**
```json
{
  "greeting": "Hello, {name}!",
  "items": "You have {count} items in your cart",
  "updated": "Last updated: {date, date, medium}"
}
```

**Component:**
```typescript
const t = useTranslations('messages');

<p>{t('greeting', { name: 'John' })}</p>
<p>{t('items', { count: 5 })}</p>
<p>{t('updated', { date: new Date() })}</p>
```

### Multiple Namespaces

You can use multiple translation namespaces in a single component:

```typescript
export default function ProductPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('save')}</button>
      <span>{tErrors('notFound')}</span>
    </div>
  );
}
```

### Localized Links

Use the localized `Link` component from your routing config:

```typescript
// Import from your routing config, not from next/link
import { Link } from '@/i18n/routing';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
```

The `Link` component automatically adds the locale prefix (`/en/about`, `/th/about`).

---

## Language Switcher Component

Create a component to allow users to switch languages:

```typescript
// components/LanguageSwitcher.tsx
"use client";

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = params.locale as Locale;

  const handleChange = (newLocale: Locale) => {
    // Replace the locale in the current pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    router.push(newPathname);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      className="border rounded px-2 py-1"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]}
        </option>
      ))}
    </select>
  );
}
```

### Material UI Version (if using MUI)

```typescript
"use client";

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = params.locale as Locale;

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value as Locale;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    router.push(newPathname);
  };

  return (
    <Select
      value={currentLocale}
      onChange={handleChange}
      size="small"
    >
      {locales.map((locale) => (
        <MenuItem key={locale} value={locale}>
          {localeFlags[locale]} {localeNames[locale]}
        </MenuItem>
      ))}
    </Select>
  );
}
```

---

## Adding New Languages

To add a new language (e.g., Spanish):

### 1. Update `i18n/config.ts`

```typescript
export const locales = ['en', 'th', 'es'] as const; // Add 'es'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  th: 'ไทย',
  es: 'Español', // Add Spanish
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  th: '🇹🇭',
  es: '🇪🇸', // Add Spanish flag
};
```

### 2. Update `i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ['en', 'th', 'es'], // Add 'es'
  defaultLocale: 'en',
  localeDetection: true,
});
```

### 3. Create Translation File

Create `messages/es.json` with all the same keys as your other language files:

```json
{
  "common": {
    "appName": "Mi Aplicación",
    "logout": "Cerrar sesión",
    "login": "Iniciar sesión",
    "save": "Guardar",
    "cancel": "Cancelar"
  },
  "home": {
    "title": "Bienvenido a Mi Aplicación",
    "description": "Esta es una aplicación multilingüe"
  }
}
```

### 4. Rebuild Your Application

```bash
npm run build
```

That's it! Your application now supports Spanish at `/es/*` routes.

---

## Best Practices

### 1. Organize Translations by Feature

Use nested structures for better organization:

```json
{
  "auth": {
    "login": {
      "title": "Login",
      "emailPlaceholder": "Enter email",
      "passwordPlaceholder": "Enter password",
      "submitButton": "Sign In"
    },
    "register": {
      "title": "Register",
      "...": "..."
    }
  },
  "dashboard": {
    "...": "..."
  }
}
```

### 2. Keep Translation Keys Consistent

Ensure all language files have the same structure and keys:

```
✅ Good: All files have the same keys
en.json: { "common": { "logout": "Logout" } }
th.json: { "common": { "logout": "ออกจากระบบ" } }

❌ Bad: Missing keys in some files
en.json: { "common": { "logout": "Logout", "login": "Login" } }
th.json: { "common": { "logout": "ออกจากระบบ" } } // Missing "login"
```

### 3. Use TypeScript for Type Safety

Create a type for your translation keys:

```typescript
// types/i18n.ts
type Messages = typeof import('../messages/en.json');
declare global {
  interface IntlMessages extends Messages {}
}
```

This enables autocomplete and type checking for translation keys.

### 4. Handle Missing Translations

Configure fallback behavior in your `i18n/request.ts`:

```typescript
return {
  locale,
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: 'UTC',
  now: new Date(),
  // Optional: Configure what happens when a translation is missing
  getMessageFallback: ({ namespace, key, error }) => {
    return `${namespace}.${key}`;
  },
};
```

### 5. Test All Languages

Create a checklist when adding new features:
- [ ] Add English translations
- [ ] Add translations for all supported languages
- [ ] Test UI in all languages (especially for text overflow)
- [ ] Verify RTL languages display correctly (if applicable)

### 6. Use ICU MessageFormat for Plurals

Handle plurals correctly:

```json
{
  "items": "{count, plural, =0 {No items} =1 {One item} other {# items}}"
}
```

```typescript
<p>{t('items', { count: 0 })}</p>  // "No items"
<p>{t('items', { count: 1 })}</p>  // "One item"
<p>{t('items', { count: 5 })}</p>  // "5 items"
```

### 7. Extract Common Translations

Create a `common` namespace for reusable translations:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "yes": "Yes",
    "no": "No"
  }
}
```

### 8. Use Relative Dates

next-intl provides utilities for relative time formatting:

```typescript
import { useFormatter } from 'next-intl';

export default function DateDisplay() {
  const format = useFormatter();

  return (
    <p>{format.relativeTime(new Date('2024-01-01'))}</p>
    // Outputs: "2 months ago" (in English)
  );
}
```

---

## Troubleshooting

### Issue: "Cannot find module '../messages/en.json'"

**Solution:** Make sure your translation files exist and the path in `i18n/request.ts` is correct.

### Issue: Translations not updating after changes

**Solution:** Restart the development server:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Issue: 404 errors for locale routes

**Solution:** Verify that:
1. Your routes are under `app/[locale]/`
2. The `[locale]` folder has a `layout.tsx` file
3. `next.config.ts` uses `withNextIntl()`

### Issue: "useTranslations is not a function"

**Solution:** Make sure you're using the correct import:
```typescript
import { useTranslations } from 'next-intl'; // ✅ Correct
import { useTranslations } from 'next-intl/server'; // ❌ Wrong (server-only)
```

### Issue: Client Component errors

**Solution:** Ensure your Client Components have the `"use client"` directive at the top:
```typescript
"use client"; // Must be at the very top

import { useTranslations } from 'next-intl';
```

### Issue: Locale not detected automatically

**Solution:** Check that `localeDetection: true` is set in `i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localeDetection: true, // Make sure this is true
});
```

---

## Additional Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [ICU MessageFormat Guide](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- [MDN Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

---

## Summary

You now have a complete multi-language Next.js application! Your URLs will automatically include the locale:

- `/en/` - English home page
- `/th/` - Thai home page
- `/en/about` - English about page
- `/th/about` - Thai about page

The setup provides:
- ✅ Automatic locale detection from browser settings
- ✅ Type-safe translation keys (with TypeScript)
- ✅ Server and Client Component support
- ✅ Easy language switching
- ✅ Static generation for all locales
- ✅ SEO-friendly URLs with locale prefixes
- ✅ Scalable structure for adding new languages

Happy internationalizing! 🌍
