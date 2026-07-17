import type { TechCategory } from "./types"

export const techStack: TechCategory[] = [
  {
    label: "languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML", "CSS"],
  },
  {
    label: "frontend",
    items: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "backend",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"],
  },
  {
    label: "databases",
    items: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    label: "cloud_devops",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Netlify"],
  },
  {
    label: "tools",
    items: ["Git", "JUnit", "Vitest", "Strapi", "PNPM"],
  },
]
