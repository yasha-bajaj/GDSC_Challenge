"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Award, Zap, Grid, Puzzle, Layers, Shuffle } from "lucide-react"
import { useRouter } from "next/navigation"

type Game = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  difficulty: "easy" | "medium" | "hard"
  timeEstimate: string
  category: "memory" | "attention" | "problem-solving" | "language"
  path: string
}

export function CognitiveGames() {
  const router = useRouter()
  const [filter, setFilter] = useState<string | null>(null)

  const games: Game[] = [
    {
      id: "memory-match",
      title: "Memory Match",
      description: "Match pairs of cards to test your visual memory",
      icon: Grid,
      difficulty: "easy",
      timeEstimate: "5 min",
      category: "memory",
      path: "/patient/games/memory-match",
    },
    {
      id: "word-recall",
      title: "Word Recall",
      description: "Remember and recall a list of words",
      icon: Brain,
      difficulty: "medium",
      timeEstimate: "10 min",
      category: "memory",
      path: "/patient/games/word-recall",
    },
    {
      id: "pattern-sequence",
      title: "Pattern Sequence",
      description: "Remember and repeat growing sequences",
      icon: Layers,
      difficulty: "medium",
      timeEstimate: "8 min",
      category: "attention",
      path: "/patient/games/pattern-sequence",
    },
    {
      id: "puzzle-solve",
      title: "Puzzle Solve",
      description: "Solve visual puzzles to improve problem-solving skills",
      icon: Puzzle,
      difficulty: "hard",
      timeEstimate: "15 min",
      category: "problem-solving",
      path: "/patient/games/puzzle-solve",
    },
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Unscramble letters to form words",
      icon: Shuffle,
      difficulty: "medium",
      timeEstimate: "7 min",
      category: "language",
      path: "/patient/games/word-scramble",
    },
  ]

  const filteredGames = filter ? games.filter((game) => game.category === filter) : games

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Cognitive Games</h2>
        <div className="flex gap-2">
          <Button variant={filter === null ? "default" : "outline"} size="sm" onClick={() => setFilter(null)}>
            All
          </Button>
          <Button variant={filter === "memory" ? "default" : "outline"} size="sm" onClick={() => setFilter("memory")}>
            Memory
          </Button>
          <Button
            variant={filter === "attention" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("attention")}
          >
            Attention
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGames.map((game) => (
          <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <game.icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={
                    game.difficulty === "easy"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : game.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {game.difficulty}
                </Badge>
              </div>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{game.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Improves {game.category}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push(game.path)}>
                <Zap className="mr-2 h-4 w-4" />
                Play Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

