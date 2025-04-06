"use client"

import { useState } from "react"
import { Bell, Shield, AlertTriangle, Activity, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [sosActive, setSosActive] = useState(false)

  const handleSOS = () => {
    setSosActive(true)
    toast({
      variant: "destructive",
      title: "SOS Alert Activated!",
      description: "Emergency services and caregivers have been notified.",
    })
    setTimeout(() => {
      toast({
        title: "Alert Acknowledged",
        description: "Caregiver Sarah Johnson is responding to the alert.",
      })
      setTimeout(() => {
        setSosActive(false)
      }, 10000)
    }, 3000)
  }

  return (
    <div className="flex flex-col pb-4 min-h-screen">
      {/* App Header */}
      <div className="px-4 pt-4 pb-6 flex items-center justify-between purple-gradient">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">SafeTrail</h1>
        </div>
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src="/caretaker.jpg" />
          <AvatarFallback className="bg-primary/20 text-white">SJ</AvatarFallback>
        </Avatar>
      </div>

      {/* Patient Header */}
      <div className="px-4 -mt-4">
        <Card className="rounded-3xl shadow-lg border-none overflow-hidden card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src="/patient.jpg" />
                <AvatarFallback className="bg-primary/20">RJ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">Robert Johnson</h2>
                <p className="text-sm text-muted-foreground">78 years old • Alzheimer's</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan of Care */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Plan of Care</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Link href="/exercise">
            <Card className="rounded-2xl border-none overflow-hidden bg-secondary card-hover-effect">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-center">Exercise</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings/patient-profile">
            <Card className="rounded-2xl border-none overflow-hidden bg-secondary card-hover-effect">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-center">Medication</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/location">
            <Card className="rounded-2xl border-none overflow-hidden bg-secondary card-hover-effect">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-center">Location</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Status Card */}
      <div className="px-4 py-2">
        <Card className="rounded-3xl shadow-md border-none overflow-hidden card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Current Status
              </h3>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-sm rounded-full"
              >
                In Safe Zone
              </Badge>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Living Room</p>
                <p className="text-xs text-muted-foreground">Last updated: Just now</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Button */}
      <div className="px-4 py-4">
        <Button
          variant="destructive"
          className={`w-full py-6 rounded-2xl text-lg font-medium ${sosActive ? "animate-pulse" : ""}`}
          onClick={handleSOS}
        >
          <AlertTriangle className="h-6 w-6 mr-2" />
          {sosActive ? "SOS ACTIVE" : "Emergency SOS"}
        </Button>
      </div>
    </div>
  )
}

