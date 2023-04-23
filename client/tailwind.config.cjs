/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: '64px',
      },
      spacing: {
        header: '64px',
        crpSize: 'var(--crp-size)',
      },
      colors: {
        skin: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          contrast: 'var(--contrast-text)',
          navHover: 'var(--nav-hover)',
        },
        crpColor: 'var(--crp-color)',
        crpCircle1: 'var(--crp-circle1-color)',
      },
      backgroundColor: {
        skin: {
          default: 'var(--background-default)',
          paper: 'var(--background-paper)',
          sidebarMenu: 'var(--bg-sidebar-menu)',
        },
      },
      backgroundImage: {
        // skin not work (other key (not 'skin') also doesn't work) -> use directly
        overlayToTop: 'var(--overlay-to-top)',
        overlayToRight: 'var(--overlay-to-right)',
        overlayToLeft: 'var(--overlay-to-left)',
        linearProgress: 'var(--lp-bg-image)',
        backdropPoster: 'var(--backdrop-poster)',
      },
      animation: {
        dotCrp: 'animateDotCrp 1s linear forwards',
        fadeIn: 'fadeIn .75s linear 1s forwards',
        linearProgress: 'linearProgress 2s infinite linear',
      },
      keyframes: {
        animateDotCrp: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(calc(36deg*var(--value)))',
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
        linearProgress: {
          '0%': {
            'background-size': '200% 100%',
            'background-position': 'left -31.25% top 0%',
          },
          '50%': {
            'background-size': '800% 100%',
            'background-position': 'left -49% top 0%',
          },
          '100%': {
            'background-size': '400% 100%',
            'background-position': 'left -102% top 0%',
          },
        },
      },
    },
  },
  plugins: [],
};
