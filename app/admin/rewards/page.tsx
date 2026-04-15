"use client"

import { Gift, ShieldCheck, WalletCards } from "lucide-react"
import { Button } from "@/components/ui/button"
import { caseHospitalEligibleServices } from "@/lib/content/caseHospitalLoyalty"
import { formatCurrency, getCaseLoyaltySnapshot } from "@/lib/loyalty"

const promotions = [
  { id: "1", title: "Welcome Bonus", description: "500 bonus points for newly activated loyalty members.", points: 500, validUntil: "2026-12-31", status: "active" },
  { id: "2", title: "Refill Streak Bonus", description: "Extra bonus points for consistent refill follow-through.", points: 200, validUntil: "2026-06-30", status: "active" },
  { id: "3", title: "Birthday Reward", description: "Seasonal loyalty credit for active members.", points: 150, validUntil: "2026-12-31", status: "active" },
]

export default function RewardsPage() {
  const snapshot = getCaseLoyaltySnapshot(new Date("2026-04-15T10:30:00.000Z"))

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Loyalty operations</h1>
          <p className="text-muted-foreground">Monitor balances, active promotions, and redemption limits.</p>
        </div>
        <Button className="rounded-full">Export loyalty report</Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <WalletCards className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{formatCurrency(snapshot.wallet.storedValueBalance)}</p>
            <p className="text-sm text-muted-foreground">Stored value balance</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{snapshot.wallet.availablePoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Available bonus points</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <ShieldCheck className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold">{snapshot.wallet.pendingPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pending 24-hour credits</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Current loyalty rules</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
            <li>Cash top-ups create a separate 5 percent bonus credit.</li>
            <li>Bonus credits settle within 24 hours.</li>
            <li>Bonus points are non-transferable.</li>
            <li>Redemption is limited to the documented service categories.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Eligible redemption categories</p>
          <div className="mt-4 grid gap-2">
            {caseHospitalEligibleServices.map((service) => (
              <div key={service} className="rounded-lg border border-border/70 bg-background px-4 py-3 text-sm">
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 lg:flex-row lg:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{promo.title}</h3>
              <p className="text-sm text-muted-foreground">{promo.description}</p>
            </div>
            <div className="text-sm text-muted-foreground">{promo.points} points</div>
            <div className="text-sm text-muted-foreground">Valid until {new Date(promo.validUntil).toLocaleDateString()}</div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{promo.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
