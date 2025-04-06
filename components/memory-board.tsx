"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Plus, Save, Trash2, Edit2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

type MemoryEntry = {
  id: string
  title: string
  content: string
  date: Date
  images?: string[]
}

export function MemoryBoard() {
  const { toast } = useToast()
  const [entries, setEntries] = useState<MemoryEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("memory-entries")
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries)
        // Convert string dates back to Date objects
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }))
        setEntries(entriesWithDates)
      } catch (error) {
        console.error("Failed to parse saved entries", error)
      }
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("memory-entries", JSON.stringify(entries))
  }, [entries])

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      })
      return
    }

    if (editingId) {
      // Update existing entry
      setEntries(entries.map((entry) => (entry.id === editingId ? { ...entry, title, content } : entry)))
      setEditingId(null)
    } else {
      // Add new entry
      const newEntry: MemoryEntry = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date(),
      }
      setEntries([newEntry, ...entries])
    }

    // Reset form
    setTitle("")
    setContent("")
    setShowForm(false)

    toast({
      title: "Success",
      description: editingId ? "Memory updated successfully" : "Memory saved successfully",
    })
  }

  const handleEdit = (entry: MemoryEntry) => {
    setTitle(entry.title)
    setContent(entry.content)
    setEditingId(entry.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    toast({
      title: "Deleted",
      description: "Memory deleted successfully",
    })
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Memory Board</h2>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Memory
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="overflow-hidden border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle>{editingId ? "Edit Memory" : "Add New Memory"}</CardTitle>
            <CardDescription>Record your thoughts, experiences, or important information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="What would you like to remember?"
                className="min-h-[150px] border-primary/20 focus-visible:ring-primary/30"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Memory
            </Button>
          </CardFooter>
        </Card>
      )}

      {entries.length === 0 && !showForm ? (
        <Card className="bg-muted/50 border-dashed border-2 border-primary/20">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Memories Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start recording your thoughts and experiences to build your memory board.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Memory
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-primary/10"
            >
              <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex justify-between">
                  <CardTitle>{entry.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(entry)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(entry.date, "PPP 'at' p")}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

