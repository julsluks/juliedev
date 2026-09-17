'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Copy, Check, Download } from 'lucide-react'
import { fadeRise, motionSafe } from '@/lib/motion'
import { CV_DOWNLOAD_NAME, CV_HREF, GITHUB_URL, LINKEDIN_URL } from '@/lib/links'
import { trackCvDownload, trackLinkedInClick } from '@/components/GoogleAnalytics'

export default function Contact() {
  const { theme } = useTheme()
  const { t } = useTranslation('common')
  const prefersReduced = useReducedMotion()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [emailCopied, setEmailCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t('email'))
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const fieldClass =
    'w-full rounded-md border border-light-border bg-light-surface px-3 py-2.5 text-light-text-primary outline-none transition-colors focus:border-light-primary dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-dark-primary'

  return (
    <section
      id="contact"
      className={`scroll-mt-20 px-4 py-20 transition-colors ${
        theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div {...(prefersReduced ? {} : motionSafe)} variants={fadeRise} className="mb-14">
          <h2 className="section-heading">{t('contact')}</h2>
          <p className="section-lede">{t('contactSubtitle')}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.aside
            {...(prefersReduced ? {} : motionSafe)}
            variants={fadeRise}
            className="space-y-6 lg:col-span-2"
          >
            <div className="rounded-md border border-light-border bg-light-background p-5 dark:border-dark-border dark:bg-dark-background">
              <p className="text-sm font-medium text-light-primary dark:text-dark-primary">
                {t('available')}
              </p>
              <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {t('availableDesc')}
              </p>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-light-primary dark:text-dark-primary" />
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="truncate text-light-text-primary dark:text-dark-text-primary">
                    {t('email')}
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="cursor-pointer rounded p-1 text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
                    title={t('copyEmail')}
                  >
                    {emailCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-light-primary dark:text-dark-primary" />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  {t('locationValue')}
                </span>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-3 text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-3 font-medium text-light-primary hover:opacity-80 dark:text-dark-primary"
                  onClick={() => trackLinkedInClick('contact')}
                >
                  <Linkedin className="h-4 w-4" />
                  {t('linkedin')}
                </a>
              </li>
            </ul>

            <a
              href={CV_HREF}
              download={CV_DOWNLOAD_NAME}
              className="btn-ghost w-full gap-2 sm:w-auto"
              onClick={() => trackCvDownload('contact')}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              {t('downloadCv')}
            </a>
          </motion.aside>

          <motion.form
            {...(prefersReduced ? {} : motionSafe)}
            variants={fadeRise}
            onSubmit={handleSubmit}
            className="space-y-4 lg:col-span-3"
          >
            <h3 className="font-display text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
              {t('sendMessageTitle')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-light-text-secondary dark:text-dark-text-secondary">
                  {t('name')}
                </span>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('namePlaceholder')}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-light-text-secondary dark:text-dark-text-secondary">
                  {t('email')}
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  className={fieldClass}
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block text-light-text-secondary dark:text-dark-text-secondary">
                {t('subject')}
              </span>
              <input
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('subjectPlaceholder')}
                className={fieldClass}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-light-text-secondary dark:text-dark-text-secondary">
                {t('message')}
              </span>
              <textarea
                required
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                className={fieldClass}
              />
            </label>

            {submitStatus === 'success' && (
              <p className="text-sm text-green-700 dark:text-green-400" role="status">
                {t('contact_form.successMessage')}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {t('contact_form.errorMessage')}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
              {isSubmitting
                ? t('contact_form.sending')
                : submitStatus === 'success'
                  ? t('contact_form.sent')
                  : t('sendButton')}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
