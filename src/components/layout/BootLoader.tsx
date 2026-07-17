import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const BOOT_LINES = [
  { text: "~ $ npm run portfolio", className: "text-fg-body" },
  { text: "▸ loading modules...", className: "text-fg-muted" },
  { text: "▸ hydrating ui...", className: "text-fg-muted" },
  { text: "✓ ready — welcome", className: "text-syntax-green" },
]

const LINE_INTERVAL_MS = 260
const EXIT_HOLD_MS = 420

/** Terminal-style boot screen shown once per session before the page reveals. */
export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= BOOT_LINES.length) {
          clearInterval(interval)
          return n
        }
        return n + 1
      })
    }, LINE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) return
    const timeout = setTimeout(onDone, EXIT_HOLD_MS)
    return () => clearTimeout(timeout)
  }, [visibleLines, onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
    >
      <div className="w-72 font-mono text-sm leading-7">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <p key={line.text} className={line.className}>
            {line.text}
            {i === visibleLines - 1 && visibleLines < BOOT_LINES.length && (
              <span className="animate-cursor-blink text-accent-bright">▍</span>
            )}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
