import { BookOpen, LifeBuoy, MessageSquareHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminHelpPage() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.72),rgba(246,238,227,0.76))] shadow-[var(--shadow-soft)]">
      <AdminHeader title="Help" description="Support material and escalation paths for the admin team." showSearch={false} />

      <div className="grid gap-4 px-5 py-6 md:grid-cols-3 md:px-8 md:py-8">
        {[
          {
            icon: BookOpen,
            title: "Operational guides",
            copy: "Reference flows for onboarding, reminders, prescription follow-up, and verification reviews.",
          },
          {
            icon: LifeBuoy,
            title: "Support desk",
            copy: "A placeholder support surface so admins do not hit a dead route from the sidebar.",
          },
          {
            icon: MessageSquareHeart,
            title: "Care escalation",
            copy: "Define how product and clinical issues should be routed when something needs human intervention.",
          },
        ].map((card) => (
          <div key={card.title} className="metric-card rounded-[1.8rem] p-5">
            <card.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-5 text-2xl font-semibold">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.copy}</p>
          </div>
        ))}
      </div>

      <div className="px-5 pb-8 md:px-8">
        <Button>Contact support</Button>
      </div>
    </div>
  )
}
