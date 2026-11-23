/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#050308',
          900: '#0a0710',
          850: '#0f0b18',
          800: '#151021',
          700: '#1e1730',
          600: '#2a2140',
        },
        grape: {
          900: '#2a1245',
          800: '#3d1a63',
          700: '#54248a',
          600: '#6d30b4',
          500: '#8b45d6',
          400: '#a86fe4',
        },
        gold: {
          300: '#f5e3a8',
          400: '#ecd07f',
          500: '#d9b45a',
          600: '#c09a41',
          700: '#9c7c31',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5e3a8 0%, #d9b45a 45%, #9c7c31 100%)',
        'night-radial': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109, 48, 180, 0.28), transparent 60%)',
      },
      boxShadow: {
        gold: '0 0 24px rgba(217, 180, 90, 0.25)',
        'gold-lg': '0 8px 40px rgba(217, 180, 90, 0.35)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease both',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
