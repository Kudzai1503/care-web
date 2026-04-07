"use client"

import { useState } from "react"
import { Gift, Trophy, HelpCircle, Plus, Edit2, Trash2, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Quiz {
  id: string
  title: string
  description: string
  points: number
  questions: number
  completions: number
  status: "active" | "draft"
}

interface Promotion {
  id: string
  title: string
  description: string
  points: number
  validUntil: string
  redemptions: number
  status: "active" | "expired"
}

const quizzes: Quiz[] = [
  { id: "1", title: "Diabetes Management Basics", description: "Learn about daily diabetes care", points: 100, questions: 10, completions: 45, status: "active" },
  { id: "2", title: "Heart Health Quiz", description: "Test your cardiovascular knowledge", points: 75, questions: 8, completions: 32, status: "active" },
  { id: "3", title: "Medication Safety", description: "Understanding your prescriptions", points: 50, questions: 5, completions: 67, status: "active" },
  { id: "4", title: "Nutrition Fundamentals", description: "Healthy eating habits", points: 80, questions: 12, completions: 0, status: "draft" },
]

const promotions: Promotion[] = [
  { id: "1", title: "Welcome Bonus", description: "500 points for new members", points: 500, validUntil: "2026-12-31", redemptions: 23, status: "active" },
  { id: "2", title: "Refill Streak Bonus", description: "2x points for 3-month streak", points: 200, validUntil: "2026-06-30", redemptions: 15, status: "active" },
  { id: "3", title: "Birthday Reward", description: "Special birthday bonus points", points: 150, validUntil: "2026-12-31", redemptions: 8, status: "active" },
]

const tabs = ["Quizzes", "Promotions"]

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("Quizzes")
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rewards & Quizzes</h1>
          <p className="text-muted-foreground">Manage engagement activities and promotions</p>
        </div>
        <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              {activeTab === "Quizzes" ? "Create Quiz" : "Create Promotion"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="title">Quiz Title</Label>
                <Input id="title" placeholder="Enter quiz title" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="points">Points Reward</Label>
                  <Input id="points" type="number" placeholder="100" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="questions">Number of Questions</Label>
                  <Input id="questions" type="number" placeholder="10" className="mt-1.5" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsQuizDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsQuizDialogOpen(false)}>Create Quiz</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
            <HelpCircle className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{quizzes.length}</p>
            <p className="text-sm text-muted-foreground">Active Quizzes</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
            <Gift className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{promotions.length}</p>
            <p className="text-sm text-muted-foreground">Active Promotions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">12,450</p>
            <p className="text-sm text-muted-foreground">Points Distributed</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quizzes */}
      {activeTab === "Quizzes" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Preview</DropdownMenuItem>
                    <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="mb-1 font-semibold">{quiz.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{quiz.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary font-medium">{quiz.points} pts</span>
                <span className="text-muted-foreground">{quiz.questions} questions</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{quiz.completions} completions</span>
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  quiz.status === "active" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"
                )}>
                  {quiz.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Promotions */}
      {activeTab === "Promotions" && (
        <div className="space-y-3">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.description}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{promo.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Valid until {new Date(promo.validUntil).toLocaleDateString()}
              </div>
              <span className="text-sm text-muted-foreground">{promo.redemptions} redemptions</span>
              <span className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                promo.status === "active" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"
              )}>
                {promo.status}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
