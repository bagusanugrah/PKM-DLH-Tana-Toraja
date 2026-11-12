export interface PengumumanItem {
  tanggal: string;
  judul: string;
  isi: string;
}

export interface AnnouncementsResponse {
  data: PengumumanItem[];
  enabled: boolean;
}
