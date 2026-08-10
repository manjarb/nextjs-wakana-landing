import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';
import TrackedLink from '@/components/TrackedLink';
import { getGroupsByCategory, services } from '@/data/services';
import type { ServiceEntry } from '@/data/services';

type Props = {
  params: Promise<{ locale: string }>;
};

type ServiceDetail = {
  title: string;
  subtitle: string;
  lead: string;
  whatToExpect?: string;
  bestFor?: string;
};

type Labels = {
  whatToExpect: string;
  bestFor: string;
  enquireOnLine: string;
  allServices: string;
};

const BOOK_HREF =
  'https://lin.ee/SSGzTmt?utm_source=website&utm_medium=relaxation_page&utm_campaign=book_ritual';

const relaxationGroupImages: Record<string, string[]> = {
};

const relaxationServiceImages: Record<string, string> = {
  'wanaka-ritual-endota-organic': '/images/v3/massage/Wanaka_x_Endota.png',
  'wanaka-timeless-lift': '/images/v3/massage/Timeless_Lift.png',
  'deep-head-ritual': '/images/v3/massage/DeepHead_Ritual.png',
  'relaxation-head-spa': '/images/v3/massage/Relaxation_Head_Spa.png',
  'rest-relax-ritual': '/images/v3/massage/Rest_Relax_ritual.png',
  'body-scrub': '/images/v3/massage/Body_Scrub.png',
};

const wanakaGuashaRitual: ServiceEntry = {
  slug: 'wanaka-guasha-ritual',
  category: 'relaxation',
  group: 'facial-massage',
  image: '/images/generated/service-facial-massage.png',
  durations: ['60'],
  hasFullDetail: false,
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'relaxationPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function RelaxationPage({ params }: Props) {
  const { locale } = await params;

  const tPage = await getTranslations({ locale, namespace: 'relaxationPage' });
  const tDetail = await getTranslations({ locale, namespace: 'serviceDetail' });
  const tNav = await getTranslations({ locale, namespace: 'navigation.dropdown' });

  const labels = tDetail.raw('labels') as Labels;
  const relaxationGroups = getGroupsByCategory('relaxation');
  const relaxationServices = services.filter((s) => s.category === 'relaxation');
  const timelessLiftIndex = relaxationServices.findIndex(
    (service) => service.slug === 'wanaka-timeless-lift',
  );
  relaxationServices.splice(timelessLiftIndex + 1, 0, wanakaGuashaRitual);

  const groupedServices = relaxationGroups.map((group) => ({
    group,
    items: relaxationServices.filter((s) => s.group === group.id),
  }));

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

      {/* Service groups */}
      <div className="mx-auto max-w-6xl space-y-20 px-6 pb-28">
        {groupedServices.map(({ group, items }) => {
          const groupLabel = tNav(group.labelKey);
          const groupImages = relaxationGroupImages[group.id] ?? [];

          return (
            <div key={group.id} id={group.id}>
              {/* Group heading */}
              <div className="mb-10 flex items-center gap-4">
                <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
                  {groupLabel}
                </h2>
                <div className="h-px flex-1 bg-[#d6c8b2]/60" />
              </div>

              {groupImages.length > 0 && (
                <div
                  className={`mb-8 grid gap-4 sm:grid-cols-2 ${
                    groupImages.length === 1
                      ? 'sm:grid-cols-1 lg:grid-cols-1'
                      : groupImages.length > 2
                        ? 'lg:grid-cols-3'
                        : 'lg:grid-cols-2'
                  }`}
                >
                  {groupImages.map((image, index) => (
                    <div
                      key={image}
                      className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#f0ebe0] shadow-sm shadow-[#d6c8b2]/20"
                    >
                      <Image
                        src={image}
                        alt={`${groupLabel} treatment at WANAKA Sanctuary ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes={
                          groupImages.length === 1
                            ? '(min-width: 1024px) 1120px, 92vw'
                            : '(min-width: 1024px) 540px, (min-width: 640px) 45vw, 92vw'
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Service entries */}
              <div className="space-y-10">
                {items.map((service) => {
                  let detail: ServiceDetail = {
                    title: service.slug,
                    subtitle: '',
                    lead: '',
                  };
                  try {
                    detail = tDetail.raw(service.slug) as ServiceDetail;
                  } catch {
                    // fallback
                  }

                  const durationLabel =
                    service.durations && service.durations.length > 0
                      ? service.durations.join(' / ') + ' mins'
                      : null;

                  const leadParas = detail.lead
                    ? detail.lead.split('\n\n').filter(Boolean)
                    : [];

                  return (
                    <article
                      key={service.slug}
                      className="overflow-hidden rounded-3xl border border-[#d6c8b2]/60 bg-white/80 shadow-sm shadow-[#d6c8b2]/20"
                    >
                      <div className="grid lg:grid-cols-[2fr_3fr]">
                        {/* Image */}
                        <div className="relative aspect-[4/3] bg-[#f0ebe0] lg:aspect-auto lg:min-h-[320px]">
                          <Image
                            src={relaxationServiceImages[service.slug] ?? service.image}
                            alt={detail.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 36vw, 100vw"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-5 p-7 lg:p-9">
                          {/* Title row */}
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="text-xl font-semibold text-[#2f3a36] lg:text-2xl">
                                {detail.title}
                              </h3>
                              {detail.subtitle && (
                                <p className="mt-1 text-sm font-medium text-[#5b6d65]">
                                  {detail.subtitle}
                                </p>
                              )}
                            </div>
                            {durationLabel && (
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d6c8b2] bg-[#f7f2e8] px-3 py-1.5 text-xs font-medium text-[#6f7b7a]">
                                <svg
                                  className="h-3 w-3 text-[#5b6d65]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                >
                                  <circle cx="12" cy="12" r="9" />
                                  <path strokeLinecap="round" d="M12 7v5l3 3" />
                                </svg>
                                {durationLabel}
                              </span>
                            )}
                          </div>

                          {/* Lead paragraphs */}
                          {leadParas.length > 0 && (
                            <div className="space-y-3 text-sm leading-relaxed text-[#52635d]">
                              {leadParas.map((para, i) => (
                                <p key={i}>{para}</p>
                              ))}
                            </div>
                          )}

                          {/* What to Expect */}
                          {service.hasFullDetail && detail.whatToExpect && (
                            <div className="rounded-2xl bg-[#f7f2e8] px-5 py-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#5b6d65]">
                                {labels.whatToExpect}
                              </p>
                              <p className="text-sm leading-relaxed text-[#52635d]">
                                {detail.whatToExpect}
                              </p>
                            </div>
                          )}

                          {/* Best For */}
                          {detail.bestFor && (
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#5b6d65]">
                                {labels.bestFor}
                              </p>
                              <p className="text-sm leading-relaxed text-[#6f7b7a]">
                                {detail.bestFor}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
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
                eventName="click_book_ritual_relaxation_page"
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
