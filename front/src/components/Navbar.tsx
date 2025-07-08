'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const { t } = useTranslation('common')
    const { theme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)

            // Detectar la sección activa
            const sections = ['home', 'projects', 'skills', 'experience', 'contact']
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section === 'home' ? 'hero' : section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const targetId = sectionId === 'home' ? 'hero' : sectionId
        const element = document.getElementById(targetId)

        if (element) {
            const offsetTop = element.offsetTop - 80 // Ajuste para el navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
        setIsOpen(false)
    }

    const navLinks = [
        { href: 'home', label: t('nav.home') },
        { href: 'projects', label: t('nav.projects') },
        { href: 'skills', label: t('nav.skills') },
        { href: 'experience', label: t('nav.experience') },
        { href: 'contact', label: t('nav.contact') },
    ]

    const getThemeLabel = (currentTheme: string) => {
        return currentTheme === 'light' ? t('lightMode') : t('darkMode')
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-xl shadow-lg border-b border-light-border/20 dark:border-dark-border/20'
                : 'bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo with enhanced effects */}
                    <motion.button
                        onClick={() => scrollToSection('home')}
                        className="group relative flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div 
                            className="relative flex items-center justify-center w-20 h-10 rounded-xl bg-gradient-to-br from-light-primary/10 to-light-secondary/10 dark:from-dark-primary/10 dark:to-dark-secondary/10 group-hover:from-light-primary/20 group-hover:to-light-secondary/20 dark:group-hover:from-dark-primary/20 dark:group-hover:to-dark-secondary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-xl font-bold bg-gradient-to-r from-light-primary via-light-secondary to-light-primary dark:from-dark-primary dark:via-dark-secondary dark:to-dark-primary bg-clip-text text-transparent animate-pulse">
                                {"<JV/>"}
                            </span>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-light-primary/5 to-light-secondary/5 dark:from-dark-primary/5 dark:to-dark-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </motion.div>
                    </motion.button>

                    {/* Desktop Navigation with enhanced effects */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link, index) => (
                            <motion.button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeSection === link.href
                                    ? 'text-light-primary dark:text-dark-primary bg-light-primary/5 dark:bg-dark-primary/5'
                                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-muted/50 dark:hover:bg-dark-muted/50'
                                    }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.label}
                                {activeSection === link.href && (
                                    <motion.span
                                        layoutId="desktop-nav-underline"
                                        className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-light-primary/10 to-light-secondary/10 dark:from-dark-primary/10 dark:to-dark-secondary/10 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.button>
                        ))}
                        
                        {/* Enhanced toggle buttons */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center space-x-3 ml-4 pl-4 border-l border-light-border/30 dark:border-dark-border/30"
                        >
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <LanguageToggle />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <ThemeToggle />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Enhanced Mobile menu button */}
                    <motion.div 
                        className="flex md:hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative inline-flex items-center justify-center p-2 rounded-xl text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary focus:outline-none bg-light-surface/50 dark:bg-dark-surface/50 hover:bg-light-muted dark:hover:bg-dark-muted transition-all duration-300 shadow-lg"
                            aria-label="Toggle menu"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.div>
                            {/* Button glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-light-primary/20 to-light-secondary/20 dark:from-dark-primary/20 dark:to-dark-secondary/20 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-light-background/98 dark:bg-dark-background/98 backdrop-blur-xl border-t border-light-border/30 dark:border-dark-border/30 shadow-2xl"
                    >
                        <motion.div 
                            className="px-6 pt-6 pb-8 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Navigation Links with stagger animation */}
                            <div className="space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.href}
                                        onClick={() => scrollToSection(link.href)}
                                        className={`w-full text-left block px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 ${activeSection === link.href
                                            ? 'bg-gradient-to-r from-light-primary/15 to-light-secondary/15 dark:from-dark-primary/15 dark:to-dark-secondary/15 text-light-primary dark:text-dark-primary shadow-lg border border-light-primary/20 dark:border-dark-primary/20'
                                            : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-muted/70 dark:hover:bg-dark-muted/70 hover:text-light-primary dark:hover:text-dark-primary'
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.span
                                            className="block"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            {link.label}
                                        </motion.span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Enhanced Separator */}
                            <motion.div 
                                className="relative my-6"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                <div className="border-t border-gradient-to-r from-transparent via-light-border to-transparent dark:via-dark-border"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-light-primary/20 to-transparent dark:via-dark-primary/20 h-px"></div>
                            </motion.div>

                            {/* Enhanced Settings Section */}
                            <motion.div 
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.div 
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-light-surface/50 dark:bg-dark-surface/50 hover:bg-light-muted/50 dark:hover:bg-dark-muted/50 transition-all duration-300 shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                        {t('language')}
                                    </span>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <LanguageToggle />
                                    </motion.div>
                                </motion.div>
                                
                                <motion.div 
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-light-surface/50 dark:bg-dark-surface/50 hover:bg-light-muted/50 dark:hover:bg-dark-muted/50 transition-all duration-300 shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                            {t('theme')}
                                        </span>
                                        <motion.span 
                                            className="text-xs text-light-text-secondary/70 dark:text-dark-text-secondary/70"
                                            key={theme} // Re-render when theme changes
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {getThemeLabel(theme)}
                                        </motion.span>
                                    </div>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <ThemeToggle />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar