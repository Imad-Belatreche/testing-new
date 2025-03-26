"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, User } from "lucide-react"

type UserRole = "admin" | "professor" | "both"
type ActiveRole = "admin" | "professor"

interface RoleSwitcherProps {
  userRole: UserRole
  activeRole: ActiveRole
  onRoleChange: (role: ActiveRole) => void
}

export function RoleSwitcher({ userRole, activeRole, onRoleChange }: RoleSwitcherProps) {
  const router = useRouter()

  // Only show the role switcher for users with the "both" role
  if (userRole !== "both") return null

  const handleRoleChange = (role: ActiveRole) => {
    onRoleChange(role)

    // Redirect to the appropriate dashboard
    if (role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/professor/dashboard")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {activeRole === "admin" ? (
            <>
              <Shield className="h-4 w-4" />
              <span>Admin View</span>
            </>
          ) : (
            <>
              <User className="h-4 w-4" />
              <span>Professor View</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleRoleChange("admin")}
          className={activeRole === "admin" ? "bg-muted" : ""}
        >
          <Shield className="mr-2 h-4 w-4" />
          <span>Switch to Admin View</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange("professor")}
          className={activeRole === "professor" ? "bg-muted" : ""}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Switch to Professor View</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

