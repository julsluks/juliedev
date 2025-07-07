'use client'

interface ExperienceItem {
    id: number
    title: string
    company: string
    period: string
    description: string[]
    type: 'work' | 'education'
}

const TimelineItem = ({ item, isLast }: { item: ExperienceItem, isLast: boolean }) => (
    <div className="relative flex items-start mb-8">
        {/* Línea vertical */}
        {!isLast && (
            <div className="absolute left-4 top-8 w-0.5 h-full bg-blue-200"></div>
        )}

        {/* Punto del timeline */}
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 relative z-10">
            <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>

        {/* Contenido */}
        <div className="flex-grow bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <span className="text-sm text-blue-600 font-medium">{item.period}</span>
            </div>
            <h4 className="text-lg text-gray-700 mb-3">{item.company}</h4>
            <ul className="space-y-1">
                {item.description.map((desc, index) => (
                    <li key={`${item.id}-desc-${index}`} className="text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2 mt-1.5 flex-shrink-0">•</span>
                        {desc}
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

export default function Experience() {

    const experiences: ExperienceItem[] = [
        // Experiencia laboral
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
        {
            id: 3,
            title: "Web Developer",
            company: "Egar10",
            period: "2021 - 2022",
            description: [
                "Desarrollo de sitios web corporativos y e-commerce",
                "Mantenimiento y actualización de sistemas existentes",
                "Soporte técnico a clientes"
            ],
            type: "work"
        },
        // Educación
        {
            id: 4,
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
            id: 5,
            title: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
            company: "Centro de Formación Profesional",
            period: "2018 - 2020",
            description: [
                "Programación orientada a objetos",
                "Desarrollo de aplicaciones móviles",
                "Gestión de bases de datos"
            ],
            type: "education"
        },
        {
            id: 6,
            title: "Bachillerato",
            company: "Instituto de Educación Secundaria",
            period: "2016 - 2018",
            description: [
                "Bachillerato científico-tecnológico",
                "Bases de matemáticas y ciencias"
            ],
            type: "education"
        }
    ]

    const workExperience = experiences.filter(exp => exp.type === 'work')
    const education = experiences.filter(exp => exp.type === 'education')

    return (
        <section id="experience" className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Experiencia & Educación</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Mi trayectoria profesional y formación académica en el mundo del desarrollo web.
                    </p>
                </div>

                {/* Experiencia Laboral */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">💼 Experiencia Laboral</h3>
                    <div className="relative">
                        {workExperience.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                isLast={index === workExperience.length - 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Educación */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">🎓 Educación</h3>
                    <div className="relative">
                        {education.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                isLast={index === education.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
