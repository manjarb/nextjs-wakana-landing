# Homepage Reviews Anchor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `#reviews` target the video Review section instead of Guest Experiences.

**Architecture:** Reassign the existing anchor between two adjacent homepage sections. Keep exactly one `reviews` ID and preserve every other attribute and child.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

## Global Constraints

- Modify only the two homepage section opening tags in `app/[locale]/page.tsx`.
- Do not add a replacement anchor to Guest Experiences.
- Preserve all unrelated uncommitted work.
- Do not add dependencies.

---

### Task 1: Reassign the Reviews Anchor

**Files:**
- Modify: `app/[locale]/page.tsx:741-797`

**Interfaces:**
- Consumes: Existing `/#reviews` navigation targets.
- Produces: One `id="reviews"` on the video Review section and no ID on Guest Experiences.

- [ ] **Step 1: Run a failing structural assertion**

Run a Node assertion that checks for exactly one `id="reviews"`, verifies it is on the section with the Review background class, and verifies Guest Experiences has no ID. Expected before editing: FAIL because `id="reviews"` belongs to Guest Experiences.

- [ ] **Step 2: Apply the minimal tag changes**

Change:

```tsx
<section
  id="review"
  className="border-y border-[#d6c8b2]/50 bg-[#5b6d65]"
>
```

to:

```tsx
<section
  id="reviews"
  className="border-y border-[#d6c8b2]/50 bg-[#5b6d65]"
>
```

Change:

```tsx
<section id="reviews" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
```

to:

```tsx
<section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
```

- [ ] **Step 3: Rerun the structural assertion**

Expected after editing: PASS with one `reviews` ID owned by the video Review section.

- [ ] **Step 4: Run project verification**

Run:

```bash
npm run lint
npm run build
git diff --check
```

Expected: lint has no errors, the build exits successfully, and the diff has no whitespace errors.

- [ ] **Step 5: Leave the overlapping homepage work uncommitted**

Do not stage `app/[locale]/page.tsx`, because it contains unrelated user edits. Report the verified change and its uncommitted state.
