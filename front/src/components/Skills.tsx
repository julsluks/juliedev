'use client'

import { useTheme } from '@/contexts/ThemeContext'

interface SkillCategory {
    id: number
    title: string
    icon: string
    skills: string[]
}

export default function Skills() {
    const { theme } = useTheme()

    const skillCategories: SkillCategory[] = [
        {
            id: 1,
            title: "Frontend",
            icon: "🎨",
            skills: [
                "JavaScript",
                "TypeScript",
                "React",
                "Vue.js",
                "Next.js",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "SASS/SCSS"
            ]
        },
        {
            id: 2,
            title: "Backend",
            icon: "⚙️",
            skills: [
                "Node.js",
                "PHP",
                "Python",
                "Express.js",
                "Laravel",
                "API REST",
                "GraphQL",
                "Microservicios"
            ]
        },
        {
            id: 3,
            title: "Bases de Datos",
            icon: "🗄️",
            skills: [
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Firebase",
                "Redis",
                "SQLite"
            ]
        },
        {
            id: 4,
            title: "Herramientas & DevOps",
            icon: "🛠️",
            skills: [
                "Git",
                "GitHub",
                "Docker",
                "AWS",
                "Vercel",
                "Webpack",
                "Vite",
                "Jest",
                "Cypress"
            ]
        },
        {
            id: 5,
            title: "Diseño & 3D",
            icon: "🎭",
            skills: [
                "Figma",
                "Adobe XD",
                "Three.js",
                "Blender",
                "UI/UX Design",
                "Responsive Design"
            ]
        }
    ]

    return (
        <section id="skills" className={`py-20 px-4 transition-all duration-500 ${
            theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
        }`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>Tecnologías & Habilidades</h2>
                    <p className={`text-xl max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                        Las herramientas y tecnologías que domino para crear experiencias web excepcionales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div
                            key={category.id}
                            className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
                                theme === 'dark' ? 'bg-dark-background shadow-dark' : 'bg-light-background shadow-light'
                            }`}
                        >
                            {/* Header de la categoría */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
                                }`}>{category.title}</h3>
                            </div>

                            {/* Lista de habilidades */}
                            <div className="space-y-3">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                                            theme === 'dark' 
                                                ? 'bg-dark-muted hover:bg-dark-surface' 
                                                : 'bg-light-muted hover:bg-blue-50'
                                        }`}
                                    >
                                        <span className={`font-medium ${
                                            theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                                        }`}>{skill}</span>
                                        <div className={`w-2 h-2 rounded-full ${
                                            theme === 'dark' ? 'bg-dark-primary' : 'bg-light-primary'
                                        }`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sección adicional de soft skills */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Soft Skills</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Trabajo en equipo",
                            "Resolución de problemas",
                            "Comunicación efectiva",
                            "Aprendizaje continuo",
                            "Metodologías ágiles",
                            "Liderazgo",
                            "Creatividad",
                            "Adaptabilidad"
                        ].map((softSkill) => (
                            <span
                                key={softSkill}
                                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                            >
                                {softSkill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
