"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarWidgetProps {
  weekDays: Array<{
    day: string
    date: number
    isToday: boolean
  }>
}

export function CalendarWidget({ weekDays }: CalendarWidgetProps) {
  return (
    <div className="rounded-xl bg-card p-5 border border-border">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Calendar</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">This week</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <select className="ml-2 rounded-md border-0 bg-secondary px-3 py-1 text-sm">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day.day}
            className={cn(
              "flex flex-col items-center rounded-lg p-3 transition-colors",
              day.isToday
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            <span className="text-xs font-medium">{day.day}</span>
            <span className="text-lg font-semibold">{day.date}</span>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          7 appointments
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          2 briefings
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          1 video call
        </li>
      </ul>
    </div>
  )
}
