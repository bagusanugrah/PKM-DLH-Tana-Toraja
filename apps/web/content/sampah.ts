export interface KategoriSampah {
  kategori: 'Organik' | 'Anorganik' | 'B3';
  judul: string;
  penjelasan: string;
  warnaBadge: string;
  warnaBorder: string;
  warnaBg: string;
  iconName: string;
  contoh: string[];
  caraPenanganan: string;
}

export const panduanSampah: KategoriSampah[] = [
  {
    kategori: 'Organik',
    judul: 'Sampah Organik (Sisa Hayati)',
    penjelasan: 'Sampah yang berasal dari sisa makhluk hidup dan mudah membusuk secara alami.',
    warnaBadge: 'bg-emerald-700 text-white',
    warnaBorder: 'border-emerald-500',
    warnaBg: 'bg-emerald-50',
    iconName: 'Leaf',
    contoh: ['Sisa makanan dan sayuran', 'Kulit buah dan ampas buah', 'Daun dan ranting pekarangan', 'Ampas kopi dan teh'],
    caraPenanganan:
      'Kumpulkan pada wadah tersendiri tanpa kantong plastik tebal. Sangat baik diolah menjadi kompos tanaman atau pakan ternak warga.',
  },
  {
    kategori: 'Anorganik',
    judul: 'Sampah Anorganik (Daur Ulang)',
    penjelasan: 'Sampah yang tidak mudah membusuk dan memiliki nilai ekonomi tinggi untuk didaur ulang.',
    warnaBadge: 'bg-amber-600 text-white',
    warnaBorder: 'border-amber-500',
    warnaBg: 'bg-amber-50',
    iconName: 'Recycle',
    contoh: ['Botol dan gelas plastik', 'Kardus dan kertas bekas', 'Kaleng minuman dan logam', 'Botol kaca utuh'],
    caraPenanganan:
      'Bilas sisa cairan, keringkan, dan pilah menurut jenisnya. Kumpulkan dan setorkan ke Bank Sampah terdekat untuk ditabung.',
  },
  {
    kategori: 'B3',
    judul: 'Sampah B3 (Bahan Berbahaya & Beracun)',
    penjelasan: 'Sampah sisa produk yang mengandung zat berbahaya bagi kesehatan manusia dan lingkungan hidup.',
    warnaBadge: 'bg-red-700 text-white',
    warnaBorder: 'border-red-500',
    warnaBg: 'bg-red-50',
    iconName: 'AlertTriangle',
    contoh: ['Baterai bekas dan aki', 'Lampu neon dan bohlam rusak', 'Obat-obatan kedaluwarsa', 'Wadah pestisida dan cat'],
    caraPenanganan:
      'Dilarang keras mencampur dengan sampah rumah tangga atau membakarnya. Simpan dalam wadah tertutup yang aman dari anak-anak, lalu hubungi DLH untuk petunjuk tempat penyerahan limbah B3.',
  },
];

export const aturanBuangSampah = [
  'Kemas sampah rumah tangga dengan rapi dan rapat dalam kantong agar tidak berserakan dan tidak diacak binatang.',
  'Letakkan sampah di titik kumpul TPS sebelum jam armada pengangkut tiba (pukul 06.00 WITA).',
  'Dilarang membuang sampah ke sungai, selokan, atau jurang karena memicu banjir dan merusak keindahan Toraja.',
  'Dilarang membakar sampah di area pemukiman karena asap berbahaya bagi kesehatan paru-paru.',
];
