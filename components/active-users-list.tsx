"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MessageSquare, RefreshCw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock data for active users
const activeUsers = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Online",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Dr. Emily Johnson",
    email: "emily.johnson@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Online",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Dr. Michael Williams",
    email: "michael.williams@university.edu",
    department: "Information Systems",
    role: "Professor",
    status: "Away",
    lastActive: "15 minutes ago",
  },
  {
    id: 4,
    name: "Dr. Robert Davis",
    email: "robert.davis@university.edu",
    department: "Information Systems",
    role: "Admin",
    status: "Online",
    lastActive: "Just now",
  },
  {
    id: 5,
    name: "Dr. Jennifer Wilson",
    email: "jennifer.wilson@university.edu",
    department: "Computer Science",
    role: "Professor",
    status: "Online",
    lastActive: "7 minutes ago",
  },
]

export default function ActiveUsersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof activeUsers)[0] | null>(null)
  const [message, setMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter users based on search term
  const filteredUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    // In a real implementation, this would send the message to the user
    console.log(`Sending message to ${selectedUser?.name}: ${message}`)
    setMessage("")
    setIsDialogOpen(false)
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently active professors and administrators</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No active users found matching your search criteria
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                        user.status === "Online" ? "bg-green-500" : "bg-amber-500"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <div className="text-sm">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Online" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{user.lastActive}</div>
                  </div>
                  <Dialog
                    open={isDialogOpen && selectedUser?.id === user.id}
                    onOpenChange={(open) => {
                      setIsDialogOpen(open)
                      if (!open) setSelectedUser(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Message to {selectedUser?.name}</DialogTitle>
                        <DialogDescription>
                          Send a direct message to this user. They will be notified immediately.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={selectedUser?.name} />
                            <AvatarFallback>
                              {selectedUser?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedUser?.name}</div>
                            <div className="text-sm text-muted-foreground">{selectedUser?.email}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          Send Message
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

