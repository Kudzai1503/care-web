"use client"

import { CalendarDays, Clock, Video, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const appointments = [
  {
    id: "1",
    type: "Follow-up Consultation",
    doctor: "Dr. John Shepard",
    specialty: "Internal Medicine",
    date: "2026-04-10",
    time: "10:00 AM",
    duration: "30 min",
    isOnline: true,
    status: "confirmed",
  },
  {
    id: "2",
    type: "Routine Check-up",
    doctor: "Dr. Baila Megan",
    specialty: "Cardiology",
    date: "2026-04-18",
    time: "2:30 PM",
    duration: "45 min",
    isOnline: false,
    location: "NH263 Clinic, Room 204",
    status: "confirmed",
  },
  {
    id: "3",
    type: "Lab Results Review",
    doctor: "Dr. John Shepard",
    specialty: "Internal Medicine",
    date: "2026-04-25",
    time: "11:00 AM",
    duration: "20 min",
    isOnline: true,
    status: "pending",
  },
]

const pastAppointments = [
  {
    type: "Initial Consultation",
    doctor: "Dr. John Shepard",
    date: "2026-03-15",
    status: "completed",
  },
  {
    type: "Blood Work",
    doctor: "Lab Technician",
    date: "2026-03-20",
    status: "completed",
  },
]

export default function AppointmentsPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground">View and manage your scheduled visits</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Request Appointment
        </Button>
      </div>

      {/* Upcoming */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Upcoming</h2>
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col items-center rounded-xl bg-secondary px-5 py-3 text-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  <span className="text-2xl font-bold">{new Date(apt.date).getDate()}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{apt.type}</h3>
                  <p className="text-muted-foreground">{apt.doctor} - {apt.specialty}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {apt.time} ({apt.duration})
                    </span>
                    <span className="flex items-center gap-1.5">
                      {apt.isOnline ? (
                        <>
                          <Video className="h-4 w-4" />
                          Video Call
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4" />
                          {apt.location}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    apt.status === "confirmed" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                  )}>
                    {apt.status}
                  </span>
                  {apt.isOnline && apt.status === "confirmed" && (
                    <Button size="sm" className="rounded-full">
                      Join Call
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="rounded-full">
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Past Appointments</h2>
        <div className="space-y-3">
          {pastAppointments.map((apt, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{apt.type}</p>
                <p className="text-sm text-muted-foreground">{apt.doctor}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(apt.date).toLocaleDateString()}
              </span>
              <span className="rounded-full bg-gray-500/10 px-3 py-1 text-xs font-medium text-gray-600">
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
