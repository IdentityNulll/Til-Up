/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light neutral scale (green-tinted). Names kept from the old dark
        // theme, but values are now light: `900` = white cards, `base` = the
        // off-white page background, higher numbers = borders/dividers.
        ink: {
          base: '#f4f7f4', // page background (also text color on green buttons)
          950: '#eef2ef', // translucent glass base
          900: '#ffffff', // cards, chips
          850: '#f4f8f5', // hover / raised surface
          800: '#eaefeb', // secondary button, emblems
          750: '#e0e7e2', // borders / hover borders
          700: '#d3ddd6', // stronger borders, path lines
          600: '#bccabf',
          500: '#93a598',
        },
        // Dark text ramp on light surfaces.
        content: {
          strong: '#0f1c17',
          DEFAULT: '#33453c',
          muted: '#5f7168',
          faint: '#8b998f',
        },
        // Deep green primary.
        accent: {
          DEFAULT: '#15603a',
          bright: '#1e7a49',
          dim: '#124e30',
          deep: '#0d3a24',
        },
        // Muted teal-green secondary for data accents (used sparingly).
        teal: {
          DEFAULT: '#0f766e',
          bright: '#14b8a6',
        },
        // Backwards-compatible aliases mapped to the light scale.
        obsidian: {
          950: '#eef2ef',
          900: '#ffffff',
          800: '#eaefeb',
          700: '#d3ddd6',
          600: '#bccabf',
          500: '#93a598',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,40,30,0.05), 0 10px 26px -18px rgba(16,40,30,0.18)',
        raised: '0 2px 4px rgba(16,40,30,0.06), 0 18px 40px -22px rgba(16,40,30,0.22)',
        glow: '0 0 0 1px rgba(21,96,58,0.28), 0 12px 30px -14px rgba(21,96,58,0.3)',
        'glow-sm': '0 6px 18px -10px rgba(21,96,58,0.4)',
      },
      backgroundImage: {
        'accent-grad': 'linear-gradient(135deg, #1e7a49 0%, #15603a 55%, #114c30 100%)',
        'accent-soft': 'linear-gradient(135deg, rgba(21,96,58,0.1), rgba(21,96,58,0.04))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
