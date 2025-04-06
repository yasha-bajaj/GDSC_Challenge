"use client"

import { ArrowLeft, Clock, Calendar, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ExercisePage() {
  const exerciseBlogs = [
    {
      id: 1,
      title: "Gentle Exercises for Alzheimer's Patients",
      excerpt:
        "Discover how low-impact exercises can improve cognitive function and overall well-being for those with Alzheimer's disease.",
      author: "Dr. Emily Chen",
      authorRole: "Physical Therapist",
      date: "May 15, 2023",
      readTime: "5 min read",
      image: "/exercise-1.jpg",
      category: "Physical Health",
    },
    {
      id: 2,
      title: "The Benefits of Daily Walking for Seniors",
      excerpt:
        "Regular walking can significantly improve cardiovascular health, balance, and mood in elderly patients. Learn how to create a safe walking routine.",
      author: "James Wilson",
      authorRole: "Senior Care Specialist",
      date: "June 3, 2023",
      readTime: "4 min read",
      image: "/exercise-2.jpg",
      category: "Mobility",
    },
    {
      id: 3,
      title: "Chair Yoga: Safe Stretches for Limited Mobility",
      excerpt:
        "Chair yoga offers a gentle way to improve flexibility and reduce stress for those with limited mobility or balance concerns.",
      author: "Sarah Thompson",
      authorRole: "Certified Yoga Instructor",
      date: "July 12, 2023",
      readTime: "6 min read",
      image: "/exercise-3.jpg",
      category: "Flexibility",
    },
    {
      id: 4,
      title: "Memory-Enhancing Movement Patterns",
      excerpt:
        "Specific movement patterns can help stimulate brain activity and potentially slow cognitive decline in patients with early-stage dementia.",
      author: "Dr. Michael Roberts",
      authorRole: "Neurologist",
      date: "August 22, 2023",
      readTime: "7 min read",
      image: "/exercise-4.jpg",
      category: "Cognitive Health",
    },
    {
      id: 5,
      title: "Water Exercises for Joint Pain Relief",
      excerpt:
        "Aquatic therapy provides a low-impact environment for seniors to exercise without putting stress on painful joints.",
      author: "Lisa Johnson",
      authorRole: "Aquatic Therapist",
      date: "September 5, 2023",
      readTime: "5 min read",
      image: "/exercise-5.jpg",
      category: "Pain Management",
    },
  ]

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Exercise Resources</h1>
          <p className="text-xs text-white/80">Recommended for Robert Johnson</p>
        </div>
      </div>

      {/* Featured Article */}
      <div className="px-4 py-4">
        <Card className="rounded-3xl border-none overflow-hidden card-shadow">
          <div className="relative h-48 w-full">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
              alt="Featured exercise"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <Badge className="bg-primary border-none mb-2">Featured</Badge>
              <h2 className="text-xl font-bold">Safe Exercises for Alzheimer's Patients</h2>
              <p className="text-sm text-white/80">Improve cognitive function with these gentle routines</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Exercise Blog Posts */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-3">Latest Articles</h2>
        <div className="space-y-4">
          {exerciseBlogs.map((blog) => (
            <Card key={blog.id} className="rounded-2xl border-none overflow-hidden card-shadow card-hover-effect">
              <div className="flex">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={
                      blog.id === 1
                        ? "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
                        : blog.id === 2
                          ? "https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?q=80&w=2127&auto=format&fit=crop"
                          : blog.id === 3
                            ? "https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5?q=80&w=2070&auto=format&fit=crop"
                            : blog.id === 4
                              ? "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=2070&auto=format&fit=crop"
                              : "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2072&auto=format&fit=crop"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover rounded-l-2xl"
                  />
                </div>
                <CardContent className="p-3 flex-1">
                  <Badge className="bg-secondary text-primary border-none mb-1 text-xs">{blog.category}</Badge>
                  <h3 className="font-semibold text-sm line-clamp-1">{blog.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{blog.excerpt}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-primary/10">
                          {blog.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{blog.author}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Exercises */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold mb-3">Recommended for Today</h2>
        <Card className="rounded-2xl border-none overflow-hidden card-shadow bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Gentle Chair Exercises</h3>
                  <p className="text-xs text-muted-foreground">15 minutes • Low intensity</p>
                </div>
              </div>
              <Button size="sm" className="rounded-full">
                Start
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Scheduled for 10:00 AM</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

