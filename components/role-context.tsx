"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "admin" | "professor" | "both"
type ActiveRole = "admin" | "professor"

interface RoleContextType {
  userRole: UserRole
  activeRole: ActiveRole
  setActiveRole: (role: ActiveRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children, initialRole = "admin" }: { children: ReactNode; initialRole?: ActiveRole }) {
  // In a real app, you would fetch the user's role from an API or session
  const [userRole, setUserRole] = useState<UserRole>("both")
  const [activeRole, setActiveRole] = useState<ActiveRole>(initialRole)

  // Store the active role in localStorage to persist across page refreshes
  useEffect(() => {
    const storedRole = localStorage.getItem("activeRole") as ActiveRole | null
    if (storedRole) {
      setActiveRole(storedRole)
    }
  }, [])

  const handleSetActiveRole = (role: ActiveRole) => {
    setActiveRole(role)
    localStorage.setItem("activeRole", role)
  }

  return (
    <RoleContext.Provider value={{ userRole, activeRole, setActiveRole: handleSetActiveRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

