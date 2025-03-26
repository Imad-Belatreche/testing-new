import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RoleProvider } from "@/components/role-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "USTHB Exam Surveillance System",
  description: "University exam surveillance management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RoleProvider>{children}</RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'