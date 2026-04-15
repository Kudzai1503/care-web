import {
  caseHospitalAffiliateClinics,
  caseHospitalEligibleServices,
} from "@/lib/content/caseHospitalLoyalty"
import type {
  EligibleService,
  LoyaltyAccount,
  Redemption,
  Wallet,
  WalletLedgerEntry,
} from "@/lib/loyalty/types"

const HOUR_IN_MS = 60 * 60 * 1000

export const caseLoyaltyAccount: LoyaltyAccount = {
  userId: "patient-1",
  status: "active",
  fullName: "Jennifer Cole",
  medicalNumber: "MED-445028",
  cardNumber: "CASE-1029-4476",
  registeredPhone: "+256 764 209 889",
  createdAt: "2025-05-14T09:00:00.000Z",
  updatedAt: "2026-04-15T07:30:00.000Z",
}

export const legacyEngagementSummary = {
  points: 7250,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNext: 2750,
} as const

export const initialWalletLedgerEntries: WalletLedgerEntry[] = [
  {
    id: "entry-001",
    type: "top_up",
    balanceBucket: "stored_value",
    amount: 250000,
    status: "completed",
    reference: "Top-up via card ending 2194",
    occurredAt: "2026-04-09T08:30:00.000Z",
  },
  {
    id: "entry-002",
    type: "reward_credit",
    balanceBucket: "points",
    amount: 12500,
    status: "completed",
    reference: "5% cash top-up bonus",
    occurredAt: "2026-04-10T08:35:00.000Z",
    metadata: { sourceTopUpId: "entry-001" },
  },
  {
    id: "entry-003",
    type: "redemption",
    balanceBucket: "points",
    amount: -4200,
    status: "completed",
    reference: "Pharmacy purchase",
    occurredAt: "2026-04-11T12:15:00.000Z",
    metadata: { serviceType: "pharmacy", clinicId: "Case Hospital Buganda Road" },
  },
  {
    id: "entry-004",
    type: "top_up",
    balanceBucket: "stored_value",
    amount: 120000,
    status: "completed",
    reference: "Cash desk top-up",
    occurredAt: "2026-04-14T10:00:00.000Z",
  },
  {
    id: "entry-005",
    type: "reward_pending",
    balanceBucket: "points",
    amount: 6000,
    status: "pending",
    reference: "5% cash top-up bonus",
    occurredAt: "2026-04-14T10:00:00.000Z",
    metadata: { sourceTopUpId: "entry-004" },
  },
]

export const initialRedemptions: Redemption[] = [
  {
    id: "redemption-001",
    walletId: "wallet-patient-1",
    serviceType: "pharmacy",
    clinicId: "Case Hospital Buganda Road",
    pointsUsed: 4200,
    status: "completed",
    occurredAt: "2026-04-11T12:15:00.000Z",
  },
]

export function calculateRewardPoints(amount: number) {
  return Math.round(amount * 0.05)
}

export function isEligibleService(serviceType: string): serviceType is EligibleService {
  return ["laboratory", "pharmacy", "radiology", "doctor_consultation"].includes(serviceType)
}

export function settlePendingRewardEntries(entries: WalletLedgerEntry[], now = new Date()) {
  return entries.map((entry) => {
    if (entry.type !== "reward_pending" || entry.status !== "pending") return entry

    const matured = now.getTime() - new Date(entry.occurredAt).getTime() >= 24 * HOUR_IN_MS

    if (!matured) return entry

    return {
      ...entry,
      type: "reward_credit" as const,
      status: "completed" as const,
      reference: "5% cash top-up bonus credited",
    }
  })
}

export function deriveWallet(entries: WalletLedgerEntry[]): Wallet {
  const storedValueBalance = entries
    .filter((entry) => entry.balanceBucket === "stored_value" && entry.status === "completed")
    .reduce((total, entry) => total + entry.amount, 0)

  const availablePoints = entries
    .filter((entry) => entry.balanceBucket === "points" && entry.status === "completed")
    .reduce((total, entry) => total + entry.amount, 0)

  const pendingPoints = entries
    .filter((entry) => entry.balanceBucket === "points" && entry.status === "pending")
    .reduce((total, entry) => total + entry.amount, 0)

  return {
    userId: caseLoyaltyAccount.userId,
    accountNumber: "2600455028",
    currency: "UGX",
    storedValueBalance,
    availablePoints,
    pendingPoints,
  }
}

export function createTopUpEntries(amount: number, now = new Date()) {
  const occurredAt = now.toISOString()
  const rewardAmount = calculateRewardPoints(amount)
  const topUpId = `topup-${occurredAt}`

  return [
    {
      id: topUpId,
      type: "top_up" as const,
      balanceBucket: "stored_value" as const,
      amount,
      status: "completed" as const,
      reference: "Wallet cash top-up",
      occurredAt,
    },
    {
      id: `reward-${occurredAt}`,
      type: "reward_pending" as const,
      balanceBucket: "points" as const,
      amount: rewardAmount,
      status: "pending" as const,
      reference: "5% cash top-up bonus",
      occurredAt,
      metadata: { sourceTopUpId: topUpId },
    },
  ] satisfies WalletLedgerEntry[]
}

export function createRedemptionEntry(
  serviceType: EligibleService,
  pointsUsed: number,
  clinicId = caseHospitalAffiliateClinics[0],
  now = new Date()
) {
  if (!isEligibleService(serviceType)) {
    throw new Error("Service type is not eligible for Case loyalty-point redemption.")
  }

  const occurredAt = now.toISOString()

  return {
    ledgerEntry: {
      id: `redemption-${occurredAt}`,
      type: "redemption" as const,
      balanceBucket: "points" as const,
      amount: -Math.abs(pointsUsed),
      status: "completed" as const,
      reference: `${clinicId} redemption`,
      occurredAt,
      metadata: { serviceType, clinicId },
    },
    redemption: {
      id: `redemption-record-${occurredAt}`,
      walletId: "wallet-patient-1",
      serviceType,
      clinicId,
      pointsUsed: Math.abs(pointsUsed),
      status: "completed" as const,
      occurredAt,
    },
  }
}

export function getCaseLoyaltySnapshot(now = new Date()) {
  const settledEntries = settlePendingRewardEntries(initialWalletLedgerEntries, now)
  return {
    account: caseLoyaltyAccount,
    wallet: deriveWallet(settledEntries),
    entries: settledEntries.sort(
      (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    ),
    redemptions: initialRedemptions,
  }
}

export function formatCurrency(value: number, currency = "UGX") {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
