/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3525cd',
          container: '#4f46e5',
          light: '#e2dfff',
        },
        secondary: {
          DEFAULT: '#0058be',
          container: '#2170e4',
          light: '#d8e2ff',
        },
        tertiary: {
          DEFAULT: '#571ac0',
          container: '#6f3dd9',
          light: '#e9ddff',
        },
        neutral: {
          background: '#f7f9fb',
          surface: '#ffffff',
          dark: '#191c1e',
          muted: '#464555',
          border: '#c7c4d8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
