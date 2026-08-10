# Space Navigation Design

## Goal

Make the desktop and mobile **Space** header links scroll to the homepage's **Sanctuary Preview** section.

## Design

- Keep the existing `/#space` destinations in `SiteHeader` unchanged so navigation continues to work from both the homepage and internal pages.
- Add `id="space"` to the Sanctuary Preview `<section>` on the localized homepage.
- Add a Tailwind scroll-margin utility to the section so its heading remains visible below the sticky site header after anchor navigation.
- Use native URL-fragment navigation. No client-side scroll handler or new dependency is needed.

## Verification

- Add a focused source-level regression check that confirms the homepage section exposes the `space` anchor and the header continues to target `/#space` for desktop and mobile navigation.
- Run lint and the production build to catch TypeScript, rendering, and framework integration regressions.

## Scope

No copy, layout, carousel behavior, or unrelated navigation destinations will change.
