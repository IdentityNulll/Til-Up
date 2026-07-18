/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Obsidian ink scale — layered surfaces from deepest background up.
        ink: {
          base: '#07080c',
          950: '#0a0b11',
          900: '#0e1017',
          850: '#13151e',
          800: '#191c27',
          750: '#1f2230',
          700: '#262a3a',
          600: '#333849',
          500: '#454b60',
        },
        // Text ramp for hierarchy.
        content: {
          strong: '#f5f7fa',
          DEFAULT: '#c7ccda',
          muted: '#8c92a6',
          faint: '#5c6175',
        },
        // Emerald/mint accent.
        accent: {
          DEFAULT: '#19cd8e',
          bright: '#3ff0ac',
          dim: '#0f9d6e',
          deep: '#0b7854',
        },
        // Cool secondary used for gradients / data accents.
        teal: {
          DEFAULT: '#2fd4c4',
          bright: '#5ff0e2',
        },
        // Backwards-compatible aliases (older components still reference these).
        obsidian: {
          950: '#07080c',
          900: '#0e1017',
          800: '#191c27',
          700: '#262a3a',
          600: '#333849',
          500: '#454b60',
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
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 32px -16px rgba(0,0,0,0.7)',
        raised: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 44px -20px rgba(0,0,0,0.8)',
        glow: '0 0 0 1px rgba(25,205,142,0.35), 0 14px 40px -12px rgba(25,205,142,0.4)',
        'glow-sm': '0 8px 24px -10px rgba(25,205,142,0.45)',
      },
      backgroundImage: {
        'accent-grad': 'linear-gradient(135deg, #3ff0ac 0%, #19cd8e 45%, #12b39a 100%)',
        'accent-soft': 'linear-gradient(135deg, rgba(63,240,172,0.16), rgba(47,212,196,0.08))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
