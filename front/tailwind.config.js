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
          primary: '#3B82F6',
          secondary: '#10B981',
          accent: '#8B5CF6',
          background: '#FFFFFF',
          surface: '#F8FAFC',
          muted: '#F1F5F9',
          border: '#E2E8F0',
          text: {
            primary: '#1E293B',
            secondary: '#64748B',
          },
        },
        dark: {
          primary: '#60A5FA',
          secondary: '#34D399',
          accent: '#A78BFA',
          background: '#0F172A',
          surface: '#1E293B',
          muted: '#334155',
          border: '#475569',
          text: {
            primary: '#F8FAFC',
            secondary: '#CBD5E1',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
  ],
}