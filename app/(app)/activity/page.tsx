import { ArrowLeft, Filter, Clock, MapPin, AlertTriangle, Home, Circle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function ActivityPage() {
  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "location",
      message: "Entered the kitchen",
      time: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      icon: MapPin,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      zone: "green",
    },
    {
      id: 2,
      type: "alert",
      message: "Briefly entered warning zone",
      time: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      icon: Circle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/60",
      zone: "yellow",
    },
    {
      id: 3,
      type: "alert",
      message: "Guidance activated",
      time: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      icon: AlertTriangle,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/60",
      zone: "orange",
    },
    {
      id: 4,
      type: "location",
      message: "Returned to safe zone",
      time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      icon: Home,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/60",
      zone: "green",
    },
    {
      id: 5,
      type: "location",
      message: "Movement detected in bedroom",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: MapPin,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      zone: "green",
    },
    {
      id: 6,
      type: "alert",
      message: "Briefly approached guidance zone",
      time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      icon: AlertTriangle,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/60",
      zone: "orange",
    },
  ]

  // Group activities by date
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const todayActivities = activities.filter(
    (a) =>
      a.time.getDate() === today.getDate() &&
      a.time.getMonth() === today.getMonth() &&
      a.time.getFullYear() === today.getFullYear(),
  )

  const yesterdayActivities = activities.filter(
    (a) =>
      a.time.getDate() === yesterday.getDate() &&
      a.time.getMonth() === yesterday.getMonth() &&
      a.time.getFullYear() === yesterday.getFullYear(),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Activity Timeline</h1>
          <p className="text-xs text-white/80">Robert Johnson</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto text-white hover:bg-white/10">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Activity Timeline */}
      <div className="flex-1 overflow-y-auto bg-background">
        {/* Today's Activities */}
        <div className="px-4 py-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Today</h2>
          <div className="space-y-4">
            {todayActivities.map((activity, index) => (
              <div key={activity.id} className="relative pl-10 pb-5 last:pb-0">
                {/* Timeline line */}
                {index < todayActivities.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-primary/10"></div>
                )}

                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full",
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

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 shadow-sm">
                  <p className="font-medium">{activity.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{format(activity.time, "h:mm a")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yesterday's Activities */}
        {yesterdayActivities.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Yesterday</h2>
            <div className="space-y-4">
              {yesterdayActivities.map((activity, index) => (
                <div key={activity.id} className="relative pl-10 pb-5 last:pb-0">
                  {/* Timeline line */}
                  {index < yesterdayActivities.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-primary/10"></div>
                  )}

                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full",
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

                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 shadow-sm">
                    <p className="font-medium">{activity.message}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(activity.time, "h:mm a")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

