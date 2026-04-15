"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Copy, RefreshCcw, WalletCards } from "lucide-react"
import { CaseHospitalLogo } from "@/components/brand/CaseHospitalLogo"
import { BarcodeSvg } from "@/components/loyalty/BarcodeSvg"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/loyalty"
import type { LoyaltyAccount, Wallet } from "@/lib/loyalty/types"
import { cn } from "@/lib/utils"

interface LoyaltyDigitalCardProps {
  account: LoyaltyAccount
  wallet: Wallet
  className?: string
}

export function LoyaltyDigitalCard({ account, wallet, className }: LoyaltyDigitalCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallet.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative [perspective:1400px]">
        <motion.div
          animate={
            prefersReducedMotion
              ? { rotateY: 0 }
              : { rotateY: flipped ? 180 : 0 }
          }
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative h-[270px] w-full max-w-[440px] rounded-[1.9rem] [transform-style:preserve-3d]"
        >
          <section className="absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(145deg,#0d7a5d,#074f3f)] p-6 text-white shadow-[0_24px_48px_rgba(7,79,63,0.28)] [backface-visibility:hidden]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Wallet Card
                </p>
                <div className="mt-2 h-1.5 w-24 rounded-full bg-[#7dd9a7]" />
              </div>
              <CaseHospitalLogo width={64} height={80} className="opacity-95" />
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm text-white/72">Account holder</p>
                <p className="mt-1 text-3xl font-semibold">{account.fullName}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-white/72">Account number</p>
                  <p className="mt-1 text-lg font-semibold tracking-[0.14em]">{wallet.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-white/72">Currency</p>
                  <p className="mt-1 text-lg font-semibold">{wallet.currency}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-[1.3rem] border border-white/18 bg-white/10 px-4 py-4 backdrop-blur-sm">
              <p className="text-sm text-white/72">Stored-value balance</p>
              <p className="mt-2 text-3xl font-semibold">{formatCurrency(wallet.storedValueBalance, wallet.currency)}</p>
            </div>
          </section>

          <section className="absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(145deg,#ffffff,#eef4f1)] p-6 text-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Wallet details
                </p>
                <div className="mt-2 h-1.5 w-24 rounded-full bg-[var(--brand-accent)]" />
              </div>
              <CaseHospitalLogo width={58} height={72} />
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-border bg-white px-4 py-3">
              <BarcodeSvg value={wallet.accountNumber} className="h-12 w-full" />
            </div>

            <div className="mt-5 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">Wallet account number</p>
                <p className="mt-2 font-medium tracking-[0.14em] text-foreground">{wallet.accountNumber}</p>
                <p className="mt-2">Use this account number for wallet identification.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Available balance</p>
                <p className="mt-2 font-medium text-foreground">{formatCurrency(wallet.storedValueBalance, wallet.currency)}</p>
                <p className="mt-2">Currency: {wallet.currency}</p>
                <p>Pending bonus points: {wallet.pendingPoints.toLocaleString()}</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy account number"}
        </Button>
        <Button variant="outline" onClick={() => setFlipped((value) => !value)}>
          <RefreshCcw className="h-4 w-4" />
          {flipped ? "Show front" : "Flip card"}
        </Button>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
          <WalletCards className="h-4 w-4 text-primary" />
          {wallet.currency}
        </div>
      </div>
    </div>
  )
}
