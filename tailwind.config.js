/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0D0D0D',
          soft: '#1A1A1A',
          muted: '#2A2A2A',
        },
        paper: {
          DEFAULT: '#F5F0E8',
          warm: '#EDE8DC',
          cool: '#F8F6F2',
        },
        amber: {
          accent: '#E8A020',
          light: '#F5C060',
          dark: '#C07010',
        },
        sage: {
          DEFAULT: '#6B8F71',
          light: '#8FAF95',
          dark: '#4A6B50',
        },
        rust: {
          DEFAULT: '#C45C3A',
          light: '#D4745A',
          dark: '#A04030',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'stamp': 'stamp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        stamp: {
          '0%': { opacity: '0', transform: 'scale(1.4) rotate(-5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-5deg)' },
        },
      },
    },
  },
  plugins: [],
}
