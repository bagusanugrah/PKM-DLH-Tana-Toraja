'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileQuestion,
} from 'lucide-react';
import { siteConfig } from '../content/site';
import { WhatsAppIcon } from './WhatsAppButton';

interface ComplaintFormProps {
  embedUrl?: string;
  directUrl?: string;
  enableWhatsapp?: boolean;
}

export function ComplaintForm({
  embedUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL ||
    'https://docs.google.com/forms/d/e/1FAIpQLSc_example_form_id/viewform?embedded=true',
  directUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
    'https://docs.google.com/forms/d/e/1FAIpQLSc_example_form_id/viewform',
  enableWhatsapp = true,
}: ComplaintFormProps) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsapp;
  const waPreFilled = encodeURIComponent(
    'Halo DLH Tana Toraja, saya mengirim foto bukti untuk laporan masalah lingkungan hidup.'
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waPreFilled}`;

  return (
    <div className="space-y-8">
      {/* Intro & Duration Guidance */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Formulir Pengaduan Lingkungan Warga
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Sampaikan keluhan tumpukan sampah liar, pembakaran, atau pencemaran. Pengisian hanya membutuhkan waktu sekitar <strong>3 menit</strong> tanpa perlu membuat akun.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold w-fit">
            <Clock className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span>Estimasi Pengisian: ~3 Menit</span>
          </div>
        </div>
      </div>

      {/* K09: Tips Melapor yang Baik & Kotak Darurat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tips Melapor */}
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand" aria-hidden="true" />
            <span>Agar Laporan Anda Cepat Ditindaklanjuti</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-brand">•</span>
              <span><strong>Jelaskan masalahnya:</strong> Apa yang terjadi (mis. tumpukan sampah, air sungai keruh, bau busuk).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-brand">•</span>
              <span><strong>Lokasi &amp; patokan jelas:</strong> Sebutkan nama jalan, kelurahan/lembang, dan patokan bangunan terdekat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-brand">•</span>
              <span><strong>Waktu kejadian:</strong> Ceritakan sejak kapan masalah tersebut berlangsung.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-brand">•</span>
              <span><strong>Kirim foto bukti:</strong> Foto sangat membantu petugas menemukan titik lokasi secara tepat.</span>
            </li>
          </ul>
        </div>

        {/* Kotak Keadaan Darurat */}
        <div className="p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
            <span>Peringatan Keadaan Darurat (Emergency)</span>
          </h3>
          <p className="text-sm text-red-800 leading-relaxed">
            Formulir ini bukan layanan tanggap darurat seketika. Apabila terjadi bahaya langsung yang mengancam keselamatan jiwa, kebakaran hutan/lahan besar, atau tumpahan racun kimia:
          </p>
          <div className="pt-2">
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-sm min-h-11 shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Hubungi Layanan Darurat 112 (Bebas Pulsa)</span>
            </a>
          </div>
        </div>
      </div>

      {/* F21: WhatsApp Photo Submission Option */}
      {enableWhatsapp && (
        <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <WhatsAppIcon className="w-5 h-5 text-emerald-700" />
              <span>Punya Foto Bukti di Lokasi?</span>
            </h3>
            <p className="text-sm text-emerald-900">
              Kirimkan foto langsung lewat WhatsApp dinas di nomor <strong>{siteConfig.whatsappFormatted}</strong> tanpa perlu login akun Google.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm min-h-11 shadow-sm transition-colors whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Kirim Foto via WhatsApp</span>
          </a>
        </div>
      )}

      {/* F19: Persetujuan Data Pribadi Summary (UU PDP) */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <ShieldCheck className="w-5 h-5 text-brand" aria-hidden="true" />
          <span>Jaminan Perlindungan Data Pribadi (UU No. 27 Tahun 2022)</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Kami meminta nama, nomor HP, lokasi, dan uraian masalah semata-mata untuk menindaklanjuti laporan ini. Data Anda disimpan di akun Google resmi dinas dan hanya dapat diakses oleh petugas DLH yang berwenang. Baca penjelasan selengkapnya di{' '}
          <Link href="/privasi" className="text-brand font-semibold hover:underline">
            Kebijakan Privasi DLH Tana Toraja
          </Link>.
        </p>
      </div>

      {/* F18: Google Form Embedded Iframe */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Formulir Isian Laporan:</span>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand hover:underline font-semibold text-xs sm:text-sm min-h-11 py-2"
          >
            <span>Buka formulir di tab baru</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-white min-h-[920px] relative">
          <iframe
            src={embedUrl}
            title="Formulir Pengaduan Masalah Lingkungan Hidup DLH Kabupaten Tana Toraja"
            className="w-full h-[950px] border-0"
            loading="lazy"
          >
            Memuat formulir pengaduan...
          </iframe>
        </div>
      </div>

      {/* F20: Pesan Konfirmasi / Apa yang Terjadi Selanjutnya */}
      <div className="p-6 bg-brand-surface rounded-xl border border-brand/20 space-y-3">
        <h3 className="text-base font-bold text-brand-dark flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-brand" aria-hidden="true" />
          <span>Setelah Formulir Terkirim, Apa Langkah Selanjutnya?</span>
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Setelah Anda menekan tombol Kirim, laporan otomatis tercatat di lembar kerja rekapitulasi dinas dan petugas piket menerima notifikasi email. Petugas DLH akan memeriksa laporan dan menurunkan tim ke lokasi. Jika memerlukan patokan lokasi tambahan, petugas akan menghubungi nomor HP yang Anda cantumkan.
        </p>
        <p className="text-xs text-gray-500 italic">
          Catatan: Demi menjaga kerahasiaan identitas dan data pribadi warga, status penanganan tidak ditampilkan untuk umum di website. Jika membutuhkan tindak lanjut segera, hubungi kantor dinas di (0423) 22212.
        </p>
      </div>
    </div>
  );
}
