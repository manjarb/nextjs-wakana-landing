import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';
import TrackedLink from '@/components/TrackedLink';

type Props = {
  params: Promise<{ locale: string }>;
};

type IvItem = {
  title: string;
  description: string;
};

type IvGroup = {
  id?: string;
  title: string;
  items: IvItem[];
};

const BOOK_HREF =
  'https://lin.ee/SSGzTmt?utm_source=website&utm_medium=iv_therapy_page&utm_campaign=book_ritual';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ivTherapyPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function IvTherapyPage({ params }: Props) {
  const { locale } = await params;

  const tPage = await getTranslations({ locale, namespace: 'ivTherapyPage' });

  const groups = tPage.raw('groups') as IvGroup[];
  const disclaimer = tPage('disclaimer');

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

      {/* Groups */}
      <div className="mx-auto max-w-6xl space-y-14 px-6 pb-24">
        {groups.map((group) => (
          <div key={group.title} id={group.id}>
            {/* Group heading */}
            <div className="mb-7 flex items-center gap-4">
              <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65]">
                {group.title}
              </h2>
              <div className="h-px flex-1 bg-[#d6c8b2]/60" />
            </div>

            {/* Formula cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-[#d6c8b2]/60 bg-white/80 p-6 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-[#2f3a36]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#52635d]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        {disclaimer && (
          <p className="rounded-xl border border-[#d6c8b2]/50 bg-[#f0ebe0] px-5 py-4 text-sm leading-relaxed text-[#6f7b7a]">
            {disclaimer}
          </p>
        )}
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
                eventName="click_book_ritual_iv_therapy_page"
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
