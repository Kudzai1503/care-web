"use client"

import { Mail, Phone, Calendar, Star, Award, Activity } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Patient, Prescription, LoyaltyTier } from "@/lib/mock-data"

interface PatientDetailProps {
  patient: Patient
  prescriptions: Prescription[]
}

export function PatientDetail({ patient, prescriptions }: PatientDetailProps) {
  const patientPrescriptions = prescriptions.filter(
    (rx) => rx.patientId === patient.id
  )

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <LoyaltyTierBadge tier={patient.loyaltyTier} />
              </div>
              <p className="text-muted-foreground">
                {patient.conditions.join(" | ")}
              </p>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  {patient.points.toLocaleString()} points
                </span>
                <span>{patient.age} years old</span>
              </div>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Book an Appointment
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{patient.email}</span>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{patient.phone}</span>
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Medical Conditions
          </h3>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition) => (
              <Badge key={condition} variant="outline" className="text-sm">
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        {/* Loyalty Program */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            Loyalty Program
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {patient.points.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-2xl font-bold capitalize">{patient.loyaltyTier}</p>
              <p className="text-xs text-muted-foreground">Current Tier</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-2xl font-bold">
                {formatDate(patient.enrollmentDate)}
              </p>
              <p className="text-xs text-muted-foreground">Member Since</p>
            </div>
          </div>
        </div>

        {/* Prescriptions */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Active Prescriptions
          </h3>
          {patientPrescriptions.length > 0 ? (
            <div className="space-y-3">
              {patientPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="flex items-center justify-between rounded-lg bg-secondary p-3"
                >
                  <div>
                    <p className="font-medium">{rx.medication}</p>
                    <p className="text-sm text-muted-foreground">
                      {rx.dosage} - {rx.frequency}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={rx.status} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Refill: {formatDate(rx.refillDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No active prescriptions
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function LoyaltyTierBadge({ tier }: { tier: LoyaltyTier }) {
  const colors = {
    bronze: "bg-amber-600 text-white",
    silver: "bg-slate-400 text-white",
    gold: "bg-yellow-500 text-white",
    platinum: "bg-slate-700 text-white",
  }

  return (
    <span className={cn(
      "px-2 py-1 rounded text-xs font-medium uppercase",
      colors[tier]
    )}>
      {tier}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    "refill-due": "bg-amber-100 text-amber-700",
    collected: "bg-slate-100 text-slate-700",
    overdue: "bg-red-100 text-red-700",
  }

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-full text-xs font-medium",
      colors[status] || "bg-slate-100 text-slate-700"
    )}>
      {status.replace("-", " ")}
    </span>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
