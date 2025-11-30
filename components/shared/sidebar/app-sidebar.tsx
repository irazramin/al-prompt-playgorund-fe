import * as React from "react"
import {
  MessageSquare,
  Plus
} from "lucide-react"

import { NavHistory } from '@/components/shared/sidebar/sidebar-items/nav-history'
import { NavUser } from '@/components/shared/sidebar/sidebar-items/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from "@/components/ui/button"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  history: [
    {
      id: "1",
      name: "Previous Chat 1",
      url: "#",
    },
    {
      id: "2",
      name: "React Component Help",
      url: "#",
    },
    {
      id: "3",
      name: "Debug Python Script",
      url: "#",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-2 space-y-2">
        <TeamSwitcher teams={data.teams} />
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full justify-start gap-2 rounded-full pl-2" variant="ghost">
              <Link href="/chat">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white">
                  <Plus className="h-4 w-4" />
                </div>
              </Link>
              <span className="group-data-[collapsible=icon]:hidden font-medium">New chat</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavHistory />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
