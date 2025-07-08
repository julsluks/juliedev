'use client'

import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'

const Hero = () => {
    const { t } = useTranslation('common')

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-16">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
                        {t('greeting')}
                    </h1>
                    <p className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
                        {t('description')}
                    </p>
                    <button className="px-8 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors">
                        {t('contact')}
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero