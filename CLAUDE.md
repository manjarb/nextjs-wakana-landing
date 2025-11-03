# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 landing page** for **WANAKA Sanctuary**, a spa/wellness brand in Bangna, Thailand. The project uses the **App Router** architecture with React 19, TypeScript (strict mode), and Tailwind CSS v4.

**Target audience**: Busy moms and professionals seeking calm and rejuvenation
**Brand aesthetic**: Minimalist, warm, earth-toned (beige, taupe, olive, teal)

## Essential Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Create production build (must pass before PRs)
npm run lint     # Run ESLint (must pass before PRs)
npm run start    # Run production server
```

**Note**: No test runner is configured yet.

## Architecture & Key Patterns

### App Router Structure
- Uses Next.js 16 **App Router** (`/app` directory)
- **Dynamic locale routing** via `app/[locale]/` pattern
- **Server Components by default** - Only add `"use client"` when you need interactivity (hooks, event handlers, browser APIs)
- File-based routing with `page.tsx` and `layout.tsx`
- Root layout (`app/[locale]/layout.tsx`) configures:
  - Fonts (Geist Sans, Geist Mono from Google Fonts)
  - NextIntlClientProvider with locale-specific messages
  - Static generation for both EN and TH locales

### Import Pattern
Always use absolute imports with `@/` alias:
```typescript
import Component from '@/components/Hero'        // ✅ Correct
import Component from '../components/Hero'       // ❌ Avoid
```

### Component Conventions
- **Naming**: PascalCase for components (`Hero.tsx`, `ServiceCard.tsx`)
- **Routes**: kebab-case for route folders (`app/about-us/page.tsx`)
- **Indentation**: 2 spaces
- **Co-locate**: Related files together when it makes sense

### Styling with Tailwind CSS v4
- Uses **Tailwind v4** with inline `@theme` directive in `app/globals.css`
- **CSS variables** for theming: `--background`, `--foreground`, `--font-sans`, `--font-mono`
- Prefer utility classes in JSX over custom CSS
- Dark mode supported via `prefers-color-scheme`
- Custom selection styling with forest teal background

**WANAKA Brand Colors** (APPLIED to theme as CSS variables):
- Warm Beige: `#D6C8B2` → `--wanaka-warm-beige`
- Soft Taupe: `#C2B8A3` → `--wanaka-soft-taupe`
- Muted Sand: `#E3D8C7` → `--wanaka-muted-sand`
- Olive Mist: `#B4B8A0` → `--wanaka-olive-mist`
- Forest Teal: `#5B6D65` → `--wanaka-forest-teal` (primary brand color)
- Slate Grey: `#6F7B7A` → `--wanaka-slate-grey`

**Usage in code**: Access via bracket notation in Tailwind classes:
```typescript
<div className="bg-[#5b6d65] text-[#f7f2e8]">Forest Teal Background</div>
```

## Internationalization (i18n)

**Status**: FULLY CONFIGURED AND OPERATIONAL

- **Library**: `next-intl@4.4.0` (fully configured)
- **Languages**: English (en) and Thai (th)
- **Structure**: Uses `app/[locale]/` pattern with dynamic routing
- **Configuration**:
  - `i18n/config.ts` - Locale definitions and defaults
  - `i18n/routing.ts` - Routing setup with automatic locale detection
  - `i18n/request.ts` - Server-side message loading
- **Translation Files**: `messages/en.json`, `messages/th.json` (structure in place, needs WANAKA-specific content)
- **Next.js Integration**: Wrapped with `withNextIntl()` plugin
- **Components**: `LanguageSwitcher.tsx` available for language switching

**Next Steps for i18n**:
1. Replace placeholder content in translation files with actual WANAKA copy
2. Integrate translation keys into landing page components (currently hardcoded)
3. Add LanguageSwitcher to header navigation

## Git Workflow

Follow **Conventional Commits**:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `style:` - Code formatting
- `refactor:` - Code restructuring

**Before creating PRs**:
- Must pass `npm run lint`
- Must pass `npm run build`
- Include PR description, linked issues, screenshots for UI changes

## Project Structure

```
/
├── app/
│   ├── [locale]/              # Dynamic locale routing (en, th)
│   │   ├── layout.tsx         # Root layout with i18n provider & fonts
│   │   └── page.tsx           # Main landing page (892 lines)
│   └── globals.css            # Global styles & WANAKA brand colors
├── components/
│   └── LanguageSwitcher.tsx   # Language toggle component
├── i18n/
│   ├── config.ts              # Locale configuration (en, th)
│   ├── routing.ts             # next-intl routing setup
│   └── request.ts             # Server-side message loader
├── messages/
│   ├── en.json                # English translations (needs WANAKA content)
│   └── th.json                # Thai translations (needs WANAKA content)
├── public/
│   ├── images/
│   │   ├── generated/         # AI-generated service & gallery images
│   │   └── logo/              # WANAKA logo files
│   └── clinic.png             # Hero section image
├── next.config.ts             # Next.js config with i18n plugin
├── tsconfig.json              # TypeScript strict mode config
├── package.json               # Dependencies & scripts
└── [documentation files]      # CLAUDE.md, AGENTS.md, etc.
```

## Important Documentation

- **`AGENTS.md`** - Detailed coding conventions, structure, and guidelines
- **`I18N_IMPLEMENTATION_GUIDE.md`** - Complete i18n setup instructions (18KB guide)
- **`WANAKA_Summary_With_Colors.md`** - Brand identity, target audience, services, color palette

## Security Notes

- Store secrets in `.env.local` (never commit)
- Configure external image domains in `next.config.ts` when using `next/image`
- Keep `.env*` files in `.gitignore`

## Landing Page Content (app/[locale]/page.tsx)

The main landing page is a comprehensive single-page website with the following sections:

1. **Navigation Header** (sticky)
   - WANAKA logo with tagline
   - Desktop/mobile navigation menus
   - "Book a Ritual" CTA button

2. **Hero Section**
   - Headline: "Small Rituals. Big Rest."
   - Subheading with brand promise
   - Two CTAs: "Explore Services" & "Discover The Story"
   - Hero image with gradient blur effect

3. **Brand Pillars** (3 cards)
   - Calm Experience, Caring Hands, Clean Craft
   - Custom SVG icons, hover effects

4. **About Section**
   - Sanctuary narrative
   - About image with blur effect

5. **Mission Section** (3 highlights)
   - Trained & Trusted Hands
   - Nature-Led Products
   - Hospitality First

6. **Services Section**
   - 4 main services with images (Facial, Head Spa, Hand/Feet, IV Drip)
   - 4 signature journeys (Express Reset, Happy Bar Lounge, Private Retreat, Kids Friendly)

7. **Experience Design**
   - Multi-sensory journey (soundscapes, aroma zoning, adaptive lighting)
   - 5 immersive details (Mood Cards, bath bombs, sound bath, gifts, loyalty)

8. **Gallery** (3 images)
   - Lounge Glow, Calm Corners, Wellness Wing
   - Hover gradient overlay effects

9. **Contact Section**
   - Email, Phone, Address
   - "Enquire Now" CTA

10. **Footer**
    - Copyright & quick links

**Technical Details**:
- 892 lines, Server Component
- 100% Tailwind CSS utility classes
- Inline SVG icons
- Next.js Image optimization
- Hardcoded content (not using i18n translations yet)
- Mobile-first responsive design

## Current State

**What's Working**:
- Next.js 16 + React 19 with App Router
- TypeScript strict mode
- **Full i18n implementation** (next-intl configured, EN/TH languages, locale routing)
- **Brand colors applied** to Tailwind CSS theme
- **Comprehensive landing page** with WANAKA content (see section above)
- Image assets (AI-generated service images, logo, hero image)
- ESLint with Next.js rules
- Absolute imports via `@/` alias

**What Needs Implementation**:
- Populate translation files with WANAKA-specific content (currently placeholder text)
- Integrate i18n keys into landing page (currently hardcoded)
- Add LanguageSwitcher to navigation header
- Backend integration for booking/contact forms
- Testing framework
- Analytics/tracking setup

## Common Development Patterns

### Creating a New Localized Page
```typescript
// app/[locale]/services/page.tsx
export default function ServicesPage() {
  // Server Component - can async fetch data
  return <div>Services content</div>
}
```

### Creating an Interactive Component
```typescript
// components/BookingForm.tsx
"use client"

import { useState } from 'react'

export default function BookingForm() {
  const [name, setName] = useState('')
  return <form>...</form>
}
```

### Using next-intl for Translations
```typescript
// Server Component
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('home')
  return <h1>{t('title')}</h1>
}

// Client Component
"use client"
import { useTranslations } from 'next-intl'

export default function ClientComponent() {
  const t = useTranslations('common')
  return <button>{t('bookNow')}</button>
}
```

### Using Absolute Imports
```typescript
import Hero from '@/components/Hero'
import { formatDate } from '@/lib/utils'
import type { Service } from '@/types/service'
import { locales } from '@/i18n/config'
```

### Accessing WANAKA Brand Colors
```typescript
// In Tailwind classes (preferred method)
<div className="bg-[#5b6d65] text-[#f7f2e8]">
  Forest Teal with Light Background
</div>

// CSS variables available:
// --wanaka-warm-beige, --wanaka-soft-taupe, --wanaka-muted-sand
// --wanaka-olive-mist, --wanaka-forest-teal, --wanaka-slate-grey
```
