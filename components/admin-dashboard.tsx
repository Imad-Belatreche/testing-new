"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  FileSpreadsheet,
  FilePlus,
  Users,
  BookOpen,
  School,
  Clock,
  Building2,
  AlertTriangle,
} from "lucide-react"
import ExamSessionPlanner from "./exam-session-planner"
import SurveillanceAssignmentBoard from "./surveillance-assignment-board"
import ReportGenerator from "./report-generator"

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Professors
            </CardTitle>
            <CardDescription>Manage professor profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Total professors</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Modules
            </CardTitle>
            <CardDescription>Academic modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-muted-foreground">Active modules</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Scheduled exams</p>
              </div>
              <Badge variant="destructive" className="flex gap-1 items-center">
                <AlertTriangle className="h-3 w-3" />3 Unassigned
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <FilePlus className="mr-2 h-4 w-4" />
              Create Exam Session
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <School className="mr-2 h-4 w-4" />
              Add Academic Program
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Manage Rooms
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Set Exam Periods
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Exam Calendar</CardTitle>
            <CardDescription>Overview of scheduled exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="flex-1">
                <h3 className="font-medium mb-2">Exams on {date?.toLocaleDateString()}</h3>
                <div className="space-y-2">
                  <div className="p-2 border rounded-md bg-blue-50 border-blue-200">
                    <div className="flex justify-between">
                      <p className="font-medium">Database Systems</p>
                      <Badge>L1</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between mt-1">
                      <span>09:00 - 11:00</span>
                      <span>Room A104</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-blue-700 bg-blue-50">
                        Main: Dr. Smith
                      </Badge>
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        Assistant: Dr. Johnson
                      </Badge>
                    </div>
                  </div>

                  <div className="p-2 border rounded-md bg-amber-50 border-amber-200">
                    <div className="flex justify-between">
                      <p className="font-medium">Software Engineering</p>
                      <Badge>M1</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between mt-1">
                      <span>14:00 - 16:00</span>
                      <span>Room B201</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-blue-700 bg-blue-50">
                        Main: Dr. Williams
                      </Badge>
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                        Assistant: Unassigned
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planner">Exam Session Planner</TabsTrigger>
          <TabsTrigger value="assignments">Surveillance Assignments</TabsTrigger>
          <TabsTrigger value="reports">Report Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="planner">
          <ExamSessionPlanner />
        </TabsContent>
        <TabsContent value="assignments">
          <SurveillanceAssignmentBoard />
        </TabsContent>
        <TabsContent value="reports">
          <ReportGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

