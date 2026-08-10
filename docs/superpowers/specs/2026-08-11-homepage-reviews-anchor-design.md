# Homepage Reviews Anchor Design

## Goal

Make homepage links to `#reviews` land on the video Review section rather than the Guest Experiences section.

## Design

Change the video Review section ID from `review` to `reviews`. Remove `id="reviews"` from the Guest Experiences section so the page continues to contain exactly one `reviews` ID.

Keep the current section order, content, styling, translations, videos, links, and analytics unchanged. Existing navigation links that target `/#reviews` will then resolve to the video Review section.

## Scope

- Modify only the two homepage section opening tags in `app/[locale]/page.tsx`.
- Do not add a replacement anchor to Guest Experiences.
- Preserve all unrelated uncommitted work.

## Verification

- Confirm `id="reviews"` occurs exactly once in the homepage source.
- Confirm that occurrence belongs to the video Review section and precedes Guest Experiences.
- Run `npm run lint` and `npm run build`.
