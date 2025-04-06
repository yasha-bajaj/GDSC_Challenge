"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save, Trash2, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function SafeZonesPage() {
  const { toast } = useToast()
  const [greenRadius, setGreenRadius] = useState(50)
  const [yellowRadius, setYellowRadius] = useState(100)
  const [redRadius, setRedRadius] = useState(150)

  const handleSave = () => {
    toast({
      title: "Safe Zones Updated",
      description: "Your safe zone settings have been saved successfully.",
    })
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-10">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-semibold">Safe Zone Settings</h1>
          <p className="text-xs text-muted-foreground">Configure safety boundaries</p>
        </div>
      </div>

      {/* Safe Zone Configuration */}
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Safe Zone Configuration</CardTitle>
            <CardDescription>Define safety boundaries for patient monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="zones">
              <TabsList className="mb-4 grid grid-cols-2">
                <TabsTrigger value="zones">Zone Settings</TabsTrigger>
                <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="zones" className="space-y-6">
                {/* Green Zone (Safe) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="font-medium">Green Zone (Safe)</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Zone Radius: {greenRadius}m</Label>
                    <Slider
                      value={[greenRadius]}
                      min={10}
                      max={100}
                      step={5}
                      onValueChange={(value) => setGreenRadius(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Normal safe area - no alerts will be triggered within this zone
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="green-name">Zone Name</Label>
                      <Input id="green-name" defaultValue="Home" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="green-location">Location</Label>
                      <Input id="green-location" defaultValue="123 Maple Street" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                {/* Yellow Zone (Warning) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <h3 className="font-medium">Yellow Zone (Warning)</h3>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Zone Radius: {yellowRadius}m</Label>
                    <Slider
                      value={[yellowRadius]}
                      min={50}
                      max={200}
                      step={10}
                      onValueChange={(value) => setYellowRadius(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Notifies the person they've left the approved area and sends caretaker notification
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="yellow-patient-alert">Alert Patient</Label>
                    <Switch id="yellow-patient-alert" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="yellow-caretaker-alert">Notify Caretaker</Label>
                    <Switch id="yellow-caretaker-alert" defaultChecked />
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                {/* Orange Zone (Guidance) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <h3 className="font-medium">Orange Zone (Guidance)</h3>
                    </div>
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Zone Radius: {redRadius}m</Label>
                    <Slider
                      value={[redRadius]}
                      min={100}
                      max={300}
                      step={25}
                      onValueChange={(value) => setRedRadius(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Guides the person back home and updates caretaker with more frequent notifications
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="orange-guidance">Activate Navigation Guidance</Label>
                    <Switch id="orange-guidance" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="orange-caretaker-updates">Send Frequent Updates</Label>
                    <Switch id="orange-caretaker-updates" defaultChecked />
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                {/* Red Zone (Emergency) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <h3 className="font-medium">Red Zone (Emergency)</h3>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Activates SOS emergency protocol when the patient goes beyond the orange zone
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="red-sos">Activate SOS Emergency</Label>
                    <Switch id="red-sos" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="red-emergency-contacts">Alert All Emergency Contacts</Label>
                    <Switch id="red-emergency-contacts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="red-location-tracking">Enable Continuous Location Tracking</Label>
                    <Switch id="red-location-tracking" defaultChecked />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-boundary">Notify on Boundary Approach</Label>
                    <Switch id="notify-boundary" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-exit">Notify on Zone Exit</Label>
                    <Switch id="notify-exit" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-emergency">Emergency Notifications</Label>
                    <Switch id="notify-emergency" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-sound">Sound Alerts</Label>
                    <Switch id="notify-sound" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-vibration">Vibration Alerts</Label>
                    <Switch id="notify-vibration" defaultChecked />
                  </div>
                </div>

                <div className="h-px bg-border my-4"></div>

                <div className="space-y-4">
                  <h3 className="font-medium">Alert Recipients</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Sarah Johnson (Primary)</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Michael Johnson (Son)</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Recipient
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

