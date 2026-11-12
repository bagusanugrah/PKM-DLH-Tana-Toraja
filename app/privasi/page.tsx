import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, UserCheck, Database, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../../content/site';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description:
    'Cara Dinas Lingkungan Hidup Kabupaten Tana Toraja mengelola data pelapor sesuai UU No. 27 Tahun 2022.',
};

export default function PrivasiPage() {
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
        {/* Back link */}
        <div>
          <Link
            href="/pengaduan"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline min-h-11"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Halaman Pengaduan</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Kepatuhan UU No. 27 Tahun 2022 (UU PDP)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Kebijakan Privasi Pengaduan Lingkungan
          </h1>
          <p className="text-base text-gray-600 mt-2 leading-relaxed">
            Dinas Lingkungan Hidup Kabupaten Tana Toraja berkomitmen melindungi data pribadi warga yang menyampaikan pengaduan lingkungan hidup melalui website ini.
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8 text-gray-800 leading-relaxed">
          {/* 1. Pengendali Data */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">1</span>
              <span>Siapa Pengendali Data Anda?</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Pengendali data adalah <strong>{siteConfig.namaDinas}</strong>, beralamat di {siteConfig.alamat}. Kami bertanggung jawab atas penerimaan, pengelolaan, dan kerahasiaan data pelapor pengaduan lingkungan hidup.
            </p>
          </section>

          {/* 2. Data yang Dikumpulkan */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">2</span>
              <span>Data Pribadi yang Kami Minta</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Saat Anda mengisi formulir pengaduan, kami hanya meminta data yang relevan untuk penanganan teknis lapangan:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 pl-2">
              <li><strong>Nama Pelapor:</strong> Untuk mengenali pihak yang menyampaikan aduan.</li>
              <li><strong>Nomor HP (WhatsApp/Telepon):</strong> Untuk menghubungi Anda jika petugas membutuhkan konfirmasi patokan lokasi.</li>
              <li><strong>Lokasi Masalah:</strong> Alamat, patokan jalan, atau kelurahan/lembang tempat timbulan sampah atau pencemaran terjadi.</li>
              <li><strong>Uraian Cerita &amp; Foto Bukti:</strong> Keterangan keadaan dan foto di lapangan.</li>
            </ul>
          </section>

          {/* 3. Tujuan Pemrosesan */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">3</span>
              <span>Tujuan Penggunaan Data</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Data Anda digunakan semata-mata untuk:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 pl-2">
              <li>Menerima, memverifikasi, dan menurunkan tim penanganan sampah/pencemaran ke lokasi.</li>
              <li>Menghubungi pelapor jika memerlukan kejelasan lokasi atau memberikan kabar penanganan.</li>
              <li>Merekapitulasi statistik evaluasi kinerja kebersihan dinas secara anonim (tanpa mempublikasikan nama atau nomor HP warga).</li>
            </ul>
          </section>

          {/* 4. Dasar Pemrosesan */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">4</span>
              <span>Dasar Hukum Pemrosesan</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Dasar pemrosesan adalah <strong>persetujuan eksplisit</strong> yang Anda berikan dengan mencentang kotak persetujuan pada formulir sebelum menekan tombol kirim, sesuai ketentuan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.
            </p>
          </section>

          {/* 5. Siapa yang Mengakses Data */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">5</span>
              <span>Akses Data &amp; Kerahasiaan</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Data pengaduan hanya dapat dibuka oleh <strong>pegawai dan petugas DLH Kabupaten Tana Toraja yang ditugaskan</strong> menangani persampahan dan sengketa lingkungan. Data Anda <strong>TIDAK PERNAH</strong> dijual, disewakan, atau dibagikan kepada pihak swasta/komersial untuk keperluan periklanan.
            </p>
          </section>

          {/* 6. Tempat Penyimpanan */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">6</span>
              <span>Tempat Penyimpanan Data</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Formulir terhubung langsung dengan Google Form dan Google Sheets resmi milik akun dinas. Website ini <strong>tidak menyimpan data pribadi pelapor di database server tim pengembang</strong>, sehingga menjamin tidak ada kebocoran data di server pihak ketiga.
            </p>
          </section>

          {/* 7. Masa Retensi */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">7</span>
              <span>Lama Penyimpanan Data</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Data aduan disimpan selama proses penanganan berlangsung dan diarsipkan selama 1 (satu) tahun anggaran untuk keperluan laporan pertanggungjawaban publik dan evaluasi berkala dinas. Setelah masa tersebut, data akan diarsipkan atau dihapus secara aman.
            </p>
          </section>

          {/* 8. Hak-Hak Anda */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-extrabold flex items-center justify-center">8</span>
              <span>Hak Pelapor sebagai Subjek Data</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Sesuai UU PDP, Anda berhak:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 pl-2">
              <li>Mengetahui kejelasan tindak lanjut atas data yang Anda kirimkan.</li>
              <li>Meminta ralat/pembetulan jika terdapat kekeliruan nomor HP atau lokasi.</li>
              <li>Menarik persetujuan atau meminta penghapusan data kontak Anda setelah penanganan selesai.</li>
            </ul>
          </section>

          {/* 9. Kontak Petugas Pelindungan Data */}
          <section className="space-y-2 pt-2 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Cara Menghubungi Kami
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau ingin mengajukan permohonan terkait data pribadi Anda, hubungi:
            </p>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm space-y-1 mt-2">
              <p><strong>Dinas Lingkungan Hidup Kabupaten Tana Toraja</strong></p>
              <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-brand font-semibold hover:underline">{siteConfig.email}</a></p>
              <p>Telepon: <a href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`} className="text-brand font-semibold hover:underline">{siteConfig.telepon}</a></p>
              <p>Alamat: {siteConfig.alamat}</p>
            </div>
          </section>

          {/* 10. Tanggal Pembaruan */}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
            Pembaruan terakhir: 12 November 2026. Kebijakan ini dapat ditinjau berkala sesuai perkembangan regulasi pemerintah daerah.
          </div>
        </div>
      </div>
    </div>
  );
}
