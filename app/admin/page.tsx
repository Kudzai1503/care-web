"use client"

import Link from "next/link"
import { Bell, CalendarDays, Gift, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { appointments, patients, prescriptions } from "@/lib/mock-data"
import {
  cn,
  formatCompactDate,
  formatDate,
  formatTierLabel,
  getAppointmentStatusClasses,
  getAppointmentTypeLabel,
  getPatientStatusClasses,
  getPrescriptionStatusClasses,
  getTierBadgeClasses,
  titleCase,
} from "@/lib/utils"

const stats = [
  { label: "Active patients", value: patients.filter((patient) => patient.status === "active").length, href: "/admin/patients" },
  { label: "Scheduled visits", value: appointments.filter((appointment) => appointment.status === "scheduled").length, href: "/admin/appointments" },
  { label: "Refill attention", value: prescriptions.filter((prescription) => prescription.status !== "active" && prescription.status !== "collected").length, href: "/admin/reminders" },
]

export default function AdminDashboard() {
  const nextAppointments = appointments.filter((appointment) => appointment.status === "scheduled").slice(0, 4)
  const refillAttention = prescriptions.filter((prescription) => prescription.status === "refill-due" || prescription.status === "overdue").slice(0, 4)
  const recentPatients = patients.slice(0, 5)

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-background shadow-[var(--shadow-soft)]">
      <AdminHeader title="Operations dashboard" description="A clean overview of patients, schedules, and refill follow-up." />

      <div className="space-y-6 px-5 py-6 md:px-8 md:py-8">
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.25rem] border border-border/80 bg-secondary/45 p-6">
            <p className="text-sm text-muted-foreground">Today</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">Keep patient operations clear and moving.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Focus on appointments, refill follow-up, onboarding, and verification from one steady surface.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/admin/onboarding">
                <Button>New onboarding</Button>
              </Link>
              <Link href="/admin/reminders">
                <Button variant="outline">Open reminders</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href} className="rounded-[1rem] border border-border/80 bg-background p-4 hover:border-primary/25">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming appointments</p>
                <h3 className="mt-1 text-xl font-semibold">Schedule</h3>
              </div>
              <Link href="/admin/appointments">
                <Button variant="outline" size="sm">View all</Button>
              </Link>
            </div>

            <div className="space-y-3">
              {nextAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col gap-3 rounded-[1rem] border border-border/70 px-4 py-4 md:flex-row md:items-center">
                  <div className="min-w-24">
                    <p className="text-sm font-medium">{formatCompactDate(appointment.date)}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time} - {appointment.endTime}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">{getAppointmentTypeLabel(appointment.type)} with {appointment.doctor}</p>
                  </div>
                  <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]", getAppointmentStatusClasses(appointment.status))}>
                    {titleCase(appointment.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-border/80 bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refill follow-up</p>
                <h3 className="mt-1 text-xl font-semibold">Attention needed</h3>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {refillAttention.map((prescription) => (
                <div key={prescription.id} className="rounded-[1rem] border border-border/70 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{prescription.medication}</p>
                      <p className="text-sm text-muted-foreground">{prescription.patientName}</p>
                    </div>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]", getPrescriptionStatusClasses(prescription.status))}>
                      {titleCase(prescription.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Refill date: {formatDate(prescription.refillDate)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[1.25rem] border border-border/80 bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recent patients</p>
              <h3 className="mt-1 text-xl font-semibold">Patient overview</h3>
            </div>
            <Link href="/admin/patients">
              <Button variant="outline" size="sm">Open patients</Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border/80 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-3 py-3">Patient</th>
                  <th className="px-3 py-3">Tier</th>
                  <th className="px-3 py-3">Points</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Last visit</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border/60">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback className="bg-primary/12 text-primary">
                            {patient.name.split(" ").map((segment) => segment[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]", getTierBadgeClasses(patient.loyaltyTier))}>
                        {formatTierLabel(patient.loyaltyTier)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm">{patient.points.toLocaleString()}</td>
                    <td className="px-3 py-4">
                      <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]", getPatientStatusClasses(patient.status))}>
                        {titleCase(patient.status)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-muted-foreground">{formatCompactDate(patient.lastVisit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
