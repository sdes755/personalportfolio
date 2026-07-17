import { lazy, Suspense, useMemo, useRef } from "react"
import { useInView } from "framer-motion"
import SectionHeading from "@/components/layout/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { techStack } from "@/data/techStack"
import { TechGlyph } from "@/lib/techIcons"

const TechGalaxy = lazy(() => import("@/components/three/TechGalaxy"))

const STAR_COUNT = 70

/** Deterministic pseudo-random in [0, 1) so the starfield is stable across renders. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
  } catch {
    return false
  }
}

function Starfield() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const size = rand(i * 3 + 2) > 0.85 ? 2 : 1
        return (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-fg-body"
            style={{
              left: `${rand(i * 3) * 100}%`,
              top: `${rand(i * 3 + 1) * 100}%`,
              width: size,
              height: size,
              animationDelay: `${rand(i * 7) * 4}s`,
              animationDuration: `${2.5 + rand(i * 11) * 3}s`,
            }}
          />
        )
      })}
    </div>
  )
}

/** Non-WebGL / loading fallback: compact icon-chip rows per category. */
function GalaxyFallback() {
  return (
    <div className="grid gap-x-10 gap-y-8 py-8 md:grid-cols-2 lg:grid-cols-3">
      {techStack.map((category) => (
        <div key={category.label}>
          <h3 className="mb-3 font-mono text-sm">
            <span className="text-syntax-cyan">{category.label}</span>
            <span className="text-fg-muted">:</span>
          </h3>
          <ul className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg-body"
              >
                <TechGlyph name={item} className="h-3.5 w-3.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldLoad = useInView(sectionRef, { once: true, margin: "400px" })
  const active = useInView(sectionRef, { margin: "80px" })
  const webgl = useMemo(supportsWebGL, [])

  return (
    <section
      ref={sectionRef}
      id="stack"
      aria-label="Tech stack"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <Starfield />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading number="01" slug="stack" title="Technologies I work with" />

        {/* Screen-reader content — the canvas itself is decorative */}
        <ul className="sr-only">
          {techStack.map((category) => (
            <li key={category.label}>
              {category.label.replace("_", " & ")}:
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {webgl && shouldLoad ? (
          <Suspense fallback={<GalaxyFallback />}>
            <TechGalaxy active={active} />
          </Suspense>
        ) : (
          <GalaxyFallback />
        )}

        <Reveal>
          <p className="mt-10 text-center font-mono text-xs text-fg-muted">
            <span aria-hidden="true">{"// "}</span>
            {webgl ? "drag a system · hover a planet" : "my toolbox, grouped by orbit"}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
