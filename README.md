# Website Resmi Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja

Repositori resmi website Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja untuk penyampaian informasi persampahan (jadwal angkut, lokasi TPS/Bank Sampah), profil, katalog layanan publik, serta kanal pengaduan lingkungan hidup masyarakat.

Aplikasi ini dibangun menggunakan arsitektur **Next.js Full-Stack (App Router + Route Handlers)** dengan styling **Tailwind CSS**.

---

## 1. Arsitektur & Alur Data

```
Warga (HP / Komputer)
   │
   ├─► Antarmuka Publik (Next.js + Tailwind)
   │     │ (Server-Side Fetch / ISR 5 menit)
   │     ▼
   │   Route Handlers (/api/*) di Next.js
   │     │ (BFF Read-Only Publik)
   │     ├─► Google Sheets CSV (Jadwal Pengangkutan Sampah)
   │     └─► Google My Maps KML (Titik TPS, TPS3R & Bank Sampah)
   │
   └─► Halaman Pengaduan (Google Form Tertanam)
         │
         ▼
       Google Sheets Rekap Dinas (Privat)
         │
         ▼
       Pegawai DLH menerima notifikasi email & memperbarui status tindak lanjut
```

### Keunggulan Arsitektur:
1. **Satu Pintu Deployment (Single Project):** Frontend dan Route Handlers berada dalam satu proyek Next.js, siap di-deploy langsung ke Vercel atau Netlify secara gratis.
2. **Bebas Masalah *Cold Start*:** Tidak ada server backend terpisah yang tertidur (sebagaimana dialami paket gratis seperti Render). Website selalu terbuka cepat bagi warga.
3. **Privasi & Keamanan Data (UU No. 27/2022 PDP):** Formulir pengaduan menggunakan Google Form resmi dinas. Server website tidak pernah menyimpan nama, nomor HP, atau data pelapor di database luar.
4. **Ketahanan Sistem (Fallback):** Jika API atau layanan Google sedang mengalami kendala, website tetap menyajikan data fallback statis tanpa gangguan.

---

## 2. Struktur Repositori

```
dlh-tanatoraja/
├── app/                        # App Router (Beranda, Profil, Layanan, Informasi, Pengaduan, Privasi, 404)
│   ├── api/                    # Route Handlers serverless (health, schedules, locations, announcements)
│   ├── layout.tsx              # Layout utama (Header, Navigasi, Footer, Skip Link)
│   ├── page.tsx                # Halaman Beranda
│   ├── sitemap.ts              # Sitemap generator
│   ├── robots.ts               # Robots.txt
│   └── manifest.ts             # PWA Manifest
├── components/                 # Komponen UI aksesibel & modular
├── content/                    # Sumber teks dinas & fallback JSON
├── lib/                        # Logika data serverless (schedules, locations, announcements, api)
├── public/                     # Aset publik (formulir PDF, icon SVG/WebP)
├── docs/
│   ├── PANDUAN-PENGELOLAAN.md  # Panduan lengkap pegawai dinas (tanpa kode)
│   ├── DAFTAR-AKUN.md          # Prosedur serah terima akun & keamanan
│   ├── HASIL-UJI-PENGGUNA.md   # Catatan bukti usability testing warga & pegawai
│   ├── AGENDA-PELATIHAN.md     # Rencana pelatihan staf dinas (± 90 menit)
│   └── TEMPLATE-SHEETS-REKAP.md# Rumus otomatis & format Google Sheets rekapitulasi
├── scripts/
│   └── check-placeholders.mjs  # Skrip verifikasi teks berkurung siku
├── .env.example                # Template variabel lingkungan
├── PRD.md                      # Product Requirements Document lengkap (v1.2)
└── README.md
```

---

## 3. Prasyarat Sistem

- **Node.js:** Versi LTS (>= v18, direkomendasikan v20 / v22)
- **NPM:** Versi >= 9

---

## 4. Panduan Menjalankan Aplikasi (Lokal)

### 1. Salin Konfigurasi Environment:
```bash
cp .env.example .env
```

### 2. Pasang Dependensi:
```bash
npm install
```

### 3. Jalankan Server Pengembangan:
```bash
npm run dev
```

Buka peramban di: **`http://localhost:3000`**

---

## 5. Perintah Build & Pengujian

```bash
# Verifikasi tidak ada placeholder berkurung siku tersisa
npm run check-placeholders

# Build untuk produksi
npm run build

# Menjalankan build produksi secara lokal
npm run start
```

---

## 6. Keputusan Deployment (Hosting Gratis)

- **Platform Utama:** Vercel (Paket Hobby) atau Cloudflare Pages / Netlify dengan SSL/HTTPS otomatis.
- Cukup hubungkan repositori GitHub ke akun Vercel. Setiap ada pembaruan (*push*) ke cabang `main`, deployment akan berjalan otomatis dalam 1 menit tanpa biaya bulanan.

---

## 7. Matriks Fitur (F01–F24 & K01–K15)

| Kode | Fitur | Status |
|---|---|---|
| **F01** | Menu navigasi konsisten + tombol menu HP | Selesai |
| **F02** | Tombol "Pengaduan" selalu tampak di header | Selesai |
| **F03** | Footer lengkap (Alamat, jam layanan, telp, email) | Selesai |
| **F04** | Tautan media sosial resmi (Facebook, Instagram, YouTube) | Selesai |
| **F05** | Banner Beranda + tombol ajakan melapor | Selesai |
| **F06** | 4 Kartu menu cepat (Layanan, Jadwal, Lokasi TPS, Profil) | Selesai |
| **F07** | Panduan memilah sampah (Organik, Anorganik, B3) | Selesai |
| **F08** | Tiga langkah cara melapor yang jujur & jelas | Selesai |
| **F09** | Pengumuman singkat dinas (kondisional) | Selesai |
| **F10** | Halaman Profil (Visi, misi, struktur, kontak, peta kantor) | Selesai |
| **F11** | Daftar layanan dengan accordion buka-tutup detail | Selesai |
| **F12** | Tombol unduh formulir layanan (PDF) | Selesai |
| **F13** | Tabel jadwal angkut sampah per wilayah | Selesai |
| **F14** | Filter & pencarian kecamatan pada tabel jadwal | Selesai |
| **F15** | Peta interaktif Google My Maps titik TPS/TPS3R/Bank Sampah | Selesai |
| **F16** | Daftar lokasi + tombol "Petunjuk arah" Google Maps | Selesai |
| **F17** | Dukungan pembacaan jadwal otomatis dari Google Sheets | Selesai |
| **F18** | Google Form pengaduan tertanam (tanpa login akun Google) | Selesai |
| **F19** | Kotak & pernyataan persetujuan data pribadi (UU PDP) | Selesai |
| **F20** | Pesan konfirmasi langkah selanjutnya setelah melapor | Selesai |
| **F21** | Tombol WhatsApp dinas untuk pengiriman foto bukti | Selesai |
| **F22** | Rekapitulasi otomatis di Google Sheets dinas | Selesai |
| **F23** | Notifikasi email seketika untuk laporan baru | Selesai |
| **F24** | Kolom tindak lanjut di Sheets (Status, Petugas, Tgl, Catatan) | Selesai |
| **K01** | Halaman Kebijakan Privasi (`/privasi`) komprehensif | Selesai |
| **K02** | FAQ (Pertanyaan yang sering diajukan) di Beranda & Pengaduan | Selesai |
| **K03** | Penanda otomatis "Hari Ini" (WITA) pada jadwal angkut | Selesai |
| **K04** | Fitur interaktif pencarian cepat "Cek Jenis Sampah" | Selesai |
| **K05** | Kartu edukasi prinsip 3R (Kurangi, Gunakan ulang, Daur ulang) | Selesai |
| **K06** | Angka singkat cakupan wilayah dinas dari data nyata | Selesai |
| **K07** | Tombol bagikan jadwal & lokasi ke WhatsApp warga | Selesai |
| **K08** | Tombol cetak jadwal rapi untuk posyandu/kantor lembang | Selesai |
| **K09** | Panduan tips melapor efektif & peringatan darurat 112 | Selesai |
| **K10** | Kontrol ukuran teks aksesibel (Normal / A+ 125%) | Selesai |
| **K11** | Manifest PWA & kesiapan akses offline | Selesai |
| **K12** | Identitas ornamen geometris Pa'ssura & salam khas Toraja | Selesai |
| **K13** | Tab "Ringkasan" rumus otomatis & batas keterlambatan di Sheets | Selesai |
| **K14** | Nomor registrasi laporan otomatis di Sheets rekap | Selesai |
| **K15** | Standar layer, warna, dan legenda titik peta My Maps | Selesai |

---

## 8. Lisensi & Hak Cipta

Dikembangkan untuk **Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja**, Provinsi Sulawesi Selatan.
