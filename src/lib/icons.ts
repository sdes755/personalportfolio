import { FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react"
import type { SocialIcon } from "@/data/types"

export const socialIcons: Record<SocialIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  file: FileText,
}
