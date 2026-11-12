import Link from 'next/link';
import { AlertCircle, Home, Send } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 bg-gray-50 flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <AlertCircle className="w-9 h-9" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-brand block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Halaman yang Anda cari mungkin salah ketik alamatnya, sudah dipindahkan, atau tidak lagi tersedia.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-light text-white font-semibold text-sm min-h-11 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/pengaduan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm min-h-11 transition-colors"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Laporkan Masalah</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
