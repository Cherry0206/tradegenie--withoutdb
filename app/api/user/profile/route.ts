import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { updateUser } from "@/lib/database"

export async function GET(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
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

    const user = await getCurrentUser(token)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401, headers },
      )
    }

    return NextResponse.json(
      {
        success: true,
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
  } catch (error) {
    console.error("Get profile error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers },
    )
  }
}

export async function PUT(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
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

    const user = await getCurrentUser(token)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401, headers },
      )
    }

    const body = await request.json()
    const { firstName, lastName, company, country } = body

    const updates: any = {}
    if (firstName) updates.first_name = firstName.trim()
    if (lastName) updates.last_name = lastName.trim()
    if (company !== undefined) updates.company = company.trim() || null
    if (country) updates.country = country.trim()

    const updatedUser = await updateUser(user.id, updates)
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update profile",
        },
        { status: 500, headers },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
          email: updatedUser.email,
          role: updatedUser.role,
          company: updatedUser.company,
          country: updatedUser.country,
          createdAt: updatedUser.created_at,
        },
      },
      { headers },
    )
  } catch (error) {
    console.error("Update profile error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
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
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
