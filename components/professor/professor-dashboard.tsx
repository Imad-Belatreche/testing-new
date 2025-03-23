"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronRight, Clock, Mail } from "lucide-react"
import { ProfessorSchedule } from "@/components/professor/professor-schedule"
import { ProfessorNotifications } from "@/components/professor/professor-notifications"

export function ProfessorDashboard() {
  const [currentMonth, setCurrentMonth] = useState("June 2025")

  // Mock data
  const stats = [
    {
      title: "Upcoming Exams",
      value: 3,
      description: "Next 14 days",
      icon: <Calendar className="h-6 w-6 text-primary-usthb" />,
      href: "/professor/schedule",
    },
    {
      title: "Surveillance Hours",
      value: 8,
      description: "This semester",
      icon: <Clock className="h-6 w-6 text-primary-usthb" />,
      href: "/professor/schedule",
    },
    {
      title: "Notifications",
      value: 2,
      description: "Unread messages",
      icon: <Mail className="h-6 w-6 text-primary-usthb" />,
      href: "/professor/notifications",
    },
  ]

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      module: "Database Systems",
      program: "L1",
      date: "15/06/2025",
      time: "09:00-11:00",
      room: "A104",
      role: "Main",
    },
    {
      id: 2,
      module: "Data Structures",
      program: "L1",
      date: "17/06/2025",
      time: "09:00-11:00",
      room: "B102",
      role: "Assistant",
    },
    {
      id: 3,
      module: "Programming Fundamentals",
      program: "L1",
      date: "20/06/2025",
      time: "14:00-16:00",
      room: "C103",
      role: "Main",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Professor Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">{stat.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={stat.href}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <ProfessorSchedule />
        </TabsContent>
        <TabsContent value="notifications">
          <ProfessorNotifications />
        </TabsContent>
      </Tabs>
    </div>
  )
}

