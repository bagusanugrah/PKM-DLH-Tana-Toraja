'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Informasi', href: '/informasi' },
  { label: 'Pengaduan', href: '/pengaduan' },
];

export function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="relative" aria-label="Navigasi Utama">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 min-h-11 min-w-11 focus-visible:ring-2 focus-visible:ring-brand"
        >
          {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          <span>Menu</span>
        </button>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div
            id="mobile-nav-menu"
            ref={menuRef}
            className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white shadow-xl ring-1 ring-black/10 py-2 z-50 divide-y divide-gray-100"
          >
            <ul className="py-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors ${
                        active
                          ? 'bg-brand/10 text-brand font-bold border-l-4 border-brand'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-brand'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Horizontal Menu */}
      <ul className="hidden md:flex items-center gap-1 lg:gap-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center px-3.5 py-2 rounded-md text-base font-medium min-h-11 transition-colors ${
                  active
                    ? 'bg-brand text-white font-semibold shadow-sm'
                    : 'text-gray-700 hover:text-brand hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
