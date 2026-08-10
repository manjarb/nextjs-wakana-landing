# Sanctuary Preview Carousel — Design

## Purpose

The "Sanctuary Preview" section on the landing page (`app/[locale]/page.tsx`, "A glimpse into the rituals we are crafting for you.") currently shows a static 3-image grid using placeholder images from `public/images/v2/`. Replace it with a sliding carousel of the 9 real interior photos in `public/images/sanctuary_preview/`.

## Scope

- New Client Component: `components/SanctuaryCarousel.tsx`.
- New dependencies: `embla-carousel-react`, `embla-carousel-autoplay`.
- Replace the existing 3-image grid markup (page.tsx, the `galleryImages.map(...)` block) with `<SanctuaryCarousel />`.
- Remove the now-unused `galleryImages` array and its 3 references to `/images/v2/*`.
- Out of scope: i18n translation keys for this section (the section's heading/copy is currently hardcoded English in page.tsx, consistent with existing precedent in this section — not introducing new i18n scope here).

## Data

New array of 9 slides sourced from `public/images/sanctuary_preview/`:

| file | label |
|---|---|
| front.png | Front Entrance |
| consult_room.png | Consultation Room |
| middle_1.png | Sanctuary Corner |
| middle_2.png | Sanctuary Corner |
| middle_3.png | Sanctuary Corner |
| middle_4.png | Sanctuary Corner |
| vip_room.png | VIP Room |
| vip2.png | VIP Suite |
| wanaka_room.png | Wanaka Room |

(Middle_1–4 labels may be refined to more specific names once the images are visually reviewed during implementation, but default to "Sanctuary Corner" with distinguishing alt text.)

## Component Behavior

- Built on Embla Carousel (`embla-carousel-react`) with the official Autoplay plugin.
- One slide visible at a time, full-bleed within the section's max-width container, preserving the existing visual treatment: `h-80 sm:h-96`, `rounded-[32px]`, white/60 border, shadow, bottom gradient overlay with the label text — same look as the current gallery cards, just one-at-a-time and slidable.
- Loop: enabled (wraps from last to first slide).
- Autoplay: advances every 5s; pauses on hover/pointer interaction and resumes after a short delay following manual navigation.
- Manual controls: previous/next arrow buttons (reusing the site's existing icon/button style) plus a row of dot indicators below the carousel; clicking a dot jumps to that slide.
- Keyboard/swipe: Embla's built-in drag/swipe support covers touch and mouse-drag; no extra work needed.

## Integration

- `page.tsx` section at the current `galleryImages.map(...)` block (~line 744–775) is replaced with:
  ```tsx
  <SanctuaryCarousel />
  ```
  wrapped by the same section header ("Sanctuary Preview" / "A glimpse into the rituals we are crafting for you.") which stays in `page.tsx`.
- `SanctuaryCarousel` owns only the slide track, controls, and indicators — the section heading stays outside it so `page.tsx` keeps controlling section-level layout/copy.

## Testing

- No test runner configured in this repo (per CLAUDE.md). Verify manually via `npm run dev`: confirm autoplay advances, arrows/dots navigate, swipe works on mobile viewport, images load correctly, and `npm run build` / `npm run lint` pass.
