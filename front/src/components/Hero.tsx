import { useTranslation } from 'next-i18next'

export default function Hero() {
    const { t } = useTranslation('common')

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black to-gray-900 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('greeting')}</h1>
            <p className="text-xl md:text-2xl max-w-xl">{t('description')}</p>

            <div className="flex gap-4 mt-6">
                <a href="mailto:julievillegas77@gmail.com" className="underline">Email</a>
                <a href="https://linkedin.com/in/julievillegas77" target="_blank" className="underline">LinkedIn</a>
                <a href="https://github.com/" target="_blank" className="underline">GitHub</a>
            </div>
        </section>
    )
}
