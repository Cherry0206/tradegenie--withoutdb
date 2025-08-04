import { type NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  try {
    console.log("=== Registration API Called ===")

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400, headers },
      )
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400, headers },
      )
    }

    try {
      const { user, token } = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password,
        role,
        company: company?.trim() || "",
        country: country.trim(),
      })

      console.log("User created successfully:", user.email)

      return NextResponse.json(
        {
          success: true,
          message: "Account created successfully",
          token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
            company: user.company,
            country: user.country,
            createdAt: user.created_at,
          },
        },
        { status: 201, headers },
      )
    } catch (authError) {
      console.error("Registration auth error:", authError)

      if (authError instanceof Error && authError.message.includes("already exists")) {
        return NextResponse.json(
          {
            success: false,
            message: "An account with this email already exists",
          },
          { status: 409, headers },
        )
      }

      throw authError
    }
  } catch (error) {
    console.error("Registration error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed. Please try again.",
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
