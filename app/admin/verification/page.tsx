"use client"

import { useState } from "react"
import { Check, X, FileText, Clock, Eye, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AdminHeader } from "@/components/admin/admin-header"
import { verifications, type Verification, type VerificationStatus } from "@/lib/mock-data"

export default function VerificationPage() {
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectNotes, setRejectNotes] = useState("")
  const [filter, setFilter] = useState<"all" | VerificationStatus>("all")

  const filteredVerifications =
    filter === "all"
      ? verifications
      : verifications.filter((v) => v.status === filter)

  const pendingCount = verifications.filter((v) => v.status === "pending").length
  const approvedCount = verifications.filter((v) => v.status === "approved").length
  const rejectedCount = verifications.filter((v) => v.status === "rejected").length

  const handleApprove = (verification: Verification) => {
    // Handle approval logic
    alert(`Approved verification for ${verification.patientName}`)
  }

  const handleReject = () => {
    if (selectedVerification) {
      // Handle rejection logic
      alert(`Rejected verification for ${selectedVerification.patientName}. Notes: ${rejectNotes}`)
      setShowRejectDialog(false)
      setRejectNotes("")
      setSelectedVerification(null)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <AdminHeader title="Condition Verification" />

      <div className="flex-1 overflow-auto p-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
                <p className="text-sm text-amber-600">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">{approvedCount}</p>
                <p className="text-sm text-emerald-600">Approved</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                <X className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-700">{rejectedCount}</p>
                <p className="text-sm text-red-600">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                filter === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Verification Queue */}
        <div className="space-y-4">
          {filteredVerifications.map((verification) => (
            <div
              key={verification.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={verification.patientAvatar}
                      alt={verification.patientName}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {verification.patientName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{verification.patientName}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{verification.documentType}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Uploaded: {formatDate(verification.uploadDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={verification.status} />
                  
                  {verification.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => {
                          // View document
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleApprove(verification)}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => {
                          setSelectedVerification(verification)
                          setShowRejectDialog(true)
                        }}
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Patient Profile</DropdownMenuItem>
                      <DropdownMenuItem>Download Document</DropdownMenuItem>
                      <DropdownMenuItem>Request Re-upload</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {verification.notes && (
                <div className="mt-4 rounded-lg bg-secondary p-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Notes:</span> {verification.notes}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredVerifications.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-semibold">No verifications found</h3>
              <p className="text-sm text-muted-foreground">
                {filter === "pending"
                  ? "All verifications have been processed"
                  : "No verifications match the selected filter"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Verification</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this verification. The patient
              will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatusBadge({ status }: { status: VerificationStatus }) {
  const styles: Record<VerificationStatus, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
  }

  return (
    <Badge className={cn("capitalize", styles[status])} variant="secondary">
      {status}
    </Badge>
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
