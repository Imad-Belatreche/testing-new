"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  ListChecks,
  PlusCircle,
  School,
  Users,
} from "lucide-react"
import { ActiveUsers } from "@/components/admin/active-users"

export function AdminDashboard() {
  const [currentMonth, setCurrentMonth] = useState("June 2025")

  // Mock data
  const stats = [
    {
      title: "Professors",
      value: 42,
      description: "Total professors",
      icon: <GraduationCap className="h-6 w-6 text-primary-usthb" />,
      href: "/admin/professors",
    },
    {
      title: "Modules",
      value: 87,
      description: "Active modules",
      icon: <ListChecks className="h-6 w-6 text-primary-usthb" />,
      href: "/admin/modules",
    },
    {
      title: "Rooms",
      value: 24,
      description: "Available rooms",
      icon: <LayoutGrid className="h-6 w-6 text-primary-usthb" />,
      href: "/admin/rooms",
    },
    {
      title: "Programs",
      value: 6,
      description: "Academic programs",
      icon: <School className="h-6 w-6 text-primary-usthb" />,
      href: "/admin/programs",
    },
  ]

  const upcomingExams = [
    {
      id: 1,
      module: "Database Systems",
      program: "L1",
      date: "15/06/2025",
      time: "09:00-11:00",
      room: "A104",
      mainInvigilator: "Dr. Smith",
      assistant: "Dr. Johnson",
    },
    {
      id: 2,
      module: "Software Engineering",
      program: "M1",
      date: "15/06/2025",
      time: "14:00-16:00",
      room: "B201",
      mainInvigilator: "Dr. Williams",
      assistant: "Unassigned",
    },
    {
      id: 3,
      module: "Computer Networks",
      program: "L1",
      date: "16/06/2025",
      time: "10:00-12:00",
      room: "C105",
      mainInvigilator: "Dr. Brown",
      assistant: "Dr. Davis",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/exams/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Exam
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Next scheduled exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4 bg-blue-50 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exam.module}</h4>
                      <p className="text-sm text-gray-600">
                        {exam.date} • {exam.time}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${exam.program === "L1" ? "bg-primary-usthb" : "bg-gray-700"} text-white`}
                    >
                      {exam.program}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm flex justify-between">
                    <div className="text-right text-sm">{exam.room}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Main: {exam.mainInvigilator}
                    </Badge>
                    <Badge
                      variant={exam.assistant === "Unassigned" ? "destructive" : "secondary"}
                      className={
                        exam.assistant === "Unassigned"
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }
                    >
                      Assistant: {exam.assistant}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <Link href="/admin/exam-sessions">View All Exams</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently online professors</CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveUsers />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exam Calendar</CardTitle>
            <CardDescription>Overview of scheduled exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-medium">{currentMonth}</h3>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-1">
                  {day}
                </div>
              ))}

              {Array.from({ length: 35 }).map((_, index) => {
                const day = index - 5 + 1 // Adjust for starting day of month
                const hasExam = upcomingExams.some((a) => {
                  const examDay = Number.parseInt(a.date.split("/")[0])
                  return examDay === day
                })

                return (
                  <Button
                    key={index}
                    variant={hasExam ? "default" : "outline"}
                    className={`h-10 ${hasExam ? "bg-primary-usthb" : ""} ${day <= 0 || day > 30 ? "invisible" : ""}`}
                  >
                    {day > 0 && day <= 30 ? day : ""}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>System overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-usthb" />
                  <span>Total Users</span>
                </div>
                <span className="font-medium">58</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-usthb" />
                  <span>Upcoming Exams</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary-usthb" />
                  <span>Unassigned Invigilators</span>
                </div>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-primary-usthb" />
                  <span>Room Utilization</span>
                </div>
                <span className="font-medium">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

