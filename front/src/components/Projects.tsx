'use client'

import { useTheme } from '@/contexts/ThemeContext'

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

    // Datos de ejemplo - luego puedes moverlos a un archivo separado o API
    const projects: Project[] = [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "Plataforma de comercio electrónico completa con carrito de compras, pagos y gestión de inventario.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/usuario/proyecto",
            image: "/placeholder-project.jpg"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Aplicación de gestión de tareas con drag & drop, notificaciones y colaboración en tiempo real.",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/usuario/proyecto",
            image: "/placeholder-project.jpg"
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "Sitio web personal con animaciones 3D, diseño responsive y múltiples idiomas.",
            technologies: ["Next.js", "Three.js", "TypeScript", "Tailwind CSS"],
            demoLink: "https://demo.com",
            repoLink: "https://github.com/usuario/proyecto",
            image: "/placeholder-project.jpg"
        }
    ]

    return (
        <section id="projects" className={`py-20 px-4 transition-theme ${
            theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
        }`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>Proyectos</h2>
                    <p className={`text-xl max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                        Una selección de mis trabajos más recientes, donde aplico las mejores prácticas de desarrollo web.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
                            theme === 'dark' ? 'bg-dark-background shadow-dark' : 'bg-light-background shadow-light'
                        }`}>
                            {/* Imagen del proyecto */}
                            <div className={`h-48 flex items-center justify-center ${
                                theme === 'dark' ? 'bg-dark-muted' : 'bg-light-muted'
                            }`}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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
                            <div className="p-6">
                                <h3 className={`text-xl font-semibold mb-2 ${
                                    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                                }`}>{project.title}</h3>
                                <p className={`mb-4 ${
                                    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                                }`}>{project.description}</p>

                                {/* Tecnologías */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className={`px-3 py-1 text-sm rounded-full ${
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

                                {/* Enlaces */}
                                <div className="flex gap-4">
                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                                theme === 'dark' 
                                                    ? 'bg-dark-primary text-white hover:bg-dark-primary/80' 
                                                    : 'bg-light-primary text-white hover:bg-light-primary/80'
                                            }`}
                                        >
                                            Ver Demo
                                        </a>
                                    )}
                                    {project.repoLink && (
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-4 py-2 border rounded-lg transition-colors font-medium ${
                                                theme === 'dark' 
                                                    ? 'border-dark-border text-dark-text-primary hover:bg-dark-muted' 
                                                    : 'border-light-border text-light-text-primary hover:bg-light-muted'
                                            }`}
                                        >
                                            Código
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
