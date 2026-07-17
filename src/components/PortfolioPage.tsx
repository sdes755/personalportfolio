import { useCallback, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import BootLoader from "@/components/layout/BootLoader"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import TechStack from "@/components/sections/TechStack"
import Projects from "@/components/sections/Projects"
import Experience from "@/components/sections/Experience"
import Education from "@/components/sections/Education"
import Stats from "@/components/sections/Stats"
import Contact from "@/components/sections/Contact"

const BOOT_FLAG = "portfolio-booted"

export default function PortfolioPage() {
  const reducedMotion = useReducedMotion()
  const [booted, setBooted] = useState(
    () => reducedMotion || sessionStorage.getItem(BOOT_FLAG) === "1",
  )

  const handleBootDone = useCallback(() => {
    sessionStorage.setItem(BOOT_FLAG, "1")
    setBooted(true)
  }, [])

  return (
    <>
      <AnimatePresence>{!booted && <BootLoader onDone={handleBootDone} />}</AnimatePresence>
      {booted && (
        <>
          <Navbar />
          <main>
            <Hero />
            <TechStack />
            <Projects />
            <Experience />
            <Education />
            <Stats />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
