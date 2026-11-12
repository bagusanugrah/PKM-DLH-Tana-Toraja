export interface Pejabat {
  nama: string;
  jabatan: string;
}

export interface ProfilData {
  tentangKami: string;
  visi: string;
  misi: string[];
  tugasPokok: string[];
  pejabat: Pejabat[];
  baganStruktur: {
    gambarUrl: string;
    altText: string;
    pdfUrl?: string;
  };
}

export const profilData: ProfilData = {
  tentangKami:
    'Dinas Lingkungan Hidup Kabupaten Tana Toraja merupakan unsur pelaksana urusan pemerintahan daerah di bidang lingkungan hidup. Kami bertugas mengelola persampahan, mengendalikan pencemaran dan kerusakan lingkungan, memelihara keanekaragaman hayati dan ruang terbuka hijau, serta melayani pengaduan lingkungan masyarakat demi menjaga kelestarian bumi Lakipadada.',
  visi: 'Terwujudnya Kabupaten Tana Toraja yang Bersih, Hijau, Lestari, dan Berwawasan Lingkungan Menuju Masyarakat yang Sejahtera dan Mandiri.',
  misi: [
    'Meningkatkan efektivitas pengelolaan sampah terpadu dari sumber hingga tempat pemrosesan akhir.',
    'Mendorong peran serta masyarakat, lembang, kelurahan, dan lembaga adat dalam pelestarian lingkungan hidup.',
    'Mengendalikan pencemaran air, udara, dan tanah secara terpadu dan berkelanjutan.',
    'Mengembangkan ruang terbuka hijau dan keanekaragaman hayati khas kearifan lokal Tana Toraja.',
    'Mewujudkan tata kelola pelayanan dinas yang ramah, cepat, transparan, dan akuntabel bagi seluruh warga.',
  ],
  tugasPokok: [
    'Perumusan kebijakan teknis di bidang lingkungan hidup dan persampahan.',
    'Pelaksanaan pelayanan kebersihan, pengangkutan sampah, dan pengelolaan TPA.',
    'Pengawasan izin lingkungan, dokumen AMDAL, UKL-UPL, dan SPPL.',
    'Penanganan pengaduan pencemaran dan kerusakan lingkungan hidup.',
    'Pemberdayaan bank sampah, TPS3R, dan edukasi pemilahan sampah warga.',
  ],
  pejabat: [
    { nama: 'Ir. Yulius Sampe Rante, M.Si', jabatan: 'Kepala Dinas' },
    { nama: 'Dra. Maria Pongtiku', jabatan: 'Sekretaris Dinas' },
    { nama: 'Markus Tandi, S.T., M.Env', jabatan: 'Kepala Bidang Pengelolaan Sampah dan Limbah B3' },
    { nama: 'Elisabeth Rombe, S.Hut', jabatan: 'Kepala Bidang Pengendalian Pencemaran dan Kerusakan Lingkungan' },
    { nama: 'Yohanis Salusu, S.Sos', jabatan: 'Kepala Bidang Penaatan dan Peningkatan Kapasitas Lingkungan Hidup' },
  ],
  baganStruktur: {
    gambarUrl: '/images/struktur-organisasi.svg',
    altText: 'Bagan Struktur Organisasi Dinas Lingkungan Hidup Kabupaten Tana Toraja',
  },
};
