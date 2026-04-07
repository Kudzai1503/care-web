"use client"

import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoItem {
  id: string
  text: string
  completed: boolean
  category: string
}

interface TodoListProps {
  items: TodoItem[]
}

export function TodoList({ items }: TodoListProps) {
  const quickTasks = items.filter((item) => item.category === "quick")
  const improvements = items.filter((item) => item.category === "improvements")

  return (
    <div className="rounded-xl bg-card p-5 border border-border">
      <h3 className="mb-4 font-semibold">To do list</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-3 text-sm text-muted-foreground">Quick tasks</p>
          <ul className="space-y-2">
            {quickTasks.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                {item.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" />
                  </div>
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    item.completed && "text-muted-foreground line-through"
                  )}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-foreground p-4 text-background">
          <p className="mb-3 text-sm opacity-80">Improvements</p>
          <ul className="space-y-2">
            {improvements.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                {item.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-background/20">
                    <Check className="h-3 w-3" />
                  </div>
                ) : (
                  <Circle className="h-5 w-5 opacity-60" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    item.completed && "opacity-60 line-through"
                  )}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
