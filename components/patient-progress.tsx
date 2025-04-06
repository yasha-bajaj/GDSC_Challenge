"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Activity, Calendar, Clock, TrendingUp, TrendingDown, Zap } from "lucide-react"

export function PatientProgress() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week")

  // Mock data for cognitive performance
  const cognitiveData = {
    memory: {
      score: 72,
      trend: "up",
      change: "+5%",
    },
    attention: {
      score: 65,
      trend: "down",
      change: "-3%",
    },
    problemSolving: {
      score: 80,
      trend: "up",
      change: "+2%",
    },
    language: {
      score: 85,
      trend: "stable",
      change: "0%",
    },
  }

  // Mock data for game performance
  const gameData = [
    {
      id: "memory-match",
      name: "Memory Match",
      lastPlayed: "Today",
      score: 85,
      previousScore: 80,
      timesPlayed: 12,
    },
    {
      id: "word-recall",
      name: "Word Recall",
      lastPlayed: "Yesterday",
      score: 70,
      previousScore: 75,
      timesPlayed: 8,
    },
    {
      id: "pattern-sequence",
      name: "Pattern Sequence",
      lastPlayed: "3 days ago",
      score: 65,
      previousScore: 60,
      timesPlayed: 5,
    },
    {
      id: "puzzle-solve",
      name: "Puzzle Solve",
      lastPlayed: "1 week ago",
      score: 90,
      previousScore: 85,
      timesPlayed: 3,
    },
  ]

  // Mock data for memory entries
  const memoryEntries = [
    {
      date: "Today",
      count: 2,
      mood: "positive",
    },
    {
      date: "Yesterday",
      count: 1,
      mood: "neutral",
    },
    {
      date: "3 days ago",
      count: 3,
      mood: "positive",
    },
    {
      date: "1 week ago",
      count: 0,
      mood: "negative",
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cognitive Performance</CardTitle>
            <Tabs
              value={timeframe}
              onValueChange={(value) => setTimeframe(value as "week" | "month" | "year")}
              className="w-auto"
            >
              <TabsList className="grid w-[200px] grid-cols-3">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription>Overall cognitive performance across different domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="font-medium">Memory</span>
                </div>
                <div className="flex items-center gap-1">
                  {cognitiveData.memory.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={cognitiveData.memory.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {cognitiveData.memory.change}
                  </span>
                </div>
              </div>
              <Progress value={cognitiveData.memory.score} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="font-medium">Attention</span>
                </div>
                <div className="flex items-center gap-1">
                  {cognitiveData.attention.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={cognitiveData.attention.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {cognitiveData.attention.change}
                  </span>
                </div>
              </div>
              <Progress value={cognitiveData.attention.score} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Problem Solving</span>
                </div>
                <div className="flex items-center gap-1">
                  {cognitiveData.problemSolving.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={cognitiveData.problemSolving.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {cognitiveData.problemSolving.change}
                  </span>
                </div>
              </div>
              <Progress value={cognitiveData.problemSolving.score} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Language</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">{cognitiveData.language.change}</span>
                </div>
              </div>
              <Progress value={cognitiveData.language.score} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Game Performance</CardTitle>
            <CardDescription>Recent scores from cognitive games</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gameData.map((game) => (
                <div key={game.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{game.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last played: {game.lastPlayed}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{game.score}%</span>
                      {game.score > game.previousScore ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : game.score < game.previousScore ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">Played {game.timesPlayed} times</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Journal Activity</CardTitle>
            <CardDescription>Recent memory board entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memoryEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        entry.mood === "positive"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : entry.mood === "neutral"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {entry.count} {entry.count === 1 ? "entry" : "entries"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

