'use client'

import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '@/contexts/ThemeContext'

export default function Hero() {
    const [mounted, setMounted] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToNextSection = () => {
        const nextSection = document.getElementById('projects')
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-accent-light to-primary-light dark:from-primary-dark dark:via-accent-dark dark:to-primary-dark text-text-light dark:text-text-dark overflow-hidden">
            {/* Botón de tema en la esquina superior derecha */}
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 z-20 p-3 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? (
                    <FaMoon className="text-xl text-primary-light dark:text-primary-dark" />
                ) : (
                    <FaSun className="text-xl text-accent-light dark:text-accent-dark" />
                )}
            </button>

            {/* Fondo animado con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-accent-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:via-accent-dark/20 dark:to-secondary-dark/20 animate-pulse"></div>
            
            {/* Partículas flotantes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {mounted && Array.from({ length: 20 }, (_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Contenido principal - Completamente centrado */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl w-full">
                    {/* Avatar o imagen */}
                    <div className="mb-8 relative flex justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center text-6xl font-bold text-primary-light dark:text-primary-dark">
                                JV
                            </div>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark rounded-full blur opacity-30 animate-pulse"></div>
                    </div>

                    {/* Saludo animado */}
                    <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary-light via-accent-light to-secondary-light dark:from-primary-dark dark:via-accent-dark dark:to-secondary-dark bg-clip-text text-transparent leading-tight">
                            Hola, soy Julie Villegas
                        </h1>
                    </div>

                    {/* Descripción */}
                    <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-text-light/80 dark:text-text-dark/80 font-light leading-relaxed max-w-3xl mx-auto">
                            <span className="text-primary-light dark:text-primary-dark font-semibold">Desarrolladora Full Stack</span> enfocada en el{' '}
                            <span className="text-accent-light dark:text-accent-dark font-semibold">diseño front-end</span> y{' '}
                            <span className="text-secondary-light dark:text-secondary-dark font-semibold">experiencia de usuario</span>
                        </p>
                    </div>

                    {/* Enlaces sociales mejorados */}
                    <div className={`transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-12`}>
                        <div className="flex justify-center gap-6">
                            <a 
                                href="mailto:julievillegas77@gmail.com" 
                                aria-label="email"
                                className="group relative p-4 bg-gradient-to-r from-primary-light to-primary-light/80 dark:from-primary-dark dark:to-primary-dark/80 rounded-full shadow-lg hover:shadow-primary-light/25 dark:hover:shadow-primary-dark/25 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                            >
                                <FaEnvelope className="text-2xl text-surface-light dark:text-surface-dark group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -inset-2 bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </a>
                            <a 
                                href="https://linkedin.com/in/julievillegas77" 
                                target="_blank" 
                                aria-label="linkedin"
                                className="group relative p-4 bg-gradient-to-r from-accent-light to-accent-light/80 dark:from-accent-dark dark:to-accent-dark/80 rounded-full shadow-lg hover:shadow-accent-light/25 dark:hover:shadow-accent-dark/25 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                            >
                                <FaLinkedin className="text-2xl text-surface-light dark:text-surface-dark group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -inset-2 bg-gradient-to-r from-accent-light to-secondary-light dark:from-accent-dark dark:to-secondary-dark rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </a>
                            <a 
                                href="https://github.com/" 
                                target="_blank" 
                                aria-label="github"
                                className="group relative p-4 bg-gradient-to-r from-secondary-light to-secondary-light/80 dark:from-secondary-dark dark:to-secondary-dark/80 rounded-full shadow-lg hover:shadow-secondary-light/25 dark:hover:shadow-secondary-dark/25 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                            >
                                <FaGithub className="text-2xl text-surface-light dark:text-surface-dark group-hover:text-white transition-colors duration-300" />
                                <div className="absolute -inset-2 bg-gradient-to-r from-secondary-light to-primary-light dark:from-secondary-dark dark:to-primary-dark rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </a>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className={`transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} mb-16`}>
                        <button 
                            onClick={scrollToNextSection}
                            className="relative group px-8 py-4 bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark rounded-full font-semibold text-lg shadow-xl hover:shadow-primary-light/25 dark:hover:shadow-primary-dark/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-surface-light dark:text-surface-dark"
                        >
                            Ver mis proyectos
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    <div className={`transition-all duration-1000 delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <button 
                            onClick={scrollToNextSection}
                            className="animate-bounce text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
                            aria-label="Scroll to next section"
                        >
                            <FaChevronDown className="text-2xl mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
