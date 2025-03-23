"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Mail } from "lucide-react"
import { ProfessorSchedule } from "@/components/professor-schedule"
import { ProfessorNotifications } from "@/components/professor-notifications"

export function ProfessorPortal() {
  // Mock data for professor
  const professor = {
    name: "Dr. Smith",
    department: "Computer Science",
    upcomingExams: 3,
    totalHours: 8,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Upcoming Exams</h3>
                <p className="text-sm text-muted-foreground">Surveillance duties</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{professor.upcomingExams}</span>
                  <p className="text-sm text-muted-foreground">Next 14 days</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Surveillance Hours</h3>
                <p className="text-sm text-muted-foreground">Total assigned</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{professor.totalHours}</span>
                  <p className="text-sm text-muted-foreground">This semester</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-4 bg-blue-100 p-2 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Updates & alerts</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">2</span>
                  <p className="text-sm text-muted-foreground">Unread messages</p>
                </div>
              </div>
              <Badge variant="destructive">New</Badge>
            </div>
          </CardContent>
        </Card>
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

