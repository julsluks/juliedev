import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import { getPersonStructuredData, getWebsiteStructuredData, getPortfolioStructuredData } from '@/lib/structuredData'

export default function Home() {
  const router = useRouter()
  const { locale } = router

  // Datos estructurados combinados
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonStructuredData(locale),
      getWebsiteStructuredData(locale),
      getPortfolioStructuredData(locale)
    ]
  }

  return (
    <>
      <SEO structuredData={structuredData} />
      <main>
        <Hero />
        <Projects />        
        <Skills />
        <Experience />
        <Contact /> 
      </main>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}