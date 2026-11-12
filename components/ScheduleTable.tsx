'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, X, Printer, Share2, Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import { JadwalItem } from '../lib/api';
import { siteConfig } from '../content/site';

interface ScheduleTableProps {
  initialSchedules: JadwalItem[];
  stale?: boolean;
}

export function ScheduleTable({ initialSchedules, stale }: ScheduleTableProps) {
  const [search, setSearch] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('Semua');
  const [todayDayName, setTodayDayName] = useState<string>('');

  // Determine current day in WITA (Asia/Makassar) for K03
  useEffect(() => {
    try {
      const day = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        timeZone: 'Asia/Makassar',
      }).format(new Date());
      setTodayDayName(day); // e.g. "Kamis", "Senin"
    } catch {
      // Fallback
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      setTodayDayName(days[new Date().getDay()]);
    }
  }, []);

  // Distinct kecamatan list for dropdown
  const kecamatanList = useMemo(() => {
    const set = new Set<string>();
    initialSchedules.forEach((s) => set.add(s.kecamatan));
    return ['Semua', ...Array.from(set).sort()];
  }, [initialSchedules]);

  // Check if row matches today's day (K03)
  const isToday = (hariStr: string): boolean => {
    if (!todayDayName) return false;
    const lower = hariStr.toLowerCase();
    const todayLower = todayDayName.toLowerCase();
    if (lower.includes('setiap hari')) return true;
    return lower.includes(todayLower);
  };

  // Filtered schedules
  const filtered = useMemo(() => {
    return initialSchedules.filter((item) => {
      const matchKec =
        selectedKecamatan === 'Semua' ||
        item.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase();

      const q = search.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.kecamatan.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q) ||
        item.titikKumpul.toLowerCase().includes(q);

      return matchKec && matchQuery;
    });
  }, [initialSchedules, selectedKecamatan, search]);

  const countToday = useMemo(() => {
    return filtered.filter((s) => isToday(s.hari)).length;
  }, [filtered, todayDayName]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShareWhatsApp = (item: JadwalItem) => {
    const text = `Jadwal angkut sampah Kecamatan ${item.kecamatan} (${item.wilayah}): Hari ${item.hari}, Jam ${item.jam}, Titik Kumpul: ${item.titikKumpul}. Informasi lengkap DLH Tana Toraja: https://dlh.tanatorajakab.go.id/informasi#jadwal`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const resetFilter = () => {
    setSearch('');
    setSelectedKecamatan('Semua');
  };

  return (
    <div id="jadwal" className="space-y-6">
      {/* Header action toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Jadwal Pengangkutan Sampah
            </h2>
            {stale && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                Data cadangan
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Letakkan sampah di titik kumpul sebelum jam pengangkutan tiba.
          </p>
        </div>

        {/* Action buttons: Print & Reset */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold min-h-11 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Cetak Jadwal Pengangkutan"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Cetak Jadwal</span>
          </button>
        </div>
      </div>

      {/* K03 Summary alert if today has collection */}
      {todayDayName && countToday > 0 && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-sm text-emerald-950 no-print">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-emerald-700 flex-shrink-0" aria-hidden="true" />
            <span>
              Hari ini <strong>{todayDayName} (WITA)</strong>: Ada jadwal pengangkutan di{' '}
              <strong>{countToday} wilayah</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Filter Toolbar (F14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 no-print">
        {/* Dropdown Kecamatan */}
        <div>
          <label htmlFor="filter-kecamatan" className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Filter Kecamatan:
          </label>
          <select
            id="filter-kecamatan"
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:ring-2 focus:ring-brand min-h-11"
          >
            {kecamatanList.map((kec) => (
              <option key={kec} value={kec}>
                {kec === 'Semua' ? 'Semua Kecamatan' : `Kecamatan ${kec}`}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div>
          <label htmlFor="search-jadwal" className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Cari Wilayah / Titik Kumpul:
          </label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" aria-hidden="true" />
            <input
              id="search-jadwal"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="mis. Makale, Pantan, Pasar..."
              className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:ring-2 focus:ring-brand min-h-11"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Hapus kata pencarian"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Reset Filter Button */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={resetFilter}
            disabled={selectedKecamatan === 'Semua' && !search}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-sm font-semibold min-h-11 transition-colors"
          >
            Hapus Filter
          </button>
        </div>
      </div>

      {/* Screen Reader Result Announcer */}
      <div aria-live="polite" className="sr-only">
        Ditemukan {filtered.length} jadwal pengangkutan sampah.
      </div>

      {/* Print-only title */}
      <div className="hidden print-only mb-4">
        <h1 className="text-xl font-bold">Jadwal Angkut Sampah — Dinas Lingkungan Hidup Kabupaten Tana Toraja</h1>
        <p className="text-sm">Dicetak pada: {new Date().toLocaleDateString('id-ID')} | Kontak DLH: {siteConfig.telepon}</p>
      </div>

      {/* Schedule Content */}
      {filtered.length > 0 ? (
        <>
          {/* Mobile view: Stacked Cards (< 640px) */}
          <div className="sm:hidden space-y-3 no-print">
            {filtered.map((item, idx) => {
              const rowToday = isToday(item.hari);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    rowToday
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-extrabold text-brand text-base">
                      Kec. {item.kecamatan}
                    </span>
                    {rowToday && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-xs font-bold">
                        Hari Ini
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm mb-3">
                    {item.wilayah}
                  </h3>

                  <div className="space-y-1.5 text-xs text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Hari:</strong> {item.hari}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Jam:</strong> {item.jam}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span><strong>Titik Kumpul:</strong> {item.titikKumpul}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 p-2 min-h-11"
                    >
                      <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Bagikan ke WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop & Print Table (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-900 font-bold uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3.5">Kecamatan</th>
                  <th scope="col" className="px-4 py-3.5">Wilayah / Kelurahan / Lembang</th>
                  <th scope="col" className="px-4 py-3.5">Hari Angkut</th>
                  <th scope="col" className="px-4 py-3.5">Jam Pengangkutan</th>
                  <th scope="col" className="px-4 py-3.5">Titik Kumpul Sampah</th>
                  <th scope="col" className="px-4 py-3.5 text-right no-print">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filtered.map((item, idx) => {
                  const rowToday = isToday(item.hari);
                  return (
                    <tr
                      key={idx}
                      className={rowToday ? 'bg-emerald-50/60 font-medium' : 'hover:bg-gray-50'}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-900 font-semibold">
                        {item.kecamatan}
                      </td>
                      <td className="px-4 py-3.5 text-gray-900 font-medium">
                        {item.wilayah}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{item.hari}</span>
                          {rowToday && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-xs font-bold">
                              Hari Ini
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-700">
                        {item.jam}
                      </td>
                      <td className="px-4 py-3.5 text-gray-700">
                        {item.titikKumpul}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap no-print">
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(item)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 px-2 py-1.5 rounded hover:bg-emerald-50 transition-colors min-h-11"
                          title="Bagikan jadwal ini ke WhatsApp warga"
                        >
                          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Bagikan</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="p-8 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-center text-gray-600 space-y-3">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" aria-hidden="true" />
          <p className="font-semibold text-gray-800 text-base">
            Tidak ada jadwal untuk pencarian &quot;{search || selectedKecamatan}&quot;.
          </p>
          <p className="text-sm">
            Jadwal untuk wilayah Anda belum tercantum? Hubungi call center dinas di{' '}
            <a href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`} className="text-brand font-semibold hover:underline">
              {siteConfig.telepon}
            </a>.
          </p>
          <div>
            <button
              type="button"
              onClick={resetFilter}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-brand text-white font-semibold text-sm min-h-11 hover:bg-brand-light transition-colors"
            >
              Tampilkan Semua Jadwal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
