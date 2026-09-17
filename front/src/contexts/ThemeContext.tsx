'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    isLoading: boolean
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
    const [isLoading, setIsLoading] = useState(true)

    // Toggle theme function - sin useMemo para evitar problemas
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            
            // Guardar en localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme)
                
                // Actualizar clases del documento
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(newTheme)
            }
            
            return newTheme
        })
    }, [])

    // Inicializar tema
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme
            
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                setTheme(savedTheme)
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(savedTheme)
            } else {
                // Primary experience is light (DESIGN.md); dark is polish/toggle
                setTheme('light')
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add('light')
                localStorage.setItem('theme', 'light')
            }
        }
        setIsLoading(false)
    }, [])

    // Evitar hydration mismatch
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-light-border border-t-light-primary dark:border-dark-border dark:border-t-dark-primary" />
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
            <div className={theme === 'dark' ? 'dark' : ''}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}