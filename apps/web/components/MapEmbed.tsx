import { ExternalLink, MapPin } from 'lucide-react';

interface MapEmbedProps {
  mapId?: string;
}

export function MapEmbed({ mapId = process.env.NEXT_PUBLIC_MYMAPS_ID || '1A2B3C4D5E' }: MapEmbedProps) {
  const embedUrl = `https://www.google.com/maps/d/embed?mid=${encodeURIComponent(mapId)}`;
  const directUrl = `https://www.google.com/maps/d/viewer?mid=${encodeURIComponent(mapId)}`;

  return (
    <div id="peta-tps" className="space-y-4">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-brand" aria-hidden="true" />
            <span>Peta Lokasi TPS, TPS3R, dan Bank Sampah</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Ketuk titik pada peta untuk melihat nama, alamat lengkap, dan jam operasional.
          </p>
        </div>

        {/* Fallback link */}
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark min-h-11 py-2 px-3 rounded-lg hover:bg-brand/5 border border-brand/20 transition-colors w-fit"
        >
          <span>Buka di Google Maps Penuh</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      {/* Legend (K15) */}
      <div className="flex flex-wrap items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700">
        <span className="font-bold text-gray-900">Legenda Titik:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block" aria-hidden="true" />
          <span><strong>TPS</strong> (Tempat Pembuangan Sementara)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block" aria-hidden="true" />
          <span><strong>TPS3R</strong> (Tempat Pengolahan 3R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block" aria-hidden="true" />
          <span><strong>Bank Sampah</strong> (Tabungan Sampah Terpilah)</span>
        </div>
      </div>

      {/* Responsive iframe container */}
      <div className="w-full h-80 sm:h-96 md:h-[480px] rounded-xl overflow-hidden border border-gray-300 shadow-sm relative bg-gray-100">
        <iframe
          src={embedUrl}
          title="Peta Titik TPS, TPS3R, dan Bank Sampah Dinas Lingkungan Hidup Kabupaten Tana Toraja"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <p className="text-xs text-gray-500">
        Peta tidak muncul atau koneksi internet lemah? Gunakan tombol &quot;Buka di Google Maps Penuh&quot; atau lihat daftar lokasi di bawah ini.
      </p>
    </div>
  );
}
