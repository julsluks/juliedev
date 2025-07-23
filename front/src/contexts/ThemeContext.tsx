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
                // Detectar preferencia del sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                const initialTheme = prefersDark ? 'dark' : 'light'
                setTheme(initialTheme)
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(initialTheme)
                localStorage.setItem('theme', initialTheme)
            }
        }
        setIsLoading(false)
    }, [])

    // Evitar hydration mismatch
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
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