"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { GeminiChatbot } from "@/components/gemini-chatbot"

export default function AssistantPage() {
  const router = useRouter()

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
          <h1 className="text-lg font-semibold">Memory Assistant</h1>
          <p className="text-xs text-white/80">AI-powered help and reminders</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <GeminiChatbot />
      </div>
    </div>
  )
}

