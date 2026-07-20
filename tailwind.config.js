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
          dark: '#037371',     // AA-safe on white for small text
          darker: '#025957',   // hover state for dark-teal buttons
          light: '#3DD4D2',
          glow: '#6FFFE9',     // bright accent / glow
        },
        'text-primary': '#0B132B',
      },
      fontFamily: {
        sans: ['var(--font-familjen)', 'system-ui', 'sans-serif'],
        display: ['var(--font-familjen)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(11, 19, 43, 0.2), 0 4px 12px -4px rgba(11, 19, 43, 0.08)',
        'premium-lg': '0 24px 60px -15px rgba(11, 19, 43, 0.25), 0 8px 20px -8px rgba(11, 19, 43, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
