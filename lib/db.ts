import mysql from "mysql2/promise"
import fs from "fs"
import path from "path"

// Create the connection pool with SSL enabled
const createPool = () => {
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

    console.log("Creating MySQL connection pool with config:", {
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      database: process.env.MYSQL_DATABASE || "project_db",
      ...sslConfig,
    })

    return mysql.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "project_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...sslConfig,
    })
  } catch (error) {
    console.error("Error creating connection pool:", error)
    throw error
  }
}

const pool = createPool()

// Helper function to execute SQL queries
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    // Add more detailed error information
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("SQL:", sql)
    console.error("Params:", params)
    console.error("Error details:", errorMessage)
    throw error
  }
}

// Helper function to get a single row
export async function getRow(sql: string, params: any[] = []) {
  try {
    const results = (await query(sql, params)) as any[]
    return results[0]
  } catch (error) {
    console.error("getRow error:", error)
    throw error
  }
}

// Helper function to insert data and return the inserted ID
export async function insert(sql: string, params: any[] = []) {
  try {
    const [result] = (await pool.execute(sql, params)) as any
    return result.insertId
  } catch (error) {
    console.error("Database insert error:", error)
    throw error
  }
}

// Helper function to update data
export async function update(sql: string, params: any[] = []) {
  try {
    const [result] = (await pool.execute(sql, params)) as any
    return result.affectedRows
  } catch (error) {
    console.error("Database update error:", error)
    throw error
  }
}

// Helper function to delete data
export async function remove(sql: string, params: any[] = []) {
  try {
    const [result] = (await pool.execute(sql, params)) as any
    return result.affectedRows
  } catch (error) {
    console.error("Database delete error:", error)
    throw error
  }
}

// Helper function to begin a transaction
export async function beginTransaction() {
  const connection = await pool.getConnection()
  await connection.beginTransaction()
  return connection
}

// Helper function to commit a transaction
export async function commitTransaction(connection: mysql.PoolConnection) {
  await connection.commit()
  connection.release()
}

// Helper function to rollback a transaction
export async function rollbackTransaction(connection: mysql.PoolConnection) {
  await connection.rollback()
  connection.release()
}

