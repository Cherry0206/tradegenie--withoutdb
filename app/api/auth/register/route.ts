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
  // Set CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  try {
    console.log("=== Registration API Called ===")

    // Parse request body
    const body = await request.json()
    console.log("Request body received:", { ...body, password: "[HIDDEN]" })

    const { firstName, lastName, email, password, role, company, country } = body

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role || !country) {
      console.log("Validation failed - missing fields")
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400, headers },
      )
    }

    // Check if user exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409, headers },
      )
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: password, // In production, hash this
      role,
      company: company?.trim() || "",
      country: country.trim(),
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    // Add to users array
    users.push(newUser)
    console.log("User created successfully:", newUser.email)

    // Generate simple token
    const token = `token_${newUser.id}_${Date.now()}`

    // Return success response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        token,
        user: userWithoutPassword,
      },
      { status: 201, headers },
    )
  } catch (error) {
    console.error("Registration error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
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
    { message: "Registration endpoint. Use POST method." },
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    },
  )
}
