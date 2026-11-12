import Link from 'next/link';
import { AlertCircle, Calendar, MapPin } from 'lucide-react';
import { TongkonanIcon, TorajaOrnament } from './TorajaOrnament';

export function Banner() {
  return (
    <section className="relative bg-gradient-to-br from-brand-dark via-brand to-brand-darker text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-inner">
      {/* Subtle Toraja geometric background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-between">
        <TorajaOrnament className="h-6 w-full text-white" />
        <TorajaOrnament className="h-6 w-full text-white" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium mb-6 text-emerald-100">
          <TongkonanIcon className="w-4 h-4 text-amber-300" />
          <span>Situs Resmi DLH Kabupaten Tana Toraja</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Dinas Lingkungan Hidup Kabupaten Tana Toraja
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Lingkungan bersih mulai dari kita. Cari jadwal angkut sampah, lokasi TPS/Bank Sampah terdekat, atau laporkan masalah lingkungan di sekitar Anda dengan mudah.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/pengaduan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-base min-h-11 shadow-lg transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white"
          >
            <AlertCircle className="w-5 h-5 text-gray-950" aria-hidden="true" />
            <span>Laporkan Masalah Lingkungan</span>
          </Link>

          <Link
            href="/informasi#jadwal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-base min-h-11 transition-all focus-visible:ring-2 focus-visible:ring-white"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            <span>Cek Jadwal Angkut</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
