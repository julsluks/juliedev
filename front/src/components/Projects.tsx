'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'

interface Project {
    id: number
    title: string
    description: string
    technologies: string[]
    demoLink?: string
    repoLink?: string
    image?: string
}

export default function Projects() {
    const { theme } = useTheme()
    const { t } = useTranslation('common')

    // Configuración de proyectos con claves de traducción
    const projectsConfig = [
        {
            id: 1,
            key: "1", // Clave para las traducciones
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/julsluks/trf-ConexusHub",
            image: "/images/projects/ecommerce.jpg" // Ruta de la imagen
        },
        {
            id: 2,
            key: "2",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/julsluks/tr-game-HighLink",
            image: "/images/projects/task-manager.jpg"
        },
        {
            id: 3,
            key: "3",
            technologies: ["Next.js", "Three.js", "TypeScript", "Tailwind CSS"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/julsluks/trf-ChromaticBond",
            image: "/images/projects/portfolio.jpg"
        }
    ]

    // Función para obtener los datos traducidos de un proyecto
    const getProjectData = (projectKey: string) => {
        const title = t(`project_${projectKey}_title`)
        const description = t(`project_${projectKey}_description`)
        
        return {
            title,
            description
        }
    }

    return (
        <section id="projects" className={`min-h-screen py-20 px-4 transition-theme scroll-mt-20 flex items-center ${
            theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
        }`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>{t('projectsTitle')}</h2>
                    <p className={`text-xl max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                        {t('projectsDescription')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsConfig.map((projectConfig) => {
                        const projectData = getProjectData(projectConfig.key)
                        return (
                            <div key={projectConfig.id} className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 flex flex-col h-full ${
                                theme === 'dark' ? 'bg-dark-background shadow-dark' : 'bg-light-background shadow-light'
                            }`}>
                                {/* Imagen del proyecto */}
                                <div className={`h-48 flex items-center justify-center ${
                                    theme === 'dark' ? 'bg-dark-muted' : 'bg-light-muted'
                                }`}>
                                    {projectConfig.image ? (
                                        <img 
                                            src={projectConfig.image} 
                                            alt={projectData.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <div className={`text-center ${
                                            theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
                                        }`}>
                                            <div className="text-4xl mb-2">🖼️</div>
                                            <p>Imagen del proyecto</p>
                                        </div>
                                    )}
                                </div>

                                {/* Contenido del proyecto */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className={`text-xl font-semibold mb-3 ${
                                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                                    }`}>
                                        {projectData.title}
                                    </h3>
                                    <p className={`mb-4 flex-1 ${
                                        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                                    }`}>
                                        {projectData.description}
                                    </p>

                                    {/* Tecnologías - Fixed height container */}
                                    <div className="mb-6 min-h-[60px] flex items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {projectConfig.technologies.map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
                                                        theme === 'dark' 
                                                            ? 'bg-dark-primary/20 text-dark-primary' 
                                                            : 'bg-light-primary/20 text-light-primary'
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Enlaces - Fixed at bottom */}
                                    <div className="flex gap-3 mt-auto">
                                        {projectConfig.demoLink && (
                                            <a
                                                href={projectConfig.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex-1 px-4 py-2.5 rounded-lg transition-colors font-medium text-center text-sm ${
                                                    theme === 'dark' 
                                                        ? 'bg-dark-primary text-white hover:bg-dark-primary/80' 
                                                        : 'bg-light-primary text-white hover:bg-light-primary/80'
                                                }`}
                                            >
                                                {t('viewDemo')}
                                            </a>
                                        )}
                                        {projectConfig.repoLink && (
                                            <a
                                                href={projectConfig.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex-1 px-4 py-2.5 border rounded-lg transition-colors font-medium text-center text-sm ${
                                                    theme === 'dark' 
                                                        ? 'border-dark-border text-dark-text-primary hover:bg-dark-muted' 
                                                        : 'border-light-border text-light-text-primary hover:bg-light-muted'
                                                }`}
                                            >
                                                {t('viewCode')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
