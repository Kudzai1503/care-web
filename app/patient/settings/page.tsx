import Link from "next/link"
import { Bell, Shield, UserCog, WalletCards } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  caseHospitalAffiliateClinics,
  caseHospitalFaqHighlights,
  caseHospitalSupport,
  caseHospitalVerificationMethods,
} from "@/lib/content/caseHospitalLoyalty"
import { getCaseLoyaltySnapshot, legacyEngagementSummary } from "@/lib/loyalty"

const settingsGroups = [
  {
    icon: UserCog,
    title: "Profile preferences",
    description: "Manage your contact details, care communication style, and account basics.",
  },
  {
    icon: Bell,
    title: "Reminder cadence",
    description: "Choose how medication prompts, appointment alerts, and reward updates reach you.",
  },
  {
    icon: Shield,
    title: "Privacy controls",
    description: "Review consent, data sharing preferences, and account security expectations.",
  },
  {
    icon: WalletCards,
    title: "Wallet",
    description: "Review stored value, pending 24-hour bonus credits, and recent ledger activity.",
    href: "/patient/wallet",
  },
]

export default function PatientSettingsPage() {
  const snapshot = getCaseLoyaltySnapshot(new Date("2026-04-15T10:30:00.000Z"))

  return (
    <div className="space-y-6">
      <section className="clinical-surface rounded-[2rem] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Profile</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">Profile and settings</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Manage your profile, wallet access, and FAQs in one place.</p>
        <div className="mt-5 brand-rule max-w-40" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Medical number</p>
          <p className="mt-2 text-2xl font-semibold">{snapshot.account.medicalNumber}</p>
        </div>
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Stored value</p>
          <p className="mt-2 text-2xl font-semibold">{snapshot.wallet.storedValueBalance.toLocaleString()} UGX</p>
        </div>
        <div className="case-panel rounded-[1.7rem] p-5">
          <p className="text-sm text-muted-foreground">Legacy engagement points</p>
          <p className="mt-2 text-2xl font-semibold">{legacyEngagementSummary.points.toLocaleString()}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="case-panel rounded-[1.75rem] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Wallet access</p>
              <h2 className="mt-1 text-2xl font-semibold">Digital wallet card</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/patient/wallet">Open wallet</Link>
            </Button>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Your wallet screen now carries the digital banking card, account number, balance, and currency details.
          </p>
        </div>

        <div className="space-y-4">
          <div className="case-panel rounded-[1.75rem] p-5">
            <p className="text-sm text-muted-foreground">Profile help</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              <li>Verification methods: {caseHospitalVerificationMethods.join(", ")}.</li>
              <li>Participating clinics include {caseHospitalAffiliateClinics.slice(0, 3).join(", ")} and others.</li>
              <li>{caseHospitalSupport.neutralSupportMessage}</li>
            </ul>
          </div>

          <div className="case-panel rounded-[1.75rem] p-5">
            <p className="text-sm text-muted-foreground">Support</p>
            <div className="mt-3 space-y-1 text-sm leading-7 text-muted-foreground">
              <p>Hotline: {caseHospitalSupport.hotline}</p>
              <p>WhatsApp: {caseHospitalSupport.whatsapp}</p>
              <p>{caseHospitalSupport.primaryEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {settingsGroups.map((group) => (
          <div key={group.title} className="case-panel rounded-[1.7rem] p-5">
            <group.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-5 text-2xl font-semibold">{group.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
            {"href" in group && group.href && (
              <Button asChild variant="outline" className="mt-5">
                <Link href={group.href}>Open</Link>
              </Button>
            )}
          </div>
        ))}
      </section>

      <section className="case-panel rounded-[1.75rem] p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">FAQs</p>
            <h2 className="mt-1 text-2xl font-semibold">Wallet and loyalty help</h2>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {caseHospitalFaqHighlights.map((faq) => (
            <div key={faq.question} className="rounded-[1rem] border border-border bg-background px-4 py-4">
              <p className="font-semibold">{faq.question}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div>
        <Button>Save preferences</Button>
      </div>
    </div>
  )
}
