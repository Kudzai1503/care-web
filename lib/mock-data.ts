export type LoyaltyTier = "bronze" | "silver" | "gold" | "platinum"
export type PatientStatus = "active" | "inactive" | "pending"
export type PrescriptionStatus = "active" | "refill-due" | "collected" | "overdue"
export type AppointmentType = "consultation" | "follow-up" | "video-call" | "checkup"
export type VerificationStatus = "pending" | "approved" | "rejected"

export interface Patient {
  id: string
  name: string
  avatar: string
  age: number
  email: string
  phone: string
  conditions: string[]
  loyaltyTier: LoyaltyTier
  points: number
  lastVisit: string
  status: PatientStatus
  enrollmentDate: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  medication: string
  dosage: string
  frequency: string
  refillDate: string
  status: PrescriptionStatus
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientAvatar: string
  date: string
  time: string
  endTime: string
  type: AppointmentType
  doctor: string
  status: "scheduled" | "completed" | "cancelled"
}

export interface Verification {
  id: string
  patientId: string
  patientName: string
  patientAvatar: string
  documentType: string
  uploadDate: string
  status: VerificationStatus
  notes?: string
}

export const patients: Patient[] = [
  {
    id: "1",
    name: "Jennifer Cole",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 28,
    email: "jennifer.cole@email.com",
    phone: "+1 (555) 123-4567",
    conditions: ["Diabetes Type 2", "Hypertension"],
    loyaltyTier: "gold",
    points: 2450,
    lastVisit: "2026-04-01",
    status: "active",
    enrollmentDate: "2024-06-15",
  },
  {
    id: "2",
    name: "Hayley Bing",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 35,
    email: "hayley.bing@email.com",
    phone: "+1 (555) 234-5678",
    conditions: ["Asthma"],
    loyaltyTier: "silver",
    points: 1200,
    lastVisit: "2026-03-28",
    status: "active",
    enrollmentDate: "2025-01-10",
  },
  {
    id: "3",
    name: "Sara Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 42,
    email: "sara.parker@email.com",
    phone: "+1 (555) 345-6789",
    conditions: ["Chronic Kidney Disease", "Diabetes Type 2"],
    loyaltyTier: "platinum",
    points: 5800,
    lastVisit: "2026-04-03",
    status: "active",
    enrollmentDate: "2023-03-22",
  },
  {
    id: "4",
    name: "James Gordon",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 55,
    email: "james.gordon@email.com",
    phone: "+1 (555) 456-7890",
    conditions: ["Heart Disease", "Hypertension"],
    loyaltyTier: "gold",
    points: 3100,
    lastVisit: "2026-03-15",
    status: "active",
    enrollmentDate: "2024-02-08",
  },
  {
    id: "5",
    name: "Rose Key",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 31,
    email: "rose.key@email.com",
    phone: "+1 (555) 567-8901",
    conditions: ["COPD"],
    loyaltyTier: "bronze",
    points: 450,
    lastVisit: "2026-04-05",
    status: "active",
    enrollmentDate: "2026-01-20",
  },
  {
    id: "6",
    name: "Kara Jordan",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 48,
    email: "kara.jordan@email.com",
    phone: "+1 (555) 678-9012",
    conditions: ["Rheumatoid Arthritis"],
    loyaltyTier: "silver",
    points: 980,
    lastVisit: "2026-03-20",
    status: "active",
    enrollmentDate: "2025-05-14",
  },
  {
    id: "7",
    name: "Mark Pope",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 62,
    email: "mark.pope@email.com",
    phone: "+1 (555) 789-0123",
    conditions: ["Diabetes Type 1", "Neuropathy"],
    loyaltyTier: "platinum",
    points: 7200,
    lastVisit: "2026-04-02",
    status: "active",
    enrollmentDate: "2022-11-30",
  },
  {
    id: "8",
    name: "Ken Block",
    avatar: "/placeholder.svg?height=40&width=40",
    age: 39,
    email: "ken.block@email.com",
    phone: "+1 (555) 890-1234",
    conditions: ["Epilepsy"],
    loyaltyTier: "bronze",
    points: 320,
    lastVisit: "2026-02-28",
    status: "pending",
    enrollmentDate: "2026-02-01",
  },
]

export const prescriptions: Prescription[] = [
  {
    id: "rx-001",
    patientId: "1",
    patientName: "Jennifer Cole",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    refillDate: "2026-04-10",
    status: "refill-due",
  },
  {
    id: "rx-002",
    patientId: "1",
    patientName: "Jennifer Cole",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    refillDate: "2026-04-15",
    status: "active",
  },
  {
    id: "rx-003",
    patientId: "2",
    patientName: "Hayley Bing",
    medication: "Albuterol Inhaler",
    dosage: "90mcg",
    frequency: "As needed",
    refillDate: "2026-04-08",
    status: "refill-due",
  },
  {
    id: "rx-004",
    patientId: "3",
    patientName: "Sara Parker",
    medication: "Insulin Glargine",
    dosage: "20 units",
    frequency: "Once daily",
    refillDate: "2026-04-05",
    status: "overdue",
  },
  {
    id: "rx-005",
    patientId: "4",
    patientName: "James Gordon",
    medication: "Atorvastatin",
    dosage: "40mg",
    frequency: "Once daily",
    refillDate: "2026-04-20",
    status: "active",
  },
  {
    id: "rx-006",
    patientId: "5",
    patientName: "Rose Key",
    medication: "Tiotropium",
    dosage: "18mcg",
    frequency: "Once daily",
    refillDate: "2026-04-12",
    status: "collected",
  },
  {
    id: "rx-007",
    patientId: "6",
    patientName: "Kara Jordan",
    medication: "Methotrexate",
    dosage: "15mg",
    frequency: "Weekly",
    refillDate: "2026-04-18",
    status: "active",
  },
  {
    id: "rx-008",
    patientId: "7",
    patientName: "Mark Pope",
    medication: "Insulin Lispro",
    dosage: "Variable",
    frequency: "Before meals",
    refillDate: "2026-04-03",
    status: "overdue",
  },
]

export const appointments: Appointment[] = [
  {
    id: "apt-001",
    patientId: "1",
    patientName: "Jennifer Cole",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "09:15",
    endTime: "09:45",
    type: "consultation",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-002",
    patientId: "2",
    patientName: "Hayley Bing",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "09:45",
    endTime: "10:45",
    type: "follow-up",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-003",
    patientId: "3",
    patientName: "Sara Parker",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "10:45",
    endTime: "11:15",
    type: "checkup",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-004",
    patientId: "4",
    patientName: "James Gordon",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "11:45",
    endTime: "12:30",
    type: "consultation",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-005",
    patientId: "5",
    patientName: "Rose Key",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "12:45",
    endTime: "13:45",
    type: "video-call",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-006",
    patientId: "6",
    patientName: "Kara Jordan",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "13:55",
    endTime: "14:45",
    type: "follow-up",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-007",
    patientId: "7",
    patientName: "Mark Pope",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "15:00",
    endTime: "15:45",
    type: "checkup",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
  {
    id: "apt-008",
    patientId: "8",
    patientName: "Ken Block",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2026-04-06",
    time: "15:55",
    endTime: "16:30",
    type: "consultation",
    doctor: "Dr. Shepard",
    status: "scheduled",
  },
]

export const verifications: Verification[] = [
  {
    id: "ver-001",
    patientId: "8",
    patientName: "Ken Block",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    documentType: "Medical Records",
    uploadDate: "2026-04-04",
    status: "pending",
  },
  {
    id: "ver-002",
    patientId: "5",
    patientName: "Rose Key",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    documentType: "Insurance Card",
    uploadDate: "2026-04-03",
    status: "pending",
  },
  {
    id: "ver-003",
    patientId: "2",
    patientName: "Hayley Bing",
    patientAvatar: "/placeholder.svg?height=40&width=40",
    documentType: "Lab Results",
    uploadDate: "2026-04-02",
    status: "approved",
  },
]

export const todoItems = [
  { id: "1", text: "2 briefings", completed: true, category: "quick" },
  { id: "2", text: "Change the ambient light", completed: false, category: "quick" },
  { id: "3", text: "Call with Dr. Blake", completed: false, category: "quick" },
  { id: "4", text: "Reception optimization", completed: true, category: "improvements" },
  { id: "5", text: "Buy a speaker", completed: false, category: "improvements" },
]

export const weekDays = [
  { day: "Sun", date: 5, isToday: false },
  { day: "Mon", date: 6, isToday: true },
  { day: "Tue", date: 7, isToday: false },
  { day: "Wed", date: 8, isToday: false },
  { day: "Thu", date: 9, isToday: false },
  { day: "Fri", date: 10, isToday: false },
  { day: "Sat", date: 11, isToday: false },
]

export function getLoyaltyTierColor(tier: LoyaltyTier): string {
  const colors = {
    bronze: "bg-amber-600",
    silver: "bg-slate-400",
    gold: "bg-yellow-500",
    platinum: "bg-slate-700",
  }
  return colors[tier]
}

export function getStatusColor(status: PrescriptionStatus): string {
  const colors = {
    active: "bg-emerald-100 text-emerald-700",
    "refill-due": "bg-amber-100 text-amber-700",
    collected: "bg-slate-100 text-slate-700",
    overdue: "bg-red-100 text-red-700",
  }
  return colors[status]
}
