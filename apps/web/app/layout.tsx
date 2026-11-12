import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja',
    template: '%s | DLH Kabupaten Tana Toraja',
  },
  description:
    'Situs resmi Dinas Lingkungan Hidup Kabupaten Tana Toraja: jadwal angkut sampah, lokasi TPS, layanan, dan pengaduan lingkungan.',
  keywords: [
    'DLH Tana Toraja',
    'Dinas Lingkungan Hidup Tana Toraja',
    'jadwal sampah Makale',
    'TPS Tana Toraja',
    'pengaduan lingkungan Toraja',
    'bank sampah Tana Toraja',
  ],
  authors: [{ name: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja' }],
  creator: 'Pemerintah Kabupaten Tana Toraja',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja',
    title: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja',
    description:
      'Situs resmi Dinas Lingkungan Hidup Kabupaten Tana Toraja: jadwal angkut sampah, lokasi TPS, layanan, dan pengaduan lingkungan.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
