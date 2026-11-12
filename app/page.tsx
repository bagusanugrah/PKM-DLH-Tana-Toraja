import { Banner } from '../components/Banner';
import { QuickCards } from '../components/QuickCards';
import { QuickStats } from '../components/QuickStats';
import { Announcements } from '../components/Announcements';
import { SortingGuide } from '../components/SortingGuide';
import { WasteChecker } from '../components/WasteChecker';
import { Tips3R } from '../components/Tips3R';
import { Steps } from '../components/Steps';
import { FAQAccordion } from '../components/Accordion';
import { getSchedules, getLocations, getAnnouncements } from '../lib/api';
import { daftarFAQ } from '../content/faq';

export const revalidate = 300; // ISR 5 minutes

export default async function HomePage() {
  const [schedulesRes, locationsRes, announcementsRes] = await Promise.all([
    getSchedules(),
    getLocations(),
    getAnnouncements(),
  ]);

  const schedules = schedulesRes.data || [];
  const locations = locationsRes.data || [];

  const tpsCount = locations.filter((l) => l.jenis === 'TPS').length;
  const tps3rCount = locations.filter((l) => l.jenis === 'TPS3R').length;
  const bankSampahCount = locations.filter((l) => l.jenis === 'Bank Sampah').length;

  const kecamatanSet = new Set(schedules.map((s) => s.kecamatan));
  const kecamatanCount = kecamatanSet.size;

  // Top 5 FAQs for Homepage (K02)
  const homeFaqs = daftarFAQ.slice(0, 5);

  return (
    <div>
      {/* F05: Hero Banner */}
      <Banner />

      {/* K06: Quick Stats (only renders if valid data exists) */}
      <QuickStats
        tpsCount={tpsCount}
        tps3rCount={tps3rCount}
        bankSampahCount={bankSampahCount}
        kecamatanCount={kecamatanCount}
      />

      {/* F06: 4 Quick Menu Cards */}
      <QuickCards />

      {/* F09: Announcements (only if active) */}
      {announcementsRes.enabled && announcementsRes.data.length > 0 && (
        <Announcements announcements={announcementsRes.data} />
      )}

      {/* F07: Sorting Guide */}
      <SortingGuide />

      {/* K04: Waste Checker */}
      <WasteChecker />

      {/* K05: 3R Tips */}
      <Tips3R />

      {/* F08: 3 Steps to Report */}
      <Steps />

      {/* K02: FAQ Top 5 Section */}
      <section className="py-12 bg-white border-t border-gray-200" aria-labelledby="faq-home-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <span>Bantuan &amp; Jawaban</span>
            </span>
            <h2 id="faq-home-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Pertanyaan yang Sering Diajukan Warga (FAQ)
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Jawaban ringkas seputar jadwal, lokasi, pemilahan sampah, dan pengaduan.
            </p>
          </div>

          <FAQAccordion items={homeFaqs} />
        </div>
      </section>
    </div>
  );
}
