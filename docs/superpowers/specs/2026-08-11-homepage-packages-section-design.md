# Homepage Packages Section Design

## Goal

Add a dedicated Packages section to the localized homepage so visitors can view the three supplied promotional artworks, and make the desktop and mobile header package navigation scroll directly to it.

## Placement and structure

- Insert the section immediately after the existing Services section.
- Give the section the stable anchor `packages`.
- Add a localized section heading and one short localized introductory sentence.
- Display the artwork in this order:
  1. Mom Morning Escape
  2. Active Balance
  3. Jet Lag Recovery

## Visual design

Use a restrained editorial gallery that fits the homepage's existing warm sanctuary palette. From the medium breakpoint upward, place the artworks in two equal-width columns aligned along their top edges. The third artwork starts a second row aligned to the left, creating a simple 2+1 layout. Preserve each source image's full aspect ratio; the square Active Balance artwork will therefore end higher than the adjacent portrait artwork.

On small screens, stack the artworks vertically at full available width. Give each image a subtle border and soft corner radius consistent with the existing interface. Do not place titles, descriptions, prices, or buttons beneath the artwork because that information is already embedded in the supplied creative.

## Components and data

Keep the package metadata close to the homepage section as a small static array containing image path, intrinsic dimensions, and translation key for alternative text. Render with `next/image` so the browser receives responsive image sizing and the layout reserves the correct space before images load.

The section itself remains a Server Component. No state, effects, carousel dependency, or new package is needed.

## Localization and accessibility

Add the heading, introduction, and descriptive image alternative text to both `messages/en.json` and `messages/th.json`. Alternative text should identify each promotional artwork and its package name without attempting to transcribe every word embedded in the image.

## Navigation

Update the Packages link in the desktop dropdown trigger, every desktop package dropdown item, the mobile Packages parent link, and every mobile package child link from `/#services` to `/#packages`. Existing localized routing behavior remains unchanged.

## Responsive behavior

- Mobile: one column, full-width artwork, natural aspect ratios.
- Medium and larger screens: two equal-width columns, top aligned, natural aspect ratios; the third artwork starts a second row aligned left.
- No cropping or fixed-height containers.

## Verification

Because the repository has no configured test runner, use a lightweight source-level regression check that initially fails until the Packages anchor, artwork paths, and updated header targets exist. Then run:

- the focused regression check;
- `npm run lint`;
- `npm run build`.

Finally, inspect the rendered homepage at desktop and mobile widths if the local browser tooling is available, checking artwork legibility, spacing, anchor behavior, and absence of horizontal overflow.

## Out of scope

- New package detail pages.
- Booking buttons or click tracking on the artwork.
- A carousel or modal viewer.
- Editing or translating text embedded inside the supplied artwork files.
