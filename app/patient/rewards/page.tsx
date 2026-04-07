"use client"

import { Gift, Trophy, Tag, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const patient = {
  points: 7250,
  tier: "Gold",
}

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
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <p className="text-muted-foreground">Redeem your points for exclusive rewards</p>
      </div>

      {/* Points Balance */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Available Points</p>
            <p className="text-4xl font-bold">{patient.points.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-yellow-600">{patient.tier} Member</span>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Available Rewards</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => {
            const canAfford = patient.points >= reward.pointsCost
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
                      {(reward.pointsCost - patient.points).toLocaleString()} pts needed
                    </span>
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Redeemed Rewards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Redeemed Rewards</h2>
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
