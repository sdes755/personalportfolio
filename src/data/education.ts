export interface CourseFile {
  /** filename with a playful extension, e.g. "databases.sql" */
  file: string
}

export const education = {
  university: "University of Auckland",
  degree: "BE (Hons) Software Engineering / BCom Finance",
  degreeNote: "Conjoint degree",
  period: "Mar 2022 – Nov 2026",
  courseworkTree: {
    root: "~/university-of-auckland",
    folders: [
      {
        name: "software engineering",
        files: [
          "data-structures-and-algorithms.ts",
          "software-architecture.ts",
          "networks-and-security.ts",
          "databases.sql",
          "operating-systems.ts",
          "software-design.ts"
        ],
      },
      {
        name: "finance",
        files: [
          "investments-and-derivatives.xlsx",
          "corporate-finance.xlsx",
          "banking-and-financial-institutions.xlsx",
          "machine-learning-for-finance.xlsx",
          "financial-accounting.xlsx",
          "financial-reporting-and-analysis.xlsx"
        ],
      },
    ],
  },
  extracurriculars: ["SESA", "WDCC", "AUES", "GDSC"],
  awards: ["Top of Course — SOFTENG 281", "Dean's Honours List — 2023, 2024"],
} as const
