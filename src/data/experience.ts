import type { ExperienceEntry } from "./types"

export const experience: ExperienceEntry[] = [
  {
    company: "Orion Health",
    role: "Software Engineering Intern",
    period: "Nov 2025 – Present",
    location: "Auckland, NZ",
    summary:
      "Patient Engagement team, building and maintaining the Digital Front Door product for healthcare providers.",
    achievements: [
      "Supported the Strapi v4 → v5 migration, updating import/export scripts across test, development, and production environments to ensure data integrity",
      "Drove customer platform upgrades from v7.3 to v9.1.0, resolving breaking changes across Webpack/Neutrino configs, Strapi Content Manager templates, and Kubernetes/Docker deployments",
      "Resolved 20+ bugs across accessibility (screen reader), UI, Strapi Content Manager, and Google Maps integration, improving stability and compliance on client-facing surfaces",
    ],
    tech: ["Python", "React", "TypeScript", "Strapi", "Java", "Docker", "Kubernetes", "AWS"],
    hash: "e4a1f7c",
    scope: "orion-health",
    current: true,
  },
  {
    company: "Aderant",
    role: "Software Engineering Intern",
    period: "Nov 2024 – Feb 2025 · Jul 2025 – Oct 2025",
    location: "Auckland, NZ",
    summary:
      "Two internships on Cloud-GL, Aderant's large-scale cloud financial platform for law firms.",
    achievements: [
      "Co-built and deployed 2 Micro Frontend Components, improving modularity and feature delivery across the internal Product Library",
      "Resolved 25+ client-facing bugs and authored 3 feature pages within Cloud-GL, directly improving usability against client requirements",
      "Co-developed a production-grade REST API extending core application functionality across the cloud financial platform",
      "Built Stridyn Data API migration scripts handling legacy schema conversion and full CRUD automation for report entities",
      "Led i18n implementation with automated string-detection tooling and upgraded 3+ repos to PNPM, streamlining CI/CD and Docker configs",
    ],
    tech: ["Python", "React", "TypeScript", "Express", "Node.js", "Docker", "Kubernetes"],
    hash: "b82d3a9",
    scope: "aderant",
  },
  {
    company: "Seriously Addictive Mathematics",
    role: "Lead Mathematics Tutor",
    period: "2023 – Present",
    location: "Auckland, NZ",
    summary:
      "Leading small-group maths tuition, mentoring students and coordinating other tutors.",
    achievements: [
      "Taught problem-solving-first mathematics to students across a wide range of ages and abilities",
      "Mentored junior tutors and coordinated session planning across the centre",
    ],
    tech: ["Teaching", "Mentoring", "Communication"],
    hash: "c19f5e2",
    scope: "sam",
    current: true,
  },
]
