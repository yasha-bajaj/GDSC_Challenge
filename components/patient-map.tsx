"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Navigation, Layers } from "lucide-react"
import Image from "next/image"

export function PatientMap() {
  const [loading, setLoading] = useState(true)
  const [mapType, setMapType] = useState<"satellite" | "map">("satellite")
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(18) // Google Maps-like zoom level (15-20 is neighborhood level)

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

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
          onClick={toggleMapType}
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="h-[150px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center rounded-lg">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      ) : (
        <div
          ref={mapContainerRef}
          className="h-[150px] w-full bg-gray-100 dark:bg-gray-800 relative rounded-lg overflow-hidden"
        >
          {/* Map Background */}
          <div className="absolute inset-0 w-full h-full">
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
          </div>

          {/* Street names and labels */}
          {mapType === "map" && (
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded text-xs font-medium">
                Maple Street
              </div>
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 rotate-90 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded text-xs font-medium">
                Oak Avenue
              </div>
            </div>
          )}

          {/* Safe Zones */}
          <div className="absolute inset-0 w-full h-full">
            {/* House location - center of the map */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Green zone (house) */}
              <div className="absolute -inset-8 rounded-full border-2 border-green-500 bg-green-500/10"></div>

              {/* Yellow zone (yard) */}
              <div className="absolute -inset-16 -z-10 rounded-full border-2 border-dashed border-yellow-500 bg-yellow-500/5"></div>

              {/* Orange zone (road) */}
              <div className="absolute -inset-24 -z-20 rounded-full border-2 border-dashed border-orange-500 bg-orange-500/5"></div>

              {/* Red zone (outside) */}
              <div className="absolute -inset-36 -z-30 rounded-full border-2 border-dashed border-red-500 bg-red-500/5"></div>
            </div>
          </div>

          {/* Patient marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative">
              {/* Pulse effect */}
              <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping opacity-75"></div>

              {/* Google Maps style pin */}
              <div className="relative w-6 h-6">
                <div className="absolute top-0 left-0 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-blue-600 rounded-full"></div>

                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Google Maps style attribution */}
          <div className="absolute bottom-1 right-1 text-[10px] text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-black/30 px-1 rounded">
            Map data ©2025
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <span className="text-xs">Safe</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
            <span className="text-xs">Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            <span className="text-xs">Guidance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <span className="text-xs">Emergency</span>
          </div>
        </div>
      </div>
    </div>
  )
}

