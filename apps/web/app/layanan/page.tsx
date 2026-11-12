import { Metadata } from 'next';
import { FileCheck, PhoneCall } from 'lucide-react';
import { ServiceAccordion } from '../../components/Accordion';
import { daftarLayanan } from '../../content/layanan';
import { siteConfig } from '../../content/site';

export const metadata: Metadata = {
  title: 'Layanan',
  description:
    'Daftar layanan Dinas Lingkungan Hidup Kabupaten Tana Toraja beserta syarat, alur, biaya, dan lama proses.',
};

export default function LayananPage() {
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-5">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            Standar Pelayanan Publik
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Layanan Dinas Lingkungan Hidup
          </h1>
          <p className="text-base text-gray-600 mt-2 leading-relaxed">
            Temukan rincian persyaratan berkas, alur pengajuan, lama proses, biaya retribusi, dan unduhan formulir untuk setiap jenis layanan lingkungan hidup di Kabupaten Tana Toraja.
          </p>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            Seluruh layanan masyarakat DLH Tana Toraja diselenggarakan secara transparan tanpa pungutan liar. Ketuk judul layanan di bawah ini untuk melihat persyaratan lengkapnya.
          </p>
        </div>

        {/* F11 & F12: Service Accordion */}
        <ServiceAccordion items={daftarLayanan} />

        {/* Help Banner */}
        <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Butuh Informasi atau Konsultasi Berkas Lebih Lanjut?
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Hubungi petugas loket kami pada jam kerja {siteConfig.jamLayanan}.
            </p>
          </div>
          <a
            href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-light text-white font-semibold text-sm min-h-11 shadow-sm transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>Telepon Dinas ({siteConfig.telepon})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
