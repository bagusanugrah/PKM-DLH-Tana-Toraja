import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja',
    short_name: 'DLH Tana Toraja',
    description: 'Situs resmi informasi jadwal sampah, peta TPS, layanan, dan pengaduan lingkungan hidup Kabupaten Tana Toraja.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1F6B4A',
    icons: [
      {
        src: '/images/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/images/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
