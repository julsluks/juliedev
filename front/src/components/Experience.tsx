'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { fadeRise, motionSafe } from '@/lib/motion'

interface ExperienceItem {
  id: number
  title: string
  company: string
  period: string
  description: string[]
  type: 'work' | 'education'
}

export default function Experience() {
  const { theme } = useTheme()
  const { t } = useTranslation('common')
  const prefersReduced = useReducedMotion()

  const getExperienceData = (id: number) => {
    const descriptions: string[] = []
    let descIndex = 1
    while (true) {
      const descKey = `experience_${id}_desc_${descIndex}`
      const descValue = t(descKey)
      if (descValue === descKey) break
      descriptions.push(descValue)
      descIndex++
    }
    return {
      title: t(`experience_${id}_title`),
      company: t(`experience_${id}_company`),
      period: t(`experience_${id}_period`),
      description: descriptions,
    }
  }

  const experiences: ExperienceItem[] = [
    { id: 1, ...getExperienceData(1), type: 'work' },
    { id: 2, ...getExperienceData(2), type: 'work' },
    { id: 3, ...getExperienceData(3), type: 'work' },
    { id: 4, ...getExperienceData(4), type: 'education' },
    { id: 5, ...getExperienceData(5), type: 'education' },
  ]

  const workExperience = experiences.filter((exp) => exp.type === 'work')
  const education = experiences.filter((exp) => exp.type === 'education')

  const Timeline = ({ items }: { items: ExperienceItem[] }) => (
    <ol className="relative space-y-10 border-l border-light-border pl-8 dark:border-dark-border">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          {...(prefersReduced ? {} : motionSafe)}
          variants={fadeRise}
          className="relative"
        >
          <span
            className={`absolute -left-[2.4rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-light-primary bg-light-background dark:border-dark-primary dark:bg-dark-background ${
              index === 0 ? 'ring-4 ring-light-accent-soft dark:ring-dark-accent-soft' : ''
            }`}
            aria-hidden
          />
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
            <h4 className="font-display text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
              {item.title}
            </h4>
            <span className="shrink-0 text-sm font-medium text-light-primary dark:text-dark-primary">
              {item.period}
            </span>
          </div>
          <p className="mt-1 text-base text-light-text-secondary dark:text-dark-text-secondary">
            {item.company}
          </p>
          <ul className="mt-4 space-y-2">
            {item.description.map((desc, i) => (
              <li
                key={`${item.id}-d-${i}`}
                className="flex gap-2 text-light-text-secondary dark:text-dark-text-secondary"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-light-primary dark:bg-dark-primary" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ol>
  )

  return (
    <section
      id="experience"
      className={`scroll-mt-20 px-4 py-20 transition-colors ${
        theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <h2 className="section-heading flex items-center gap-3">
            <Briefcase className="h-7 w-7 text-light-primary dark:text-dark-primary" aria-hidden />
            {t('experience_title')}
          </h2>
          <p className="section-lede">{t('experience_subtitle')}</p>
        </div>

        <div className="mb-16">
          <h3 className="mb-8 flex items-center gap-2 text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
            <Briefcase className="h-5 w-5 text-light-primary dark:text-dark-primary" aria-hidden />
            {t('experience_work_title')}
          </h3>
          <Timeline items={workExperience} />
        </div>

        <div>
          <h3 className="mb-8 flex items-center gap-2 text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
            <GraduationCap className="h-5 w-5 text-light-primary dark:text-dark-primary" aria-hidden />
            {t('experience_education_title')}
          </h3>
          <Timeline items={education} />
        </div>
      </div>
    </section>
  )
}
