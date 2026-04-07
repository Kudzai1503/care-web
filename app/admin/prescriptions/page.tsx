"use client"

import { useState } from "react"
import { Search, Filter, Bell, CheckCircle, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AdminHeader } from "@/components/admin/admin-header"
import { prescriptions, type PrescriptionStatus } from "@/lib/mock-data"

const statusFilters = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "refill-due", label: "Refill Due" },
  { id: "overdue", label: "Overdue" },
  { id: "collected", label: "Collected" },
]

export default function PrescriptionsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrescriptions = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    return matchesSearch && rx.status === selectedFilter
  })

  const stats = {
    total: prescriptions.length,
    active: prescriptions.filter((rx) => rx.status === "active").length,
    refillDue: prescriptions.filter((rx) => rx.status === "refill-due").length,
    overdue: prescriptions.filter((rx) => rx.status === "overdue").length,
  }

  return (
    <div className="flex h-screen flex-col">
      <AdminHeader title="Prescription Tracking" />

      <div className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <StatCard
            label="Total Prescriptions"
            value={stats.total}
            variant="default"
          />
          <StatCard label="Active" value={stats.active} variant="success" />
          <StatCard
            label="Refill Due"
            value={stats.refillDue}
            variant="warning"
          />
          <StatCard label="Overdue" value={stats.overdue} variant="danger" />
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Refill Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((rx) => (
                <TableRow key={rx.id}>
                  <TableCell className="font-medium">{rx.patientName}</TableCell>
                  <TableCell>{rx.medication}</TableCell>
                  <TableCell>{rx.dosage}</TableCell>
                  <TableCell>{rx.frequency}</TableCell>
                  <TableCell>{formatDate(rx.refillDate)}</TableCell>
                  <TableCell>
                    <StatusBadge status={rx.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Send Reminder"
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Mark Collected"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Prescription</DropdownMenuItem>
                          <DropdownMenuItem>View Patient</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Prescription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredPrescriptions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No prescriptions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  variant,
}: {
  label: string
  value: number
  variant: "default" | "success" | "warning" | "danger"
}) {
  const colors = {
    default: "bg-card border-border",
    success: "bg-emerald-50 border-emerald-200",
    warning: "bg-amber-50 border-amber-200",
    danger: "bg-red-50 border-red-200",
  }

  const textColors = {
    default: "text-foreground",
    success: "text-emerald-700",
    warning: "text-amber-700",
    danger: "text-red-700",
  }

  return (
    <div className={cn("rounded-xl border p-4", colors[variant])}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={cn("text-3xl font-bold", textColors[variant])}>{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: PrescriptionStatus }) {
  const colors: Record<PrescriptionStatus, string> = {
    active: "bg-emerald-100 text-emerald-700",
    "refill-due": "bg-amber-100 text-amber-700",
    collected: "bg-slate-100 text-slate-700",
    overdue: "bg-red-100 text-red-700",
  }

  const labels: Record<PrescriptionStatus, string> = {
    active: "Active",
    "refill-due": "Refill Due",
    collected: "Collected",
    overdue: "Overdue",
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        colors[status]
      )}
    >
      {labels[status]}
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
