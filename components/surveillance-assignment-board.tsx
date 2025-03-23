"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Clock, Filter, RefreshCw, Save } from "lucide-react"

export default function SurveillanceAssignmentBoard() {
  // Mock data for professors and their assignments
  const professors = [
    { id: 1, name: "Dr. Smith", department: "Computer Science", availability: "High", assignments: 2 },
    { id: 2, name: "Dr. Johnson", department: "Computer Science", availability: "Medium", assignments: 1 },
    { id: 3, name: "Dr. Williams", department: "Information Systems", availability: "Low", assignments: 3 },
    { id: 4, name: "Dr. Brown", department: "Computer Science", availability: "High", assignments: 0 },
    { id: 5, name: "Dr. Davis", department: "Information Systems", availability: "Medium", assignments: 2 },
    { id: 6, name: "Dr. Wilson", department: "Computer Science", availability: "High", assignments: 1 },
  ]

  // Mock data for exams
  const exams = [
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
      assistant: null,
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
    {
      id: 4,
      module: "Artificial Intelligence",
      program: "M1",
      date: "16/06/2025",
      time: "14:00-17:00",
      room: "A201",
      mainInvigilator: "Dr. Wilson",
      assistant: null,
    },
    {
      id: 5,
      module: "Data Structures",
      program: "L1",
      date: "17/06/2025",
      time: "09:00-11:00",
      room: "B102",
      mainInvigilator: null,
      assistant: null,
    },
  ]

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Surveillance Assignment Board</CardTitle>
            <CardDescription>Assign professors to exam surveillance duties</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Auto-Assign
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Save Assignments
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-[200px_repeat(5,1fr)] gap-2">
                  <div className="bg-muted p-2 font-medium text-sm">Professor</div>
                  <div className="bg-muted p-2 font-medium text-sm">15/06 (AM)</div>
                  <div className="bg-muted p-2 font-medium text-sm">15/06 (PM)</div>
                  <div className="bg-muted p-2 font-medium text-sm">16/06 (AM)</div>
                  <div className="bg-muted p-2 font-medium text-sm">16/06 (PM)</div>
                  <div className="bg-muted p-2 font-medium text-sm">17/06 (AM)</div>

                  {professors.map((professor) => (
                    <>
                      <div key={professor.id} className="border p-2 text-sm">
                        <div className="font-medium">{professor.name}</div>
                        <div className="text-xs text-muted-foreground">{professor.department}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <Badge
                            variant={
                              professor.availability === "High"
                                ? "outline"
                                : professor.availability === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {professor.availability === "High" ? (
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                            ) : professor.availability === "Medium" ? (
                              <Clock className="mr-1 h-3 w-3" />
                            ) : (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            )}
                            {professor.availability}
                          </Badge>
                        </div>
                      </div>

                      {/* Database Systems - 15/06 AM */}
                      <div
                        className={`border p-2 text-xs ${professor.name === "Dr. Smith" ? "bg-blue-100 border-blue-300" : professor.name === "Dr. Johnson" ? "bg-green-100 border-green-300" : ""}`}
                      >
                        {professor.name === "Dr. Smith" && (
                          <div className="p-1 rounded bg-blue-200 text-blue-800 mb-1">
                            <div className="font-medium">Database Systems (Main)</div>
                            <div>09:00-11:00 | Room A104</div>
                          </div>
                        )}
                        {professor.name === "Dr. Johnson" && (
                          <div className="p-1 rounded bg-green-200 text-green-800 mb-1">
                            <div className="font-medium">Database Systems (Assistant)</div>
                            <div>09:00-11:00 | Room A104</div>
                          </div>
                        )}
                      </div>

                      {/* Software Engineering - 15/06 PM */}
                      <div
                        className={`border p-2 text-xs ${professor.name === "Dr. Williams" ? "bg-blue-100 border-blue-300" : ""}`}
                      >
                        {professor.name === "Dr. Williams" && (
                          <div className="p-1 rounded bg-blue-200 text-blue-800 mb-1">
                            <div className="font-medium">Software Engineering (Main)</div>
                            <div>14:00-16:00 | Room B201</div>
                          </div>
                        )}
                      </div>

                      {/* Computer Networks - 16/06 AM */}
                      <div
                        className={`border p-2 text-xs ${professor.name === "Dr. Brown" ? "bg-blue-100 border-blue-300" : professor.name === "Dr. Davis" ? "bg-green-100 border-green-300" : ""}`}
                      >
                        {professor.name === "Dr. Brown" && (
                          <div className="p-1 rounded bg-blue-200 text-blue-800 mb-1">
                            <div className="font-medium">Computer Networks (Main)</div>
                            <div>10:00-12:00 | Room C105</div>
                          </div>
                        )}
                        {professor.name === "Dr. Davis" && (
                          <div className="p-1 rounded bg-green-200 text-green-800 mb-1">
                            <div className="font-medium">Computer Networks (Assistant)</div>
                            <div>10:00-12:00 | Room C105</div>
                          </div>
                        )}
                      </div>

                      {/* Artificial Intelligence - 16/06 PM */}
                      <div
                        className={`border p-2 text-xs ${professor.name === "Dr. Wilson" ? "bg-blue-100 border-blue-300" : ""}`}
                      >
                        {professor.name === "Dr. Wilson" && (
                          <div className="p-1 rounded bg-blue-200 text-blue-800 mb-1">
                            <div className="font-medium">Artificial Intelligence (Main)</div>
                            <div>14:00-17:00 | Room A201</div>
                          </div>
                        )}
                      </div>

                      {/* Data Structures - 17/06 AM */}
                      <div className="border p-2 text-xs">{/* Empty cell for Data Structures */}</div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                  <span className="text-xs">Main Invigilator</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-200"></div>
                  <span className="text-xs">Assistant Invigilator</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Drag and drop professors to assign them to exams</div>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="border rounded-md">
              <div className="grid grid-cols-7 bg-muted p-2 text-sm font-medium border-b">
                <div className="col-span-2">Exam</div>
                <div>Date & Time</div>
                <div>Room</div>
                <div>Main Invigilator</div>
                <div>Assistant</div>
                <div>Status</div>
              </div>

              <div className="divide-y">
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className={`grid grid-cols-7 p-2 text-sm items-center hover:bg-muted/50 ${!exam.mainInvigilator || !exam.assistant ? "bg-red-50" : ""}`}
                  >
                    <div className="col-span-2 font-medium">{exam.module}</div>
                    <div>
                      {exam.date} <br /> {exam.time}
                    </div>
                    <div>{exam.room}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${exam.mainInvigilator ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span>{exam.mainInvigilator || "Unassigned"}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${exam.assistant ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span>{exam.assistant || "Unassigned"}</span>
                      </div>
                    </div>
                    <div>
                      {!exam.mainInvigilator || !exam.assistant ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Incomplete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 border rounded-md bg-amber-50 border-amber-200">
          <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Conflicts Detected
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Dr. Williams is assigned to 3 exams in 2 days</p>
                <p className="text-muted-foreground">This exceeds the recommended maximum of 2 exams per professor</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Software Engineering (15/06) is missing an assistant invigilator</p>
                <p className="text-muted-foreground">All exams require both a main and assistant invigilator</p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

