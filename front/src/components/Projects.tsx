'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'next-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { fadeRise, motionSafe } from '@/lib/motion'

export default function Projects() {
  const { theme } = useTheme()
  const { t } = useTranslation('common')
  const prefersReduced = useReducedMotion()

  const projectsConfig = [
    {
      id: 1,
      key: '1',
      technologies: ['Vue', 'Node.js', 'MongoDB', 'Firebase', 'MySQL'],
      demoLink:
        'https://drive.google.com/file/d/1y02Yq1GE_BuVvkM1OaHGyEYysEYibbRt/view?usp=sharing',
      repoLink: 'https://github.com/julsluks/trf-ConexusHub',
      image: '/images/projects/conexus-hub.png',
    },
    {
      id: 2,
      key: '2',
      technologies: ['Vue.js', 'Tailwind CSS', 'Unity', 'C#', 'Python'],
      demoLink: 'https://www.youtube.com/watch?v=AOM92qPPtt0',
      repoLink: 'https://github.com/julsluks/tr-game-HighLink',
      image: '/images/projects/high-link.png',
    },
    {
      id: 3,
      key: '3',
      technologies: ['Phaser.js', 'Laravel', 'React', 'Node.js', 'Next.js'],
      demoLink:
        'https://drive.google.com/file/d/1LBWqpKjoQKpaOUaVtSpKrkM9p9Om5a6i/view?usp=sharing',
      repoLink: 'https://github.com/julsluks/trf-ChromaticBond',
      image: '/images/projects/chromatic-bond.png',
    },
  ]

  return (
    <section
      id="projects"
      className={`scroll-mt-20 px-4 py-20 transition-colors ${
        theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14">
          <h2 className="section-heading">{t('projectsTitle')}</h2>
          <p className="section-lede">{t('projectsDescription')}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsConfig.map((project) => {
            const title = t(`project_${project.key}_title`)
            const description = t(`project_${project.key}_description`)
            return (
              <motion.article
                key={project.id}
                {...(prefersReduced ? {} : motionSafe)}
                variants={fadeRise}
                className="flex flex-col border-t border-light-border pt-6 dark:border-dark-border"
              >
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded-md bg-light-muted dark:bg-dark-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
                  {description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-light-border px-2.5 py-0.5 text-xs text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-light-primary dark:text-dark-primary"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      {t('viewDemo')}
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      {t('viewCode')}
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
