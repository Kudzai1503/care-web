"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Gift,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Pill,
  Settings,
  Sun,
  Trophy,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/patient", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/patient/medications", icon: Pill, label: "Medications" },
  { href: "/patient/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/patient/rewards", icon: Gift, label: "Rewards" },
  { href: "/patient/quizzes", icon: Trophy, label: "Quizzes" },
]

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 lg:hidden"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/patient" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(34,211,238,0.16)]">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold leading-none">NH263Care</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Patient portal</p>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 p-1.5 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_10px_22px_rgba(34,211,238,0.16)]"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link href="/patient/settings">
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <div className="hidden items-center gap-3 rounded-full border border-border/70 bg-card/70 px-2.5 py-2 sm:flex">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-primary/15 text-primary">JC</AvatarFallback>
              </Avatar>
              <div className="pr-2">
                <p className="text-sm font-semibold leading-none">Jennifer Cole</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Gold member</p>
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-border/60 bg-background/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/70 bg-card/70 text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/"
                className="mt-1 flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-card/70 px-4 py-3 text-sm font-semibold"
              >
                <LogOut className="h-5 w-5" />
                Log out
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
