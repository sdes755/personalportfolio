import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import { ChevronDown, MapPin } from "lucide-react"
import SectionHeading from "@/components/layout/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { experience } from "@/data/experience"
import type { ExperienceEntry } from "@/data/types"
import { cn } from "@/lib/utils"

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Wraps occurrences of the entry's technologies in a syntax-highlight span. */
function highlightTech(text: string, tech: string[]): ReactNode[] {
  if (tech.length === 0) return [text]
  // Longest first so e.g. "Node.js" wins over "Node"
  const pattern = [...tech]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|")
  const regex = new RegExp(`(${pattern})`, "gi")
  const techSet = new Set(tech.map((t) => t.toLowerCase()))
  return text.split(regex).map((part, i) =>
    techSet.has(part.toLowerCase()) ? (
      <span key={i} className="font-mono text-[0.9em] text-syntax-cyan">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function TagTokens({ tech }: { tech: string[] }) {
  return (
    <>
      {tech.map((tag) => (
        <span key={tag} className="whitespace-pre">
          <span className="text-syntax-amber">tag: </span>
          <span className="text-syntax-cyan">{tag.toLowerCase()}</span>
          <span className="text-fg-muted">{"  ·  "}</span>
        </span>
      ))}
    </>
  )
}

/** Infinite horizontal marquee of git-style tech tags; static wrap under reduced motion. */
function TagMarquee({ tech }: { tech: string[] }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <p className="mt-2 flex flex-wrap border-t border-line pt-2 font-mono text-xs leading-6">
        <TagTokens tech={tech} />
      </p>
    )
  }

  return (
    <div
      className="mt-2 overflow-hidden border-t border-line pt-2"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max font-mono text-xs leading-6 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${tech.length * 3}s` }}
      >
        <span className="flex shrink-0">
          <TagTokens tech={tech} />
        </span>
        <span className="flex shrink-0" aria-hidden="true">
          <TagTokens tech={tech} />
        </span>
      </div>
    </div>
  )
}

function TimelineEntry({ entry, defaultOpen }: { entry: ExperienceEntry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const reducedMotion = useReducedMotion()
  const detailsId = `experience-${entry.scope}`

  return (
    <Reveal x={-16} y={0} className="relative pb-14 pl-8 last:pb-0 md:pl-10">
      {/* Commit node */}
      <span
        aria-hidden="true"
        className="absolute top-5 -left-[5px] flex h-3 w-3 items-center justify-center"
      >
        {entry.current && (
          <span className="animate-pulse-ring absolute h-3 w-3 rounded-full bg-accent" />
        )}
        <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-background" />
      </span>

      <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-10">
        {/* Left: git-log snippet card + meta */}
        <div>
          <div className="rounded-md border border-line bg-surface-2/50 px-4 py-3">
            <p className="font-mono text-xs leading-6 break-words md:text-sm">
              <span aria-hidden="true" className="text-fg-muted">
                *{" "}
              </span>
              <span className="text-syntax-amber">{entry.hash}</span>{" "}
              <span className="text-syntax-cyan">feat({entry.scope}):</span>{" "}
              <span className="text-fg-body">{entry.role.toLowerCase()}</span>
            </p>
            <TagMarquee tech={[...entry.tech]} />
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-muted">
            <span>Date: {entry.period}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {entry.location}
            </span>
          </p>
        </div>

        {/* Right: prose */}
        <div className="mt-5 lg:mt-0">
          <h3 className="text-xl font-semibold text-fg">{entry.company}</h3>
          <p className="mt-2 leading-7 text-fg-body">{entry.summary}</p>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent-bright transition-colors hover:text-fg"
          >
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
              aria-hidden="true"
            />
            {open ? "hide details" : "show details"}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                className="overflow-hidden"
                initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ul className="mt-4 space-y-2">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-sm leading-6 text-fg-muted">
                      <span aria-hidden="true" className="font-mono text-syntax-green">
                        +
                      </span>
                      <span>{highlightTech(achievement, [...entry.tech])}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="experience" aria-label="Work experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="03" slug="experience" title="Where I've worked" />

        <p className="mb-10 -mt-8 font-mono text-sm text-fg-muted md:-mt-12">
          <span aria-hidden="true">~ $ </span>git log --work --oneline
        </p>

        <div className="relative">
          {/* Timeline rail */}
          <motion.div
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 left-0 w-0.5 origin-top rounded-full bg-accent/60"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.scope} entry={entry} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
