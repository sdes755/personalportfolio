import { useRef } from "react"
import { useInView } from "framer-motion"
import Reveal from "@/components/motion/Reveal"
import TypingText from "@/components/motion/TypingText"

interface SectionHeadingProps {
  /** kept for call-site compatibility; the kicker no longer displays it */
  number?: string
  slug: string
  title: string
}

/** Shared section heading motif — a mono `cd` kicker above the title, which types out on first view. */
export default function SectionHeading({ slug, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Reveal className="mb-12 md:mb-16">
      <div ref={ref}>
        <p className="mb-3 font-mono text-sm">
          <span className="text-fg-muted" aria-hidden="true">
            ~ ${" "}
          </span>
          <span className="text-fg-muted">cd </span>
          <span className="text-accent">./{slug}</span>
        </p>
        {/* Invisible copy reserves layout while the visible title types out */}
        <h2 className="relative text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          <span className="invisible" aria-hidden="true">
            {title}
          </span>
          <span className="absolute inset-0">
            <TypingText
              text={title}
              started={inView}
              startDelay={150}
              speed={35}
              cursorWhileTypingOnly
            />
          </span>
        </h2>
      </div>
    </Reveal>
  )
}
