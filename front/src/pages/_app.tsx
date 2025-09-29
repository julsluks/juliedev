import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)