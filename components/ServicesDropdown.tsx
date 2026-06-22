"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  serviceCategories,
  getGroupsByCategory,
  type ServiceCategory,
  type ServiceGroup,
} from '@/data/services';

const categoryLabelKey: Record<ServiceCategory, string> = {
  relaxation: 'relaxationRituals',
  aesthetic: 'aestheticRituals',
  iv: 'ivTherapy',
};

const categoryPageHref: Record<ServiceCategory, string> = {
  relaxation: '/services/relaxation',
  aesthetic: '/services/aesthetic',
  iv: '/services/iv-therapy',
};

function groupPageHref(group: ServiceGroup): string {
  return `${categoryPageHref[group.category]}#${group.id}`;
}

export default function ServicesDropdown() {
  const tNav = useTranslations('navigation');
  const t = useTranslations('navigation.dropdown');

  return (
    <div className="group relative">
      <Link
        href="/services"
        className="flex items-center gap-1 transition hover:text-[#2f3a36] group-focus-within:text-[#2f3a36]"
      >
        {tNav('services')}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </Link>

      <div className="invisible absolute left-1/2 top-full z-30 w-[600px] max-w-[92vw] -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 rounded-3xl border border-[#d6c8b2]/60 bg-[#f7f2e8] p-7 shadow-xl shadow-[#d6c8b2]/40 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <div key={category}>
              <Link
                href={categoryPageHref[category]}
                className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#2f3a36] transition hover:text-[#5b6d65]"
              >
                {t(categoryLabelKey[category])}
              </Link>
              <ul className="mt-3 space-y-2">
                {getGroupsByCategory(category).map((group) => (
                  <li key={group.id}>
                    <Link
                      href={groupPageHref(group)}
                      className="block text-sm text-[#52635d] transition hover:text-[#5b6d65]"
                    >
                      {t(group.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-full border border-[#d6c8b2]/60 bg-[#f7f2e8] px-7 py-3 text-center shadow-lg shadow-[#d6c8b2]/30">
          <Link
            href="/services"
            className="text-sm font-semibold text-[#5b6d65] transition hover:text-[#2f3a36]"
          >
            {t('allServices')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
