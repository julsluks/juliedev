import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Bricolage_Grotesque, Noto_Sans } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'
import '../styles/globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const body = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div
        className={`${display.variable} ${body.variable} flex h-screen flex-col overflow-hidden bg-light-background font-sans text-light-text-primary transition-colors duration-craft dark:bg-dark-background dark:text-dark-text-primary`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
