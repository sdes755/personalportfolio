import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "motion-pref"

interface MotionPref {
  /** true = animations disabled */
  reduced: boolean
  toggle: () => void
}

const MotionPrefContext = createContext<MotionPref>({ reduced: false, toggle: () => {} })

/**
 * App-controlled motion preference. Animations default ON for everyone
 * (deliberately independent of the OS reduced-motion setting); the footer
 * status-bar toggle lets visitors turn them off, persisted in localStorage.
 */
export function MotionPrefProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "off"
    } catch {
      return false
    }
  })

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = reduced ? "off" : "on"
  }, [reduced])

  const toggle = useCallback(() => {
    setReduced((r) => {
      try {
        localStorage.setItem(STORAGE_KEY, r ? "on" : "off")
      } catch {
        // storage unavailable — preference just won't persist
      }
      return !r
    })
  }, [])

  return (
    <MotionPrefContext.Provider value={{ reduced, toggle }}>{children}</MotionPrefContext.Provider>
  )
}

export function useMotionPref(): MotionPref {
  return useContext(MotionPrefContext)
}

/** Drop-in replacement for framer-motion's useReducedMotion, driven by the app toggle. */
export function useReducedMotionPref(): boolean {
  return useContext(MotionPrefContext).reduced
}
