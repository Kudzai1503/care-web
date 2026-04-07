"use client"

import { Pill, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const medications = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    times: ["8:00 AM", "8:00 PM"],
    refillDate: "2026-04-15",
    remaining: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    times: ["12:00 PM"],
    refillDate: "2026-04-20",
    remaining: 18,
    status: "active",
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    times: ["8:00 PM"],
    refillDate: "2026-04-08",
    remaining: 3,
    status: "refill-soon",
  },
]

const todaySchedule = [
  { medication: "Metformin 500mg", time: "8:00 AM", status: "taken" },
  { medication: "Lisinopril 10mg", time: "12:00 PM", status: "upcoming" },
  { medication: "Metformin 500mg", time: "8:00 PM", status: "upcoming" },
  { medication: "Atorvastatin 20mg", time: "8:00 PM", status: "upcoming" },
]

export default function MedicationsPage() {
  const takenCount = todaySchedule.filter(s => s.status === "taken").length

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Medications</h1>
        <p className="text-muted-foreground">Track and manage your prescriptions</p>
      </div>

      {/* Today's Progress */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Today&apos;s Progress</h2>
            <p className="text-muted-foreground">{takenCount} of {todaySchedule.length} medications taken</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
            <span className="text-xl font-bold">{Math.round((takenCount / todaySchedule.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Today&apos;s Schedule</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {todaySchedule.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-4 rounded-xl border border-border bg-card p-4",
                item.status === "taken" && "border-green-500/30 bg-green-500/5"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                item.status === "taken" ? "bg-green-500/10" : "bg-secondary"
              )}>
                {item.status === "taken" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.medication}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
              {item.status !== "taken" && (
                <Button size="sm" className="rounded-full">
                  Take Now
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Medications */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">All Medications</h2>
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    med.status === "refill-soon" ? "bg-orange-500/10" : "bg-primary/10"
                  )}>
                    <Pill className={cn(
                      "h-6 w-6",
                      med.status === "refill-soon" ? "text-orange-600" : "text-primary"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{med.name} {med.dosage}</h3>
                    <p className="text-sm text-muted-foreground">{med.frequency} - {med.times.join(", ")}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Refill: {new Date(med.refillDate).toLocaleDateString()}
                  </div>
                  {med.status === "refill-soon" && (
                    <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {med.remaining} pills left
                    </span>
                  )}
                  <Button size="sm" variant="outline" className="rounded-full">
                    Request Refill
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
