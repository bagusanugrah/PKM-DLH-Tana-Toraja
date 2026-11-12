import Papa from 'papaparse';
import jadwalFallback from '../content/jadwal.fallback.json';

export interface JadwalItem {
  kecamatan: string;
  wilayah: string;
  hari: string;
  jam: string;
  titikKumpul: string;
}

export interface SchedulesResponse {
  data: JadwalItem[];
  source: 'sheets' | 'file';
  updatedAt: string;
  stale: boolean;
}

export async function fetchSchedules(kecamatanFilter?: string): Promise<SchedulesResponse> {
  const source = (process.env.SCHEDULE_SOURCE || 'file').toLowerCase();
  const csvUrl = process.env.SHEETS_SCHEDULE_CSV_URL;

  if (source === 'sheets' && csvUrl) {
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
          transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, '_'),
        });

        const items: JadwalItem[] = [];
        for (const row of parsed.data as any[]) {
          const kecamatan = (row.kecamatan || '').trim();
          const wilayah = (row.wilayah || row.kelurahan || row.lembang || '').trim();
          const hari = (row.hari || '').trim();
          const jam = (row.jam || '').trim();
          const titikKumpul = (row.titik_kumpul || row.titikkumpul || '').trim();

          if (kecamatan && hari) {
            items.push({
              kecamatan,
              wilayah: wilayah || '-',
              hari,
              jam: jam || '-',
              titikKumpul: titikKumpul || '-',
            });
          }
        }

        if (items.length > 0) {
          return filterSchedules(
            {
              data: items,
              source: 'sheets',
              updatedAt: new Date().toISOString(),
              stale: false,
            },
            kecamatanFilter,
          );
        }
      }
    } catch (err) {
      console.warn('Gagal memuat jadwal dari Google Sheets, menggunakan fallback.', err);
    }
  }

  // Fallback to static JSON
  return filterSchedules(
    {
      data: jadwalFallback as JadwalItem[],
      source: 'file',
      updatedAt: new Date().toISOString(),
      stale: source === 'sheets',
    },
    kecamatanFilter,
  );
}

function filterSchedules(response: SchedulesResponse, filter?: string): SchedulesResponse {
  if (!filter) return response;
  const q = filter.toLowerCase().trim();
  const filtered = response.data.filter(
    (item) =>
      item.kecamatan.toLowerCase().includes(q) ||
      item.wilayah.toLowerCase().includes(q),
  );

  return {
    ...response,
    data: filtered,
  };
}
