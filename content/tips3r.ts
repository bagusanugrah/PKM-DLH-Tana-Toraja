export interface Tip3R {
  prinsip: 'Kurangi' | 'Gunakan Ulang' | 'Daur Ulang';
  singkatan: string;
  penjelasan: string;
  tips: string[];
  warna: string;
}

export const tips3RList: Tip3R[] = [
  {
    prinsip: 'Kurangi',
    singkatan: 'Reduce',
    penjelasan: 'Kurangi timbulan sampah sedini mungkin sebelum barang menjadi sampah.',
    tips: [
      'Bawa kantong belanja kain sendiri saat berbelanja ke pasar atau warung.',
      'Bawa tumbler air minum isi ulang dan kurangi membeli minuman botol sekali pakai.',
      'Beli kebutuhan pangan secukupnya agar tidak ada makanan yang terbuang sia-sia.',
    ],
    warna: 'border-emerald-600 bg-emerald-50 text-emerald-950',
  },
  {
    prinsip: 'Gunakan Ulang',
    singkatan: 'Reuse',
    penjelasan: 'Manfaatkan kembali wadah atau barang yang masih layak pakai berulang kali.',
    tips: [
      'Gunakan kembali toples kaca dan kaleng biskuit sebagai wadah penyimpanan bumbu dapur.',
      'Perbaiki pakaian atau peralatan rumah tangga yang rusak ringan daripada langsung dibuang.',
      'Donasikan buku bacaan dan pakaian layak pakai kepada warga yang membutuhkan.',
    ],
    warna: 'border-blue-600 bg-blue-50 text-blue-950',
  },
  {
    prinsip: 'Daur Ulang',
    singkatan: 'Recycle',
    penjelasan: 'Ubah sampah terpilah menjadi produk baru yang memiliki nilai guna dan manfaat.',
    tips: [
      'Kumpulkan dan pilah sampah botol plastik, kaleng, serta kardus untuk disetor ke Bank Sampah.',
      'Olah sampah dapur organik menjadi kompos bernutrisi untuk tanaman pekarangan.',
      'Kreasikan sampah kain perca menjadi kerajinan keset atau sarung bantal.',
    ],
    warna: 'border-amber-600 bg-amber-50 text-amber-950',
  },
];
