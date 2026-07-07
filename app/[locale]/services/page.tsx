import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';
import TrackedLink from '@/components/TrackedLink';

type Props = {
  params: Promise<{ locale: string }>;
};

type NavItem = {
  label: string;
  href: string;
};

type Stat = {
  value: string;
  label: string;
};

type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  stats: Stat[];
};

type SectionContent = {
  eyebrow: string;
  title: string;
  description: string;
};

type HighlightsContent = SectionContent & {
  cardEyebrow: string;
};

type HighlightGroup = {
  title: string;
  caption: string;
  items: string[];
};

type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  disclaimer: string;
  ctaLabel: string;
};

type ContactDetail = {
  id: string;
  label: string;
  value: string;
};

const categoryImages: Record<string, string> = {
  relaxation: '/images/rooms/wanaka-room-1.webp',
  aesthetic: '/images/rooms/vip-room-1.webp',
  iv: '/images/rooms/iv-drip-room.webp',
};

const contactDetailMeta: Record<string, { href?: string; eventName?: string }> = {
  line: {
    href: 'https://line.me/ti/p/@wanaka.th?utm_source=website&utm_medium=services_page&utm_campaign=contact_line',
    eventName: 'click_line_services_contact',
  },
  phone: {
    href: 'tel:+66886651936',
    eventName: 'click_phone_services_contact',
  },
  email: {
    href: 'mailto:wanakasanctuary@gmail.com',
    eventName: 'click_email_services_contact',
  },
  address: {},
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  const tRelaxation = await getTranslations({ locale, namespace: 'relaxationPage' });
  const tAesthetic = await getTranslations({ locale, namespace: 'aestheticPage' });
  const tIvTherapy = await getTranslations({ locale, namespace: 'ivTherapyPage' });

  const hero = t.raw('hero') as HeroContent;
  const highlights = t.raw('highlights') as HighlightsContent;
  const rituals = t.raw('rituals') as SectionContent;
  const contact = t.raw('contact') as ContactContent;

  const footerLinks = t.raw('footer.links') as NavItem[];
  const bestSellerGroups = t.raw('bestSellerGroups') as HighlightGroup[];
  const contactDetails = t.raw('contactDetails') as ContactDetail[];

  const categoryCards = [
    {
      key: 'relaxation',
      href: '/services/relaxation' as const,
      image: categoryImages.relaxation,
      eyebrow: tRelaxation('hero.eyebrow'),
      title: tRelaxation('hero.title'),
      description: tRelaxation('hero.description'),
    },
    {
      key: 'aesthetic',
      href: '/services/aesthetic' as const,
      image: categoryImages.aesthetic,
      eyebrow: tAesthetic('hero.eyebrow'),
      title: tAesthetic('hero.title'),
      description: tAesthetic('hero.description'),
    },
    {
      key: 'iv',
      href: '/services/iv-therapy' as const,
      image: categoryImages.iv,
      eyebrow: tIvTherapy('hero.eyebrow'),
      title: tIvTherapy('hero.title'),
      description: tIvTherapy('hero.description'),
    },
  ];

  return (
    <div className="bg-[#f7f2e8] text-[#2f3a36]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section id="hero" className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/rooms/central-hall.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d1f1c]/80 via-[#1d1f1c]/55 to-[#4a3c31]/25" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-16 text-white lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl space-y-8">
                <span className="inline-flex w-fit items-center rounded-full bg-white/85 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-[#4b5853]">
                  {hero.eyebrow}
                </span>
                <div className="space-y-5">
                  <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    {hero.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-white/85">
                    {hero.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <TrackedLink
                    href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=services_hero&utm_campaign=book_ritual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#f7f2e8]/95 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:bg-white"
                    eventName="click_book_services_hero"
                  >
                    {hero.primaryCtaLabel}
                  </TrackedLink>
                  <Link
                    href="#categories"
                    className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white"
                  >
                    {hero.secondaryCtaLabel}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {hero.stats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section id="highlights" className="border-y border-[#d6c8b2]/50 bg-white/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              eyebrow={highlights.eyebrow}
              title={highlights.title}
              description={highlights.description}
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {bestSellerGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 p-7 shadow-md shadow-[#d6c8b2]/20"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                    {highlights.cardEyebrow}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-[#2f3a36]">{group.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#52635d]">{group.caption}</p>
                  <ol className="mt-6 space-y-3 text-sm text-[#44544d]">
                    {group.items.map((item, index) => (
                      <li
                        key={`${group.title}-${item}`}
                        className="flex items-start gap-4 rounded-2xl bg-[#f7f2e8]/80 px-4 py-4"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5b6d65] text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <span className="pt-1 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Category overview */}
        <section id="categories" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <SectionHeading
            eyebrow={rituals.eyebrow}
            title={rituals.title}
            description={rituals.description}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {categoryCards.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className="group flex flex-col overflow-hidden rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 shadow-lg shadow-[#d6c8b2]/25 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d6c8b2]/40"
              >
                <div className="relative h-56 shrink-0 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 340px, 92vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/65 via-[#2f3a36]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                      {card.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight">{card.title}</h2>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="flex-1 text-sm leading-relaxed text-[#52635d]">
                    {card.description}
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65] transition group-hover:text-[#2f3a36]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden border-t border-[#d6c8b2]/50 bg-gradient-to-br from-[#5b6d65] via-[#44544d] to-[#2f3a36] text-white"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/15 to-transparent mix-blend-screen" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {contact.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{contact.title}</h2>
              <p className="text-base leading-relaxed text-white/80">{contact.description}</p>
            </div>

            <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 backdrop-blur">
              <div className="space-y-4 text-sm text-white/80">
                {contactDetails.map((detail) => {
                  const meta = contactDetailMeta[detail.id] ?? {};
                  return (
                    <div key={detail.id}>
                      {meta.href ? (
                        <TrackedLink
                          href={meta.href}
                          className="transition hover:text-white hover:underline"
                          eventName={meta.eventName}
                        >
                          <span className="font-semibold text-white">{detail.label}:</span>{' '}
                          {detail.value}
                        </TrackedLink>
                      ) : (
                        <p>
                          <span className="font-semibold text-white">{detail.label}:</span>{' '}
                          {detail.value}
                        </p>
                      )}
                    </div>
                  );
                })}
                <p className="pt-3 text-xs uppercase tracking-[0.3em] text-white/60">
                  {contact.disclaimer}
                </p>
              </div>
              <TrackedLink
                href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=services_footer&utm_campaign=enquire_now"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:bg-[#f7f2e8]"
                eventName="click_enquire_now_services"
              >
                {contact.ctaLabel}
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2f3a36] py-10 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">{title}</h2>
      <p className="text-lg leading-relaxed text-[#44544d]">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: Stat) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{label}</p>
    </div>
  );
}
