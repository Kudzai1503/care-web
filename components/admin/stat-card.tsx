import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  variant?: "default" | "dark"
  showArrow?: boolean
}

export function StatCard({
  title,
  value,
  subtitle,
  variant = "default",
  showArrow = true,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-5 transition-colors",
        variant === "dark"
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-border"
      )}
    >
      <p
        className={cn(
          "text-sm",
          variant === "dark" ? "opacity-80" : "text-muted-foreground"
        )}
      >
        {title}
      </p>
      <p className="mt-2 text-4xl font-bold">{value}</p>
      {subtitle && (
        <p
          className={cn(
            "mt-1 text-xs",
            variant === "dark" ? "opacity-60" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      {showArrow && (
        <div className="mt-3 flex items-center gap-1 text-sm font-medium">
          <span>See Details</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
