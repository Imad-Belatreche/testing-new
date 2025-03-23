import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import { getRow } from "./db"

// Salt rounds for password hashing
const SALT_ROUNDS = 10

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// JWT expiration time
const JWT_EXPIRES_IN = "1d"

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS)
}

// Compare a password with a hash
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await compare(password, hashedPassword)
  } catch (error) {
    console.error("Password comparison error:", error)
    // This could happen if the hash is invalid
    return false
  }
}

// Generate a JWT token
export function generateToken(userId: number, role: string): string {
  return sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify a JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Set authentication cookie
export function setAuthCookie(token: string): void {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })
}

// Clear authentication cookie
export function clearAuthCookie(): void {
  cookies().delete("auth_token")
}

// Get current user from cookie
export async function getCurrentUser() {
  const token = cookies().get("auth_token")?.value

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return null
  }

  try {
    const user = await getRow(
      `SELECT u.user_id, u.email, u.role, p.professor_id, p.first_name, p.last_name, p.email_1, p.phone_1, p.status, p.grade
       FROM user u
       JOIN professor p ON u.professor_id = p.professor_id
       WHERE u.user_id = ?`,
      [decoded.userId],
    )

    if (!user || user.status === "Retired") {
      return null
    }

    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Update the hasPermission function to work with the new schema
export async function hasPermission(userId: number, permission: string): Promise<boolean> {
  try {
    // For simplicity, we'll assume admin has all permissions
    const user = await getRow("SELECT role FROM user WHERE user_id = ?", [userId])

    if (user && user.role === "admin") {
      return true
    }

    // In a real implementation, you would check a permissions table
    return false
  } catch (error) {
    console.error("Error checking permission:", error)
    return false
  }
}

// Middleware to protect routes
export async function requireAuth(role?: string) {
  const user = await getCurrentUser()

  if (!user) {
    return { redirect: { destination: "/", permanent: false } }
  }

  if (role && user.role !== role) {
    return { redirect: { destination: "/", permanent: false } }
  }

  return { props: { user } }
}

