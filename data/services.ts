// Service registry — the non-translatable structure that drives the Services
// dropdown, the /services overview grids, and the per-service landing pages.
// All human-facing copy lives in messages/{en,th}.json under the `serviceDetail`
// namespace, keyed by `slug` (mirroring the existing `servicesPage` pattern).
//
// NOTE: image paths point to checked-in public assets and are intentionally
// non-translatable; human-facing alt/copy lives in messages/{en,th}.json.

export type ServiceCategory = 'relaxation' | 'aesthetic' | 'iv';

export type ServiceEntry = {
  slug: string;
  category: ServiceCategory;
  group: string; // group id within the category (also used as a section anchor)
  image: string;
  durations?: string[]; // minutes, e.g. ['60'] or ['60', '90', '120']
  hasFullDetail: boolean; // true => render "What to expect" / "Best for" sections
};

// Ordered category list (drives the 3-block /services overview).
export const serviceCategories: ServiceCategory[] = [
  'relaxation',
  'aesthetic',
  'iv',
];

// Groups within each category, in display order. `labelKey` resolves against the
// `navigation.dropdown` namespace; `id` doubles as the section anchor on /services.
export type ServiceGroup = {
  id: string;
  category: ServiceCategory;
  labelKey: string;
};

export const serviceGroups: ServiceGroup[] = [
  // Relaxation Rituals
  { id: 'facial-massage', category: 'relaxation', labelKey: 'facialMassage' },
  { id: 'head-spa', category: 'relaxation', labelKey: 'headSpa' },
  { id: 'aroma-body', category: 'relaxation', labelKey: 'aromaBody' },
  { id: 'hand-feet', category: 'relaxation', labelKey: 'handFeet' },
  // Aesthetic Rituals
  { id: 'facial-treatments', category: 'aesthetic', labelKey: 'facialTreatments' },
  { id: 'skin-booster', category: 'aesthetic', labelKey: 'skinBooster' },
  { id: 'bio-stimulator', category: 'aesthetic', labelKey: 'bioStimulator' },
  { id: 'botox', category: 'aesthetic', labelKey: 'botox' },
  // IV Therapy
  { id: 'glow-beauty', category: 'iv', labelKey: 'glowBeautyIv' },
  { id: 'anti-aging', category: 'iv', labelKey: 'antiAgingIv' },
  { id: 'immunity-recovery', category: 'iv', labelKey: 'immunityRecoveryIv' },
  { id: 'brain-performance', category: 'iv', labelKey: 'brainPerformanceIv' },
  { id: 'lifestyle', category: 'iv', labelKey: 'lifestyleIv' },
];

export const services: ServiceEntry[] = [
  // ----- Relaxation Rituals (full landing pages) -----
  {
    slug: 'wanaka-ritual-endota-organic',
    category: 'relaxation',
    group: 'facial-massage',
    image: '/images/services/relaxation/aroma-body/facial-massage_01.webp',
    durations: ['60'],
    hasFullDetail: true,
  },
  {
    slug: 'wanaka-timeless-lift',
    category: 'relaxation',
    group: 'facial-massage',
    image: '/images/v2/facial_treatment_02.jpg',
    durations: ['90'],
    hasFullDetail: true,
  },
  {
    slug: 'deep-head-ritual',
    category: 'relaxation',
    group: 'head-spa',
    image: '/images/services/relaxation/aroma-body/deep_head_ritual_01.webp',
    durations: ['75'],
    hasFullDetail: true,
  },
  {
    slug: 'relaxation-head-spa',
    category: 'relaxation',
    group: 'head-spa',
    image: '/images/v2/relaxation_head_spa_2.jpg',
    durations: ['75'],
    hasFullDetail: true,
  },
  {
    slug: 'rest-relax-ritual',
    category: 'relaxation',
    group: 'aroma-body',
    image: '/images/services/relaxation/aroma-body/1.webp',
    durations: ['60', '90', '120'],
    hasFullDetail: true,
  },
  {
    slug: 'body-scrub',
    category: 'relaxation',
    group: 'aroma-body',
    image: '/images/services/relaxation/aroma-body/3.webp',
    durations: ['60'],
    hasFullDetail: true,
  },
  {
    slug: 'hand-feet-harmony',
    category: 'relaxation',
    group: 'hand-feet',
    image: '/images/generated/service-hand-feet-massage.png',
    durations: ['45'],
    hasFullDetail: false,
  },

  // ----- Aesthetic Rituals (short-copy landing pages) -----
  {
    slug: 'purify-facial',
    category: 'aesthetic',
    group: 'facial-treatments',
    image: '/images/services/aesthetic/facial-treatments/1.webp',
    hasFullDetail: false,
  },
  {
    slug: 'under-eye',
    category: 'aesthetic',
    group: 'facial-treatments',
    image: '/images/services/aesthetic/facial-treatments/2.webp',
    hasFullDetail: false,
  },
  {
    slug: 'v-lift',
    category: 'aesthetic',
    group: 'facial-treatments',
    image: '/images/services/aesthetic/facial-treatments/1.webp',
    hasFullDetail: false,
  },
  {
    slug: 'facial-mask',
    category: 'aesthetic',
    group: 'facial-treatments',
    image: '/images/services/aesthetic/facial-treatments/2.webp',
    hasFullDetail: false,
  },
  {
    slug: 'skin-booster',
    category: 'aesthetic',
    group: 'skin-booster',
    image: '/images/v2/drip_iv.jpg',
    hasFullDetail: false,
  },
  {
    slug: 'bio-stimulator',
    category: 'aesthetic',
    group: 'bio-stimulator',
    image: '/images/v2/drip_iv_02.jpg',
    hasFullDetail: false,
  },
  {
    slug: 'botox',
    category: 'aesthetic',
    group: 'botox',
    image: '/images/services/aesthetic/injectable-treatments/3.webp',
    hasFullDetail: false,
  },

  // ----- IV Therapy (short-copy landing pages) -----
  {
    slug: 'radiant-luxe',
    category: 'iv',
    group: 'glow-beauty',
    image: '/images/services/iv-therapy/4.webp',
    hasFullDetail: false,
  },
  {
    slug: 'soft-glow-renewal',
    category: 'iv',
    group: 'glow-beauty',
    image: '/images/services/iv-therapy/2.webp',
    hasFullDetail: false,
  },
  {
    slug: 'holistic-boost',
    category: 'iv',
    group: 'immunity-recovery',
    image: '/images/services/iv-therapy/3.webp',
    hasFullDetail: false,
  },
  {
    slug: 'immune-booster',
    category: 'iv',
    group: 'immunity-recovery',
    image: '/images/services/iv-therapy/1.webp',
    hasFullDetail: false,
  },
  {
    slug: 'vit-d',
    category: 'iv',
    group: 'immunity-recovery',
    image: '/images/services/iv-therapy/3.webp',
    hasFullDetail: false,
  },
  {
    slug: 'anti-hangover',
    category: 'iv',
    group: 'lifestyle',
    image: '/images/services/iv-therapy/1.webp',
    hasFullDetail: false,
  },
  {
    slug: 'mens-health',
    category: 'iv',
    group: 'lifestyle',
    image: '/images/services/iv-therapy/4.webp',
    hasFullDetail: false,
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceEntry[] {
  return services.filter((s) => s.category === category);
}

export function getGroupsByCategory(category: ServiceCategory): ServiceGroup[] {
  return serviceGroups.filter((g) => g.category === category);
}

// ----- Packages (scaffold; full content pending from the client) -----
export type PackageEntry = {
  slug: string;
  image: string;
};

export const packages: PackageEntry[] = [
  { slug: 'mom-morning-escape', image: '/images/v2/lobby_4.jpg' },
  { slug: 'active-recovery-ritual', image: '/images/v2/lobby_7.jpg' },
  { slug: 'jet-lag-recovery-ritual', image: '/images/v2/outside.jpg' },
];
