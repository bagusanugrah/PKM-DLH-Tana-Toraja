# PRD — Website Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja

> **Dokumen ini ditulis agar AI coding agent apa pun (atau developer manusia) bisa membangun seluruh website tanpa bertanya ulang.**
> Semua isi dokumen sumber "Kebutuhan dan Rancangan Website DLH Tana Toraja (sementara)" sudah dimasukkan di sini. Bagian yang **disesuaikan** karena pemilihan stack modern (Next.js App Router + Tailwind CSS full-stack tanpa backend NestJS terpisah) diberi label **[KEPUTUSAN TEKNIS]** supaya mudah dibedakan dari kebutuhan asli.
>
> **Konteks:** proyek ini adalah tugas dari **Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja** sebagai mitra. Karena dokumen sumber belum menjabarkan semuanya, bagian yang **dilengkapi secara kreatif** diberi label **[TAMBAHAN KREATIF]** (fitur dengan kode **K01–K15** di Bagian 7.4, serta isi siap pakai di Bagian 21–24). Label itu sengaja dipisah supaya mitra dan pembimbing bisa menerima, menolak, atau mengubahnya tanpa mengganggu kebutuhan asli (F01–F24).

---

## 0. Cara memakai dokumen ini (untuk AI agent)

1. Baca seluruh dokumen sebelum menulis kode.
2. Kerjakan berurutan sesuai **Bagian 17 (Fase kerja)**. Selesaikan semua fitur **Wajib** dulu; fitur **Tambahan** hanya jika Wajib sudah selesai dan masih ada waktu.
3. Setiap fitur punya **kode (F01–F24)** dan **kriteria penerimaan** di Bagian 7. Jangan anggap fitur selesai sebelum kriteria itu terpenuhi.
4. Jangan menambah fitur di luar dokumen ini. Fitur **K01–K15** (Bagian 7.4) adalah satu-satunya tambahan yang diizinkan, dikerjakan **setelah semua fitur Wajib selesai**, dan tidak boleh melanggar batasan Bagian 8 dan 11.5. Jangan memakai hal yang dilarang di Bagian 11.5.
5. Semua teks yang tampil ke warga memakai **Bahasa Indonesia sederhana, kalimat pendek**.
6. Jika ada data dari mitra yang belum tersedia, pakai **placeholder berkurung siku** (lihat Bagian 14.3). Placeholder harus nol saat serah terima.
7. Jika dokumen ini bertentangan dengan standar pembimbing kampus, **ikuti pembimbing** (angka target di Bagian 8 adalah standar yang ditetapkan tim sendiri, bukan syarat resmi kampus/dinas).

---

## 1. Ringkasan produk

| Item | Isi |
|---|---|
| Nama produk | Website DLH Kabupaten Tana Toraja |
| Mitra / pemberi tugas | Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja |
| Singkatan | **DLH** = Dinas Lingkungan Hidup. Singkatan lain (TPS, TPS3R, B3, dll.) ada di Glosarium, Bagian 24 |
| Jenis | Website informasi + pengaduan warga |
| Pengguna utama | Warga yang membuka lewat HP, sebagian bersinyal lemah dan tanpa pengalaman teknis |
| Pengguna kedua | Pegawai DLH (menindaklanjuti laporan, memperbarui jadwal dan peta) |
| Tujuan | (1) Warga mudah menemukan layanan, jadwal angkut sampah, dan lokasi TPS/bank sampah. (2) Warga mudah mengirim pengaduan. (3) Pegawai bisa mengelola data tanpa menulis kode. |
| Bahasa | Indonesia |
| Biaya | Tidak ada biaya bulanan untuk hosting dan formulir (semua paket gratis). Satu-satunya biaya yang mungkin: nama domain (opsional). |

### 1.1 Di luar cakupan (non-goals)

- Website **tidak** menindaklanjuti laporan secara otomatis.
- Pelapor **tidak** bisa melihat status laporannya di website. Status diisi pegawai manual di Google Sheets (kolom F24).
- Tidak ada login warga, tidak ada akun pengguna, tidak ada database sendiri.
- Tidak ada penyimpanan data pelapor di server tim.
- Tidak ada panel admin buatan sendiri. Pegawai mengelola lewat Google Sheets dan Google My Maps.

### 1.2 [TAMBAHAN KREATIF] Latar belakang dan nilai bagi DLH

Dokumen sumber tidak menjelaskan latar belakang. Berikut asumsi kerja yang **perlu dikonfirmasi mitra** pada pertemuan pertama:

- **Masalah yang diselesaikan:** warga belum punya satu tempat resmi untuk melihat jadwal angkut sampah, mengetahui lokasi TPS/TPS3R/bank sampah, memahami layanan DLH, dan mengirim pengaduan secara tercatat.
- **Nilai bagi DLH:**
  1. **Satu pintu informasi** yang resmi, mudah dibuka lewat HP, dan bisa diperbarui sendiri oleh pegawai tanpa programmer.
  2. **Pengaduan tercatat rapi** (tanggal, jenis masalah, lokasi, petugas, status), sehingga bisa direkap untuk bahan evaluasi dan pelaporan kinerja.
  3. **Edukasi pemilahan sampah** (organik, anorganik, B3, serta prinsip 3R) langsung di halaman depan.
  4. **Citra layanan publik yang modern** tanpa biaya bulanan (hosting dan formulir gratis).
  5. **Beban kerja berkurang**: pertanyaan berulang ("jadwal angkut di wilayah saya kapan?") terjawab oleh website.
- **Nilai bagi warga:** menemukan jadwal dan lokasi tanpa harus datang ke kantor atau menelepon, melapor tanpa membuat akun.

### 1.3 [TAMBAHAN KREATIF] Indikator keberhasilan (sasaran tim)

Sasaran berikut ditetapkan tim sendiri (bukan syarat resmi kampus/dinas) dan **diukur saat uji pengguna dan pelatihan**:

| Indikator | Sasaran | Cara ukur |
|---|---|---|
| Warga menemukan jadwal angkut kecamatannya | ≥ 80% peserta berhasil, ≤ 1 menit | Uji pengguna tugas #1 |
| Warga mengirim laporan percobaan | ≥ 80% peserta berhasil tanpa dibantu, ≤ 5 menit | Uji pengguna tugas #2 |
| Pegawai mengubah satu jadwal | Berhasil mandiri, ≤ 5 menit | Pelatihan pegawai |
| Pegawai mengubah satu titik peta | Berhasil mandiri, ≤ 10 menit | Pelatihan pegawai |
| Laporan masuk ke Sheets dinas | 100% laporan percobaan tercatat; notifikasi email terkirim | Uji alur penuh |
| Kualitas teknis | Lighthouse P ≥ 80, A ≥ 90, SEO ≥ 90 | Laporan Lighthouse |

---

## 2. Gambaran sistem

### 2.1 Alur data (6 komponen)

```
Warga (buka lewat HP)
   → Website DLH (Next.js)
   → Google Form (laporan masuk, tertanam di halaman Pengaduan)
   → Google Sheets (akun milik dinas, rekap laporan)
   → Pegawai DLH (tindak lanjut)
        ↘ memperbarui
   Jadwal & Peta (Google Sheets + Google My Maps)
        ↗ ditampilkan kembali di Website DLH (lewat Next.js Route Handlers / ISR)
```

Penjelasan: Warga membuka website dan mengirim laporan lewat Google Form. Laporan tersimpan di Google Sheets milik akun dinas, lalu pegawai menindaklanjutinya. Pegawai juga bisa memperbarui peta lewat My Maps tanpa menyentuh kode. Jadwal ikut diperbarui lewat Sheets kalau fitur F17 dikerjakan; tanpa F17, jadwal diubah lewat file website dengan bantuan panduan.

### 2.2 [KEPUTUSAN TEKNIS] Arsitektur dengan Next.js Full-Stack (Serverless tanpa NestJS)

Dokumen sumber awalnya mengasumsikan website statis di GitHub Pages. Pada revisi awal sempat dipertimbangkan backend NestJS terpisah, namun setelah evaluasi efisiensi dan batasan paket hosting gratis (di mana layanan gratis seperti Render mengalami *cold start* 30–50 detik karena server tertidur), arsitektur disederhanakan menjadi **Next.js Full-Stack murni (App Router + Route Handlers)**:

```
┌────────────────────────────────────────────────────────────────┐
│               Next.js + Tailwind CSS (Full-Stack)              │
│  ┌───────────────────────────┐      ┌────────────────────────┐ │
│  │ UI Halaman (App Router)   │ ────▶│ Route Handlers (/api/*)│ │
│  │ (Server Component & ISR)  │◀──── │ (Serverless BFF)       │ │
│  └─────────────┬─────────────┘      └───────────┬────────────┘ │
└────────────────┼────────────────────────────────┼──────────────┘
                 │ iframe                         │ baca (read-only)
                 ▼                                ▼
          Google Form (pengaduan)       Google Sheets (jadwal, tab terpisah, publish CSV)
          → Google Sheets rekap         Google My Maps (KML publik) → daftar lokasi
            (privat dinas)
```

Prinsip yang tidak boleh dilanggar:

1. **Next.js Route Handlers bertindak sebagai BFF tipis tanpa database.** Ia hanya membaca data publik (jadwal, lokasi, pengumuman) dari Google, menormalkan, dan men-cache melalui ISR (`revalidate: 300`).
2. **Server website tidak pernah menerima, melewatkan, atau menyimpan data pelapor.** Formulir pengaduan tetap Google Form tertanam. Ini memenuhi standar keamanan "tim tidak menyimpan data pelapor di server sendiri".
3. **Spreadsheet rekap laporan harus berbeda file dari spreadsheet jadwal.** Hanya spreadsheet jadwal yang boleh "Publish to web". Rekap laporan tidak boleh dipublikasikan dan hanya bisa dibuka akun dinas.
4. **Website harus tetap bisa tampil jika API eksternal sedang lambat/gagal** (menggunakan fallback statis bawaan).
5. Semua layanan memakai paket gratis (cukup 1 akun Vercel / Netlify / Cloudflare Pages tanpa perlu hosting backend terpisah).

---

## 3. Stack teknologi

| Kebutuhan | Alat | Dipakai untuk | Biaya |
|---|---|---|---|
| Editor | Visual Studio Code | Menulis kode | Gratis |
| Framework Utama | **Next.js** (App Router, TypeScript) | Halaman antarmuka, routing, SEO, ISR, dan Route Handlers | Gratis |
| Styling | **Tailwind CSS** | Tata letak responsif, menu, tombol (menggantikan Bootstrap 5) | Gratis |
| Backend & API | **Next.js Route Handlers** (TypeScript) | Endpoint tipis pembaca jadwal/lokasi/pengumuman (menggantikan NestJS terpisah) | Gratis |
| Kerja tim | Git + GitHub | Kode bersama, riwayat perubahan | Gratis |
| Hosting | Vercel / Netlify / Cloudflare Pages | Menayangkan website dengan HTTPS otomatis (satu pintu) | Gratis |
| Formulir & rekap | Google Form + Google Sheets (akun dinas) | Pengaduan dan rekap laporan | Gratis |
| Peta | Google My Maps | Titik TPS dan bank sampah yang bisa diedit dinas | Gratis |
| Kompres gambar | Squoosh | Memperkecil foto ke WebP | Gratis |
| Pengujian | Lighthouse + Chrome DevTools | Kecepatan, aksesibilitas, tampilan HP | Gratis |
| Nama domain | Domain `.id` atau `go.id` | Alamat lebih resmi | Opsional; `go.id` lewat Diskominfo setempat |

Pustaka yang disarankan (boleh diganti padanan setara):

- Frontend & API: `next`, `react`, `tailwindcss`, `typescript`, `fast-xml-parser` (parsing KML), `papaparse` (parsing CSV), `lucide-react`, `eslint`, `prettier`.
- Gunakan Node.js versi LTS terbaru dan paket manajer `npm`.

---

## 4. Struktur repositori

```
dlh-tanatoraja/
├─ app/
│  ├─ layout.tsx          # Header, menu, footer, metadata dasar
│  ├─ page.tsx            # Beranda
│  ├─ profil/page.tsx     # Profil dinas
│  ├─ layanan/page.tsx    # Layanan publik
│  ├─ informasi/page.tsx  # Jadwal angkut & lokasi TPS
│  ├─ pengaduan/page.tsx  # Form pengaduan
│  ├─ privasi/page.tsx    # Kebijakan Privasi (K01)
│  ├─ not-found.tsx       # 404
│  ├─ sitemap.ts          # Sitemap generator
│  ├─ robots.ts           # Robots.txt
│  ├─ manifest.ts         # PWA Manifest (K11)
│  └─ api/                # Route Handlers serverless (pengganti NestJS)
│     ├─ health/route.ts
│     ├─ schedules/route.ts
│     ├─ locations/route.ts
│     └─ announcements/route.ts
├─ components/            # Header, Footer, NavMenu, Banner, QuickCards, SortingGuide, Steps, Accordion, ScheduleTable, LocationList, MapEmbed, ComplaintForm, WhatsAppButton, Announcements, WasteChecker, Tips3R, QuickStats, TextSizeControl, TorajaOrnament
├─ content/               # Konten statis yang diedit lewat file (profil, layanan, panduan sampah, kontak, fallback jadwal/lokasi)
│  ├─ site.ts             # Nama dinas, alamat, jam layanan, telepon, email, media sosial, WA
│  ├─ profil.ts
│  ├─ layanan.ts
│  ├─ sampah.ts
│  ├─ faq.ts              # [TAMBAHAN KREATIF] K02
│  ├─ daftarSampah.ts     # [TAMBAHAN KREATIF] K04
│  ├─ jenisMasalah.ts     # daftar jenis masalah (selaras dengan Google Form)
│  ├─ tips3r.ts           # [TAMBAHAN KREATIF] K05
│  ├─ jadwal.fallback.json
│  └─ lokasi.fallback.json
├─ lib/                   # Logika serverless: schedules.ts, locations.ts, announcements.ts, api.ts
├─ public/
│  ├─ formulir/           # Formulir PDF unduhan (F12)
│  └─ images/             # Gambar & ikon WebP/SVG < 200 KB
├─ docs/
│  ├─ PANDUAN-PENGELOLAAN.md    # Untuk pegawai DLH (tanpa kode)
│  ├─ DAFTAR-AKUN.md            # Template daftar akun untuk serah terima
│  ├─ HASIL-UJI-PENGGUNA.md     # Template pencatatan uji pengguna
│  ├─ AGENDA-PELATIHAN.md       # [TAMBAHAN KREATIF] Agenda pelatihan pegawai (Bagian 23)
│  └─ TEMPLATE-SHEETS-REKAP.md  # [TAMBAHAN KREATIF] Struktur kolom & rumus ringkasan (K13, K14)
├─ scripts/check-placeholders.mjs
├─ .env.example
├─ PRD.md
└─ README.md
```

---

## 5. Peta halaman dan navigasi

Menu utama (urutan tetap, sama di semua halaman):

| Menu | Rute | Isi |
|---|---|---|
| Beranda | `/` | Banner, kartu menu cepat, panduan memilah sampah, tiga langkah melapor, (pengumuman) |
| Profil | `/profil` | Visi, misi, bagan struktur, kontak, peta lokasi kantor |
| Layanan | `/layanan` | Daftar layanan dengan detail bisa dibuka-tutup, (unduh formulir) |
| Informasi | `/informasi` | Jadwal angkut sampah, peta My Maps, daftar lokasi + petunjuk arah |
| Pengaduan | `/pengaduan` | Google Form tertanam, persetujuan data, WhatsApp, konfirmasi |

Catatan: "Rekap" (F22–F24) **bukan halaman website**. Rekap adalah Google Sheets internal milik akun dinas yang hanya dipakai pegawai.

Halaman pendukung (tidak masuk menu utama, dicapai dari footer dan halaman Pengaduan):

| Halaman | Rute | Isi | Kode |
|---|---|---|---|
| Kebijakan Privasi | `/privasi` | Penjelasan pengolahan data pelapor (UU No. 27 Tahun 2022) | K01 |

Aturan navigasi:

- Informasi apa pun bisa dicapai **maksimal dua klik dari Beranda**.
- Header, menu, dan footer **tampil sama persis** di setiap halaman.
- Menu yang sedang dibuka **diberi tanda warna** (dan sebaiknya `aria-current="page"`).
- Tombol "Pengaduan" **selalu terlihat di header**, termasuk di tampilan HP (di luar menu hamburger).

---

## 6. Peran pengguna

| Peran | Kebutuhan | Cara berinteraksi |
|---|---|---|
| Warga | Cari jadwal angkut, lokasi TPS/bank sampah, info layanan, kirim laporan | Website (HP, sinyal lemah) |
| Pegawai DLH | Terima notifikasi laporan, isi status tindak lanjut, ubah jadwal dan titik peta | Google Sheets, Google My Maps, email |
| Tim pengembang | Bangun, uji, serah terima | Repo GitHub, hosting |
| Mitra (DLH) | Menyediakan bahan, mengonfirmasi keputusan, menandatangani berita acara | Dokumen/ konfirmasi |

---

## 7. Kebutuhan fungsional

**Wajib** = harus ada saat serah terima. **Tambahan** = hanya jika Wajib selesai dan masih ada waktu.

### 7.1 Tabel ringkas (identik dengan dokumen sumber)

| Kode | Halaman | Fitur | Prioritas |
|---|---|---|---|
| F01 | Semua | Menu navigasi yang sama di setiap halaman; di HP berubah menjadi tombol menu | Wajib |
| F02 | Semua | Tombol "Pengaduan" selalu terlihat di header | Wajib |
| F03 | Semua | Footer berisi alamat, jam layanan, telepon, dan email dinas | Wajib |
| F04 | Semua | Tautan ke media sosial resmi dinas | Tambahan (jika dinas punya media sosial) |
| F05 | Beranda | Banner dengan judul, penjelasan singkat, dan tombol lapor | Wajib |
| F06 | Beranda | Kartu menu cepat ke Layanan, Jadwal, Lokasi TPS, dan Profil | Wajib |
| F07 | Beranda | Panduan memilah sampah: organik, anorganik, dan B3 | Wajib |
| F08 | Beranda | Tiga langkah cara melapor | Wajib |
| F09 | Beranda | Pengumuman singkat dari dinas | Tambahan (hanya jika ada yang rutin memperbarui) |
| F10 | Profil | Visi, misi, bagan struktur, kontak, dan peta lokasi kantor | Wajib |
| F11 | Layanan | Daftar layanan dengan detail yang bisa dibuka-tutup: syarat, alur, biaya, lama proses, tempat | Wajib |
| F12 | Layanan | Tombol unduh formulir layanan | Tambahan (jika dinas punya formulir) |
| F13 | Informasi | Tabel jadwal angkut sampah per wilayah | Wajib |
| F14 | Informasi | Kolom pencarian atau filter kecamatan pada tabel jadwal | Tambahan |
| F15 | Informasi | Peta Google My Maps berisi titik TPS dan bank sampah, yang bisa dinas perbarui sendiri | Wajib |
| F16 | Informasi | Daftar lokasi dengan tombol "Petunjuk arah" ke Google Maps | Wajib |
| F17 | Informasi | Jadwal dibaca otomatis dari Google Sheets, sehingga pegawai cukup mengedit spreadsheet | Tambahan |
| F18 | Pengaduan | Google Form tertanam: nama, nomor HP, jenis masalah, lokasi, uraian | Wajib |
| F19 | Pengaduan | Kotak persetujuan penggunaan data pribadi sebelum mengirim laporan | Wajib |
| F20 | Pengaduan | Pesan konfirmasi setelah laporan terkirim, berisi langkah berikutnya | Wajib |
| F21 | Pengaduan | Tombol WhatsApp dinas untuk mengirim foto | Wajib jika foto dikirim lewat WhatsApp |
| F22 | Rekap | Laporan otomatis tersimpan di Google Sheets milik akun dinas | Wajib |
| F23 | Rekap | Notifikasi email ke pegawai setiap ada laporan baru | Wajib |
| F24 | Rekap | Kolom tindak lanjut di Sheets: Status, Petugas, Tanggal selesai, Catatan | Wajib |

### 7.2 Spesifikasi dan kriteria penerimaan per fitur

#### Semua halaman

**F01 — Menu navigasi (Wajib)**
- Satu komponen `NavMenu` dipakai di `layout.tsx` sehingga identik di semua halaman.
- Desktop (≥ 768 px): menu horizontal terlihat. HP (< 768 px): berubah menjadi **tombol menu** (hamburger) yang membuka/menutup daftar menu.
- Tombol menu punya teks "Menu" (ikon harus disertai teks), `aria-expanded`, `aria-controls`, tinggi/lebar ≥ 44 px, bisa dioperasikan dengan Tab/Enter/Spasi, dan Esc menutupnya.
- Menu aktif diberi tanda warna + `aria-current="page"`.
- *Penerimaan:* di lebar 360 px menu tidak membuat geser ke samping; semua 5 menu bisa dicapai dengan keyboard; menu aktif berbeda warna di tiap halaman.

**F02 — Tombol "Pengaduan" di header (Wajib)**
- Tombol berwarna penuh (hijau `#1F6B4A`, teks putih) menuju `/pengaduan`, terlihat di header pada semua ukuran layar, **tidak** disembunyikan ke dalam menu hamburger.
- Ingat aturan: setiap layar hanya punya **satu** tombol utama berwarna penuh (lihat 11.2). Tombol lapor di banner Beranda (F05) harus tidak tampil bersamaan sebagai tombol utama kedua pada layar yang sama; pakai gaya sekunder (outline) di salah satunya, atau hanya satu yang berwarna penuh. Keputusan default: header = tombol utama penuh di semua halaman selain Beranda; di Beranda, tombol di banner = penuh dan tombol header = outline.
- *Penerimaan:* tombol terlihat tanpa scroll di semua halaman dan semua lebar layar; ukuran ≥ 44 px.

**F03 — Footer (Wajib)**
- Berisi: **alamat** kantor, **jam layanan**, **telepon**, **email** dinas. Data diambil dari `content/site.ts` (satu sumber kebenaran).
- Telepon memakai tautan `tel:`, email memakai `mailto:`.
- *Penerimaan:* keempat data tampil di setiap halaman; tidak ada placeholder berkurung siku saat serah terima.

**F04 — Tautan media sosial (Tambahan)**
- Hanya render jika `site.social` berisi tautan. Tiap tautan: ikon **+ teks** (mis. "Facebook"), membuka tab baru dengan `rel="noopener noreferrer"`.
- Jika dinas tidak punya media sosial, bagian ini tidak ditampilkan sama sekali.

#### Beranda

**F05 — Banner (Wajib)**
- Judul, penjelasan singkat (1–2 kalimat), tombol "Lapor" menuju `/pengaduan`. Foto kegiatan dinas sebagai latar bersifat tambahan (butuh bahan dari mitra); tanpa foto, pakai latar warna polos hijau/netral berkontras baik.
- Gambar (jika ada): WebP, < 200 KB, punya teks alternatif, gunakan `priority` hanya untuk gambar banner.
- Contoh teks (boleh disesuaikan mitra): Judul "Dinas Lingkungan Hidup Kabupaten Tana Toraja"; penjelasan "Cari jadwal angkut sampah, lokasi TPS, dan layanan kami. Ada masalah lingkungan? Laporkan di sini."
- *Penerimaan:* terlihat tanpa geser horizontal di 360 px; tombol Lapor ≥ 44 px.

**F06 — Kartu menu cepat (Wajib)**
- Empat kartu: **Layanan**, **Jadwal**, **Lokasi TPS**, **Profil**. Tiap kartu = ikon + teks + (opsional) satu baris penjelas.
- Tautan: Layanan → `/layanan`; Jadwal → `/informasi#jadwal`; Lokasi TPS → `/informasi#lokasi`; Profil → `/profil`.
- Tata letak: 2 kolom di HP, 4 kolom di laptop. Seluruh kartu bisa diklik, ≥ 44 px.

**F07 — Panduan memilah sampah (Wajib)**
- Tiga kelompok: **Organik**, **Anorganik**, **B3** (bahan berbahaya dan beracun). Tiap kelompok: judul, penjelasan satu kalimat, 3–5 contoh, dan penanda warna (jangan hanya warna; sertakan teks/ikon).
- Contoh bawaan (mitra boleh mengoreksi): Organik — sisa makanan, daun, kulit buah; Anorganik — botol plastik, kaleng, kertas, kardus; B3 — baterai bekas, lampu neon, obat kedaluwarsa, pestisida.
- Konten disimpan di `content/sampah.ts`.

**F08 — Tiga langkah cara melapor (Wajib)**
- Tiga langkah bernomor, kalimat pendek, ikon + teks. Teks bawaan: (1) "Buka halaman Pengaduan dan isi formulir." (2) "Centang persetujuan data pribadi, lalu kirim." (3) "Petugas DLH menerima laporan Anda dan menindaklanjutinya."
- Langkah 3 harus jujur: tidak menjanjikan pelapor bisa melihat status di website.

**F09 — Pengumuman singkat (Tambahan, hanya jika ada yang rutin memperbarui)**
- Sumber: tab "Pengumuman" di Google Sheets (kolom: `tanggal`, `judul`, `isi`, `tampilkan` [YA/TIDAK]), dibaca lewat endpoint `GET /api/announcements`. Tampilkan maksimal 3 terbaru.
- Jika tidak ada pengumuman atau fitur tidak dikerjakan, komponen **tidak dirender** (jangan menampilkan kotak kosong).

#### Profil

**F10 — Halaman Profil (Wajib)**
- Bagian: **Visi**, **Misi** (daftar), **Bagan struktur organisasi** (gambar atau PDF; jika gambar, WebP < 200 KB dengan teks alternatif deskriptif; jika PDF, sediakan tombol unduh/buka), **Kontak** (alamat, telepon, email, jam layanan), dan **peta lokasi kantor** (Google Maps embed `iframe`, `title` diisi, `loading="lazy"`).
- Konten dari `content/profil.ts` dan `content/site.ts`; logo dinas/Pemkab hanya dipakai jika izin pemakaian sudah diterima.

#### Layanan

**F11 — Daftar layanan dengan detail buka-tutup (Wajib)**
- Setiap layanan = satu item accordion. Judul layanan terlihat; saat dibuka tampil: **Syarat**, **Alur**, **Biaya**, **Lama proses**, **Tempat pengajuan**.
- Implementasi aksesibel: `<button aria-expanded aria-controls>` atau `<details>/<summary>`. Tombol buka-tutup ≥ 44 px, dapat dioperasikan dengan Tab/Enter/Spasi.
- Data dari `content/layanan.ts`:

```ts
export interface Layanan {
  id: string;
  nama: string;
  syarat: string[];
  alur: string[];       // langkah berurutan
  biaya: string;        // mis. "Gratis" atau "Rp ..."
  lamaProses: string;   // mis. "3 hari kerja"
  tempat: string;
  formulirUrl?: string; // F12 (opsional)
}
```

**F12 — Unduh formulir layanan (Tambahan, jika dinas punya formulir)**
- Jika `formulirUrl` ada: tombol/tautan "Unduh formulir" dengan teks jelas, menyebut tipe dan ukuran file (mis. "PDF, 120 KB"). File diletakkan di `public/formulir/`. Jika tidak ada, tombol tidak ditampilkan.

#### Informasi

**F13 — Tabel jadwal angkut sampah per wilayah (Wajib)**
- Kolom: **Kecamatan**, **Wilayah/Kelurahan/Lembang** (nama bisa menyesuaikan data mitra), **Hari**, **Jam**, **Titik kumpul**.
- Data dari `GET /api/schedules` (sumber `sheets` atau `file`, lihat Bagian 9.3). Render di server (SSR/ISR) sehingga terlihat cepat meski JavaScript belum termuat.
- Di HP: tabel tidak boleh memicu geser halaman; boleh dibungkus `overflow-x-auto` **di dalam kontainernya sendiri**, atau dirender sebagai kartu bertumpuk di bawah 640 px (pilihan yang lebih disarankan karena lebih mudah dibaca di HP).
- Tampilkan keadaan kosong yang ramah jika data tidak ada ("Jadwal belum tersedia. Hubungi dinas di [telepon]").
- *Penerimaan:* tugas uji pengguna #1 (cari jadwal kecamatan tertentu) berhasil.

**F14 — Pencarian/filter kecamatan (Tambahan)**
- Dropdown filter kecamatan dan/atau kolom pencarian teks. Filter di sisi klien (data sudah dimuat), tidak memanggil API ulang.
- Label di atas kolom, contoh isian ("mis. Makale"), tombol "Hapus filter", hasil kosong menampilkan pesan jelas. Wajib bisa dipakai keyboard dan terbaca pembaca layar (`aria-live="polite"` untuk jumlah hasil).

**F15 — Peta Google My Maps (Wajib)**
- Sematkan peta dengan `iframe` `https://www.google.com/maps/d/embed?mid=<MAP_ID>` (MAP_ID dari env `NEXT_PUBLIC_MYMAPS_ID`). `title` diisi, `loading="lazy"`, tinggi ≥ 320 px di HP, lebar 100%.
- Berisi titik TPS, TPS3R, dan bank sampah. **Pegawai memperbarui sendiri** lewat Google My Maps (akun dinas) tanpa menyentuh kode; peta harus berstatus dibagikan publik ("Anyone with the link can view").
- Sediakan tautan "Buka peta di Google Maps" sebagai alternatif jika iframe lambat/gagal.

**F16 — Daftar lokasi + tombol "Petunjuk arah" (Wajib)**
- Daftar kartu lokasi: **nama**, **jenis** (TPS / TPS3R / Bank Sampah), **alamat**, **jam buka**, dan tombol **"Petunjuk arah"**.
- Tombol membuka: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}` di tab baru (bukan hanya ikon; harus ada teks "Petunjuk arah").
- Sumber data: `GET /api/locations`, yang membaca **KML dari Google My Maps** yang sama dengan F15 (jadi pegawai cukup mengedit satu peta; daftar ikut berubah). Konvensi pengisian titik di My Maps lihat Bagian 9.4. Fallback: `content/lokasi.fallback.json`.
- Bisa dikelompokkan atau difilter per jenis (opsional).

**F17 — Jadwal dibaca dari Google Sheets (Tambahan)**
- `SCHEDULE_SOURCE=sheets` membuat NestJS membaca tab jadwal di Google Sheets (publish-to-web CSV). Pegawai cukup mengedit spreadsheet; website menampilkan perubahan setelah cache kedaluwarsa (≤ 5 menit).
- Tanpa F17 (`SCHEDULE_SOURCE=file`): jadwal diambil dari `content/jadwal.fallback.json` dan diubah lewat file website dengan bantuan `docs/PANDUAN-PENGELOLAAN.md`.
- **Catatan penting untuk tim:** standar non-fungsional "Kemudahan perawatan" dan kriteria selesai ("pegawai berhasil mengubah satu jadwal sendiri") praktis hanya terpenuhi tanpa kode jika F17 dikerjakan. Karena backend NestJS sudah tersedia, **disarankan F17 tetap dikerjakan** begitu F13 selesai. Jika tidak, panduan file harus cukup sederhana agar pegawai bisa mengubah satu jadwal saat pelatihan.

#### Pengaduan

**F18 — Google Form tertanam (Wajib)**
- Sematkan Google Form lewat `iframe` (`NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL`, berakhiran `/viewform?embedded=true`), lebar 100%, tinggi cukup (≥ 900 px di HP, atau gunakan skrip auto-resize yang diizinkan), `title="Formulir pengaduan"`, `loading="lazy"`.
- Sediakan tautan cadangan "Buka formulir di tab baru" (`NEXT_PUBLIC_GOOGLE_FORM_URL`) bila iframe tidak tampil.
- Isi form (dibuat di akun Google dinas):

| Pertanyaan | Tipe | Wajib | Contoh isian / petunjuk |
|---|---|---|---|
| Nama | Jawaban singkat | Ya | "mis. Yohanis Palinggi" |
| Nomor HP | Jawaban singkat (validasi angka/regex) | Ya | "mis. 081234567890" |
| Jenis masalah | Pilihan (dropdown/radio) dari daftar yang diberikan DLH | Ya | — |
| Lokasi | Jawaban singkat/paragraf | Ya | "mis. Jl. Pongtiku, dekat pasar, Kelurahan ..." |
| Uraian | Paragraf | Ya | "Ceritakan apa yang terjadi dan sejak kapan." |
| Persetujuan data pribadi | Kotak centang (satu opsi) | Ya | lihat F19 |

- Aturan formulir (UI/UX): label di atas kolom, tiap kolom ada contoh isian, kolom wajib bertanda (*), **pesan kesalahan menjelaskan apa yang harus diperbaiki** (isi teks validasi kustom di Google Form, mis. "Nomor HP harus berupa angka, 10–13 digit").
- **Jangan** menambahkan pertanyaan unggah foto di Google Form (lihat batasan teknis 7.3).
- Di halaman, sebelum iframe, tampilkan penjelasan singkat: apa yang diisi, perkiraan waktu mengisi, dan bahwa foto dikirim lewat WhatsApp (jika F21 aktif).

**F19 — Kotak persetujuan data pribadi (Wajib)**
- Di dalam Google Form: satu pertanyaan **kotak centang wajib** berisi pernyataan persetujuan, ditempatkan **sebelum tombol Kirim**. Karena wajib diisi, laporan **tidak bisa terkirim** bila tidak dicentang.
- Teks yang dianjurkan (mitra boleh menyesuaikan): *"Saya setuju data saya (nama, nomor HP, lokasi, dan uraian laporan) dipakai Dinas Lingkungan Hidup Kabupaten Tana Toraja hanya untuk menindaklanjuti laporan ini."*
- Di bagian deskripsi form dan di halaman `/pengaduan`, jelaskan **tujuan pengumpulan data**, siapa yang mengakses (pegawai DLH), dan bahwa pengelolaan mengacu pada **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi**. Gunakan bahasa sederhana, bukan kutipan hukum panjang.
- *Penerimaan:* uji mengirim form tanpa mencentang → ditolak.

**F20 — Pesan konfirmasi (Wajib)**
- Diatur di pengaturan Google Form ("Presentation → Confirmation message"). Isi harus menjelaskan langkah berikutnya, kalimat pendek, mis.: *"Terima kasih, laporan Anda sudah kami terima. Petugas DLH akan memeriksa laporan Anda. Jika perlu informasi tambahan, kami menghubungi nomor HP yang Anda isi. Anda juga bisa mengirim foto lewat WhatsApp ke [nomor WA dinas]."*
- Jangan menjanjikan tenggat atau fitur cek status yang tidak ada. Angka tenggat (mis. "dalam X hari kerja") hanya boleh dicantumkan jika dikonfirmasi mitra.

**F21 — Tombol WhatsApp untuk foto (Wajib jika foto dikirim lewat WhatsApp)**
- Tombol "Kirim foto lewat WhatsApp" (teks + ikon) di halaman `/pengaduan`, tautan `https://wa.me/<NOMOR_INTERNASIONAL>?text=<teks_terisi_awal_URL-encoded>` (mis. nomor `62...` tanpa `+`/spasi). Teks awal contoh: "Halo DLH Tana Toraja, saya mengirim foto untuk laporan atas nama [nama] di [lokasi]."
- Nomor dari env `NEXT_PUBLIC_WHATSAPP_NUMBER`. Jika mitra memutuskan **tidak** memakai WhatsApp, tombol disembunyikan (flag `NEXT_PUBLIC_ENABLE_WHATSAPP=false`) dan halaman tidak menyebut WhatsApp.
- Keputusan akhir WhatsApp vs. unggah foto di Form **menunggu konfirmasi mitra** (lihat 7.3 dan Bagian 16).

#### Rekap (internal, di Google)

**F22 — Laporan otomatis ke Google Sheets (Wajib)**
- Tautkan Google Form ke spreadsheet **baru, milik akun Google dinas** (tab "Form Responses 1" atau nama setara). Spreadsheet ini **privat**, hanya akun dinas (dan pegawai yang diberi akses) yang bisa membuka.

**F23 — Notifikasi email ke pegawai (Wajib)**
- Setiap respons baru memicu email ke pegawai penerima (email diberikan mitra). Opsi implementasi (pilih yang paling sederhana dan stabil):
  1. Pengaturan Google Form: "Responses → ⋮ → Get email notifications for new responses" (aktif untuk pemilik form; untuk beberapa pegawai, jadikan akun dinas milik bersama atau bagikan form sebagai editor dan aktifkan masing-masing).
  2. Google Sheets: "Tools → Notification rules → A user submits a form".
  3. Google Apps Script `onFormSubmit` yang mengirim email ke daftar pegawai (hanya jika opsi 1–2 tidak cukup). Skrip ini hidup di akun Google dinas, **bukan** di server tim.
- *Penerimaan:* laporan percobaan dari mitra masuk Sheets **dan** email notifikasi terkirim.

**F24 — Kolom tindak lanjut (Wajib)**
- Di spreadsheet rekap, tambahkan kolom di sisi kanan data form: **Status**, **Petugas**, **Tanggal selesai**, **Catatan**.
- Status: dropdown validasi data dengan nilai `Baru`, `Diproses`, `Selesai`, `Ditolak/Tidak ditindaklanjuti` (nilai final boleh disesuaikan mitra). Default `Baru`. Beri pewarnaan bersyarat per status agar mudah dibaca.
- Kolom diisi **manual** oleh pegawai.

### 7.3 Dua batasan teknis yang perlu tim ketahui

1. **Unggah foto di Google Form mengharuskan pelapor masuk ke akun Google.** Banyak warga bisa batal melapor karena langkah ini, sehingga foto lebih baik dikirim lewat WhatsApp dinas (F21). Keputusan akhirnya menunggu konfirmasi dari mitra.
2. **Website tidak menindaklanjuti laporan secara otomatis.** Status di kolom F24 diisi pegawai secara manual, dan pelapor tidak bisa melihat status laporannya di website.

---

### 7.4 [TAMBAHAN KREATIF] Fitur nilai tambah (K01–K15)

Fitur di bagian ini **tidak ada di dokumen sumber**. Semuanya berprioritas **Tambahan Kreatif**: dikerjakan hanya setelah **semua Wajib (F01–F24) selesai dan lolos uji**, mengikuti batasan biaya gratis, tanpa menyimpan data pelapor di server tim, dan tanpa melanggar Bagian 11.5 (tanpa pop-up, slider otomatis, animasi berat, musik). Urutan pengerjaan yang disarankan: **K01 → K02 → K03 → K09 → K13 → K04 → K05 → K07 → K08 → K06 → K14 → K15 → K10 → K12 → K11**. Mitra boleh menolak fitur tertentu; fitur yang ditolak dihapus dari build dan tidak muncul sebagai placeholder.

| Kode | Halaman | Fitur | Manfaat singkat |
|---|---|---|---|
| K01 | Footer, Pengaduan | Halaman Kebijakan Privasi | Memperkuat kepatuhan UU PDP; **sangat disarankan** |
| K02 | Beranda, Pengaduan | FAQ (pertanyaan yang sering diajukan) | Mengurangi pertanyaan berulang ke pegawai |
| K03 | Informasi | Penanda "Hari ini" pada jadwal angkut | Warga langsung tahu apakah hari ini ada pengangkutan |
| K04 | Beranda/Informasi | "Cek jenis sampah" (pencarian cepat) | Edukasi interaktif ringan |
| K05 | Beranda | Kartu tips 3R (Kurangi, Gunakan ulang, Daur ulang) | Edukasi lingkungan |
| K06 | Beranda | "Angka singkat" otomatis (jumlah TPS, bank sampah, kecamatan terlayani) | Menunjukkan cakupan layanan tanpa data karangan |
| K07 | Informasi | Tombol "Bagikan lewat WhatsApp" untuk jadwal dan lokasi | Informasi cepat menyebar di grup warga |
| K08 | Informasi | Tombol "Cetak jadwal" dengan tampilan cetak rapi | Jadwal bisa ditempel di kantor lurah/lembang/posyandu |
| K09 | Pengaduan | Panduan "Tips melapor yang baik" + kotak keadaan darurat | Laporan lebih lengkap dan bisa ditindaklanjuti |
| K10 | Semua | Tombol ukuran teks (A+) | Aksesibilitas untuk warga lansia |
| K11 | Semua | Akses offline ringan (PWA sederhana) | Berguna di sinyal lemah |
| K12 | Semua | Identitas visual lokal Toraja + salam lokal | Rasa memiliki dan keunikan |
| K13 | Rekap (Sheets) | Tab "Ringkasan" otomatis di Sheets rekap | Dinas bisa memantau dan melapor tanpa hitung manual |
| K14 | Rekap (Sheets) | Nomor laporan otomatis | Memudahkan pegawai merujuk laporan |
| K15 | Informasi (My Maps) | Standar gaya ikon dan legenda peta | Peta konsisten dan mudah dibaca |

### K01 — Halaman Kebijakan Privasi (`/privasi`)
- Tautan "Kebijakan Privasi" di footer (semua halaman) dan di dekat formulir pada `/pengaduan`.
- Isi (kerangka dan contoh teks ada di Bagian 22.4): data yang dikumpulkan, tujuan, siapa yang mengakses, tempat penyimpanan (Google akun dinas), lama penyimpanan, hak pelapor, cara menghubungi dinas, rujukan UU No. 27 Tahun 2022.
- Bahasa sederhana, paragraf pendek, judul bagian jelas. Teks final **ditinjau mitra** (dan bila perlu bagian hukum/sekretariat dinas) sebelum tayang.
- *Penerimaan:* tautan tersedia di footer dan Pengaduan; tidak ada placeholder berkurung siku; skor Accessibility tetap ≥ 90.

### K02 — FAQ
- Komponen accordion yang sama dengan F11 (aksesibel, ≥ 44 px). Data di `content/faq.ts` dengan struktur `{ id, kategori: 'Sampah' | 'Pengaduan' | 'Layanan', pertanyaan, jawaban }`.
- Beranda menampilkan **5 pertanyaan teratas**; halaman Pengaduan menampilkan FAQ kategori Pengaduan. Bank teks FAQ ada di Bagian 22.3.
- Jawaban yang bergantung pada keputusan dinas (mis. tenggat respon, lama penyimpanan data) memakai placeholder berkurung siku sampai dikonfirmasi.
- Opsional: tambahkan markup `FAQPage` (JSON-LD) untuk SEO.

### K03 — Penanda "Hari ini" pada jadwal angkut
- Hitung hari saat ini dengan zona waktu **WITA** (`Intl.DateTimeFormat('id-ID', { weekday: 'long', timeZone: 'Asia/Makassar' })`). Tandai baris/kartu yang cocok dengan label teks **"Hari ini"** (jangan hanya warna).
- Parser kolom `hari` harus mengenali nama hari Indonesia ("Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"), kombinasi ("Senin & Kamis", "Senin, Kamis", "Senin dan Kamis"), dan mengabaikan teks yang tidak dikenali (tanpa error).
- Karena halaman memakai ISR, penandaan dilakukan **di klien** setelah halaman termuat; tanpa JavaScript, tabel tetap terbaca normal.
- Opsional: ringkasan atas tabel "Hari ini ada pengangkutan di N wilayah".

### K04 — "Cek jenis sampah"
- Kolom isian dengan label di atas ("Ketik nama sampah", contoh: "botol plastik"), hasil menampilkan kategori (Organik/Anorganik/B3), satu kalimat saran penanganan, dan tautan ke bagian F07.
- Data statis `content/daftarSampah.ts` (contoh awal: Bagian 22.2). Pencarian di klien, tidak peka huruf besar/kecil, toleran terhadap spasi ganda, hasil kosong menampilkan "Belum ada di daftar. Tanyakan ke DLH di [telepon]."
- Hasil diumumkan lewat `aria-live="polite"`. Tidak mengirim kata pencarian ke server mana pun.

### K05 — Kartu tips 3R
- Tiga kartu: **Kurangi**, **Gunakan ulang**, **Daur ulang**, masing-masing ikon + teks + 2–3 tips singkat (teks di Bagian 22.1). Ditempatkan setelah panduan memilah (F07).

### K06 — Angka singkat (otomatis)
- Hitung dari data nyata: jumlah TPS, jumlah TPS3R, jumlah bank sampah (dari `/api/locations`), dan jumlah kecamatan yang punya jadwal (dari `/api/schedules`).
- **Dilarang** menampilkan angka karangan. Jika data tidak tersedia atau bernilai 0, komponen tidak dirender.
- Tampilan: 3–4 kartu angka besar + label teks; tanpa animasi menghitung.

### K07 — Bagikan lewat WhatsApp
- Pada jadwal (per kecamatan yang sedang difilter) dan pada kartu lokasi: tombol sekunder "Bagikan lewat WhatsApp" menuju `https://wa.me/?text=<teks URL-encoded>`.
- Contoh teks jadwal: `Jadwal angkut sampah Kecamatan [nama]: [hari], [jam], titik kumpul [titik]. Info lengkap: [URL halaman Informasi]`. Contoh teks lokasi: `[nama lokasi] ([jenis]) — [alamat]. Petunjuk arah: [tautan Google Maps]`. (Kurung siku di sini adalah isian yang diganti kode saat membuat teks, bukan placeholder yang tersisa.)
- Tidak ada pelacakan atau skrip pihak ketiga.

### K08 — Cetak jadwal
- Tombol "Cetak jadwal" memanggil `window.print()`. Gaya cetak (Tailwind `print:`) menyembunyikan header, menu, footer interaktif, dan iframe; menampilkan judul "Jadwal Angkut Sampah — Dinas Lingkungan Hidup Kabupaten Tana Toraja", tabel penuh hitam-putih yang terbaca, tanggal cetak, dan kontak dinas.
- Tabel tidak terpotong di tengah baris (`break-inside: avoid`).

### K09 — Tips melapor yang baik + keadaan darurat
- Kotak "Agar laporan Anda mudah ditindaklanjuti" di halaman Pengaduan (sebelum form): sebutkan **apa** yang terjadi, **di mana** (patokan seperti nama jalan/bangunan terdekat), **sejak kapan**, **seberapa besar/seberapa sering**, dan kirim **foto lewat WhatsApp** bila F21 aktif.
- Kotak "Hal yang bisa dilaporkan" (daftar jenis masalah dari `content/jenisMasalah.ts`, selaras dengan pilihan di Google Form) dan "Hal yang bukan wewenang DLH" bila mitra mau mencantumkan.
- Kotak "Keadaan darurat": jika ada bahaya langsung bagi keselamatan (kebakaran, tumpahan bahan kimia, korban), hubungi nomor darurat nasional **112** atau pihak berwenang; laporan DLH bukan layanan darurat. Cantumkan juga nomor siaga milik dinas jika ada dan disetujui mitra.

### K10 — Tombol ukuran teks
- Kontrol "Ukuran teks" di footer atau di bawah header (teks "A" dan "A+" disertai label, ≥ 44 px) yang menaikkan ukuran dasar teks menjadi 125%. Disimpan di `localStorage` (dibungkus try/catch), dibaca saat halaman dimuat.
- Tata letak tidak boleh pecah pada 125% dan lebar 360 px.

### K11 — Akses offline ringan (PWA sederhana)
- `manifest.webmanifest` (nama, ikon, `theme_color` `#1F6B4A`, `display: standalone`) agar bisa "Tambah ke layar utama".
- Service worker sederhana: cache halaman statis dan **data jadwal/lokasi terakhir** (stale-while-revalidate). Saat offline, tampilkan catatan kecil "Anda sedang offline. Menampilkan data terakhir yang tersimpan."
- **Pengaduan tidak bisa dikirim offline**; halaman Pengaduan menampilkan pesan jelas bahwa butuh koneksi.
- Pastikan pembaruan konten tidak tertahan versi lama (versi cache dinaikkan setiap rilis). Prioritas **paling rendah**; lewati jika menimbulkan risiko pada skor Lighthouse atau stabilitas.

### K12 — Identitas visual lokal Toraja dan salam lokal (opsional, perlu persetujuan mitra)
- Elemen hias ringan: garis pemisah bagian atau pola tepi footer bergaya **geometris ukiran Toraja** sebagai SVG inline (< 5 KB), dan siluet **tongkonan** sebagai ikon/pembeda di banner atau favicon. Dibuat sendiri oleh tim (tanpa mengambil gambar berhak cipta tanpa izin).
- Warna aksen kecil boleh mengambil unsur warna khas (merah tua, kuning/emas, hitam, putih) **hanya sebagai aksen**; warna utama tetap hijau `#1F6B4A`, kontras tetap ≥ 4,5:1, dan aturan "satu tombol utama" tetap berlaku.
- Salam lokal (mis. **"Kurre sumanga'"** sebagai ucapan terima kasih) pada pesan konfirmasi (F20) dan footer, **hanya jika mitra setuju dan mengonfirmasi ejaan serta pemakaiannya**. Hindari motif atau simbol yang bernilai sakral/adat jika pemakaiannya tidak disetujui pihak yang berwenang.
- Semua dekorasi bersifat `aria-hidden` dan tidak memperlambat halaman.

### K13 — Tab "Ringkasan" otomatis di Sheets rekap
- Tambahkan tab **Ringkasan** di spreadsheet rekap (privat). Isi minimal, semuanya dihitung otomatis dengan rumus (contoh rumus ada di Bagian 22.5):
  1. Total laporan masuk.
  2. Jumlah laporan per **Status** (Baru, Diproses, Selesai, Ditolak).
  3. Jumlah laporan per **Jenis masalah**.
  4. Jumlah laporan per **bulan**.
  5. **Rata-rata lama penyelesaian** (hari) untuk laporan berstatus Selesai.
  6. Daftar laporan berstatus Baru yang sudah melewati **batas hari** (batas ditentukan mitra; usulan awal 7 hari) ditandai merah (pemformatan bersyarat).
- Tambahkan 2–3 grafik bawaan Google Sheets (status, jenis masalah, tren bulanan). Tab ini **tidak boleh dipublikasikan ke web**.

### K14 — Nomor laporan otomatis (internal)
- Kolom **No. Laporan** di Sheets rekap, dibuat otomatis, mis. `DLH-202611-0007` (singkatan dinas, tahun-bulan, nomor urut). Dipakai pegawai untuk merujuk laporan saat koordinasi atau saat membalas lewat WhatsApp.
- **Batasan tetap berlaku:** pelapor tidak melihat status di website. Jika mitra ingin pelapor menerima nomor, caranya lewat pesan manual/WhatsApp oleh pegawai (di luar website).

### K15 — Standar gaya peta My Maps
- Satu layer per jenis: **TPS**, **TPS3R**, **Bank Sampah** (nama layer persis, lihat Bagian 9.4). Ikon dan warna berbeda per layer dan **legenda** ditulis di deskripsi peta. Usulan: TPS = merah, TPS3R = hijau, Bank Sampah = biru; dengan bentuk ikon berbeda agar tidak bergantung pada warna saja.
- Tambahkan titik kantor DLH sebagai layer terpisah "Kantor DLH" (tidak ikut daftar lokasi F16).
- Dokumentasikan di `docs/PANDUAN-PENGELOLAAN.md`.

---

## 8. Kebutuhan non-fungsional

Setiap standar punya cara uji yang jelas supaya tim bisa **membuktikan** kualitas di laporan, bukan hanya mengklaimnya. Angka target adalah standar tim sendiri; jika pembimbing punya standar lain, ikuti pembimbing.

| Aspek | Standar | Cara uji |
|---|---|---|
| Responsif | Tampilan rapi dari lebar 360 px (HP) sampai 1440 px (laptop), tanpa geser ke samping | Mode perangkat di Chrome DevTools, lalu dicoba di minimal dua HP Android |
| Kecepatan | Halaman pertama terbuka dalam 3 detik di jaringan 4G; setiap gambar di bawah 200 KB | Lighthouse skor Performance minimal 80 |
| Aksesibilitas | Kontras teks minimal 4,5:1, teks isi minimal 16 px, tombol minimal 44 px, semua gambar punya teks alternatif | Lighthouse skor Accessibility minimal 90, ditambah navigasi dengan tombol Tab |
| Keamanan | Website memakai HTTPS; tim tidak menyimpan data pelapor di server sendiri | Cek ikon gembok di browser; rekap hanya bisa dibuka akun dinas |
| Privasi data | Formulir menjelaskan tujuan pengumpulan data dan meminta persetujuan pelapor, mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi | Kotak persetujuan wajib dicentang sebelum laporan bisa dikirim |
| Kemudahan perawatan | Jadwal dan lokasi bisa diubah pegawai tanpa menulis kode | Pegawai berhasil mengubah satu jadwal dan satu titik peta saat pelatihan |
| Kompatibilitas | Berjalan di Chrome, Firefox, Safari, dan browser bawaan Android versi terbaru | Uji manual di keempat browser |
| Mudah ditemukan | Setiap halaman punya judul dan deskripsi yang memuat nama dinas | Lighthouse skor SEO minimal 90 |
| Biaya | Tidak ada biaya bulanan untuk hosting dan formulir | Semua layanan memakai paket gratis |

### 8.1 [KEPUTUSAN TEKNIS] Cara memenuhi standar dengan Next.js + Tailwind CSS

- **Kecepatan:** gunakan Server Components dan ISR (`revalidate: 300`) sehingga HTML sudah berisi data jadwal/lokasi; minim JavaScript klien (hanya menu HP, accordion, filter, dan iframe). Gunakan `next/image` atau gambar WebP yang sudah dikompres (< 200 KB) dengan `width`/`height` eksplisit; iframe (Form, peta) `loading="lazy"`. Jangan memuat pustaka UI berat atau font berlebihan.
- **Responsif:** pendekatan mobile-first Tailwind (kelas dasar untuk HP, lalu `md:`/`lg:`); uji pada 360, 390, 768, 1024, 1440 px; tidak ada `min-width` tetap yang melebihi 360 px; kontainer tabel/peta/iframe `max-w-full`.
- **Aksesibilitas:** `<html lang="id">`; tautan "Lompat ke konten utama" (skip link); urutan heading logis (satu `h1` per halaman); fokus terlihat jelas (`focus-visible:ring`); elemen interaktif menggunakan elemen semantik (`button`, `a`, `details`); `alt` pada semua gambar (gambar dekoratif `alt=""`); ukuran target ≥ 44 px (`min-h-11 min-w-11` atau setara); teks isi ≥ 16 px (`text-base`); rasio kontras ≥ 4,5:1 (hijau `#1F6B4A` di atas putih ≈ 7:1 — aman).
- **Keamanan:** HTTPS dari platform hosting Vercel/Netlify; header keamanan di Next.js (`next.config.mjs`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` sesuai kebutuhan; CSP mengizinkan iframe `docs.google.com` (Form) dan `www.google.com` (My Maps, Maps embed).
- **SEO:** `metadata` per halaman dengan `title` dan `description` yang memuat "Dinas Lingkungan Hidup Kabupaten Tana Toraja"; `sitemap.xml`, `robots.txt`, Open Graph dasar, `canonical`.
- **Privasi:** tidak ada analitik pihak ketiga atau cookie pelacak tanpa persetujuan; tidak ada penyimpanan data pelapor di server.

---

## 9. [KEPUTUSAN TEKNIS] Spesifikasi Backend (Next.js Route Handlers)

### 9.1 Prinsip

- Tanpa database. Route Handlers serverless di Next.js (`app/api/*`) yang membaca data publik dengan ISR (`revalidate: 300`) + **stale-while-error** (jika sumber Google gagal, sajikan data fallback statis).
- Hanya endpoint `GET` publik, read-only. Tidak ada endpoint yang menerima data warga.
- Semua respons JSON dengan awalan `/api`. Validasi/normalisasi data sebelum dikirim.

### 9.2 Endpoint

| Method | Path | Fitur | Keterangan |
|---|---|---|---|
| GET | `/api/health` | — | `{ status: "ok", time: ISOString }` |
| GET | `/api/schedules` | F13, F14, F17 | Daftar jadwal; query opsional `kecamatan` |
| GET | `/api/locations` | F15, F16 | Daftar lokasi hasil parsing KML My Maps; query opsional `jenis` |
| GET | `/api/announcements` | F09 | Hanya aktif jika `ENABLE_ANNOUNCEMENTS=true` |

Bentuk data:

```ts
export interface JadwalItem {
  kecamatan: string;
  wilayah: string;      // kelurahan/lembang/desa
  hari: string;         // "Senin", "Senin & Kamis", dst.
  jam: string;          // "07.00–09.00"
  titikKumpul: string;
}
export interface SchedulesResponse {
  data: JadwalItem[];
  source: 'sheets' | 'file';
  updatedAt: string;    // ISO
  stale: boolean;       // true jika memakai cache lama karena sumber gagal
}

export type JenisLokasi = 'TPS' | 'TPS3R' | 'Bank Sampah';
export interface LokasiItem {
  nama: string;
  jenis: JenisLokasi;
  alamat: string;
  jamBuka: string;
  lat: number;
  lng: number;
}
export interface LocationsResponse {
  data: LokasiItem[];
  source: 'mymaps' | 'file';
  updatedAt: string;
  stale: boolean;
}

export interface PengumumanItem {
  tanggal: string;      // YYYY-MM-DD
  judul: string;
  isi: string;
}
```

### 9.3 Sumber jadwal (F13/F17)

- `SCHEDULE_SOURCE=file` (default sebelum F17): baca `content/jadwal.fallback.json` dan validasi skemanya.
- `SCHEDULE_SOURCE=sheets`: ambil CSV dari `SHEETS_SCHEDULE_CSV_URL` (File → Share → Publish to web → tab "Jadwal" → format CSV). Header kolom wajib persis: `kecamatan,wilayah,hari,jam,titik_kumpul`. Baris kosong diabaikan; baris tidak valid dicatat ke log dan dilewati.
- Spreadsheet jadwal **terpisah** dari spreadsheet rekap laporan. Hanya tab jadwal (dan pengumuman) yang dipublikasikan.
- Jika pengambilan gagal: pakai data fallback bawaan (`stale: true`).

### 9.4 Sumber lokasi (F15/F16) — konvensi Google My Maps

- Next.js mengambil KML dari `https://www.google.com/maps/d/kml?mid=<MAP_ID>&forcekml=1` (`MYMAPS_ID` dari env). Peta harus publik.
- Parsing dengan `fast-xml-parser`:
  - **Nama layer (Folder)** = `jenis` (harus tepat salah satu: `TPS`, `TPS3R`, `Bank Sampah`). Layer lain diabaikan.
  - **Placemark.name** = nama lokasi.
  - **Placemark.description** = dua baris dengan format: `Alamat: ...` dan `Jam buka: ...`. Parser toleran terhadap HTML sederhana (`<br>`) dan huruf besar/kecil.
  - **Point.coordinates** = `lng,lat,alt` (urutan KML: bujur dulu).
- Fallback: `content/lokasi.fallback.json`.

### 9.5 Ketahanan (website tetap tampil)

- Server Components memanggil fungsi data langsung di server atau melalui Route Handlers dengan `next: { revalidate: 300 }`.
- Jika Google lambat/gagal: website otomatis menampilkan data fallback dari `content/*.fallback.json`.
- Batas waktu (timeout) fetch ke Google: 5 detik.

### 9.6 Konfigurasi dan rahasia

`.env.example`:

```env
PORT=3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

SCHEDULE_SOURCE=file                # file | sheets
SHEETS_SCHEDULE_CSV_URL=            # CSV publish-to-web tab Jadwal (F17)

NEXT_PUBLIC_MYMAPS_ID=1A2B3C4D5E    # ID peta Google My Maps
MYMAPS_ID=1A2B3C4D5E

ENABLE_ANNOUNCEMENTS=false
SHEETS_ANNOUNCEMENTS_CSV_URL=

NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/1FAIpQLSc_example_form_id/viewform?embedded=true
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/1FAIpQLSc_example_form_id/viewform
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_ENABLE_WHATSAPP=true
```

Tidak ada kredensial rahasia database karena hanya memakai sumber publik.

---

## 10. Konten statis (disimpan di `content/`)

| File | Isi | Sumber |
|---|---|---|
| `site.ts` | nama dinas, alamat, jam layanan, telepon, email, tautan media sosial, nomor WA | Mitra |
| `profil.ts` | visi, misi, path gambar bagan struktur, koordinat/embed peta kantor | Mitra |
| `layanan.ts` | daftar layanan (tipe `Layanan` di F11) | Mitra |
| `sampah.ts` | panduan organik/anorganik/B3 + aturan buang sampah (jika ada) | Mitra + bawaan |
| `jadwal.fallback.json`, `lokasi.fallback.json` | data cadangan / mode tanpa F17 | Mitra |

Semua teks konten harus bisa diubah **hanya dengan mengedit file ini** (tanpa menyentuh komponen). Sampai bahan mitra diterima, pakai placeholder berkurung siku, mis. `[Alamat kantor DLH]`.

---

## 11. Panduan UI/UX

Pengguna utama membuka lewat HP, sebagian dengan sinyal lemah dan tanpa pengalaman teknis. Setiap keputusan tampilan harus memudahkan mereka menemukan informasi atau mengirim laporan.

### 11.1 Tata letak dan navigasi

- Rancang untuk **HP lebih dulu**, baru dilebarkan ke laptop.
- Informasi apa pun bisa dicapai **maksimal dua klik dari Beranda**.
- Header, menu, dan footer **tampil sama persis** di setiap halaman.
- Menu yang sedang dibuka **diberi tanda warna**, supaya pengguna tahu sedang di halaman mana.

### 11.2 Warna dan teks

- Warna utama **hijau `#1F6B4A`** (sesuai mockup). Daftarkan sebagai token Tailwind (mis. `brand`), turunan (hover/gelap/terang) dipilih agar kontras tetap ≥ 4,5:1.
- Setiap layar hanya punya **satu tombol utama berwarna penuh**.
- Bahasa Indonesia sederhana dengan kalimat pendek. Hindari istilah teknis dan singkatan dinas yang tidak umum (jika harus dipakai, jelaskan sekali, mis. "TPS (Tempat Pembuangan Sementara)", "B3 (bahan berbahaya dan beracun)").
- **Ikon selalu disertai teks**, jangan ikon saja.
- Teks isi ≥ 16 px; tombol ≥ 44 px.

### 11.3 Formulir pengaduan

- Label ditulis **di atas** kolom isian, disertai **contoh isian**.
- Kolom wajib **diberi tanda**; **pesan kesalahan menjelaskan apa yang harus diperbaiki**.
- Setelah laporan terkirim, **tampilkan apa yang terjadi selanjutnya** (F20).

### 11.4 Status dan keadaan khusus

- Tampilkan keadaan *loading*/*kosong*/*gagal* yang ramah dan berbahasa sederhana untuk jadwal, daftar lokasi, peta, dan form (dengan tautan cadangan).
- Halaman 404 berbahasa Indonesia dengan tautan ke Beranda dan Pengaduan.

### 11.5 Yang tidak dipakai (dilarang)

- **Pop-up**, **slider gambar otomatis**, **animasi berat**, dan **musik latar**. Semua itu memperlambat halaman dan mengganggu pengguna HP.
- Hormati `prefers-reduced-motion`; transisi hanya yang ringan (mis. warna/hover).

---

## 12. Uji dengan pengguna nyata

Sebelum serah terima, minta **3 sampai 5 orang** (pegawai dinas dan warga) mencoba dua tugas, lalu catat **apakah berhasil dan berapa lama**:

1. Temukan jadwal angkut sampah untuk kecamatan tertentu.
2. Kirim satu laporan pengaduan percobaan.

Catat bagian yang membuat mereka bingung, perbaiki, lalu masukkan hasilnya ke **laporan akhir sebagai bukti pengujian**. Gunakan template `docs/HASIL-UJI-PENGGUNA.md`:

| Peserta | Peran (pegawai/warga) | Perangkat | Tugas 1 berhasil? | Waktu T1 | Tugas 2 berhasil? | Waktu T2 | Bagian yang membingungkan | Perbaikan yang dilakukan |
|---|---|---|---|---|---|---|---|---|

---

## 13. Rencana pengujian dan bukti

| Aspek | Bukti yang dikumpulkan |
|---|---|
| Responsif | Tangkapan layar DevTools (360/768/1440 px) + foto/screenshot dari ≥ 2 HP Android |
| Kecepatan | Laporan Lighthouse Performance ≥ 80 (mode mobile, 4G simulasi); daftar ukuran gambar (< 200 KB) |
| Aksesibilitas | Laporan Lighthouse Accessibility ≥ 90 + catatan uji keyboard (Tab) di semua halaman |
| Keamanan | Tangkapan layar ikon gembok; bukti rekap hanya terbuka di akun dinas (coba buka dari akun lain → ditolak) |
| Privasi | Bukti form tanpa centang persetujuan gagal terkirim |
| Perawatan | Dokumentasi pegawai mengubah satu jadwal dan satu titik peta (sebelum/sesudah) |
| Kompatibilitas | Tabel hasil uji manual di Chrome, Firefox, Safari, dan browser bawaan Android |
| SEO | Laporan Lighthouse SEO ≥ 90; judul & deskripsi tiap halaman memuat nama dinas |
| Biaya | Daftar layanan dan paket gratis yang dipakai |
| Alur penuh | Laporan percobaan mitra → muncul di Sheets dinas → email notifikasi diterima |

---

## 14. Bahan dari mitra

*(Boleh diminta nanti kalau memang perlu.)* Centang setiap bahan begitu diterima. Bahan bertanda **wajib** harus ada **sebelum minggu uji coba**; tanpa bahan ini, halaman terkait masih berisi tempat kosong.

### 14.1 Daftar bahan

**Profil (wajib)**
- ☐ Visi dan misi dinas
- ☐ Bagan struktur organisasi (gambar atau PDF)
- ☐ Alamat kantor, telepon, email resmi, dan jam layanan
- ☐ File logo dinas atau Pemkab beserta izin pemakaiannya

**Layanan (wajib)**
- ☐ Daftar layanan beserta syarat, alur, biaya, lama proses, dan tempat pengajuan
- ☐ Formulir layanan yang bisa diunduh, jika ada

**Persampahan (wajib)**
- ☐ Jadwal angkut sampah per wilayah: hari, jam, titik kumpul
- ☐ Daftar TPS, TPS3R, dan bank sampah: nama, alamat, jam buka
- ☐ Aturan buang sampah yang ingin disampaikan ke warga, jika ada

**Pengaduan (wajib)**
- ☐ Daftar jenis masalah yang ditangani DLH
- ☐ Email pegawai penerima notifikasi laporan
- ☐ Nomor WhatsApp dinas untuk menerima foto, jika cara ini dipilih
- ☐ Persetujuan akun Google yang dipakai untuk formulir dan rekap

**Pelengkap (tambahan)**
- ☐ Foto kegiatan dinas untuk banner Beranda
- ☐ Tautan media sosial resmi dinas
- ☐ Nama pegawai yang akan dilatih mengelola website

**[TAMBAHAN KREATIF] Bahan untuk fitur nilai tambah (hanya jika fitur dipilih mitra)**
- ☐ Persetujuan mitra atas teks Kebijakan Privasi (K01) dan lama penyimpanan data laporan
- ☐ Jawaban resmi untuk FAQ yang bergantung kebijakan dinas, mis. tenggat respon laporan (K02)
- ☐ Validasi daftar pengelompokan sampah organik/anorganik/B3 (F07, K04)
- ☐ Batas hari "laporan terlambat" untuk tab Ringkasan (K13)
- ☐ Nomor siaga/darurat milik dinas, jika ada (K09)
- ☐ Persetujuan penggunaan motif/salam lokal dan konfirmasi ejaannya (K12)

### 14.2 Pemetaan bahan → fitur

| Bahan | Dipakai di |
|---|---|
| Visi/misi, bagan struktur, kontak, logo | F03, F10, header/footer |
| Daftar layanan, formulir | F11, F12 |
| Jadwal angkut | F13, F14, F17 |
| Daftar TPS/TPS3R/bank sampah | F15, F16 |
| Aturan buang sampah | F07 / konten `sampah.ts` |
| Jenis masalah, email pegawai, akun Google | F18, F22, F23 |
| Nomor WhatsApp | F21, F20 |
| Foto kegiatan | F05 |
| Media sosial | F04 |
| Nama pegawai dilatih | Pelatihan & serah terima |

### 14.3 Aturan placeholder

- Teks tempat kosong ditulis dalam **kurung siku**, mis. `[Alamat kantor DLH]`, `[Nomor telepon]`.
- Skrip `scripts/check-placeholders.mjs` memindai hasil build (`apps/web/.next` atau HTML yang dirender) dan konten di `content/` untuk pola `\[[^\]]+\]`, lalu **gagal (exit code 1)** jika menemukan. Jalankan di CI dan sebelum serah terima. (Kecualikan sintaks kode yang sah, mis. array JS di berkas non-konten.)

---

## 15. Perangkat, akun, hosting, dan biaya

Semua perangkat utama gratis. Satu-satunya biaya yang mungkin muncul adalah nama domain, dan itu opsional.

### 15.1 Akun yang perlu disiapkan

- ☐ Akun GitHub kelompok, dengan semua anggota sebagai kolaborator
- ☐ Akun Google atas nama dinas (**menunggu konfirmasi mitra**), dipakai untuk Form, Sheets, dan My Maps
- ☐ Daftar akun dan password diserahkan ke dinas saat serah terima, lalu **password diganti oleh dinas**

### 15.2 [KEPUTUSAN TEKNIS] Hosting gratis untuk Next.js (Satu Pintu)

Dokumen sumber awalnya memakai GitHub Pages (statis). Karena Next.js menggunakan Server Components, ISR, dan Route Handlers, platform hosting yang direkomendasikan adalah **Vercel (paket Hobby)** atau **Cloudflare Pages / Netlify**:

| Bagian | Opsi default | Catatan |
|---|---|---|
| Seluruh Aplikasi (Next.js + Route Handlers) | Vercel (paket Hobby) | 100% Gratis, HTTPS otomatis, tanpa *cold start* server tidur, mendukung ISR dan Route Handlers dalam satu pintu deployment |
| Domain | Subdomain bawaan hosting (gratis) | Opsional: domain `.id` berbayar atau `go.id` via Diskominfo setempat |

Keuntungan arsitektur Next.js satu pintu dibandingkan hosting backend terpisah:
- **Bebas Masalah Cold Start:** Tidak ada delay 30-50 detik akibat server tidur (sebagaimana dialami backend terpisah di paket gratis seperti Render).
- **Deployment Lebih Mudah:** Cukup hubungkan repositori GitHub ke Vercel/Netlify; build dan deployment berjalan otomatis.
- **Biaya Nol Rupiah:** Tidak memerlukan server VPS bulanan.

### 15.3 Biaya

| Kebutuhan | Biaya |
|---|---|
| Semua alat pengembangan, hosting (paket gratis), Google Form/Sheets/My Maps, Squoosh, Lighthouse | Gratis |
| Nama domain | Opsional (berbayar untuk `.id`; `go.id` lewat Diskominfo setempat) |

---

## 16. Keputusan terbuka (menunggu konfirmasi)

| # | Keputusan | Pemilik | Dampak |
|---|---|---|---|
| 1 | Foto lewat WhatsApp dinas (F21) atau tidak | Mitra | Bila ya: F21 wajib, nomor WA dibutuhkan. Bila tidak: hilangkan tombol dan teks WA |
| 2 | Akun Google atas nama dinas | Mitra | Memblokir F18, F22, F23, F15 |
| 3 | Apakah dinas punya media sosial | Mitra | F04 (tambahan) |
| 4 | Apakah ada pegawai yang rutin memperbarui pengumuman | Mitra | F09 (tambahan) |
| 5 | Apakah dinas punya formulir layanan unduhan | Mitra | F12 (tambahan) |
| 6 | Mengerjakan F17 (jadwal dari Sheets) atau tidak | Tim | Memengaruhi kemudahan perawatan jadwal (disarankan dikerjakan) |
| 7 | Memakai domain `.id`/`go.id` atau subdomain gratis | Mitra + Tim | Opsional |
| 8 | Pilihan hosting final untuk Next.js dan NestJS | Tim | Lihat 15.2 |
| 9 | Standar kualitas lain dari pembimbing | Pembimbing | Menggantikan angka target di Bagian 8 |
| 10 | Pembagian tugas tim | Tim | Bagian 18 |
| 11 | Fitur nilai tambah K01–K15 mana yang diterima mitra | Mitra | Menentukan cakupan Bagian 7.4 |
| 12 | Lama penyimpanan data laporan dan batas hari "terlambat" | Mitra | Teks K01 dan tab K13 |
| 13 | Persetujuan motif dan salam lokal Toraja | Mitra | K12 |
| 14 | Daftar jenis masalah final | Mitra | Pilihan di Google Form (F18) dan `jenisMasalah.ts` |

---

## 17. Fase kerja yang disarankan (urutan untuk AI agent)

1. **Fondasi:** inisialisasi monorepo, Next.js + Tailwind (token warna `#1F6B4A`, `lang="id"`), NestJS (health endpoint, config env, helmet, CORS, throttler), ESLint/Prettier, CI (lint, test, build, check-placeholders).
2. **Kerangka semua halaman:** layout, header (F02), menu responsif (F01), footer (F03), lima rute, metadata SEO per halaman, 404, skip link.
3. **Konten Wajib statis:** Beranda (F05–F08), Profil (F10), Layanan (F11), dengan placeholder berkurung siku untuk bahan mitra.
4. **Backend + Informasi:** endpoint schedules (mode `file`) dan locations (KML), tabel jadwal F13, peta F15, daftar lokasi + petunjuk arah F16, fallback dan stale-while-error.
5. **Pengaduan:** halaman Pengaduan dengan penjelasan privasi, iframe Google Form (F18), tampilan persetujuan (F19) dan konfirmasi (F20) — konfigurasi form di akun dinas, tombol WhatsApp (F21 jika disetujui); siapkan Sheets rekap (F22), notifikasi (F23), kolom tindak lanjut (F24) — dokumentasikan langkah di `docs/PANDUAN-PENGELOLAAN.md`.
6. **Optimasi dan QA:** kompres gambar WebP < 200 KB, jalankan Lighthouse (Performance ≥ 80, Accessibility ≥ 90, SEO ≥ 90), uji responsif 360–1440 px, uji keyboard, uji 4 browser, uji dua HP Android.
7. **Fitur Tambahan (hanya jika Wajib selesai dan ada waktu):** F17 (disarankan paling dulu), F14, F12, F09, F04. Setelah itu **[TAMBAHAN KREATIF]** K01–K15 sesuai urutan di Bagian 7.4 dan sesuai yang diterima mitra.
8. **Uji pengguna dan serah terima:** uji 3–5 orang (Bagian 12), perbaikan, pelatihan pegawai (ubah satu jadwal dan satu titik peta), serahkan panduan dan daftar akun, tanda tangan berita acara.

---

## 18. Usulan pembagian tugas tim

Bagian ini **kosong di dokumen sumber** (judul "Usulan pembagian tugas tim" tanpa isi). Isi tabel berikut oleh tim; usulan jalur kerja berdasarkan fase di atas:

| Jalur kerja | Cakupan | Penanggung jawab |
|---|---|---|
| Frontend & UI | Layout, komponen, halaman, Tailwind, aksesibilitas | [isi nama] |
| Backend & integrasi | NestJS API, parser CSV/KML, cache, deployment | [isi nama] |
| Konfigurasi Google | Form, Sheets rekap, notifikasi, My Maps, akun dinas | [isi nama] |
| Konten & koordinasi mitra | Meminta bahan, menulis teks sederhana, panduan pegawai | [isi nama] |
| QA & dokumentasi | Lighthouse, uji perangkat/browser, uji pengguna, laporan akhir | [isi nama] |

(Placeholder `[isi nama]` hanya boleh ada di dokumen ini, bukan di website.)

---

## 19. Kriteria website dinyatakan selesai (Definition of Done)

Website siap diserahterimakan kalau **semua poin ini tercentang**:

- ☐ Semua fitur **Wajib (F01 sampai F24)** berfungsi (F21 wajib bila foto lewat WhatsApp)
- ☐ **Tidak ada lagi teks dalam kurung siku** di halaman mana pun
- ☐ Website bisa dibuka publik lewat **alamat HTTPS**
- ☐ Skor Lighthouse: **Performance ≥ 80, Accessibility ≥ 90, SEO ≥ 90**
- ☐ Tampilan rapi di **dua HP Android dan satu laptop**
- ☐ Laporan percobaan dari mitra **masuk ke Sheets dinas, dan notifikasi email terkirim**
- ☐ Uji pengguna dengan **3 sampai 5 orang** selesai dan temuannya sudah diperbaiki
- ☐ Pegawai berhasil **mengubah satu jadwal dan satu titik peta sendiri**
- ☐ **Panduan pengelolaan dan daftar akun** sudah diserahkan
- ☐ **Berita acara serah terima** ditandatangani mitra

### 19.0 [TAMBAHAN KREATIF] Nilai tambah (tidak wajib untuk serah terima)

Tidak menjadi syarat selesai. Namun bila dikerjakan, setiap fitur K yang tayang harus lolos kriteria penerimaannya, tidak menurunkan skor Lighthouse di bawah target, dan dicantumkan di laporan akhir sebagai nilai tambah. Yang paling berdampak bagi DLH: **K01, K02, K03, K09, K13**.

### 19.1 Dokumen yang harus ikut diserahkan

- `docs/PANDUAN-PENGELOLAAN.md` — langkah bergambar/sederhana untuk pegawai: (a) mengubah jadwal (via Sheets bila F17; via file bila tidak), (b) menambah/mengubah titik di My Maps beserta konvensi nama layer dan deskripsi (Bagian 9.4), (c) membaca rekap laporan dan mengisi Status/Petugas/Tanggal selesai/Catatan, (d) mengganti password akun, (e) siapa dihubungi bila ada masalah.
- `docs/DAFTAR-AKUN.md` — daftar akun (GitHub, Google dinas, hosting, domain bila ada) dan cara serah terima; password diganti oleh dinas setelah serah terima. **Jangan mengomit password ke repo**; serahkan lewat berkas/jalur aman di luar repo.
- `docs/HASIL-UJI-PENGGUNA.md` dan laporan Lighthouse sebagai bukti pengujian.

---

## 20. Lampiran: ringkasan tabel keterlacakan (fitur → komponen → bukti)

| Fitur | Komponen/Endpoint utama | Bukti penerimaan |
|---|---|---|
| F01 | `NavMenu` | Uji keyboard, DevTools 360 px |
| F02 | `Header` | Terlihat di semua halaman/lebar |
| F03 | `Footer`, `content/site.ts` | 4 data tampil di semua halaman |
| F04 | `Footer`/`SocialLinks` | Tampil hanya bila ada tautan |
| F05 | `Banner` | Tombol lapor → `/pengaduan` |
| F06 | `QuickCards` | 4 kartu, tautan benar |
| F07 | `SortingGuide`, `content/sampah.ts` | 3 kelompok + contoh |
| F08 | `Steps` | 3 langkah bernomor |
| F09 | `Announcements`, `/api/announcements` | Tidak dirender bila kosong |
| F10 | `/profil` | Visi, misi, bagan, kontak, peta kantor |
| F11 | `Accordion`, `content/layanan.ts` | 5 detail per layanan, keyboard OK |
| F12 | Tautan unduh | Muncul hanya bila `formulirUrl` ada |
| F13 | `ScheduleTable`, `/api/schedules` | Uji pengguna #1 berhasil |
| F14 | Filter di `ScheduleTable` | Filter benar, pesan kosong jelas |
| F15 | `MapEmbed` | Peta tampil, dinas bisa edit di My Maps |
| F16 | `LocationList`, `/api/locations` | Tombol "Petunjuk arah" membuka Google Maps |
| F17 | `SCHEDULE_SOURCE=sheets` | Ubah Sheets → website ikut berubah ≤ 5 menit |
| F18 | `ComplaintForm` (iframe) | Form tampil, 5 pertanyaan + persetujuan |
| F19 | Pertanyaan wajib di Form + penjelasan | Kirim tanpa centang → ditolak |
| F20 | Pesan konfirmasi Form | Terlihat setelah kirim percobaan |
| F21 | `WhatsAppButton` | Tautan `wa.me` benar bila dipilih |
| F22 | Sheets rekap | Respons percobaan tercatat |
| F23 | Notifikasi Form/Sheets/Apps Script | Email diterima pegawai |
| F24 | Kolom Status/Petugas/Tanggal selesai/Catatan | Dropdown & isian berfungsi |
| K01 | `/privasi` | Tautan di footer dan Pengaduan; tanpa placeholder |
| K02 | `Accordion`, `content/faq.ts` | 5 FAQ di Beranda, FAQ Pengaduan tampil |
| K03 | `ScheduleTable` (klien) | Label "Hari ini" sesuai hari WITA; tabel tetap terbaca tanpa JS |
| K04 | `WasteChecker`, `content/daftarSampah.ts` | Ketik "botol plastik" → Anorganik |
| K05 | `Tips3R` | 3 kartu tampil |
| K06 | `QuickStats` | Angka sama dengan jumlah data nyata; tidak tampil bila kosong |
| K07 | Tombol bagikan | Tautan `wa.me/?text=` benar |
| K08 | Gaya `print:` | Pratinjau cetak rapi |
| K09 | Kotak tips melapor dan darurat | Tampil di `/pengaduan` sebelum form |
| K10 | Kontrol ukuran teks | 125% tanpa tata letak pecah di 360 px |
| K11 | Manifest + service worker | Offline menampilkan data terakhir |
| K12 | Hiasan SVG, salam lokal | Persetujuan mitra tercatat; kontras tetap lolos |
| K13 | Tab Ringkasan di Sheets | Angka sesuai hitungan manual |
| K14 | Kolom No. Laporan | Nomor otomatis unik untuk tiap baris |
| K15 | Layer dan legenda My Maps | Tiga layer bernama tepat, legenda ada |

---

## 21. [TAMBAHAN KREATIF] Bank konten siap pakai (halaman utama)

Dokumen sumber hanya menyebut struktur halaman, bukan isinya. Bagian 21–24 menyediakan **draf teks, data contoh, dan template** agar AI agent tidak mengarang sendiri dan halaman tidak kosong. Aturan pakai:

- Teks bercetak **[Usulan]** boleh langsung dipakai dan **diserahkan ke mitra untuk persetujuan**.
- Teks atau angka yang berkurung siku (mis. `[telepon]`) adalah **fakta milik dinas** yang harus diisi dari bahan mitra. **Jangan diisi dengan karangan.**
- Semua data jadwal dan lokasi di Bagian 21.8 adalah **contoh pengembangan** yang wajib diganti dengan data resmi sebelum tayang.

### 21.1 Beranda

- **Judul banner [Usulan]:** "Dinas Lingkungan Hidup Kabupaten Tana Toraja"
- **Anak judul [Usulan]:** "Lingkungan bersih mulai dari kita. Cari jadwal angkut sampah, lokasi TPS, dan layanan kami di sini."
- **Tombol utama banner [Usulan]:** "Laporkan Masalah Lingkungan" (menuju `/pengaduan`)
- **Kartu menu cepat (F06) [Usulan]:**

| Kartu | Teks pendek | Tautan |
|---|---|---|
| Layanan | "Syarat, alur, biaya, dan lama proses" | `/layanan` |
| Jadwal | "Kapan sampah di wilayah Anda diangkut" | `/informasi#jadwal` |
| Lokasi TPS | "TPS, TPS3R, dan bank sampah terdekat" | `/informasi#lokasi` |
| Profil | "Kenali Dinas Lingkungan Hidup" | `/profil` |

- **Judul tiga langkah (F08) [Usulan]:** "Cara melapor, mudah dan cepat"

| Langkah | Judul | Penjelasan |
|---|---|---|
| 1 | Isi formulir | "Buka halaman Pengaduan, lalu isi nama, nomor HP, jenis masalah, lokasi, dan ceritanya." |
| 2 | Setujui dan kirim | "Centang persetujuan penggunaan data pribadi, lalu tekan Kirim." |
| 3 | Petugas menindaklanjuti | "Petugas DLH menerima laporan Anda dan menindaklanjutinya. Jika perlu, kami menghubungi nomor HP Anda." |

- **Panduan memilah sampah (F07) [Usulan]:**

| Kelompok | Penjelasan satu kalimat | Contoh | Cara menangani |
|---|---|---|---|
| **Organik** | Sampah yang berasal dari makhluk hidup dan mudah membusuk. | Sisa makanan, kulit buah, sayuran layu, daun kering, ranting kecil | Kumpulkan di wadah tersendiri. Bisa dijadikan kompos atau pakan ternak. Jangan dicampur dengan plastik. |
| **Anorganik** | Sampah yang sulit membusuk dan sebagian besar bisa didaur ulang. | Botol plastik, kaleng, kardus, kertas, botol kaca | Bersihkan dan keringkan, lalu pisahkan menurut jenisnya. Setorkan ke bank sampah jika ada di dekat Anda. |
| **B3** (bahan berbahaya dan beracun) | Sampah yang berbahaya bagi manusia dan lingkungan. | Baterai bekas, lampu neon, obat kedaluwarsa, kaleng cat, pestisida | Jangan dibuang ke tempat sampah biasa. Simpan terpisah dalam wadah tertutup, jauh dari anak-anak. Tanyakan tempat penyerahan ke DLH di [telepon/tempat penyerahan B3]. |

> Pengelompokan dan cara penanganan B3 **harus divalidasi DLH**. Jika dinas belum punya layanan penerimaan B3, ganti kalimat terakhir dengan "Hubungi DLH untuk petunjuk penanganan."

- **Pengumuman (F09):** hanya tampil jika ada isi. Tanpa isi, komponen tidak dirender.

### 21.2 Profil

- **Tentang kami [Usulan, konfirmasi mitra]:** "Dinas Lingkungan Hidup Kabupaten Tana Toraja menangani urusan lingkungan hidup di Kabupaten Tana Toraja, termasuk pengelolaan sampah dan penanganan pengaduan lingkungan. [Tambahkan tugas pokok dan fungsi sesuai peraturan yang berlaku.]"
- **Visi:** `[Visi dinas, salin dari dokumen resmi/Renstra]`
- **Misi:** daftar bernomor `[Misi 1] … [Misi n]`
- **Bagan struktur:** gambar WebP (< 200 KB) atau PDF. Jika gambar terlalu detail untuk HP, sediakan tombol "Lihat ukuran penuh" yang membuka gambar di tab baru dan tautan "Unduh PDF".
- **Kontak:** alamat, telepon, email, jam layanan (dari `content/site.ts`).
- **Peta kantor:** Google Maps embed + tombol "Petunjuk arah ke kantor DLH".
- **Logo:** hanya dipakai setelah izin pemakaian diterima.

### 21.3 Layanan (template data, isi dari mitra)

Struktur tiap layanan tetap (F11). Daftar layanan dan seluruh isinya berasal dari DLH; **jangan mengarang syarat atau biaya**. Contoh bentuk pengisian:

| Nama layanan (contoh judul, konfirmasi mitra) | Syarat | Alur | Biaya | Lama proses | Tempat |
|---|---|---|---|---|---|
| `[Layanan 1, mis. Persetujuan dokumen lingkungan]` | `[daftar syarat]` | `[langkah 1…n]` | `[Gratis / Rp …]` | `[… hari kerja]` | `[kantor/loket]` |
| `[Layanan 2, mis. Layanan pengangkutan sampah]` | `[…]` | `[…]` | `[…]` | `[…]` | `[…]` |
| `[Layanan 3, mis. Pembinaan bank sampah]` | `[…]` | `[…]` | `[…]` | `[…]` | `[…]` |
| `[Layanan 4, mis. Pengaduan masyarakat]` | "Nama, nomor HP, lokasi, uraian masalah" | "Isi formulir Pengaduan di website" | "Gratis" | `[…]` | "Website ini / WhatsApp / kantor" |

Catatan: contoh judul hanyalah petunjuk jenis layanan yang lazim ada pada dinas lingkungan hidup; **daftar resmi ditentukan mitra**. Layanan "Pengaduan masyarakat" hanya dicantumkan setelah mitra setuju.

### 21.4 Informasi

- **Judul bagian jadwal [Usulan]:** "Jadwal Angkut Sampah"
- **Penjelas [Usulan]:** "Cari kecamatan Anda untuk melihat hari, jam, dan titik kumpul. Letakkan sampah di titik kumpul sebelum jam pengangkutan."
- **Keadaan kosong [Usulan]:** "Jadwal belum tersedia. Hubungi dinas di [telepon]."
- **Judul bagian peta [Usulan]:** "Lokasi TPS, TPS3R, dan Bank Sampah"
- **Penjelas peta [Usulan]:** "Ketuk titik di peta untuk melihat nama dan alamat. Ketuk 'Petunjuk arah' untuk membuka Google Maps."
- **Legenda penjelas jenis [Usulan]:** TPS = tempat pembuangan sementara; TPS3R = tempat pengolahan sampah dengan prinsip kurangi, gunakan ulang, daur ulang; Bank Sampah = tempat menabung sampah yang sudah dipilah.
- **Aturan buang sampah (jika mitra punya):** tampil sebagai kotak "Aturan membuang sampah" di atas jadwal. Tanpa bahan, kotak tidak dirender.

### 21.5 Jenis masalah (daftar pilihan di Google Form dan `jenisMasalah.ts`)

**[Usulan, final ditentukan mitra]**

1. Sampah menumpuk atau dibuang sembarangan
2. Sampah tidak diangkut sesuai jadwal
3. Pembakaran sampah
4. Pencemaran air (sungai, selokan, mata air)
5. Pencemaran udara (asap atau bau menyengat)
6. Limbah dari usaha atau kegiatan (pasar, rumah makan, bengkel, peternakan, dll.)
7. Limbah B3 (baterai, oli bekas, bahan kimia, dll.)
8. Kebisingan
9. Kerusakan atau penebangan pohon dan ruang terbuka hijau
10. Lainnya

Urutan di Google Form dan di `jenisMasalah.ts` harus **sama persis**.

### 21.6 Pengaduan

- **Judul [Usulan]:** "Laporkan Masalah Lingkungan"
- **Pengantar [Usulan]:** "Isi formulir di bawah ini. Mengisi hanya butuh sekitar 3 menit. Anda tidak perlu membuat akun."
- **Penjelasan data pribadi [Usulan]:** "Kami meminta nama, nomor HP, lokasi, dan cerita laporan Anda hanya untuk menindaklanjuti laporan ini. Data hanya dibuka oleh pegawai DLH yang bertugas. Pengelolaan data mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Baca selengkapnya di Kebijakan Privasi."
- **Teks persetujuan (kotak centang wajib) [Usulan]:** "Saya setuju data saya (nama, nomor HP, lokasi, dan uraian laporan) dipakai Dinas Lingkungan Hidup Kabupaten Tana Toraja hanya untuk menindaklanjuti laporan ini."
- **Bagian foto [Usulan, bila WhatsApp dipakai]:** "Punya foto? Kirim lewat WhatsApp dinas. Tidak perlu masuk akun Google." + tombol "Kirim foto lewat WhatsApp".
- **Pesan konfirmasi Google Form (F20) [Usulan]:** "Terima kasih, laporan Anda sudah kami terima. Petugas Dinas Lingkungan Hidup akan memeriksa laporan Anda. Jika perlu informasi tambahan, kami akan menghubungi nomor HP yang Anda isi. [Jika WhatsApp dipakai: Anda dapat mengirim foto ke WhatsApp dinas di nomor [nomor WA].] [Jika dinas menetapkan tenggat: Kami berusaha menanggapi dalam [X] hari kerja.]"
- **Pesan WhatsApp awal (F21) [Usulan]:** "Halo DLH Tana Toraja, saya mengirim foto untuk laporan atas nama [nama saya] di lokasi [lokasi]."

### 21.7 Footer dan kontak

- Baris 1: nama dinas, alamat, jam layanan.
- Baris 2: telepon (`tel:`) dan email (`mailto:`).
- Baris 3: tautan Kebijakan Privasi (K01), media sosial (F04, bila ada).
- Baris 4: "© [tahun] Dinas Lingkungan Hidup Kabupaten Tana Toraja".
- Jam layanan contoh format: "Senin–Jumat, [jam buka]–[jam tutup] WITA".

### 21.8 Data contoh untuk pengembangan (WAJIB DIGANTI)

Gunakan hanya agar tampilan bisa diuji sebelum data resmi tiba. **Dilarang tayang ke publik.** Skrip `check-placeholders` dan daftar periksa serah terima harus memastikan semuanya sudah diganti.

`jadwal.fallback.json` (contoh):

```json
[
  { "kecamatan": "Kecamatan Contoh A", "wilayah": "Wilayah Contoh 1", "hari": "Senin & Kamis", "jam": "07.00–09.00", "titikKumpul": "Titik Kumpul Contoh 1" },
  { "kecamatan": "Kecamatan Contoh A", "wilayah": "Wilayah Contoh 2", "hari": "Selasa", "jam": "07.00–09.00", "titikKumpul": "Titik Kumpul Contoh 2" },
  { "kecamatan": "Kecamatan Contoh B", "wilayah": "Wilayah Contoh 3", "hari": "Rabu & Sabtu", "jam": "08.00–10.00", "titikKumpul": "Titik Kumpul Contoh 3" }
]
```

`lokasi.fallback.json` (contoh):

```json
[
  { "nama": "TPS Contoh 1", "jenis": "TPS", "alamat": "Alamat Contoh 1", "jamBuka": "06.00–18.00", "lat": -3.0, "lng": 119.8 },
  { "nama": "TPS3R Contoh 1", "jenis": "TPS3R", "alamat": "Alamat Contoh 2", "jamBuka": "08.00–16.00", "lat": -3.0, "lng": 119.8 },
  { "nama": "Bank Sampah Contoh 1", "jenis": "Bank Sampah", "alamat": "Alamat Contoh 3", "jamBuka": "09.00–15.00", "lat": -3.0, "lng": 119.8 }
]
```

---

## 22. [TAMBAHAN KREATIF] Bank konten untuk fitur nilai tambah dan template

### 22.1 Tips 3R (K05) [Usulan]

| Prinsip | Penjelasan | Tips |
|---|---|---|
| **Kurangi** (Reduce) | Kurangi sampah dari awal. | Bawa tas belanja sendiri; bawa botol minum isi ulang; beli secukupnya agar makanan tidak terbuang. |
| **Gunakan ulang** (Reuse) | Pakai kembali barang yang masih layak. | Pakai ulang botol dan toples sebagai wadah; perbaiki barang yang rusak; berikan pakaian layak pakai kepada yang membutuhkan. |
| **Daur ulang** (Recycle) | Ubah sampah menjadi barang bernilai. | Pisahkan sampah anorganik dan setorkan ke bank sampah; buat kompos dari sisa dapur; manfaatkan kardus dan kertas bekas. |

### 22.2 Daftar "Cek jenis sampah" (K04) [Usulan, divalidasi DLH]

| Nama sampah | Kategori | Saran singkat |
|---|---|---|
| Sisa nasi dan lauk | Organik | Jadikan kompos atau pakan ternak. |
| Sisa sayur | Organik | Jadikan kompos. |
| Kulit buah | Organik | Jadikan kompos. |
| Daun kering | Organik | Kumpulkan untuk kompos atau mulsa. |
| Ranting kecil | Organik | Cacah atau kumpulkan terpisah. |
| Ampas kopi dan teh | Organik | Bisa untuk kompos. |
| Cangkang telur | Organik | Hancurkan, campur ke kompos. |
| Tulang dan sisa daging | Organik | Buang ke tempat sampah organik tertutup agar tidak berbau. |
| Botol plastik | Anorganik | Bilas, keringkan, setor ke bank sampah. |
| Gelas dan kemasan plastik | Anorganik | Bilas, keringkan, pisahkan. |
| Kantong plastik | Anorganik | Kumpulkan dan pakai ulang bila bisa. |
| Kardus | Anorganik | Lipat, jaga tetap kering, setor ke bank sampah. |
| Kertas bekas | Anorganik | Pisahkan dari sampah basah. |
| Kaleng minuman | Anorganik | Bilas dan pipihkan. |
| Botol kaca | Anorganik | Bilas; hati-hati pecah, bungkus bila sudah pecah. |
| Pecahan kaca | Anorganik | Bungkus kertas tebal dan beri tanda "Pecahan kaca". |
| Styrofoam | Anorganik | Kumpulkan terpisah; sulit didaur ulang. |
| Sedotan dan sendok plastik | Anorganik | Kumpulkan; kurangi pemakaian sekali pakai. |
| Kain perca | Anorganik | Pakai ulang atau serahkan ke pengepul. |
| Baterai bekas | B3 | Jangan dibuang ke sampah biasa; simpan terpisah dan tanyakan DLH. |
| Lampu neon dan LED rusak | B3 | Simpan dalam kardus tertutup; jangan dipecahkan. |
| Obat kedaluwarsa | B3 | Jangan dibuang ke selokan; tanyakan DLH atau apotek. |
| Kaleng cat | B3 | Tutup rapat; jangan dibuang ke sungai atau selokan. |
| Pestisida dan kemasannya | B3 | Simpan tertutup, jauh dari anak; tanyakan DLH. |
| Oli bekas | B3 | Tampung dalam wadah tertutup; jangan dibuang ke tanah atau selokan. |
| Aki bekas | B3 | Serahkan ke tempat penampungan yang benar; jangan dibongkar sendiri. |
| Termometer raksa pecah | B3 | Jauhkan dari anak; hubungi DLH atau fasilitas kesehatan. |

> Kata kunci pencarian tambahan (sinonim) boleh ditambahkan di kolom tersembunyi `alias`, mis. "aqua" untuk botol plastik, "dus" untuk kardus.

### 22.3 FAQ (K02) [Usulan]

| # | Kategori | Pertanyaan | Jawaban |
|---|---|---|---|
| 1 | Pengaduan | Apakah saya harus punya akun Google untuk melapor? | Tidak. Anda cukup mengisi formulir di halaman Pengaduan. Akun Google hanya diperlukan bila Anda mengunggah foto ke formulir, karena itu foto dikirim lewat WhatsApp dinas. |
| 2 | Pengaduan | Bagaimana cara mengirim foto? | Kirim lewat WhatsApp dinas di nomor [nomor WA] (tombol "Kirim foto lewat WhatsApp" di halaman Pengaduan). Sebutkan nama dan lokasi laporan Anda. |
| 3 | Pengaduan | Apakah data saya aman? | Data Anda hanya dipakai untuk menindaklanjuti laporan dan hanya bisa dibuka oleh pegawai DLH yang bertugas. Website ini tidak menyimpan data Anda di server sendiri. Lihat Kebijakan Privasi. |
| 4 | Pengaduan | Setelah mengirim, apa yang terjadi? | Laporan Anda masuk ke daftar milik DLH dan pegawai diberi tahu lewat email. Petugas memeriksa laporan dan, bila perlu, menghubungi nomor HP Anda. |
| 5 | Pengaduan | Bisakah saya melihat status laporan saya di website? | Belum. Status dicatat oleh petugas di dalam sistem DLH. Jika ingin bertanya, hubungi dinas di [telepon]. |
| 6 | Pengaduan | Berapa lama laporan ditanggapi? | [Isi sesuai kebijakan dinas, mis. "dalam X hari kerja". Hapus pertanyaan ini jika dinas belum menetapkan.] |
| 7 | Pengaduan | Apakah ada biaya untuk melapor? | Tidak. Melapor tidak dipungut biaya. |
| 8 | Sampah | Bagaimana tahu jadwal angkut sampah di wilayah saya? | Buka halaman Informasi, pilih kecamatan Anda pada tabel jadwal. |
| 9 | Sampah | Di mana saya bisa menyetor sampah anorganik? | Lihat peta dan daftar di halaman Informasi untuk bank sampah dan TPS3R terdekat. |
| 10 | Sampah | Apa itu sampah B3 dan ke mana dibuang? | B3 adalah bahan berbahaya dan beracun, seperti baterai bekas dan lampu neon. Jangan dibuang ke tempat sampah biasa. Tanyakan tempat penyerahannya ke DLH di [telepon]. |
| 11 | Layanan | Di mana saya mengajukan layanan DLH? | Setiap layanan punya tempat pengajuan. Lihat rinciannya di halaman Layanan. |
| 12 | Layanan | Bagaimana jika syarat layanan saya belum lengkap? | Hubungi dinas di [telepon] pada jam layanan [jam layanan] sebelum datang. |

Beranda memakai FAQ #1, #2, #4, #8, #10 sebagai lima teratas.

### 22.4 Kebijakan Privasi (K01), kerangka dan contoh teks [Usulan, ditinjau mitra]

Judul halaman: "Kebijakan Privasi Pengaduan". Bagian dan contoh isi:

1. **Siapa kami:** "Dinas Lingkungan Hidup Kabupaten Tana Toraja ([alamat]) mengelola formulir pengaduan di website ini."
2. **Data yang kami minta:** nama, nomor HP, jenis masalah, lokasi, dan uraian laporan. Foto (jika dikirim lewat WhatsApp) berikut nomor WhatsApp pengirim.
3. **Untuk apa:** "Hanya untuk menerima, memeriksa, menindaklanjuti, dan, bila perlu, menghubungi Anda tentang laporan."
4. **Dasar pemrosesan:** persetujuan Anda (kotak centang pada formulir). "Anda dapat menarik persetujuan dengan menghubungi dinas."
5. **Siapa yang bisa melihat:** pegawai DLH yang bertugas menangani laporan. Data tidak dijual atau dibagikan untuk keperluan lain.
6. **Di mana data disimpan:** Google Form dan Google Sheets milik akun resmi dinas. "Website ini tidak menyimpan data pelapor di server sendiri."
7. **Berapa lama disimpan:** `[lama penyimpanan sesuai kebijakan dinas]`.
8. **Hak Anda:** meminta informasi tentang data Anda, memperbaiki data yang keliru, dan meminta penghapusan sesuai ketentuan yang berlaku. Hubungi [email/telepon dinas].
9. **Dasar hukum:** mengacu pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.
10. **Perubahan kebijakan:** tanggal pembaruan terakhir `[tanggal]`.

Catatan: draf ini bukan nasihat hukum; **mitra bertanggung jawab atas teks akhir**.

### 22.5 Template Sheets rekap (F22, F24, K13, K14)

**Urutan kolom** di tab respons (sesuaikan bila urutan pertanyaan Form berbeda):

| Kolom | Isi | Sumber |
|---|---|---|
| A | Timestamp | Form (otomatis) |
| B | Nama | Form |
| C | Nomor HP | Form |
| D | Jenis masalah | Form |
| E | Lokasi | Form |
| F | Uraian | Form |
| G | Persetujuan data pribadi | Form |
| H | **Status** | F24, dropdown: Baru / Diproses / Selesai / Ditolak |
| I | **Petugas** | F24, diisi manual |
| J | **Tanggal selesai** | F24, format tanggal |
| K | **Catatan** | F24, diisi manual |
| L | **No. Laporan** | K14, rumus otomatis |
| M | Bulan (kolom bantu) | K13, rumus otomatis |

Rumus contoh (ganti `Form Responses 1` dengan nama tab sebenarnya; pada akun berbahasa Indonesia nama tab dan pemisah argumen bisa berbeda, mis. `;` menggantikan `,`). **Uji semua rumus** dengan data percobaan:

```text
L2 (No. Laporan, satu sel untuk seluruh kolom):
=ARRAYFORMULA(IF(A2:A="","","DLH-"&TEXT(A2:A,"yyyymm")&"-"&TEXT(ROW(A2:A)-1,"0000")))

M2 (Bulan):
=ARRAYFORMULA(IF(A2:A="","",TEXT(A2:A,"yyyy-mm")))

Ringkasan!B1 Total laporan:
=COUNTA('Form Responses 1'!A2:A)

Ringkasan!B2 Batas hari terlambat (isi angka, usulan 7)

Laporan per status (contoh Baru):
=COUNTIF('Form Responses 1'!H2:H,"Baru")

Laporan per jenis masalah:
=QUERY('Form Responses 1'!D2:D,"select D, count(D) where D is not null group by D label count(D) 'Jumlah'",0)

Laporan per bulan:
=QUERY('Form Responses 1'!M2:M,"select M, count(M) where M is not null group by M order by M label count(M) 'Jumlah'",0)

Rata-rata lama penyelesaian (hari):
=IFERROR(AVERAGE(FILTER(ARRAYFORMULA('Form Responses 1'!J2:J-INT('Form Responses 1'!A2:A)),'Form Responses 1'!H2:H="Selesai",'Form Responses 1'!J2:J<>"")),"-")

Pemformatan bersyarat (rentang A2:M, rumus khusus, latar merah muda) untuk laporan terlambat:
=AND($H2="Baru",TODAY()-INT($A2)>INDIRECT("Ringkasan!B2"))
```

Pengaturan keamanan Sheets: bagikan hanya ke akun pegawai yang berwenang (peran Editor), **jangan** aktifkan "Anyone with the link" dan **jangan** "Publish to web" pada spreadsheet ini. Proteksi baris judul dan kolom A–G agar data pelapor tidak terhapus tidak sengaja.

### 22.6 Template pesan

**Skrip notifikasi email (opsi 3 di F23, Google Apps Script di akun dinas):**

```javascript
// Trigger: Pemicu terpasang "Dari spreadsheet" → "Saat formulir dikirim"
const PENERIMA = ['pegawai1@contoh.go.id', 'pegawai2@contoh.go.id']; // ganti dengan email dari mitra

function kirimNotifikasi(e) {
  const v = e.namedValues; // nama kunci = judul pertanyaan di Form; sesuaikan jika berbeda
  const jenis = (v['Jenis masalah'] || [''])[0];
  const lokasi = (v['Lokasi'] || [''])[0];
  const uraian = (v['Uraian'] || [''])[0];
  MailApp.sendEmail({
    to: PENERIMA.join(','),
    subject: 'Laporan baru DLH: ' + jenis,
    body: 'Ada laporan baru.\n\nJenis masalah: ' + jenis +
          '\nLokasi: ' + lokasi + '\nUraian: ' + uraian +
          '\n\nBuka rekap untuk melihat data lengkap dan mengisi Status, Petugas, Tanggal selesai, dan Catatan.' +
          '\n' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  });
}
```

Catatan keamanan: email notifikasi **tidak boleh memuat nomor HP pelapor**; data lengkap hanya dilihat di Sheets privat.

**Contoh teks email notifikasi (bila memakai Notification rules/Form):** subjek "Laporan baru masuk — Pengaduan DLH Tana Toraja"; isi: "Ada laporan baru. Buka Sheets rekap, isi Status, Petugas, dan Catatan."

### 22.7 Judul dan deskripsi SEO per halaman [Usulan]

| Halaman | `title` | `description` (≤ 160 karakter) |
|---|---|---|
| Beranda | "Dinas Lingkungan Hidup Kabupaten Tana Toraja" | "Situs resmi Dinas Lingkungan Hidup Kabupaten Tana Toraja: jadwal angkut sampah, lokasi TPS, layanan, dan pengaduan lingkungan." |
| Profil | "Profil | Dinas Lingkungan Hidup Kabupaten Tana Toraja" | "Visi, misi, struktur organisasi, dan kontak Dinas Lingkungan Hidup Kabupaten Tana Toraja." |
| Layanan | "Layanan | Dinas Lingkungan Hidup Kabupaten Tana Toraja" | "Daftar layanan Dinas Lingkungan Hidup Kabupaten Tana Toraja beserta syarat, alur, biaya, dan lama proses." |
| Informasi | "Jadwal Angkut Sampah dan Lokasi TPS | DLH Kabupaten Tana Toraja" | "Jadwal angkut sampah per kecamatan serta peta TPS, TPS3R, dan bank sampah di Kabupaten Tana Toraja." |
| Pengaduan | "Pengaduan Lingkungan | DLH Kabupaten Tana Toraja" | "Laporkan masalah lingkungan ke Dinas Lingkungan Hidup Kabupaten Tana Toraja. Tanpa akun, mudah dari HP." |
| Privasi | "Kebijakan Privasi | DLH Kabupaten Tana Toraja" | "Cara Dinas Lingkungan Hidup Kabupaten Tana Toraja mengelola data pelapor sesuai UU No. 27 Tahun 2022." |

### 22.8 Teks antarmuka kecil (microcopy) [Usulan]

| Situasi | Teks |
|---|---|
| Halaman tidak ditemukan (404) | "Halaman tidak ditemukan. Mungkin alamatnya salah atau halaman sudah dipindah. [Kembali ke Beranda] [Laporkan masalah]" |
| Data jadwal/lokasi gagal dimuat | "Data sedang tidak bisa dimuat. Coba lagi sebentar lagi atau hubungi dinas di [telepon]." |
| Data memakai cadangan | "Data mungkin belum terbaru." |
| Iframe form/peta gagal | "Formulir tidak tampil? Buka formulir di tab baru." / "Peta tidak tampil? Buka peta di Google Maps." |
| Hasil filter kosong | "Tidak ada hasil untuk '[kata]'. Coba kata lain atau hapus filter." |
| Nomor HP salah (validasi Form) | "Nomor HP harus berupa angka, 10 sampai 13 digit. Contoh: 081234567890." |
| Kolom wajib kosong | "Kolom ini wajib diisi." |
| Offline (K11) | "Anda sedang offline. Menampilkan data terakhir yang tersimpan." |

(Tanda `[ ]` pada tabel ini menandai tombol/isian; saat dirender ke halaman, isian diganti nilai sebenarnya dan tidak boleh tersisa sebagai teks berkurung siku.)

---

## 23. [TAMBAHAN KREATIF] Pelatihan pegawai dan panduan pengelolaan

### 23.1 Agenda pelatihan (± 90 menit), `docs/AGENDA-PELATIHAN.md`

| Menit | Materi | Praktik |
|---|---|---|
| 0–10 | Gambaran sistem: alur warga → website → Google Form → Sheets → pegawai (Bagian 2.1) | — |
| 10–30 | Membaca rekap laporan, mengisi Status, Petugas, Tanggal selesai, Catatan; membaca tab Ringkasan (K13) | Pegawai mengisi tindak lanjut pada 2 laporan percobaan |
| 30–50 | Mengubah jadwal (di Sheets bila F17; di file bila tidak) | **Tugas penerimaan:** pegawai mengubah satu jadwal sendiri dan memeriksa hasilnya di website |
| 50–70 | Mengubah titik di My Maps (nama layer, deskripsi `Alamat:` dan `Jam buka:`) | **Tugas penerimaan:** pegawai mengubah satu titik peta sendiri dan memeriksa daftar lokasi |
| 70–80 | Akun: siapa memegang apa, mengganti password, bila terjadi masalah | Ganti password akun percobaan |
| 80–90 | Tanya jawab dan pengisian lembar umpan balik | Catat hasil di berita acara/laporan |

Catat waktu dan keberhasilan tiap tugas penerimaan sebagai bukti untuk "Kemudahan perawatan" dan sasaran di Bagian 1.3.

### 23.2 Kerangka `docs/PANDUAN-PENGELOLAAN.md`

1. Mengenal sistem (gambar alur sederhana).
2. Akun dan akses: tabel akun, siapa pemilik, cara mengganti password.
3. Membaca dan menindaklanjuti laporan (kolom, nilai Status, tab Ringkasan, nomor laporan).
4. Mengubah jadwal angkut (langkah bergambar), termasuk aturan penulisan kolom `hari`, `jam`, `titik_kumpul`.
5. Mengubah titik peta di My Maps (layer, deskripsi, ikon, legenda, K15) dan memastikan peta tetap publik.
6. Mengubah teks sederhana di website (hanya jika ditugaskan; jika tidak, hubungi pengembang).
7. Pemecahan masalah umum: jadwal tidak berubah (tunggu ≤ 5 menit, periksa nama kolom), peta tidak muncul (periksa status berbagi), notifikasi email tidak masuk (periksa folder spam dan pemicu).
8. Kontak bantuan pengembang pasca-serah terima `[kontak tim]`.

---

## 24. [TAMBAHAN KREATIF] Glosarium

| Istilah | Arti |
|---|---|
| **DLH** | Dinas Lingkungan Hidup |
| **TPS** | Tempat Pembuangan Sementara |
| **TPS3R** | Tempat pengolahan sampah dengan prinsip Reduce, Reuse, Recycle (kurangi, gunakan ulang, daur ulang) |
| **Bank sampah** | Tempat menabung sampah yang sudah dipilah untuk didaur ulang atau dijual |
| **B3** | Bahan berbahaya dan beracun |
| **3R** | Reduce, Reuse, Recycle |
| **Lembang** | Sebutan satuan pemerintahan setingkat desa di Tana Toraja (nama kolom wilayah bisa memakai Kelurahan/Lembang sesuai data mitra) |
| **UU PDP** | Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi |
| **Renstra** | Rencana Strategis, dokumen resmi dinas yang memuat visi dan misi |
| **WITA** | Waktu Indonesia Tengah (zona waktu Tana Toraja) |
| **Berita acara serah terima** | Dokumen tanda tangan mitra bahwa website sudah diserahkan |
| **ISR** | Incremental Static Regeneration (Next.js): halaman dibuat statis lalu diperbarui berkala |
| **KML** | Format data peta Google yang dipakai backend untuk membaca titik dari My Maps |
| **BFF** | Backend tipis yang melayani kebutuhan frontend |
| **Lighthouse** | Alat uji kecepatan, aksesibilitas, dan SEO bawaan Chrome |
| **WebP** | Format gambar ringan untuk web |
| **Placeholder** | Teks tempat kosong berkurung siku yang harus nol saat serah terima |

---

## 25. Riwayat dokumen

| Versi | Perubahan |
|---|---|
| 1.0 | PRD awal: semua isi dokumen sumber (F01–F24, non-fungsional, UI/UX, uji pengguna, bahan mitra, perangkat, kriteria selesai) + keputusan teknis NestJS/Next.js/Tailwind |
| 1.1 | Menambahkan konteks proyek DLH, latar belakang dan indikator keberhasilan (1.2–1.3), fitur nilai tambah K01–K15 (7.4), bank konten siap pakai (21–22), pelatihan pegawai (23), dan glosarium (24) |
| 1.2 | Penyederhanaan arsitektur teknis dari monorepo Next.js + NestJS menjadi Next.js Full-Stack (App Router + Route Handlers). Menghilangkan ketergantungan NestJS terpisah demi efisiensi ukuran proyek, eliminasi cold start pada paket hosting gratis, dan kemudahan deployment satu pintu |
