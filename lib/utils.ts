import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatCompactDate(dateString: string) {
  return formatDate(dateString, { month: 'short', day: 'numeric' })
}

export function titleCase(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

export function formatTierLabel(tier: string) {
  return titleCase(tier)
}

export function getTierBadgeClasses(tier: string) {
  const styles: Record<string, string> = {
    bronze: 'bg-primary/8 text-primary',
    silver: 'bg-secondary text-secondary-foreground',
    gold: 'bg-primary/10 text-primary',
    platinum: 'bg-[color:rgba(51,65,85,0.12)] text-slate-700 dark:text-slate-200',
  }

  return styles[tier] ?? 'bg-secondary text-secondary-foreground'
}

export function getPatientStatusClasses(status: string) {
  const styles: Record<string, string> = {
    active: 'bg-primary/10 text-primary',
    pending: 'bg-secondary text-secondary-foreground',
    inactive: 'bg-[color:rgba(51,65,85,0.1)] text-slate-600 dark:text-slate-300',
  }

  return styles[status] ?? 'bg-secondary text-secondary-foreground'
}

export function getPrescriptionStatusClasses(status: string) {
  const styles: Record<string, string> = {
    active: 'bg-primary/10 text-primary',
    'refill-due': 'bg-secondary text-secondary-foreground',
    collected: 'bg-[color:rgba(51,65,85,0.1)] text-slate-600 dark:text-slate-300',
    overdue: 'bg-[color:rgba(34,211,238,0.12)] text-cyan-700 dark:text-cyan-300',
  }

  return styles[status] ?? 'bg-secondary text-secondary-foreground'
}

export function getAppointmentStatusClasses(status: string) {
  const styles: Record<string, string> = {
    scheduled: 'bg-primary/10 text-primary',
    completed: 'bg-secondary text-secondary-foreground',
    cancelled: 'bg-[color:rgba(51,65,85,0.1)] text-slate-600 dark:text-slate-300',
  }

  return styles[status] ?? 'bg-secondary text-secondary-foreground'
}

export function getAppointmentTypeLabel(type: string) {
  const labels: Record<string, string> = {
    consultation: 'Consultation',
    'follow-up': 'Follow-up',
    'video-call': 'Video Call',
    checkup: 'Check-up',
  }

  return labels[type] ?? titleCase(type)
}

export function isVideoAppointment(type: string) {
  return type === 'video-call'
}
