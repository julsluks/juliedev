'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  el: HTMLSpanElement
  x: number
  y: number
  life: number
}

/**
 * Soft teal cursor trail — desktop + motion-OK only.
 * Fixed to viewport so it works over the scrolling <main>.
 */
export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(pointer: fine)')
    if (motionQuery.matches || !pointerQuery.matches) return

    const particles: Particle[] = []
    let lastX = 0
    let lastY = 0
    let lastSpawn = 0
    let raf = 0
    let active = true

    const tick = (now: number) => {
      if (!active) return
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i]
        p.life -= 0.028
        if (p.life <= 0) {
          p.el.remove()
          particles.splice(i, 1)
          continue
        }
        const scale = 0.35 + p.life * 0.65
        p.el.style.opacity = String(p.life * 0.7)
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`
      }
      if (particles.length > 0 || now - lastSpawn < 400) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const ensureTick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.hypot(dx, dy)
      lastX = e.clientX
      lastY = e.clientY
      if (dist < 10 && now - lastSpawn < 28) return
      if (now - lastSpawn < 22) return
      lastSpawn = now

      const el = document.createElement('span')
      el.className = 'cursor-trail-dot'
      el.setAttribute('aria-hidden', 'true')
      const x = e.clientX - 5
      const y = e.clientY - 5
      el.style.transform = `translate(${x}px, ${y}px) scale(1)`
      layer.appendChild(el)
      particles.push({ el, x, y, life: 1 })
      if (particles.length > 18) {
        const old = particles.shift()
        old?.el.remove()
      }
      ensureTick()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      active = false
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
      particles.forEach((p) => p.el.remove())
      particles.length = 0
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="cursor-trail-layer pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  )
}
