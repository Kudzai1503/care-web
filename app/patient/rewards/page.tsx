"use client"

import Link from "next/link"
import { Gift, Trophy, Tag, CheckCircle2, Lock, WalletCards } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getCaseLoyaltySnapshot, legacyEngagementSummary } from "@/lib/loyalty"

interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  category: "discount" | "service" | "gift"
  available: boolean
}

const rewards: Reward[] = [
  { id: "1", title: "10% Pharmacy Discount", description: "Get 10% off your next prescription pickup", pointsCost: 500, category: "discount", available: true },
  { id: "2", title: "Free Video Consultation", description: "One complimentary telehealth appointment", pointsCost: 1000, category: "service", available: true },
  { id: "3", title: "Wellness Kit", description: "Blood pressure monitor and health journal", pointsCost: 2500, category: "gift", available: true },
  { id: "4", title: "Priority Scheduling", description: "Skip the queue for your next 3 appointments", pointsCost: 750, category: "service", available: true },
  { id: "5", title: "Spa Day Voucher", description: "Relaxation therapy session at partner spa", pointsCost: 5000, category: "gift", available: true },
  { id: "6", title: "Annual Health Package", description: "Complete health screening package", pointsCost: 10000, category: "service", available: false },
]

const redeemedRewards = [
  { title: "5% Pharmacy Discount", redeemedDate: "2026-03-15", status: "used" },
  { title: "Free Consultation", redeemedDate: "2026-03-01", status: "active" },
]

export default function RewardsPage() {
  const snapshot = getCaseLoyaltySnapshot(new Date("2026-04-15T10:30:00.000Z"))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Rewards and wallet guidance</h1>
        <p className="text-muted-foreground">
          Engagement rewards stay preserved here. Case Hospital wallet balances and restricted bonus redemptions live
          in the dedicated wallet.
        </p>
      </div>

      <div className="mb-8 case-panel rounded-2xl p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Legacy engagement points</p>
            <p className="text-4xl font-bold">{legacyEngagementSummary.points.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-yellow-600">{legacyEngagementSummary.tier} Member</span>
          </div>
          <div className="rounded-[1rem] border border-border bg-background px-4 py-3">
            <p className="text-sm text-muted-foreground">Case wallet</p>
            <p className="mt-1 font-semibold">
              {snapshot.wallet.availablePoints.toLocaleString()} bonus points | {snapshot.wallet.storedValueBalance.toLocaleString()} UGX
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link href="/patient/wallet">
                <WalletCards className="h-4 w-4" />
                Open wallet
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Available engagement rewards</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => {
            const canAfford = legacyEngagementSummary.points >= reward.pointsCost
            return (
              <div
                key={reward.id}
                className={cn(
                  "rounded-xl border border-border bg-card p-5",
                  !canAfford && "opacity-60"
                )}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    reward.category === "discount" && "bg-green-500/10",
                    reward.category === "service" && "bg-blue-500/10",
                    reward.category === "gift" && "bg-purple-500/10"
                  )}>
                    {reward.category === "discount" && <Tag className="h-5 w-5 text-green-600" />}
                    {reward.category === "service" && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                    {reward.category === "gift" && <Gift className="h-5 w-5 text-purple-600" />}
                  </div>
                  <span className="text-lg font-bold text-primary">{reward.pointsCost.toLocaleString()} pts</span>
                </div>
                <h3 className="mb-1 font-semibold">{reward.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{reward.description}</p>
                <Button
                  className="w-full rounded-full"
                  disabled={!canAfford}
                  variant={canAfford ? "default" : "outline"}
                >
                  {canAfford ? "Redeem" : (
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-4 w-4" />
                      {(reward.pointsCost - legacyEngagementSummary.points).toLocaleString()} pts needed
                    </span>
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-8 case-panel rounded-[1.75rem] p-5">
        <h2 className="text-lg font-semibold">Case loyalty wallet rules</h2>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
          <li>Cash top-ups earn a 5 percent bonus credited within 24 hours.</li>
          <li>Bonus points are redeemable only for Laboratory, Pharmacy, Radiology, and Doctor’s Consultation Fees.</li>
          <li>Bonus rewards are non-transferable and can only be used by the account holder.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Redeemed engagement rewards</h2>
        <div className="space-y-3">
          {redeemedRewards.map((reward, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{reward.title}</p>
                <p className="text-sm text-muted-foreground">
                  Redeemed on {new Date(reward.redeemedDate).toLocaleDateString()}
                </p>
              </div>
              <span className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                reward.status === "active" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"
              )}>
                {reward.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
