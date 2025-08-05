import { Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <Code className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-medium">Sahan De Silva</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
