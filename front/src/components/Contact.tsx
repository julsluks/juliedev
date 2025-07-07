'use client'

import { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaGithub } from 'react-icons/fa'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí puedes implementar el envío del formulario
        // Por ahora, simplemente redirige al email con los datos
        const emailBody = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`
        window.open(`mailto:julievillegas77@gmail.com?subject=${formData.subject}&body=${emailBody}`)
    }

    return (
        <section id="contact" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        ¿Tienes un proyecto en mente? ¡Trabajemos juntos para hacerlo realidad!
                    </p>
                    <div className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        💼 Trabajemos juntos
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaEnvelope className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Email</p>
                                        <a
                                            href="mailto:julievillegas77@gmail.com"
                                            className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                                        >
                                            julievillegas77@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Ubicación</p>
                                        <p className="text-gray-900 font-medium">Barcelona, España</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaLinkedin className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600">LinkedIn</p>
                                        <a
                                            href="https://linkedin.com/in/julievillegas77"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                                        >
                                            /in/julievillegas77
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaGithub className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600">GitHub</p>
                                        <a
                                            href="https://github.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                                        >
                                            github.com/julievillegas
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Disponibilidad */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-800 font-semibold">Disponible para nuevos proyectos</span>
                            </div>
                            <p className="text-green-700 mt-2">
                                Actualmente acepto proyectos freelance y oportunidades laborales en modalidad remota o híbrida.
                            </p>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíame un mensaje</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asunto *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Asunto del mensaje"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Cuéntame sobre tu proyecto..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Enviar Mensaje 📧
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
