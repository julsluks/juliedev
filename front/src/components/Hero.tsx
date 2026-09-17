'use client'

import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { craftTransition, fadeRise, staggerChildren } from '@/lib/motion'

const Hero = () => {
  const { t } = useTranslation('common')
  const prefersReduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const brandName = t('greeting').includes(',')
    ? t('greeting').split(',').slice(1).join(',').trim()
    : 'Julie Villegas'

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t('email'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-light-background px-4 py-16 dark:bg-dark-background"
    >
      <div className="hero-grain" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-light-border/80 dark:border-dark-border/80"
        initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={craftTransition}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-20 -left-16 h-48 w-48 rounded-full bg-light-accent-soft/60 dark:bg-dark-accent-soft/40"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...craftTransition, delay: 0.12 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          variants={staggerChildren}
          initial={prefersReduced ? false : 'hidden'}
          animate="visible"
          className="flex flex-col gap-8"
        >
          <motion.p
            variants={fadeRise}
            className="text-sm font-medium uppercase tracking-[0.18em] text-light-primary dark:text-dark-primary"
          >
            {t('experience_1_title')} · {t('experience_1_company')}
          </motion.p>

          <motion.h1
            variants={fadeRise}
            className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-light-text-primary dark:text-dark-text-primary"
          >
            {brandName}
          </motion.h1>

          <motion.p
            variants={fadeRise}
            className="max-w-2xl text-lg text-light-text-secondary md:text-xl dark:text-dark-text-secondary"
          >
            {t('description')}
          </motion.p>

          <motion.div variants={fadeRise} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={scrollToContact} className="btn-primary">
              {t('contact')}
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-ghost gap-2"
              title={t('copyEmail')}
            >
              <span className="truncate">{t('email')}</span>
              {copied ? <Check className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0" />}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToExperience}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-light-text-secondary transition-opacity duration-fast hover:opacity-70 dark:text-dark-text-secondary"
        aria-label={t('experience_work_title')}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  )
}

export default Hero
