# Panduan Pengelolaan Website Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja

Panduan ini disusun untuk pegawai Dinas Lingkungan Hidup (DLH) Kabupaten Tana Toraja agar dapat mengelola data jadwal angkut sampah, titik lokasi peta, dan tindak lanjut pengaduan warga **tanpa perlu menulis kode pemrograman**.

---

## 1. Mengenal Gambaran Sistem

Sistem website DLH Tana Toraja dirancang sederhana dan hemat biaya dengan alur sebagai berikut:

```
Warga (HP/Komputer)
   │
   ├─► Membaca Informasi (Jadwal & Lokasi TPS/Bank Sampah)
   │     ▲
   │     └─ Diambil otomatis dari Google Sheets (Jadwal) & Google My Maps (Peta)
   │
   └─► Mengirim Pengaduan Lingkungan (Google Form tertanam)
         │
         ▼
       Google Sheets Rekap Dinas (Privat)
         │
         ▼
       Pegawai DLH menerima notifikasi email & mengisi tindak lanjut (Status/Petugas/Catatan)
```

Keunggulan sistem ini:
1. Pegawai cukup memakai **Google Sheets** dan **Google My Maps** yang sudah biasa digunakan.
2. Tidak ada database server rumit yang perlu dirawat.
3. Data pelapor aman di akun resmi Google dinas dan tidak disimpan di server pihak ketiga.

---

## 2. Akun dan Akses

Pengelolaan website DLH menggunakan satu Akun Google Resmi Dinas.

| Akun / Layanan | Kegunaan | Pemegang Akses | Tindakan Keamanan |
|---|---|---|---|
| **Google Resmi DLH** (`dlh.tanatoraja@gmail.com` / akun dinas) | Mengelola Google Form, Google Sheets Rekap, Google Sheets Jadwal, dan Google My Maps | Admin / Tim Pengelola DLH | Wajib aktifkan Verifikasi 2 Langkah (2FA) & ganti kata sandi secara berkala |
| **Hosting Website** | Tempat website berjalan | Tim Teknis / Diskominfo | Akses deployment otomatis dari GitHub |

### Cara Mengganti Kata Sandi Akun Google:
1. Masuk ke [myaccount.google.com](https://myaccount.google.com) dengan akun dinas.
2. Pilih tab **Keamanan (Security)**.
3. Pada bagian "Cara Anda login ke Google", pilih **Sandi**.
4. Masukkan sandi baru yang kuat (kombinasi huruf besar, kecil, angka, dan simbol), lalu simpan.

---

## 3. Menindaklanjuti Laporan Pengaduan Warga

Setiap kali warga mengisi formulir di website, laporan langsung masuk ke **Google Sheets Rekap Laporan**.

### Kolom di Spreadsheet Rekap:
- **Kolom A–G (Otomatis dari Form):**
  - Timestamp (Waktu Lapor)
  - Nama Pelapor
  - Nomor HP
  - Jenis Masalah
  - Lokasi
  - Uraian Masalah
  - Persetujuan Data Pribadi
- **Kolom H–K (Diisi Pegawai DLH):**
  - **H — Status:** Pilih dari dropdown:
    - `Baru` (Laporan baru masuk, belum ditindaklanjuti)
    - `Diproses` (Petugas sedang menuju lokasi / memproses)
    - `Selesai` (Penanganan sampah/masalah selesai)
    - `Ditolak/Tidak ditindaklanjuti` (Bukan wewenang DLH / laporan tidak valid)
  - **I — Petugas:** Nama pegawai atau tim lapangan yang menangani (mis. *Tim UPT Kebersihan Makale*).
  - **J — Tanggal Selesai:** Tanggal penanganan selesai (format: YYYY-MM-DD atau DD/MM/YYYY).
  - **K — Catatan:** Keterangan penanganan (mis. *Sampah diangkut truk armada 02 pukul 10.30 WITA*).
- **Kolom L (No. Laporan, Otomatis):**
  - Berisi nomor referensi otomatis seperti `DLH-202611-0001` untuk rujukan koordinasi lapangan atau WhatsApp warga.

### Memantau Statistik di Tab "Ringkasan":
Tab **Ringkasan** menyajikan grafik dan rekap otomatis:
- Jumlah total laporan yang masuk.
- Rekap berdasarkan status (`Baru`, `Diproses`, `Selesai`).
- Rekap jenis masalah terbanyak.
- Laporan berstatus `Baru` yang melebihi batas 7 hari akan **berwarna merah muda otomatis** sebagai pengingat prioritas tindak lanjut.

---

## 4. Mengubah dan Menambah Jadwal Angkut Sampah

Jadwal angkut sampah pada website bersumber dari tab **Jadwal** di Google Sheets dinas.

### Langkah-langkah Memperbarui Jadwal:
1. Buka spreadsheet **Jadwal Angkut Sampah DLH**.
2. Pastikan kolom memiliki susunan judul baris pertama:
   `kecamatan` | `wilayah` | `hari` | `jam` | `titik_kumpul`
3. Edit atau tambahkan baris baru sesuai jadwal dinas:
   - **kecamatan:** Nama kecamatan (mis. *Makale*, *Rantetayo*, *Mengkendek*).
   - **wilayah:** Kelurahan, Lembang, atau jalan (mis. *Kelurahan Bombongan*, *Lembang Gandangbatu*).
   - **hari:** Hari pengangkutan dalam Bahasa Indonesia (mis. *Senin & Kamis*, *Selasa, Jumat*, *Setiap Hari*). Penanda "Hari ini" di website akan mendeteksi nama hari secara otomatis.
   - **jam:** Rentang jam pengambilan sampah (mis. *06.00–08.30 WITA*).
   - **titik_kumpul:** Lokasi pengumpulan (mis. *Depan ruko Jalan Pongtiku*, *Bak penampungan depan posyandu*).
4. Setelah mengedit di Google Sheets, perubahan akan muncul otomatis di website maksimal dalam **5 menit** (karena proses pembaruan berkala cache).

### Memastikan Spreadsheet Sudah "Publish to web" (Khusus Tab Jadwal):
1. Klik menu **File** > **Bagikan (Share)** > **Publikasikan ke web (Publish to web)**.
2. Pada pilihan lembar, pilih tab **Jadwal** (JANGAN pilih seluruh dokumen / jangan pilih tab laporan pengaduan!).
3. Pilih format **Nilai yang dipisahkan koma (.csv)**.
4. Klik **Publikasikan**.

---

## 5. Mengubah Titik TPS dan Bank Sampah di Google My Maps

Daftar lokasi dan peta interaktif pada website terhubung langsung dengan **Google My Maps DLH Tana Toraja**.

### Aturan dan Format Layer Peta (Sangat Penting):
Agar website dapat membaca dan mengelompokkan lokasi dengan benar, buat 3 layer dengan nama tepat berikut:
1. `TPS` (Tempat Pembuangan Sementara)
2. `TPS3R` (Tempat Pengolahan Sampah 3R)
3. `Bank Sampah` (Bank Sampah Unit / Induk)

*(Catatan: Kantor DLH dapat diletakkan di layer terpisah bernama `Kantor DLH`)*.

### Format Keterangan Titik (Placemark):
Setiap titik yang ditambahkan di My Maps harus mengisi judul dan deskripsi dengan format berikut:
- **Judul Titik:** Nama Lokasi (contoh: *TPS Pasar Sentral Makale*, *Bank Sampah Sejahtera Pantan*)
- **Deskripsi Titik:** Tulis persis 2 baris:
  ```
  Alamat: Jl. Pasar Baru No. 12, Makale
  Jam buka: 06.00–18.00 WITA
  ```

### Memastikan Peta Dapat Dilihat Publik:
1. Di Google My Maps, klik tombol **Bagikan (Share)**.
2. Pastikan izin akses diatur ke **"Siapa saja yang memiliki link dapat melihat" (Anyone with the link can view)**.
3. Jika status masih privat, peta tidak akan muncul di website.

---

## 6. Pemecahan Masalah Umum (Troubleshooting)

| Masalah | Kemungkinan Penyebab | Cara Mengatasi |
|---|---|---|
| Jadwal di website belum berubah setelah diedit di Sheets | Cache website masih menyimpan versi sebelumnya (berlaku 5 menit) | Tunggu 5 menit, lalu muat ulang (*refresh*) halaman Informasi di browser. Periksa juga apakah judul kolom di Sheets berubah secara tidak sengaja. |
| Peta atau daftar lokasi tidak muncul | Pengaturan berbagi My Maps berubah menjadi privat atau ID peta salah | Periksa tombol Bagikan di Google My Maps, pastikan disetel ke "Siapa saja yang memiliki link dapat melihat". |
| Email notifikasi laporan baru tidak masuk | Notifikasi belum diaktifkan di Google Form/Sheets atau masuk ke folder Spam | Buka Google Sheets > Alat (Tools) > Aturan Notifikasi (Notification rules) > Centang "Pengguna mengirim formulir", pilih kirim email berkala/langsung. Cek folder Spam di Gmail. |
| Tampilan website tampak bergeser di HP | Teks pada tabel terlalu panjang tanpa spasi | Periksa teks titik kumpul di jadwal, hindari penulisan kata bersambung tanpa spasi. |

---

## 7. Bantuan dan Kontak Dukungan Teknis

Jika terdapat kendala teknis lebih lanjut yang tidak tercakup dalam panduan ini, hubungi:
- **Dinas Komunikasi dan Informatika (Diskominfo) Kabupaten Tana Toraja**
- **Tim Pengembang PKM DLH Tana Toraja**
  - Email Dukungan: `dlh@tanatorajakab.go.id` / kontak perwakilan tim pengembang.
