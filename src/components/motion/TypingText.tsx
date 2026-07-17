import { useEffect, useRef, useState } from "react"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"

interface TypingTextProps {
  text: string
  className?: string
  /** ms per character */
  speed?: number
  startDelay?: number
  /** gate typing until true (default true) — enables chaining */
  started?: boolean
  onComplete?: () => void
  /** hide the cursor once typing finishes (default: keep blinking) */
  cursorWhileTypingOnly?: boolean
}

export default function TypingText({
  text,
  className,
  speed = 45,
  startDelay = 400,
  started = true,
  onComplete,
  cursorWhileTypingOnly = false,
}: TypingTextProps) {
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const done = count >= text.length
  const completedRef = useRef(false)

  useEffect(() => {
    if (reducedMotion || !started) return
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay, reducedMotion, started])

  useEffect(() => {
    if (completedRef.current || !onComplete) return
    if (reducedMotion || done) {
      completedRef.current = true
      onComplete()
    }
  }, [done, reducedMotion, onComplete])

  if (reducedMotion) {
    return <span className={className}>{text}</span>
  }

  const showCursor = started && (!done || !cursorWhileTypingOnly)

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {showCursor && (
        <span aria-hidden="true" className="animate-cursor-blink text-accent-bright">
          ▍
        </span>
      )}
    </span>
  )
}
