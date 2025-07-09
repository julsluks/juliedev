'use client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const LanguageToggle = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'ca', name: 'Català', flag: '🇨🇦' }
    ]

    const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0]

    const handleLanguageChange = (langCode: string) => {
        router.push(router.asPath, router.asPath, { locale: langCode })
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-md bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:bg-light-muted dark:hover:bg-dark-muted transition-colors"
            >
                <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-md shadow-lg overflow-hidden z-50"
                    >
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-light-muted dark:hover:bg-dark-muted transition-colors ${
                                    language.code === router.locale 
                                        ? 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary' 
                                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                                }`}
                            >
                                <span>{language.flag}</span>
                                <span>{language.name}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LanguageToggle