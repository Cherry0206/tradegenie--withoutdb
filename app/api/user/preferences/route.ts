import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getUserPreferences, updateUserPreferences } from "@/lib/database"

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

    const preferences = await getUserPreferences(user.id)

    return NextResponse.json(
      {
        success: true,
        preferences: preferences || {
          email_notifications: true,
          marketing_updates: false,
          trade_alerts: true,
          weekly_reports: true,
          timezone: "UTC",
          language: "en",
          two_factor_enabled: false,
        },
      },
      { headers },
    )
  } catch (error) {
    console.error("Get preferences error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get preferences",
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
    const {
      email_notifications,
      marketing_updates,
      trade_alerts,
      weekly_reports,
      timezone,
      language,
      two_factor_enabled,
    } = body

    const updates: any = {}
    if (email_notifications !== undefined) updates.email_notifications = email_notifications
    if (marketing_updates !== undefined) updates.marketing_updates = marketing_updates
    if (trade_alerts !== undefined) updates.trade_alerts = trade_alerts
    if (weekly_reports !== undefined) updates.weekly_reports = weekly_reports
    if (timezone) updates.timezone = timezone
    if (language) updates.language = language
    if (two_factor_enabled !== undefined) updates.two_factor_enabled = two_factor_enabled

    const updatedPreferences = await updateUserPreferences(user.id, updates)

    return NextResponse.json(
      {
        success: true,
        message: "Preferences updated successfully",
        preferences: updatedPreferences,
      },
      { headers },
    )
  } catch (error) {
    console.error("Update preferences error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update preferences",
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
