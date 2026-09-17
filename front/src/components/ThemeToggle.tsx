'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-light-border text-light-text-secondary transition-colors duration-fast hover:border-light-primary hover:text-light-primary dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-primary dark:hover:text-dark-primary"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
