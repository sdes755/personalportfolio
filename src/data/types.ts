export type SocialIcon = "github" | "linkedin" | "mail" | "file"

export interface Social {
  label: string
  href: string
  icon: SocialIcon
}

export interface TechCategory {
  label: string
  items: string[]
}

export interface Project {
  slug: string
  title: string
  filename: string
  status?: "in-progress"
  period: string
  description: string
  achievements: string[]
  tech: string[]
  image: string
  imageAlt: string
  award?: string
  github?: string
  live?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  summary: string
  achievements: string[]
  tech: string[]
  /** Decorative git short-hash for the commit-log motif */
  hash: string
  /** Conventional-commit scope, e.g. "orion-health" */
  scope: string
  current?: boolean
}

export interface Stat {
  label: string
  value: number
  suffix?: string
  decimals?: number
}
