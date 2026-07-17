import { motion, type Variants } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import { ArrowRight, ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import TypingText from "@/components/motion/TypingText"
import HeroBackground from "@/components/layout/HeroBackground"
import { profile, socials } from "@/data/profile"
import { socialIcons } from "@/lib/icons"

const EASE = [0.21, 0.47, 0.32, 0.98] as const

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-svh items-center overflow-hidden">
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-16">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
          className="order-2 lg:order-1"
        >
          {/* Terminal intro */}
          <motion.div variants={item} className="mb-6 space-y-1 font-mono text-sm">
            <p className="text-fg-muted">
              <span aria-hidden="true">~ $ </span>
              <TypingText text="whoami" startDelay={200} speed={32} cursorWhileTypingOnly />
            </p>
            <p className="text-syntax-green">
              <TypingText
                text="sahan-de-silva — software engineer"
                startDelay={650}
                speed={22}
                cursorWhileTypingOnly
              />
            </p>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold tracking-tight text-fg md:text-6xl xl:text-7xl"
          >
            Sahan <span className="text-accent-bright">De Silva</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-fg-body md:text-xl">
            {profile.title} <span className="text-fg-muted">@</span>{" "}
            <span className="text-accent-bright">{profile.university}</span>
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl leading-7 text-fg-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#projects">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex items-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon]
              const newTab = social.href.startsWith("http") || social.href.endsWith(".pdf")
              return (
                <li key={social.label}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    target={newTab ? "_blank" : undefined}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    whileHover={reducedMotion ? undefined : { y: -3 }}
                    className="flex rounded-md border border-line bg-surface p-2.5 text-fg-muted transition-colors hover:border-line-bright hover:text-accent-bright"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </motion.a>
                </li>
              )
            })}
          </motion.ul>
        </motion.div>

        {/* Headshot */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-accent opacity-30 blur-3xl"
            />
            <img
              src={profile.headshot}
              alt={`Portrait of ${profile.name}`}
              width={763}
              height={1102}
              fetchPriority="high"
              className="relative aspect-square w-56 rounded-2xl border border-line object-cover md:w-72 lg:w-80"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#stack"
        aria-label="Scroll to tech stack"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg-body md:flex"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        scroll
        <motion.span
          aria-hidden="true"
          animate={reducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
