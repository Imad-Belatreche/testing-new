"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export function ManageSurveillance() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExam, setSelectedExam] = useState("all")
  const [selectedProfessor, setSelectedProfessor] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")

  // Mock surveillance data
  const surveillances = [
    {
      id: 1,
      exam: "CS101 - Introduction to Computer Science",
      professor: "Dr. John Smith",
      date: "15/06/2025",
      startTime: "09:00",
      endTime: "11:00",
      role: "Main",
      room: "A104",
      status: "Confirmed",
    },
    {
      id: 2,
      exam: "CS101 - Introduction to Computer Science",
      professor: "Dr. Sarah Williams",
      date: "15/06/2025",
      startTime: "09:00",
      endTime: "11:00",
      role: "Assistant",
      room: "A104",
      status: "Confirmed",
    },
    {
      id: 3,
      exam: "CS201 - Data Structures and Algorithms",
      professor: "Dr. Michael Johnson",
      date: "16/06/2025",
      startTime: "14:00",
      endTime: "16:00",
      role: "Main",
      room: "B201",
      status: "Pending",
    },
    {
      id: 4,
      exam: "CS201 - Data Structures and Algorithms",
      professor: "Dr. Emily Brown",
      date: "16/06/2025",
      startTime: "14:00",
      endTime: "16:00",
      role: "Assistant",
      room: "B201",
      status: "Declined",
    },
    {
      id: 5,
      exam: "SE301 - Software Engineering",
      professor: "Dr. David Wilson",
      date: "17/06/2025",
      startTime: "10:00",
      endTime: "12:00",
      role: "Main",
      room: "C105",
      status: "Confirmed",
    },
    {
      id: 6,
      exam: "SE301 - Software Engineering",
      professor: "Dr. John Smith",
      date: "17/06/2025",
      startTime: "10:00",
      endTime: "12:00",
      role: "Assistant",
      room: "C105",
      status: "Confirmed",
    },
  ]

  // Filter surveillances based on search query and filters
  const filteredSurveillances = surveillances.filter((surveillance) => {
    const matchesSearch =
      surveillance.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surveillance.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surveillance.room.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesExam = selectedExam === "all" || surveillance.exam === selectedExam
    const matchesProfessor = selectedProfessor === "all" || surveillance.professor === selectedProfessor
    const matchesRole = selectedRole === "all" || surveillance.role === selectedRole

    return matchesSearch && matchesExam && matchesProfessor && matchesRole
  })

  // Get unique values for filter dropdowns
  const exams = ["all", ...new Set(surveillances.map((s) => s.exam))]
  const professors = ["all", ...new Set(surveillances.map((s) => s.professor))]
  const roles = ["all", ...new Set(surveillances.map((s) => s.role))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Surveillance Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Surveillance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Surveillance</DialogTitle>
              <DialogDescription>Assign a professor to an exam surveillance duty.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="exam">Exam</Label>
                <Select>
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams
                      .filter((e) => e !== "all")
                      .map((exam) => (
                        <SelectItem key={exam} value={exam}>
                          {exam}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="professor">Professor</Label>
                <Select>
                  <SelectTrigger id="professor">
                    <SelectValue placeholder="Select professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors
                      .filter((p) => p !== "all")
                      .map((professor) => (
                        <SelectItem key={professor} value={professor}>
                          {professor}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="date" type="date" className="pl-8" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Main">Main</SelectItem>
                      <SelectItem value="Assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="startTime" type="time" className="pl-8" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="endTime" type="time" className="pl-8" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Surveillance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Surveillance Assignments</CardTitle>
          <CardDescription>Manage professor surveillance duties for exams</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline">Auto-Assign</Button>
                <Button variant="outline">Detect Conflicts</Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search surveillances..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Professors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Professors</SelectItem>
                    {professors
                      .filter((p) => p !== "all")
                      .map((professor) => (
                        <SelectItem key={professor} value={professor}>
                          {professor}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles
                      .filter((r) => r !== "all")
                      .map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <TabsContent value="list" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSurveillances.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No surveillances found matching your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSurveillances.map((surveillance) => (
                        <TableRow key={surveillance.id}>
                          <TableCell className="font-medium">{surveillance.exam}</TableCell>
                          <TableCell>{surveillance.professor}</TableCell>
                          <TableCell>
                            {surveillance.date} • {surveillance.startTime}-{surveillance.endTime}
                          </TableCell>
                          <TableCell>{surveillance.room}</TableCell>
                          <TableCell>
                            <Badge
                              variant={surveillance.role === "Main" ? "default" : "secondary"}
                              className={surveillance.role === "Main" ? "bg-primary-usthb" : ""}
                            >
                              {surveillance.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                surveillance.status === "Confirmed"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : surveillance.status === "Pending"
                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {surveillance.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <div className="bg-muted/20 rounded-md border p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                  <p className="text-muted-foreground">
                    Calendar view will display surveillance assignments in a calendar format.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

