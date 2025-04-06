"use client"

import type React from "react"
import { MobileNav } from "@/components/mobile-nav"
import { StatusBar } from "@/components/status-bar"
import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  // Don't apply this layout to the welcome page
  if (pathname === "/welcome") {
    return children
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
      <StatusBar />
      <main className="flex-1 overflow-y-auto pb-16 page-transition">{children}</main>
      <MobileNav />
    </div>
  )
}

