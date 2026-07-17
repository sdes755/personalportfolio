/**
 * Pure-CSS hero background: blueprint grid + two drifting gradient orbs.
 * Transform-only animations (compositor-friendly); static under reduced motion.
 */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Blueprint grid, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      {/* Drifting glow orbs */}
      <div
        className="animate-drift-slow absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-drift-slower absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--color-violet) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
