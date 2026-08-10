"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TrackedLink from '@/components/TrackedLink';
import MobileMenu, { type NavItem } from '@/components/MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ServicesDropdown from '@/components/ServicesDropdown';
import PackagesDropdown from '@/components/PackagesDropdown';

const BOOK_CTA_HREF =
  'https://lin.ee/SSGzTmt?utm_source=website&utm_medium=desktop_nav&utm_campaign=book_ritual';

export default function SiteHeader() {
  const tNav = useTranslations('navigation');
  const tDrop = useTranslations('navigation.dropdown');

  const primaryLinks = [
    { label: tNav('home'), href: '/' },
    { label: tNav('about'), href: '/#about' },
  ];

  const secondaryLinks = [
    { label: tNav('space'), href: '/#space' },
    { label: tNav('reviews'), href: '/#reviews' },
    { label: tNav('faq'), href: '/#faq' },
    { label: tNav('contact'), href: '/#contact' },
  ];

  const mobileServicesChildren: NavItem[] = [
    { label: tDrop('relaxationRituals'), href: '/services/relaxation' },
    { label: tDrop('aestheticRituals'), href: '/services/aesthetic' },
    { label: tDrop('ivTherapy'), href: '/services/iv-therapy' },
  ];

  const mobilePackagesChildren: NavItem[] = [
    { label: tDrop('momMorningEscape'), href: '/#packages' },
    { label: tDrop('activeRecoveryRitual'), href: '/#packages' },
    { label: tDrop('jetLagRecoveryRitual'), href: '/#packages' },
  ];

  const mobileNavItems: NavItem[] = [
    { label: tNav('home'), href: '/' },
    { label: tNav('about'), href: '/#about' },
    { label: tNav('services'), href: '/services', children: mobileServicesChildren },
    { label: tNav('packages'), href: '/#packages', children: mobilePackagesChildren },
    { label: tNav('space'), href: '/#space' },
    { label: tNav('reviews'), href: '/#reviews' },
    { label: tNav('faq'), href: '/#faq' },
    { label: tNav('contact'), href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#d6c8b2]/40 bg-[#f7f2e8]/90 backdrop-blur">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
          <Link
            href="/"
            className="relative h-10 w-[90px] transition hover:opacity-80 md:h-12 md:w-[110px]"
          >
            <Image
              src="/images/logo/waka-logo.svg"
              alt="WANAKA Sanctuary"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-[#5b6d65] lg:flex">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[#2f3a36]"
              >
                {item.label}
              </Link>
            ))}
            <ServicesDropdown />
            <PackagesDropdown />
            {secondaryLinks.map((item) => (
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
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <TrackedLink
              href={BOOK_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-[#5b6d65] px-4 py-2 text-sm font-medium text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white lg:block"
              eventName="click_book_ritual"
            >
              {tNav('bookNow')}
            </TrackedLink>
            <MobileMenu navItems={mobileNavItems} ctaLabel={tNav('bookNow')} />
          </div>
        </div>
      </div>
    </header>
  );
}
