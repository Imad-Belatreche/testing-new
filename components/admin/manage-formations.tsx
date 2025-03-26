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
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export function ManageFormations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Mock formations data
  const formations = [
    {
      id: 1,
      level: "L1",
      speciality: "Computer Science",
      moduleCount: 12,
      studentCount: 120,
    },
    {
      id: 2,
      level: "L2",
      speciality: "Computer Science",
      moduleCount: 10,
      studentCount: 100,
    },
    {
      id: 3,
      level: "L3",
      speciality: "Computer Science",
      moduleCount: 8,
      studentCount: 80,
    },
    {
      id: 4,
      level: "M1",
      speciality: "Software Engineering",
      moduleCount: 8,
      studentCount: 40,
    },
    {
      id: 5,
      level: "M2",
      speciality: "Software Engineering",
      moduleCount: 6,
      studentCount: 35,
    },
    {
      id: 6,
      level: "L3",
      speciality: "Information Systems",
      moduleCount: 8,
      studentCount: 60,
    },
    {
      id: 7,
      level: "ING3",
      speciality: "Networks and Security",
      moduleCount: 10,
      studentCount: 45,
    },
  ]

  // Filter formations based on search query and level
  const filteredFormations = formations.filter((formation) => {
    const matchesSearch = formation.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === "all" || formation.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  // Get unique levels for filter dropdown
  const levels = ["all", ...new Set(formations.map((f) => f.level))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Formations</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Formation</DialogTitle>
              <DialogDescription>Create a new academic formation.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L1">L1</SelectItem>
                    <SelectItem value="L2">L2</SelectItem>
                    <SelectItem value="L3">L3</SelectItem>
                    <SelectItem value="M1">M1</SelectItem>
                    <SelectItem value="M2">M2</SelectItem>
                    <SelectItem value="ING1">ING1</SelectItem>
                    <SelectItem value="ING2">ING2</SelectItem>
                    <SelectItem value="ING3">ING3</SelectItem>
                    <SelectItem value="ING4">ING4</SelectItem>
                    <SelectItem value="ING5">ING5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="speciality">Speciality</Label>
                <Input id="speciality" placeholder="e.g., Computer Science" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Formation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formations</CardTitle>
          <CardDescription>Manage academic formations and specialities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by speciality..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels
                    .filter((l) => l !== "all")
                    .map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>Speciality</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFormations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No formations found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFormations.map((formation) => (
                    <TableRow key={formation.id}>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            formation.level.startsWith("L")
                              ? "bg-primary-usthb"
                              : formation.level.startsWith("M")
                                ? "bg-green-700"
                                : "bg-amber-700"
                          } text-white`}
                        >
                          {formation.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formation.speciality}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {formation.moduleCount} modules
                        </Badge>
                      </TableCell>
                      <TableCell>{formation.studentCount} students</TableCell>
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

