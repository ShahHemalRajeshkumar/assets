const colors = require('./config/colors');
const breakpoints = require('./config/breakpoints');
const safelist = require('./config/safelist');

module.exports = {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './styles/**/*.{css,scss}'
  ],
  safelist: [
    ...safelist,
    // Navigation specific classes
    'sticky',
    'lg:top-0',
    'z-30',
    'z-0',
    'z-10',
    'bg-white',
    'lg:bg-white',
    'bg-opacity-0',
    'fixed',
    'top-0',
    'inset-x-0',
    'shadow-lg',
    'flex',
    'items-center',
    'justify-between',
    'flex-nowrap',
    'py-2',
    'lg:py-0',
    'lg:px-8',
    'px-4',
    'min-h-[48px]',
    'min-w-[280px]',
    'text-primary',
    'text-white',
    'material-icons-outlined',
    'text-40px',
    // Add pattern matching for dynamic classes
    { pattern: /ms-nav-.+/ },
    { pattern: /text-.+/ },
    { pattern: /bg-.+/ },
    { pattern: /shadow-.+/ },
  ],
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'gray-250': '#DCDCDD',
    }),
    placeholderColor: (theme) => theme('colors'),
    screens: breakpoints,
    container: {
      screens: {
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
      },
    },
    extend: {
      maxHeight: {
        '112': '28rem',
      },
      colors: {
        'ms-gray': '#f3f5f7',
        // High contrast color overrides for accessibility
        'gray-400-accessible': '#374151', // Darker gray for better contrast
        'gray-500-accessible': '#1f2937', // Even darker for high contrast
        'text-accessible': '#111827', // Very dark for maximum contrast
        ...colors
      },
      objectPosition: {
        'custom-1': '10% 25%',
      },
      boxShadow: {
        card: '5px 10px #21697c',
      },
      zIndex: {
        1: '1',
        2: '2',
        '-1': '-1',
      },
      outline: {
        primary: `2px solid var(--color-primary)`,
        blue: '3px solid #b0d8e4',
        red: '3px solid #C00659',
      },

      spacing: {
        0.8: '0,888888889rem',
        58: '14.5rem',
        18: '4.5rem',
        136: '34rem',
      },
      inset: {
        '-81': '-22rem',
        30: '7.55rem',
      },
      minWidth: {
        '110px': '110px',
      },
      lineHeight: {
        '22px': '22px',
        '23px': '23px',
        '24px': '24px',
        '26px': '26px',
        '28px': '28px',
        '30px': '30px',
        '32px': '32px',
        '34px': '34px',
        '35px': '35px',
        '36px': '36px',
        '38px': '38px',
        '42px': '42px',
        '48px': '48px',
        '52px': '52px',
        '54px': '54px',
        '56px': '56px',
      },
      fontSize: {
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '22px': '22px',
        '24px': '24px',
        '26px': '26px',
        '28px': '28px',
        '30px': '30px',
        '32px': '32px',
        '34px': '34px',
        '40px': '40px',
        '44px': '44px',
        '45px': '45px',
        '48px': '48px',
        '50px': '50px',
        '60px': '60px',
      },
      screens: {
        xs: "480px", // Adding a custom 'xs' breakpoint
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
