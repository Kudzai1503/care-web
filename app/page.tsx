"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarClock,
  HeartHandshake,
  Menu,
  ShieldCheck,
  Trophy,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#care", label: "Care" },
  { href: "#platform", label: "Platform" },
  { href: "#journeys", label: "Journeys" },
]

const highlights = [
  { title: "Medication rhythm", copy: "Refills, reminders, and adherence stay visible without feeling noisy." },
  { title: "Clear operations", copy: "Care teams manage patients, appointments, and verification in one flow." },
  { title: "Meaningful rewards", copy: "Healthy actions connect directly to loyalty value and retention." },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "border-b border-border/80 bg-background/92 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-semibold">NH263Care</p>
              <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Care platform</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/login">
              <Button>
                Open app
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/80 bg-background/95 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="mt-2 w-full">Open app</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <section className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="eyebrow">Healthcare loyalty, simplified</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              A calmer way to manage adherence, appointments, and patient loyalty.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              NH263Care brings patient engagement and care operations into one clean experience for patients and
              administrators.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login">
                <Button size="lg">
                  Open patient or admin portal
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#care">
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-panel rounded-[1.5rem] p-6 md:p-7">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Patients supported</p>
                  <p className="mt-2 text-3xl font-semibold">24/7</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Care visibility</p>
                  <p className="mt-2 text-3xl font-semibold">One view</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retention model</p>
                  <p className="mt-2 text-3xl font-semibold">Loyalty-led</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/80 bg-secondary/55 p-6">
              <p className="text-sm text-muted-foreground">What the platform keeps in sync</p>
              <div className="mt-5 space-y-3">
                {[
                  "Medication reminders and refill timing",
                  "Appointment scheduling and follow-up",
                  "Rewards, quizzes, and patient engagement",
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-background px-4 py-3 text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="care" className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Core value</span>
            <h2 className="mt-5 section-heading">Designed to feel clean, not crowded.</h2>
            <p className="mt-4 section-copy">
              The platform should feel dependable and easy to scan. The experience focuses on the next action instead
              of surrounding every detail with heavy visual framing.
            </p>
          </div>

          <div id="platform" className="grid gap-4 md:grid-cols-3">
            {highlights.map((item, index) => {
              const icons = [CalendarClock, ShieldCheck, Trophy]
              const Icon = icons[index]
              return (
                <div key={item.title} className="rounded-[1.25rem] border border-border/80 bg-background p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.copy}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="journeys" className="mx-auto mt-20 max-w-7xl rounded-[1.5rem] border border-border/80 bg-background p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Enroll patients clearly",
                copy: "Capture onboarding and verification information without creating friction.",
              },
              {
                title: "Keep the journey visible",
                copy: "Show medications, visits, and milestones in a way that is easy to follow.",
              },
              {
                title: "Reward follow-through",
                copy: "Tie healthy actions to loyalty benefits patients can actually understand.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
