'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { MdWorkOutline } from 'react-icons/md'

interface ExperienceItem {
    id: number
    title: string
    company: string
    period: string
    description: string[]
    type: 'work' | 'education'
}

const TimelineItem = ({ item, isLast, theme }: { item: ExperienceItem, isLast: boolean, theme: string }) => (
    <div className="relative flex items-start mb-8">
        {/* Línea vertical */}
        {!isLast && (
            <div className={`absolute left-4 top-8 w-0.5 h-full ${
                theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'
            }`}></div>
        )}

        {/* Punto del timeline */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 relative z-10 ${
            theme === 'dark' ? 'bg-dark-primary' : 'bg-light-primary'
        }`}>
            <div className={`w-3 h-3 rounded-full ${
                theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
            }`}></div>
        </div>

        {/* Contenido */}
        <div className={`flex-grow rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-dark-surface shadow-dark' : 'bg-light-background shadow-light'
        }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{item.title}</h3>
                <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>{item.period}</span>
            </div>
            <h4 className={`text-lg mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{item.company}</h4>
            <ul className="space-y-1">
                {item.description.map((desc, index) => (
                    <li key={`${item.id}-desc-${index}`} className={`flex items-start ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                        <span className={`mr-2 mt-0.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`}>•</span>
                        {desc}
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

export default function Experience() {
    const { theme } = useTheme()
    const { t } = useTranslation('common')

    // Función para obtener datos traducidos de experiencia con número dinámico de descripciones
    const getExperienceData = (id: number) => {
        const descriptions = []
        let descIndex = 1
        
        // Obtener todas las descripciones disponibles dinámicamente
        while (true) {
            const descKey = `experience_${id}_desc_${descIndex}`
            const descValue = t(descKey)
            
            // Si la traducción devuelve la misma clave, significa que no existe
            if (descValue === descKey) {
                break
            }
            
            descriptions.push(descValue)
            descIndex++
        }
        
        return {
            title: t(`experience_${id}_title`),
            company: t(`experience_${id}_company`),
            period: t(`experience_${id}_period`),
            description: descriptions
        }
    }

    const experiences: ExperienceItem[] = [
        // Experiencia laboral
        {
            id: 1,
            ...getExperienceData(1),
            type: "work"
        },
        {
            id: 2,
            ...getExperienceData(2),
            type: "work"
        },
        // Educación
        {
            id: 3,
            ...getExperienceData(3),
            type: "education"
        },
        {
            id: 4,
            ...getExperienceData(4),
            type: "education"
        }
    ]

    const workExperience = experiences.filter(exp => exp.type === 'work')
    const education = experiences.filter(exp => exp.type === 'education')

    return (
        <section id="experience" className={`min-h-screen py-20 px-4 transition-all duration-500 scroll-mt-20 flex items-center ${
            theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
        }`}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 flex items-center justify-center gap-3 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        <MdWorkOutline className="text-blue-600 dark:text-blue-400" />
                        {t('experience_title')}
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {t('experience_subtitle')}
                    </p>
                </div>

                {/* Experiencia Laboral */}
                <div className="mb-16">
                    <h3 className={`text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                        {t('experience_work_title')}
                    </h3>
                    <div className="relative">
                        {workExperience.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                isLast={index === workExperience.length - 1}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>

                {/* Educación */}
                <div>
                    <h3 className={`text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        <FaGraduationCap className="text-green-600 dark:text-green-400" />
                        {t('experience_education_title')}
                    </h3>
                    <div className="relative">
                        {education.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                isLast={index === education.length - 1}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
