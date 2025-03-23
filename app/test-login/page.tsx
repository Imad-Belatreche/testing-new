"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("john.smith@university.edu")
  const [password, setPassword] = useState("admin123")
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResponse(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/test-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const responseText = await response.text()
      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText,
      })

      try {
        const data = JSON.parse(responseText)
        if (!response.ok) {
          setError(data.error || "Login failed")
        } else {
          // Don't redirect, just show success
          setError("")
        }
      } catch (parseError) {
        setError(`Failed to parse response as JSON: ${responseText.substring(0, 100)}...`)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Test Login Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Testing..." : "Test Login"}
            </Button>
          </form>

          {response && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium">API Response:</h3>
              <div className="p-4 bg-gray-100 rounded-md overflow-auto">
                <p>
                  <strong>Status:</strong> {response.status} {response.statusText}
                </p>
                <p>
                  <strong>Headers:</strong>
                </p>
                <pre className="text-xs mt-1">{JSON.stringify(response.headers, null, 2)}</pre>
                <p className="mt-2">
                  <strong>Body:</strong>
                </p>
                <pre className="text-xs mt-1 whitespace-pre-wrap">{response.body}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

