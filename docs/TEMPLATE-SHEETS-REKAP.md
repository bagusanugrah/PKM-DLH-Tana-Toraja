# Panduan & Template Google Sheets Rekapitulasi Pengaduan DLH Tana Toraja

Dokumen ini berisi struktur kolom, rumus otomatis, dan aturan konfigurasi Google Sheets untuk rekapitulasi pengaduan warga Dinas Lingkungan Hidup Kabupaten Tana Toraja (Fitur F22, F24, K13, K14).

---

## 1. Struktur Kolom Tab Respons ("Form Responses 1")

Pastikan tab respons dari Google Form memiliki struktur kolom berikut (Kolom A–G otomatis dari Google Form, Kolom H–M disiapkan untuk pegawai DLH):

| Kolom | Nama Kolom | Jenis Isian | Keterangan / Sumber |
|---|---|---|---|
| **A** | Timestamp | Otomatis | Tanggal & waktu pengiriman laporan |
| **B** | Nama Pelapor | Otomatis | Nama warga pelapor |
| **C** | Nomor HP | Otomatis | Nomor telepon aktif pelapor |
| **D** | Jenis Masalah | Otomatis | Kategori masalah lingkungan |
| **E** | Lokasi | Otomatis | Alamat / patokan lokasi kejadian |
| **F** | Uraian Masalah | Otomatis | Rincian masalah |
| **G** | Persetujuan Data Pribadi | Otomatis | Pernyataan persetujuan UU No. 27/2022 |
| **H** | **Status** | Dropdown Manual | Pilihan: `Baru`, `Diproses`, `Selesai`, `Ditolak/Tidak ditindaklanjuti` (Default: `Baru`) |
| **I** | **Petugas** | Teks Manual | Nama petugas / tim lapangan yang menangani |
| **J** | **Tanggal Selesai** | Tanggal Manual | Tanggal penyelesaian tindak lanjut |
| **K** | **Catatan** | Teks Manual | Keterangan tindakan yang dilakukan petugas |
| **L** | **No. Laporan** | Rumus Otomatis | Nomor referensi unik (K14), mis. `DLH-202611-0001` |
| **M** | **Bulan** | Rumus Otomatis | Kolom bantu statistik rekapitulasi bulanan (K13) |

---

## 2. Rumus Otomatis Tab Respons

Salin rumus berikut pada baris kedua:

### Kolom L (Sel L2) — Nomor Laporan Otomatis (K14):
```excel
=ARRAYFORMULA(IF(A2:A="","","DLH-"&TEXT(A2:A,"yyyymm")&"-"&TEXT(ROW(A2:A)-1,"0000")))
```

### Kolom M (Sel M2) — Kolom Bantu Bulan (K13):
```excel
=ARRAYFORMULA(IF(A2:A="","",TEXT(A2:A,"yyyy-mm")))
```

---

## 3. Struktur & Rumus Tab "Ringkasan" (K13)

Buat lembar kerja baru bernama **Ringkasan** untuk memantau performa layanan tanpa perhitungan manual:

| Sel | Keterangan / Label | Rumus Google Sheets |
|---|---|---|
| **A1:B1** | Total Laporan Masuk | `=COUNTA('Form Responses 1'!A2:A)` |
| **A2:B2** | Batas Hari Terlambat | `7` *(angka batas peringatan dalam hari)* |
| **A4:B4** | Laporan Berstatus "Baru" | `=COUNTIF('Form Responses 1'!H2:H,"Baru")` |
| **A5:B5** | Laporan Berstatus "Diproses" | `=COUNTIF('Form Responses 1'!H2:H,"Diproses")` |
| **A6:B6** | Laporan Berstatus "Selesai" | `=COUNTIF('Form Responses 1'!H2:H,"Selesai")` |
| **A7:B7** | Laporan "Ditolak / Tidak Ditindaklanjuti" | `=COUNTIF('Form Responses 1'!H2:H,"Ditolak/Tidak ditindaklanjuti")` |
| **A9:B9** | Rata-rata Lama Penyelesaian (Hari) | `=IFERROR(AVERAGE(FILTER(ARRAYFORMULA('Form Responses 1'!J2:J-INT('Form Responses 1'!A2:A)),'Form Responses 1'!H2:H="Selesai",'Form Responses 1'!J2:J<>"")),"-")` |

### Rekap Tabel Kategori Masalah (Sel D1):
```excel
=QUERY('Form Responses 1'!D2:D,"select D, count(D) where D is not null group by D label count(D) 'Jumlah Laporan'",0)
```

### Rekap Tabel Tren Bulanan (Sel G1):
```excel
=QUERY('Form Responses 1'!M2:M,"select M, count(M) where M is not null group by M order by M label count(M) 'Jumlah Laporan'",0)
```

---

## 4. Pemformatan Bersyarat (Conditional Formatting)

1. **Pewarnaan Status (Kolom H):**
   - Teks sama persis `Baru` -> Latar Kuning muda (`#FEF3C7`), Teks `#92400E`
   - Teks sama persis `Diproses` -> Latar Biru muda (`#DBEAFE`), Teks `#1E40AF`
   - Teks sama persis `Selesai` -> Latar Hijau muda (`#D1FAE5`), Teks `#065F46`
   - Teks sama persis `Ditolak/Tidak ditindaklanjuti` -> Latar Abu-abu (`#F3F4F6`), Teks `#374151`
2. **Peringatan Laporan Terlambat (Rentang A2:M):**
   - Format sel jika: **Rumus khusus adalah (Custom formula is)**
   - Rumus: `=AND($H2="Baru",TODAY()-INT($A2)>INDIRECT("Ringkasan!B2"))`
   - Gaya: Latar Merah Muda Terang (`#FEE2E2`) dengan teks merah tua (`#991B1B`).

---

## 5. Keamanan Spreadsheet Rekap

- **PENTING:** Spreadsheet ini **HANYA** boleh dibagikan kepada email resmi pegawai dinas yang bertugas menangani aduan.
- **DILARANG KERAS** menyetel akses ke *"Siapa saja yang memiliki link"* atau *"Publikasikan ke web"*.
- Lindungi rentang Kolom A:G agar data asli dari pengadu tidak dapat diubah tanpa sengaja.
