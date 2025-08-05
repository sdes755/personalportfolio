"use client"

import { useState, useEffect } from "react"
import Navigation from "./sections/Navigation"
import Hero from "./sections/Hero"
import Projects from "./sections/Projects"
import Experience from "./sections/Experience"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
import Background from "./Background"

export default function AnimatedLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Background mousePosition={mousePosition} />
      <Navigation isVisible={isVisible} />
      <Hero isVisible={isVisible} />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
