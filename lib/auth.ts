import bcrypt from "bcryptjs"
import { createUser, getUserByEmail, createSession, getSessionByToken, deleteSession, type User } from "./database"

// Generate a secure random token
function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Register new user
export async function registerUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  company?: string
  country: string
}): Promise<{ user: User; token: string }> {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash password
  const passwordHash = await hashPassword(userData.password)

  // Create user
  const user = await createUser({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    passwordHash,
    role: userData.role,
    company: userData.company,
    country: userData.country,
  })

  // Create session
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  await createSession(user.id, token, expiresAt)

  return { user, token }
}

// Login user
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  // Get user by email
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password_hash)
  if (!isValidPassword) {
    throw new Error("Invalid credentials")
  }

  // Create session
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  await createSession(user.id, token, expiresAt)

  return { user, token }
}

// Validate session token
export async function validateSession(token: string): Promise<User | null> {
  try {
    const session = await getSessionByToken(token)
    if (!session) {
      return null
    }

    return session.user
  } catch (error) {
    console.error("Error validating session:", error)
    return null
  }
}

// Logout user
export async function logoutUser(token: string): Promise<void> {
  await deleteSession(token)
}

// Get current user from token
export async function getCurrentUser(token: string): Promise<User | null> {
  return validateSession(token)
}
