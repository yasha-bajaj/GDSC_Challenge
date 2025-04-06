"use client"

import { ArrowLeft, User, Bell, Shield, Moon, LogOut, ChevronRight, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { signOut } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

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
          <h1 className="text-lg font-semibold">Settings</h1>
          <p className="text-xs text-white/80">App preferences</p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-4">
        {/* Profile Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src="/caretaker.jpg" />
              <AvatarFallback className="bg-primary/20">SJ</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Sarah Johnson</h2>
              <p className="text-sm text-muted-foreground">Caregiver</p>
              <Button variant="link" className="h-auto p-0 text-primary text-sm">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Patient</h3>
            <div className="space-y-3">
              <Link href="/settings/patient-profile">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 card-hover-effect">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>Patient Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/settings/safe-zones">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 card-hover-effect">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span>Safe Zone Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span>Push Notifications</span>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span>Emergency Alerts</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Appearance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <span>Dark Mode</span>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggleDarkMode} />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="destructive" className="w-full gap-2 rounded-2xl py-6" onClick={signOut}>
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

