import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, document_name, document_type, risk_level } = body

    // Validate required fields
    if (!user_id || !document_name || !document_type || !risk_level) {
      return NextResponse.json(
        { 
          error: "Missing required fields", 
          required: ["user_id", "document_name", "document_type", "risk_level"] 
        },
        { status: 400 }
      )
    }

    // Validate user_id is a number
    if (typeof user_id !== "number" || user_id <= 0) {
      return NextResponse.json(
        { error: "user_id must be a positive integer" },
        { status: 400 }
      )
    }

    // Validate string fields are not empty
    if (!document_name.trim() || !document_type.trim() || !risk_level.trim()) {
      return NextResponse.json(
        { error: "String fields cannot be empty" },
        { status: 400 }
      )
    }

    // Insert the download record into the database
    const result = await sql`
      INSERT INTO document_downloads (user_id, document_name, document_type, risk_level)
      VALUES (${user_id}, ${document_name.trim()}, ${document_type.trim()}, ${risk_level.trim()})
      RETURNING id, download_time
    `

    const downloadRecord = result[0]

    return NextResponse.json({
      success: true,
      message: "Document download recorded successfully",
      data: {
        id: downloadRecord.id,
        user_id,
        document_name: document_name.trim(),
        document_type: document_type.trim(),
        risk_level: risk_level.trim(),
        download_time: downloadRecord.download_time
      }
    })

  } catch (error) {
    console.error("Error recording document download:", error)
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid user_id: user does not exist" },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve download history for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")

    if (!userId) {
      return NextResponse.json(
        { error: "user_id query parameter is required" },
        { status: 400 }
      )
    }

    const userIdNum = parseInt(userId)
    if (isNaN(userIdNum) || userIdNum <= 0) {
      return NextResponse.json(
        { error: "user_id must be a positive integer" },
        { status: 400 }
      )
    }

    const downloads = await sql`
      SELECT id, document_name, document_type, risk_level, download_time
      FROM document_downloads
      WHERE user_id = ${userIdNum}
      ORDER BY download_time DESC
    `

    return NextResponse.json({
      success: true,
      data: downloads,
      count: downloads.length
    })

  } catch (error) {
    console.error("Error fetching document downloads:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
