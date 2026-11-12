'use client';

import { useState, useId } from 'react';
import { ChevronDown, Download, CheckCircle, Clock, MapPin, DollarSign, ListOrdered } from 'lucide-react';
import { Layanan } from '../content/layanan';
import { FAQItem } from '../content/faq';

interface ServiceAccordionProps {
  items: Layanan[];
}

export function ServiceAccordion({ items }: ServiceAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-4">
      {items.map((layanan) => {
        const isOpen = openIds.includes(layanan.id);
        const contentId = `service-content-${layanan.id}`;
        const headerId = `service-header-${layanan.id}`;

        return (
          <div
            key={layanan.id}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-colors hover:border-brand/40"
          >
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(layanan.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left min-h-11 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <div className="pr-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand">
                  {layanan.nama}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {layanan.deskripsi}
                </p>
              </div>
              <div className={`p-2 rounded-full bg-gray-100 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-brand text-white' : 'text-gray-600'}`}>
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </div>
            </button>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 pb-6 sm:px-6 border-t border-gray-100 pt-5 space-y-5"
              >
                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand flex-shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-gray-900 block text-xs">Biaya:</span>
                      <span className="text-gray-700">{layanan.biaya}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand flex-shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-gray-900 block text-xs">Lama Proses:</span>
                      <span className="text-gray-700">{layanan.lamaProses}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand flex-shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-gray-900 block text-xs">Tempat Pengajuan:</span>
                      <span className="text-gray-700">{layanan.tempat}</span>
                    </div>
                  </div>
                </div>

                {/* Syarat */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand" aria-hidden="true" />
                    <span>Persyaratan Berkas:</span>
                  </h4>
                  <ul className="space-y-1.5 text-sm text-gray-700 list-disc list-inside">
                    {layanan.syarat.map((s, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alur */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-brand" aria-hidden="true" />
                    <span>Alur Pengajuan:</span>
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    {layanan.alur.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* F12: Unduh Formulir if available */}
                {layanan.formulirUrl && (
                  <div className="pt-2">
                    <a
                      href={layanan.formulirUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-light text-white font-semibold text-sm min-h-11 transition-colors shadow-sm"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>{layanan.formulirNama || 'Unduh Formulir Layanan'}</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const contentId = `faq-content-${item.id}`;
        const headerId = `faq-header-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-colors hover:border-brand/40"
          >
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left min-h-11 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                {item.pertanyaan}
              </span>
              <div className={`p-1.5 rounded-full bg-gray-100 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-brand text-white' : 'text-gray-600'}`}>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </div>
            </button>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className="px-4 pb-5 sm:px-5 border-t border-gray-100 pt-3 text-sm sm:text-base text-gray-700 leading-relaxed"
              >
                {item.jawaban}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
