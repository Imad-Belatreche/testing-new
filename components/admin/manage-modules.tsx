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

export function ManageModules() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")

  // Mock modules data
  const modules = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Computer Science",
      program: "L1",
      credits: 4,
      department: "Computer Science",
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures and Algorithms",
      program: "L1",
      credits: 4,
      department: "Computer Science",
    },
    {
      id: "3",
      code: "SE301",
      name: "Software Engineering",
      program: "L1",
      credits: 3,
      department: "Software Engineering",
    },
    {
      id: "4",
      code: "AI401",
      name: "Artificial Intelligence",
      program: "M1",
      credits: 4,
      department: "Artificial Intelligence",
    },
    {
      id: "5",
      code: "DB301",
      name: "Database Systems",
      program: "L1",
      credits: 3,
      department: "Computer Science",
    },
  ]

  // Filter modules based on search query and program
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesProgram = selectedProgram === "all" || module.program === selectedProgram

    return matchesSearch && matchesProgram
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Modules</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Module</DialogTitle>
              <DialogDescription>Create a new academic module for a program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="moduleCode">Module Code</Label>
                  <Input id="moduleCode" placeholder="CS101" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="credits">Credit Hours</Label>
                  <Input id="credits" type="number" placeholder="4" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="moduleName">Module Name</Label>
                <Input id="moduleName" placeholder="Introduction to Computer Science" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="program">Program</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1 - Bachelor</SelectItem>
                      <SelectItem value="M1">M1 - Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="software-engineering">Software Engineering</SelectItem>
                      <SelectItem value="networks">Networks</SelectItem>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Module</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Modules</CardTitle>
          <CardDescription>Manage academic modules for all programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by code, name, or department..."
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
                  <TableHead>Code</TableHead>
                  <TableHead>Module Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No modules found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.code}</TableCell>
                      <TableCell>{module.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${module.program === "L1" ? "bg-primary-usthb" : "bg-gray-700"} text-white`}
                        >
                          {module.program}
                        </Badge>
                      </TableCell>
                      <TableCell>{module.credits}</TableCell>
                      <TableCell>{module.department}</TableCell>
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

