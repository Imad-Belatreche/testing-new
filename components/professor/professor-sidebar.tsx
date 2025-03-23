"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Calendar, LayoutDashboard, Settings, User } from "lucide-react"

export function ProfessorSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="hidden border-r bg-background md:block w-64 shrink-0">
      <ScrollArea className="h-full py-6 pr-6">
        <div className="pl-6">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Professor Portal</h2>
          <nav className="grid gap-2">
            <Button
              asChild
              variant={isActive("/professor/dashboard") ? "default" : "ghost"}
              className={isActive("/professor/dashboard") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/professor/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/professor/schedule") ? "default" : "ghost"}
              className={isActive("/professor/schedule") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/professor/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                My Schedule
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/professor/notifications") ? "default" : "ghost"}
              className={isActive("/professor/notifications") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/professor/notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Link>
            </Button>

            <h3 className="text-sm font-medium mt-4 mb-2">Account</h3>

            <Button
              asChild
              variant={isActive("/professor/profile") ? "default" : "ghost"}
              className={isActive("/professor/profile") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/professor/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/professor/settings") ? "default" : "ghost"}
              className={isActive("/professor/settings") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/professor/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </div>
      </ScrollArea>
    </aside>
  )
}

