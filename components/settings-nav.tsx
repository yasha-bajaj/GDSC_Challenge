"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Shield, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function SettingsNav() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    {
      name: "Patient Profile",
      href: "/settings/patient-profile",
      icon: User,
    },
    {
      name: "Safe Zone Settings",
      href: "/settings/safe-zones",
      icon: Shield,
    },
    {
      name: "Notification Settings",
      href: "/settings/notifications",
      icon: Bell,
    },
  ]

  return (
    <div className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}

      <button
        onClick={signOut}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-red-500 hover:bg-red-500/10"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </div>
  )
}

