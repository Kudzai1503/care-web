"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Patient, LoyaltyTier } from "@/lib/mock-data"

interface PatientCardProps {
  patient: Patient
  isSelected: boolean
  onClick: () => void
}

export function PatientCard({ patient, isSelected, onClick }: PatientCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl border p-4 transition-all",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {patient.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{patient.name}</h3>
            <LoyaltyBadge tier={patient.loyaltyTier} />
          </div>
          <p className="text-sm text-muted-foreground">
            {patient.conditions[0]}
            {patient.conditions.length > 1 && ` +${patient.conditions.length - 1}`}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{patient.points.toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {patient.conditions.slice(0, 2).map((condition) => (
          <Badge key={condition} variant="secondary" className="text-xs">
            {condition}
          </Badge>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Last visit: {formatDate(patient.lastVisit)}</span>
        <span className={cn(
          "px-2 py-0.5 rounded-full",
          patient.status === "active" ? "bg-emerald-100 text-emerald-700" :
          patient.status === "pending" ? "bg-amber-100 text-amber-700" :
          "bg-slate-100 text-slate-700"
        )}>
          {patient.status}
        </span>
      </div>
    </div>
  )
}

function LoyaltyBadge({ tier }: { tier: LoyaltyTier }) {
  const colors = {
    bronze: "bg-amber-600 text-white",
    silver: "bg-slate-400 text-white",
    gold: "bg-yellow-500 text-white",
    platinum: "bg-slate-700 text-white",
  }

  return (
    <span className={cn(
      "px-1.5 py-0.5 rounded text-[10px] font-medium uppercase",
      colors[tier]
    )}>
      {tier}
    </span>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
