import { Clock, MapPin, AlertTriangle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityFeed() {
  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "location",
      message: "Entered the kitchen",
      time: "10 min ago",
      icon: MapPin,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      zone: "green",
    },
    {
      id: 2,
      type: "alert",
      message: "Briefly entered warning zone",
      time: "25 min ago",
      icon: Circle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/60",
      zone: "yellow",
    },
    {
      id: 3,
      type: "alert",
      message: "Guidance activated",
      time: "45 min ago",
      icon: AlertTriangle,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/60",
      zone: "orange",
    },
  ]

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-3">
          <div
            className={cn(
              "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
              activity.zone === "green"
                ? "bg-green-100 dark:bg-green-900/30"
                : activity.zone === "yellow"
                  ? "bg-yellow-100 dark:bg-yellow-900/30"
                  : activity.zone === "orange"
                    ? "bg-orange-100 dark:bg-orange-900/30"
                    : "bg-red-100 dark:bg-red-900/30",
            )}
          >
            <activity.icon
              className={cn(
                "h-4 w-4",
                activity.zone === "green"
                  ? "text-green-600 dark:text-green-400"
                  : activity.zone === "yellow"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : activity.zone === "orange"
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-red-600 dark:text-red-400",
              )}
            />
          </div>

          <div className="flex-1">
            <p className="text-sm">{activity.message}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full text-center text-xs text-primary font-medium pt-1">View All Activity</button>
    </div>
  )
}

