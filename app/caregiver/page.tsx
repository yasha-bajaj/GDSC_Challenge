"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { ArrowLeft, Activity, MapPin } from "lucide-react"
import { PatientProgress } from "@/components/patient-progress"
import { PatientMap } from "@/components/patient-map"

export default function CaregiverPage() {
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
          <h1 className="text-lg font-semibold">Caregiver Module</h1>
          <p className="text-xs text-white/80">Monitor patient progress</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Cognitive Progress</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Location Tracking</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <PatientProgress />
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patient Location</CardTitle>
                <CardDescription>Track patient's current location</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientMap />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

