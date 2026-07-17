import { motion, type Variants } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import type { ReactNode } from "react"

const EASE = [0.21, 0.47, 0.32, 0.98] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Slide-in offset; defaults to fade-up. */
  x?: number
  y?: number
  /** Stagger direct children instead of animating as one block. */
  stagger?: number
}

export function revealVariants(x = 0, y = 24): Variants {
  return {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  }
}

export default function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 24,
  stagger,
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? undefined : revealVariants(x, y)}
      transition={
        stagger
          ? { staggerChildren: stagger, delayChildren: delay }
          : { duration: 0.55, ease: EASE, delay }
      }
    >
      {children}
    </motion.div>
  )
}

/** Child item for use inside a staggered <Reveal stagger={...}>. */
export function RevealItem({
  children,
  className,
  x = 0,
  y = 16,
}: {
  children: ReactNode
  className?: string
  x?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants(x, y)}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
