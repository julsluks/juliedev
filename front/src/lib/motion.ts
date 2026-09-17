import type { Transition, Variants } from 'framer-motion'

/** Matches DESIGN.md / CSS --motion-ease (sober craft). CSS-first for hover microinteractions. */
export const craftEase = [0.22, 1, 0.36, 1] as const

export const craftTransition: Transition = {
  duration: 0.28,
  ease: craftEase,
}

/** CSS class names for recruiter-scan craft (002). Prefer these over Framer for hover/focus. */
export const craftClasses = {
  imageLift: 'craft-image-lift',
  linkDraw: 'craft-link-draw',
  avatar: 'hero-avatar',
} as const

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: craftTransition,
  },
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

export const motionSafe = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.2 },
}

/** Use with Framer: skip entrance when user prefers reduced motion */
export function getReducedMotionProps(prefersReduced: boolean) {
  if (prefersReduced) {
    return {
      initial: false as const,
      animate: 'visible' as const,
      variants: undefined,
    }
  }
  return {
    initial: 'hidden' as const,
    animate: 'visible' as const,
    variants: fadeRise,
  }
}
