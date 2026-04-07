"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

const monthlyData = [
  { month: "Jan", patients: 12 },
  { month: "Feb", patients: 15 },
  { month: "Mar", patients: 18 },
  { month: "Apr", patients: 14 },
  { month: "May", patients: 22 },
  { month: "June", patients: 19 },
  { month: "July", patients: 25 },
  { month: "Aug", patients: 28 },
  { month: "Sep", patients: 32 },
  { month: "Oct", patients: 29 },
  { month: "Nov", patients: 35 },
  { month: "Dec", patients: 38 },
]

interface PatientStatsProps {
  adminName: string
  adminRole: string
  adminAvatar: string
  activePatientAvatars: string[]
}

export function PatientStats({
  adminName,
  adminRole,
  adminAvatar,
  activePatientAvatars,
}: PatientStatsProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-card p-5 border border-border">
      <div className="mb-6 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={adminAvatar} alt={adminName} />
          <AvatarFallback className="text-lg">
            {adminName.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">{adminName}</h3>
        <p className="text-sm text-muted-foreground">{adminRole}</p>
      </div>

      <div className="mb-6 rounded-lg bg-secondary p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Active Patients</span>
          <div className="flex -space-x-2">
            {activePatientAvatars.slice(0, 4).map((avatar, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {i + 1}
                </AvatarFallback>
              </Avatar>
            ))}
            {activePatientAvatars.length > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-primary-foreground">
                +{activePatientAvatars.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Patient Statistics</h4>
            <p className="text-sm text-primary">30% increase</p>
          </div>
          <select className="rounded-md border-0 bg-secondary px-3 py-1 text-sm">
            <option>Yearly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Bar 
                dataKey="patients" 
                fill="currentColor" 
                className="fill-foreground"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
