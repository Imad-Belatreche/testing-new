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
import { Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export function ManageTeachingAssignments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedProfessor, setSelectedProfessor] = useState("all")
  const [selectedCourseType, setSelectedCourseType] = useState("all")

  // Mock teaching assignments data
  const teachingAssignments = [
    {
      id: 1,
      professor: "Dr. John Smith",
      module: "CS101 - Introduction to Computer Science",
      section: "Section A",
      group: "Group 1",
      courseType: "Lecture",
      formation: "L1 - Computer Science",
    },
    {
      id: 2,
      professor: "Dr. Sarah Williams",
      module: "CS201 - Data Structures and Algorithms",
      section: "Section B",
      group: "Group 2",
      courseType: "Tutorial",
      formation: "L1 - Computer Science",
    },
    {
      id: 3,
      professor: "Dr. Michael Johnson",
      module: "SE301 - Software Engineering",
      section: "Section A",
      group: "Group 1",
      courseType: "Lab",
      formation: "L3 - Computer Science",
    },
    {
      id: 4,
      professor: "Dr. Emily Brown",
      module: "DB301 - Database Systems",
      section: "Section C",
      group: "Group 3",
      courseType: "Lecture",
      formation: "L2 - Computer Science",
    },
    {
      id: 5,
      professor: "Dr. David Wilson",
      module: "AI401 - Artificial Intelligence",
      section: "Section A",
      group: "Group 1",
      courseType: "Lecture",
      formation: "M1 - Software Engineering",
    },
    {
      id: 6,
      professor: "Dr. John Smith",
      module: "CS101 - Introduction to Computer Science",
      section: "Section B",
      group: "Group 2",
      courseType: "Tutorial",
      formation: "L1 - Computer Science",
    },
  ]

  // Filter teaching assignments based on search query and filters
  const filteredAssignments = teachingAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.group.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesModule = selectedModule === "all" || assignment.module === selectedModule
    const matchesProfessor = selectedProfessor === "all" || assignment.professor === selectedProfessor
    const matchesCourseType = selectedCourseType === "all" || assignment.courseType === selectedCourseType

    return matchesSearch && matchesModule && matchesProfessor && matchesCourseType
  })

  // Get unique values for filter dropdowns
  const modules = ["all", ...new Set(teachingAssignments.map((a) => a.module))]
  const professors = ["all", ...new Set(teachingAssignments.map((a) => a.professor))]
  const courseTypes = ["all", ...new Set(teachingAssignments.map((a) => a.courseType))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Teaching Assignments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Teaching Assignment</DialogTitle>
              <DialogDescription>Assign a professor to teach a module.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
              <div className="grid gap-2">
                <Label htmlFor="module">Module</Label>
                <Select>
                  <SelectTrigger id="module">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules
                      .filter((m) => m !== "all")
                      .map((module) => (
                        <SelectItem key={module} value={module}>
                          {module}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" placeholder="e.g., Section A" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="group">Group</Label>
                  <Input id="group" placeholder="e.g., Group 1" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="courseType">Course Type</Label>
                <Select>
                  <SelectTrigger id="courseType">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teaching Assignments</CardTitle>
          <CardDescription>Manage professor teaching assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assignments..."
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
            <div className="w-full md:w-64">
              <Select value={selectedCourseType} onValueChange={setSelectedCourseType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Course Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Course Types</SelectItem>
                  {courseTypes
                    .filter((t) => t !== "all")
                    .map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Professor</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Section/Group</TableHead>
                  <TableHead>Course Type</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No teaching assignments found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.professor}</TableCell>
                      <TableCell>{assignment.module}</TableCell>
                      <TableCell>
                        {assignment.section}, {assignment.group}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            assignment.courseType === "Lecture"
                              ? "bg-primary-usthb text-white"
                              : assignment.courseType === "Tutorial"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {assignment.courseType}
                        </Badge>
                      </TableCell>
                      <TableCell>{assignment.formation}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  )
}

