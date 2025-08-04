import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo purposes
const users = [
  {
    id: 1,
    firstName: "Demo",
    lastName: "User",
    email: "demo@tradegenie.com",
    password: "password123",
    role: "entrepreneur",
    company: "Demo Company",
    country: "United States",
    createdAt: "2024-01-01T00:00:00.000Z",
    isActive: true,
  },
]

export async function POST(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  try {
    console.log("=== Login API Called ===")

    const body = await request.json()
    console.log("Login attempt for:", body.email)

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400, headers },
      )
    }

    // Find user
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())

    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401, headers },
      )
    }

    // Generate simple token
    const token = `token_${user.id}_${Date.now()}`

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    console.log("Login successful for:", user.email)

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: userWithoutPassword,
      },
      { headers },
    )
  } catch (error) {
    console.error("Login error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function GET() {
  return NextResponse.json(
    { message: "Login endpoint. Use POST method." },
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    },
  )
}
