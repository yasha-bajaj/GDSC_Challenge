"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Heart, Activity, Smartphone, Volume2, Vibrate, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationSettingsPage() {
  const { toast } = useToast()
  const [notificationVolume, setNotificationVolume] = useState(80)

  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated successfully.",
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
          <h1 className="text-lg font-semibold">Notification Settings</h1>
          <p className="text-xs text-muted-foreground">Manage alerts and notifications</p>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how and when you receive alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="categories">
              <TabsList className="mb-4 grid grid-cols-3">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-6">
                {/* Safety Alerts */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    Safety Alerts
                  </h3>

                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="yellow-zone" className="font-medium">
                          Yellow Zone Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">When patient leaves approved area</p>
                      </div>
                      <Switch id="yellow-zone" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orange-zone" className="font-medium">
                          Orange Zone Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">When guidance is activated</p>
                      </div>
                      <Switch id="orange-zone" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="red-zone" className="font-medium">
                          Red Zone Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">When SOS emergency is activated</p>
                      </div>
                      <Switch id="red-zone" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="fall-detection" className="font-medium">
                          Fall Detection
                        </Label>
                        <p className="text-xs text-muted-foreground">When a possible fall is detected</p>
                      </div>
                      <Switch id="fall-detection" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sos-button" className="font-medium">
                          SOS Button Press
                        </Label>
                        <p className="text-xs text-muted-foreground">When patient presses SOS button</p>
                      </div>
                      <Switch id="sos-button" defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Health Monitoring */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-500" />
                    Health Monitoring
                  </h3>

                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity-level" className="font-medium">
                          Activity Level
                        </Label>
                        <p className="text-xs text-muted-foreground">When activity is unusually low</p>
                      </div>
                      <Switch id="activity-level" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="medication" className="font-medium">
                          Medication Reminders
                        </Label>
                        <p className="text-xs text-muted-foreground">Medication schedule alerts</p>
                      </div>
                      <Switch id="medication" defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Device Status */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Device Status
                  </h3>

                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="battery-low" className="font-medium">
                          Low Battery
                        </Label>
                        <p className="text-xs text-muted-foreground">When device battery is below 20%</p>
                      </div>
                      <Switch id="battery-low" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="connection-lost" className="font-medium">
                          Connection Lost
                        </Label>
                        <p className="text-xs text-muted-foreground">When device loses connection</p>
                      </div>
                      <Switch id="connection-lost" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="device-removed" className="font-medium">
                          Device Removed
                        </Label>
                        <p className="text-xs text-muted-foreground">When wearable device is removed</p>
                      </div>
                      <Switch id="device-removed" defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-6">
                {/* Notification Methods */}
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Methods</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="push-notifications" className="font-medium">
                          Push Notifications
                        </Label>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="email-notifications" className="font-medium">
                          Email Notifications
                        </Label>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="sound-alerts" className="font-medium">
                          Sound Alerts
                        </Label>
                      </div>
                      <Switch id="sound-alerts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Vibrate className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="vibration" className="font-medium">
                          Vibration
                        </Label>
                      </div>
                      <Switch id="vibration" defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Alert Sound Volume */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume">Alert Sound Volume</Label>
                    <span className="text-sm">{notificationVolume}%</span>
                  </div>
                  <Slider
                    id="volume"
                    value={[notificationVolume]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setNotificationVolume(value[0])}
                  />
                </div>

                {/* Alert Tone */}
                <div className="space-y-4">
                  <Label htmlFor="alert-tone">Alert Tone</Label>
                  <Select defaultValue="urgent">
                    <SelectTrigger id="alert-tone">
                      <SelectValue placeholder="Select alert tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (Default)</SelectItem>
                      <SelectItem value="gentle">Gentle</SelectItem>
                      <SelectItem value="chime">Chime</SelectItem>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority Settings */}
                <div className="space-y-4">
                  <Label>Priority Settings</Label>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all-alerts" />
                      <Label htmlFor="all-alerts">All alerts (may be frequent)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="important" id="important-only" />
                      <Label htmlFor="important-only">Important alerts only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="critical-only" />
                      <Label htmlFor="critical-only">Critical alerts only</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                {/* Do Not Disturb */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="do-not-disturb" className="font-medium">
                        Do Not Disturb
                      </Label>
                      <p className="text-xs text-muted-foreground">Silence non-critical notifications</p>
                    </div>
                    <Switch id="do-not-disturb" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dnd-start">Start Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="dnd-start">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                          <SelectItem value="00:00">12:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dnd-end">End Time</Label>
                      <Select defaultValue="07:00">
                        <SelectTrigger id="dnd-end">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="05:00">5:00 AM</SelectItem>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Allow Critical Alerts */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="critical-override" className="font-medium">
                      Allow Critical Alerts
                    </Label>
                    <p className="text-xs text-muted-foreground">Critical alerts will override Do Not Disturb</p>
                  </div>
                  <Switch id="critical-override" defaultChecked />
                </div>

                {/* Daily Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-summary" className="font-medium">
                        Daily Summary
                      </Label>
                      <p className="text-xs text-muted-foreground">Receive a daily activity summary</p>
                    </div>
                    <Switch id="daily-summary" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary-time">Summary Time</Label>
                    <Select defaultValue="18:00">
                      <SelectTrigger id="summary-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Weekly Report */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-report" className="font-medium">
                      Weekly Report
                    </Label>
                    <p className="text-xs text-muted-foreground">Receive a weekly activity report</p>
                  </div>
                  <Switch id="weekly-report" defaultChecked />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Default</Button>
            <Button onClick={handleSave}>Save Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

