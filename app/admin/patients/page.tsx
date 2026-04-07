"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PatientCard } from "@/components/admin/patient-card"
import { PatientDetail } from "@/components/admin/patient-detail"
import { AdminHeader } from "@/components/admin/admin-header"
import { patients, prescriptions } from "@/lib/mock-data"

const categories = [
  { id: "all", label: "All" },
  { id: "chronic", label: "Chronic" },
  { id: "new", label: "New" },
  { id: "high-risk", label: "High-Risk" },
  { id: "verified", label: "Verified" },
]

export default function PatientsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    
    if (selectedCategory === "all") return matchesSearch
    if (selectedCategory === "chronic") {
      return matchesSearch && patient.conditions.length > 1
    }
    if (selectedCategory === "new") {
      const enrollDate = new Date(patient.enrollmentDate)
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      return matchesSearch && enrollDate > threeMonthsAgo
    }
    if (selectedCategory === "high-risk") {
      const highRiskConditions = ["Heart Disease", "Chronic Kidney Disease", "Diabetes Type 1"]
      return matchesSearch && patient.conditions.some(c => highRiskConditions.includes(c))
    }
    if (selectedCategory === "verified") {
      return matchesSearch && patient.status === "active"
    }
    return matchesSearch
  })

  return (
    <div className="flex h-screen flex-col">
      <AdminHeader title="Patient Management" />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Patient List */}
        <div className="w-[400px] flex-shrink-0 border-r border-border bg-background">
          <div className="p-4 border-b border-border">
            {/* Category Chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Patients ({filteredPatients.length})
              </h2>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 overflow-auto max-h-[calc(100vh-280px)]">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isSelected={selectedPatient?.id === patient.id}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}

              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No patients found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Patient Detail */}
        <div className="flex-1 bg-background overflow-hidden">
          {selectedPatient ? (
            <PatientDetail
              patient={selectedPatient}
              prescriptions={prescriptions}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a patient to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
