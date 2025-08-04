import { type NextRequest, NextResponse } from "next/server"

// Mock user data - replace with actual database queries
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit")
  const role = searchParams.get("role")

  let filteredUsers = users

  // Filter by role if specified
  if (role) {
    filteredUsers = users.filter((user) => user.role === role)
  }

  // Limit results if specified
  if (limit) {
    filteredUsers = filteredUsers.slice(0, Number.parseInt(limit))
  }

  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role = "user" } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Create new user (in real app, save to database)
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
