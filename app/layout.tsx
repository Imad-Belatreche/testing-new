import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "University Exam Surveillance System",
  description: "A comprehensive system for managing university exam surveillance",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

