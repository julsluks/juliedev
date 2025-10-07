// Configuración de Google Analytics 4
// Para usar esto, necesitas crear una cuenta en Google Analytics
// y obtener tu Measurement ID (formato: G-XXXXXXXXXX)

import Script from 'next/script'

interface GoogleAnalyticsProps {
  readonly measurementId?: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Solo cargar en producción y si hay measurement ID
  if (process.env.NODE_ENV !== 'production' || !measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Función para trackear eventos personalizados
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }
}

// Eventos útiles para un portfolio
export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form'
  })
}

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    event_category: 'engagement',
    event_label: projectName
  })
}

export const trackEmailCopy = () => {
  trackEvent('email_copy', {
    event_category: 'engagement',
    event_label: 'email_copy'
  })
}