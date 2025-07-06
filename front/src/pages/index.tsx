import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Hero from '@/components/Hero'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>Julie Villegas - Frontend Developer</title>
        <meta name="description" content={t('description')} />
      </Head>
      <main>
        <Hero />
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