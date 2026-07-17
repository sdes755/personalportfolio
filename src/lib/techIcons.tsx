import {
  siCss,
  siDocker,
  siExpress,
  siFramer,
  siGit,
  siHtml5,
  siJavascript,
  siJunit5,
  siKubernetes,
  siMongodb,
  siNetlify,
  siNodedotjs,
  siPnpm,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siStrapi,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  type SimpleIcon,
} from "simple-icons"
import { Cloud, Database, Webhook, Workflow, type LucideIcon } from "lucide-react"
import { FaJava } from "react-icons/fa"
import type { IconType } from "react-icons"

export interface BrandGlyph {
  kind: "brand"
  icon: SimpleIcon
  /** override when the brand hex is illegible on the near-black background */
  color?: string
}

export interface FallbackGlyph {
  kind: "lucide"
  icon: LucideIcon
  color?: string
}

export interface ReactIconGlyph {
  kind: "react-icon"
  icon: IconType
  color?: string
}

export type Glyph = BrandGlyph | FallbackGlyph | ReactIconGlyph

const brand = (icon: SimpleIcon, color?: string): Glyph => ({ kind: "brand", icon, color })
const lucide = (icon: LucideIcon, color?: string): Glyph => ({ kind: "lucide", icon, color })
const reactIcon = (icon: IconType, color?: string): Glyph => ({ kind: "react-icon", icon, color })

/** Keys must match the names used in src/data/techStack.ts */
export const glyphs: Record<string, Glyph> = {
  Python: brand(siPython, "#5C9CD5"),
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript),
  // simple-icons has no official Java (coffee-cup) mark — Oracle restricts it —
  // Font Awesome's brand set (via react-icons) does ship one.
  Java: reactIcon(FaJava, "#ED8B00"),
  SQL: lucide(Database),
  HTML: brand(siHtml5),
  CSS: brand(siCss, "#8b5cf6"),
  React: brand(siReact),
  Vite: brand(siVite),
  "Tailwind CSS": brand(siTailwindcss),
  "Framer Motion": brand(siFramer, "#60a5fa"),
  "Node.js": brand(siNodedotjs),
  Express: brand(siExpress, "#b4b4c0"),
  "Spring Boot": brand(siSpringboot),
  "REST APIs": lucide(Webhook),
  PostgreSQL: brand(siPostgresql),
  MongoDB: brand(siMongodb),
  Supabase: brand(siSupabase),
  AWS: lucide(Cloud),
  Docker: brand(siDocker),
  Kubernetes: brand(siKubernetes),
  "CI/CD": lucide(Workflow),
  Netlify: brand(siNetlify),
  Git: brand(siGit),
  JUnit: brand(siJunit5),
  Vitest: brand(siVitest),
  Strapi: brand(siStrapi),
  PNPM: brand(siPnpm),
}

export function TechGlyph({ name, className }: { name: string; className?: string }) {
  const glyph = glyphs[name]
  if (!glyph) return null
  if (glyph.kind === "lucide" || glyph.kind === "react-icon") {
    const Icon = glyph.icon
    return <Icon className={className} color={glyph.color ?? "#7d7d8c"} aria-hidden="true" />
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
      fill={glyph.color ?? `#${glyph.icon.hex}`}
    >
      <path d={glyph.icon.path} />
    </svg>
  )
}
