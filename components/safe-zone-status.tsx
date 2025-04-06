import { Check, AlertTriangle, Navigation, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function SafeZoneStatus() {
  // Sample data - "green", "yellow", "orange", "red"
  const currentZone = "green"

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-green-500 flex-shrink-0 shadow-sm"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Green Zone (Safe)</p>
              {currentZone === "green" && (
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <Check className="h-3 w-3" />
                  <span>Current</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Normal safe area</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-yellow-500 flex-shrink-0 shadow-sm"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Yellow Zone (Warning)</p>
              {currentZone === "yellow" && (
                <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Current</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Left approved area</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-orange-500 flex-shrink-0 shadow-sm"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Orange Zone (Guidance)</p>
              {currentZone === "orange" && (
                <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium">
                  <Navigation className="h-3 w-3" />
                  <span>Current</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Navigation guidance active</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-red-500 flex-shrink-0 shadow-sm"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Red Zone (Emergency)</p>
              {currentZone === "red" && (
                <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                  <AlertCircle className="h-3 w-3" />
                  <span>Current</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">SOS emergency active</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-muted-foreground">Distance from boundary</p>
          <p className="text-xs font-medium">85%</p>
        </div>
        <Progress value={85} className="h-2" />
      </div>
    </div>
  )
}

