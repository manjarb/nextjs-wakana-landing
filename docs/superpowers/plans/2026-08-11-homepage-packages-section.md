# Homepage Packages Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an artwork-only Packages gallery immediately after homepage Services and point all header package navigation to it.

**Architecture:** Keep static package image metadata and rendering in the existing localized Server Component homepage. Add locale strings to the consolidated message files, and update the existing desktop and mobile package navigation targets. Verify through lint, production build, and rendered browser inspection because no UI test runner is configured.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, next-intl, Tailwind CSS v4, Node.js assertions

## Global Constraints

- Preserve each package artwork's complete natural aspect ratio; do not crop it.
- Render one column on mobile and three top-aligned equal-width columns from the medium breakpoint.
- Do not add package copy or controls below the supplied artwork.
- Keep English and Thai content in `messages/en.json` and `messages/th.json`.
- Do not add dependencies or Client Component state.
- Preserve unrelated uncommitted changes in every touched file.

---

### Task 1: Packages gallery and localized content

**Files:**
- Create: `scripts/check-homepage-packages.mjs`
- Modify: `app/[locale]/page.tsx:14-43,454-465,645-727`
- Modify: `messages/en.json:49-83`
- Modify: `messages/th.json:49-83`

**Interfaces:**
- Consumes: `next/image`, `useTranslations`, and the existing homepage section conventions.
- Produces: a homepage `<section id="packages">`, translation namespace `packages`, and three responsive package images.

- [ ] **Step 1: Write the failing source regression check**

Create `scripts/check-homepage-packages.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync('app/[locale]/page.tsx', 'utf8');
const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
const th = JSON.parse(readFileSync('messages/th.json', 'utf8'));

assert.match(page, /id="packages"/, 'homepage must expose the packages anchor');
for (const asset of [
  '/images/v3/packages/Mom_Morning_Escape.png',
  '/images/v3/packages/Active_Balance.jpg',
  '/images/v3/packages/Jet_Lag_Recovery.png',
]) {
  assert.ok(page.includes(asset), `homepage must render ${asset}`);
}
assert.match(page, /md:grid-cols-3/, 'packages must use three columns at medium widths');
for (const messages of [en, th]) {
  assert.equal(typeof messages.packages?.heading, 'string');
  assert.equal(typeof messages.packages?.description, 'string');
  assert.equal(typeof messages.packages?.images?.momMorningEscape, 'string');
  assert.equal(typeof messages.packages?.images?.activeBalance, 'string');
  assert.equal(typeof messages.packages?.images?.jetLagRecovery, 'string');
}
```

- [ ] **Step 2: Run the regression check and verify RED**

Run: `node scripts/check-homepage-packages.mjs`

Expected: FAIL with `homepage must expose the packages anchor`.

- [ ] **Step 3: Add package metadata and translations**

In `app/[locale]/page.tsx`, add a `packageArtworks` constant after `serviceCategories`:

```tsx
const packageArtworks = [
  { key: 'momMorningEscape', src: '/images/v3/packages/Mom_Morning_Escape.png', width: 1122, height: 1402 },
  { key: 'activeBalance', src: '/images/v3/packages/Active_Balance.jpg', width: 1280, height: 1280 },
  { key: 'jetLagRecovery', src: '/images/v3/packages/Jet_Lag_Recovery.png', width: 1122, height: 1402 },
] as const;
```

Add `const tPackages = useTranslations('packages');` inside `HomePage`.

Add this root namespace to `messages/en.json`:

```json
"packages": {
  "heading": "Packages",
  "description": "Thoughtfully paired rituals for the moments when you need a deeper reset.",
  "images": {
    "momMorningEscape": "Mom Morning Escape package artwork",
    "activeBalance": "Active Balance Program package artwork",
    "jetLagRecovery": "Jet Lag Recovery Rituals package artwork"
  }
}
```

Add this root namespace to `messages/th.json`:

```json
"packages": {
  "heading": "แพคเกจ",
  "description": "ชุดริทชวลที่คัดสรรมาอย่างใส่ใจ สำหรับช่วงเวลาที่ร่างกายและใจต้องการการฟื้นฟูอย่างล้ำลึก",
  "images": {
    "momMorningEscape": "อาร์ตเวิร์กแพคเกจ Mom Morning Escape",
    "activeBalance": "อาร์ตเวิร์กแพคเกจ Active Balance Program",
    "jetLagRecovery": "อาร์ตเวิร์กแพคเกจ Jet Lag Recovery Rituals"
  }
}
```

- [ ] **Step 4: Render the gallery immediately after Services**

Insert after the closing Services section and before `#space`:

```tsx
<section id="packages" className="scroll-mt-24 border-y border-[#d6c8b2]/50 bg-white/60">
  <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold text-[#2f3a36] sm:text-4xl">
        {tPackages('heading')}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-[#52635d]">
        {tPackages('description')}
      </p>
    </div>
    <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
      {packageArtworks.map((artwork) => (
        <div key={artwork.key} className="overflow-hidden rounded-[28px] border border-[#d6c8b2]/60 bg-white shadow-sm shadow-[#d6c8b2]/20">
          <Image
            src={artwork.src}
            alt={tPackages(`images.${artwork.key}`)}
            width={artwork.width}
            height={artwork.height}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Run the regression check and verify GREEN**

Run: `node scripts/check-homepage-packages.mjs`

Expected: exits successfully with no output.

- [ ] **Step 6: Commit the gallery change**

```bash
git add scripts/check-homepage-packages.mjs app/[locale]/page.tsx messages/en.json messages/th.json
git commit -m "feat: add homepage packages gallery"
```

---

### Task 2: Header package anchor navigation

**Files:**
- Modify: `scripts/check-homepage-packages.mjs`
- Modify: `components/SiteHeader.tsx:37-48`
- Modify: `components/PackagesDropdown.tsx:18-44`

**Interfaces:**
- Consumes: homepage anchor `/#packages` produced by Task 1.
- Produces: desktop and mobile package navigation whose parent and child links all target `/#packages`.

- [ ] **Step 1: Extend the regression check for header navigation**

Append to `scripts/check-homepage-packages.mjs`:

```js
const siteHeader = readFileSync('components/SiteHeader.tsx', 'utf8');
const packagesDropdown = readFileSync('components/PackagesDropdown.tsx', 'utf8');

assert.ok(!siteHeader.includes("href: '/#services'"), 'mobile package links must not target services');
assert.equal((siteHeader.match(/href: '\/#packages'/g) ?? []).length, 4);
assert.ok(!packagesDropdown.includes('href="/#services"'), 'desktop package links must not target services');
assert.equal((packagesDropdown.match(/href="\/#packages"/g) ?? []).length, 2);
```

- [ ] **Step 2: Run the regression check and verify RED**

Run: `node scripts/check-homepage-packages.mjs`

Expected: FAIL with `mobile package links must not target services`.

- [ ] **Step 3: Update mobile and desktop package targets**

In `components/SiteHeader.tsx`, change all four package-related `/#services` values—the three children and the parent—to `/#packages`.

In `components/PackagesDropdown.tsx`, change the trigger and mapped item `href` values from `/#services` to `/#packages`.

- [ ] **Step 4: Run the regression check and verify GREEN**

Run: `node scripts/check-homepage-packages.mjs`

Expected: exits successfully with no output.

- [ ] **Step 5: Commit the navigation change**

```bash
git add scripts/check-homepage-packages.mjs components/SiteHeader.tsx components/PackagesDropdown.tsx
git commit -m "fix: link package navigation to homepage gallery"
```

---

### Task 3: Full verification and visual QA

**Files:**
- Verify: `app/[locale]/page.tsx`
- Verify: `components/SiteHeader.tsx`
- Verify: `components/PackagesDropdown.tsx`
- Verify: `messages/en.json`
- Verify: `messages/th.json`

**Interfaces:**
- Consumes: completed gallery and navigation changes from Tasks 1 and 2.
- Produces: verified responsive and production-ready homepage behavior.

- [ ] **Step 1: Run automated verification**

Run:

```bash
node scripts/check-homepage-packages.mjs
npm run lint
npm run build
```

Expected: all commands exit 0 without new errors.

- [ ] **Step 2: Start the development server**

Run: `npm run dev`

Expected: Next.js reports the local URL and accepts requests.

- [ ] **Step 3: Inspect English and Thai desktop pages**

Open `/en` and `/th` at approximately 1440px width. Confirm the Packages section follows Services, shows three top-aligned columns with complete uncropped artwork, uses localized heading/copy/alt text, and every desktop Packages dropdown link scrolls to the section.

- [ ] **Step 4: Inspect a mobile viewport**

Open `/en` at approximately 390px width. Confirm the artworks stack in one column, retain their natural aspect ratios, remain legible without horizontal overflow, and all mobile Packages parent/child links close the menu and scroll to the section.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only intended feature files and the user's pre-existing changes are present.
