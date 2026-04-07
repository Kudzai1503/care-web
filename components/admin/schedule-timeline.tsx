"use client"

import { ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/mock-data"

interface ScheduleTimelineProps {
  appointments: Appointment[]
}

export function ScheduleTimeline({ appointments }: ScheduleTimelineProps) {
  return (
    <div className="space-y-1">
      {appointments.map((apt, index) => {
        const isLunchBreak = apt.time === "11:15"
        
        return (
          <div key={apt.id}>
            {isLunchBreak && index > 0 && (
              <div className="flex items-center gap-4 py-2 px-4 rounded-lg bg-foreground text-background my-1">
                <span className="text-sm font-medium w-20">11:15 AM</span>
                <span className="flex-1 text-center text-sm tracking-widest">
                  {"• ".repeat(8)} Lunch Break {"• ".repeat(8)}
                </span>
              </div>
            )}
            <div className="group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-secondary">
              <span className="w-20 text-sm text-muted-foreground">
                {formatTime(apt.time)}
              </span>
              <div className="flex flex-1 items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={apt.patientAvatar} alt={apt.patientName} />
                  <AvatarFallback className={getAvatarColor(index)}>
                    {apt.patientName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{apt.patientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(apt.time)} - {formatTime(apt.endTime)}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":")
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

function getAvatarColor(index: number): string {
  const colors = [
    "bg-blue-500 text-white",
    "bg-emerald-500 text-white",
    "bg-amber-500 text-white",
    "bg-rose-500 text-white",
    "bg-violet-500 text-white",
    "bg-cyan-500 text-white",
    "bg-orange-500 text-white",
    "bg-pink-500 text-white",
  ]
  return colors[index % colors.length]
}
