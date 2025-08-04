import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

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

    try {
      const { user, token } = await loginUser(email.toLowerCase().trim(), password)

      console.log("Login successful for:", user.email)

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
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
        { headers },
      )
    } catch (authError) {
      console.error("Login auth error:", authError)

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401, headers },
      )
    }
  } catch (error) {
    console.error("Login error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Login failed. Please try again.",
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
