import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dlh.tanatorajakab.go.id';

  const routes = [
    '',
    '/profil',
    '/layanan',
    '/informasi',
    '/pengaduan',
    '/privasi',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/informasi' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/pengaduan' || route === '/informasi' ? 0.9 : 0.8,
  }));
}
