import { Wifi, Battery, Signal } from "lucide-react"
import { format } from "date-fns"

export function StatusBar() {
  const now = new Date()

  return (
    <div className="h-10 purple-gradient flex items-center justify-between px-4 py-1 sticky top-0 z-50">
      <div className="text-sm font-medium text-white">{format(now, "h:mm")}</div>
      <div className="flex items-center gap-2 text-white">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <div className="flex items-center">
          <Battery className="h-3.5 w-3.5" />
          <span className="text-xs ml-1">85%</span>
        </div>
      </div>
    </div>
  )
}

