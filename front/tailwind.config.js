module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#0F766E',
          secondary: '#0F766E',
          accent: '#0F766E',
          'accent-soft': '#CCFBF1',
          background: '#F2F4F7',
          surface: '#FFFFFF',
          muted: '#F2F4F7',
          border: '#D5DBE5',
          text: {
            primary: '#14181F',
            secondary: '#5C667A',
            tertiary: '#5C667A',
          },
        },
        dark: {
          primary: '#2DD4BF',
          secondary: '#2DD4BF',
          accent: '#2DD4BF',
          'accent-soft': '#134E4A',
          background: '#0F1419',
          surface: '#1A222C',
          muted: '#1A222C',
          border: '#2A3441',
          text: {
            primary: '#E8ECF1',
            secondary: '#9AA3B2',
            tertiary: '#9AA3B2',
          },
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        craft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        craft: '280ms',
        fast: '180ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.28s ease-out',
        'rise-in': 'riseIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
