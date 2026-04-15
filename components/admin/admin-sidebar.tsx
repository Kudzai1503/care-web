"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Gift,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserPlus,
  Users,
  Pill,
} from "lucide-react"
import { CaseHospitalLogo } from "@/components/brand/CaseHospitalLogo"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/patients", icon: Users, label: "Patients" },
  { href: "/admin/onboarding", icon: UserPlus, label: "Onboarding" },
  { href: "/admin/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/admin/prescriptions", icon: Pill, label: "Prescriptions" },
  { href: "/admin/reminders", icon: Bell, label: "Reminders" },
  { href: "/admin/rewards", icon: Gift, label: "Loyalty" },
  { href: "/admin/verification", icon: FileCheck2, label: "Verification" },
]

const bottomItems = [
  { href: "/admin/help", icon: HelpCircle, label: "Help" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

interface AdminSidebarProps {
  expanded: boolean
  onToggle: () => void
  darkMode: boolean
  onDarkModeToggle: () => void
}

export function AdminSidebar({ expanded, onToggle, darkMode, onDarkModeToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  const renderItem = (href: string, Icon: typeof LayoutDashboard, label: string) => {
    const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href))

    const content = (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-[1.35rem] px-3 py-3 text-sm font-semibold transition-all",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_16px_32px_rgba(213,172,106,0.2)]"
            : "text-sidebar-foreground/72 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {expanded && <span className="truncate">{label}</span>}
      </Link>
    )

    if (expanded) {
      return <div key={href}>{content}</div>
    }

    return (
      <Tooltip key={href}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="rounded-full bg-foreground text-background">
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar/96 px-3 py-4 shadow-[0_28px_60px_rgba(11,27,33,0.24)] backdrop-blur-xl transition-all duration-300",
          expanded ? "w-72" : "w-24"
        )}
      >
        <div className={cn("mb-6 flex items-center", expanded ? "justify-between px-2" : "justify-center")}>
          <Link href="/admin" className="flex items-center gap-3">
            <CaseHospitalLogo width={72} height={48} />
            {expanded && (
              <div>
                <p className="text-lg font-semibold leading-none text-sidebar-foreground">Case Hospital</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-sidebar-foreground/55">Admin suite</p>
              </div>
            )}
          </Link>
        </div>

        {expanded && (
          <div className="mb-6 rounded-[1.6rem] border border-sidebar-border/70 bg-sidebar-accent/70 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sidebar-foreground/56">Today&apos;s focus</p>
            <p className="mt-3 text-2xl font-semibold leading-tight text-sidebar-foreground">Loyalty operations</p>
            <p className="mt-2 text-sm leading-6 text-sidebar-foreground/66">
              Keep onboarding, support, appointments, and verification moving with calm urgency.
            </p>
          </div>
        )}

        <nav className="flex flex-1 flex-col gap-1.5">
          {navItems.map((item) => renderItem(item.href, item.icon, item.label))}
        </nav>

        <div className="mt-6 border-t border-sidebar-border pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onDarkModeToggle}
                className="flex w-full items-center gap-3 rounded-[1.35rem] px-3 py-3 text-sm font-semibold text-sidebar-foreground/72 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                {darkMode ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
                {expanded && <span>{darkMode ? "Light palette" : "Evening palette"}</span>}
              </button>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right" className="rounded-full bg-foreground text-background">
                {darkMode ? "Light palette" : "Evening palette"}
              </TooltipContent>
            )}
          </Tooltip>

          {bottomItems.map((item) => renderItem(item.href, item.icon, item.label))}

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-[1.35rem] px-3 py-3 text-sm font-semibold text-sidebar-foreground/72 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                {expanded && <span>Log out</span>}
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right" className="rounded-full bg-foreground text-background">
                Log out
              </TooltipContent>
            )}
          </Tooltip>

          <button
            onClick={onToggle}
            className="mt-3 flex w-full items-center justify-center rounded-[1.2rem] border border-sidebar-border/70 py-3 text-sidebar-foreground/72 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
