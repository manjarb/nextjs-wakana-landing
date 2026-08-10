# Sanctuary Carousel Three-Card Layout — Design

## Purpose

Update the homepage “Sanctuary Preview” carousel so visitors can see more of the sanctuary at once without making the mobile layout cramped.

## Responsive behavior

- Below the `sm` breakpoint, show one image at a time.
- At the `sm` breakpoint and above, show three images side by side.
- Keep a small, consistent gutter between visible cards.
- Preserve the existing image height, captions, gradient treatment, rounded container, and brand styling.

## Carousel behavior

- Keep all nine existing images as individual Embla slides.
- Advance one image per autoplay interval, arrow click, dot click, or swipe snap.
- Preserve looping, five-second autoplay, hover pause, arrow controls, and swipe/drag support.
- Keep one navigation dot per image. The active dot represents Embla’s current leading snap.

## Implementation

Make a focused change in `components/SanctuaryCarousel.tsx`:

- Change each slide from full track width at every breakpoint to full width by default and one-third width from `sm` upward.
- Add track/card spacing without changing the carousel’s data or state model.
- Update the `next/image` `sizes` hint to reflect one full-width mobile image and three desktop images.

No new dependencies, translation changes, or unrelated refactoring are in scope.

## Verification

- Confirm one image is visible below `sm` and three are visible at and above `sm`.
- Confirm arrows, dots, autoplay, looping, and swipe advance one image at a time.
- Run `npm run lint` and `npm run build`.
