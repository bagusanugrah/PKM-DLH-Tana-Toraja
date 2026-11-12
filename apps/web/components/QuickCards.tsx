import Link from 'next/link';
import { FileText, Calendar, MapPin, Building2, ChevronRight } from 'lucide-react';

interface QuickCardItem {
  judul: string;
  penjelasan: string;
  href: string;
  ikon: React.ElementType;
  warnaAksen: string;
}

const cards: QuickCardItem[] = [
  {
    judul: 'Layanan DLH',
    penjelasan: 'Syarat, alur, biaya, dan lama proses permohonan dinas.',
    href: '/layanan',
    ikon: FileText,
    warnaAksen: 'text-emerald-700 bg-emerald-100',
  },
  {
    judul: 'Jadwal Angkut',
    penjelasan: 'Hari, jam, dan titik kumpul sampah per kecamatan.',
    href: '/informasi#jadwal',
    ikon: Calendar,
    warnaAksen: 'text-blue-700 bg-blue-100',
  },
  {
    judul: 'Lokasi TPS & Bank Sampah',
    penjelasan: 'Peta titik pembuangan dan petunjuk arah Google Maps.',
    href: '/informasi#lokasi',
    ikon: MapPin,
    warnaAksen: 'text-amber-700 bg-amber-100',
  },
  {
    judul: 'Profil Dinas',
    penjelasan: 'Visi, misi, struktur organisasi, dan kontak kantor.',
    href: '/profil',
    ikon: Building2,
    warnaAksen: 'text-purple-700 bg-purple-100',
  },
];

export function QuickCards() {
  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200" aria-label="Menu Pintas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {cards.map((card) => {
            const Icon = card.ikon;
            return (
              <Link
                key={card.judul}
                href={card.href}
                className="group flex flex-col justify-between p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand/40 transition-all min-h-[140px] focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div>
                  <div className={`w-11 h-11 rounded-lg ${card.warnaAksen} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand transition-colors flex items-center gap-1">
                    <span>{card.judul}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                    {card.penjelasan}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform">
                  <span>Buka Halaman</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
