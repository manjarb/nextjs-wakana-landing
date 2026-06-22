"use client"

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import TrackedLink from '@/components/TrackedLink'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export interface NavSubItem {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavSubItem[]
}

interface MobileMenuProps {
  navItems: NavItem[]
  ctaLabel?: string
  ctaHref?: string
}

export default function MobileMenu({
  navItems,
  ctaLabel = 'Book a Ritual',
  ctaHref = 'https://lin.ee/SSGzTmt?utm_source=website&utm_medium=mobile_nav&utm_campaign=book_ritual',
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => {
    setIsOpen(false)
    setExpanded(null)
  }

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center gap-1.5 rounded-md p-2 transition hover:bg-[#d6c8b2]/30"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-7 rounded-full bg-[#2f3a36] transition-all duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-7 rounded-full bg-[#2f3a36] transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-7 rounded-full bg-[#2f3a36] transition-all duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Collapsible Mobile Menu - Positioned absolutely */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden bg-[#f7f2e8]/95 backdrop-blur transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-[#d6c8b2]/40 py-4">
          {navItems.map((item) =>
            item.children && item.children.length > 0 ? (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setExpanded(expanded === item.label ? null : item.label)
                  }
                  className="flex w-full items-center justify-between px-6 py-2 text-base font-medium text-[#2f3a36] transition hover:bg-[#d6c8b2]/20 hover:text-[#5b6d65]"
                  aria-expanded={expanded === item.label}
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      expanded === item.label ? 'rotate-180' : ''
                    }`}
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
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded === item.label ? 'max-h-[480px]' : 'max-h-0'
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-10 py-2 text-sm font-medium text-[#5b6d65] transition hover:text-[#2f3a36]"
                  >
                    {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      onClick={closeMenu}
                      className="block px-10 py-2 text-sm text-[#52635d] transition hover:text-[#5b6d65]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={closeMenu}
                className="px-6 py-2 text-base font-medium text-[#2f3a36] transition hover:bg-[#d6c8b2]/20 hover:text-[#5b6d65]"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="mt-3 flex items-center justify-between gap-3 px-6">
            <LanguageSwitcher />
            <TrackedLink
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex-1 rounded-full border border-[#5b6d65] px-5 py-2.5 text-center text-sm font-medium text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white"
              eventName="click_book_ritual_mobile"
            >
              {ctaLabel}
            </TrackedLink>
          </div>
        </nav>
      </div>
    </div>
  )
}
