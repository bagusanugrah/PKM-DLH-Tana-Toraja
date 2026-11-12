# Website Resmi Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja

Repositori resmi website Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja untuk penyampaian informasi persampahan (jadwal angkut, lokasi TPS/Bank Sampah), profil, katalog layanan publik, serta kanal pengaduan lingkungan hidup masyarakat.

Aplikasi ini dibangun menggunakan arsitektur **Monorepo** modern:
- **Frontend (`apps/web`):** Next.js (App Router, TypeScript) + Tailwind CSS
- **Backend Tipis (`apps/api`):** NestJS (TypeScript, tanpa database, BFF read-only dengan in-memory cache dan stale-while-error)

---

## 1. Arsitektur & Alur Data

```
Warga (HP / Komputer)
   │
   ├─► Antarmuka Publik (Next.js + Tailwind)
   │     │ (Server-Side Fetch / ISR 5 menit)
   │     ▼
   │   NestJS API (Thin BFF)
   │     │ (Read-Only Publik)
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

### Prinsip Keamanan & Privasi (UU No. 27/2022 PDP):
1. **Tidak Ada Database Pelapor di Server Tim:** Formulir pengaduan menggunakan Google Form resmi dinas. Server tim tidak pernah menyimpan nama, nomor HP, atau rincian laporan warga.
2. **Spreadsheet Rekap Privat:** Spreadsheet rekap laporan bersifat privat hanya untuk email akun dinas DLH dan **dilarang keras** dipublikasikan ke web (*Publish to web*).
3. **Ketahanan Sistem (Fallback):** Jika API atau layanan Google sedang mengalami kendala, website tetap dapat diakses dengan cepat menggunakan data fallback statis.

---

## 2. Struktur Repositori

```
dlh-tanatoraja/
├── apps/
│   ├── web/                    # Frontend Next.js + Tailwind
│   │   ├── app/                # App Router (Beranda, Profil, Layanan, Informasi, Pengaduan, Privasi, 404)
│   │   ├── components/         # Komponen UI aksesibel & modular
│   │   ├── content/            # Single source of truth teks dinas & fallback JSON
│   │   └── lib/                # Klien fetch API ke NestJS
│   └── api/                    # Backend NestJS (Health, Schedules, Locations, Announcements)
│       └── src/
├── docs/
│   ├── PANDUAN-PENGELOLAAN.md  # Panduan lengkap pegawai dinas (tanpa kode)
│   ├── DAFTAR-AKUN.md          # Prosedur serah terima akun & keamanan
│   ├── HASIL-UJI-PENGGUNA.md   # Catatan bukti usability testing warga & pegawai
│   ├── AGENDA-PELATIHAN.md     # Rencana pelatihan staf dinas (± 90 menit)
│   └── TEMPLATE-SHEETS-REKAP.md# Rumus otomatis & format Google Sheets rekapitulasi
├── scripts/
│   └── check-placeholders.mjs  # Skrip verifikasi teks berkurung siku
├── .env.example                # Template variabel lingkungan
├── PRD.md                      # Product Requirements Document lengkap
└── README.md
```

---

## 3. Prasyarat Sistem

- **Node.js:** Versi LTS (>= v18, direkomendasikan v20 / v22)
- **NPM:** Versi >= 9 (Mendukung npm workspaces)

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

### 3. Jalankan Aplikasi dalam Mode Pengembangan:
```bash
# Menjalankan frontend dan backend secara bersamaan:
npm run dev

# Atau menjalankan secara terpisah:
npm run dev:api   # NestJS berjalan di http://localhost:3001
npm run dev:web   # Next.js berjalan di http://localhost:3000
```

Buka peramban di: **`http://localhost:3000`**

---

## 5. Perintah Build & Pengujian

```bash
# Uji coba parser & service NestJS
npm run test

# Verifikasi tidak ada placeholder berkurung siku tersisa
npm run check-placeholders

# Build seluruh workspace untuk produksi
npm run build
```

---

## 6. Keputusan Deployment (Hosting Gratis)

- **Frontend (Next.js):** Vercel (Paket Hobby) atau Cloudflare Pages / Netlify dengan SSL/HTTPS otomatis.
- **Backend (NestJS):** Layanan cloud web service (Render free web service, Fly.io, dsb.). Cold start pada paket gratis tidak mempengaruhi pengalaman warga secara langsung karena frontend menggunakan ISR (Incremental Static Regeneration) dengan *stale-while-error fallback*.

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
