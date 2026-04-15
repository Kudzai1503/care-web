"use client"

import { Bell, Search, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  title?: string
  showSearch?: boolean
  description?: string
}

export function AdminHeader({ title, showSearch = true, description }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/82 px-5 py-4 backdrop-blur-xl md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          {title && <h1 className="text-3xl font-semibold leading-tight">{title}</h1>}
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description ?? "A warmer operational surface for patient care, scheduling, and retention work."}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showSearch && (
            <div className="relative min-w-0 sm:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search patients, card numbers, reminders..." className="pl-11" />
            </div>
          )}

          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Priority queue
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-primary" />
          </Button>

          <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card/70 px-2.5 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
              <AvatarFallback className="bg-primary/15 text-primary">KS</AvatarFallback>
            </Avatar>
            <div className="pr-2">
              <p className="text-sm font-semibold leading-none">Kudzai Shepard</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Operations lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
