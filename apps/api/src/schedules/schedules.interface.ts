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
