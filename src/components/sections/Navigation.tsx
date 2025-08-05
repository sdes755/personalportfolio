import { Github, Linkedin, Code } from "lucide-react"

interface NavigationProps {
  isVisible: boolean
}

export default function Navigation({ isVisible }: NavigationProps) {
  return (
    <header className="relative z-10 w-full">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Sahan De Silva</span>
          </div>
          <div
            className={`flex items-center gap-4 transition-all duration-1000 delay-200 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <a
              href="https://github.com/sdes755"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sahan-de-silva-b641a02b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
