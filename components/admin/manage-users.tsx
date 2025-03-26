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
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Filter, Key, MoreHorizontal, Search, Shield, Trash2, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [createUserType, setCreateUserType] = useState<"new" | "professor">("new")

  // Mock users data
  const users = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@usthb.edu",
      role: "admin",
      linkedProfessor: null,
      department: "Administration",
      status: "Active",
      lastLogin: "Today, 10:30 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Dr. John Smith",
      email: "john.smith@usthb.edu",
      role: "professor",
      linkedProfessor: "Dr. John Smith",
      department: "Computer Science",
      status: "Active",
      lastLogin: "Yesterday, 3:45 PM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Dr. Sarah Williams",
      email: "sarah.williams@usthb.edu",
      role: "both",
      linkedProfessor: "Dr. Sarah Williams",
      department: "Software Engineering",
      status: "Active",
      lastLogin: "Today, 9:15 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Dr. Michael Johnson",
      email: "michael.johnson@usthb.edu",
      role: "professor",
      linkedProfessor: "Dr. Michael Johnson",
      department: "Computer Science",
      status: "Inactive",
      lastLogin: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "System Administrator",
      email: "sysadmin@usthb.edu",
      role: "admin",
      linkedProfessor: null,
      department: "IT Department",
      status: "Active",
      lastLogin: "Today, 11:20 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock professors without user accounts
  const professorsWithoutAccounts = [
    {
      id: "1",
      name: "Dr. Emily Brown",
      email: "emily.brown@usthb.edu",
      department: "Networks",
      status: "Active",
    },
    {
      id: "2",
      name: "Dr. David Wilson",
      email: "david.wilson@usthb.edu",
      department: "Artificial Intelligence",
      status: "Active",
    },
  ]

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesRole = selectedRole === "all" || user.role === selectedRole

    const matchesStatus = selectedStatus === "all" || user.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account or create an account for an existing professor.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="new" onValueChange={(value) => setCreateUserType(value as "new" | "professor")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="new">New User</TabsTrigger>
                <TabsTrigger value="professor">Existing Professor</TabsTrigger>
              </TabsList>

              <TabsContent value="new">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.smith@usthb.edu" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                          <SelectItem value="administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="admin">
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sendEmail" defaultChecked />
                    <Label htmlFor="sendEmail">Send welcome email with login instructions</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="professor">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="professor">Select Professor</Label>
                    <Select>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="Select professor" />
                      </SelectTrigger>
                      <SelectContent>
                        {professorsWithoutAccounts.map((professor) => (
                          <SelectItem key={professor.id} value={professor.id}>
                            {professor.name} - {professor.department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Only professors without user accounts are shown in this list.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="professor">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="both">Both (Admin & Professor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sendEmail" defaultChecked />
                    <Label htmlFor="sendEmail">Send welcome email with login instructions</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="submit">{createUserType === "new" ? "Create User" : "Create Account for Professor"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or department..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Linked Professor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role !== "professor" ? "default" : "outline"}
                          className={
                            user.role === "admin" ? "bg-primary-usthb" : user.role === "both" ? "bg-purple-600" : ""
                          }
                        >
                          {user.role === "admin"
                            ? "Admin"
                            : user.role === "professor"
                              ? "Professor"
                              : "Admin & Professor"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.linkedProfessor ? (
                          <span>{user.linkedProfessor}</span>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
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
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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

