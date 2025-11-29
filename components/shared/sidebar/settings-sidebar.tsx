"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const settingsNav = [
  { name: "Profile", href: "/profile" },
  { name: "Password", href: "/password" }
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-full space-y-1 md:w-48">
      {settingsNav.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
            pathname === item.href ? "bg-accent font-medium" : "text-muted-foreground",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
