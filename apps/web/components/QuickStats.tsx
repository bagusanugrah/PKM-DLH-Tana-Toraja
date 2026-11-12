interface QuickStatsProps {
  tpsCount: number;
  tps3rCount: number;
  bankSampahCount: number;
  kecamatanCount: number;
}

export function QuickStats({
  tpsCount,
  tps3rCount,
  bankSampahCount,
  kecamatanCount,
}: QuickStatsProps) {
  // If no data exists, do not render to avoid false figures
  if (!tpsCount && !tps3rCount && !bankSampahCount && !kecamatanCount) {
    return null;
  }

  const stats = [
    { label: 'Kecamatan Terlayani Jadwal', value: kecamatanCount, desc: 'Wilayah terdata' },
    { label: 'Titik TPS', value: tpsCount, desc: 'Tempat Pembuangan Sementara' },
    { label: 'Fasilitas TPS3R', value: tps3rCount, desc: 'Pengolahan Sampah 3R' },
    { label: 'Bank Sampah Unit', value: bankSampahCount, desc: 'Penampungan Terpilah' },
  ].filter((s) => s.value > 0);

  if (stats.length === 0) return null;

  return (
    <section className="bg-white py-6 border-b border-gray-200" aria-label="Cakupan Layanan DLH">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((s, idx) => (
            <div key={s.label} className={`px-3 ${idx > 1 ? 'pt-4 md:pt-0' : ''}`}>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-gray-900 mt-1">
                {s.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
