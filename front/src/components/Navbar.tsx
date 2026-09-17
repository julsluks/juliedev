'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main')
      if (!mainElement) return
      setScrolled(mainElement.scrollTop > 10)

      const sections = ['home', 'experience', 'projects', 'skills', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero' : section)
        if (element) {
          const elementRect = element.getBoundingClientRect()
          const mainRect = mainElement.getBoundingClientRect()
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

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'home' ? 'hero' : sectionId
    const element = document.getElementById(targetId)
    const mainElement = document.querySelector('main')
    if (element && mainElement) {
      const elementRect = element.getBoundingClientRect()
      const mainRect = mainElement.getBoundingClientRect()
      const targetPosition = elementRect.top - mainRect.top + mainElement.scrollTop
      mainElement.scrollTo({
        top: targetPosition,
        behavior: prefersReduced ? 'auto' : 'smooth',
      })
    }
    setIsOpen(false)
  }

  const navLinks = [
    { href: 'home', label: t('nav.home') },
    { href: 'experience', label: t('nav.experience') },
    { href: 'projects', label: t('nav.projects') },
    { href: 'skills', label: t('nav.skills') },
    { href: 'contact', label: t('nav.contact') },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-craft ${
        scrolled
          ? 'border-light-border/80 bg-light-background/95 backdrop-blur-md dark:border-dark-border/80 dark:bg-dark-background/95'
          : 'border-transparent bg-light-background/80 backdrop-blur-sm dark:bg-dark-background/80'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="cursor-pointer font-display text-lg font-semibold tracking-tight text-light-text-primary dark:text-dark-text-primary"
        >
          Julie Villegas
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors duration-fast ${
                activeSection === link.href
                  ? 'text-light-primary dark:text-dark-primary'
                  : 'text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="ml-3 flex items-center gap-2 border-l border-light-border pl-4 dark:border-dark-border">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-md p-2 text-light-text-secondary md:hidden dark:text-dark-text-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-light-border bg-light-background md:hidden dark:border-dark-border dark:bg-dark-background"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className={`block w-full cursor-pointer rounded-md px-3 py-3 text-left text-sm font-medium ${
                    activeSection === link.href
                      ? 'bg-light-accent-soft text-light-primary dark:bg-dark-accent-soft dark:text-dark-primary'
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-light-border pt-3 dark:border-dark-border">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {t('language')} / {theme === 'light' ? t('lightMode') : t('darkMode')}
                </span>
                <div className="flex gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
