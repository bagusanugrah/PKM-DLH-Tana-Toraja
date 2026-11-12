import { Megaphone, Calendar } from 'lucide-react';
import { PengumumanItem } from '../lib/api';

interface AnnouncementsProps {
  announcements?: PengumumanItem[];
}

export function Announcements({ announcements = [] }: AnnouncementsProps) {
  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-amber-50 border-b border-amber-200" aria-label="Pengumuman Dinas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-amber-800" aria-hidden="true" />
          <h2 className="text-lg font-bold text-amber-950">
            Pengumuman Terkini DLH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-2">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{item.tanggal}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {item.judul}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.isi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
