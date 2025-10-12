import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  
  // Optimizaciones de imagen
  images: {
    domains: ['julievill.dev', 'localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compresión
  compress: true,

  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects para SEO
  async redirects() {
    return []
  },

  // Rewrites para sitemap
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
    ]
  },

  // Configuración experimental para mejorar rendimiento
  experimental: {
    scrollRestoration: true,
  },
  
  // Variables de entorno públicas
  env: {
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://julievill.dev' 
      : 'http://localhost:3000',
  },
};

export default nextConfig;
