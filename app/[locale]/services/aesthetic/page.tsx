import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';
import TrackedLink from '@/components/TrackedLink';

type Props = {
  params: Promise<{ locale: string }>;
};

type MenuItem = {
  title: string;
  price?: string;
  duration?: string;
  description?: string;
};

type Cluster = {
  title: string;
  description: string;
  items: MenuItem[];
};

type RitualCollection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: MenuItem[];
};

type SectionMeta = {
  eyebrow: string;
  title: string;
  intro?: string;
  description?: string;
};

type ContactSection = {
  disclaimer: string;
};

const BOOK_HREF =
  'https://lin.ee/SSGzTmt?utm_source=website&utm_medium=aesthetic_page&utm_campaign=book_ritual';

const facialTreatmentImages = [
  '/images/services/aesthetic/facial-treatments/1.webp',
  '/images/services/aesthetic/facial-treatments/2.webp',
];

const facialRoomImage = {
  src: '/images/rooms/wanaka-room-2.webp',
  alt: 'Facial treatment room at WANAKA Sanctuary',
};

const injectableImages = [
  {
    src: '/images/services/aesthetic/injectable-treatments/1.webp',
    alt: 'Injectable treatment consultation at WANAKA Sanctuary',
  },
  {
    src: '/images/services/aesthetic/injectable-treatments/2.webp',
    alt: 'Precision injectable treatment at WANAKA Sanctuary',
  },
  {
    src: '/images/services/aesthetic/injectable-treatments/3.webp',
    alt: 'Aesthetic injectable treatment at WANAKA Sanctuary',
  },
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aestheticPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function AestheticPage({ params }: Props) {
  const { locale } = await params;

  const tPage = await getTranslations({ locale, namespace: 'aestheticPage' });
  const tServices = await getTranslations({ locale, namespace: 'servicesPage' });
  const tNav = await getTranslations({ locale, namespace: 'navigation.dropdown' });

  const ritualCollections = tServices.raw('ritualCollections') as RitualCollection[];
  const facialTreatments = ritualCollections.filter((collection) =>
    ['facial-treatment', 'other-facial-treatment'].includes(collection.id),
  );
  const skinBooster = tServices.raw('skinBooster') as SectionMeta;
  const premiumSkinBoosters = tServices.raw('premiumSkinBoosters') as MenuItem[];
  const everydaySkinBoosters = tServices.raw('everydaySkinBoosters') as Cluster[];
  const aestheticTreatment = tServices.raw('aestheticTreatment') as SectionMeta;
  const aestheticTreatments = tServices.raw('aestheticTreatments') as MenuItem[];
  const contact = tServices.raw('contact') as ContactSection;

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#2f3a36]">
      <SiteHeader />

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-14 lg:pt-12 lg:pb-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#6f7b7a]">
          <Link href="/services" className="transition hover:text-[#5b6d65]">
            {tPage('hero.breadcrumb')}
          </Link>
          <span>/</span>
          <span className="text-[#2f3a36]">{tPage('hero.eyebrow')}</span>
        </nav>
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
            {tPage('hero.eyebrow')}
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-[#2f3a36] sm:text-5xl">
            {tPage('hero.title')}
          </h1>
          <p className="text-base leading-relaxed text-[#52635d] sm:text-lg">
            {tPage('hero.description')}
          </p>
        </div>
      </div>

      {/* Skin Booster section */}
      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-20">

        {/* Facial Treatments section */}
        <div id="facial-treatments">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
              {tNav('facialTreatments')}
            </h2>
            <div className="h-px flex-1 bg-[#d6c8b2]/60" />
          </div>

          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#f0ebe0] shadow-sm shadow-[#d6c8b2]/20 lg:aspect-[16/7]">
            <Image
              src={facialRoomImage.src}
              alt={facialRoomImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1120px, 92vw"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {facialTreatmentImages.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ebe0] shadow-sm shadow-[#d6c8b2]/20"
                >
                  <Image
                    src={image}
                    alt={`Facial treatment at WANAKA Sanctuary ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 92vw"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-8">
              {facialTreatments.map((collection) => (
                <section key={collection.id}>
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5b6d65]">
                      {collection.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#2f3a36] sm:text-2xl">
                      {collection.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52635d]">
                      {collection.description}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {collection.items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-[#d6c8b2]/50 bg-white/70 px-5 py-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-[#2f3a36]">{item.title}</p>
                          <div className="flex shrink-0 flex-wrap gap-2">
                            {item.duration && (
                              <span className="rounded-full bg-[#f7f2e8] px-3 py-1 text-xs font-medium text-[#6f7b7a]">
                                {item.duration}
                              </span>
                            )}
                            {item.price && (
                              <span className="rounded-full bg-[#f0ebe0] px-3 py-1 text-xs font-medium text-[#5b6d65]">
                                {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <p className="mt-2 text-sm leading-relaxed text-[#52635d]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div id="skin-booster">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
              {skinBooster.eyebrow}
            </h2>
            <div className="h-px flex-1 bg-[#d6c8b2]/60" />
          </div>

          <div className="mb-3">
            <p className="text-xl font-semibold text-[#2f3a36] sm:text-2xl">{skinBooster.title}</p>
            {skinBooster.intro && (
              <p className="mt-2 text-sm leading-relaxed text-[#52635d]">{skinBooster.intro}</p>
            )}
          </div>

        </div>

        {/* Premium boosters */}
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#5b6d65]">
            Premium
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {premiumSkinBoosters.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-[#d6c8b2]/60 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#2f3a36]">{item.title}</h3>
                  {item.price && (
                    <span className="shrink-0 rounded-full bg-[#f0ebe0] px-3 py-1 text-xs font-medium text-[#5b6d65]">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm leading-relaxed text-[#52635d]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Everyday boosters */}
        <div className="space-y-10">
          {everydaySkinBoosters.map((cluster) => (
            <div key={cluster.title}>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5b6d65]">
                  {cluster.title}
                </p>
                {cluster.description && (
                  <p className="mt-1 text-sm text-[#6f7b7a]">{cluster.description}</p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {cluster.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[#d6c8b2]/50 bg-white/70 px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#2f3a36]">{item.title}</p>
                      {item.description && (
                        <p className="mt-1 text-xs leading-relaxed text-[#6f7b7a]">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="shrink-0 rounded-full bg-[#f0ebe0] px-3 py-1 text-xs font-medium text-[#5b6d65]">
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Injectable / Medical Aesthetic section */}
        <div id="injectables">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
              {aestheticTreatment.eyebrow}
            </h2>
            <div className="h-px flex-1 bg-[#d6c8b2]/60" />
          </div>

          <p className="mb-6 text-xl font-semibold text-[#2f3a36] sm:text-2xl">
            {aestheticTreatment.title}
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {injectableImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ebe0] shadow-sm shadow-[#d6c8b2]/20"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 30vw, 92vw"
                />
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#d6c8b2]/60 bg-white/80">
            {aestheticTreatments.map((item, i) => (
              <div
                key={item.title}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < aestheticTreatments.length - 1 ? 'border-b border-[#d6c8b2]/40' : ''
                }`}
              >
                <span className="text-sm font-medium text-[#2f3a36]">{item.title}</span>
                {item.price && (
                  <span className="text-sm font-semibold text-[#5b6d65]">{item.price}</span>
                )}
              </div>
            ))}
          </div>

          {contact.disclaimer && (
            <p className="mt-4 text-xs leading-relaxed text-[#6f7b7a]">{contact.disclaimer}</p>
          )}
        </div>
      </div>

      {/* CTA strip */}
      <div className="border-t border-[#d6c8b2]/40 bg-[#f0ebe0] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-lg font-semibold text-[#2f3a36]">
              Ready to book your ritual?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={BOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#5b6d65] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#2f3a36]"
                eventName="click_book_ritual_aesthetic_page"
              >
                {tPage('cta.enquire')}
              </TrackedLink>
              <Link
                href="/services"
                className="rounded-full border border-[#5b6d65] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white"
              >
                ← {tPage('cta.allServices')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#d6c8b2]/40 py-8 text-center text-sm text-[#6f7b7a]">
        <p>© 2025 Wanaka Sanctuary. All rights reserved.</p>
      </footer>
    </div>
  );
}
