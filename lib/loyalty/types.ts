export type LoyaltyAccountStatus = "active" | "pending" | "inactive"
export type WalletLedgerType = "top_up" | "reward_pending" | "reward_credit" | "redemption" | "adjustment"
export type BalanceBucket = "stored_value" | "points"
export type WalletLedgerStatus = "completed" | "pending" | "reversed"
export type EligibleService = "laboratory" | "pharmacy" | "radiology" | "doctor_consultation"
export type VerificationMethod = "physical_card" | "card_number" | "registered_phone"

export interface LoyaltyAccount {
  userId: string
  status: LoyaltyAccountStatus
  fullName: string
  medicalNumber: string
  cardNumber: string
  registeredPhone: string
  createdAt: string
  updatedAt: string
}

export interface Wallet {
  userId: string
  accountNumber: string
  currency: string
  storedValueBalance: number
  availablePoints: number
  pendingPoints: number
}

export interface WalletLedgerEntry {
  id: string
  type: WalletLedgerType
  balanceBucket: BalanceBucket
  amount: number
  status: WalletLedgerStatus
  reference: string
  occurredAt: string
  metadata?: Record<string, string>
}

export interface Redemption {
  id: string
  walletId: string
  serviceType: EligibleService
  clinicId: string
  pointsUsed: number
  status: "completed" | "pending"
  occurredAt: string
}
