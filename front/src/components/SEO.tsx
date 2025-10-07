import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  structuredData?: object
}

export default function SEO({ 
  title,
  description,
  keywords,
  ogImage = '/images/og-image.jpg',
  structuredData
}: SEOProps) {
  const router = useRouter()
  const { locale } = router
  
  // URLs para diferentes idiomas
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://julievillegas.dev' // Cambia por tu dominio real
    : 'http://localhost:3000'
  
  const currentUrl = `${baseUrl}${router.asPath}`
  
  // Función para obtener contenido según idioma
  const getLocalizedContent = (es: string, ca: string, en: string) => {
    if (locale === 'es') return es
    if (locale === 'ca') return ca
    return en
  }
  
  // Títulos y descripciones por defecto según idioma
  const defaultTitle = getLocalizedContent(
    'Julie Villegas - Desarrolladora Frontend | React, Vue.js, Next.js',
    'Julie Villegas - Desenvolupadora Frontend | React, Vue.js, Next.js',
    'Julie Villegas - Frontend Developer | React, Vue.js, Next.js'
  )
  
  const defaultDescription = getLocalizedContent(
    'Julie Villegas - Desarrolladora Frontend especializada en React, Vue.js, Next.js y Laravel. Portfolio con proyectos reales y experiencia en Barcelona, España.',
    'Julie Villegas - Desenvolupadora Frontend especialitzada en React, Vue.js, Next.js i Laravel. Portfolio amb projectes reals i experiència a Barcelona, Catalunya.',
    'Julie Villegas - Frontend Developer specialized in React, Vue.js, Next.js and Laravel. Portfolio with real projects and experience in Barcelona, Spain.'
  )
  
  const defaultKeywords = getLocalizedContent(
    'Julie Villegas, Julie Dev, desarrolladora frontend, React, Vue.js, Next.js, Laravel, Barcelona, España, portfolio, desarrolladora web, frontend developer, JavaScript, TypeScript',
    'Julie Villegas, Julie Dev, desenvolupadora frontend, React, Vue.js, Next.js, Laravel, Barcelona, Catalunya, portfolio, desenvolupadora web, frontend developer, JavaScript, TypeScript',
    'Julie Villegas, Julie Dev, frontend developer, React, Vue.js, Next.js, Laravel, Barcelona, Spain, portfolio, web developer, JavaScript, TypeScript'
  )

  const seoTitle = title || defaultTitle
  const seoDescription = description || defaultDescription
  const seoKeywords = keywords || defaultKeywords
  const ogLocale = getLocalizedContent('es_ES', 'ca_ES', 'en_US')

  return (
    <Head>
      {/* Títulos y meta básicos */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Julie Villegas" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Julie Villegas Portfolio" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={`${baseUrl}${ogImage}`} />
      <meta property="twitter:creator" content="@juliedev" />

      {/* Idiomas alternativos */}
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es${router.asPath}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${router.asPath}`} />
      <link rel="alternate" hrefLang="ca" href={`${baseUrl}/ca${router.asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${router.asPath}`} />

      {/* Favicons y iconos */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Datos estructurados JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}