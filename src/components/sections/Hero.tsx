"use client"

import {
  Mail,
  ArrowRight,
  Code,
  Palette,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  isVisible: boolean
}

export default function Hero({ isVisible }: HeroProps) {
  const skills = ["React", "TypeScript", "Next.js", "Java", "Node.js", "Express.js"]

  return (
    <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Main Heading */}
            <div
              className={`space-y-4 transition-all duration-1000 delay-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  Sahan De Silva
                </span>
              </h1>
              <h2 className="text-blue text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                Penultimate Software Engineering and Finance Student
              </h2>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-1000 delay-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                I enjoy building responsive, user-friendly web apps with modern technologies, always aiming to deliver clean, efficient, and cutting-edge solutions.
              </p>
            </div>

            {/* Skills Tags */}
            <div
              className={`transition-all duration-1000 delay-900 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      animationDelay: `${1000 + index * 100}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-1100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-transparent"
                onClick={() => window.open('/SahanDeSilvaResume.pdf', '_blank')}
              >
                <Eye className="mr-2 w-5 h-5" />
                View CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-transparent"
                onClick={() => window.open('/transcript.pdf', '_blank')}
              >
                <Eye className="mr-2 w-5 h-5" />
                View Transcript
              </Button>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-1000 delay-1300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                <a
                  href="mailto:ksahan.des@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">ksahan.des@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              className={`relative transition-all duration-1000 delay-600 ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
              }`}
            >
              {/* Animated rings */}
              <div
                className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute inset-4 rounded-full border-2 border-purple-500/30 animate-spin"
                style={{ animationDuration: "15s", animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-8 rounded-full border-2 border-pink-500/30 animate-spin"
                style={{ animationDuration: "10s" }}
              />

              {/* Profile image container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0  from-blue-500/20 to-purple-600/20" />
                <img
                  src="/profilepic.jpg"
                  alt="Sahan De Silva - Fullstack Developer"
                  className="object-cover w-full h-full"
                />

                {/* Floating elements around image */}
                <div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-1/2 -left-6 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse" />
                <div
                  className="absolute top-1/4 -right-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
