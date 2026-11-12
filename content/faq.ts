export interface FAQItem {
  id: string;
  kategori: 'Sampah' | 'Pengaduan' | 'Layanan';
  pertanyaan: string;
  jawaban: string;
}

export const daftarFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    kategori: 'Pengaduan',
    pertanyaan: 'Apakah saya harus punya akun Google untuk melapor masalah lingkungan?',
    jawaban:
      'Tidak perlu. Anda cukup membuka halaman Pengaduan di website ini dan mengisi formulir yang tersedia. Warga tidak perlu masuk akun ataupun mendaftar.',
  },
  {
    id: 'faq-2',
    kategori: 'Pengaduan',
    pertanyaan: 'Bagaimana cara mengirim foto bukti tumpukan sampah atau pencemaran?',
    jawaban:
      'Foto bukti dapat Anda kirimkan langsung melalui nomor WhatsApp resmi DLH Tana Toraja di 0812-3456-7890 (tersedia tombol praktis di halaman Pengaduan). Cukup sertakan nama pelapor dan lokasi kejadian.',
  },
  {
    id: 'faq-3',
    kategori: 'Pengaduan',
    pertanyaan: 'Apakah data pribadi saya aman saat mengirim laporan pengaduan?',
    jawaban:
      'Sangat aman. Data nama, nomor HP, dan lokasi Anda hanya digunakan oleh petugas DLH untuk menindaklanjuti laporan. Website ini tidak menyimpan data pribadi Anda di server luar, dan pengelolaan data mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
  },
  {
    id: 'faq-4',
    kategori: 'Pengaduan',
    pertanyaan: 'Setelah saya mengirimkan laporan, apa langkah selanjutnya yang dilakukan dinas?',
    jawaban:
      'Laporan Anda otomatis tercatat di sistem rekap DLH dan petugas menerima notifikasi langsung. Tim lapangan memeriksa lokasi laporan dan menindaklanjutinya. Jika membutuhkan patokan tambahan, petugas akan menghubungi nomor HP Anda.',
  },
  {
    id: 'faq-5',
    kategori: 'Pengaduan',
    pertanyaan: 'Apakah saya bisa melihat status penanganan laporan saya secara langsung di website?',
    jawaban:
      'Saat ini tindak lanjut laporan diperbarui secara internal oleh petugas di lembar kerja dinas demi menjaga privasi warga. Jika Anda ingin menanyakan status perkembangan laporan, Anda dapat menghubungi kontak dinas di (0423) 22212 atau WhatsApp dinas.',
  },
  {
    id: 'faq-6',
    kategori: 'Pengaduan',
    pertanyaan: 'Apakah ada pungutan biaya untuk melapor tumpukan sampah?',
    jawaban:
      'Tidak ada. Pelayanan pengaduan masalah lingkungan hidup tidak dipungut biaya apa pun (100% Gratis).',
  },
  {
    id: 'faq-7',
    kategori: 'Sampah',
    pertanyaan: 'Bagaimana cara mengetahui jadwal pengangkutan sampah di wilayah saya?',
    jawaban:
      'Buka halaman Informasi pada website ini, lalu ketik nama kecamatan atau kelurahan/lembang Anda pada kolom pencarian jadwal untuk melihat hari, jam, dan titik kumpul sampah.',
  },
  {
    id: 'faq-8',
    kategori: 'Sampah',
    pertanyaan: 'Di mana saya bisa menyetor sampah anorganik yang sudah dipilah?',
    jawaban:
      'Anda dapat melihat titik Bank Sampah dan TPS3R terdekat pada peta interaktif dan daftar lokasi di halaman Informasi. Di sana terdapat tombol Petunjuk Arah menuju lokasi.',
  },
  {
    id: 'faq-9',
    kategori: 'Sampah',
    pertanyaan: 'Apa itu sampah B3 dan bagaimana cara membuangnya?',
    jawaban:
      'Sampah B3 adalah limbah bahan berbahaya dan beracun seperti baterai bekas, lampu neon pecah, wadah pestisida, dan obat kedaluwarsa. Jangan campur ke sampah biasa; simpan terpisah di wadah tertutup dan hubungi DLH untuk arahan penyerahan aman.',
  },
  {
    id: 'faq-10',
    kategori: 'Layanan',
    pertanyaan: 'Di mana loket pengajuan dokumen lingkungan dan rekomendasi DLH?',
    jawaban:
      'Pengajuan berkas dilayani di Loket Pelayanan Terpadu Kantor DLH Kabupaten Tana Toraja, Jl. Pongtiku No. 120, Pantan, Makale pada jam kerja Senin–Jumat pukul 08.00–16.00 WITA.',
  },
  {
    id: 'faq-11',
    kategori: 'Layanan',
    pertanyaan: 'Bagaimana jika persyaratan permohonan layanan saya belum lengkap?',
    jawaban:
      'Anda disarankan mengonsultasikan persyaratan terlebih dahulu melalui telepon dinas di (0423) 22212 atau datang langsung ke ruang konsultasi bidang terkait sebelum mengajukan berkas resmi.',
  },
];
