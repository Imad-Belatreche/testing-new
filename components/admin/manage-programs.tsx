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
import { Edit, Filter, MoreHorizontal, Plus, School, Search, Trash2 } from "lucide-react"

export function ManagePrograms() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock programs data
  const programs = [
    {
      id: "1",
      code: "L1",
      name: "Bachelor of Computer Science",
      level: "Bachelor",
      departments: ["Computer Science", "Software Engineering"],
      modules: 24,
      students: 120,
    },
    {
      id: "2",
      code: "L2",
      name: "Bachelor of Information Systems",
      level: "Bachelor",
      departments: ["Information Systems", "Computer Science"],
      modules: 22,
      students: 85,
    },
    {
      id: "3",
      code: "L3",
      name: "Bachelor of Networks and Telecommunications",
      level: "Bachelor",
      departments: ["Networks", "Telecommunications"],
      modules: 20,
      students: 65,
    },
    {
      id: "4",
      code: "M1",
      name: "Master of Computer Science",
      level: "Master",
      departments: ["Computer Science", "Artificial Intelligence"],
      modules: 16,
      students: 45,
    },
    {
      id: "5",
      code: "M2",
      name: "Master of Software Engineering",
      level: "Master",
      departments: ["Software Engineering"],
      modules: 14,
      students: 30,
    },
  ]

  // Filter programs based on search query
  const filteredPrograms = programs.filter((program) => {
    return (
      program.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.departments.some((dept) => dept.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Academic Programs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Academic Program</DialogTitle>
              <DialogDescription>Create a new academic program with associated departments.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="programCode">Program Code</Label>
                  <Input id="programCode" placeholder="L1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">Bachelor</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="programName">Program Name</Label>
                <Input id="programName" placeholder="Bachelor of Computer Science" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departments">Associated Departments</Label>
                <Select>
                  <SelectTrigger id="departments">
                    <SelectValue placeholder="Select departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="software-engineering">Software Engineering</SelectItem>
                    <SelectItem value="networks">Networks</SelectItem>
                    <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="information-systems">Information Systems</SelectItem>
                    <SelectItem value="telecommunications">Telecommunications</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">You can select multiple departments</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Program</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Programs</CardTitle>
          <CardDescription>Manage academic programs and their associated departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by code, name, level, or department..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No programs found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">
                        <Badge
                          variant="outline"
                          className={`${program.level === "Bachelor" ? "bg-primary-usthb" : "bg-gray-700"} text-white`}
                        >
                          {program.code}
                        </Badge>
                      </TableCell>
                      <TableCell>{program.name}</TableCell>
                      <TableCell>{program.level}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {program.departments.map((department, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                              {department}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{program.modules}</TableCell>
                      <TableCell>{program.students}</TableCell>
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
                              <School className="mr-2 h-4 w-4" />
                              View Modules
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

