"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react"
import { CaseHospitalLogo } from "@/components/brand/CaseHospitalLogo"
import { Button } from "@/components/ui/button"
import { caseHospitalEligibleServices } from "@/lib/content/caseHospitalLoyalty"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#benefits", label: "Benefits" },
  { href: "#services", label: "Services" },
]

const trustSignals = ["Advance top-ups", "5% bonus", "24-hour credit"]

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
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "border-b border-border/80 bg-background/92 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <CaseHospitalLogo width={88} height={58} />
            <div>
              <p className="text-base font-semibold">Case Hospital</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Loyalty card program</p>
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/90 md:hidden"
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

      <main id="main-content" className="px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <section className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="eyebrow">Case Hospital loyalty card</span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                Advance deposits and bonus rewards for everyday care.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Top up in advance, earn a 5 percent bonus on cash deposits, and manage your card and wallet from one patient account.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <div
                    key={signal}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/80 bg-background/90 px-4 py-2 text-sm text-foreground shadow-[var(--shadow-soft)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login">
                  <Button size="lg">
                    Open patient or admin portal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#services">
                  <Button size="lg" variant="outline">
                    View eligible services
                  </Button>
                </a>
              </div>
            </div>

            <div className="case-panel rounded-[1.8rem] p-6 md:p-7">
              <CaseHospitalLogo width={118} height={76} />
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.2rem] border border-border/70 bg-background px-4 py-4">
                  <p className="text-sm text-muted-foreground">Cash top-up bonus</p>
                  <p className="mt-1 text-3xl font-semibold">5%</p>
                </div>
                <div className="rounded-[1.2rem] border border-border/70 bg-background px-4 py-4">
                  <p className="text-sm text-muted-foreground">Credit timing</p>
                  <p className="mt-1 text-3xl font-semibold">Within 24 hrs</p>
                </div>
                <div className="rounded-[1.2rem] border border-border/70 bg-background px-4 py-4">
                  <p className="text-sm text-muted-foreground">Verification</p>
                  <p className="mt-1 text-base font-semibold">Physical card, card number, or registered phone.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="benefits" className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="case-panel rounded-[1.5rem] p-5">
              <p className="text-sm text-muted-foreground">Top up in advance</p>
              <p className="mt-2 text-base leading-7 text-foreground">Keep money ready for visits and routine care.</p>
            </div>
            <div className="case-panel rounded-[1.5rem] p-5">
              <p className="text-sm text-muted-foreground">Earn bonus points</p>
              <p className="mt-2 text-base leading-7 text-foreground">Receive a 5 percent bonus on each cash top-up.</p>
            </div>
            <div className="case-panel rounded-[1.5rem] p-5">
              <p className="text-sm text-muted-foreground">Manage everything in settings</p>
              <p className="mt-2 text-base leading-7 text-foreground">Card details, wallet guidance, and FAQs live in one place.</p>
            </div>
          </div>

          <div id="services" className="mt-12 case-panel rounded-[1.5rem] p-6">
            <p className="text-sm text-muted-foreground">Eligible bonus-point services</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {caseHospitalEligibleServices.map((item) => (
                <div key={item} className="rounded-xl border border-border/70 bg-background px-4 py-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
