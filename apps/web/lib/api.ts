import jadwalFallback from '../content/jadwal.fallback.json';
import lokasiFallback from '../content/lokasi.fallback.json';

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
  tanggal: string;
  judul: string;
  isi: string;
}

export interface AnnouncementsResponse {
  data: PengumumanItem[];
  enabled: boolean;
}

const getApiBaseUrl = (): string => {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL.replace(/\/+$/, '');
  }
  return 'http://localhost:3001';
};

export async function getSchedules(kecamatan?: string): Promise<SchedulesResponse> {
  const baseUrl = getApiBaseUrl();
  const query = kecamatan ? `?kecamatan=${encodeURIComponent(kecamatan)}` : '';
  const url = `${baseUrl}/api/schedules${query}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to static local file if API call fails
  }

  let data = jadwalFallback as JadwalItem[];
  if (kecamatan) {
    const filter = kecamatan.toLowerCase().trim();
    data = data.filter(
      (item) =>
        item.kecamatan.toLowerCase().includes(filter) ||
        item.wilayah.toLowerCase().includes(filter),
    );
  }

  return {
    data,
    source: 'file',
    updatedAt: new Date().toISOString(),
    stale: true,
  };
}

export async function getLocations(jenis?: string): Promise<LocationsResponse> {
  const baseUrl = getApiBaseUrl();
  const query = jenis ? `?jenis=${encodeURIComponent(jenis)}` : '';
  const url = `${baseUrl}/api/locations${query}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to static local file if API call fails
  }

  let data = lokasiFallback as LokasiItem[];
  if (jenis) {
    const filter = jenis.toLowerCase().trim();
    data = data.filter((item) => item.jenis.toLowerCase() === filter);
  }

  return {
    data,
    source: 'file',
    updatedAt: new Date().toISOString(),
    stale: true,
  };
}

export async function getAnnouncements(): Promise<AnnouncementsResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/announcements`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Return empty on failure
  }

  return {
    data: [],
    enabled: false,
  };
}
