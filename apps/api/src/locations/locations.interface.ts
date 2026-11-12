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
