'use client'

import { useTranslation } from 'next-i18next'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Center } from '@react-three/drei'
import * as THREE from 'three'

// Tipos para el componente 3D
interface AnimatedText3DProps {
    text: string;
    mouseX: any;
    mouseY: any;
}

interface GridCell {
    id: string;
    delay: number;
}

// Componente 3D para el texto de fondo con MÁXIMO VOLUMEN
const AnimatedText3D: React.FC<AnimatedText3DProps> = ({ text, mouseX, mouseY }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current && groupRef.current) {
            const rotationX = mouseY.get() * Math.PI * 0.1;
            const rotationY = mouseX.get() * Math.PI * 0.1;
            
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationX, 0.03);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.03);
            
            // Animación de flotación más sutil para mejor legibilidad
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            groupRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.02;
            
            // Escala pulsante muy sutil
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.008;
            groupRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <Text
                    ref={meshRef}
                    fontSize={1.8}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.08}
                    lineHeight={0.9}
                    maxWidth={350}
                    textAlign="center"
                >
                    {text}
                    <meshStandardMaterial
                        color="#4f46e5"
                        opacity={0.12}
                    />
                </Text>
            </Center>
        </group>
    );
};

const Hero = () => {
    const { t } = useTranslation('common')

    // Refs for elements and scroll animation
    const containerRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Enhanced scroll-based animations
    const y = useTransform(scrollYProgress, [0, 1], [0, -200])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95])
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150])

    // Mouse movement for 3D effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 })
    const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 })

    // Grid animation state
    const [gridCells, setGridCells] = useState<GridCell[]>([])
    const [currentYear] = useState(new Date().getFullYear())

    useEffect(() => {
        // Generate grid for background
        const cells: GridCell[] = []
        const rows = 8
        const cols = 15

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                cells.push({
                    id: `${i}-${j}`,
                    delay: (i + j) * 0.02,
                })
            }
        }

        setGridCells(cells)
    }, [])

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event
        const { innerWidth, innerHeight } = window
        
        mouseX.set((clientX - innerWidth / 2) / (innerWidth / 2))
        mouseY.set((clientY - innerHeight / 2) / (innerHeight / 2))
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(t('email'))
            // Optional: show notification
        } catch (err) {
            console.error('Error copying email:', err)
        }
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden bg-light-background dark:bg-dark-background"
            ref={containerRef}
        >
            {/* Fondo 3D PROMINENTE - Ocupa toda la pantalla */}
            <div className="absolute inset-0 z-0">
                {/* Fondo degradado animado más elegante */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
                
                {/* Patrón de puntos sutil */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }}></div>
                
                {/* Elementos flotantes decorativos */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <Canvas
                    style={{ height: '100%', width: '100%' }}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Luces básicas para el volumen */}
                    <ambientLight />
                    <directionalLight />
                    <pointLight />
                    
                    <AnimatedText3D 
                        text={t('frontendDeveloper').toUpperCase()} 
                        mouseX={smoothMouseX} 
                        mouseY={smoothMouseY} 
                    />
                </Canvas>
                
                {/* Overlay gradient para mejor legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70 dark:from-gray-900/70 dark:via-gray-900/40 dark:to-gray-900/70"></div>
            </div>

            {/* Grid sutil de fondo */}
            <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none z-10"
                style={{ y: backgroundY }}
            >
                <motion.div 
                    className="absolute inset-0 grid grid-cols-15 grid-rows-8 gap-2 p-4 opacity-20"
                >
                    {gridCells.map((cell) => (
                        <motion.div
                            key={cell.id}
                            className="relative border border-light-border/10 dark:border-dark-border/10 rounded-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                delay: cell.delay, 
                                duration: 1.5,
                                type: "spring",
                                stiffness: 50
                            }}
                        >
                            {Math.random() > 0.8 && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-light-primary/5 to-light-secondary/5 dark:from-dark-primary/5 dark:to-dark-secondary/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        delay: cell.delay + 2,
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatDelay: Math.random() * 20 + 15
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Contenido principal - Por encima del 3D */}
            <div className="container mx-auto max-w-6xl relative z-20">
                <motion.div
                    className="flex flex-col items-center justify-center text-center min-h-screen"
                    style={{ y, opacity, scale }}
                >
                    <div className="text-center px-4 lg:px-0" ref={textRef}>
                        {/* Badge superior */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center px-6 py-3 rounded-full border border-light-border/50 dark:border-dark-border/50 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-lg">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium tracking-wider">
                                    FULL STACK • FRONTEND • UX/UI • {currentYear}
                                </span>
                            </div>
                        </motion.div>

                        {/* Nombre principal */}
                        <motion.h1
                            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <span className="bg-gradient-to-r from-light-primary via-light-secondary to-light-primary dark:from-dark-primary dark:via-dark-secondary dark:to-dark-primary bg-clip-text text-transparent bg-300% animate-gradient">
                                        {t('greeting').split(",")[1]?.trim() || "Julie Villegas"}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.h1>

                        {/* Descripción */}
                        <motion.p
                            className="text-xl lg:text-2xl text-light-text-secondary dark:text-dark-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {t('description')}
                        </motion.p>

                        {/* Botones de acción */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <motion.button 
                                onClick={scrollToContact}
                                className="group relative px-8 py-4 bg-light-primary dark:bg-dark-primary text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 tracking-wide">
                                    {t('contact')}
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-light-secondary dark:bg-dark-secondary"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                />
                            </motion.button>
                            
                            {/* Email visible con icono de copiar */}
                            <motion.div
                                className="flex items-center gap-3 px-6 py-4 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-xl border border-light-border/30 dark:border-dark-border/30 shadow-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <span className="text-light-text-primary dark:text-dark-text-primary font-medium text-lg">
                                    {t('email')}
                                </span>
                                <motion.button
                                    onClick={copyEmail}
                                    className="p-2 text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={t('copyEmail')}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-light-text-secondary dark:border-dark-text-secondary rounded-full flex justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-3 bg-light-text-secondary dark:bg-dark-text-secondary rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero