"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Clock, Heart, Activity, Battery, Shield, AlertCircle, Navigation } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlertsPage() {
  // Sample alerts data with useState to make it mutable
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "boundary",
      message: "Entered yellow zone - left safe area",
      time: "45 minutes ago",
      icon: Shield,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/60",
      zone: "yellow",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "boundary",
      message: "Entered orange zone - guidance activated",
      time: "2 hours ago",
      icon: Navigation,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/60",
      zone: "orange",
      read: true,
      priority: "critical",
    },
    {
      id: 3,
      type: "system",
      message: "Low battery on wearable device (25%)",
      time: "3 hours ago",
      icon: Battery,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/60",
      zone: null,
      read: true,
      priority: "medium",
    },
    // Remove heart rate alert
    {
      id: 5,
      type: "fall",
      message: "Possible fall detected",
      time: "Yesterday",
      icon: Activity,
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/60",
      zone: null,
      read: false,
      priority: "high",
    },
    {
      id: 6,
      type: "medication",
      message: "Missed medication: Donepezil",
      time: "Yesterday",
      icon: Activity,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/60",
      zone: null,
      read: true,
      priority: "medium",
    },
    {
      id: 7,
      type: "sos",
      message: "SOS button pressed",
      time: "2 days ago",
      icon: AlertCircle,
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/60",
      zone: null,
      read: true,
      priority: "critical",
    },
  ])

  // Function to mark an alert as read
  const markAsRead = (alertId: number) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const unreadAlerts = alerts.filter((alert) => !alert.read)
  const criticalAlerts = alerts.filter((alert) => alert.priority === "critical")
  const boundaryAlerts = alerts.filter((alert) => alert.type === "boundary")
  const healthAlerts = alerts.filter(
    (alert) => alert.type === "health" || alert.type === "fall" || alert.type === "medication",
  )

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="ml-auto bg-red-500 text-white rounded-full">Critical</Badge>
      case "high":
        return <Badge className="ml-auto bg-orange-500 text-white rounded-full">High</Badge>
      case "medium":
        return <Badge className="ml-auto bg-yellow-500 text-white rounded-full">Medium</Badge>
      default:
        return <Badge className="ml-auto bg-blue-500 text-white rounded-full">Low</Badge>
    }
  }

  // Modify the alert rendering to include onClick handler for unread alerts
  const renderAlert = (alert) => (
    <div
      key={alert.id}
      className={cn(
        "flex gap-3 p-3 rounded-2xl border",
        alert.read
          ? "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
          : "bg-primary/5 dark:bg-primary/10 border-primary/10 dark:border-primary/20",
      )}
      onClick={() => !alert.read && markAsRead(alert.id)}
    >
      <div
        className={cn(
          "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
          alert.zone === "green"
            ? "bg-green-100 dark:bg-green-900/30"
            : alert.zone === "yellow"
              ? "bg-yellow-100 dark:bg-yellow-900/30"
              : alert.zone === "orange"
                ? "bg-orange-100 dark:bg-orange-900/30"
                : alert.zone === "red"
                  ? "bg-red-100 dark:bg-red-900/30"
                  : alert.iconBg,
        )}
      >
        <alert.icon
          className={cn(
            "h-5 w-5",
            alert.zone === "green"
              ? "text-green-600 dark:text-green-400"
              : alert.zone === "yellow"
                ? "text-yellow-600 dark:text-yellow-400"
                : alert.zone === "orange"
                  ? "text-orange-600 dark:text-orange-400"
                  : alert.zone === "red"
                    ? "text-red-600 dark:text-red-400"
                    : alert.iconColor,
          )}
        />
      </div>

      <div className="flex-1">
        <p className="font-medium">{alert.message}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{alert.time}</span>
        </div>
      </div>

      {getPriorityBadge(alert.priority)}

      {!alert.read && <div className="flex-shrink-0 h-2 w-2 rounded-full bg-primary self-start mt-2"></div>}
    </div>
  )

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 purple-gradient sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="text-white">
          <h1 className="text-lg font-semibold">Alerts</h1>
          <p className="text-xs text-white/80">Robert Johnson</p>
        </div>
        {unreadAlerts.length > 0 && (
          <Badge className="ml-auto bg-red-500 text-white rounded-full">{unreadAlerts.length} New</Badge>
        )}
      </div>

      {/* Alert Summary Cards */}
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800/30 rounded-2xl">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm flex items-center gap-1 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">{criticalAlerts.length}</div>
            <p className="text-xs text-red-600/70 dark:text-red-400/70">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800/30 rounded-2xl">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm flex items-center gap-1 text-orange-700 dark:text-orange-400">
              <Shield className="h-4 w-4" />
              Boundary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{boundaryAlerts.length}</div>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70">Zone boundary alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <div className="flex-1 px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-3 rounded-full bg-secondary p-1">
            <TabsTrigger value="all" className="rounded-full">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-full">
              Unread
              {unreadAlerts.length > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                  {unreadAlerts.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="boundary" className="rounded-full">
              Boundary
            </TabsTrigger>
            <TabsTrigger value="health" className="rounded-full">
              Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 space-y-3">
            {alerts.map(renderAlert)}
          </TabsContent>

          <TabsContent value="unread" className="mt-0 space-y-3">
            {unreadAlerts.length > 0 ? (
              unreadAlerts.map(renderAlert)
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No unread alerts</h3>
                <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="boundary" className="mt-0 space-y-3">
            {boundaryAlerts.length > 0 ? (
              boundaryAlerts.map(renderAlert)
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No boundary alerts</h3>
                <p className="text-sm text-muted-foreground mt-1">Patient is within safe zones</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="health" className="mt-0 space-y-3">
            {healthAlerts.length > 0 ? (
              healthAlerts.map(renderAlert)
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No health alerts</h3>
                <p className="text-sm text-muted-foreground mt-1">Patient's health status is normal</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

