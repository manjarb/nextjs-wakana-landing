# Homepage Review Section Order Design

## Goal

Move the existing video Review section so it appears directly above the Guest Experiences section on the localized homepage.

## Design

Physically move the existing `<section id="review">` JSX block in `app/[locale]/page.tsx`. Its new position will be immediately after the Sanctuary Preview section (`#space`) and immediately before the Guest Experiences section (`#reviews`).

The section's content, styling, responsive behavior, IDs, links, videos, translations, and analytics event names will remain unchanged. Physically reordering the JSX ensures the visual order, document order, keyboard navigation order, and screen-reader reading order stay aligned.

## Scope

- Change only the homepage section order.
- Preserve all unrelated uncommitted work already present in the repository.
- Do not change navigation anchors or localized messages.

## Verification

- Confirm `#review` occurs immediately before `#reviews` in the rendered JSX structure.
- Run `npm run lint`.
- Run `npm run build`.
