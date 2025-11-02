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
- **Server Components by default** - Only add `"use client"` when you need interactivity (hooks, event handlers, browser APIs)
- File-based routing with `page.tsx` and `layout.tsx`
- Root layout configures fonts (Geist Sans, Geist Mono)

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
- **CSS variables** for theming: `--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`
- Prefer utility classes in JSX over custom CSS
- Dark mode supported via `prefers-color-scheme`

**WANAKA Brand Colors** (defined but not yet applied to theme):
- Warm Beige: `#D6C8B2`
- Soft Taupe: `#C2B8A3`
- Muted Sand: `#E3D8C7`
- Olive Mist: `#B4B8A0`
- Forest Teal: `#5B6D65`
- Slate Grey: `#6F7B7A`

## Internationalization (i18n)

**Status**: Dependencies installed, directories prepared, but **NOT YET CONFIGURED**

- **Library**: `next-intl@4.4.0` (installed but not configured)
- **Languages**: English (en) and Thai (th) planned
- **Structure**: Will use `app/[locale]/` pattern once implemented
- **Guide**: See `I18N_IMPLEMENTATION_GUIDE.md` for complete step-by-step setup

**Before using i18n features**:
1. Create `i18n/config.ts`, `i18n/routing.ts`, `i18n/request.ts`
2. Add translation files: `messages/en.json`, `messages/th.json`
3. Wrap `next.config.ts` with `withNextIntl()`
4. Refactor app structure to `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`

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

## Important Documentation

- **`AGENTS.md`** - Detailed coding conventions, structure, and guidelines
- **`I18N_IMPLEMENTATION_GUIDE.md`** - Complete i18n setup instructions (18KB guide)
- **`WANAKA_Summary_With_Colors.md`** - Brand identity, target audience, services, color palette

## Security Notes

- Store secrets in `.env.local` (never commit)
- Configure external image domains in `next.config.ts` when using `next/image`
- Keep `.env*` files in `.gitignore`

## Current State

**What's Working**:
- Fresh Next.js 16 + React 19 setup
- TypeScript strict mode
- Tailwind CSS v4 configured
- ESLint with Next.js rules
- App Router structure
- Absolute imports via `@/` alias

**What Needs Implementation**:
- i18n configuration (dependencies ready, config needed)
- Brand colors applied to Tailwind theme
- Custom components for WANAKA content
- Actual landing page content (currently default template)
- Testing framework

## Common Development Patterns

### Creating a New Page
```typescript
// app/services/page.tsx
export default function ServicesPage() {
  // Server Component - can async fetch data
  return <div>Services content</div>
}
```

### Creating an Interactive Component
```typescript
// components/LanguageSwitcher.tsx
"use client"

import { useState } from 'react'

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('en')
  return <button onClick={() => setLocale('th')}>Switch</button>
}
```

### Using Absolute Imports
```typescript
import Hero from '@/components/Hero'
import { formatDate } from '@/lib/utils'
import type { Service } from '@/types/service'
```
