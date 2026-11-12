'use client';

import { useState, useMemo } from 'react';
import { Navigation, Clock, MapPin, Share2, Filter } from 'lucide-react';
import { LokasiItem, JenisLokasi } from '../lib/api';

interface LocationListProps {
  locations: LokasiItem[];
  stale?: boolean;
}

export function LocationList({ locations, stale }: LocationListProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  const filteredLocations = useMemo(() => {
    if (selectedFilter === 'Semua') {
      return locations;
    }
    return locations.filter((loc) => loc.jenis === selectedFilter);
  }, [locations, selectedFilter]);

  const getBadgeStyle = (jenis: JenisLokasi) => {
    switch (jenis) {
      case 'TPS':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'TPS3R':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Bank Sampah':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleShareWhatsApp = (loc: LokasiItem) => {
    const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
    const text = `${loc.nama} (${loc.jenis}) — ${loc.alamat}. Jam operasional: ${loc.jamBuka}. Petunjuk arah: ${dirUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div id="lokasi" className="space-y-6 pt-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Daftar Titik TPS, TPS3R &amp; Bank Sampah
            </h2>
            {stale && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                Data cadangan
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Gunakan tombol &quot;Petunjuk Arah&quot; untuk langsung navigasi rute melalui aplikasi Google Maps di HP.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg w-fit">
          <Filter className="w-4 h-4 text-gray-500 ml-2" aria-hidden="true" />
          {['Semua', 'TPS', 'TPS3R', 'Bank Sampah'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md min-h-9 transition-colors ${
                selectedFilter === tab
                  ? 'bg-white text-brand shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLocations.map((loc, idx) => {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;

          return (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeStyle(loc.jenis)}`}>
                    {loc.jenis}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {loc.nama}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{loc.alamat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                    <span>{loc.jamBuka}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand hover:bg-brand-light text-white font-semibold text-xs sm:text-sm min-h-11 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label={`Petunjuk arah Google Maps menuju ${loc.nama}`}
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>Petunjuk Arah</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(loc)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg min-h-11 transition-colors"
                  aria-label={`Bagikan lokasi ${loc.nama} ke WhatsApp`}
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
