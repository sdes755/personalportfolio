import { Github, Linkedin, Mail, GitBranch, Check, Pause, Play } from "lucide-react"
import { profile } from "@/data/profile"
import { useMotionPref } from "@/hooks/useMotionPref"

export default function Footer() {
  const year = new Date().getFullYear()
  const { reduced, toggle } = useMotionPref()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <a
          href="#home"
          className="flex items-center gap-2.5 font-mono text-sm text-fg transition-colors hover:text-accent-bright"
        >
          <img src="/logo.png" alt="" width={24} height={24} className="rounded" />
          <span>
            sahan<span className="text-accent">.dev</span>
          </span>
        </a>
        <p className="text-sm text-fg-muted">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Github className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Editor status-bar strip */}
      <div className="border-t border-line bg-surface">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 overflow-hidden px-6 font-mono text-xs text-fg-muted">
          <div aria-hidden="true" className="flex shrink-0 items-center gap-4">
            <span className="flex items-center gap-1.5">
              <GitBranch className="h-3 w-3" />
              main
            </span>
            <span className="hidden items-center gap-1 text-syntax-green sm:flex">
              <Check className="h-3 w-3" />0 errors
            </span>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!reduced}
            className="flex shrink-0 items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            {reduced ? (
              <Play className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Pause className="h-3 w-3" aria-hidden="true" />
            )}
            motion: {reduced ? "off" : "on"}
          </button>
          <div className="flex min-w-0 items-center gap-4">
            <span className="truncate">Built with React, TypeScript &amp; Tailwind CSS</span>
            <span aria-hidden="true" className="hidden shrink-0 sm:inline">
              Auckland, NZ
            </span>
            <span aria-hidden="true" className="hidden shrink-0 md:inline">
              UTF-8
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
