'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isLight = theme === 'dark' // Invert logic for toggle button

    return (
        <button
            onClick={toggleTheme}
            className="relative p-1 w-16 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-blue-600 dark:from-indigo-900 dark:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-light-border dark:border-dark-border"
            aria-label={`Switch to ${isLight ? 'light' : 'dark'} mode`}
        >
            <div className="absolute inset-0 w-full h-full">
                {isLight ? (
                    <>
                        <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full opacity-70"></div>
                        <div className="absolute top-4 left-6 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
                        <div className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full opacity-80"></div>
                    </>
                ) : (
                    <>
                        <div className="absolute top-1 right-3 w-3 h-2 bg-gray-300 rounded-full opacity-70"></div>
                        <div className="absolute top-3 right-8 w-4 h-2 bg-gray-300 rounded-full opacity-60"></div>
                        <div className="absolute top-2 right-1 w-3 h-2 bg-gray-300 rounded-full opacity-75"></div>
                    </>
                )}
            </div>
            
            <motion.div 
                className="flex items-center justify-center w-6 h-6 rounded-full relative z-10"
                initial={false}
                animate={{ 
                    x: isLight ? 32 : 0,
                    rotate: isLight ? 180 : 0,
                    backgroundColor: isLight ? '#6B7280' : '#FBBF24'
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 180 }}
            >
                {isLight ? (
                    <FaMoon className="w-4 h-4 text-gray-200" />
                ) : (
                    <FaSun className="w-4 h-4 text-amber-600" />
                )}
            </motion.div>
        </button>
    )
}