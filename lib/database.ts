import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database types
export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password_hash: string
  role: "entrepreneur" | "partner" | "expert"
  company: string | null
  country: string
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface UserSession {
  id: number
  user_id: number
  token: string
  expires_at: string
  created_at: string
  last_used_at: string
  user_agent: string | null
  ip_address: string | null
}

export interface UserPreferences {
  id: number
  user_id: number
  email_notifications: boolean
  marketing_updates: boolean
  trade_alerts: boolean
  weekly_reports: boolean
  timezone: string
  language: string
  two_factor_enabled: boolean
  created_at: string
  updated_at: string
}

// Database helper functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT * FROM users 
      WHERE email = ${email} AND is_active = true
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching user by email:", error)
    throw new Error("Database query failed")
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql`
      SELECT * FROM users 
      WHERE id = ${id} AND is_active = true
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error("Database query failed")
  }
}

export async function createUser(userData: {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: string
  company?: string
  country: string
}): Promise<User> {
  try {
    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash, role, company, country)
      VALUES (${userData.firstName}, ${userData.lastName}, ${userData.email}, ${userData.passwordHash}, ${userData.role}, ${userData.company || null}, ${userData.country})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    if (error instanceof Error && error.message.includes("duplicate key")) {
      throw new Error("User with this email already exists")
    }
    throw new Error("Failed to create user")
  }
}

export async function updateUser(
  id: number,
  updates: Partial<{
    first_name: string
    last_name: string
    company: string
    country: string
  }>,
): Promise<User | null> {
  try {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
      .join(", ")

    const values = [id, ...Object.values(updates)]

    const result = await sql`
      UPDATE users 
      SET ${sql.unsafe(setClause)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }
}

export async function createSession(
  userId: number,
  token: string,
  expiresAt: Date,
  userAgent?: string,
  ipAddress?: string,
): Promise<UserSession> {
  try {
    const result = await sql`
      INSERT INTO user_sessions (user_id, token, expires_at, user_agent, ip_address)
      VALUES (${userId}, ${token}, ${expiresAt.toISOString()}, ${userAgent || null}, ${ipAddress || null})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

export async function getSessionByToken(token: string): Promise<(UserSession & { user: User }) | null> {
  try {
    const result = await sql`
      SELECT s.*, u.* 
      FROM user_sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${token} AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = true
      LIMIT 1
    `

    if (!result[0]) return null

    const row = result[0]
    return {
      id: row.id,
      user_id: row.user_id,
      token: row.token,
      expires_at: row.expires_at,
      created_at: row.created_at,
      last_used_at: row.last_used_at,
      user_agent: row.user_agent,
      ip_address: row.ip_address,
      user: {
        id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        password_hash: row.password_hash,
        role: row.role,
        company: row.company,
        country: row.country,
        is_active: row.is_active,
        email_verified: row.email_verified,
        created_at: row.created_at,
        updated_at: row.updated_at,
      },
    }
  } catch (error) {
    console.error("Error fetching session:", error)
    throw new Error("Database query failed")
  }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await sql`DELETE FROM user_sessions WHERE token = ${token}`
  } catch (error) {
    console.error("Error deleting session:", error)
    throw new Error("Failed to delete session")
  }
}

export async function getUserPreferences(userId: number): Promise<UserPreferences | null> {
  try {
    const result = await sql`
      SELECT * FROM user_preferences WHERE user_id = ${userId} LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    throw new Error("Database query failed")
  }
}

export async function updateUserPreferences(
  userId: number,
  preferences: Partial<UserPreferences>,
): Promise<UserPreferences> {
  try {
    // First, try to update existing preferences
    const updateResult = await sql`
      UPDATE user_preferences 
      SET 
        email_notifications = COALESCE(${preferences.email_notifications}, email_notifications),
        marketing_updates = COALESCE(${preferences.marketing_updates}, marketing_updates),
        trade_alerts = COALESCE(${preferences.trade_alerts}, trade_alerts),
        weekly_reports = COALESCE(${preferences.weekly_reports}, weekly_reports),
        timezone = COALESCE(${preferences.timezone}, timezone),
        language = COALESCE(${preferences.language}, language),
        two_factor_enabled = COALESCE(${preferences.two_factor_enabled}, two_factor_enabled),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
      RETURNING *
    `

    if (updateResult[0]) {
      return updateResult[0]
    }

    // If no existing preferences, create new ones
    const insertResult = await sql`
      INSERT INTO user_preferences (
        user_id, email_notifications, marketing_updates, trade_alerts, 
        weekly_reports, timezone, language, two_factor_enabled
      )
      VALUES (
        ${userId}, 
        ${preferences.email_notifications ?? true},
        ${preferences.marketing_updates ?? false},
        ${preferences.trade_alerts ?? true},
        ${preferences.weekly_reports ?? true},
        ${preferences.timezone ?? "UTC"},
        ${preferences.language ?? "en"},
        ${preferences.two_factor_enabled ?? false}
      )
      RETURNING *
    `

    return insertResult[0]
  } catch (error) {
    console.error("Error updating user preferences:", error)
    throw new Error("Failed to update preferences")
  }
}
