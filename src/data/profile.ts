import type { Social } from "./types"

export const profile = {
  name: "Sahan De Silva",
  firstName: "Sahan",
  lastName: "De Silva",
  role: "Software Engineer",
  title: "Final Year Software Engineering & Finance Student",
  university: "University of Auckland",
  tagline:
    "Building scalable software and intuitive user experiences with an eye for the numbers behind them.",
  email: "ksahan.des@gmail.com",
  phone: "+64 22 545 9801",
  location: "Auckland, New Zealand",
  github: "https://github.com/sdes755",
  linkedin: "https://www.linkedin.com/in/sahan-de-silva-b641a02b8/",
  resume: "/SahanDeSilvaResume.pdf",
  headshot: "/profilepic.webp",
} as const

export const socials: Social[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Resume", href: profile.resume, icon: "file" },
]
