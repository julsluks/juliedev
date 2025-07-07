'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
                <FaSun className="w-5 h-5 text-yellow-500" />
            )}
        </button>
    )
}
