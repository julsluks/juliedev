import { NextApiRequest, NextApiResponse } from 'next'

const generateSitemap = () => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://julievillegas.dev' 
    : 'http://localhost:3000'

  const staticPages = [
    '',  // homepage
  ]

  const languages = ['es', 'en', 'ca']
  
  // Generar URLs para todos los idiomas
  const allUrls: Array<{
    url: string
    changefreq: string
    priority: string
    lastmod: string
  }> = []
  
  staticPages.forEach(page => {
    languages.forEach(lang => {
      allUrls.push({
        url: `${baseUrl}/${lang}${page}`,
        changefreq: 'weekly',
        priority: page === '' ? '1.0' : '0.8',
        lastmod: new Date().toISOString()
      })
    })
  })

  // URL por defecto (sin idioma)
  staticPages.forEach(page => {
    allUrls.push({
      url: `${baseUrl}${page}`,
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString()
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls
  .map((url) => {
    return `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${languages.map(lang => 
      `<xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}/${lang}" />`
    ).join('\n    ')}
  </url>`
  })
  .join('')}
</urlset>`

  return sitemap
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap())
  res.end()
}