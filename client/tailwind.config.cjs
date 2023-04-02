/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: '64px',
      },
      colors: {
        skin: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          contrast: 'var(--contrast-text)',
        },
      },
      backgroundColor: {
        skin: {
          default: 'var(--background)',
          paper: 'var(--background-paper)',
        },
      },
    },
  },
  plugins: [],
};
