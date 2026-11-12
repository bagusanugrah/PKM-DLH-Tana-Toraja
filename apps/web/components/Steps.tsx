import { ClipboardList, CheckSquare, Users } from 'lucide-react';

const steps = [
  {
    nomor: 1,
    judul: 'Isi Formulir',
    penjelasan: 'Buka halaman Pengaduan dan isi nama, nomor HP, jenis masalah lingkungan, lokasi, serta ceritanya.',
    ikon: ClipboardList,
  },
  {
    nomor: 2,
    judul: 'Setujui & Kirim',
    penjelasan: 'Centang kotak persetujuan penggunaan data pribadi demi kepatuhan UU PDP No. 27/2022, lalu klik tombol Kirim.',
    ikon: CheckSquare,
  },
  {
    nomor: 3,
    judul: 'Petugas Menindaklanjuti',
    penjelasan: 'Petugas DLH menerima laporan dan menugaskan tim lapangan. Petugas akan menghubungi nomor HP Anda jika butuh konfirmasi.',
    ikon: Users,
  },
];

export function Steps() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200" aria-labelledby="steps-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <span>Alur Pengaduan</span>
          </span>
          <h2 id="steps-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Tiga Langkah Mudah Melapor Masalah Lingkungan
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Warga tidak perlu membuat akun atau memasang aplikasi tambahan. Cukup melalui browser di HP Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => {
            const Icon = step.ikon;
            return (
              <div
                key={step.nomor}
                className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-brand text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                      {step.nomor}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.judul}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.penjelasan}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
