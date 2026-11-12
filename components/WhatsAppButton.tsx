import React from 'react';

export function WhatsAppIcon({ className = 'w-5 h-5 text-current' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = 'Halo DLH Tana Toraja, saya ingin menyampaikan laporan lingkungan hidup.',
  label = 'Kirim Foto lewat WhatsApp',
  className = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm min-h-11 shadow-sm transition-colors',
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} ke nomor ${phoneNumber}`}
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
}
