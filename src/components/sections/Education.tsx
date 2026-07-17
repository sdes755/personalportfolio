import { Award, GraduationCap } from "lucide-react"
import SectionHeading from "@/components/layout/SectionHeading"
import Reveal, { RevealItem } from "@/components/motion/Reveal"
import { education } from "@/data/education"

interface TreeLine {
  /** glyph prefix, e.g. "│   ├── " */
  prefix: string
  label: string
  kind: "root" | "folder" | "file"
}

function buildTreeLines(): TreeLine[] {
  const { root, folders } = education.courseworkTree
  const lines: TreeLine[] = [{ prefix: "", label: root, kind: "root" }]
  folders.forEach((folder, fi) => {
    const lastFolder = fi === folders.length - 1
    lines.push({ prefix: lastFolder ? "└── " : "├── ", label: `${folder.name}/`, kind: "folder" })
    const childIndent = lastFolder ? "    " : "│   "
    folder.files.forEach((file, i) => {
      const glyph = i === folder.files.length - 1 ? "└── " : "├── "
      lines.push({ prefix: childIndent + glyph, label: file, kind: "file" })
    })
  })
  return lines
}

function TreeLineRow({ line }: { line: TreeLine }) {
  const dot = line.label.lastIndexOf(".")
  const base = line.kind === "file" && dot > 0 ? line.label.slice(0, dot) : line.label
  const ext = line.kind === "file" && dot > 0 ? line.label.slice(dot) : ""

  return (
    <div className="group -mx-2 rounded px-2 py-0.5 transition-colors hover:bg-surface-2">
      <span className="whitespace-pre text-fg-muted" aria-hidden="true">
        {line.prefix}
      </span>
      {line.kind === "root" && <span className="text-violet-bright">{line.label}</span>}
      {line.kind === "folder" && <span className="text-syntax-cyan">{line.label}</span>}
      {line.kind === "file" && (
        <>
          <span className="text-fg-body transition-colors group-hover:text-fg">{base}</span>
          <span className="text-fg-muted">{ext}</span>
        </>
      )}
    </div>
  )
}

export default function Education() {
  const treeLines = buildTreeLines()

  return (
    <section id="education" aria-label="Education" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="04" slug="education" title="Education" />

        <Reveal>
          <div className="grid gap-10 rounded-card border border-line bg-surface p-6 md:p-10 lg:grid-cols-2">
            <div>
              <div className="flex items-start gap-4">
                <span
                  className="rounded-lg border border-line bg-surface-2 p-2.5 text-accent-bright"
                  aria-hidden="true"
                >
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-fg md:text-2xl">
                    {education.university}
                  </h3>
                  <p className="mt-1 leading-6 text-fg-body">{education.degree}</p>
                  <p className="mt-1 font-mono text-xs text-fg-muted">
                    {education.degreeNote} · {education.period}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm leading-6 text-fg-muted">
                <span className="font-mono text-syntax-cyan">extracurriculars:</span>{" "}
                {education.extracurriculars.join(" · ")}
              </p>

              <div className="mt-4 text-sm leading-6 text-fg-muted">
                <span className="font-mono text-syntax-amber">awards:</span>
                <ul className="mt-1 space-y-1">
                  {education.awards.map((award) => (
                    <li key={award} className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 shrink-0 text-syntax-amber" aria-hidden="true" />
                      <span className="text-fg-body">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coursework as a directory tree */}
            <div>
              <p className="mb-4 font-mono text-sm text-fg-muted">
                <span aria-hidden="true">~ $ </span>tree coursework
              </p>
              <Reveal stagger={0.04} className="overflow-x-auto rounded-lg border border-line bg-surface-2/50 p-4 font-mono text-[13px] leading-6">
                {treeLines.map((line) => (
                  <RevealItem key={line.prefix + line.label} x={-8} y={0}>
                    <TreeLineRow line={line} />
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
