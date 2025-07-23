import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('greeting').split(',')[1]?.trim() || 'Julie Villegas'} - {t('frontendDeveloper')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content="frontend developer, full stack, UX/UI, React, Next.js, TypeScript, desarrolladora frontend" />
        <meta name="author" content="Julie Villegas" />
        <meta property="og:title" content={`${t('greeting').split(',')[1]?.trim() || 'Julie Villegas'} - ${t('frontendDeveloper')}`} />
        <meta property="og:description" content={t('description')} />
        <meta property="og:type" content="website" />
      </Head>
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