'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 ${scrolled
                    ? 'bg-light-background/90 dark:bg-dark-background/90 backdrop-blur-md shadow-sm'
                    : 'bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm'
                } transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group relative flex items-center space-x-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center justify-center w-20 h-10 rounded-lg bg-light-primary/10 dark:bg-dark-primary/10 group-hover:bg-light-primary/20 dark:group-hover:bg-dark-primary/20 transition-colors">
                            <span className="text-xl font-bold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
                                {"<JV/>"}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-1 py-2 text-sm font-medium ${pathname === link.href
                                        ? 'text-light-primary dark:text-dark-primary'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary'
                                    } transition-colors`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="desktop-nav-underline"
                                        className="absolute left-0 bottom-0 h-0.5 w-full bg-light-primary dark:bg-dark-primary"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href
                                            ? 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                                            : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-muted dark:hover:bg-dark-muted'
                                        } transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar