"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, WalletCards } from "lucide-react"
import { LoyaltyDigitalCard } from "@/components/loyalty/LoyaltyDigitalCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { caseHospitalEligibleServices } from "@/lib/content/caseHospitalLoyalty"
import {
  createRedemptionEntry,
  createTopUpEntries,
  formatCurrency,
  getCaseLoyaltySnapshot,
  deriveWallet,
} from "@/lib/loyalty"
import type { EligibleService, WalletLedgerEntry } from "@/lib/loyalty/types"

export default function WalletPage() {
  const snapshot = getCaseLoyaltySnapshot(new Date("2026-04-15T10:30:00.000Z"))
  const [entries, setEntries] = useState<WalletLedgerEntry[]>(snapshot.entries)
  const [topUpAmount, setTopUpAmount] = useState("100000")
  const [message, setMessage] = useState("")

  const wallet = useMemo(() => deriveWallet(entries), [entries])

  const handleTopUp = () => {
    const amount = Number(topUpAmount)
    if (!amount || amount <= 0) return

    const nextEntries = [...createTopUpEntries(amount, new Date("2026-04-15T10:30:00.000Z")), ...entries]
    setEntries(nextEntries)
    setMessage(`Top-up recorded. ${Math.round(amount * 0.05).toLocaleString()} bonus points are pending for 24 hours.`)
  }

  const handleRedemption = (serviceType: EligibleService) => {
    const redemption = createRedemptionEntry(serviceType, 1500, "Case Hospital Buganda Road", new Date("2026-04-15T10:30:00.000Z"))
    setEntries((current) => [redemption.ledgerEntry, ...current])
    setMessage(`Redemption recorded for ${serviceType.replace("_", " ")}.`)
  }

  return (
    <div className="space-y-6">
      <section className="clinical-surface overflow-hidden rounded-[2rem] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Wallet</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">Stored value and bonus points</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Top up, redeem eligible points, and review recent activity.
        </p>
        <div className="mt-5 brand-rule max-w-40" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Stored-value balance</p>
          <p className="mt-3 text-3xl font-semibold">{formatCurrency(wallet.storedValueBalance)}</p>
        </div>
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Available bonus points</p>
          <p className="mt-3 text-3xl font-semibold">{wallet.availablePoints.toLocaleString()}</p>
        </div>
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Pending 24-hour credit</p>
          <p className="mt-3 text-3xl font-semibold">{wallet.pendingPoints.toLocaleString()}</p>
        </div>
      </section>

      <section className="case-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Digital wallet card</p>
            <h2 className="mt-1 text-2xl font-semibold">Account and balance</h2>
          </div>
        </div>
        <div className="mt-6">
          <LoyaltyDigitalCard account={snapshot.account} wallet={wallet} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="case-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Top up wallet</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Record a top-up or redeem from an eligible service.</p>
            </div>
            <WalletCards className="h-5 w-5 text-primary" />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              value={topUpAmount}
              onChange={(event) => setTopUpAmount(event.target.value)}
              type="number"
              min="1000"
              placeholder="Enter top-up amount"
            />
            <Button onClick={handleTopUp}>Record top-up</Button>
          </div>

          {message && (
            <div className="mt-4 rounded-[1rem] border border-border bg-secondary px-4 py-3 text-sm text-foreground">
              {message}
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Eligible bonus-point redemptions</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {caseHospitalEligibleServices.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() =>
                    handleRedemption(
                      service === "Doctor’s Consultation Fees"
                        ? "doctor_consultation"
                        : (service.toLowerCase() as EligibleService)
                    )
                  }
                  className="rounded-[1.1rem] border border-border bg-background px-4 py-4 text-left transition-colors hover:border-primary/50"
                >
                  <p className="font-semibold">{service}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Redeem points</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-panel rounded-[1.9rem] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Recent ledger activity</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Reward credits, top-ups, and redemptions are recorded as separate ledger entries for auditability.
            </p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-primary" />
        </div>

        <div className="mt-5 space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-2 rounded-[1rem] border border-border bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{entry.reference}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.type.replaceAll("_", " ")} | {new Date(entry.occurredAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {entry.balanceBucket.replace("_", " ")}
                </span>
                <span className="font-semibold">
                  {entry.amount > 0 ? "+" : ""}
                  {entry.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
