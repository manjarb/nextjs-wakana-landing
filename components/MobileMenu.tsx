"use client"

import { useState } from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
}

interface MobileMenuProps {
  navItems: NavItem[]
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

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
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-4 border-t border-[#d6c8b2]/40 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="px-6 py-2 text-base font-medium text-[#2f3a36] transition hover:bg-[#d6c8b2]/20 hover:text-[#5b6d65]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 px-6">
            <Link
              href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=mobile_nav&utm_campaign=book_ritual"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="block w-full rounded-full border border-[#5b6d65] px-5 py-2.5 text-center text-sm font-medium text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white"
            >
              Book a Ritual
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
