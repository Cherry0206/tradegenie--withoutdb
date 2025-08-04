import { NextResponse } from "next/server"
import { getDatabaseStats } from "@/lib/comprehensive-trade-database"

export async function GET() {
  try {
    const stats = getDatabaseStats()

    return NextResponse.json({
      success: true,
      data: stats,
      message: "Database statistics retrieved successfully",
    })
  } catch (error) {
    console.error("Database stats error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve database statistics",
      },
      { status: 500 },
    )
  }
}
