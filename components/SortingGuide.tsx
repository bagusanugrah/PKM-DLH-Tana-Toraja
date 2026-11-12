import { Leaf, Recycle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { panduanSampah, aturanBuangSampah } from '../content/sampah';

const iconMap = {
  Leaf,
  Recycle,
  AlertTriangle,
};

export function SortingGuide() {
  return (
    <section className="py-12 bg-white" aria-labelledby="sorting-guide-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <span>Edukasi Lingkungan</span>
          </div>
          <h2 id="sorting-guide-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Panduan Memilah Sampah dari Rumah
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Pilah sampah Anda menjadi tiga kelompok utama demi kelestarian alam Tana Toraja dan mempermudah pengolahan daur ulang.
          </p>
        </div>

        {/* 3 Sorting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panduanSampah.map((item) => {
            const Icon = iconMap[item.iconName as keyof typeof iconMap] || Leaf;
            return (
              <div
                key={item.kategori}
                className={`flex flex-col justify-between rounded-xl border-2 ${item.warnaBorder} ${item.warnaBg} p-6 shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.warnaBadge}`}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.kategori}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.judul}
                  </h3>

                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {item.penjelasan}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                      Contoh Sampah:
                    </h4>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      {item.contoh.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">&bull;</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/60 mt-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                    Cara Menangani:
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {item.caraPenanganan}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aturan Buang Sampah Box */}
        {aturanBuangSampah && aturanBuangSampah.length > 0 && (
          <div className="mt-10 rounded-xl bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand" aria-hidden="true" />
              <span>Tata Tertib &amp; Etika Membuang Sampah di Tana Toraja</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {aturanBuangSampah.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
