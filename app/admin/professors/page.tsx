"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Edit, Trash2, UserPlus, Mail, Filter, Download, Lock, UserX } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for professors
const professors = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Active",
    phone: "(123) 456-7890",
    assignments: 2,
  },
  {
    id: 2,
    name: "Dr. Emily Johnson",
    email: "emily.johnson@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Active",
    phone: "(123) 456-7891",
    assignments: 1,
  },
  {
    id: 3,
    name: "Dr. Michael Williams",
    email: "michael.williams@university.edu",
    department: "Information Systems",
    role: "Professor",
    status: "Active",
    phone: "(123) 456-7892",
    assignments: 3,
  },
  {
    id: 4,
    name: "Dr. Sarah Brown",
    email: "sarah.brown@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Inactive",
    phone: "(123) 456-7893",
    assignments: 0,
  },
  {
    id: 5,
    name: "Dr. Robert Davis",
    email: "robert.davis@university.edu",
    department: "Information Systems",
    role: "Admin",
    status: "Active",
    phone: "(123) 456-7894",
    assignments: 2,
  },
  {
    id: 6,
    name: "Dr. Jennifer Wilson",
    email: "jennifer.wilson@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Active",
    phone: "(123) 456-7895",
    assignments: 1,
  },
]

export default function ManageProfessors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter professors based on search term and filters
  const filteredProfessors = professors.filter((professor) => {
    const matchesSearch =
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || professor.department === departmentFilter
    const matchesRole = roleFilter === "all" || professor.role === roleFilter
    const matchesStatus = statusFilter === "all" || professor.status === statusFilter

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Manage Professors</h1>
        <Button asChild>
          <Link href="/admin/professors/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Professor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professors</CardTitle>
          <CardDescription>
            View and manage professor accounts. Add new professors, edit existing ones, or deactivate accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search professors..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
              <div className="flex-1">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Information Systems">Information Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Professor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No professors found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfessors.map((professor) => (
                    <TableRow key={professor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={professor.name} />
                            <AvatarFallback>
                              {professor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{professor.name}</div>
                            <div className="text-sm text-muted-foreground">{professor.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{professor.department}</TableCell>
                      <TableCell>
                        <Badge variant={professor.role === "Admin" ? "default" : "outline"}>{professor.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={professor.status === "Active" ? "success" : "secondary"}
                          className={
                            professor.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {professor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{professor.assignments}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
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
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className={professor.status === "Active" ? "text-amber-600" : "text-green-600"}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              {professor.status === "Active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProfessors.length} of {professors.length} professors
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

