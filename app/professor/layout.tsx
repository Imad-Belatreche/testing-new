import type React from "react"
import { ProfessorHeader } from "@/components/professor/professor-header"
import { ProfessorSidebar } from "@/components/professor/professor-sidebar"

export default function ProfessorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfessorHeader />
      <div className="flex flex-1">
        <ProfessorSidebar />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

