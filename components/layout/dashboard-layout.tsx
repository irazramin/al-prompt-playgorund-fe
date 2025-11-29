"use client"

import React from "react"
import { AppSidebar } from '@/components/shared/sidebar/app-sidebar'
import { Header } from '@/components/shared/header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  breadcrumbs?: {
    items: Array<{
      label: string
      href?: string
    }>
  }
}

export function DashboardLayout({ children, breadcrumbs }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-svh overflow-hidden">
        <Header breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

