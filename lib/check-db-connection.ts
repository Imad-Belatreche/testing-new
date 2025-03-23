import { query } from "./db"

/**
 * Utility function to check the database connection
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Simple query to check connection
    await query("SELECT 1 as connection_test")
    console.log("Database connection successful with SSL")
    return true
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}

