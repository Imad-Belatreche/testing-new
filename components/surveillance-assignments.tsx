"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"

export function SurveillanceAssignments() {
  // Mock professors data
  const professors = [
    {
      id: 1,
      name: "Dr. Smith",
      department: "Computer Science",
      assignments: [
        { id: 1, role: "Main", module: "Database Systems", date: "15/06/2025", time: "09:00-11:00", room: "A104" },
      ],
      availability: "Available",
      conflicts: false,
    },
    {
      id: 2,
      name: "Dr. Williams",
      department: "Software Engineering",
      assignments: [
        { id: 2, role: "Main", module: "Software Engineering", date: "15/06/2025", time: "14:00-16:00", room: "B201" },
      ],
      availability: "Available",
      conflicts: false,
    },
    {
      id: 3,
      name: "Dr. Johnson",
      department: "Computer Science",
      assignments: [
        { id: 1, role: "Assistant", module: "Database Systems", date: "15/06/2025", time: "09:00-11:00", room: "A104" },
      ],
      availability: "Limited",
      conflicts: false,
    },
    {
      id: 4,
      name: "Dr. Brown",
      department: "Networks",
      assignments: [
        { id: 3, role: "Main", module: "Computer Networks", date: "16/06/2025", time: "10:00-12:00", room: "C105" },
      ],
      availability: "Available",
      conflicts: false,
    },
    {
      id: 5,
      name: "Dr. Davis",
      department: "Networks",
      assignments: [
        {
          id: 3,
          role: "Assistant",
          module: "Computer Networks",
          date: "16/06/2025",
          time: "10:00-12:00",
          room: "C105",
        },
      ],
      availability: "Limited",
      conflicts: false,
    },
    {
      id: 6,
      name: "Dr. Wilson",
      department: "Artificial Intelligence",
      assignments: [
        {
          id: 4,
          role: "Main",
          module: "Artificial Intelligence",
          date: "16/06/2025",
          time: "14:00-17:00",
          room: "A201",
        },
        { id: 5, role: "Main", module: "Machine Learning", date: "16/06/2025", time: "14:00-16:00", room: "B102" },
      ],
      availability: "Unavailable",
      conflicts: true,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Surveillance Assignments</CardTitle>
          <p className="text-sm text-muted-foreground">Manage professor surveillance duties</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">Auto-Assign</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search professors..." className="pl-8" />
            </div>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                <div>Professor</div>
                <div>Department</div>
                <div>Assignments</div>
                <div>Availability</div>
                <div colSpan={3}>Actions</div>
              </div>

              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className={`grid grid-cols-7 p-3 text-sm border-t items-center ${professor.conflicts ? "bg-red-50" : ""}`}
                >
                  <div className="font-medium">{professor.name}</div>
                  <div>{professor.department}</div>
                  <div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {professor.assignments.length} {professor.assignments.length === 1 ? "exam" : "exams"}
                    </Badge>
                  </div>
                  <div>
                    <Badge
                      variant={
                        professor.availability === "Available"
                          ? "outline"
                          : professor.availability === "Limited"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        professor.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : professor.availability === "Limited"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {professor.availability}
                    </Badge>
                  </div>
                  <div className="col-span-3 flex gap-2">
                    <Button variant="outline" size="sm">
                      View Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Assign
                    </Button>
                    {professor.conflicts && <Badge variant="destructive">Scheduling Conflict</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {professors.map((professor) => (
                <Card key={professor.id} className={professor.conflicts ? "border-red-300" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{professor.name}</h3>
                        <p className="text-sm text-muted-foreground">{professor.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            professor.availability === "Available"
                              ? "outline"
                              : professor.availability === "Limited"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            professor.availability === "Available"
                              ? "bg-green-100 text-green-800"
                              : professor.availability === "Limited"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {professor.availability}
                        </Badge>
                        {professor.conflicts && <Badge variant="destructive">Scheduling Conflict</Badge>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Assigned Exams:</h4>
                      {professor.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div>
                            <span className="font-medium">{assignment.module}</span>
                            <div className="text-xs text-muted-foreground">
                              {assignment.date} • {assignment.time} • {assignment.room}
                            </div>
                          </div>
                          <Badge variant={assignment.role === "Main" ? "default" : "secondary"} className="ml-auto">
                            {assignment.role}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">
                        View Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Assign
                      </Button>
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

