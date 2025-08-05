// import { Github, ExternalLink } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Professor Turing - In Progress",
      description:"Professor Turing is an AI-Agentic powered educational platform designed to support computer science students through Socratic tutoring and conceptual interview preparation. Built with a modern full-stack architecture, it integrates cutting-edge AI Agent providers like OpenAI GPT-4, Gemini, and Claude via the Vibekit SDK. The platform includes a VS Code extension, personalised student insights, coursebook parsing, and multi-agent support, making it a powerful tool for CS education.",
      tech: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Vibekit SDK", "LLMs"],
      image: "/professorturing.png",
      github: "#",
      live: "#",
    },
    {
      title: "IntelliMock",
      description:"IntelliMock is an AI-driven mock interview platform designed for realistic interview preparation. It supports text and voice-based interactions, real-time feedback, and personalised question generation using OpenAI via LangChain. Users can upload CVs and job descriptions for tailored interview sessions, while PDF analytics reports further enhance the preparation experience.",
      tech: ["React", "Node.js", "TypeScript", "MongoDB", "LangChain4j", "Java", "Springboot"],
      image: "/intellimock.png",
      github: "#",
      live: "#",
    },
    {
      title: "Clinic Management System (New Zealand College of Chinese Medicine) - In Progress",
      description:
        "This full-stack web application was developed for the New Zealand College of Chinese Medicine to streamline patient records, clinical examinations, and booking workflows. The system includes role-based access control, real-time search, and a responsive UI. The platform enhances operational efficiency while adhering to healthcare data privacy best practices.",
      tech: ["React.js", "Node.js", "Express.js", "Tailwind", "TypeScript", "Supabase"],
      image: "/cms.png",
      github: "#",
      live: "#",
    },
  ]

  return (
    <section id="projects" className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions
            for real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-white text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-gray-300 mb-4">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {/* <div className="flex gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900 bg-transparent"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </a>
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
