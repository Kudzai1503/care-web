"use client"

import { useState } from "react"
import { Check, ChevronRight, User, FileText, Shield, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { AdminHeader } from "@/components/admin/admin-header"

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Medical History", icon: FileText },
  { id: 3, title: "Insurance & Verification", icon: Shield },
  { id: 4, title: "Loyalty Enrollment", icon: Gift },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    conditions: [] as string[],
    allergies: "",
    currentMedications: "",
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    enrollInLoyalty: true,
    consentMarketing: false,
    consentDataSharing: true,
  })

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    alert("Patient onboarded successfully!")
    setCurrentStep(1)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      conditions: [],
      allergies: "",
      currentMedications: "",
      insuranceProvider: "",
      policyNumber: "",
      groupNumber: "",
      enrollInLoyalty: true,
      consentMarketing: false,
      consentDataSharing: true,
    })
  }

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }))
  }

  return (
    <div className="flex h-screen flex-col">
      <AdminHeader title="Patient Onboarding" />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                        currentStep > step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : currentStep === step.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium",
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-4 h-0.5 w-24 transition-colors",
                        currentStep > step.id ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the patient&apos;s basic contact details
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Medical History */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Medical History</h2>
                  <p className="text-sm text-muted-foreground">
                    Select applicable conditions and provide medical details
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Chronic Conditions</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Diabetes Type 1",
                      "Diabetes Type 2",
                      "Hypertension",
                      "Heart Disease",
                      "Asthma",
                      "COPD",
                      "Chronic Kidney Disease",
                      "Rheumatoid Arthritis",
                      "Epilepsy",
                      "Neuropathy",
                    ].map((condition) => (
                      <label
                        key={condition}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                          formData.conditions.includes(condition)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          checked={formData.conditions.includes(condition)}
                          onCheckedChange={() => toggleCondition(condition)}
                        />
                        <span className="text-sm">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => updateFormData("allergies", e.target.value)}
                    placeholder="List any known allergies..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    value={formData.currentMedications}
                    onChange={(e) =>
                      updateFormData("currentMedications", e.target.value)
                    }
                    placeholder="List current medications and dosages..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Insurance & Verification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Insurance & Verification</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter insurance details for verification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={(e) =>
                      updateFormData("insuranceProvider", e.target.value)
                    }
                    placeholder="Blue Cross Blue Shield"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) =>
                        updateFormData("policyNumber", e.target.value)
                      }
                      placeholder="POL-123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupNumber">Group Number</Label>
                    <Input
                      id="groupNumber"
                      value={formData.groupNumber}
                      onChange={(e) =>
                        updateFormData("groupNumber", e.target.value)
                      }
                      placeholder="GRP-98765"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Insurance verification will be processed within 24-48 hours.
                    The patient will be notified once verification is complete.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Loyalty Enrollment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Loyalty Program Enrollment</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure loyalty program preferences
                  </p>
                </div>

                <div className="rounded-lg border border-primary bg-primary/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Gift className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Case Hospital Loyalty Card</h3>
                      <p className="text-sm text-muted-foreground">
                        Enroll the patient into the stored-value wallet and bonus-points program.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Patients can deposit funds in advance for future care.
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Each cash top-up earns a 5 percent bonus credited within 24 hours.
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Bonus points redeem only for the documented clinical service categories.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={formData.enrollInLoyalty}
                      onCheckedChange={(checked) =>
                        updateFormData("enrollInLoyalty", checked)
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium">
                        Enroll in Case Hospital loyalty
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Patient wallet access and loyalty-card verification will be enabled.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={formData.consentMarketing}
                      onCheckedChange={(checked) =>
                        updateFormData("consentMarketing", checked)
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium">Marketing Communications</span>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and health tips
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={formData.consentDataSharing}
                      onCheckedChange={(checked) =>
                        updateFormData("consentDataSharing", checked)
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium">Data Sharing Consent</span>
                      <p className="text-sm text-muted-foreground">
                        Allow sharing anonymized data for research purposes
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              {currentStep < 4 ? (
                <Button onClick={handleNext} className="gap-2">
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2">
                  Complete Onboarding
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
