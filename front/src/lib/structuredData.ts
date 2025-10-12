const getLocalizedValue = (locale: string, es: string, ca: string, en: string) => {
  if (locale === 'es') return es
  if (locale === 'ca') return ca
  return en
}

export const getPersonStructuredData = (locale: string = 'en') => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://julievill.dev' 
    : 'http://localhost:3000'

  const jobTitle = getLocalizedValue(
    locale,
    'Desarrolladora Frontend',
    'Desenvolupadora Frontend', 
    'Frontend Developer'
  )

  const description = getLocalizedValue(
    locale,
    'Desarrolladora Frontend especializada en React, Vue.js, Next.js y Laravel con experiencia en Barcelona, España.',
    'Desenvolupadora Frontend especialitzada en React, Vue.js, Next.js i Laravel amb experiència a Barcelona, Catalunya.',
    'Frontend Developer specialized in React, Vue.js, Next.js and Laravel with experience in Barcelona, Spain.'
  )

  const location = getLocalizedValue(
    locale,
    'Barcelona, España',
    'Barcelona, Catalunya',
    'Barcelona, Spain'
  )

  const country = getLocalizedValue(locale, 'España', 'Catalunya', 'Spain')

  const skills = [
    'React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 
    'Laravel', 'Node.js', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Git', 'GitHub', 'Figma', 'MySQL'
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Julie Villegas',
    alternateName: ['Julie Dev', 'juliedev'],
    jobTitle,
    description,
    url: baseUrl,
    image: `${baseUrl}/images/julie-profile.jpg`,
    sameAs: [
      'https://github.com/julsluks',
      'https://linkedin.com/in/julie-villegas',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressCountry: country
    },
    knowsAbout: skills,
    email: 'julievill77@gmail.com',
    workLocation: {
      '@type': 'Place',
      name: location
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: jobTitle,
      occupationLocation: {
        '@type': 'Place',
        name: location
      },
      skills: skills.join(', ')
    }
  }
}

export const getWebsiteStructuredData = (locale: string = 'en') => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://julievill.dev' 
    : 'http://localhost:3000'

  const localizedData = {
    es: {
      name: 'Julie Villegas Portfolio',
      description: 'Portfolio profesional de Julie Villegas, desarrolladora frontend especializada en React, Vue.js y Next.js',
      author: 'Julie Villegas - Desarrolladora Frontend'
    },
    ca: {
      name: 'Julie Villegas Portfolio',
      description: 'Portfolio professional de Julie Villegas, desenvolupadora frontend especialitzada en React, Vue.js i Next.js',
      author: 'Julie Villegas - Desenvolupadora Frontend'
    },
    en: {
      name: 'Julie Villegas Portfolio',
      description: 'Professional portfolio of Julie Villegas, frontend developer specialized in React, Vue.js and Next.js',
      author: 'Julie Villegas - Frontend Developer'
    }
  }

  const data = localizedData[locale as keyof typeof localizedData] || localizedData.en

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    description: data.description,
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'Julie Villegas',
      jobTitle: data.author
    },
    inLanguage: locale,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: 'Julie Villegas'
    }
  }
}

export const getPortfolioStructuredData = (locale: string = 'en') => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://julievill.dev' 
    : 'http://localhost:3000'

  const portfolioName = getLocalizedValue(
    locale,
    'Portfolio de Julie Villegas',
    'Portfolio de Julie Villegas',
    'Julie Villegas Portfolio'
  )

  const jobTitle = getLocalizedValue(
    locale,
    'Desarrolladora Frontend',
    'Desenvolupadora Frontend',
    'Frontend Developer'
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${baseUrl}/#portfolio`,
    name: portfolioName,
    author: {
      '@type': 'Person',
      name: 'Julie Villegas',
      jobTitle
    },
    hasPart: [
      {
        '@type': 'SoftwareApplication',
        name: 'Conexus Hub',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web Browser',
        programmingLanguage: ['React', 'Laravel', 'MySQL', 'CSS3']
      },
      {
        '@type': 'SoftwareApplication',
        name: 'High Link',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web Browser',
        programmingLanguage: ['JavaScript', 'HTML5', 'CSS3']
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Chromatic Bond',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web Browser',
        programmingLanguage: ['Phaser.js', 'JavaScript', 'HTML5', 'CSS3']
      }
    ]
  }
}