import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8ef',
          100: '#ffedd3',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(15, 23, 42, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
