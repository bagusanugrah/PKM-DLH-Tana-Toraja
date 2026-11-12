import { XMLParser } from 'fast-xml-parser';
import lokasiFallback from '../content/lokasi.fallback.json';

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

export async function fetchLocations(jenisFilter?: string): Promise<LocationsResponse> {
  const myMapsId = process.env.MYMAPS_ID || process.env.NEXT_PUBLIC_MYMAPS_ID;

  if (myMapsId && myMapsId !== '1A2B3C4D5E') {
    const kmlUrl = `https://www.google.com/maps/d/kml?mid=${myMapsId}&forcekml=1`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(kmlUrl, {
        next: { revalidate: 300 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const kmlText = await res.text();
        const items = parseKml(kmlText);

        if (items.length > 0) {
          return filterLocations(
            {
              data: items,
              source: 'mymaps',
              updatedAt: new Date().toISOString(),
              stale: false,
            },
            jenisFilter,
          );
        }
      }
    } catch (err) {
      console.warn('Gagal memuat lokasi dari Google My Maps, menggunakan fallback.', err);
    }
  }

  return filterLocations(
    {
      data: lokasiFallback as LokasiItem[],
      source: 'file',
      updatedAt: new Date().toISOString(),
      stale: false,
    },
    jenisFilter,
  );
}

function parseKml(kmlText: string): LokasiItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
  });

  const parsed = parser.parse(kmlText);
  const document = parsed?.kml?.Document;
  if (!document) return [];

  const folders = Array.isArray(document.Folder)
    ? document.Folder
    : document.Folder
      ? [document.Folder]
      : [];

  const items: LokasiItem[] = [];

  for (const folder of folders) {
    const folderName = (folder.name || '').trim();
    let jenis: JenisLokasi = 'TPS';
    if (/tps3r/i.test(folderName)) {
      jenis = 'TPS3R';
    } else if (/bank\s*sampah/i.test(folderName)) {
      jenis = 'Bank Sampah';
    } else if (/tps/i.test(folderName)) {
      jenis = 'TPS';
    } else {
      if (/kantor/i.test(folderName)) continue;
    }

    const placemarks = Array.isArray(folder.Placemark)
      ? folder.Placemark
      : folder.Placemark
        ? [folder.Placemark]
        : [];

    for (const pm of placemarks) {
      const nama = (pm.name || '').trim();
      if (!nama) continue;

      let rawDesc = (pm.description || '').toString();
      rawDesc = rawDesc.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, '');

      let alamat = '';
      let jamBuka = '';

      const lines = rawDesc.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (/^alamat\s*:/i.test(trimmed)) {
          alamat = trimmed.replace(/^alamat\s*:/i, '').trim();
        } else if (/^jam\s*buka\s*:/i.test(trimmed)) {
          jamBuka = trimmed.replace(/^jam\s*buka\s*:/i, '').trim();
        }
      }

      if (!alamat && lines.length > 0) alamat = lines[0].trim();
      if (!jamBuka && lines.length > 1) jamBuka = lines[1].trim();

      const coordStr = pm.Point?.coordinates || '';
      const parts = coordStr.split(',');
      if (parts.length >= 2) {
        const lng = parseFloat(parts[0]);
        const lat = parseFloat(parts[1]);

        if (!isNaN(lat) && !isNaN(lng)) {
          items.push({
            nama,
            jenis,
            alamat: alamat || 'Kabupaten Tana Toraja',
            jamBuka: jamBuka || '06.00–18.00 WITA',
            lat,
            lng,
          });
        }
      }
    }
  }

  return items;
}

function filterLocations(response: LocationsResponse, filter?: string): LocationsResponse {
  if (!filter) return response;
  const q = filter.toLowerCase().trim();
  const filtered = response.data.filter((item) => item.jenis.toLowerCase() === q);
  return {
    ...response,
    data: filtered,
  };
}
