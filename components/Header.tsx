'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavMenu } from './NavMenu';
import { TextSizeControl } from './TextSizeControl';
import { TongkonanIcon } from './TorajaOrnament';
import { siteConfig } from '../content/site';

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Skip link for screen readers and keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-3 focus:bg-brand focus:text-white focus:rounded-md focus:shadow-lg focus:font-semibold"
      >
        Lompat ke konten utama
      </a>

      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        {/* Top small official banner */}
        <div className="bg-brand-darker text-white text-xs px-4 py-1 flex items-center justify-between">
          <div className="container mx-auto flex items-center justify-between">
            <span className="font-medium tracking-wide">
              {siteConfig.pemerintah}
            </span>
            <span className="hidden sm:inline-block text-gray-200">
              {siteConfig.jamLayanan}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            {/* Logo and Department Name */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:rounded-md group py-1"
              aria-label="Kembali ke Beranda DLH Tana Toraja"
            >
              <div className="w-11 h-11 rounded-lg bg-brand flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:bg-brand-light transition-colors">
                <TongkonanIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base sm:text-lg leading-tight group-hover:text-brand transition-colors">
                  DLH Tana Toraja
                </span>
                <span className="text-xs text-gray-600 hidden sm:inline-block leading-normal">
                  Dinas Lingkungan Hidup Kabupaten Tana Toraja
                </span>
              </div>
            </Link>

            {/* Right actions: Desktop Nav + Text Size + F02 Pengaduan Button + Mobile Nav */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:block">
                <NavMenu />
              </div>

              {/* Text Size Accessibility Control (K10) */}
              <TextSizeControl />

              {/* F02 Pengaduan Button: Always visible on all screens */}
              <Link
                href="/pengaduan"
                className={`inline-flex items-center justify-center px-3.5 sm:px-4 py-2 rounded-md font-semibold text-sm sm:text-base min-h-11 min-w-11 transition-all ${
                  isHomePage
                    ? 'border-2 border-brand text-brand hover:bg-brand hover:text-white'
                    : 'bg-brand hover:bg-brand-light text-white shadow-sm'
                }`}
                aria-label="Halaman Pengaduan Lingkungan"
              >
                <span>Pengaduan</span>
              </Link>

              {/* Mobile menu trigger */}
              <div className="lg:hidden">
                <NavMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
