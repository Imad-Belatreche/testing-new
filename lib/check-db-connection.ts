import mysql from "mysql2/promise"
import fs from "fs"
import path from "path"

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Get the CA certificate path
    const caCertPath = path.join(process.cwd(), "certs", "ca-certificate.pem")

    // Check if the file exists
    let sslConfig = {}
    try {
      if (fs.existsSync(caCertPath)) {
        console.log("CA certificate found at:", caCertPath)
        sslConfig = {
          ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync(caCertPath).toString(),
          },
        }
      } else {
        console.warn("CA certificate not found at:", caCertPath)
        // Fallback to basic SSL without certificate
        sslConfig = {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      }
    } catch (fsError) {
      console.error("Error reading CA certificate:", fsError)
      // Fallback to basic SSL without certificate
      sslConfig = {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    }

    // Create a temporary connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "project_db",
      ...sslConfig,
    })

    // Test the connection
    await connection.query("SELECT 1")

    // Close the connection
    await connection.end()

    return true
  } catch (error) {
    console.error("Database connection check failed:", error)
    return false
  }
}

