import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo'dan alınmış palet — açık lavanta → lila → toz pembe
        lavender: {
          50:  '#FAF7FF',
          100: '#F3EDFF',
          200: '#E5D8FF',
          300: '#D2BCFA',
          400: '#B89BF0',
          500: '#9D7BE3', // ana lavanta
          600: '#8463CC',
          700: '#6B4FAE',
          800: '#553F8A',
          900: '#3E2D66',
        },
        lilac: {
          50:  '#FBF7FE',
          100: '#F5EBFC',
          200: '#EBD7F9',
          300: '#D9B5F0',
          400: '#C595E2',
          500: '#B179D0', // ana lila
          600: '#9461B5',
          700: '#774C95',
          800: '#5C3B73',
          900: '#412953',
        },
        rose: {
          50:  '#FEF7FA',
          100: '#FDEBF2',
          200: '#FAD3E1',
          300: '#F5B0C8',
          400: '#EC85A8',
          500: '#DD6189', // ana toz pembe
          600: '#C44872',
          700: '#A2375C',
          800: '#7E2B48',
          900: '#5C2034',
        },
        // Genel kullanım için takma adlar
        primary: {
          50:  '#FAF7FF',
          100: '#F3EDFF',
          200: '#E5D8FF',
          300: '#D2BCFA',
          400: '#B89BF0',
          500: '#9D7BE3',
          600: '#8463CC',
          700: '#6B4FAE',
          800: '#553F8A',
          900: '#3E2D66',
        },
        accent: {
          400: '#EC85A8',
          500: '#DD6189',
          600: '#C44872',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-quvars': 'linear-gradient(135deg, #B89BF0 0%, #C595E2 50%, #EC85A8 100%)',
        'gradient-quvars-soft': 'linear-gradient(135deg, #F3EDFF 0%, #F5EBFC 50%, #FDEBF2 100%)',
        'gradient-quvars-dark': 'linear-gradient(135deg, #553F8A 0%, #774C95 50%, #A2375C 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 60px -10px rgba(184, 155, 240, 0.6)',
        'glow-pink': '0 0 60px -10px rgba(236, 133, 168, 0.5)',
        'soft': '0 10px 40px -10px rgba(155, 123, 227, 0.25)',
        'soft-lg': '0 20px 60px -15px rgba(155, 123, 227, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
