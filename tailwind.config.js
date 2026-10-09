/** @type {import('tailwindcss').Config} */
// Цвета синхронизированы с src/theme/tokens.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D3F3B',
        heading: '#141C1A',
        brand: {
          orange: '#F87A1D',
          cyan: '#35C2CF',
          cyanbar: '#8FDDE8',
        },
        surface: '#F4F4F5',
        danger: '#E5322D',
        ok: '#27A768',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Oswald', '"Arial Narrow"', 'sans-serif'],
      },
      screens: {
        phone: '501px',
      },
    },
  },
  plugins: [],
};
