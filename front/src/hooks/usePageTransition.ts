import { useState } from 'react'

export const usePageTransition = () => {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [currentSection, setCurrentSection] = useState('home')

    const triggerTransition = (targetSection: string) => {
        setIsTransitioning(true)
        
        // Efecto de transición visual
        setTimeout(() => {
            setCurrentSection(targetSection)
        }, 150)
        
        setTimeout(() => {
            setIsTransitioning(false)
        }, 300)
    }

    return {
        isTransitioning,
        currentSection,
        triggerTransition
    }
}
