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
  description?: string;
};

type Cluster = {
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

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aestheticPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function AestheticPage({ params }: Props) {
  const { locale } = await params;

  const tPage = await getTranslations({ locale, namespace: 'aestheticPage' });
  const tServices = await getTranslations({ locale, namespace: 'servicesPage' });

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
