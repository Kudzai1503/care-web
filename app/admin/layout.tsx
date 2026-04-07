"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-transparent">
      <AdminSidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((value) => !value)}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode((value) => !value)}
      />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarExpanded ? "pl-72" : "pl-24"
        )}
      >
        <div className="min-h-screen px-4 py-4 md:px-6">{children}</div>
      </main>
    </div>
  )
}
