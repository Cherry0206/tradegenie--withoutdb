import { type NextRequest, NextResponse } from "next/server"
import { tariffScraper } from "@/lib/tariff-scraper"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const product = searchParams.get("product")
    const fromCountry = searchParams.get("from") || "India"
    const toCountry = searchParams.get("to")

    if (!product || !toCountry) {
      return NextResponse.json({ error: "Product and destination country are required" }, { status: 400 })
    }

    console.log(`Fetching tariff data for ${product} from ${fromCountry} to ${toCountry}`)

    const tariffData = await tariffScraper.getTariffData(product, fromCountry, toCountry)

    if (!tariffData) {
      return NextResponse.json(
        { error: "Tariff data not found for the specified product and country combination" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: tariffData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Tariff API error:", error)
    return NextResponse.json({ error: "Failed to fetch tariff data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, fromCountry = "India", toCountry } = body

    if (!product || !toCountry) {
      return NextResponse.json({ error: "Product and destination country are required" }, { status: 400 })
    }

    const tariffData = await tariffScraper.getTariffData(product, fromCountry, toCountry)

    if (!tariffData) {
      return NextResponse.json({ error: "Tariff data not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: tariffData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Tariff POST API error:", error)
    return NextResponse.json({ error: "Failed to fetch tariff data" }, { status: 500 })
  }
}
