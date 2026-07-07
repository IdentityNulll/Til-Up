/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#08080b',
          900: '#0d0d12',
          800: '#15151d',
          700: '#1e1e29',
          600: '#2a2a38',
          500: '#3c3c4d',
        },
        accent: {
          DEFAULT: '#3ddc97',
          dim: '#2a9d70',
          bright: '#5ef0ae',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        glow: '0 0 24px rgba(61, 220, 151, 0.25)',
      },
    },
  },
  plugins: [],
};
