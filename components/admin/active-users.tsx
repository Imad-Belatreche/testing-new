"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send } from "lucide-react"

export function ActiveUsers() {
  const [message, setMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  // Mock active users data
  const activeUsers = [
    {
      id: "1",
      name: "Dr. Smith",
      department: "Computer Science",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Dr. Williams",
      department: "Software Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastActive: "5 min ago",
    },
    {
      id: "3",
      name: "Dr. Johnson",
      department: "Computer Science",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastActive: "15 min ago",
    },
    {
      id: "4",
      name: "Dr. Brown",
      department: "Networks",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastActive: "1 hour ago",
    },
  ]

  const handleSendMessage = () => {
    // In a real app, you would send the message to the backend
    console.log(`Sending message to ${selectedUser}: ${message}`)
    setMessage("")
  }

  return (
    <div className="space-y-4">
      {activeUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                  user.status === "online" ? "bg-green-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.department}</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedUser(user.name)}
                disabled={user.status === "offline"}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Message to {selectedUser}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">Admin User</div>
                    <div className="text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-primary-usthb text-white">
                        Admin
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Input
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSendMessage} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  )
}

