/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      container: {
        center: true,
        screens: { md: '768px' },
        padding: '1rem',
      },
      colors: {
        primary: '#522EBD',
        white: '#F5F3FA',
        dark: '#1C0945',
        light: '#DFD5F3',
      },
    },
    fontFamily: {
      sans: 'Poppins',
    },
  },
  plugins: [],
};
