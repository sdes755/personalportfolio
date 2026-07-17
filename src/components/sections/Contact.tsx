import { useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { useReducedMotionPref as useReducedMotion } from "@/hooks/useMotionPref"
import { AlertCircle, CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import SectionHeading from "@/components/layout/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { profile, socials } from "@/data/profile"
import { socialIcons } from "@/lib/icons"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = "idle" | "success" | "error"

const contactInfo = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location },
]

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 font-mono text-xs text-syntax-rose">
      {message}
    </p>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const reducedMotion = useReducedMotion()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS environment variables are not configured.")
      setStatus("error")
      return
    }

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: "ksahan.des@gmail.com",
      }
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setStatus("success")
      reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="05" slug="contact" title="Get in touch" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: info */}
          <Reveal>
            <p className="max-w-md leading-7 text-fg-body">
              I'm currently open to graduate opportunities. Whether you have a
              question, a role in mind, or an interesting idea, feel free to reach out!
            </p>

            <ul className="mt-8 space-y-3">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const content = (
                  <>
                    <span
                      aria-hidden="true"
                      className="rounded-lg border border-line bg-surface-2 p-2.5 text-accent-bright"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs text-fg-muted">{info.label}</span>
                      <span className="mt-0.5 block text-sm text-fg">{info.value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={info.label}>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 transition-all duration-200 hover:border-line-bright hover:bg-surface-2"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-4 rounded-card border border-line bg-surface p-4">
                        {content}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            <ul className="mt-8 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon]
                const newTab = social.href.startsWith("http") || social.href.endsWith(".pdf")
                return (
                  <li key={social.label}>
                    <motion.a
                      href={social.href}
                      aria-label={social.label}
                      target={newTab ? "_blank" : undefined}
                      rel={newTab ? "noopener noreferrer" : undefined}
                      whileHover={reducedMotion ? undefined : { y: -3 }}
                      className="flex rounded-md border border-line bg-surface p-2.5 text-fg-muted transition-colors hover:border-line-bright hover:text-accent-bright"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.a>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-surface p-6 md:p-8">
              <p className="mb-6 font-mono text-sm text-fg-muted">
                <span aria-hidden="true">~ $ </span>send --message
              </p>

              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <motion.span
                      initial={reducedMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    >
                      <CheckCircle className="h-12 w-12 text-syntax-green" aria-hidden="true" />
                    </motion.span>
                    <p className="font-mono text-sm text-syntax-green">
                      ✓ message sent — exit code 0
                    </p>
                    <p className="text-sm text-fg-muted">
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                    <Button size="sm" onClick={() => setStatus("idle")}>
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-fg-muted">
                          name
                        </label>
                        <Input
                          id="contact-name"
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "contact-name-error" : undefined}
                          className={errors.name ? "border-syntax-rose/60" : undefined}
                          {...register("name", { required: "name is required" })}
                        />
                        <FieldError id="contact-name-error" message={errors.name?.message} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-fg-muted">
                          email
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          className={errors.email ? "border-syntax-rose/60" : undefined}
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "enter a valid email",
                            },
                          })}
                        />
                        <FieldError id="contact-email-error" message={errors.email?.message} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-xs text-fg-muted">
                        subject
                      </label>
                      <Input
                        id="contact-subject"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                        className={errors.subject ? "border-syntax-rose/60" : undefined}
                        {...register("subject", { required: "subject is required" })}
                      />
                      <FieldError id="contact-subject-error" message={errors.subject?.message} />
                    </div>

                    <div className="mt-5">
                      <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-fg-muted">
                        message
                      </label>
                      <Textarea
                        id="contact-message"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                        className={errors.message ? "border-syntax-rose/60" : undefined}
                        {...register("message", {
                          required: "message is required",
                          minLength: { value: 10, message: "message must be at least 10 characters" },
                        })}
                      />
                      <FieldError id="contact-message-error" message={errors.message?.message} />
                    </div>

                    {status === "error" && (
                      <p role="alert" className="mt-4 flex items-center gap-2 font-mono text-xs text-syntax-rose">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        something went wrong — email me directly at{" "}
                        <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                          {profile.email}
                        </a>
                      </p>
                    )}

                    <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full font-mono">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          pushing to inbox...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          git commit -m "message"
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
