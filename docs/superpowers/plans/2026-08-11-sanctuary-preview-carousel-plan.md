# Sanctuary Preview Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 3-image grid in the "Sanctuary Preview" section of the landing page with a sliding, autoplaying carousel over the 9 real interior photos in `public/images/sanctuary_preview/`.

**Architecture:** A new client component (`components/SanctuaryCarousel.tsx`) wraps Embla Carousel with the official Autoplay plugin. It owns the slide track, prev/next arrow buttons, and dot indicators. The existing Server Component page (`app/[locale]/page.tsx`) renders it in place of the old grid, keeping the section heading/copy in the page itself.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict mode, Tailwind CSS v4, `embla-carousel-react` + `embla-carousel-autoplay`.

## Global Constraints

- Absolute imports only: use `@/components/...`, never relative `../` paths (per `CLAUDE.md`).
- 2-space indentation.
- PascalCase component filenames (`SanctuaryCarousel.tsx`).
- No test runner is configured in this repo — verification is manual via `npm run dev` + browser, plus `npm run lint` and `npm run build` (both must pass before considering a task/PR done).
- Follow Conventional Commits (`feat:`, `fix:`, etc.) for every commit.
- Brand colors are accessed via bracket-notation Tailwind classes (e.g. `bg-[#5b6d65]`) — match this pattern, don't introduce new CSS variables for this feature.
- Design spec for this feature: `docs/superpowers/specs/2026-08-10-sanctuary-preview-carousel-design.md`. Read it first if anything below is ambiguous.

## File Structure

- **Create** `components/SanctuaryCarousel.tsx` — the entire carousel: slide data, Embla setup, autoplay, arrows, dots. Self-contained; the only thing the page passes in is nothing (no props) — it's a fixed set of 9 known images.
- **Modify** `app/[locale]/page.tsx` — add the import, delete the now-unused `galleryImages` array, replace the old grid's JSX with `<SanctuaryCarousel />`.
- **Modify** `package.json` / `package-lock.json` — add `embla-carousel-react` and `embla-carousel-autoplay` as dependencies (via `npm install`, not hand-edited).

No other files change. This is a single self-contained unit of work — one task list, no sub-project split needed.

---

### Task 1: Install carousel dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: the `embla-carousel-react` (`useEmblaCarousel` hook) and `embla-carousel-autoplay` (default export `Autoplay`) packages, consumed by Task 2.

- [ ] **Step 1: Install the packages**

Run:
```bash
npm install embla-carousel-react embla-carousel-autoplay
```

- [ ] **Step 2: Verify they were added**

Run: `grep -n "embla-carousel" package.json`
Expected: two lines, one for `embla-carousel-react`, one for `embla-carousel-autoplay`, both under `"dependencies"`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add embla-carousel for sanctuary preview carousel"
```

---

### Task 2: Build the SanctuaryCarousel component

**Files:**
- Create: `components/SanctuaryCarousel.tsx`

**Interfaces:**
- Consumes: `useEmblaCarousel` from `embla-carousel-react`, `Autoplay` (default export) from `embla-carousel-autoplay`, `Image` from `next/image`.
- Produces: `export default function SanctuaryCarousel()` — a zero-prop component, consumed by Task 3.

This component must be a Client Component (`"use client"`) because it uses React hooks (`useState`, `useEffect`, `useCallback`) and Embla's imperative API.

**Known gotcha (do this from the start, don't rediscover it):** Embla positions off-screen slides with a CSS transform, not by removing/reflowing them, so `next/image`'s default `loading="lazy"` (which relies on `IntersectionObserver`) never fires for any slide beyond the first — those images silently never load, even after navigating to them. Set `loading="eager"` on every slide's `<Image>` (in addition to `priority` on just the first slide) to avoid this.

- [ ] **Step 1: Create the component file**

```tsx
"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

type SanctuarySlide = {
  src: string;
  alt: string;
  label: string;
};

const slides: SanctuarySlide[] = [
  {
    src: "/images/sanctuary_preview/front.png",
    alt: "WANAKA Sanctuary storefront entrance",
    label: "Sanctuary Entrance",
  },
  {
    src: "/images/sanctuary_preview/middle_3.png",
    alt: "Reception desk and welcoming lounge inside WANAKA Sanctuary",
    label: "Reception Lounge",
  },
  {
    src: "/images/sanctuary_preview/middle_1.png",
    alt: "Arched wood corridor leading through the sanctuary",
    label: "Sanctuary Corridor",
  },
  {
    src: "/images/sanctuary_preview/middle_2.png",
    alt: "Wanaka-branded lounge seating with mirror arches",
    label: "Wanaka Lounge",
  },
  {
    src: "/images/sanctuary_preview/middle_4.png",
    alt: "Wellness corner with product shelving and mural arch",
    label: "Wellness Corner",
  },
  {
    src: "/images/sanctuary_preview/consult_room.png",
    alt: "Private consultation room with treatment chair",
    label: "Consultation Room",
  },
  {
    src: "/images/sanctuary_preview/wanaka_room.png",
    alt: "Twin treatment beds in a WANAKA treatment suite",
    label: "Treatment Suite",
  },
  {
    src: "/images/sanctuary_preview/vip_room.png",
    alt: "VIP relaxation room with reclining chairs facing the garden",
    label: "VIP Relaxation Room",
  },
  {
    src: "/images/sanctuary_preview/vip2.png",
    alt: "VIP lounge sofa beneath the WANAKA mural wall",
    label: "VIP Lounge",
  },
];

export default function SanctuaryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="mt-12">
      <div className="relative">
        <div className="overflow-hidden rounded-[32px]" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div key={slide.src} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative h-80 border border-white/50 bg-white/60 shadow-lg shadow-[#d6c8b2]/30 sm:h-96">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    loading="eager"
                    priority={slide === slides[0]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-lg font-semibold">{slide.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2f3a36] shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2f3a36] shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? "w-6 bg-[#5b6d65]"
                : "w-2.5 bg-[#c2b8a3] hover:bg-[#a99f8c]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file type-checks in isolation**

Run: `npx tsc --noEmit`
Expected: no errors referencing `components/SanctuaryCarousel.tsx` (errors in unrelated pre-existing files, if any, are not your concern).

- [ ] **Step 3: Commit**

```bash
git add components/SanctuaryCarousel.tsx
git commit -m "feat: add SanctuaryCarousel component"
```

---

### Task 3: Integrate the carousel into the landing page

**Files:**
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SanctuaryCarousel` default export from Task 2 (`@/components/SanctuaryCarousel`).

- [ ] **Step 1: Add the import**

Find the existing import block near the top of `app/[locale]/page.tsx`:

```tsx
import GoogleReviews from '@/components/GoogleReviews';
import LocationMap from '@/components/LocationMap';
```

Change it to:

```tsx
import GoogleReviews from '@/components/GoogleReviews';
import LocationMap from '@/components/LocationMap';
import SanctuaryCarousel from '@/components/SanctuaryCarousel';
```

- [ ] **Step 2: Delete the now-unused `galleryImages` array**

Find and delete this block (it sits above the component function, near other content arrays like `serviceCategories`):

```tsx
const galleryImages = [
  {
    src: '/images/v2/lobby.jpg',
    alt: 'Ambient view of the WANAKA lounge with curved seating',
    label: 'Lounge Glow',
  },
  {
    src: '/images/v2/family_living_room.jpg',
    alt: 'Calm corner featuring tea ritual and botanical accents',
    label: 'Calm Corners',
  },
  {
    src: '/images/v2/outside.jpg',
    alt: 'Perspective down the sanctuary wellness wing',
    label: 'Wellness Wing',
  },
];
```

- [ ] **Step 3: Replace the grid markup with the carousel**

Find this block, inside the "Sanctuary Preview" `<section>` (identifiable by the heading text "A glimpse into the rituals we are crafting for you." directly above it):

```tsx
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="group relative h-80 overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-lg shadow-[#d6c8b2]/30 sm:h-96"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/50 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-semibold">{image.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
```

Replace it with:

```tsx
          <SanctuaryCarousel />
        </section>
```

(The section's opening tag, heading, and the "Sanctuary Preview" eyebrow text above it are untouched — only the grid `<div>` is swapped for `<SanctuaryCarousel />`.)

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: `0 errors` (pre-existing warnings for `multiSensoryJourney` / `immersiveDetails` unused vars, if present, are unrelated to this change and can be ignored).

- [ ] **Step 5: Verify the production build passes**

Run: `npm run build`
Expected: build completes with `✓ Compiled successfully` and no errors.

- [ ] **Step 6: Commit**

```bash
git add app/\[locale\]/page.tsx
git commit -m "feat: replace sanctuary preview grid with carousel"
```

---

### Task 4: Manual verification in the browser

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Load the page and scroll to the section**

Open `http://localhost:3000/en` in a browser and scroll to the "Sanctuary Preview" section (below "A multi-sensory journey that lingers long after you leave.").

Expected: the first slide ("Sanctuary Entrance") is visible, full-bleed, `h-80`/`sm:h-96`, rounded corners, with a bottom gradient overlay and the label "Sanctuary Entrance" in white text. Left/right circular arrow buttons are visible. Below the image, 9 dot indicators are visible, with the first one wider/highlighted.

- [ ] **Step 3: Verify autoplay**

Wait ~5-6 seconds without touching anything.

Expected: the carousel automatically advances to the second slide ("Reception Lounge"), and the second dot becomes highlighted.

- [ ] **Step 4: Verify manual arrow navigation**

Click the right arrow twice, then the left arrow once.

Expected: each click advances/retreats exactly one slide, the label text and highlighted dot update to match, and autoplay pauses/doesn't fight the manual navigation.

- [ ] **Step 5: Verify dot navigation and confirm all images load**

Click the last (9th) dot directly.

Expected: the carousel jumps straight to the last slide ("VIP Lounge") and the image is fully visible immediately (not a blank/white slide). This confirms the `loading="eager"` fix from Task 2 is in place — if you see a blank slide here, re-check that `loading="eager"` wasn't dropped from the `<Image>` in `components/SanctuaryCarousel.tsx`.

- [ ] **Step 6: Verify swipe (mobile viewport)**

Resize the browser to a mobile width (e.g. 390px) or use device emulation, then swipe/drag left and right across the carousel image.

Expected: dragging changes slides smoothly, matching direction of the drag.

- [ ] **Step 7: Stop the dev server**

Press `Ctrl+C` in the terminal running `npm run dev`.

---

## Self-Review Notes

- **Spec coverage:** every requirement in `docs/superpowers/specs/2026-08-10-sanctuary-preview-carousel-design.md` — Embla + Autoplay, derived labels, autoplay-with-pause-on-hover, arrows, dots, full replacement of the old 3-image grid — is implemented in Task 2 and wired in Task 3.
- **No placeholders:** all code blocks are complete, runnable, and match a version of this component already manually verified working in a live browser (autoplay, arrows, dots, and all 9 images loading were confirmed).
- **Type consistency:** `SanctuaryCarousel` is a zero-prop, zero-argument component throughout — no signature drift between tasks.
