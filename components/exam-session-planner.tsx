"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Filter, Plus, Search } from "lucide-react"

export function ExamSessionPlanner() {
  // Mock exam data
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
    {
      id: 4,
      module: "Artificial Intelligence",
      program: "M1",
      date: "16/06/2025",
      time: "14:00-17:00",
      room: "A201",
      mainInvigilator: "Dr. Wilson",
      assistant: "Unassigned",
    },
    {
      id: 5,
      module: "Data Structures",
      program: "L1",
      date: "17/06/2025",
      time: "09:00-11:00",
      room: "B102",
      mainInvigilator: "Unassigned",
      assistant: "Unassigned",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Exam Session Planner</CardTitle>
          <p className="text-sm text-muted-foreground">Schedule and manage exam sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Exam
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Search Exams</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by module, professor, room..." className="pl-8" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Program</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="l1">L1 - Bachelor</SelectItem>
                <SelectItem value="m1">M1 - Master</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick a date
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
            <div>Module</div>
            <div>Program</div>
            <div>Date</div>
            <div>Time</div>
            <div>Room</div>
            <div>Main Invigilator</div>
            <div>Assistant</div>
          </div>
          {exams.map((exam) => (
            <div key={exam.id} className="grid grid-cols-7 p-3 text-sm border-t items-center">
              <div className="font-medium">{exam.module}</div>
              <div>
                <Badge variant="outline" className={`${exam.program === "L1" ? "bg-black" : "bg-gray-700"} text-white`}>
                  {exam.program}
                </Badge>
              </div>
              <div>{exam.date}</div>
              <div>{exam.time}</div>
              <div>{exam.room}</div>
              <div>
                <Select defaultValue={exam.mainInvigilator !== "Unassigned" ? exam.mainInvigilator : ""}>
                  <SelectTrigger className={exam.mainInvigilator === "Unassigned" ? "text-red-500" : ""}>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                    <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                    <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                    <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue={exam.assistant !== "Unassigned" ? exam.assistant : ""}>
                  <SelectTrigger className={exam.assistant === "Unassigned" ? "text-red-500" : ""}>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="Dr. Davis">Dr. Davis</SelectItem>
                    <SelectItem value="Dr. Miller">Dr. Miller</SelectItem>
                    <SelectItem value="Dr. Taylor">Dr. Taylor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>Showing 5 of 24 exam sessions</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

