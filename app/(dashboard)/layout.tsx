"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

function getBreadcrumbs(pathname: string) {
  if (pathname.startsWith("/settings")) {
    const parts = pathname.split("/").filter(Boolean)
    const items: Array<{ label: string; href?: string }> = [{ label: "Settings", href: "/settings" }]
    
    if (parts.length > 1) {
      const page = parts[1]
      const pageLabels: Record<string, string> = {
        profile: "Profile",
        password: "Password",
        "two-factor": "Two-Factor Auth",
        appearance: "Appearance",
      }
      items.push({ label: pageLabels[page] || page })
    }
    
    return { items }
  }
  
  if (pathname === "/dashboard") {
    return {
      items: [
        { label: "Building Your Application", href: "#" },
        { label: "Data Fetching" },
      ],
    }
  }
  
  return undefined
}

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  
  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      {children}
    </DashboardLayout>
  )
}

