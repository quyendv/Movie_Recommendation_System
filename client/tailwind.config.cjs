/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: '64px',
      },
      spacing: {
        crpSize: 'var(--crp-size)',
      },
      colors: {
        skin: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          contrast: 'var(--contrast-text)',
        },
        crpColor: 'var(--crp-color)',
        crpCircle1: 'var(--crp-circle1-color)',
      },
      backgroundColor: {
        skin: {
          default: 'var(--background)',
          paper: 'var(--background-paper)',
        },
      },
      backgroundImage: {
        // skin not work (other key (not 'skin') also doesn't work) -> use directly
        overlay: 'var(--gradient-img)',
        'horizontal-overlay': 'var(--horizontal-gradient-img)',
      },
      animation: {
        dotCrp: 'animateDotCrp 1s linear forwards',
        fadeIn: 'fadeIn .75s linear 1s forwards',
      },
      keyframes: {
        animateDotCrp: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(calc(3.6deg*var(--value)))',
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
