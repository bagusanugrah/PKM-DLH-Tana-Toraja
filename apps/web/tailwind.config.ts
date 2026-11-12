import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1F6B4A',
          dark: '#164E36',
          darker: '#0F3525',
          light: '#2B8A61',
          lighter: '#E8F5EE',
          surface: '#F4FAF7',
        },
        toraja: {
          red: '#8B1E1E',
          gold: '#C98A1E',
          dark: '#1C1917',
        },
      },
      minHeight: {
        '11': '2.75rem', // 44px minimum touch target
      },
      minWidth: {
        '11': '2.75rem',
      },
    },
  },
  plugins: [],
};

export default config;
