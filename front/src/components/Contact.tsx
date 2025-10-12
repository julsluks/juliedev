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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Error sending email:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            // Limpiar el status después de 5 segundos
            setTimeout(() => setSubmitStatus(null), 5000)
        }
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

    // Funciones auxiliares para el botón
    const getButtonClassName = () => {
        if (isSubmitting) return 'bg-gray-400 cursor-not-allowed'
        if (submitStatus === 'success') return 'bg-green-500 hover:bg-green-600'
        if (submitStatus === 'error') return 'bg-red-500 hover:bg-red-600'
        return 'bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary'
    }

    const getButtonContent = () => {
        if (isSubmitting) {
            return (
                <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t('contact_form.sending')}
                </div>
            )
        }
        if (submitStatus === 'success') {
            return (
                <div className="flex items-center justify-center gap-2">
                    <FaCheck />
                    {t('contact_form.sent')}
                </div>
            )
        }
        if (submitStatus === 'error') {
            return (
                <div className="flex items-center justify-center gap-2">
                    <FaEnvelope />
                    {t('contact_form.error')}
                </div>
            )
        }
        return t('sendButton')
    }

    return (
        <section id="contact" className={`min-h-screen py-20 px-4 transition-all duration-500 scroll-mt-20 flex items-center relative overflow-hidden ${
            theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
        }`}>
            {/* Fondo decorativo mejorado */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradiente principal */}
                <div className={`absolute inset-0 ${
                    theme === 'dark' 
                        ? 'bg-gradient-to-br from-dark-primary/5 via-transparent to-dark-secondary/5' 
                        : 'bg-gradient-to-br from-light-primary/5 via-transparent to-light-secondary/5'
                }`} />
                
                {/* Patrón de puntos */}
                <div className={`absolute inset-0 opacity-20 ${
                    theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
                }`} 
                style={{
                    backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#ffffff10' : '#00000010'} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }} />
                
                {/* Formas geométricas flotantes */}
                <motion.div 
                    className={`absolute top-1/4 left-10 w-20 h-20 rounded-full ${
                        theme === 'dark' ? 'bg-dark-primary/10' : 'bg-light-primary/10'
                    } blur-xl`}
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className={`absolute bottom-1/4 right-16 w-32 h-32 rounded-full ${
                        theme === 'dark' ? 'bg-dark-secondary/10' : 'bg-light-secondary/10'
                    } blur-2xl`}
                    animate={{
                        y: [0, 15, 0],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className={`absolute top-1/2 right-1/4 w-16 h-16 ${
                        theme === 'dark' ? 'bg-dark-primary/15' : 'bg-light-primary/15'
                    } rotate-45 blur-lg`}
                    animate={{
                        rotate: [45, 90, 45],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
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
                        {t('contactSubtitle')}
                    </motion.p>
                    
                    {/* Email prominente con botón de copiar mejorado */}
                    <motion.div 
                        className="flex flex-col items-center gap-4 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-4 px-6 py-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg shadow-lg">
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
                        </div>
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
                                {t('contactInfo')}
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
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">{t('location')}</p>
                                        <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{t('locationValue')}</p>
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
                                <span className="text-green-800 dark:text-green-300 font-semibold">{t('available')}</span>
                            </div>
                            <p className="text-green-700 dark:text-green-400 mt-2">
                                {t('availableDesc')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div
                        id="contact-form"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                            {t('sendMessageTitle')}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        {t('name')} {t('required')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                        placeholder={t('namePlaceholder')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        Email {t('required')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                        placeholder={t('emailPlaceholder')}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('subject')} {t('required')}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                                    placeholder={t('subjectPlaceholder')}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('message')} {t('required')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent outline-none transition-all bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary resize-none"
                                    placeholder={t('messagePlaceholder')}
                                />
                            </div>
                            
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full px-6 py-4 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl ${getButtonClassName()}`}
                                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                                {getButtonContent()}
                            </motion.button>
                            
                            {/* Mensaje de feedback */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 dark:text-green-400 text-center mt-2"
                                >
                                    {t('contact_form.successMessage')}
                                </motion.div>
                            )}
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-600 dark:text-red-400 text-center mt-2"
                                >
                                    {t('contact_form.errorMessage')}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}