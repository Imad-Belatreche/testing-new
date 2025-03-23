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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

export function ManageRooms() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCapacity, setSelectedCapacity] = useState("all")

  // Mock rooms data
  const rooms = [
    {
      id: "1",
      number: "A104",
      capacity: 60,
      building: "Building A",
      features: ["Projector", "Internet Access"],
      status: "Available",
    },
    {
      id: "2",
      number: "B201",
      capacity: 80,
      building: "Building B",
      features: ["Projector", "Internet Access", "Smart Board"],
      status: "Available",
    },
    {
      id: "3",
      number: "C105",
      capacity: 40,
      building: "Building C",
      features: ["Projector"],
      status: "Available",
    },
    {
      id: "4",
      number: "A201",
      capacity: 100,
      building: "Building A",
      features: ["Projector", "Internet Access", "Smart Board", "Computer Lab"],
      status: "Under Maintenance",
    },
    {
      id: "5",
      number: "B102",
      capacity: 50,
      building: "Building B",
      features: ["Projector", "Internet Access"],
      status: "Available",
    },
  ]

  // Filter rooms based on search query and capacity
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCapacity =
      selectedCapacity === "all" ||
      (selectedCapacity === "small" && room.capacity <= 50) ||
      (selectedCapacity === "medium" && room.capacity > 50 && room.capacity <= 80) ||
      (selectedCapacity === "large" && room.capacity > 80)

    return matchesSearch && matchesCapacity
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Rooms</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Create a new exam room with its capacity and features.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input id="roomNumber" placeholder="A104" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="60" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="building">Building</Label>
                <Select>
                  <SelectTrigger id="building">
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building-a">Building A</SelectItem>
                    <SelectItem value="building-b">Building B</SelectItem>
                    <SelectItem value="building-c">Building C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Features</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="projector" />
                    <Label htmlFor="projector">Projector</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="internet" />
                    <Label htmlFor="internet">Internet Access</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="smartboard" />
                    <Label htmlFor="smartboard">Smart Board</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="computerlab" />
                    <Label htmlFor="computerlab">Computer Lab</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Rooms</CardTitle>
          <CardDescription>Manage exam rooms and their features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by room number, building, or features..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Capacities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Capacities</SelectItem>
                  <SelectItem value="small">Small (≤ 50)</SelectItem>
                  <SelectItem value="medium">Medium (51-80)</SelectItem>
                  <SelectItem value="large">Large (> 80)</SelectItem>
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
                  <TableHead>Room Number</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No rooms found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.building}</TableCell>
                      <TableCell>{room.capacity} seats</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {room.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            room.status === "Available"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          }
                        >
                          {room.status}
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
        </CardContent>
      </Card>
    </div>
  )
}

