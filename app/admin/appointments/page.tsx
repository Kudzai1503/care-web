"use client"

import { useMemo, useState } from "react"
import { Calendar, Clock, MapPin, MoreVertical, Plus, Search, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminHeader } from "@/components/admin/admin-header"
import { appointments } from "@/lib/mock-data"
import {
  cn,
  formatDate,
  getAppointmentStatusClasses,
  getAppointmentTypeLabel,
  isVideoAppointment,
  titleCase,
} from "@/lib/utils"

const filters = ["All", "Scheduled", "Completed", "Cancelled"]
const types = ["All Types", "Consultation", "Follow-up", "Check-up", "Video Call"]

export default function AppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeType, setActiveType] = useState("All Types")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch = !searchQuery || appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = activeFilter === "All" || titleCase(appointment.status) === activeFilter
      const matchesType = activeType === "All Types" || getAppointmentTypeLabel(appointment.type) === activeType
      return matchesSearch && matchesFilter && matchesType
    })
  }, [activeFilter, activeType, searchQuery])

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.72),rgba(246,238,227,0.76))] shadow-[var(--shadow-soft)]">
      <AdminHeader title="Appointments" description="Keep the daily schedule readable, flexible, and easy to act on." />

      <div className="px-5 py-6 md:px-8 md:py-8">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={activeType}
              onChange={(event) => setActiveType(event.target.value)}
              className="h-11 rounded-full border border-border/70 bg-card/70 px-4 text-sm outline-none"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patient name"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-11"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              New appointment
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="glass-panel rounded-[1.7rem] border border-border/70 bg-background/72 p-4 md:p-5"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[1.3rem] bg-secondary text-center">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {formatDate(appointment.date, { month: "short" }).split(" ")[0]}
                  </span>
                  <span className="text-xl font-semibold">{new Date(appointment.date).getDate()}</span>
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={appointment.patientAvatar} />
                  <AvatarFallback className="bg-primary/15 text-primary">
                    {appointment.patientName.split(" ").map((segment) => segment[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{appointment.patientName}</p>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", getAppointmentStatusClasses(appointment.status))}>
                      {titleCase(appointment.status)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getAppointmentTypeLabel(appointment.type)} with {appointment.doctor}
                  </p>
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 xl:min-w-80">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {appointment.time} to {appointment.endTime}
                  </div>
                  <div className="flex items-center gap-2">
                    {isVideoAppointment(appointment.type) ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    {isVideoAppointment(appointment.type) ? "Virtual consult" : "Clinic visit"}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem>Send reminder</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel appointment</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="glass-panel rounded-[1.7rem] p-10 text-center">
              <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">No appointments match the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
