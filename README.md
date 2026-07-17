# sahandesilva.netlify.app

Personal portfolio of **Sahan De Silva** — Software Engineering & Finance student at the University of Auckland.

Live at [sahandesilva.netlify.app](https://sahandesilva.netlify.app).

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite 6](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens in `src/index.css`)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, staggering, and micro-interactions
- shadcn-style UI primitives (`src/components/ui`)
- [EmailJS](https://www.emailjs.com) for the contact form
- Deployed on [Netlify](https://www.netlify.com)

## Accessibility & motion

The site is keyboard-navigable and uses semantic landmarks. Motion is app-controlled: animations run by default for everyone (independent of the OS reduced-motion setting), and the `motion: on/off` toggle in the footer status bar disables them — every animation (typing, counters, marquee, orbits, reveals) degrades to static, fully visible content. The preference persists in localStorage.
