import { Award, ChevronsRight, ExternalLink, Github } from "lucide-react"
import SectionHeading from "@/components/layout/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { projects } from "@/data/projects"
import type { Project } from "@/data/types"
import { cn } from "@/lib/utils"

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  if (!project.github && !project.live) return null
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent-bright"
        >
          <Github className="h-5 w-5" aria-hidden="true" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent-bright"
        >
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

function FeatureRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1
  const href = project.live ?? project.github

  const overline = (
    <p className="font-mono text-xs text-accent">
      featured project · {String(index + 1).padStart(2, "0")}
      {project.status === "in-progress" && (
        <span className="text-syntax-amber"> · in progress</span>
      )}
    </p>
  )

  const image = (
    <div className="group relative overflow-hidden rounded-card border border-line">
      <img
        src={project.image}
        alt={project.imageAlt}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.02]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-accent/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/40 transition-opacity duration-500 group-hover:opacity-0"
      />
    </div>
  )

  return (
    <Reveal>
      {/* Desktop: overlapping 12-col grid */}
      <article className="relative hidden md:grid md:grid-cols-12 md:items-center">
        <div className={cn("md:col-span-7 md:row-start-1", flipped ? "md:col-start-6" : "md:col-start-1")}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={project.title}>
              {image}
            </a>
          ) : (
            image
          )}
        </div>

        <div
          className={cn(
            "relative z-10 md:col-span-6 md:row-start-1",
            flipped ? "md:col-start-1 text-left" : "md:col-start-7 text-right",
          )}
        >
          {overline}
          <h3 className="mt-2 text-2xl font-semibold text-fg md:text-3xl">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent-bright"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          {project.award && (
            <p
              className={cn(
                "mt-2 flex items-center gap-2 font-mono text-xs text-syntax-amber",
                !flipped && "justify-end",
              )}
            >
              <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
              {project.award}
            </p>
          )}

          <div className="mt-4 rounded-card border border-line bg-surface-2/90 p-6 shadow-xl shadow-black/40 backdrop-blur-sm">
            <p className="text-left text-sm leading-6 text-fg-body">{project.description}</p>
            <ul className="mt-3 space-y-1.5">
              {project.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-1.5 text-left text-[13px] leading-5 text-fg-muted">
                  <ChevronsRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {achievement}
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4 font-mono text-xs">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-accent/30 bg-surface px-3 py-1 text-accent-bright transition-colors hover:border-accent/60 hover:text-fg"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <ProjectLinks project={project} className={cn("mt-3", !flipped && "justify-end")} />
        </div>
      </article>

      {/* Mobile: single card, image as dim background */}
      <article className="relative overflow-hidden rounded-card border border-line md:hidden">
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-10"
        />
        <div className="absolute inset-0 bg-background/75" aria-hidden="true" />
        <div className="relative p-6">
          {overline}
          <h3 className="mt-2 text-2xl font-semibold text-fg">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          {project.award && (
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-syntax-amber">
              <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
              {project.award}
            </p>
          )}
          <p className="mt-4 text-sm leading-6 text-fg-body">{project.description}</p>
          <ul className="mt-3 space-y-1.5">
            {project.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-1.5 text-[13px] leading-5 text-fg-muted">
                <ChevronsRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                {achievement}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4 font-mono text-xs">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-accent/30 bg-surface px-3 py-1 text-accent-bright"
              >
                {tech}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} className="mt-3" />
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-label="Featured projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="02" slug="projects" title="Featured projects" />
        <div className="space-y-16 md:space-y-32">
          {projects.map((project, i) => (
            <FeatureRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
