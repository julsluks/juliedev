import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Habilita el modo dark por clase
  theme: {
    extend: {
      colors: {
        // Paleta Light Theme
        light: {
          primary: '#3B82F6',      // Azul vibrante
          secondary: '#10B981',    // Verde esmeralda
          accent: '#F59E0B',       // Amarillo dorado
          background: '#FFFFFF',   // Blanco puro
          surface: '#F8FAFC',      // Gris muy claro
          muted: '#F1F5F9',        // Gris claro
          text: {
            primary: '#1E293B',    // Gris oscuro
            secondary: '#475569',  // Gris medio
            muted: '#64748B'       // Gris suave
          },
          border: '#E2E8F0'        // Borde suave
        },
        // Paleta Dark Theme
        dark: {
          primary: '#60A5FA',      // Azul más suave
          secondary: '#34D399',    // Verde menta
          accent: '#FBBF24',       // Amarillo más cálido
          background: '#0F172A',   // Azul muy oscuro
          surface: '#1E293B',      // Gris azulado oscuro
          muted: '#334155',        // Gris medio oscuro
          text: {
            primary: '#F8FAFC',    // Blanco suave
            secondary: '#CBD5E1',  // Gris claro
            muted: '#94A3B8'       // Gris medio claro
          },
          border: '#475569'        // Borde medio
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      boxShadow: {
        'light': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'glow-light': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-dark': '0 0 20px rgba(96, 165, 250, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} satisfies Config;
