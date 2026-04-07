"use client"

import { useState } from "react"
import { Trophy, Star, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Quiz {
  id: string
  title: string
  description: string
  points: number
  questions: number
  timeMinutes: number
  status: "available" | "completed" | "locked"
  completedDate?: string
  earnedPoints?: number
}

const quizzes: Quiz[] = [
  { id: "1", title: "Diabetes Management Basics", description: "Learn about daily diabetes care and blood sugar management", points: 100, questions: 10, timeMinutes: 15, status: "available" },
  { id: "2", title: "Heart Health Quiz", description: "Test your knowledge about cardiovascular health", points: 75, questions: 8, timeMinutes: 10, status: "available" },
  { id: "3", title: "Medication Safety", description: "Understanding your prescriptions and safe usage", points: 50, questions: 5, timeMinutes: 8, status: "completed", completedDate: "2026-04-01", earnedPoints: 45 },
  { id: "4", title: "Healthy Eating Habits", description: "Nutrition fundamentals for better health", points: 80, questions: 12, timeMinutes: 12, status: "completed", completedDate: "2026-03-28", earnedPoints: 80 },
  { id: "5", title: "Exercise & Wellness", description: "Physical activity guidelines for chronic conditions", points: 60, questions: 6, timeMinutes: 10, status: "locked" },
]

const tabs = ["Available", "Completed"]

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState("Available")

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (activeTab === "Available") return quiz.status === "available"
    if (activeTab === "Completed") return quiz.status === "completed"
    return true
  })

  const totalEarned = quizzes
    .filter(q => q.status === "completed")
    .reduce((sum, q) => sum + (q.earnedPoints || 0), 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Health Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and earn points</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{quizzes.filter(q => q.status === "available").length}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{quizzes.filter(q => q.status === "completed").length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalEarned}</p>
            <p className="text-sm text-muted-foreground">Points Earned</p>
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

      {/* Quiz List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={cn(
              "rounded-xl border border-border bg-card p-5",
              quiz.status === "completed" && "border-green-500/30"
            )}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                quiz.status === "completed" ? "bg-green-500/10" : "bg-purple-500/10"
              )}>
                {quiz.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Star className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <span className="text-lg font-bold text-primary">+{quiz.points} pts</span>
            </div>
            <h3 className="mb-1 font-semibold">{quiz.title}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{quiz.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{quiz.questions} questions</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {quiz.timeMinutes} min
                </span>
              </div>
              {quiz.status === "available" && (
                <Button size="sm" className="rounded-full">
                  Start Quiz
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              )}
              {quiz.status === "completed" && (
                <span className="text-sm text-green-600">
                  Earned {quiz.earnedPoints} pts
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
