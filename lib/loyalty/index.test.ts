import { describe, expect, it } from "vitest"
import {
  calculateRewardPoints,
  createRedemptionEntry,
  createTopUpEntries,
  deriveWallet,
  initialWalletLedgerEntries,
  settlePendingRewardEntries,
} from "@/lib/loyalty"

describe("Case loyalty wallet rules", () => {
  it("calculates 5 percent reward points", () => {
    expect(calculateRewardPoints(100000)).toBe(5000)
  })

  it("settles pending rewards after 24 hours", () => {
    const entries = settlePendingRewardEntries(
      initialWalletLedgerEntries,
      new Date("2026-04-15T10:30:00.000Z")
    )

    expect(entries.some((entry) => entry.type === "reward_credit" && entry.amount === 6000)).toBe(true)
  })

  it("injects top-up and pending reward ledger entries", () => {
    const entries = createTopUpEntries(200000, new Date("2026-04-15T10:30:00.000Z"))

    expect(entries).toHaveLength(2)
    expect(entries[0].type).toBe("top_up")
    expect(entries[1].type).toBe("reward_pending")
    expect(entries[1].amount).toBe(10000)
  })

  it("derives separate stored-value and points balances", () => {
    const wallet = deriveWallet(settlePendingRewardEntries(initialWalletLedgerEntries, new Date("2026-04-15T10:30:00.000Z")))

    expect(wallet.accountNumber).toBe("2600455028")
    expect(wallet.storedValueBalance).toBe(370000)
    expect(wallet.availablePoints).toBe(14300)
    expect(wallet.pendingPoints).toBe(0)
  })

  it("restricts redemptions to eligible service categories", () => {
    const result = createRedemptionEntry("pharmacy", 1500)
    expect(result.ledgerEntry.type).toBe("redemption")
    expect(() => createRedemptionEntry("invalid" as never, 1500)).toThrow()
  })
})
