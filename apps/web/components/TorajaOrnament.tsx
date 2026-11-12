import React from 'react';

interface TorajaOrnamentProps {
  className?: string;
}

export function TorajaOrnament({ className = 'h-3 w-full text-brand/20' }: TorajaOrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <pattern id="toraja-paqsura" width="40" height="16" patternUnits="userSpaceOnUse">
        {/* Stylized Toraja geometric motif (Pa'ssura inspired) */}
        <path
          d="M0 8 L10 0 L20 8 L10 16 Z M20 8 L30 0 L40 8 L30 16 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="10" cy="8" r="2" fill="currentColor" />
        <circle cx="30" cy="8" r="2" fill="currentColor" />
      </pattern>
      <rect width="100%" height="16" fill="url(#toraja-paqsura)" />
    </svg>
  );
}

export function TongkonanIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Curved traditional Toraja roof silhouette */}
      <path d="M2 13 C 6 6, 18 6, 22 13" />
      <path d="M4 11 L4 20 L20 20 L20 11" />
      <line x1="12" y1="6" x2="12" y2="20" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  );
}
