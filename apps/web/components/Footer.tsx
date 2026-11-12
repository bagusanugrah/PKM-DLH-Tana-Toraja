import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '../content/site';
import { TorajaOrnament, TongkonanIcon } from './TorajaOrnament';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 mt-auto border-t-4 border-brand">
      {/* Toraja ornamental strip (K12) */}
      <div className="bg-brand-dark py-1.5 overflow-hidden">
        <TorajaOrnament className="h-3 w-full text-brand-lighter/30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Identity & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-brand flex items-center justify-center text-white">
                <TongkonanIcon className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg">DLH Tana Toraja</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Mewujudkan Kabupaten Tana Toraja yang bersih, asri, dan berwawasan lingkungan melalui pelayanan publik yang transparan dan tanggap warga.
            </p>
            {/* Local greeting (K12) */}
            <p className="text-xs text-amber-400 font-medium italic">
              &quot;Kurre sumanga&apos; salama&apos; sitammu ri manarang&quot; (Terima kasih atas kepedulian Anda menjaga lingkungan Toraja).
            </p>
          </div>

          {/* Contact Details (F03) */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white tracking-wide uppercase border-b border-gray-700 pb-2">
              Kontak Resmi
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.alamat}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-light flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.jamLayanan}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-brand-light flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`}
                  className="hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center"
                >
                  {siteConfig.telepon}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-brand-light flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white tracking-wide uppercase border-b border-gray-700 pb-2">
              Tautan Cepat
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors min-h-11 inline-flex items-center">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-white transition-colors min-h-11 inline-flex items-center">
                  Profil &amp; Struktur Dinas
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition-colors min-h-11 inline-flex items-center">
                  Daftar Layanan Publik
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="hover:text-white transition-colors min-h-11 inline-flex items-center">
                  Jadwal Angkut &amp; Peta TPS
                </Link>
              </li>
              <li>
                <Link href="/pengaduan" className="hover:text-white transition-colors min-h-11 inline-flex items-center">
                  Formulir Pengaduan Lingkungan
                </Link>
              </li>
              <li>
                <Link href="/privasi" className="text-emerald-400 hover:text-emerald-300 transition-colors min-h-11 inline-flex items-center font-medium">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Social Media (F04) */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white tracking-wide uppercase border-b border-gray-700 pb-2">
              Media Sosial Resmi
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              Ikuti kabar kegiatan dan edukasi kebersihan resmi dari DLH Tana Toraja:
            </p>
            <div className="flex flex-col gap-2">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 transition-colors min-h-11"
                >
                  <span className="font-bold text-blue-400">f</span>
                  <span>Facebook Resmi</span>
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 transition-colors min-h-11"
                >
                  <span className="font-bold text-pink-400">IG</span>
                  <span>Instagram Resmi</span>
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 transition-colors min-h-11"
                >
                  <span className="font-bold text-red-500">YT</span>
                  <span>YouTube DLH</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 mt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>
            &copy; {currentYear} {siteConfig.namaDinas}. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privasi" className="hover:text-white underline-offset-4 hover:underline min-h-11 inline-flex items-center">
              Kebijakan Privasi
            </Link>
            <span>&bull;</span>
            <span>Kabupaten Tana Toraja</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
