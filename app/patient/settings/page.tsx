import { Bell, Shield, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"

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
]

export default function PatientSettingsPage() {
  return (
    <div className="glass-panel rounded-[2rem] p-6 md:p-8">
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight">Patient settings</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        A lightweight production-ready placeholder so the navigation remains complete while preserving current app flow.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {settingsGroups.map((group) => (
          <div key={group.title} className="metric-card rounded-[1.7rem] p-5">
            <group.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-5 text-2xl font-semibold">{group.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button>Save preferences</Button>
      </div>
    </div>
  )
}
