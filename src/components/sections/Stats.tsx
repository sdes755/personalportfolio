import Reveal, { RevealItem } from "@/components/motion/Reveal"
import AnimatedCounter from "@/components/motion/AnimatedCounter"
import { stats } from "@/data/stats"

export default function Stats() {
  return (
    <section aria-label="Achievements at a glance" className="border-y border-line bg-surface/50">
      <Reveal stagger={0.08} className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-16 md:py-20 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="text-center">
            <p className="font-mono text-4xl font-bold text-accent-bright md:text-5xl">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </p>
            <p className="mt-2 text-sm text-fg-muted">{stat.label}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
