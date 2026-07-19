/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Obsidian ink scale — deep cool charcoal-black, layered surfaces up.
        ink: {
          base: '#0b0f14',
          950: '#0d121a',
          900: '#111722',
          850: '#161d2b',
          800: '#1c2433',
          750: '#232c3e',
          700: '#2b3547',
          600: '#384357',
          500: '#4a5670',
        },
        // Text ramp for hierarchy.
        content: {
          strong: '#f3f6fb',
          DEFAULT: '#c4cbdb',
          muted: '#8a92a8',
          faint: '#5a6379',
        },
        // Electric blue accent.
        accent: {
          DEFAULT: '#2e8fff',
          bright: '#5aa8ff',
          dim: '#1f6fd6',
          deep: '#134a9e',
        },
        // Cyan secondary used for gradients / data accents.
        teal: {
          DEFAULT: '#22d3ee',
          bright: '#5ee7fb',
        },
        // Backwards-compatible aliases (older components still reference these).
        obsidian: {
          950: '#0b0f14',
          900: '#111722',
          800: '#1c2433',
          700: '#2b3547',
          600: '#384357',
          500: '#4a5670',
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
        glow: '0 0 0 1px rgba(46,143,255,0.35), 0 14px 40px -12px rgba(46,143,255,0.45)',
        'glow-sm': '0 8px 24px -10px rgba(46,143,255,0.5)',
      },
      backgroundImage: {
        'accent-grad': 'linear-gradient(135deg, #5aa8ff 0%, #2e8fff 48%, #1f6fd6 100%)',
        'accent-soft': 'linear-gradient(135deg, rgba(90,168,255,0.16), rgba(34,211,238,0.08))',
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
