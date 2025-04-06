"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  MapPin,
  Battery,
  Heart,
  Activity,
  Shield,
} from "lucide-react"

// Define notification data outside of the component
const initialNotifications = [
  {
    id: 1,
    type: "alert",
    category: "boundary",
    patient: "Robert Johnson",
    message: "Entered yellow zone - left safe area",
    time: "2 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "high",
  },
  {
    id: 2,
    type: "info",
    category: "device",
    patient: "Robert Johnson",
    message: "Device battery at 62%",
    time: "15 minutes ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "low",
  },
  {
    id: 3,
    type: "warning",
    category: "activity",
    patient: "Robert Johnson",
    message: "Movement detected during rest period",
    time: "45 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "medium",
  },
  {
    id: 4,
    type: "info",
    category: "location",
    patient: "Robert Johnson",
    message: "Entered kitchen area",
    time: "1 hour ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "low",
  },
  {
    id: 5,
    type: "alert",
    category: "device",
    patient: "Robert Johnson",
    message: "Temporarily lost Bluetooth connection",
    time: "2 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "medium",
  },
  {
    id: 6,
    type: "emergency",
    category: "boundary",
    patient: "Robert Johnson",
    message: "Entered orange zone - guidance activated",
    time: "3 hours ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "critical",
  },
  {
    id: 7,
    type: "health",
    category: "vitals",
    patient: "Robert Johnson",
    message: "Heart rate elevated (95 BPM)",
    time: "4 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "medium",
  },
  {
    id: 8,
    type: "alert",
    category: "fall",
    patient: "Robert Johnson",
    message: "Possible fall detected",
    time: "Yesterday",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "high",
  },
  {
    id: 9,
    type: "info",
    category: "medication",
    patient: "Robert Johnson",
    message: "Medication reminder: Donepezil",
    time: "Yesterday",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "medium",
  },
  {
    id: 10,
    type: "emergency",
    category: "sos",
    patient: "Robert Johnson",
    message: "SOS button pressed",
    time: "2 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
    priority: "critical",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getIconForType = (type: string, category: string) => {
    switch (type) {
      case "emergency":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "alert":
        return category === "boundary" ? (
          <Shield className="h-5 w-5 text-orange-500" />
        ) : category === "fall" ? (
          <Activity className="h-5 w-5 text-orange-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        )
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "health":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "info":
        return category === "location" ? (
          <MapPin className="h-5 w-5 text-blue-500" />
        ) : category === "device" ? (
          <Battery className="h-5 w-5 text-blue-500" />
        ) : category === "medication" ? (
          <Activity className="h-5 w-5 text-blue-500" />
        ) : (
          <Bell className="h-5 w-5 text-blue-500" />
        )
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return (
          <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
            Critical
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-800 border-orange-200">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Recent alerts and updates</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4 grid grid-cols-5">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="secondary" className="ml-2">
                {notifications.filter((n) => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              <Badge variant="secondary" className="ml-2">
                {notifications.filter((n) => n.type === "alert" || n.type === "emergency").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="health">
              Health
              <Badge variant="secondary" className="ml-2">
                {notifications.filter((n) => n.type === "health" || n.category === "medication").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="location">
              Location
              <Badge variant="secondary" className="ml-2">
                {notifications.filter((n) => n.category === "location" || n.category === "boundary").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 border rounded-lg ${notification.read ? "" : "bg-slate-50 dark:bg-slate-900/60"}`}
              >
                <div className="flex-shrink-0">{getIconForType(notification.type, notification.category)}</div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>{notification.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{notification.patient}</span>
                    {getPriorityBadge(notification.priority)}
                  </div>
                  <p className="mt-1">{notification.message}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>

                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => {
                      setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/60"
                >
                  <div className="flex-shrink-0">{getIconForType(notification.type, notification.category)}</div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{notification.patient}</span>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <p className="mt-1">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => {
                      setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}

            {notifications.filter((n) => !n.read).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-lg font-medium">All caught up!</h3>
                <p className="text-muted-foreground">You have no unread notifications.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {notifications
              .filter((n) => n.type === "alert" || n.type === "emergency")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${notification.read ? "" : "bg-slate-50 dark:bg-slate-900/60"}`}
                >
                  <div className="flex-shrink-0">{getIconForType(notification.type, notification.category)}</div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{notification.patient}</span>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <p className="mt-1">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                        )
                      }}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

            {notifications.filter((n) => n.type === "alert" || n.type === "emergency").length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-lg font-medium">No alerts</h3>
                <p className="text-muted-foreground">There are no active alerts at this time.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            {notifications
              .filter((n) => n.type === "health" || n.category === "medication")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${notification.read ? "" : "bg-slate-50 dark:bg-slate-900/60"}`}
                >
                  <div className="flex-shrink-0">{getIconForType(notification.type, notification.category)}</div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{notification.patient}</span>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <p className="mt-1">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                        )
                      }}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

            {notifications.filter((n) => n.type === "health" || n.category === "medication").length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Heart className="h-12 w-12 text-pink-500 mb-2" />
                <h3 className="text-lg font-medium">No health alerts</h3>
                <p className="text-muted-foreground">There are no health notifications at this time.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            {notifications
              .filter((n) => n.category === "location" || n.category === "boundary")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${notification.read ? "" : "bg-slate-50 dark:bg-slate-900/60"}`}
                >
                  <div className="flex-shrink-0">{getIconForType(notification.type, notification.category)}</div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{notification.patient}</span>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <p className="mt-1">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                        )
                      }}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

            {notifications.filter((n) => n.category === "location" || n.category === "boundary").length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin className="h-12 w-12 text-blue-500 mb-2" />
                <h3 className="text-lg font-medium">No location alerts</h3>
                <p className="text-muted-foreground">There are no location notifications at this time.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

