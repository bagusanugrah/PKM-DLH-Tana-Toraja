'use client';

import { useState, useId } from 'react';
import { Search, X, HelpCircle, CheckCircle } from 'lucide-react';
import { daftarSampah, SampahItem } from '../content/daftarSampah';
import { siteConfig } from '../content/site';

export function WasteChecker() {
  const [query, setQuery] = useState('');
  const inputId = useId();

  const filteredItems = query.trim().length > 0
    ? daftarSampah.filter((item) => {
        const q = query.toLowerCase().trim();
        const inName = item.nama.toLowerCase().includes(q);
        const inAlias = item.alias?.some((a) => a.toLowerCase().includes(q));
        return inName || inAlias;
      })
    : [];

  const getCategoryBadge = (kategori: SampahItem['kategori']) => {
    switch (kategori) {
      case 'Organik':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Anorganik':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'B3':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <section className="py-10 bg-brand-surface border-y border-brand/10" aria-labelledby="waste-checker-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold mb-2">
            <span>Fitur Praktis</span>
          </span>
          <h2 id="waste-checker-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Cek Jenis Sampah
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Bingung memilah barang bekas? Ketik namanya untuk mengetahui kelompok sampah dan cara penanganannya.
          </p>
        </div>

        {/* Input box */}
        <div className="relative mb-4">
          <label htmlFor={inputId} className="block text-sm font-semibold text-gray-800 mb-1.5 text-left">
            Ketik Nama Sampah:
          </label>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" aria-hidden="true" />
            <input
              id={inputId}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: botol plastik, baterai bekas, daun, kardus..."
              className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-base placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand shadow-sm min-h-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600 rounded-full min-h-8 min-w-8 flex items-center justify-center"
                aria-label="Hapus kata pencarian"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Live Region for Screen Readers */}
        <div aria-live="polite" className="sr-only">
          {query.trim().length > 0
            ? `Ditemukan ${filteredItems.length} hasil untuk ${query}`
            : ''}
        </div>

        {/* Results List */}
        {query.trim().length > 0 && (
          <div className="mt-4 space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.nama}
                  className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base">
                        {item.nama}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryBadge(item.kategori)}`}>
                        {item.kategori}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.saran}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 bg-white rounded-lg border border-dashed border-gray-300 text-center text-sm text-gray-600">
                <HelpCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold text-gray-800">
                  Belum ada di daftar.
                </p>
                <p className="mt-1">
                  Ingin kepastian penanganan? Hubungi layanan konsultasi DLH di{' '}
                  <a href={`tel:${siteConfig.telepon.replace(/[^0-9]/g, '')}`} className="text-brand font-semibold hover:underline">
                    {siteConfig.telepon}
                  </a>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
