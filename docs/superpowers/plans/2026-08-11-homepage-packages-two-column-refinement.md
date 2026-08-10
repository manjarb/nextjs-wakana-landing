# Homepage Packages Two-Column Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the homepage Packages gallery from three columns to a 2+1 layout at medium and larger widths while retaining one column on mobile.

**Architecture:** Refine only the responsive Tailwind grid and `next/image` sizing hint in the existing homepage Server Component. Keep package data, artwork order, natural aspect ratios, localization, and navigation unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4

## Global Constraints

- Mobile remains one artwork per row.
- Medium and larger screens use two equal-width columns.
- The third artwork starts a second row aligned left.
- Preserve the complete natural aspect ratio of every artwork.
- Do not change copy, navigation, or add dependencies.
- Preserve unrelated uncommitted changes.

---

### Task 1: Refine the Packages grid

**Files:**
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: the existing `packageArtworks` array and `#packages` section.
- Produces: a responsive one-column mobile and two-column medium-plus gallery.

- [ ] **Step 1: Update the responsive grid and image sizing hint**

Change:

```tsx
<div className="mt-12 grid items-start gap-6 md:grid-cols-3">
```

to:

```tsx
<div className="mt-12 grid items-start gap-6 md:grid-cols-2">
```

Change the package image sizing hint from:

```tsx
sizes="(min-width: 768px) 33vw, 100vw"
```

to:

```tsx
sizes="(min-width: 768px) 50vw, 100vw"
```

- [ ] **Step 2: Run static verification**

Run:

```bash
git diff --check
npm run lint
npm run build
```

Expected: no whitespace errors, no lint errors, and a successful production build. Existing unrelated lint warnings may remain.

- [ ] **Step 3: Inspect responsive rendering**

At approximately 1440px width, confirm two equal columns with the third artwork at the left of row two. At approximately 390px width, confirm one full-width column with no horizontal overflow. Confirm images remain uncropped at both sizes.
