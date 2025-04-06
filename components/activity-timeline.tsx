import { Clock, MapPin, AlertTriangle, Home, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityTimeline() {
  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "location",
      message: "Entered the kitchen",
      time: "10 minutes ago",
      icon: MapPin,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      zone: "green",
    },
    {
      id: 2,
      type: "alert",
      message: "Briefly entered warning zone",
      time: "25 minutes ago",
      icon: Circle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/60",
      zone: "yellow",
    },
    {
      id: 3,
      type: "alert",
      message: "Guidance activated",
      time: "45 minutes ago",
      icon: AlertTriangle,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/60",
      zone: "orange",
    },
    {
      id: 4,
      type: "location",
      message: "Returned to safe zone",
      time: "1 hour ago",
      icon: Home,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/60",
      zone: "green",
    },
  ]

  return (
    <div className="relative space-y-4 overflow-hidden">
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-6 pb-8 last:pb-0">
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700"></div>
            )}

            {/* Timeline dot */}
            <div
              className={cn(
                "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white dark:border-slate-800 shadow-sm",
                activity.zone === "green"
                  ? "bg-green-500"
                  : activity.zone === "yellow"
                    ? "bg-yellow-500"
                    : activity.zone === "orange"
                      ? "bg-orange-500"
                      : "bg-red-500",
              )}
            >
              <activity.icon className="h-3 w-3 text-white" />
            </div>

            <div className="ml-2 rounded-lg border bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/80 p-3 shadow-sm">
              <p className="font-medium">{activity.message}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 text-center">
        <button className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
          <span>View Complete Timeline</span>
        </button>
      </div>

      <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl pointer-events-none"></div>
    </div>
  )
}

