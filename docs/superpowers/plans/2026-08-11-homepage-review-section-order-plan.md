# Homepage Review Section Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the existing video Review section directly above the Guest Experiences section on the localized homepage.

**Architecture:** Reorder the existing JSX section blocks in the homepage component so DOM order matches visual and assistive-technology reading order. Preserve every attribute and child within the moved Review section.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, next-intl

## Global Constraints

- Change only the homepage section order.
- Preserve all unrelated uncommitted work already present in the repository.
- Do not change navigation anchors or localized messages.
- Do not add dependencies.

---

### Task 1: Reorder the Homepage Sections

**Files:**
- Modify: `app/[locale]/page.tsx:588-754`

**Interfaces:**
- Consumes: Existing `<section id="review">`, `<section id="space">`, and `<section id="reviews">` JSX blocks.
- Produces: Homepage JSX ordered as `#space`, `#review`, then `#reviews`.

- [ ] **Step 1: Record the current structural order**

Run:

```bash
rg -n 'id="(review|space|reviews)"' 'app/[locale]/page.tsx'
```

Expected before the edit: `review` appears before `space`, and `space` appears before `reviews`.

- [ ] **Step 2: Move the existing Review block**

In `app/[locale]/page.tsx`, remove the complete `<section id="review">...</section>` block from its current position after `#about` and insert that unchanged block after the closing tag of `#space` and before the opening tag of `#reviews`.

The resulting structure must be:

```tsx
<section id="space" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-24 lg:py-28">
  {/* existing Sanctuary Preview content */}
</section>

<section id="review" className="border-y border-[#d6c8b2]/50 bg-[#5b6d65]">
  {/* existing Review content, unchanged */}
</section>

<section id="reviews" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
  {/* existing Guest Experiences content */}
</section>
```

- [ ] **Step 3: Verify structural order and patch scope**

Run:

```bash
rg -n 'id="(review|space|reviews)"' 'app/[locale]/page.tsx'
git diff --check -- 'app/[locale]/page.tsx'
git diff -- 'app/[locale]/page.tsx'
```

Expected: `space` appears before `review`, `review` appears immediately before `reviews`, there are no whitespace errors, and the diff preserves all unrelated pre-existing homepage edits.

- [ ] **Step 4: Run project verification**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit successfully.

- [ ] **Step 5: Commit only the section reorder**

Stage only the exact moved lines from `app/[locale]/page.tsx`, without staging unrelated edits already in that file, then run:

```bash
git diff --cached --check
git commit -m "fix: reorder homepage review sections"
```

Expected: the commit contains only the relocation of the unchanged `#review` block.
