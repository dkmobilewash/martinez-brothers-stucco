import type { Config } from 'tailwindcss';

// Warm desert palette pulled from the Martinez Brothers logo
// (copper Zia sun, tan mesas, charcoal roadrunner).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm tan/beige — primary actions and accents
        sand: {
          50: '#faf6f1',
          100: '#f3eadf',
          200: '#e6d3bd',
          300: '#d6b896',
          400: '#c49a70',
          500: '#b07f55',
          600: '#9a6844',
          700: '#7f5338',
          800: '#684432',
          900: '#56392b',
          950: '#2f1d15',
        },
        // Earthy copper / red-brown (logo Zia sun)
        terracotta: {
          50: '#fbf4ef',
          100: '#f5e4d8',
          200: '#eac6af',
          300: '#dca17f',
          400: '#cc7a52',
          500: '#b8613a',
          600: '#a04e2f',
          700: '#853f29',
          800: '#6d3526',
          900: '#5a2e22',
          950: '#301510',
        },
        // Muted high-desert sage
        sage: {
          50: '#f4f6f1',
          100: '#e5eadd',
          200: '#ccd6be',
          300: '#abbb96',
          400: '#8b9f72',
          500: '#6f8457',
          600: '#566843',
          700: '#445237',
          800: '#39432f',
          900: '#313a2a',
          950: '#181e14',
        },
        slate: {
          850: '#172033',
          950: '#0b1120',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
