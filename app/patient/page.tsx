"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { Brain, Book, ArrowLeft } from "lucide-react"
import { MemoryBoard } from "@/components/memory-board"
import { CognitiveGames } from "@/components/cognitive-games"

export default function PatientPage() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10"
          onClick={() => router.push("/module-select")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Patient Module</h1>
          <p className="text-xs text-white/80">Memory exercises and journal</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Cognitive Games</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Memory Board</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-4">
            <CognitiveGames />
          </TabsContent>

          <TabsContent value="memory" className="space-y-4">
            <MemoryBoard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

