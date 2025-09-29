'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'

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
                    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>{item.title}</h3>
                <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-primary' : 'text-light-primary'
                }`}>{item.period}</span>
            </div>
            <h4 className={`text-lg mb-3 ${
                theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>{item.company}</h4>
            <ul className="space-y-1">
                {item.description.map((desc, index) => (
                    <li key={`${item.id}-desc-${index}`} className={`flex items-start ${
                        theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
                    }`}>
                        <span className={`mr-2 mt-1.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-dark-secondary' : 'text-light-secondary'
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

    const experiences: ExperienceItem[] = [
        // Experiencia laboral - Solo 2 trabajos principales
        {
            id: 1,
            title: "Desarrolladora Full Stack",
            company: "ACCELERALIA",
            period: "2023 - Presente",
            description: [
                "Desarrollo de aplicaciones web con React y Node.js",
                "Implementación de APIs RESTful y microservicios",
                "Colaboración en equipos ágiles usando metodologías Scrum"
            ],
            type: "work"
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "Storyville",
            period: "2022 - 2023",
            description: [
                "Desarrollo de interfaces de usuario responsivas con Vue.js",
                "Optimización de rendimiento y experiencia de usuario",
                "Integración con APIs y servicios de terceros"
            ],
            type: "work"
        },
        // Educación
        {
            id: 3,
            title: "CFGS Desarrollo de Aplicaciones Web (DAW)",
            company: "Centro de Formación Profesional",
            period: "2020 - 2022",
            description: [
                "Desarrollo web full stack",
                "Bases de datos y sistemas de gestión",
                "Metodologías de desarrollo ágil"
            ],
            type: "education"
        },
        {
            id: 4,
            title: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
            company: "Centro de Formación Profesional",
            period: "2018 - 2020",
            description: [
                "Programación orientada a objetos",
                "Desarrollo de aplicaciones móviles",
                "Gestión de bases de datos"
            ],
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
                    <h2 className={`text-4xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>{t('experienceTitle')}</h2>
                    <p className={`text-xl max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                        {t('experienceDescription')}
                    </p>
                </div>

                {/* Experiencia Laboral */}
                <div className="mb-16">
                    <h3 className={`text-2xl font-bold mb-8 text-center ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>💼 {t('workExperience')}</h3>
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
                    <h3 className={`text-2xl font-bold mb-8 text-center ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>🎓 {t('education')}</h3>
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
