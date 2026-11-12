'use client';

import { useState, useEffect } from 'react';

export function TextSizeControl() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dlh_text_size');
      if (saved === 'large') {
        setIsLarge(true);
        document.documentElement.classList.add('text-large');
      }
    } catch {
      // LocalStorage might be disabled in private mode
    }
  }, []);

  const toggleSize = () => {
    const nextState = !isLarge;
    setIsLarge(nextState);
    try {
      if (nextState) {
        document.documentElement.classList.add('text-large');
        localStorage.setItem('dlh_text_size', 'large');
      } else {
        document.documentElement.classList.remove('text-large');
        localStorage.setItem('dlh_text_size', 'normal');
      }
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSize}
      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 min-h-11 min-w-11 focus-visible:ring-2 focus-visible:ring-brand transition-colors"
      aria-label={isLarge ? 'Kembalikan ukuran teks normal' : 'Perbesar ukuran teks'}
      title={isLarge ? 'Ukuran Teks Normal (100%)' : 'Ukuran Teks Besar (125%)'}
    >
      <span className="font-bold text-base leading-none">A</span>
      <span className="text-xs leading-none">{isLarge ? 'Normal' : 'A+'}</span>
    </button>
  );
}
