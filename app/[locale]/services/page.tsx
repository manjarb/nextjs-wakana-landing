import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import MobileMenu from '@/components/MobileMenu';
import TrackedLink from '@/components/TrackedLink';

type Props = {
  params: Promise<{ locale: string }>;
};

type NavItem = {
  label: string;
  href: string;
};

type MenuItem = {
  title: string;
  price: string;
  duration?: string;
  description?: string;
  note?: string;
  badge?: string;
};

type Collection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
  items: MenuItem[];
};

type Cluster = {
  title: string;
  description: string;
  items: MenuItem[];
};

type HighlightGroup = {
  title: string;
  caption: string;
  items: string[];
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

type SkinBoosterContent = {
  eyebrow: string;
  title: string;
  intro: string;
  imageAlt: string;
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

const ritualCollectionImages: Record<string, string> = {
  'facial-treatment': '/images/v2/facial_treatment_01.jpg',
  'head-massage-spa': '/images/v2/relaxation_head_spa_03.jpg',
  'aroma-body-massage': '/images/v2/lobby_6.jpg',
  'hand-feet': '/images/generated/service-hand-feet-massage.png',
  'special-menu': '/images/v2/hair_drier_01.jpg',
  'other-facial-treatment': '/images/v2/facial_treatment_03.jpg',
};

const contactDetailMeta: Record<
  string,
  { href?: string; eventName?: string }
> = {
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

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage' });

  const hero = t.raw('hero') as HeroContent;
  const highlights = t.raw('highlights') as HighlightsContent;
  const rituals = t.raw('rituals') as SectionContent;
  const ivTherapy = t.raw('ivTherapy') as SectionContent & { imageAlt: string };
  const aestheticTreatment = t.raw('aestheticTreatment') as SectionContent;
  const skinBooster = t.raw('skinBooster') as SkinBoosterContent;
  const contact = t.raw('contact') as ContactContent;

  const navItems = t.raw('navItems') as NavItem[];
  const footerLinks = t.raw('footer.links') as NavItem[];
  const bestSellerGroups = t.raw('bestSellerGroups') as HighlightGroup[];
  const ritualCollections = t.raw('ritualCollections') as Collection[];
  const ivTherapyClusters = t.raw('ivTherapyClusters') as Cluster[];
  const premiumSkinBoosters = t.raw('premiumSkinBoosters') as MenuItem[];
  const everydaySkinBoosters = t.raw('everydaySkinBoosters') as Cluster[];
  const aestheticTreatments = t.raw('aestheticTreatments') as MenuItem[];
  const contactDetails = t.raw('contactDetails') as ContactDetail[];

  return (
    <div className="bg-[#f7f2e8] text-[#2f3a36]">
      <header className="sticky top-0 z-20 border-b border-[#d6c8b2]/40 bg-[#f7f2e8]/90 backdrop-blur">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-6">
            <Link href="/" className="relative h-10 w-[90px] transition hover:opacity-80 md:h-14 md:w-[120px]">
              <Image
                src="/images/logo/waka-logo.svg"
                alt="WANAKA Sanctuary"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-[#5b6d65] lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[#2f3a36]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <TrackedLink
                href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=services_nav&utm_campaign=book_ritual"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border border-[#5b6d65] px-4 py-2 text-sm font-medium text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white lg:block"
                eventName="click_book_ritual_services_nav"
              >
                {t('headerCtaLabel')}
              </TrackedLink>
              <MobileMenu navItems={navItems} ctaLabel={t('headerCtaLabel')} />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/v2/lobby_7.jpg"
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
                    href="#rituals"
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
                  <h2 className="mt-4 text-2xl font-semibold text-[#2f3a36]">
                    {group.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#52635d]">
                    {group.caption}
                  </p>
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

        <section id="rituals" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <SectionHeading
            eyebrow={rituals.eyebrow}
            title={rituals.title}
            description={rituals.description}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {ritualCollections.map((collection) => (
              <article
                key={collection.id}
                id={collection.id}
                className="overflow-hidden rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 shadow-lg shadow-[#d6c8b2]/25"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={ritualCollectionImages[collection.id]}
                    alt={collection.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 480px, 92vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/70 via-[#2f3a36]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                      {collection.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight">
                      {collection.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-[#52635d]">
                    {collection.description}
                  </p>
                  <div className="mt-6 space-y-4">
                    {collection.items.map((item) => (
                      <MenuItemCard key={`${collection.id}-${item.title}`} item={item} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="iv-therapy" className="border-y border-[#d6c8b2]/50 bg-[#e3d8c7]/60">
          <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6 lg:max-w-2xl">
                <SectionHeading
                  eyebrow={ivTherapy.eyebrow}
                  title={ivTherapy.title}
                  description={ivTherapy.description}
                />
              </div>

              <div className="relative h-72 overflow-hidden rounded-[32px] border border-white/50 bg-white/50 shadow-xl shadow-[#d6c8b2]/25 lg:h-[22rem]">
                <Image
                  src="/images/v2/drip_iv_02.jpg"
                  alt={ivTherapy.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 92vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/45 via-[#2f3a36]/10 to-transparent" />
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {ivTherapyClusters.map((cluster) => (
                <article
                  key={cluster.title}
                  className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20 lg:p-7"
                >
                  <h2 className="text-xl font-semibold text-[#2f3a36]">
                    {cluster.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#52635d]">
                    {cluster.description}
                  </p>
                  <div className="mt-5 space-y-3">
                    {cluster.items.map((item) => (
                      <MenuItemCard key={`${cluster.title}-${item.title}`} item={item} compact />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="aesthetic-treatment" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <article className="rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 p-8 shadow-lg shadow-[#d6c8b2]/25">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                {aestheticTreatment.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36]">
                {aestheticTreatment.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#52635d]">
                {aestheticTreatment.description}
              </p>
              <div className="mt-8 space-y-3">
                {aestheticTreatments.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f2e8]/85 px-5 py-4"
                  >
                    <span className="font-medium text-[#2f3a36]">{item.title}</span>
                    <span className="rounded-full bg-[#5b6d65] px-4 py-1.5 text-sm font-semibold text-white">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article
              id="skin-booster"
              className="rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 p-8 shadow-lg shadow-[#d6c8b2]/25"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                {skinBooster.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36]">
                {skinBooster.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#52635d]">
                {skinBooster.intro}
              </p>
              <div className="mt-8 space-y-4">
                {premiumSkinBoosters.map((item) => (
                  <MenuItemCard key={item.title} item={item} />
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {everydaySkinBoosters.map((cluster) => (
              <article
                key={cluster.title}
                className="rounded-[32px] border border-[#d6c8b2]/70 bg-white/85 p-6 shadow-md shadow-[#d6c8b2]/20"
              >
                <h3 className="text-2xl font-semibold text-[#2f3a36]">
                  {cluster.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52635d]">
                  {cluster.description}
                </p>
                <div className="mt-6 space-y-3">
                  {cluster.items.map((item) => (
                    <MenuItemCard key={`${cluster.title}-${item.title}`} item={item} compact />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

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
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                {contact.title}
              </h2>
              <p className="text-base leading-relaxed text-white/80">
                {contact.description}
              </p>
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
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
        {title}
      </h2>
      <p className="text-lg leading-relaxed text-[#44544d]">
        {description}
      </p>
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

function MenuItemCard({
  item,
  compact = false,
}: {
  item: MenuItem;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl bg-[#f7f2e8]/85 ${
        compact ? 'px-4 py-4' : 'px-5 py-5'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-[80%]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-[#2f3a36]`}>
              {item.title}
            </h3>
            {item.badge ? (
              <span className="rounded-full bg-[#5b6d65] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {item.badge}
              </span>
            ) : null}
          </div>
          {item.duration ? (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6f7b7a]">
              {item.duration}
            </p>
          ) : null}
        </div>
        <span className="rounded-full bg-[#5b6d65] px-4 py-2 text-sm font-semibold text-white">
          {item.price}
        </span>
      </div>
      {item.description ? (
        <p className={`text-sm leading-relaxed text-[#52635d] ${compact ? 'mt-3' : 'mt-4'}`}>
          {item.description}
        </p>
      ) : null}
      {item.note ? (
        <p className="mt-3 text-xs leading-relaxed text-[#6f7b7a]">
          {item.note}
        </p>
      ) : null}
    </div>
  );
}
