'use client'

interface SkillCategory {
    id: number
    title: string
    icon: string
    skills: string[]
}

export default function Skills() {

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
        <section id="skills" className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Tecnologías & Habilidades</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Las herramientas y tecnologías que domino para crear experiencias web excepcionales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            {/* Header de la categoría */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                            </div>

                            {/* Lista de habilidades */}
                            <div className="space-y-3">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                    >
                                        <span className="text-gray-700 font-medium">{skill}</span>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
