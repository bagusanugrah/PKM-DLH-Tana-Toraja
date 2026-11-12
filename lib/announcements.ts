import Papa from 'papaparse';

export interface PengumumanItem {
  tanggal: string;
  judul: string;
  isi: string;
}

export interface AnnouncementsResponse {
  data: PengumumanItem[];
  enabled: boolean;
}

export async function fetchAnnouncements(): Promise<AnnouncementsResponse> {
  const enabled = process.env.ENABLE_ANNOUNCEMENTS === 'true';
  const csvUrl = process.env.SHEETS_ANNOUNCEMENTS_CSV_URL;

  if (!enabled || !csvUrl) {
    return { data: [], enabled };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(csvUrl, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const csvText = await res.text();
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase(),
      });

      const items: PengumumanItem[] = [];
      for (const row of parsed.data as any[]) {
        const tampilkan = (row.tampilkan || '').trim().toUpperCase();
        if (tampilkan === 'YA' || tampilkan === 'TRUE' || tampilkan === '1') {
          items.push({
            tanggal: (row.tanggal || '').trim(),
            judul: (row.judul || '').trim(),
            isi: (row.isi || '').trim(),
          });
        }
      }

      items.sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));
      return { data: items.slice(0, 3), enabled: true };
    }
  } catch (err) {
    console.warn('Gagal memuat pengumuman:', err);
  }

  return { data: [], enabled: true };
}
