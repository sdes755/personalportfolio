import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import { Github, Linkedin, Menu, X } from "lucide-react"
import useScrollSpy from "@/hooks/useScrollSpy"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { id: "home", label: "home" },
  { id: "stack", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
]

export default function Navbar() {
  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.id), [])
  const activeId = useScrollSpy(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md transition-[border-color] duration-300",
        scrolled || menuOpen ? "border-b border-line" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center gap-2.5 font-mono text-sm text-fg transition-colors hover:text-accent-bright"
        >
          <img src="/logo.png" alt="" width={24} height={24} className="rounded" />
          <span>
            sahan<span className="text-accent">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id
            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "block px-3 py-2 font-mono text-[13px] transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:text-fg-body",
                  )}
                >
                  {link.label}
                </a>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent-bright"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 35 }
                    }
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Github className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-line bg-background/95 backdrop-blur-md md:hidden"
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.2 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeId === link.id ? "true" : undefined}
                    className={cn(
                      "block py-2.5 font-mono text-sm transition-colors",
                      activeId === link.id ? "text-accent-bright" : "text-fg-body hover:text-fg",
                    )}
                  >
                    <span className="mr-2 text-fg-muted" aria-hidden="true">
                      {String(NAV_LINKS.indexOf(link)).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
