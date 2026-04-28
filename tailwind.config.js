/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // K Line brand palette (matched to klinealigner.com)
        navy: {
          DEFAULT: '#0B132B',  // primary deep navy
          900: '#070D1E',      // darkest
          800: '#0B132B',
          700: '#1C2541',      // secondary
          600: '#2A3559',
          500: '#3A506B',      // slate
        },
        teal: {
          DEFAULT: '#06B0AE',  // primary K Line accent
          dark: '#048A88',
          light: '#3DD4D2',
          glow: '#6FFFE9',     // bright accent / glow
        },
        // Legacy support — map gold → teal so existing classes keep working
        gold: {
          DEFAULT: '#06B0AE',
          dark: '#048A88',
        },
        'gold-dark': '#048A88',
        'text-primary': '#0B132B',
      },
      fontFamily: {
        sans: ['"Familjen Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Familjen Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #0B132B 100%)',
        'navy-glow': 'radial-gradient(ellipse at top, rgba(6, 176, 174, 0.15), transparent 60%)',
        'teal-gradient': 'linear-gradient(135deg, #06B0AE 0%, #6FFFE9 100%)',
        'card-glow': 'radial-gradient(ellipse at top left, rgba(6, 176, 174, 0.08), transparent 70%)',
      },
      boxShadow: {
        'teal-glow': '0 0 40px rgba(6, 176, 174, 0.25)',
        'teal-soft': '0 4px 24px rgba(6, 176, 174, 0.15)',
        'premium': '0 10px 40px -10px rgba(11, 19, 43, 0.2), 0 4px 12px -4px rgba(11, 19, 43, 0.08)',
        'premium-lg': '0 24px 60px -15px rgba(11, 19, 43, 0.25), 0 8px 20px -8px rgba(11, 19, 43, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
