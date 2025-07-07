import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
