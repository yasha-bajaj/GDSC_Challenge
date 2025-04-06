"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Brain, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Define card types
type CardType = {
  id: number
  value: string
  flipped: boolean
  matched: boolean
}

export default function MemoryMatchGame() {
  const router = useRouter()
  const { toast } = useToast()
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Card values (emojis for easy recognition)
  const cardValues = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🥝"]

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardValues, ...cardValues].map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }))

    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameCompleted(false)
    setTimer(0)

    // Clear existing timer
    if (timerInterval) {
      clearInterval(timerInterval)
    }

    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    setTimerInterval(interval)
    setGameStarted(true)
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (cards[id].flipped || cards[id].matched) return

    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) return

    // Flip the card
    const updatedCards = [...cards]
    updatedCards[id].flipped = true
    setCards(updatedCards)

    // Add to flipped cards
    const updatedFlippedCards = [...flippedCards, id]
    setFlippedCards(updatedFlippedCards)

    // Check for match if two cards are flipped
    if (updatedFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstCardId, secondCardId] = updatedFlippedCards

      if (cards[firstCardId].value === cards[secondCardId].value) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstCardId].matched = true
          matchedCards[secondCardId].matched = true
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Check if game is completed
          if (matchedPairs + 1 === cardValues.length) {
            setGameCompleted(true)

            // Stop timer
            if (timerInterval) {
              clearInterval(timerInterval)
              setTimerInterval(null)
            }

            // Show completion toast
            toast({
              title: "Game Completed!",
              description: `You completed the game in ${moves + 1} moves and ${timer} seconds.`,
            })
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const unflippedCards = [...cards]
          unflippedCards[firstCardId].flipped = false
          unflippedCards[secondCardId].flipped = false
          setCards(unflippedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate score (based on moves and time)
  const calculateScore = () => {
    const baseScore = 1000
    const movesPenalty = moves * 10
    const timePenalty = timer * 2

    return Math.max(baseScore - movesPenalty - timePenalty, 0)
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [timerInterval])

  // Start game on component mount
  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10"
          onClick={() => router.push("/patient")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Memory Match</h1>
          <p className="text-xs text-white/80">Find matching pairs</p>
        </div>
      </div>

      {/* Game Stats */}
      <div className="px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-950 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4 text-primary" />
            <span className="font-medium">{moves} Moves</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8" onClick={initializeGame}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Restart
        </Button>
      </div>

      {/* Game Content */}
      <div className="flex-1 p-4">
        {gameCompleted ? (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Game Completed!</CardTitle>
              <CardDescription>Great job! You've found all the matching pairs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Time:</span>
                <span className="font-medium">{formatTime(timer)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Moves:</span>
                <span className="font-medium">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Score:</span>
                <span className="font-medium">{calculateScore()}</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Performance</span>
                  <span className="text-sm font-medium">
                    {calculateScore() > 800
                      ? "Excellent!"
                      : calculateScore() > 600
                        ? "Great!"
                        : calculateScore() > 400
                          ? "Good"
                          : "Keep practicing"}
                  </span>
                </div>
                <Progress value={calculateScore() / 10} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={initializeGame}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">
                {matchedPairs}/{cardValues.length} pairs
              </span>
            </div>
            <Progress value={(matchedPairs / cardValues.length) * 100} className="h-2" />
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform ${
                card.flipped || card.matched ? "rotate-y-180" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`w-full h-full flex items-center justify-center text-2xl font-bold rounded-lg ${
                  card.flipped || card.matched ? "bg-primary text-white" : "bg-primary/10"
                } ${card.matched ? "bg-green-500" : ""}`}
              >
                {card.flipped || card.matched ? card.value : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

