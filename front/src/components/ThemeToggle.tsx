'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-light-surface dark:bg-dark-surface shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border dark:border-dark-border hover:scale-110 hover:bg-light-muted dark:hover:bg-dark-muted"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <FaMoon className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            ) : (
                <FaSun className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            )}
        </button>
    )
}