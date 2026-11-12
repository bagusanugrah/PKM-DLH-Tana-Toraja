export interface Layanan {
  id: string;
  nama: string;
  deskripsi: string;
  syarat: string[];
  alur: string[];
  biaya: string;
  lamaProses: string;
  tempat: string;
  formulirUrl?: string;
  formulirNama?: string;
}

export const daftarLayanan: Layanan[] = [
  {
    id: 'layanan-pengaduan',
    nama: 'Pengaduan Masalah Lingkungan & Sampah Liar',
    deskripsi:
      'Layanan penanganan laporan tumpukan sampah, pembakaran sampah liar, dan pencemaran air atau udara dari warga.',
    syarat: [
      'Identitas pelapor (Nama dan Nomor HP aktif).',
      'Lokasi kejadian yang jelas (dilengkapi patokan atau nama jalan/kelurahan/lembang).',
      'Uraian singkat masalah yang terjadi.',
      'Foto bukti keadaan di lokasi (dikirim via WhatsApp resmi DLH).',
    ],
    alur: [
      'Warga mengisi formulir pengaduan online di website DLH Tana Toraja.',
      'Petugas menerima notifikasi laporan dan memverifikasi lokasi.',
      'Tim penanganan lapangan diterjunkan untuk survei atau pengangkutan sampah.',
      'Petugas mencatat status penyelesaian di rekap dinas dan mengabari pelapor bila diperlukan.',
    ],
    biaya: 'Gratis (Tidak dipungut biaya)',
    lamaProses: '1–3 hari kerja (tergantung tingkat urgensi dan lokasi)',
    tempat: 'Online via Halaman Pengaduan Website DLH / Kantor DLH Tana Toraja',
  },
  {
    id: 'layanan-angkutan-khusus',
    nama: 'Pelayanan Pengangkutan Sampah Acara / Kegiatan Khusus',
    deskripsi:
      'Layanan permohonan penyediaan bak penampung dan pengangkutan sampah untuk upacara adat (Rambu Solo/Rambu Tuka), pasar musiman, atau perayaan umum.',
    syarat: [
      'Surat permohonan tertulis dari penyelenggara atau pemerintah lembang/kelurahan.',
      'Rencana jadwal pelaksanaan dan perkiraan volume timbulan sampah.',
      'Peta atau denah lokasi peletakan titik kumpul bak sampah sementara.',
    ],
    alur: [
      'Pemohon mengajukan surat permohonan ke loket pelayanan kantor DLH.',
      'Seksi Pengelolaan Sampah memeriksa kesiapan armada truk dan jadwal.',
      'Petugas menempatkan kontainer/bak sampah sebelum acara dimulai.',
      'Armada mengangkut sampah menuju TPA setelah acara selesai.',
    ],
    biaya: 'Sesuai Peraturan Daerah tentang Retribusi Jasa Umum Pelayanan Persampahan',
    lamaProses: '3 hari kerja sebelum pelaksanaan kegiatan',
    tempat: 'Loket Pelayanan Terpadu Kantor DLH Kabupaten Tana Toraja',
    formulirUrl: '/formulir/permohonan-angkutan-sampah-acara.pdf',
    formulirNama: 'Formulir Permohonan Pengangkutan Sampah (PDF, 95 KB)',
  },
  {
    id: 'layanan-pembinaan-bank-sampah',
    nama: 'Pembinaan & Pendampingan Bank Sampah / TPS3R',
    deskripsi:
      'Fasilitasi pembentukan bank sampah unit baru, pelatihan pemilahan sampah, dan pendampingan operasional TPS3R di lembang dan kelurahan.',
    syarat: [
      'Surat permohonan dari kelompok warga, sekolah, atau pengurus Lembang/Kelurahan.',
      'Daftar calon pengurus bank sampah minimal 5 orang.',
      'Ketersediaan calon lokasi penyimpanan atau penimbangan sampah terpilah.',
    ],
    alur: [
      'Perwakilan kelompok mengajukan permohonan pembinaan ke DLH.',
      'Penyuluh lingkungan DLH melakukan kunjungan survei lokasi.',
      'Pelaksanaan workshop pemilahan sampah dan simulasi pembukuan bank sampah.',
      'Penyerahan buku tabungan sampah contoh dan pendampingan berkala.',
    ],
    biaya: 'Gratis (Program Pemberdayaan Masyarakat DLH)',
    lamaProses: '5 hari kerja sejak permohonan diterima',
    tempat: 'Bidang Pengelolaan Sampah dan Limbah B3, Kantor DLH Tana Toraja',
  },
  {
    id: 'layanan-rekomendasi-lingkungan',
    nama: 'Penerbitan Surat Pernyataan Kesanggupan Pengelolaan Lingkungan (SPPL)',
    deskripsi:
      'Penerbitan dokumen legalitas lingkungan bagi usaha mikro, kecil, dan kegiatan yang tidak berdampak penting terhadap lingkungan.',
    syarat: [
      'Nomor Induk Berusaha (NIB) dari sistem OSS.',
      'Fotokopi KTP penanggung jawab usaha.',
      'Surat keterangan lokasi dari Lurah atau Kepala Lembang.',
      'Formulir isian rencana pengelolaan dan pemantauan lingkungan hidup.',
    ],
    alur: [
      'Pemohon mendaftar dan menyerahkan berkas persyaratan di loket DLH.',
      'Verifikator memeriksa kelengkapan administrasi dan lokasi usaha.',
      'Penerbitan bukti registrasi atau persetujuan teknis SPPL.',
      'Pemohon menerima dokumen SPPL yang telah disahkan.',
    ],
    biaya: 'Gratis (Tidak dipungut biaya retribusi)',
    lamaProses: '3–5 hari kerja',
    tempat: 'Loket Pelayanan Perizinan Lingkungan Kantor DLH Tana Toraja',
    formulirUrl: '/formulir/formulir-permohonan-sppl.pdf',
    formulirNama: 'Formulir Isian SPPL (PDF, 140 KB)',
  },
  {
    id: 'layanan-uji-kualitas-lingkungan',
    nama: 'Konsultasi Pemantauan Kualitas Air & Udara',
    deskripsi:
      'Layanan konsultasi dan pemantauan berkala baku mutu air sungai, sumber air minum, dan udara ambien di wilayah Tana Toraja.',
    syarat: [
      'Surat permohonan atau pengaduan tertulis.',
      'Penyebutan titik koordinat atau lokasi sumber air/udara yang ingin dikonsultasikan.',
    ],
    alur: [
      'Pemohon menyampaikan surat permohonan di loket DLH.',
      'Bidang Pengendalian Pencemaran mengagendakan pengambilan sampel lapangan.',
      'Pengujian sampel melalui laboratorium lingkungan terakreditasi.',
      'Penyampaian hasil telaah kualitas lingkungan kepada pemohon.',
    ],
    biaya: 'Sesuai tarif pengujian laboratorium yang berlaku',
    lamaProses: '7–14 hari kerja (mengikuti waktu uji laboratorium)',
    tempat: 'Bidang Pengendalian Pencemaran dan Kerusakan Lingkungan Kantor DLH',
  },
];
