export interface JenisMasalah {
  id: string;
  label: string;
  deskripsiSingkat: string;
}

export const daftarJenisMasalah: JenisMasalah[] = [
  {
    id: 'sampah-menumpuk',
    label: 'Sampah menumpuk atau dibuang sembarangan',
    deskripsiSingkat: 'Timbunan sampah liar di pinggir jalan, lahan kosong, atau fasilitas umum.',
  },
  {
    id: 'sampah-tidak-diangkut',
    label: 'Sampah tidak diangkut sesuai jadwal',
    deskripsiSingkat: 'Bak penampung/TPS meluap karena armada belum mengangkut sesuai jadwal reguler.',
  },
  {
    id: 'pembakaran-sampah',
    label: 'Pembakaran sampah',
    deskripsiSingkat: 'Aktivitas membakar sampah yang mengganggu pernapasan warga sekitar.',
  },
  {
    id: 'pencemaran-air',
    label: 'Pencemaran air (sungai, selokan, mata air)',
    deskripsiSingkat: 'Pembuangan kotoran, limbah cair, atau sampah ke aliran air dan mata air warga.',
  },
  {
    id: 'pencemaran-udara',
    label: 'Pencemaran udara (asap atau bau menyengat)',
    deskripsiSingkat: 'Bau bangkai/limbah menyengat atau asap pekat dari aktivitas tertentu.',
  },
  {
    id: 'limbah-usaha',
    label: 'Limbah dari usaha atau kegiatan (pasar, rumah makan, bengkel, peternakan, dll.)',
    deskripsiSingkat: 'Limbah usaha niaga atau peternakan yang tidak dikelola dengan benar.',
  },
  {
    id: 'limbah-b3',
    label: 'Limbah B3 (baterai, oli bekas, bahan kimia, dll.)',
    deskripsiSingkat: 'Pembuangan zat berbahaya dan beracun yang mengancam keselamatan.',
  },
  {
    id: 'kebisingan',
    label: 'Kebisingan',
    deskripsiSingkat: 'Suara bising mesin atau aktivitas berlebihan yang melewati batas kenyamanan.',
  },
  {
    id: 'kerusakan-pohon',
    label: 'Kerusakan atau penebangan pohon dan ruang terbuka hijau',
    deskripsiSingkat: 'Penebangan pohon pelindung jalan atau perusakan taman publik tanpa izin.',
  },
  {
    id: 'lainnya',
    label: 'Lainnya',
    deskripsiSingkat: 'Masalah lingkungan hidup lainnya yang belum tercantum di atas.',
  },
];
