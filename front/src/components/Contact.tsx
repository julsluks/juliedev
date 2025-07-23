'use client'

import { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaGithub, FaCopy, FaCheck } from 'react-icons/fa'
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'

export default function Contact() {
    const { theme } = useTheme()
    const { t } = useTranslation('common')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [emailCopied, setEmailCopied] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const emailBody = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`
        window.open(`mailto:${t('email')}?subject=${formData.subject}&body=${emailBody}`)
    }

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(t('email'))
            setEmailCopied(true)
            setTimeout(() => setEmailCopied(false), 2000)
        } catch (err) {
            console.error('Error al copiar email:', err)
        }
    }

    return (
        <section id="contact" className={`py-20 px-4 transition-all duration-500 ${
            theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
        }`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('nav.contact')}
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        ¿Tienes un proyecto en mente? ¡Trabajemos juntos para hacerlo realidad!
                    </motion.p>
                    
                    {/* Email prominente con botón de copiar mejorado */}
                    <motion.div 
                        className="inline-flex items-center gap-4 px-6 py-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg shadow-lg mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <FaEnvelope className="text-xl" />
                        <span className="text-lg font-semibold">{t('email')}</span>
                        <motion.button
                            onClick={copyEmail}
                            className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {emailCopied ? (
                                <>
                                    <FaCheck className="text-green-300" />
                                    <span className="text-sm">{t('emailCopied')}</span>
                                </>
                            ) : (
                                <>
                                    <FaCopy />
                                    <span className="text-sm">{t('copyEmail')}</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                    
                    <motion.div
                        className="inline-block px-8 py-3 bg-light-secondary dark:bg-dark-secondary text-white text-lg font-semibold rounded-lg hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        💼 Trabajemos juntos
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Información de contacto mejorada */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                                Información de Contacto
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center">
                                        <FaEnvelope className="text-light-primary dark:text-dark-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">Email</p>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`mailto:${t('email')}`}
                                                className="text-light-text-primary dark:text-dark-text-primary font-medium hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                                            >
                                                {t('email')}
                                            </a>
                                            <button
                                                onClick={copyEmail}
                                                className="p-1 text-light-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                                                title={t('copyEmail')}
                                            >
                                                {emailCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-light-primary dark:text-dark-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">Ubicación</p>
                                        <p className="text-light-text-primary dark:text-dark-text-primary font-medium">Barcelona, España</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center">
                                        <FaLinkedin className="text-light-primary dark:text-dark-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">LinkedIn</p>
                                        <a
                                            href="https://linkedin.com/in/julievillegas77"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-light-text-primary dark:text-dark-text-primary font-medium hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                                        >
                                            /in/julievillegas77
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center">
                                        <FaGithub className="text-light-primary dark:text-dark-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">GitHub</p>
                                        <a
                                            href="https://github.com/julsluks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-light-text-primary dark:text-dark-text-primary font-medium hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                                        >
                                            github.com/julsluks
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Disponibilidad */}
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-800 dark:text-green-300 font-semibold">Disponible para nuevos proyectos</span>
                            </div>
                            <p className="text-green-700 dark:text-green-400 mt-2">
                                Actualmente acepto proyectos freelance y oportunidades laborales en modalidad remota o híbrida.
                            </p>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                            Envíame un mensaje
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                        placeholder="tu.email@ejemplo.com"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    Asunto *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                    placeholder="¿En qué puedo ayudarte?"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary resize-none"
                                    placeholder="Cuéntame sobre tu proyecto..."
                                />
                            </div>
                            
                            <motion.button
                                type="submit"
                                className="w-full px-6 py-4 bg-light-primary dark:bg-dark-primary text-white font-semibold rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Enviar mensaje
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}