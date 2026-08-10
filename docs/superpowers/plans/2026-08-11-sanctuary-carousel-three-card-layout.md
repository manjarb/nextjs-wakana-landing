# Sanctuary Carousel Three-Card Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show one sanctuary carousel image on mobile and three images side by side from the `sm` breakpoint upward, while advancing one image at a time.

**Architecture:** Keep the existing nine-item Embla data and navigation model unchanged. Implement the responsive layout entirely through each slide’s Tailwind flex basis and track spacing, then update the image sizing hint to match the rendered widths.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Embla Carousel 8.6.

## Global Constraints

- Modify only `components/SanctuaryCarousel.tsx`; do not add dependencies or translation keys.
- Preserve the existing slide data, autoplay timing, looping, controls, captions, and visual treatment.
- Use 2-space indentation and Tailwind utility classes.
- The repository has no test runner; verify the responsive behavior in the browser, then run lint and a production build.

---

## File Structure

- **Modify:** `components/SanctuaryCarousel.tsx` — owns the fixed slide data, responsive Embla track, controls, and indicators.

### Task 1: Make the carousel responsive

**Files:**
- Modify: `components/SanctuaryCarousel.tsx:93-106`

**Interfaces:**
- Consumes: the existing `slides: SanctuarySlide[]` and Embla instance returned by `useEmblaCarousel`.
- Produces: the unchanged `SanctuaryCarousel(): JSX.Element` default export with responsive slide widths.

- [ ] **Step 1: Establish the failing visual baseline**

Run `npm run dev`, open the localized homepage, and inspect the “Sanctuary Preview” section at widths below and above the Tailwind `sm` breakpoint (`640px`).

Expected before implementation: one image occupies the full carousel width at both viewport sizes because every slide uses `flex-[0_0_100%]`.

- [ ] **Step 2: Apply the minimal responsive layout change**

Change the carousel track and slide markup to:

```tsx
<div className="-ml-4 flex">
  {slides.map((slide) => (
    <div
      key={slide.src}
      className="relative min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_33.333333%]"
    >
```

This creates a 16px gutter while retaining a full-width mobile slide and three equal-width slides from `sm` upward.

Change the image sizing hint to:

```tsx
sizes="(min-width: 640px) 33vw, 100vw"
```

- [ ] **Step 3: Verify responsive carousel behavior**

With the development server running, inspect the homepage below `640px` and at or above `640px`.

Expected after implementation:

- Below `640px`, exactly one image is visible.
- At or above `640px`, exactly three images are visible with even gutters.
- Arrow clicks, dot clicks, autoplay, and swipe move one image per snap.
- The last images loop back to the first without exposing an empty gap.

- [ ] **Step 4: Run static verification**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit with status 0 and introduce no new warnings or errors attributable to this change.

- [ ] **Step 5: Commit the implementation**

```bash
git add components/SanctuaryCarousel.tsx
git commit -m "fix: show three sanctuary carousel images"
```
