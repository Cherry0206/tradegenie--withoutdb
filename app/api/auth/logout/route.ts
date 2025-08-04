import { type NextRequest, NextResponse } from "next/server"
import { logoutUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "") || ""

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token provided",
        },
        { status: 401, headers },
      )
    }

    await logoutUser(token)

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { headers },
    )
  } catch (error) {
    console.error("Logout error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
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
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
