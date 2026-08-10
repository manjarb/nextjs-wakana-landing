# Space Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every homepage header **Space** link navigate to the **Sanctuary Preview** section without placing its heading beneath the sticky header.

**Architecture:** Preserve the localized `Link` destinations already defined in `SiteHeader` and expose their `space` URL fragment on the homepage section. Use native fragment navigation plus CSS scroll margin, keeping the behavior server-rendered and dependency-free.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, next-intl

## Global Constraints

- Keep the existing `/#space` destinations in `SiteHeader` unchanged.
- Use native URL-fragment navigation; do not add client-side scrolling code or dependencies.
- Do not change copy, layout, carousel behavior, or unrelated navigation destinations.

---

### Task 1: Connect Space Navigation to Sanctuary Preview

**Files:**
- Modify: `app/[locale]/page.tsx:727`

**Interfaces:**
- Consumes: Desktop and mobile header links whose localized destination is `/#space`.
- Produces: A homepage `<section id="space">` target with sticky-header scroll offset.

- [ ] **Step 1: Verify the current behavior fails**

Start the development server:

```bash
npm run dev
```

Request a localized homepage and inspect the rendered Sanctuary Preview section in the browser. Click the desktop or mobile **Space** link. Expected before implementation: the URL receives `#space`, but the page does not land on Sanctuary Preview because no element exposes `id="space"`.

- [ ] **Step 2: Add the minimal anchor target and offset**

Change the Sanctuary Preview section opening tag in `app/[locale]/page.tsx` to:

```tsx
<section id="space" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-24 lg:py-28">
```

The `id` fulfills the existing navigation contract. `scroll-mt-24` reserves 6rem above the section when the browser resolves the fragment so the sticky header does not cover the section heading.

- [ ] **Step 3: Verify the browser behavior passes**

Reload the localized homepage, move away from Sanctuary Preview, and click **Space** in both desktop and mobile navigation. Expected after implementation: each link lands on Sanctuary Preview, the URL contains `#space`, and the section heading remains visible below the sticky header.

- [ ] **Step 4: Run static verification**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit successfully without new errors.

- [ ] **Step 5: Commit the focused implementation**

```bash
git add 'app/[locale]/page.tsx'
git commit -m "fix: link space navigation to sanctuary preview"
```
