import { Bell, Palette, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminSettingsPage() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.72),rgba(246,238,227,0.76))] shadow-[var(--shadow-soft)]">
      <AdminHeader title="Settings" description="Control notification behavior, brand presentation, and admin safeguards." showSearch={false} />

      <div className="grid gap-4 px-5 py-6 md:grid-cols-3 md:px-8 md:py-8">
        {[
          {
            icon: Bell,
            title: "Notification routing",
            copy: "Tune reminder automation and choose how urgent patient events should surface for the team.",
          },
          {
            icon: Palette,
            title: "Workspace presentation",
            copy: "Keep the new warm-human system configurable without leaving a dead link in navigation.",
          },
          {
            icon: ShieldCheck,
            title: "Admin controls",
            copy: "Placeholder access for permissions, review steps, and operational governance.",
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
        <Button>Update settings</Button>
      </div>
    </div>
  )
}
