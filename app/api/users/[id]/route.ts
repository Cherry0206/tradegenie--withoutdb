import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number.parseInt(params.id)
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ user })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = Number.parseInt(params.id)
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { name, email, role } = body

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: users[userIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number.parseInt(params.id)
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  users.splice(userIndex, 1)

  return NextResponse.json({
    message: "User deleted successfully",
  })
}
