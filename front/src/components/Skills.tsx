'use client'

import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface SkillItem {
    name: string
    icon: string
}

interface SkillCategory {
    id: string
    titleKey: string
    icon: string
    skills: SkillItem[]
}

// Componente de Pill interactiva y arrastrable
const DraggablePill = ({ skill, index }: { skill: SkillItem; index: number }) => {
    const [clickCount, setClickCount] = useState(0)

    const handleClick = () => {
        setClickCount(prev => prev + 1)

        // Si hace 3 clicks, vuelve a su sitio
        if (clickCount >= 2) {
            setClickCount(0)
        }
    }

    // Calcular límites dinámicos basados en el tamaño de la ventana
    const getConstraints = () => {
        if (typeof window !== 'undefined') {
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight
            
            return {
                left: -(screenWidth * 0.4), // 40% de la pantalla hacia la izquierda
                right: screenWidth * 0.4,   // 40% de la pantalla hacia la derecha
                top: -(screenHeight * 0.3), // 30% de la pantalla hacia arriba
                bottom: screenHeight * 0.3  // 30% de la pantalla hacia abajo
            }
        }
        return { left: -300, right: 300, top: -200, bottom: 200 } // fallback
    }

    return (
        <motion.div
            className="relative cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: clickCount >= 2 ? 0 : undefined, // Vuelve a posición inicial al 3er click
                y: clickCount >= 2 ? 0 : undefined  // Vuelve a posición inicial al 3er click
            }}
            transition={{
                duration: 0.3,
                delay: index * 0.05
            }}
            whileHover={{
                scale: 1.2,
                rotate: [0, -5, 5, -3, 3, 0],
                transition: { duration: 0.4 }
            }}
            whileTap={{
                scale: 0.85,
                transition: { duration: 0.1 }
            }}
            drag
            dragConstraints={getConstraints()}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
            onDragStart={() => {
                document.body.style.cursor = 'grabbing'
            }}
            onDragEnd={() => {
                document.body.style.cursor = 'default'
            }}
            onClick={handleClick}
        >
            <motion.div
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/15 to-purple-500/15 dark:from-blue-400/25 dark:to-purple-400/25 backdrop-blur-sm rounded-full border-2 border-blue-200/40 dark:border-blue-400/40 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
                    borderColor: "rgba(59, 130, 246, 0.7)",
                    boxShadow: "0 12px 50px rgba(59, 130, 246, 0.5)",
                }}
                animate={{
                    y: [0, -4, 0],
                }}
                transition={{
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.span
                    className="text-2xl"
                    whileHover={{
                        scale: 1.4,
                        rotate: [0, 20, -20, 15, -15, 0],
                        transition: { duration: 0.6 }
                    }}
                    whileTap={{
                        scale: 1.6,
                        rotate: 720,
                        transition: { duration: 0.4 }
                    }}
                >
                    {skill.icon}
                </motion.span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                    {skill.name}
                </span>

                {/* Efectos de partículas solo en hover */}
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`particle-${skill.name}-${i}`}
                            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                            style={{
                                left: `${15 + i * 10}%`,
                                top: `${25 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                scale: [0, 1.2, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 1.8,
                                delay: i * 0.1,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default function Skills() {
    const { t } = useTranslation('common')
    const { theme } = useTheme()
    const [activeCategory, setActiveCategory] = useState<string>('frontend')

    const skillCategories: SkillCategory[] = [
        {
            id: 'frontend',
            titleKey: 'skillsFrontend',
            icon: '⚛️',
            skills: [
                { name: 'React', icon: '⚛️' },
                { name: 'Vue.js', icon: '🟢' },
                { name: 'Node.js', icon: '�' },
                { name: 'TypeScript', icon: '�' },
                { name: 'JavaScript', icon: '🟨' },
                { name: 'Angular', icon: '�️' },
                { name: 'Next.js', icon: '▲' },
                { name: 'Tailwind CSS', icon: '�' }
            ]
        },
        {
            id: 'backend',
            titleKey: 'skillsBackend',
            icon: '🔧',
            skills: [
                { name: 'Node.js', icon: '�' },
                { name: 'Laravel', icon: '�' },
                { name: 'PHP', icon: '�' },
                { name: 'API REST', icon: '🔗' },
                { name: 'MySQL', icon: '🗄️' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'MongoDB', icon: '🍃' },
                { name: 'GraphQL', icon: '📊' }
            ]
        },
        {
            id: 'tools',
            titleKey: 'skillsTools',
            icon: '�️',
            skills: [
                { name: 'Git', icon: '📚' },
                { name: 'Docker', icon: '🐋' },
                { name: 'AWS', icon: '☁️' },
                { name: 'Figma', icon: '🎨' },
                { name: 'Webpack', icon: '📦' },
                { name: 'Vite', icon: '⚡' },
                { name: 'Jest', icon: '🃏' },
                { name: 'Cypress', icon: '🌲' }
            ]
        }
    ]

    const softSkills = [
        { key: 'teamwork', icon: '🤝' },
        { key: 'problemSolving', icon: '🧩' },
        { key: 'communication', icon: '💬' },
        { key: 'continuousLearning', icon: '📚' },
        { key: 'agileMethodologies', icon: '🔄' },
        { key: 'leadership', icon: '👑' },
        { key: 'creativity', icon: '💡' },
        { key: 'adaptability', icon: '🌟' }
    ]

    return (
        <section id="skills" className={`relative min-h-screen py-20 px-4 transition-all duration-500 scroll-mt-20 overflow-hidden flex items-center ${theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
            }`}>
            {/* Fondo con círculos e iluminación por toda la página */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Círculos decorativos grandes por toda la página */}
                {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                        key={`page-circle-bg-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${80 + i * 25}px`,
                            height: `${80 + i * 25}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `linear-gradient(135deg, rgba(59, 130, 246, ${0.05 + Math.random() * 0.1}), rgba(147, 51, 234, ${0.05 + Math.random() * 0.1}))`,
                            filter: 'blur(1px)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 15, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 6 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}

                {/* Efectos de iluminación ambiental */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                    <div className="absolute bottom-40 right-10 w-88 h-88 bg-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Gradient overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
                            {t('skills')}
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                            {t('skillsDescription')}
                        </p>
                    </motion.div>

                    {/* Category Tabs */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {skillCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg scale-105'
                                        : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                    }`}
                            >
                                <span className="text-xl">{category.icon}</span>
                                <span>{t(category.titleKey)}</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Skills Pills - Sin círculos locales */}
                    <motion.div
                        className="relative min-h-[400px] p-8"
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Pills interactivas */}
                        <div className="relative z-10 flex flex-wrap justify-center gap-4 p-4">
                            {skillCategories
                                .find(cat => cat.id === activeCategory)
                                ?.skills.map((skill, index) => (
                                    <DraggablePill key={skill.name} skill={skill} index={index} />
                                ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills - Pills mejoradas */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">
                            {t('softSkills')}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {softSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.key}
                                    className="relative cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -3, 3, 0],
                                        transition: { duration: 0.4 }
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                        rotate: 10,
                                    }}
                                    drag
                                    dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                                    dragElastic={0.5}
                                    dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                                >
                                    <motion.div
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-orange-500/10 dark:from-pink-400/20 dark:to-orange-400/20 backdrop-blur-sm rounded-full border-2 border-pink-200/30 dark:border-pink-400/30 shadow-lg hover:shadow-xl transition-all duration-300"
                                        whileHover={{
                                            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(249, 115, 22, 0.2))",
                                            borderColor: "rgba(236, 72, 153, 0.5)",
                                            boxShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
                                        }}
                                        animate={{
                                            y: [0, -1, 0],
                                        }}
                                        transition={{
                                            duration: 2.5 + index * 0.3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <motion.span
                                            className="text-lg"
                                            whileHover={{
                                                scale: 1.3,
                                                rotate: [0, 15, -15, 0],
                                                transition: { duration: 0.6 }
                                            }}
                                        >
                                            {skill.icon}
                                        </motion.span>
                                        <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                            {t(skill.key)}
                                        </span>

                                        {/* Efectos de brillo al hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {[...Array(4)].map((_, i) => (
                                                <motion.div
                                                    key={`soft-particle-${skill.key}-${i}`}
                                                    className="absolute w-1 h-1 bg-pink-400 rounded-full"
                                                    style={{
                                                        left: `${25 + i * 20}%`,
                                                        top: `${35 + (i % 2) * 30}%`,
                                                    }}
                                                    animate={{
                                                        scale: [0, 1.2, 0],
                                                        opacity: [0, 1, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1.2,
                                                        delay: i * 0.15,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Indicador de interacción para soft skills */}
                        <motion.div
                            className="mt-8 flex justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="px-6 py-3 bg-gradient-to-r from-pink-100/90 to-orange-100/90 dark:from-pink-900/40 dark:to-orange-900/40 backdrop-blur-sm rounded-full text-sm text-gray-700 dark:text-gray-300 font-medium text-center">
                                <span>{t('softSkillsInteraction')}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
