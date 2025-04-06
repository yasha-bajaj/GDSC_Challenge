"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { Brain, ArrowRight, CheckCircle, MapPin, Lightbulb, Puzzle, Book } from "lucide-react"

type Question = {
  id: number
  text: string
  category: string
  options: {
    id: string
    text: string
    value: number
  }[]
}

export default function DiagnosisPage() {
  const { updateUser } = useAuth()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [diagnosisLevel, setDiagnosisLevel] = useState<"mild" | "moderate" | "severe" | null>(null)
  const [selectedRole, setSelectedRole] = useState<"patient" | "caregiver" | null>(null)
  const [mounted, setMounted] = useState(false)
  const [categoryScores, setCategoryScores] = useState({
    memory: 0,
    orientation: 0,
    language: 0,
    executive: 0,
    attention: 0,
  })

  // Only render after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you have trouble remembering recent events or conversations?",
      category: "memory",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 2,
      text: "Do you have difficulty finding the right words during conversations?",
      category: "language",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 3,
      text: "How often do you misplace items and have trouble retracing steps to find them?",
      category: "memory",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 4,
      text: "Do you have difficulty with complex tasks like managing finances or following a recipe?",
      category: "executive",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 5,
      text: "How often do you get confused about time or place?",
      category: "orientation",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 6,
      text: "Do you have trouble maintaining focus during conversations or activities?",
      category: "attention",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 7,
      text: "How often do you forget important dates or appointments?",
      category: "memory",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 8,
      text: "Do you have difficulty recognizing familiar faces or places?",
      category: "memory",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 9,
      text: "How often do you have trouble understanding written text or following a story?",
      category: "language",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
    {
      id: 10,
      text: "Do you have difficulty planning or organizing daily activities?",
      category: "executive",
      options: [
        { id: "a", text: "Rarely or never", value: 0 },
        { id: "b", text: "Occasionally", value: 1 },
        { id: "c", text: "Frequently", value: 2 },
        { id: "d", text: "Almost always", value: 3 },
      ],
    },
  ]

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion]
    const option = question.options.find((opt) => opt.id === value)

    if (option) {
      const newAnswers = { ...answers, [question.id]: value }
      setAnswers(newAnswers)

      // Update score
      const newScore = score + option.value
      setScore(newScore)

      // Update category score
      const category = question.category as keyof typeof categoryScores
      setCategoryScores({
        ...categoryScores,
        [category]: categoryScores[category] + option.value,
      })

      // Move to next question or complete
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Determine diagnosis level based on score
        // Maximum possible score is 30 (10 questions × max value 3)
        let level: "mild" | "moderate" | "severe" = "mild"
        if (newScore >= 20) {
          level = "severe"
        } else if (newScore >= 10) {
          level = "moderate"
        }

        setDiagnosisLevel(level)
        setCompleted(true)
      }
    }
  }

  const handleRoleSelect = (role: "patient" | "caregiver") => {
    setSelectedRole(role)

    // Update user data with diagnosis results and role
    updateUser({
      completedDiagnosis: true,
      diagnosisLevel,
      role,
    })

    // Redirect to module selection
    router.push("/module-select")
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Get icon for current question category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "memory":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "orientation":
        return <MapPin className="h-5 w-5 text-blue-500" />
      case "language":
        return <Book className="h-5 w-5 text-green-500" />
      case "executive":
        return <Puzzle className="h-5 w-5 text-orange-500" />
      case "attention":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />
      default:
        return <Brain className="h-5 w-5 text-primary" />
    }
  }

  // Don't render until component is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center purple-gradient">
        <div className="animate-pulse text-white">Loading assessment...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 purple-gradient">
      <div className="w-full max-w-md">
        {!completed ? (
          <Card className="w-full rounded-3xl border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">Cognitive Assessment</CardTitle>
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardDescription className="flex items-center justify-between">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(questions[currentQuestion].category)}
                  <span className="text-xs capitalize">{questions[currentQuestion].category}</span>
                </div>
              </CardDescription>
              <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{questions[currentQuestion].text}</h3>
                <RadioGroup onValueChange={handleAnswer}>
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer py-2">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full rounded-3xl border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">Assessment Complete</CardTitle>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription>Based on your responses, we've identified the following:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-primary/10 rounded-xl mb-6">
                <h3 className="text-lg font-medium mb-2">Cognitive Status</h3>
                <p className="mb-4">
                  Your assessment indicates{" "}
                  {diagnosisLevel === "mild"
                    ? "mild cognitive impairment"
                    : diagnosisLevel === "moderate"
                      ? "moderate cognitive impairment"
                      : "significant cognitive impairment"}
                  .
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      diagnosisLevel === "mild"
                        ? "bg-green-500 w-1/3"
                        : diagnosisLevel === "moderate"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-red-500 w-full"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="mb-6 space-y-3">
                <h3 className="text-sm font-medium">Assessment Breakdown</h3>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span>Memory</span>
                    </div>
                    <span>{Math.min(categoryScores.memory * 25, 100)}%</span>
                  </div>
                  <Progress value={Math.min(categoryScores.memory * 25, 100)} className="h-1" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-blue-500" />
                      <span>Orientation</span>
                    </div>
                    <span>{Math.min(categoryScores.orientation * 100, 100)}%</span>
                  </div>
                  <Progress value={Math.min(categoryScores.orientation * 100, 100)} className="h-1" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Book className="h-3 w-3 text-green-500" />
                      <span>Language</span>
                    </div>
                    <span>{Math.min(categoryScores.language * 50, 100)}%</span>
                  </div>
                  <Progress value={Math.min(categoryScores.language * 50, 100)} className="h-1" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Puzzle className="h-3 w-3 text-orange-500" />
                      <span>Executive Function</span>
                    </div>
                    <span>{Math.min(categoryScores.executive * 50, 100)}%</span>
                  </div>
                  <Progress value={Math.min(categoryScores.executive * 50, 100)} className="h-1" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Lightbulb className="h-3 w-3 text-yellow-500" />
                      <span>Attention</span>
                    </div>
                    <span>{Math.min(categoryScores.attention * 100, 100)}%</span>
                  </div>
                  <Progress value={Math.min(categoryScores.attention * 100, 100)} className="h-1" />
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">How will you use this app?</h3>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => handleRoleSelect("patient")}
                  className="h-auto py-4 justify-start text-left"
                  variant="outline"
                >
                  <div>
                    <p className="font-medium">I am the patient</p>
                    <p className="text-sm text-muted-foreground">Access memory games and personal journal</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </Button>

                <Button
                  onClick={() => handleRoleSelect("caregiver")}
                  className="h-auto py-4 justify-start text-left"
                  variant="outline"
                >
                  <div>
                    <p className="font-medium">I am a caregiver</p>
                    <p className="text-sm text-muted-foreground">Monitor patient progress and manage care</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-center text-muted-foreground">
              This assessment is not a medical diagnosis. Please consult with a healthcare professional for a proper
              evaluation.
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

