import type { Project } from "./types"

// TODO(sahan): add real `github` / `live` URLs — buttons only render when these are set.
export const projects: Project[] = [
  {
    slug: "professor-turing",
    title: "Professor Turing",
    filename: "professor-turing.tsx",
    period: "Mar 2025 – Nov 2025",
    description:
      "A production-ready educational platform powered by context- and course-aware AI agents. Includes an AI tutor built around Socratic learning, an AI interviewer with real-time code analysis, and a VS Code extension for in-editor, context-aware feedback.",
    achievements: [
      "Awarded Best Project (Games & Education category) for excellence and innovation",
      "Engineered a microservices backend with coursebook processing pipelines and AI-driven student analytics",
      "Built multi-provider LLM integration via the Vibekit SDK for adaptive learning paths",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Vibekit SDK"],
    image: "/projects/professor-turing.webp",
    imageAlt: "Professor Turing educational platform interface",
    award: "Best Project — Games & Education",
  },
  {
    slug: "intellimock",
    title: "IntelliMock",
    filename: "intellimock.tsx",
    period: "Mar 2025 – Jun 2025",
    description:
      "An AI-driven mock interview platform that builds personalised, context-aware interview simulations from a candidate's CV and target job description, analysing responses in real time to deliver nuanced feedback.",
    achievements: [
      "Integrated GPT-4o-mini via LangChain4j for adaptive questioning and intelligent conversation flow",
      "Deployed scalable cloud infrastructure: Netlify CI/CD frontend, Dockerised Spring Boot backend on Render, MongoDB Atlas",
    ],
    tech: ["React", "TypeScript", "Spring Boot", "Java", "MongoDB", "LangChain4j", "Docker"],
    image: "/projects/intellimock.webp",
    imageAlt: "IntelliMock AI mock interview platform interface",
  },
  {
    slug: "clinic-management-system",
    title: "Clinic Management System",
    filename: "clinic-management.tsx",
    status: "in-progress",
    period: "Jan 2025 – Present",
    description:
      "A production-ready full-stack healthcare application for the New Zealand College of Chinese Medicine, supporting medical notetaking, appointment booking, and clinical workflows for practitioners.",
    achievements: [
      "Designed RESTful APIs with Express and Supabase covering patients, treatment records, bookings, and secure authentication",
      "Built a responsive React frontend with real-time search, dynamic forms, time-zone-aware booking, and role-based access",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Tailwind CSS", "Vite"],
    image: "/projects/clinic-management.webp",
    imageAlt: "Clinic management system dashboard",
  },
]
