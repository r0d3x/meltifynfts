/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sui: {
          blue: '#4CA3FF',
          'blue-light': '#6BB6FF',
          'blue-bright': '#4CA3FF',
          dark: {
            900: '#0B0E14',
            800: '#141922',
            700: '#1E2532',
            600: '#2A3441',
            500: '#3D4B5C',
            400: '#52657A',
            300: '#6B8199',
            200: '#8BA0B8',
            100: '#B0C4D7',
          },
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
              fontFamily: {
          sans: ['Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
        },
      borderRadius: {
        'sui': '16px',
        'sui-sm': '12px',
        'sui-lg': '20px',
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', '52px'],
        '6xl': ['60px', '64px'],
      },
      boxShadow: {
        'sui': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'sui-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'sui-dark': '0 4px 24px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 