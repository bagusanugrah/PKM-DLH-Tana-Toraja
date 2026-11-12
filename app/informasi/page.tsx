import { Metadata } from 'next';
import { ScheduleTable } from '../../components/ScheduleTable';
import { MapEmbed } from '../../components/MapEmbed';
import { LocationList } from '../../components/LocationList';
import { getSchedules, getLocations } from '../../lib/api';

export const metadata: Metadata = {
  title: 'Jadwal Angkut Sampah dan Lokasi TPS',
  description:
    'Jadwal angkut sampah per kecamatan serta peta TPS, TPS3R, dan bank sampah di Kabupaten Tana Toraja.',
};

export const revalidate = 300; // ISR 5 minutes

export default async function InformasiPage() {
  const [schedulesRes, locationsRes] = await Promise.all([
    getSchedules(),
    getLocations(),
  ]);

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-5">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            Informasi Persampahan &amp; Kebersihan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
            Jadwal Angkut Sampah &amp; Lokasi Pembuangan
          </h1>
          <p className="text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
            Ketahui hari dan jam pengangkutan sampah di kecamatan Anda, temukan titik Tempat Pembuangan Sementara (TPS), TPS3R, dan Bank Sampah terdekat dengan petunjuk arah Google Maps.
          </p>
        </div>

        {/* F13, F14, K03, K07, K08: Schedule Table */}
        <ScheduleTable
          initialSchedules={schedulesRes.data}
          stale={schedulesRes.stale}
        />

        <hr className="border-gray-200" />

        {/* F15: Google My Maps Embed */}
        <MapEmbed />

        {/* F16, K07, K15: Location List with Directions */}
        <LocationList
          locations={locationsRes.data}
          stale={locationsRes.stale}
        />
      </div>
    </div>
  );
}
