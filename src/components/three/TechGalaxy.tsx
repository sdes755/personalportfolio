import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Billboard, Html, Line, OrbitControls } from "@react-three/drei"
import { Code2, CloudCog, Database, MonitorSmartphone, Server, Wrench, type LucideIcon } from "lucide-react"
import { useReducedMotionPref } from "@/hooks/useMotionPref"
import { techStack } from "@/data/techStack"
import type { TechCategory } from "@/data/types"
import { getIconTexture } from "./iconTexture"
import { getPlanetTexture } from "./planetTexture"

/** Per-category tint, cycled by system index (mirrors the site syntax palette). */
const TINTS = ["#22d3ee", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#fb7185"]
const TINT_TEXT = [
  "text-syntax-cyan",
  "text-accent-bright",
  "text-violet-bright",
  "text-syntax-green",
  "text-syntax-amber",
  "text-syntax-rose",
]

const HUB_ICONS: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: MonitorSmartphone,
  backend: Server,
  databases: Database,
  cloud_devops: CloudCog,
  tools: Wrench,
}

const PLANET_RADIUS = 0.42
const RING_RADIUS = 2.35
/** Slight size variance cycled by planet index. */
const PLANET_SCALES = [1, 1.12, 0.9]

const SURFACE = "#16161f"
const LINE_COLOR = "#32324a"

function circlePoints(radius: number, segments = 96): [number, number, number][] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2
    return [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [number, number, number]
  })
}

interface PlanetProps {
  name: string
  angle: number
  tint: string
  scale: number
}

function Planet({ name, angle, tint, scale }: PlanetProps) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let alive = true
    getIconTexture(name).then((t) => {
      if (alive) setTexture(t)
    })
    return () => {
      alive = false
    }
  }, [name])

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : ""
    return () => {
      document.body.style.cursor = ""
    }
  }, [hovered])

  const position = useMemo<[number, number, number]>(
    () => [Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS],
    [angle],
  )

  return (
    <group position={position} scale={hovered ? scale * 1.3 : scale}>
      <Billboard>
        {/* Planet disc */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <circleGeometry args={[PLANET_RADIUS, 32]} />
          <meshBasicMaterial color={SURFACE} transparent opacity={0.95} />
        </mesh>
        {/* Tinted rim */}
        <mesh>
          <ringGeometry args={[PLANET_RADIUS - 0.025, PLANET_RADIUS, 48]} />
          <meshBasicMaterial color={hovered ? tint : LINE_COLOR} transparent opacity={hovered ? 1 : 0.9} />
        </mesh>
        {/* Icon decal */}
        {texture && (
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[PLANET_RADIUS * 1.4, PLANET_RADIUS * 1.4]} />
            <meshBasicMaterial map={texture} transparent depthWrite={false} />
          </mesh>
        )}
        {hovered && (
          <Html center position={[0, -PLANET_RADIUS - 0.35, 0]} zIndexRange={[40, 0]}>
            <div className="pointer-events-none rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-fg shadow-lg shadow-black/50">
              {name}
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  )
}

interface SystemSceneProps {
  category: TechCategory
  index: number
  /** animations run only when true (motion pref + section visibility) */
  animate: boolean
}

function SystemScene({ category, index, animate }: SystemSceneProps) {
  const orbitRef = useRef<THREE.Group>(null)
  const sunGlowRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const tint = TINTS[index % TINTS.length]
  const speed = (0.14 + (index % 3) * 0.05) * (index % 2 === 0 ? 1 : -1)
  const points = useMemo(() => circlePoints(RING_RADIUS), [])
  const coreTexture = useMemo(() => getPlanetTexture(tint, index), [tint, index])

  useFrame(({ clock }, delta) => {
    if (!animate) return
    if (orbitRef.current) orbitRef.current.rotation.y += delta * speed
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.3
    if (sunGlowRef.current) {
      const s = 1.55 + Math.sin(clock.elapsedTime * 1.4) * 0.12
      sunGlowRef.current.scale.setScalar(s)
    }
  })

  // Gentle, deterministic tilt so each system sits at its own attitude
  const tiltX = -0.22 + (index % 3) * 0.07
  const tiltZ = (index % 2 === 0 ? 1 : -1) * 0.1

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* Lighting for the shaded central planet (other materials are unlit) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 8]} intensity={1.3} />

      {/* Central planet — banded, shaded, slowly rotating */}
      <mesh ref={coreRef} rotation={[0, 0, (index % 2 === 0 ? 1 : -1) * 0.22]}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial
          map={coreTexture}
          roughness={0.85}
          metalness={0}
          emissive={tint}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh ref={sunGlowRef} scale={1.55}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial
          color={tint}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit guide */}
      <Line points={points} color={tint} transparent opacity={0.28} lineWidth={1} />

      {/* Planets */}
      <group ref={orbitRef}>
        {category.items.map((item, i) => (
          <Planet
            key={item}
            name={item}
            angle={(i / category.items.length) * Math.PI * 2}
            tint={tint}
            scale={PLANET_SCALES[i % PLANET_SCALES.length]}
          />
        ))}
      </group>
    </group>
  )
}

function SystemCard({
  category,
  index,
  active,
  canDrag,
}: {
  category: TechCategory
  index: number
  active: boolean
  canDrag: boolean
}) {
  const reducedMotion = useReducedMotionPref()
  const animate = active && !reducedMotion
  const Icon = HUB_ICONS[category.label] ?? Code2

  return (
    <div>
      <div className="h-[240px]" aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          frameloop={animate ? "always" : "demand"}
          camera={{ position: [0, 2.6, 6.4], fov: 42 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        >
          <SystemScene category={category} index={index} animate={animate} />
          {canDrag && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
            />
          )}
        </Canvas>
      </div>
      <h3 className="mt-1 flex items-center justify-center gap-2 font-mono text-sm">
        <Icon className={`h-4 w-4 ${TINT_TEXT[index % TINT_TEXT.length]}`} aria-hidden="true" />
        <span className={TINT_TEXT[index % TINT_TEXT.length]}>{category.label}</span>
        <span className="text-fg-muted">· {category.items.length}</span>
      </h3>
    </div>
  )
}

/** Grid of six per-category 3D systems. Loaded lazily — keep this the only module importing three.js. */
export default function TechGalaxy({ active }: { active: boolean }) {
  const canDrag = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
    [],
  )

  return (
    <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {techStack.map((category, i) => (
        <SystemCard key={category.label} category={category} index={i} active={active} canDrag={canDrag} />
      ))}
    </div>
  )
}
