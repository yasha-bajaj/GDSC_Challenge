"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Building, MapPin, Plus, Save } from "lucide-react"

export function SafeZoneConfig() {
  const [radius, setRadius] = useState(50)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Safe Zone Configuration</CardTitle>
        <CardDescription>Define and manage safe areas for patients</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="home">
          <TabsList className="mb-4">
            <TabsTrigger value="home">
              <Home className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="facility">
              <Building className="h-4 w-4 mr-2" />
              Facility
            </TabsTrigger>
            <TabsTrigger value="custom">
              <MapPin className="h-4 w-4 mr-2" />
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="zone-name">Zone Name</Label>
                  <Input id="zone-name" defaultValue="Home Safe Zone" />
                </div>

                <div className="mb-4">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main Street, Anytown, USA" />
                </div>

                <div className="mb-4">
                  <Label>Safe Zone Radius ({radius}m)</Label>
                  <Slider
                    value={[radius]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={(value) => setRadius(value[0])}
                    className="mt-2"
                  />
                </div>

                <div className="mb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-boundary">Alert on Boundary Approach</Label>
                    <Switch id="alert-boundary" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-exit">Alert on Zone Exit</Label>
                    <Switch id="alert-exit" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="gps-fallback">GPS Fallback</Label>
                    <Switch id="gps-fallback" defaultChecked />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="alert-recipients">Alert Recipients</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Caregivers</SelectItem>
                      <SelectItem value="primary">Primary Caregiver Only</SelectItem>
                      <SelectItem value="custom">Custom List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mx-auto w-[200px] h-[200px] border-2 border-dashed border-primary rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/10"></div>
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    This represents the safe zone area with a {radius}m radius
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    Set Current Location
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facility" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="facility-name">Facility Name</Label>
                  <Input id="facility-name" defaultValue="Sunshine Care Center" />
                </div>

                <div className="mb-4">
                  <Label htmlFor="facility-address">Facility Address</Label>
                  <Input id="facility-address" defaultValue="456 Care Lane, Anytown, USA" />
                </div>

                <div className="mb-4">
                  <Label htmlFor="facility-type">Facility Type</Label>
                  <Select defaultValue="nursing">
                    <SelectTrigger id="facility-type">
                      <SelectValue placeholder="Select facility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nursing">Nursing Home</SelectItem>
                      <SelectItem value="assisted">Assisted Living</SelectItem>
                      <SelectItem value="memory">Memory Care</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="facility-alert-boundary">Alert on Boundary Approach</Label>
                    <Switch id="facility-alert-boundary" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="facility-alert-exit">Alert on Zone Exit</Label>
                    <Switch id="facility-alert-exit" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="facility-restricted">Restricted Areas</Label>
                    <Switch id="facility-restricted" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mx-auto w-[250px] h-[150px] border-2 border-primary rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 rounded-lg bg-primary/10"></div>
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Facility floor plan with safe zones</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Floor Plan
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="custom-name">Custom Zone Name</Label>
                  <Input id="custom-name" placeholder="e.g., Park, Shopping Mall" />
                </div>

                <div className="mb-4">
                  <Label htmlFor="custom-address">Location</Label>
                  <Input id="custom-address" placeholder="Enter address or coordinates" />
                </div>

                <div className="mb-4">
                  <Label>Zone Shape</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div className="w-8 h-8 rounded-full border-2 border-primary mb-1"></div>
                      <span className="text-xs">Circle</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div className="w-8 h-8 rounded-sm border-2 border-primary mb-1"></div>
                      <span className="text-xs">Rectangle</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div
                        className="w-8 h-8 border-2 border-primary mb-1"
                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                      ></div>
                      <span className="text-xs">Custom</span>
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Custom Zone Size</Label>
                  <Slider
                    value={[radius]}
                    min={10}
                    max={200}
                    step={10}
                    onValueChange={(value) => setRadius(value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Small</span>
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-4 text-sm text-muted-foreground">Draw a custom safe zone on the map</p>
                  <div className="relative mx-auto w-[250px] h-[250px] border border-dashed border-primary rounded-lg flex items-center justify-center bg-white">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Set Location
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Draw Zone
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Safe Zone
        </Button>
      </CardFooter>
    </Card>
  )
}

