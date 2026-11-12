import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Compass, Award, MapPin, Clock, Phone, Mail, ExternalLink, Users } from 'lucide-react';
import { profilData } from '../../content/profil';
import { siteConfig } from '../../content/site';

export const metadata: Metadata = {
  title: 'Profil',
  description:
    'Visi, misi, struktur organisasi, dan kontak Dinas Lingkungan Hidup Kabupaten Tana Toraja.',
};

export default function ProfilPage() {
  const directionsOfficeUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.koordinatKantor.lat},${siteConfig.koordinatKantor.lng}`;

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-10">
        {/* Page Title */}
        <div className="border-b border-gray-200 pb-5">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Profil Dinas Lingkungan Hidup Kabupaten Tana Toraja
          </h1>
          <p className="text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
            {profilData.tentangKami}
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi */}
          <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                <Target className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Visi Pembangunan Lingkungan
              </h2>
              <blockquote className="text-base text-brand-dark font-semibold italic border-l-4 border-brand pl-4 py-1 leading-relaxed bg-brand-surface rounded-r-md">
                &quot;{profilData.visi}&quot;
              </blockquote>
            </div>
          </div>

          {/* Misi */}
          <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Misi Dinas
            </h2>
            <ol className="space-y-2.5 text-sm text-gray-700">
              {profilData.misi.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tugas Pokok dan Fungsi */}
        <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Tugas Pokok &amp; Fungsi
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            {profilData.tugasPokok.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2" aria-hidden="true" />
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pejabat Struktural */}
        <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Pimpinan &amp; Pejabat Struktural
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profilData.pejabat.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-1">
                  {p.jabatan}
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-900 block">
                  {p.nama}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bagan Struktur Organisasi */}
        <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Bagan Struktur Organisasi
              </h2>
              <p className="text-sm text-gray-600">
                Struktur hierarki dan pembagian bidang kerja di lingkungan DLH Kabupaten Tana Toraja.
              </p>
            </div>
            <a
              href={profilData.baganStruktur.gambarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold min-h-11 shadow-sm transition-colors w-fit"
            >
              <span>Lihat Ukuran Penuh</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 p-2 sm:p-4">
            <Image
              src={profilData.baganStruktur.gambarUrl}
              alt={profilData.baganStruktur.altText}
              width={900}
              height={650}
              className="w-full h-auto rounded-lg object-contain mx-auto"
            />
          </div>
        </div>

        {/* Kontak & Peta Lokasi Kantor */}
        <div className="p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Alamat &amp; Lokasi Kantor
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Kunjungi kantor kami untuk layanan langsung atau konsultasi berkas lingkungan hidup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info Kontak */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Alamat Kantor:</span>
                    <span className="text-sm font-semibold text-gray-900">{siteConfig.alamat}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Jam Pelayanan Kantor:</span>
                    <span className="text-sm font-semibold text-gray-900">{siteConfig.jamLayanan}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Telepon / Fax:</span>
                    <a href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`} className="text-sm font-semibold text-brand hover:underline">
                      {siteConfig.telepon}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Email Resmi:</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-brand hover:underline">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={directionsOfficeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand hover:bg-brand-light text-white font-bold text-sm min-h-11 shadow-sm transition-colors w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Petunjuk Arah ke Kantor DLH (Google Maps)</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="h-72 md:h-full min-h-[260px] rounded-xl overflow-hidden border border-gray-300 relative bg-gray-100">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                title="Peta Lokasi Kantor Dinas Lingkungan Hidup Kabupaten Tana Toraja"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
