import { Metadata } from 'next';
import { ComplaintForm } from '../../components/ComplaintForm';
import { FAQAccordion } from '../../components/Accordion';
import { daftarFAQ } from '../../content/faq';

export const metadata: Metadata = {
  title: 'Pengaduan Lingkungan',
  description:
    'Laporkan masalah lingkungan ke Dinas Lingkungan Hidup Kabupaten Tana Toraja. Tanpa akun, mudah dari HP.',
};

export default function PengaduanPage() {
  // Filter FAQ specifically for Complaint category
  const pengaduanFaqs = daftarFAQ.filter((f) => f.kategori === 'Pengaduan');

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-5">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            Layanan Pengaduan Warga
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Pengaduan Masalah Lingkungan Hidup
          </h1>
          <p className="text-base text-gray-600 mt-2 leading-relaxed">
            Laporkan tumpukan sampah liar, pembakaran sampah, atau pencemaran di lingkungan Anda secara resmi kepada DLH Kabupaten Tana Toraja.
          </p>
        </div>

        {/* F18, F19, F20, F21, K09: Main Complaint Form Component */}
        <ComplaintForm />

        {/* K02: FAQ for Complaints */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Pertanyaan Seputar Layanan Pengaduan
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Informasi tambahan seputar privasi, alur kerja, dan penanganan laporan Anda.
            </p>
          </div>

          <FAQAccordion items={pengaduanFaqs} />
        </div>
      </div>
    </div>
  );
}
