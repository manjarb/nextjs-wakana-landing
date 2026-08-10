"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const packageItems = [
  'momMorningEscape',
  'activeRecoveryRitual',
  'jetLagRecoveryRitual',
] as const;

export default function PackagesDropdown() {
  const tNav = useTranslations('navigation');
  const t = useTranslations('navigation.dropdown');

  return (
    <div className="group relative">
      <Link
        href="/#packages"
        className="flex items-center gap-1 transition hover:text-[#2f3a36] group-focus-within:text-[#2f3a36]"
      >
        {tNav('packages')}
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

      <div className="invisible absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-3xl border border-[#d6c8b2]/60 bg-[#f7f2e8] p-5 shadow-xl shadow-[#d6c8b2]/40">
          <ul className="space-y-2">
            {packageItems.map((key) => (
              <li key={key}>
                <Link
                  href="/#packages"
                  className="block text-sm text-[#52635d] transition hover:text-[#5b6d65]"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
