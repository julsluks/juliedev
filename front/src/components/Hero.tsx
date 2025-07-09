'use client'

import { useTranslation } from 'next-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei'
import { useTheme } from '@/contexts/ThemeContext'

const Hero = () => {
    const { t } = useTranslation('common')
    const { theme } = useTheme()
    
    // Refs for elements and scroll animation
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })
    
    // Scroll-based animations
    const y = useTransform(scrollYProgress, [0, 1], [0, 300])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    
    // Grid animation state
    const [gridCells, setGridCells] = useState([])
    const [currentYear] = useState(new Date().getFullYear())
    
    useEffect(() => {
        // Generate grid for the portfolio background
        const cells = []
        const rows = 6
        const cols = 12
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                cells.push({
                    id: `${i}-${j}`,
                    delay: (i + j) * 0.05,
                })
            }
        }
        
        setGridCells(cells)
    }, [])

    // 3D sphere props
    const SphereComponent = () => {
        const sphereRef = useRef()
        const [hovered, setHovered] = useState(false)
        
        useEffect(() => {
            if (sphereRef.current) {
                const interval = setInterval(() => {
                    if (!hovered && sphereRef.current) {
                        sphereRef.current.distort = 0.2 + Math.sin(Date.now() * 0.001) * 0.1
                    }
                }, 100)
                return () => clearInterval(interval)
            }
        }, [hovered])
        
        return (
            <Sphere 
                args={[1, 64, 64]} 
                scale={1.5}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <MeshDistortMaterial
                    ref={sphereRef}
                    distort={hovered ? 0.6 : 0.2}
                    speed={2}
                    color={theme === 'dark' ? '#5D8BF4' : '#FF6B6B'}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        )
    }
    
    return (
        <section 
            id="hero" 
            className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden bg-light-background dark:bg-dark-background"
            ref={containerRef}
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated grid inspired by the portfolio design */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 p-8 z-0">
                    {gridCells.map((cell) => (
                        <motion.div
                            key={cell.id}
                            className="relative border border-light-border/20 dark:border-dark-border/20 rounded-md overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: cell.delay, duration: 0.5 }}
                        >
                            {Math.random() > 0.8 && (
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-br from-light-primary/10 to-light-secondary/5 dark:from-dark-primary/10 dark:to-dark-secondary/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.8, 0] }}
                                    transition={{ 
                                        delay: cell.delay + 1, 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        repeatDelay: Math.random() * 10 + 5 
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
                
                {/* Light flares effect */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-light-primary/10 dark:bg-dark-primary/20 rounded-full filter blur-3xl" />
                <div className="absolute top-1/4 -right-20 w-72 h-72 bg-light-secondary/10 dark:bg-dark-secondary/20 rounded-full filter blur-3xl" />
            </div>
            
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    style={{ y, opacity }}
                >
                    {/* Text content */}
                    <div className="order-2 lg:order-1 text-left px-4 lg:px-0" ref={textRef}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-3"
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-full border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium tracking-wider">FRONTEND • UX/UI • {currentYear}</span>
                            </div>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <span className="bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
                                        PORT
                                    </span>
                                    <span className="relative inline-block">
                                        FOLIO
                                        <motion.div 
                                            className="absolute bottom-1 left-0 w-full h-1 bg-light-primary dark:bg-dark-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 0.8, delay: 1 }}
                                        />
                                    </span>
                                </motion.div>
                            </div>
                            
                            <motion.div
                                className="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                {t('greeting').split(",")[1] || "Julie Villegas"}
                            </motion.div>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-md mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {t('description')}
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <button className="group relative px-8 py-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg overflow-hidden">
                                <span className="relative z-10 font-medium tracking-wider">{t('contact')}</span>
                                <motion.div 
                                    className="absolute inset-0 bg-light-secondary dark:bg-dark-secondary"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />
                            </button>
                        </motion.div>
                    </div>
                    
                    {/* 3D object */}
                    <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] relative">
                        <div className="absolute inset-0 z-10">
                            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                                <SphereComponent />
                                <Environment preset="city" />
                            </Canvas>
                        </div>
                        
                        <motion.div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/30 to-light-secondary/30 dark:from-dark-primary/30 dark:to-dark-secondary/30 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Scroll</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5L12 19M12 19L6 13M12 19L18 13" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-light-text-secondary dark:text-dark-text-secondary" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero