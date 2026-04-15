import Image from "next/image"
import { cn } from "@/lib/utils"

interface CaseHospitalLogoProps {
  className?: string
  width?: number | string
  height?: number | string
  title?: string
}

export function CaseHospitalLogo({
  className,
  width = 126,
  height = 156,
  title = "Case Hospital",
}: CaseHospitalLogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn("relative inline-block shrink-0", className)}
      style={{ width, height }}
    >
      <Image
        src="/logo.png"
        alt={title}
        fill
        sizes="(max-width: 768px) 120px, 180px"
        className="object-contain"
        priority={false}
      />
    </span>
  )
}
