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
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export function ManageExamSessions() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")

  // Mock exam sessions data
  const examSessions = [
    {
      id: "1",
      name: "Spring 2025 - Midterm Exams",
      startDate: "15/03/2025",
      endDate: "30/03/2025",
      program: "L1",
      status: "Upcoming",
      exams: 12,
      modules: 8,
    },
    {
      id: "2",
      name: "Spring 2025 - Final Exams",
      startDate: "15/06/2025",
      endDate: "30/06/2025",
      program: "L1",
      status: "Upcoming",
      exams: 24,
      modules: 16,
    },
    {
      id: "3",
      name: "Spring 2025 - Master's Midterm",
      startDate: "20/03/2025",
      endDate: "28/03/2025",
      program: "M1",
      status: "Upcoming",
      exams: 8,
      modules: 6,
    },
    {
      id: "4",
      name: "Spring 2025 - Master's Final",
      startDate: "20/06/2025",
      endDate: "28/06/2025",
      program: "M1",
      status: "Upcoming",
      exams: 14,
      modules: 10,
    },
    {
      id: "5",
      name: "Fall 2024 - Final Exams",
      startDate: "15/12/2024",
      endDate: "30/12/2024",
      program: "L1",
      status: "Completed",
      exams: 22,
      modules: 15,
    },
  ]

  // Filter exam sessions based on search query and program
  const filteredExamSessions = examSessions.filter((session) => {
    const matchesSearch =
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.startDate.includes(searchQuery) ||
      session.endDate.includes(searchQuery)

    const matchesProgram = selectedProgram === "all" || session.program === selectedProgram

    return matchesSearch && matchesProgram
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Exam Sessions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Exam Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Exam Session</DialogTitle>
              <DialogDescription>Create a new exam session for a specific academic program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="sessionName">Session Name</Label>
                <Input id="sessionName" placeholder="Spring 2025 - Midterm Exams" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="program">Academic Program</Label>
                <Select>
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L1">L1 - Bachelor of Computer Science</SelectItem>
                    <SelectItem value="L2">L2 - Bachelor of Information Systems</SelectItem>
                    <SelectItem value="M1">M1 - Master of Computer Science</SelectItem>
                    <SelectItem value="M2">M2 - Master of Software Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modules">Associated Modules</Label>
                <Select>
                  <SelectTrigger id="modules">
                    <SelectValue placeholder="Select modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs101">CS101 - Introduction to Computer Science</SelectItem>
                    <SelectItem value="cs201">CS201 - Data Structures and Algorithms</SelectItem>
                    <SelectItem value="se301">SE301 - Software Engineering</SelectItem>
                    <SelectItem value="db301">DB301 - Database Systems</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">You can select multiple modules</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Sessions</CardTitle>
          <CardDescription>Manage exam sessions for all academic programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or date..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="L1">L1 - Bachelor</SelectItem>
                  <SelectItem value="M1">M1 - Master</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Name</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Exams</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExamSessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No exam sessions found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExamSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.name}</TableCell>
                      <TableCell>
                        {session.startDate} - {session.endDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${session.program === "L1" ? "bg-primary-usthb" : "bg-gray-700"} text-white`}
                        >
                          {session.program}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {session.exams} exams ({session.modules} modules)
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            session.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }
                        >
                          {session.status}
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
                              <Eye className="mr-2 h-4 w-4" />
                              View Exams
                            </DropdownMenuItem>
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
        </CardContent>
      </Card>
    </div>
  )
}

