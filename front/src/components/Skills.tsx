'use client'

import { useTranslation } from 'next-i18next'
import { useTheme } from '@/contexts/ThemeContext'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeRise, motionSafe } from '@/lib/motion'

const frontend = [
  'React',
  'Next.js',
  'Vue.js',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
]
const backend = ['Laravel', 'Livewire', 'Node.js', 'PHP', 'MySQL', 'SQL', 'MongoDB']
const tools = ['Docker', 'Git', 'GitHub', 'Figma', 'Cloudflare', 'Herd', 'Jira']
const ai = ['Claude', 'Cursor', 'Spec Kit', 'OpenSpec', 'n8n']

export default function Skills() {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const prefersReduced = useReducedMotion()

  const groups = [
    { title: t('skillsFrontend'), items: frontend },
    { title: t('skillsBackend'), items: backend },
    { title: t('skillsTools'), items: tools },
    { title: t('skillsAI'), items: ai },
  ]

  return (
    <section
      id="skills"
      className={`scroll-mt-20 px-4 py-20 transition-colors ${
        theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <h2 className="section-heading">{t('skills')}</h2>
          <p className="section-lede">{t('skillsDescription')}</p>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <motion.div
              key={group.title}
              {...(prefersReduced ? {} : motionSafe)}
              variants={fadeRise}
            >
              <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-light-primary dark:text-dark-primary">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-light-border bg-light-surface px-3 py-1.5 text-sm text-light-text-primary dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
