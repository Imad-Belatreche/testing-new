"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, FileText, FolderPlus, LayoutGrid, TimerIcon, Users } from "lucide-react"
import { ExamCalendar } from "@/components/exam-calendar"
import { ExamSessionPlanner } from "@/components/exam-session-planner"
import { SurveillanceAssignments } from "@/components/surveillance-assignments"
import { ReportGenerator } from "@/components/report-generator"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Professors</h3>
                <p className="text-sm text-muted-foreground">Manage professor profiles</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">42</span>
                  <p className="text-sm text-muted-foreground">Total professors</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <LayoutGrid className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Modules</h3>
                <p className="text-sm text-muted-foreground">Academic modules</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">87</span>
                  <p className="text-sm text-muted-foreground">Active modules</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Upcoming Exams</h3>
                <p className="text-sm text-muted-foreground">Next 7 days</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">12</span>
                  <p className="text-sm text-muted-foreground">Scheduled exams</p>
                </div>
              </div>
              <Badge variant="destructive" className="ml-auto">
                3 Unassigned
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="#">
                <FileText className="mr-2 h-4 w-4" />
                Create Exam Session
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="#">
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Academic Program
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="#">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Manage Rooms
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="#">
                <TimerIcon className="mr-2 h-4 w-4" />
                Set Exam Periods
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="#">
                <FileText className="mr-2 h-4 w-4" />
                Import Data
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Exam Calendar</CardTitle>
            <CardDescription>Overview of scheduled exams</CardDescription>
          </CardHeader>
          <CardContent>
            <ExamCalendar />
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
          <SurveillanceAssignments />
        </TabsContent>
        <TabsContent value="reports">
          <ReportGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

