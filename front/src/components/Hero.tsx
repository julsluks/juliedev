'use client'

import { useTranslation } from 'next-i18next'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Tipos para los componentes 3D interactivos
interface InteractiveSphere {
    id: number;
    position: [number, number, number];
    scale: number;
    color: string;
}

interface AnimatedSpheresProps {
    mouseX: any;
    mouseY: any;
}

interface GridCell {
    id: string;
    delay: number;
}

// Componente de geometría metálica elegante con límites
const MetallicGeometry: React.FC<AnimatedSpheresProps> = ({ mouseX, mouseY }) => {
    const groupRef = useRef<THREE.Group>(null);
    const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

    const geometries = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        type: ['box', 'cylinder', 'octahedron', 'sphere'][i % 4],
        scale: 0.2 + (i % 3) * 0.15,
        speed: 0.3 + i * 0.05,
        basePosition: [
            (i % 4 - 1.5) * 3,
            (Math.floor(i / 4) - 1) * 2.5,
            (i % 2 - 0.5) * 4
        ] as [number, number, number],
        color: [
            '#e2e8f0', // Slate-200
            '#cbd5e1', // Slate-300
            '#94a3b8', // Slate-400
            '#64748b', // Slate-500
            '#f1f5f9', // Slate-100
            '#475569', // Slate-600
            '#334155', // Slate-700
            '#1e293b', // Slate-800
            '#f8fafc', // Slate-50
            '#0f172a', // Slate-900
            '#d1d5db', // Gray-300
            '#9ca3af'  // Gray-400
        ][i]
    }));

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            const mouseInfluence = 0.5;

            // Rotación global muy suave
            groupRef.current.rotation.x = mouseY.get() * Math.PI * 0.03;
            groupRef.current.rotation.y = mouseX.get() * Math.PI * 0.03;

            meshRefs.current.forEach((mesh, index) => {
                if (mesh) {
                    const geo = geometries[index];

                    // Inicializar posición si no está establecida
                    if (!mesh.userData.initialized) {
                        mesh.position.set(...geo.basePosition);
                        mesh.userData.basePosition = [...geo.basePosition];
                        mesh.userData.initialized = true;
                    }

                    // Movimiento flotante muy sutil con límites
                    const baseX = mesh.userData.basePosition[0];
                    const baseY = mesh.userData.basePosition[1];
                    const baseZ = mesh.userData.basePosition[2];

                    // Límites de movimiento
                    const maxOffset = 1.5;

                    const floatX = Math.sin(time * geo.speed + index) * 0.3;
                    const floatY = Math.cos(time * geo.speed * 0.8 + index) * 0.2;
                    const floatZ = Math.sin(time * geo.speed * 0.6 + index) * 0.25;

                    // Respuesta al mouse con límites
                    const mouseResponseX = mouseX.get() * mouseInfluence;
                    const mouseResponseY = mouseY.get() * mouseInfluence;

                    // Aplicar posición con límites
                    mesh.position.x = THREE.MathUtils.clamp(
                        baseX + floatX + mouseResponseX,
                        baseX - maxOffset,
                        baseX + maxOffset
                    );
                    mesh.position.y = THREE.MathUtils.clamp(
                        baseY + floatY + mouseResponseY,
                        baseY - maxOffset,
                        baseY + maxOffset
                    );
                    mesh.position.z = THREE.MathUtils.clamp(
                        baseZ + floatZ,
                        baseZ - maxOffset,
                        baseZ + maxOffset
                    );

                    // Rotación suave
                    mesh.rotation.x += geo.speed * 0.003;
                    mesh.rotation.y += geo.speed * 0.004;
                    mesh.rotation.z += geo.speed * 0.002;

                    // Pulsación muy sutil
                    const pulse = 1 + Math.sin(time * 1.2 + index) * 0.02;
                    mesh.scale.setScalar(geo.scale * pulse);
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {geometries.map((geo, index) => (
                <mesh
                    key={geo.id}
                    ref={(ref) => { meshRefs.current[index] = ref; }}
                >
                    {geo.type === 'box' && <boxGeometry />}
                    {geo.type === 'cylinder' && <cylinderGeometry />}
                    {geo.type === 'octahedron' && <octahedronGeometry />}
                    {geo.type === 'sphere' && <sphereGeometry />}
                    <meshStandardMaterial
                        color={geo.color}
                        opacity={0.4}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Componente de partículas sutiles flotantes
const SubtleParticles: React.FC<AnimatedSpheresProps> = ({ mouseX, mouseY }) => {
    const particlesRef = useRef<THREE.Group>(null);
    const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        scale: 0.05 + Math.random() * 0.1,
        speed: 0.2 + Math.random() * 0.3,
        basePosition: [
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8
        ] as [number, number, number],
        color: [
            '#f8fafc', // Muy claro
            '#e2e8f0', // Claro
            '#cbd5e1', // Medio claro
            '#94a3b8'  // Medio
        ][i % 4]
    }));

    useFrame((state) => {
        if (particlesRef.current) {
            const time = state.clock.elapsedTime;
            const mouseInfluence = 0.3;

            // Rotación global muy sutil
            particlesRef.current.rotation.y = time * 0.02;

            particleRefs.current.forEach((particle, index) => {
                if (particle) {
                    const part = particles[index];

                    // Inicializar posición si no está establecida
                    if (!particle.userData.initialized) {
                        particle.position.set(...part.basePosition);
                        particle.userData.basePosition = [...part.basePosition];
                        particle.userData.initialized = true;
                    }

                    const baseX = particle.userData.basePosition[0];
                    const baseY = particle.userData.basePosition[1];
                    const baseZ = particle.userData.basePosition[2];

                    // Movimiento muy sutil y contenido
                    const maxOffset = 0.8;

                    const floatX = Math.sin(time * part.speed + index) * 0.2;
                    const floatY = Math.cos(time * part.speed * 0.7 + index) * 0.15;
                    const floatZ = Math.sin(time * part.speed * 0.5 + index) * 0.1;

                    // Respuesta muy sutil al mouse
                    const mouseResponseX = mouseX.get() * mouseInfluence * 0.3;
                    const mouseResponseY = mouseY.get() * mouseInfluence * 0.3;

                    // Aplicar con límites estrictos
                    particle.position.x = THREE.MathUtils.clamp(
                        baseX + floatX + mouseResponseX,
                        baseX - maxOffset,
                        baseX + maxOffset
                    );
                    particle.position.y = THREE.MathUtils.clamp(
                        baseY + floatY + mouseResponseY,
                        baseY - maxOffset,
                        baseY + maxOffset
                    );
                    particle.position.z = THREE.MathUtils.clamp(
                        baseZ + floatZ,
                        baseZ - maxOffset,
                        baseZ + maxOffset
                    );

                    // Rotación muy lenta
                    particle.rotation.x += part.speed * 0.001;
                    particle.rotation.y += part.speed * 0.0015;

                    // Pulsación casi imperceptible
                    const pulse = 1 + Math.sin(time * 0.8 + index) * 0.01;
                    particle.scale.setScalar(part.scale * pulse);
                }
            });
        }
    });

    return (
        <group ref={particlesRef}>
            {particles.map((particle, index) => (
                <mesh
                    key={particle.id}
                    ref={(ref) => { particleRefs.current[index] = ref; }}
                >
                    <sphereGeometry />
                    <meshStandardMaterial
                        color={particle.color}
                        opacity={0.3}
                    />
                </mesh>
            ))}
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
            className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden bg-light-background dark:bg-dark-background"
            ref={containerRef}
        >
            {/* Fondo 3D PROMINENTE - Ocupa toda la pantalla */}
            <div className="absolute inset-0 z-0">
                {/* Fondo degradado limpio y elegante */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-100 to-zinc-200 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900"></div>

                {/* Efectos sutiles de brillo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent dark:from-transparent dark:via-white/5 dark:to-transparent"></div>

                {/* Elementos flotantes muy sutiles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-slate-200/20 to-gray-300/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-zinc-200/20 to-slate-300/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                </div>

                <Canvas
                    style={{ height: '100%', width: '100%' }}
                    camera={{ position: [0, 0, 15], fov: 60 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Luces para las esferas 3D */}
                    <ambientLight />
                    <directionalLight />
                    <pointLight />

                    <MetallicGeometry
                        mouseX={smoothMouseX}
                        mouseY={smoothMouseY}
                    />

                    <SubtleParticles
                        mouseX={smoothMouseX}
                        mouseY={smoothMouseY}
                    />
                </Canvas>

                {/* Overlay elegante para mejor legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40 dark:from-black/40 dark:via-black/20 dark:to-black/40"></div>
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
                        {/* Badge superior con hover interactivo */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                            whileHover={{ scale: 1.05, rotateX: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="inline-flex items-center px-6 py-3 rounded-full border border-light-border/50 dark:border-dark-border/50 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                                <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium tracking-wider group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                    FULL STACK • FRONTEND • {currentYear}
                                </span>
                            </div>
                        </motion.div>

                        {/* Nombre principal con efectos sutiles */}
                        <motion.h1
                            className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-snug"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="overflow-hidden pb-2">
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="pb-1"
                                >
                                    <span className="bg-gradient-to-r from-light-primary via-light-secondary to-light-primary dark:from-dark-primary dark:via-dark-secondary dark:to-dark-primary bg-clip-text text-transparent bg-300% animate-gradient hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-500 leading-relaxed inline-block">
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
                                className="group relative px-8 py-4 bg-light-primary dark:bg-dark-primary text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg min-w-[250px] h-[60px] flex items-center justify-center"
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

                            {/* Email visible con icono de copiar - mismo tamaño */}
                            <motion.div
                                className="flex items-center gap-3 px-6 py-4 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-xl border border-light-border/30 dark:border-dark-border/30 shadow-lg min-w-[250px] h-[60px] justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <span className="text-light-text-primary dark:text-dark-text-primary font-medium text-lg truncate max-w-[160px]">
                                    {t('email')}
                                </span>
                                <motion.button
                                    onClick={copyEmail}
                                    className="p-2 text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 rounded-lg transition-colors flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={t('copyEmail')}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
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