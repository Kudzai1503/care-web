"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Gift, Star, WalletCards } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatDate, getPrescriptionStatusClasses } from "@/lib/utils"
import { formatCurrency, getCaseLoyaltySnapshot, legacyEngagementSummary } from "@/lib/loyalty"

const medicationMoments = [
  { name: "Metformin 500mg", time: "8:00 AM", status: "taken" },
  { name: "Lisinopril 10mg", time: "12:00 PM", status: "upcoming" },
  { name: "Atorvastatin 20mg", time: "8:00 PM", status: "refill-due" },
]

const upcomingAppointments = [
  { type: "Follow-up", doctor: "Dr. Shepard", date: "2026-04-10", time: "10:00 AM" },
  { type: "Check-up", doctor: "Dr. Megan", date: "2026-04-18", time: "2:30 PM" },
]

const rewards = [
  { title: "Pharmacy discount", points: 500 },
  { title: "Free consultation", points: 1000 },
]

export default function PatientDashboard() {
  const snapshot = getCaseLoyaltySnapshot(new Date("2026-04-15T10:30:00.000Z"))
  const takenCount = medicationMoments.filter((medication) => medication.status === "taken").length

  return (
    <div className="space-y-6">
      <section className="clinical-surface rounded-[1.5rem] p-6 md:p-8">
        <p className="text-sm text-muted-foreground">Today</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
          Welcome back, {snapshot.account.fullName.split(" ")[0]}.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Your medications, appointments, and wallet details are organized in one place so the next step stays clear.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-[1rem] border border-border/80 bg-secondary/45 p-4">
            <p className="text-sm text-muted-foreground">Stored value</p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(snapshot.wallet.storedValueBalance)}</p>
          </div>
          <div className="rounded-[1rem] border border-border/80 bg-secondary/45 p-4">
            <p className="text-sm text-muted-foreground">Available bonus points</p>
            <p className="mt-2 text-2xl font-semibold">{snapshot.wallet.availablePoints.toLocaleString()}</p>
          </div>
          <div className="rounded-[1rem] border border-border/80 bg-secondary/45 p-4">
            <p className="text-sm text-muted-foreground">Pending 24-hour bonus</p>
            <p className="mt-2 text-2xl font-semibold">{snapshot.wallet.pendingPoints.toLocaleString()}</p>
          </div>
          <div className="rounded-[1rem] border border-border/80 bg-secondary/45 p-4">
            <p className="text-sm text-muted-foreground">Today&apos;s progress</p>
            <p className="mt-2 text-2xl font-semibold">{takenCount}/3</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/patient/wallet">
              <WalletCards className="h-4 w-4" />
              Open wallet
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/patient/settings">
              View profile
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Medications</p>
              <h2 className="mt-1 text-xl font-semibold">Today&apos;s schedule</h2>
            </div>
            <Link href="/patient/medications">
              <Button variant="outline" size="sm">Open medications</Button>
            </Link>
          </div>

          <div className="space-y-3">
            {medicationMoments.map((medication) => (
              <div key={medication.name} className="flex flex-col gap-3 rounded-[1rem] border border-border/70 px-4 py-4 md:flex-row md:items-center">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", medication.status === "taken" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                  {medication.status === "taken" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-muted-foreground">{medication.time}</p>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]", medication.status === "taken" ? "bg-primary/12 text-primary" : getPrescriptionStatusClasses(medication.status === "refill-due" ? "refill-due" : "active"))}>
                  {medication.status === "taken" ? "Taken" : medication.status === "refill-due" ? "Refill due" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Appointments</p>
              <h2 className="mt-1 text-xl font-semibold">Upcoming</h2>
            </div>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={`${appointment.date}-${appointment.time}`} className="rounded-[1rem] border border-border/70 px-4 py-4">
                <p className="font-medium">{appointment.type}</p>
                <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                <p className="mt-2 text-sm">{formatDate(appointment.date)} at {appointment.time}</p>
              </div>
            ))}
          </div>
          <Link href="/patient/appointments" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
            Manage appointments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rewards</p>
              <h2 className="mt-1 text-xl font-semibold">Legacy engagement rewards</h2>
            </div>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div key={reward.title} className="flex items-center justify-between rounded-[1rem] border border-border/70 px-4 py-4">
                <p className="font-medium">{reward.title}</p>
                <span className="text-sm text-primary">{reward.points} pts</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            These points remain separate from your Case Hospital stored-value wallet and 5 percent top-up bonus points.
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Focus</p>
              <h2 className="mt-1 text-xl font-semibold">Next steps</h2>
            </div>
            <Star className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-3">
            {[
              "Take your noon medication on time.",
              "Prepare for your April 10 follow-up.",
              `Review your wallet before using ${legacyEngagementSummary.points.toLocaleString()} engagement points.`,
            ].map((item) => (
              <div key={item} className="rounded-[1rem] border border-border/70 px-4 py-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
