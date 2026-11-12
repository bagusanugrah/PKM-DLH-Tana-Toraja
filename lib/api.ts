import { fetchSchedules, SchedulesResponse, JadwalItem } from './schedules';
import { fetchLocations, LocationsResponse, LokasiItem, JenisLokasi } from './locations';
import { fetchAnnouncements, AnnouncementsResponse, PengumumanItem } from './announcements';

export type { SchedulesResponse, JadwalItem, LocationsResponse, LokasiItem, JenisLokasi, AnnouncementsResponse, PengumumanItem };

export async function getSchedules(kecamatan?: string): Promise<SchedulesResponse> {
  return fetchSchedules(kecamatan);
}

export async function getLocations(jenis?: string): Promise<LocationsResponse> {
  return fetchLocations(jenis);
}

export async function getAnnouncements(): Promise<AnnouncementsResponse> {
  return fetchAnnouncements();
}
