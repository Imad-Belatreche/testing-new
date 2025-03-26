"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Building,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
  PlusCircle,
  School,
  Settings,
  Users,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="hidden border-r bg-background md:block w-64 shrink-0">
      <ScrollArea className="h-full py-6 pr-6">
        <div className="pl-6">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Admin Dashboard</h2>
          <nav className="grid gap-2">
            <Button
              asChild
              variant={isActive("/admin/dashboard") ? "default" : "ghost"}
              className={isActive("/admin/dashboard") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            <h3 className="text-sm font-medium mt-4 mb-2">Exam Management</h3>

            <Button
              asChild
              variant={isActive("/admin/exam-sessions") ? "default" : "ghost"}
              className={isActive("/admin/exam-sessions") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/exam-sessions">
                <Calendar className="mr-2 h-4 w-4" />
                Exam Sessions
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/exams/new") ? "default" : "ghost"}
              className={isActive("/admin/exams/new") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/exams/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Exam
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/surveillance") ? "default" : "ghost"}
              className={isActive("/admin/surveillance") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/surveillance">
                <Users className="mr-2 h-4 w-4" />
                Surveillance
              </Link>
            </Button>

            <h3 className="text-sm font-medium mt-4 mb-2">Academic Resources</h3>

            <Button
              asChild
              variant={isActive("/admin/departments") ? "default" : "ghost"}
              className={isActive("/admin/departments") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/departments">
                <Building className="mr-2 h-4 w-4" />
                Departments
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/formations") ? "default" : "ghost"}
              className={isActive("/admin/formations") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/formations">
                <School className="mr-2 h-4 w-4" />
                Formations
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/professors") ? "default" : "ghost"}
              className={isActive("/admin/professors") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/professors">
                <GraduationCap className="mr-2 h-4 w-4" />
                Professors
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/modules") ? "default" : "ghost"}
              className={isActive("/admin/modules") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/modules">
                <BookOpen className="mr-2 h-4 w-4" />
                Modules
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/teaching-assignments") ? "default" : "ghost"}
              className={isActive("/admin/teaching-assignments") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/teaching-assignments">
                <ListChecks className="mr-2 h-4 w-4" />
                Teaching Assignments
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/rooms") ? "default" : "ghost"}
              className={isActive("/admin/rooms") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/rooms">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Rooms
              </Link>
            </Button>

            <h3 className="text-sm font-medium mt-4 mb-2">Administration</h3>

            <Button
              asChild
              variant={isActive("/admin/users") ? "default" : "ghost"}
              className={isActive("/admin/users") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/admin/settings") ? "default" : "ghost"}
              className={isActive("/admin/settings") ? "bg-primary-usthb hover:bg-primary-usthb/90" : ""}
              size="sm"
            >
              <Link href="/admin/settings">
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

