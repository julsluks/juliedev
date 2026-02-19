'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const { t } = useTranslation('common')

    useEffect(() => {
        const handleScroll = () => {
            const mainElement = document.querySelector('main')
            if (!mainElement) return

            const scrollTop = mainElement.scrollTop
            setScrolled(scrollTop > 10)

            const sections = ['home', 'projects', 'skills', 'experience', 'contact']

            for (const section of sections) {
                const element = document.getElementById(section === 'home' ? 'hero' : section)
                if (element) {
                    const elementRect = element.getBoundingClientRect()
                    const mainRect = mainElement.getBoundingClientRect()

                    // Si el elemento está visible en el viewport del main
                    if (elementRect.top <= mainRect.top + 100 && elementRect.bottom > mainRect.top + 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        const mainElement = document.querySelector('main')
        if (mainElement) {
            mainElement.addEventListener('scroll', handleScroll)
            return () => mainElement.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navLinks = [
        { href: 'home', label: t('nav.home') },
        { href: 'projects', label: t('nav.projects') },
        { href: 'skills', label: t('nav.skills') },
        { href: 'experience', label: t('nav.experience') },
        { href: 'contact', label: t('nav.contact') },
    ]

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-white shadow-md'
                : 'bg-transparent'}
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors">
                        Julie Dev
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={`#${link.href}`} className={`text-lg font-medium transition-colors ${activeSection === link.href
                                ? 'text-blue-500 underline'
                                : 'text-gray-600 hover:text-blue-400'
                                }`}>

                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-500 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={`#${link.href}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-lg font-medium text-gray-600 hover:text-blue-500 transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.nav>
    )
}

export default Navbar