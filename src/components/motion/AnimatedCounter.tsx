import { useEffect, useRef } from "react"
import { animate, useInView } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  decimals?: number
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reducedMotion = useReducedMotion()
  const finalText = `${value.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reducedMotion) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${v.toFixed(decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, decimals, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {reducedMotion ? finalText : `0${suffix}`}
    </span>
  )
}
