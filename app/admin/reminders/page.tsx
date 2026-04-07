"use client"

import { useMemo, useState } from "react"
import { Bell, Calendar, CheckCircle2, Clock, Pill, Plus, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { appointments, patients, prescriptions } from "@/lib/mock-data"
import { cn, formatDate, getPrescriptionStatusClasses, titleCase } from "@/lib/utils"

const reminderTypes = ["All", "Refills", "Appointments", "Promotions"]

interface Reminder {
  id: string
  type: "refill" | "appointment" | "promotion"
  title: string
  description: string
  patientName: string
  patientAvatar: string
  dueDate: string
  status: "pending" | "sent" | "completed"
  priority: "urgent" | "normal" | "low"
}

const initialReminders: Reminder[] = [
  ...prescriptions
    .filter((prescription) => prescription.status === "refill-due" || prescription.status === "overdue")
    .map((prescription) => ({
      id: `refill-${prescription.id}`,
      type: "refill" as const,
      title: `${prescription.medication} refill due`,
      description: `${prescription.dosage} for ${prescription.frequency.toLowerCase()}`,
      patientName: prescription.patientName,
      patientAvatar: patients.find((patient) => patient.id === prescription.patientId)?.avatar ?? "",
      dueDate: prescription.refillDate,
      status: "pending" as const,
      priority: prescription.status === "overdue" ? "urgent" as const : "normal" as const,
    })),
  ...appointments
    .filter((appointment) => appointment.status === "scheduled")
    .slice(0, 3)
    .map((appointment) => ({
      id: `apt-${appointment.id}`,
      type: "appointment" as const,
      title: `${titleCase(appointment.type)} reminder`,
      description: `Upcoming visit at ${appointment.time} with ${appointment.doctor}`,
      patientName: appointment.patientName,
      patientAvatar: appointment.patientAvatar,
      dueDate: appointment.date,
      status: "pending" as const,
      priority: "normal" as const,
    })),
]

export default function RemindersPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [reminderList, setReminderList] = useState(initialReminders)

  const filteredReminders = useMemo(() => {
    return reminderList.filter((reminder) => {
      if (activeFilter === "All") return true
      if (activeFilter === "Refills") return reminder.type === "refill"
      if (activeFilter === "Appointments") return reminder.type === "appointment"
      if (activeFilter === "Promotions") return reminder.type === "promotion"
      return true
    })
  }, [activeFilter, reminderList])

  const handleSendReminder = (id: string) => {
    setReminderList((previous) =>
      previous.map((reminder) => (reminder.id === id ? { ...reminder, status: "sent" } : reminder))
    )
  }

  const pendingCount = reminderList.filter((reminder) => reminder.status === "pending").length
  const sentCount = reminderList.filter((reminder) => reminder.status === "sent").length

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.72),rgba(246,238,227,0.76))] shadow-[var(--shadow-soft)]">
      <AdminHeader title="Reminders" description="Keep refill prompts and appointment nudges timely without losing the human tone." />

      <div className="px-5 py-6 md:px-8 md:py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="metric-card rounded-[1.8rem] p-5">
            <Clock className="h-5 w-5 text-primary" />
            <p className="mt-5 text-3xl font-semibold">{pendingCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Pending reminders</p>
          </div>
          <div className="metric-card rounded-[1.8rem] p-5">
            <Send className="h-5 w-5 text-primary" />
            <p className="mt-5 text-3xl font-semibold">{sentCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Sent this session</p>
          </div>
          <div className="metric-card rounded-[1.8rem] p-5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <p className="mt-5 text-3xl font-semibold">94%</p>
            <p className="mt-2 text-sm text-muted-foreground">Response rate trend</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {reminderTypes.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  activeFilter === filter
                    ? "border-primary/35 bg-primary text-primary-foreground"
                    : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <Button>
            <Plus className="h-4 w-4" />
            Create reminder
          </Button>
        </div>

        <div className="space-y-3">
          {filteredReminders.map((reminder) => (
            <div key={reminder.id} className="glass-panel rounded-[1.7rem] border border-border/70 bg-background/72 p-4 md:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    reminder.type === "refill" && "bg-primary/10 text-primary",
                    reminder.type === "appointment" && "bg-primary/12 text-primary",
                    reminder.type === "promotion" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  {reminder.type === "refill" && <Pill className="h-5 w-5" />}
                  {reminder.type === "appointment" && <Calendar className="h-5 w-5" />}
                  {reminder.type === "promotion" && <Bell className="h-5 w-5" />}
                </div>

                <Avatar className="h-11 w-11">
                  <AvatarImage src={reminder.patientAvatar} />
                  <AvatarFallback className="bg-primary/15 text-primary">
                    {reminder.patientName.split(" ").map((segment) => segment[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{reminder.title}</p>
                    {reminder.priority === "urgent" && (
                      <span className="rounded-full bg-destructive/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-destructive">
                        Urgent
                      </span>
                    )}
                    {reminder.type === "refill" && (
                      <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", getPrescriptionStatusClasses("refill-due"))}>
                        Refill cycle
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {reminder.patientName} · {reminder.description}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground">Due {formatDate(reminder.dueDate)}</div>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
                    reminder.status === "pending" && "bg-primary/10 text-primary",
                    reminder.status === "sent" && "bg-primary/12 text-primary",
                    reminder.status === "completed" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  {titleCase(reminder.status)}
                </span>

                {reminder.status === "pending" && (
                  <Button size="sm" onClick={() => handleSendReminder(reminder.id)}>
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
