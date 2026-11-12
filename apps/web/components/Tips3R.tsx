import { ArrowDownRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { tips3RList } from '../content/tips3r';

const icons = [ArrowDownRight, RefreshCw, Sparkles];

export function Tips3R() {
  return (
    <section className="py-12 bg-white" aria-labelledby="tips-3r-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
            <span>Prinsip Ramah Lingkungan</span>
          </span>
          <h2 id="tips-3r-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Terapkan 3R: Kurangi, Gunakan Ulang, Daur Ulang
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Langkah sederhana sehari-hari untuk mengurangi volume sampah di Tana Toraja mulai dari lingkungan keluarga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips3RList.map((tip, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={tip.prinsip}
                className={`rounded-xl border-2 p-6 shadow-sm flex flex-col justify-between ${tip.warna}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/80 shadow-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-current" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">
                        {tip.prinsip}
                      </h3>
                      <span className="text-xs font-semibold text-gray-600">
                        ({tip.singkatan})
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-800 mb-4 font-medium leading-relaxed">
                    {tip.penjelasan}
                  </p>

                  <ul className="space-y-2 text-sm text-gray-800">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
