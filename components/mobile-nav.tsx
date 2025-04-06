"use client"

import { Home, Activity, MapPin, Bell, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Activity",
    href: "/activity",
    icon: Activity,
  },
  {
    name: "Location",
    href: "/location",
    icon: MapPin,
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 purple-gradient rounded-t-3xl flex items-center justify-around px-2 z-50 bottom-nav-shadow">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full rounded-md transition-colors",
              isActive ? "text-white nav-item-active" : "text-white/70 hover:text-white",
            )}
          >
            <item.icon className={cn("h-5 w-5 mb-1", isActive && "text-white")} />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

