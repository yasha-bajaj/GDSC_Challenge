"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Navigation, Layers, ZoomIn, ZoomOut, Search, MapPin, AlertTriangle, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function LocationPage() {
  const [loading, setLoading] = useState(true)
  const [mapType, setMapType] = useState<"satellite" | "map">("satellite")
  const [zoom, setZoom] = useState(18)
  const [showSearch, setShowSearch] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [showSOSDialog, setShowSOSDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading map data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 15))
  }

  const toggleMapType = () => {
    setMapType((prev) => (prev === "satellite" ? "map" : "satellite"))
  }

  const handleSOSActivate = () => {
    setSosActive(true)
    setShowSOSDialog(false)

    toast({
      variant: "destructive",
      title: "SOS Alert Activated!",
      description: "Emergency services and caregivers have been notified.",
    })

    // Simulate response after a delay
    setTimeout(() => {
      toast({
        title: "Alert Acknowledged",
        description: "Caregiver Sarah Johnson is responding to the alert.",
      })
    }, 3000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Live Location</h1>
          <p className="text-xs text-white/80">Robert Johnson</p>
        </div>
        <Badge variant="outline" className="ml-auto bg-green-500/20 text-white border-green-500/30 rounded-full">
          In Safe Zone
        </Badge>
      </div>

      {/* Full Screen Map */}
      <div className="relative flex-1">
        {/* Map Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full"
            onClick={toggleMapType}
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Bar - Google Maps Style */}
        <div className="absolute top-3 left-3 right-16 z-10">
          {showSearch ? (
            <div className="flex items-center bg-white dark:bg-gray-900 rounded-full shadow-md">
              <Input
                placeholder="Search this area"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-white/90 dark:bg-gray-900/90 shadow-md hover:bg-white dark:hover:bg-gray-900 rounded-full"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search this area</span>
            </Button>
          )}
        </div>

        {/* Full Map View */}
        {loading ? (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            {/* Map Background */}
            <Image
              src={mapType === "satellite" ? "/satellite-map.jpg" : "/street-map.jpg"}
              alt="Map view"
              fill
              style={{
                objectFit: "cover",
                transform: `scale(${1 + (zoom - 18) * 0.1})`,
                transformOrigin: "center",
              }}
              className="transition-transform duration-300"
              priority
            />

            {/* Street names and labels */}
            {mapType === "map" && (
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded text-xs font-medium">
                  Maple Street
                </div>
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 rotate-90 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded text-xs font-medium">
                  Oak Avenue
                </div>
                <div className="absolute bottom-1/4 right-1/4 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded text-xs font-medium">
                  Pine Road
                </div>
              </div>
            )}

            {/* Safe Zones */}
            <div className="absolute inset-0 w-full h-full">
              {/* House location - center of the map */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Green zone (house) */}
                <div className="absolute -inset-12 rounded-full border-2 border-green-500 bg-green-500/10"></div>

                {/* Yellow zone (yard) */}
                <div className="absolute -inset-24 -z-10 rounded-full border-2 border-dashed border-yellow-500 bg-yellow-500/5"></div>

                {/* Orange zone (road) */}
                <div className="absolute -inset-40 -z-20 rounded-full border-2 border-dashed border-orange-500 bg-orange-500/5"></div>

                {/* Red zone (outside) */}
                <div className="absolute -inset-60 -z-30 rounded-full border-2 border-dashed border-red-500 bg-red-500/5"></div>
              </div>
            </div>

            {/* Patient marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="relative">
                {/* Pulse effect */}
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping opacity-75"></div>

                {/* Google Maps style pin */}
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-primary rounded-full"></div>

                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Google Maps style attribution */}
            <div className="absolute bottom-20 right-2 text-xs text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-black/30 px-1 rounded">
              Map data ©2025
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-md p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Safe</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs">Guidance</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">Emergency</span>
            </div>
          </div>
          <Button size="sm" className="h-7 gap-1 bg-primary text-white shadow-sm rounded-full">
            <Navigation className="h-3 w-3" />
            <span className="text-xs">Recenter</span>
          </Button>
        </div>

        {/* Google Maps style info card */}
        <div className="absolute top-16 left-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-3 max-w-[180px] z-10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">Home</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">123 Maple Street, Anytown, USA</p>
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-100 text-xs rounded-full"
            >
              Safe Zone
            </Badge>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              Directions
            </Button>
          </div>
        </div>

        {/* SOS Button */}
        <Button
          variant="destructive"
          className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg ${sosActive ? "animate-pulse" : ""}`}
          onClick={() => setShowSOSDialog(true)}
        >
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-6 w-6 mb-1" />
            <span className="text-xs font-bold">SOS</span>
          </div>
        </Button>

        {/* SOS Confirmation Dialog */}
        <Dialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-red-600">Emergency SOS</DialogTitle>
              <DialogDescription className="text-center">
                Are you sure you want to activate the emergency SOS? This will alert caregivers and emergency contacts.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              <div className="text-center">
                <p className="font-medium">This will:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Alert all emergency contacts</li>
                  <li>• Share your current location</li>
                  <li>• Initiate emergency protocols</li>
                </ul>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowSOSDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1 gap-2" onClick={handleSOSActivate}>
                <Phone className="h-4 w-4" />
                Activate SOS
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

