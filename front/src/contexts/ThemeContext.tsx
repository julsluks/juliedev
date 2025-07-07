'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    const toggleTheme = useMemo(() => {
        return () => {
            const newTheme = theme === 'light' ? 'dark' : 'light'
            setTheme(newTheme)
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme)
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(newTheme)
            }
        }
    }, [theme])

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

    // Inicializar tema
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                setTheme(savedTheme)
                document.documentElement.classList.add(savedTheme)
            } else {
                // Detectar preferencia del sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                const initialTheme = prefersDark ? 'dark' : 'light'
                setTheme(initialTheme)
                document.documentElement.classList.add(initialTheme)
            }
        }
        setMounted(true)
    }, [])

    // Evitar hydration mismatch
    if (!mounted) {
        return (
            <ThemeContext.Provider value={value}>
                <div className="min-h-screen bg-white dark:bg-gray-900">
                    {children}
                </div>
            </ThemeContext.Provider>
        )
    }

    return (
        <ThemeContext.Provider value={value}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
