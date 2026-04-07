"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, HeartHandshake, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Role = "patient" | "admin"

const roleOptions: { value: Role; label: string; hint: string; icon: typeof User }[] = [
  { value: "patient", label: "Patient portal", hint: "Medications, appointments, rewards, and quizzes.", icon: User },
  { value: "admin", label: "Admin console", hint: "Patients, reminders, onboarding, and verification.", icon: Shield },
]

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    router.push(role === "admin" ? "/admin" : "/patient")
  }

  return (
    <div className="min-h-screen px-5 py-6 md:px-8">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-border/80 bg-background shadow-[var(--shadow-soft)]">
        <div className="grid min-h-[calc(100vh-3rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden border-r border-border/80 bg-secondary/45 px-10 py-10 lg:block">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-16 max-w-md">
              <p className="text-sm text-muted-foreground">NH263Care access</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">One login for the care side you manage today.</h1>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Patients stay on top of their care journey. Administrators keep the full workflow moving.
              </p>
            </div>
          </section>

          <section className="flex items-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-md">
              <Link href="/" className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <HeartHandshake className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-base font-semibold">NH263Care</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Secure access</p>
                </div>
              </Link>

              <h2 className="text-3xl font-semibold">Welcome back</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Sign in to continue to your patient or admin experience.
              </p>

              <div className="mt-8 grid gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={cn(
                      "rounded-[1rem] border px-4 py-4 text-left transition-all",
                      role === option.value
                        ? "border-primary/30 bg-accent"
                        : "border-border/80 bg-background hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          role === option.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <option.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{option.label}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{option.hint}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-primary hover:text-primary/80">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
                  Keep me signed in
                </label>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
