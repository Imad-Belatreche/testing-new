"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch("/api/auth/test-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const responseText = await res.text()
      console.log("Raw response:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        setError(
          `Server returned non-JSON response: ${responseText.substring(0, 200)}${responseText.length > 200 ? "..." : ""}`,
        )
        setLoading(false)
        return
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      })

      if (!res.ok) {
        setError(data.error || `Error: ${res.status} ${res.statusText}`)
      }
    } catch (err) {
      setError(`Fetch error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Test Login API</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.smith@university.edu"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Testing..." : "Test Login"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {response && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Response:</h3>
              <div className="bg-gray-50 p-3 rounded-md overflow-auto max-h-60 text-sm font-mono">
                <div>
                  <strong>Status:</strong> {response.status} {response.statusText}
                </div>
                <div className="mt-2">
                  <strong>Headers:</strong>
                </div>
                <pre className="text-xs mt-1">{JSON.stringify(response.headers, null, 2)}</pre>
                <div className="mt-2">
                  <strong>Body:</strong>
                </div>
                <pre className="text-xs mt-1">{JSON.stringify(response.data, null, 2)}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

