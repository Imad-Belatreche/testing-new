"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Download, Filter } from "lucide-react"

export function ProfessorSchedule() {
  // Mock data for professor schedule
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Surveillance Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">Your assigned exam duties</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                <div>Module</div>
                <div>Program</div>
                <div>Date</div>
                <div>Time</div>
                <div>Room</div>
                <div>Role</div>
              </div>

              {assignments.map((assignment) => (
                <div key={assignment.id} className="grid grid-cols-6 p-3 text-sm border-t items-center">
                  <div className="font-medium">{assignment.module}</div>
                  <div>
                    <Badge
                      variant="outline"
                      className={`${assignment.program === "L1" ? "bg-black" : "bg-gray-700"} text-white`}
                    >
                      {assignment.program}
                    </Badge>
                  </div>
                  <div>{assignment.date}</div>
                  <div>{assignment.time}</div>
                  <div>{assignment.room}</div>
                  <div>
                    <Badge variant={assignment.role === "Main" ? "default" : "secondary"}>{assignment.role}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-medium">June 2025</h3>
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
                const hasExam = assignments.some((a) => {
                  const examDay = Number.parseInt(a.date.split("/")[0])
                  return examDay === day
                })

                return (
                  <Button
                    key={index}
                    variant={hasExam ? "default" : "outline"}
                    className={`h-10 ${hasExam ? "bg-blue-600" : ""} ${day <= 0 || day > 30 ? "invisible" : ""}`}
                  >
                    {day > 0 && day <= 30 ? day : ""}
                  </Button>
                )
              })}
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-medium">Upcoming Exams</h3>

              {assignments.map((assignment) => (
                <Card key={assignment.id} className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assignment.module}</h4>
                        <p className="text-sm text-muted-foreground">
                          {assignment.date} • {assignment.time} • {assignment.room}
                        </p>
                      </div>
                      <Badge variant={assignment.role === "Main" ? "default" : "secondary"}>{assignment.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

