import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        input: 'var(--color-input)',
        warning: 'var(--color-warning)',
        border: 'var(--color-border)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        brand: {
          50: '#eef2f1',
          100: '#dbe5e2',
          500: '#6e8884',
          600: 'var(--color-primary)',
          700: '#3a4947',
        },
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px',
        xl2: '1.25rem',
      },
      spacing: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
};

export default config;
