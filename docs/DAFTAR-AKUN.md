# Daftar Akun dan Serah Terima Website DLH Kabupaten Tana Toraja

Dokumen ini mencatat inventaris akun dan akses sistem website Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja untuk keperluan serah terima teknis.

> **PENTING (KEAMANAN):** 
> Kata sandi asli **JANGAN** ditulis dalam repositori kode ini. Kata sandi diserahkan terpisah melalui amplop tertutup atau pengelola kata sandi terenkripsi saat acara serah terima resmi. Dinas **wajib langsung mengganti kata sandi** setelah menerima akses.

---

## 1. Inventaris Akun

| Layanan / Akun | Alamat / Tautan | Username / Email | Pemegang Akses | Keterangan |
|---|---|---|---|---|
| **Google Resmi DLH** | https://accounts.google.com | `dlh.tanatoraja@gmail.com` | Pegawai DLH (Admin Utama) | Mengelola Google Form pengaduan, Sheets rekap laporan, Sheets jadwal, dan My Maps lokasi TPS |
| **Google My Maps** | https://mymaps.google.com | Terhubung akun Google DLH | Pegawai DLH (Seksi Pengelolaan Sampah) | Mengelola titik koordinat TPS, TPS3R, dan Bank Sampah |
| **Repositori Kode (GitHub)** | https://github.com/dlh-tanatoraja/website-dlh | Akun Organisasi / Perwakilan Tim | Tim Pengembang & Diskominfo | Menyimpan source code aplikasi Next.js dan NestJS |
| **Hosting Frontend (Next.js)** | https://vercel.com atau penyedia terpilih | Akun Tim / Diskominfo | Tim Pengembang & Diskominfo | Menayangkan antarmuka web publik |
| **Hosting API (NestJS)** | Layanan cloud web service | Akun Tim / Diskominfo | Tim Pengembang & Diskominfo | Menjalankan API tipis publik |

---

## 2. Prosedur Serah Terima Akun

1. **Pemeriksaan Akun Bersama:** Tim pengembang mendemonstrasikan login ke akun Google dinas bersama perwakilan DLH.
2. **Penggantian Kata Sandi:** Pegawai DLH yang ditugaskan mengganti kata sandi akun Google di hadapan tim pengembang dan mengaktifkan Verifikasi 2 Langkah (2FA) menggunakan nomor telepon dinas / aplikasi authenticator resmi.
3. **Pencabutan Akses Tim Pengembang:** Tim pengembang keluar (*sign out*) dari semua sesi aktif di perangkat pengembang.
4. **Penandatanganan Berita Acara:** Kedua belah pihak menandatangani Berita Acara Serah Terima Akun dan Hak Pengelolaan.
