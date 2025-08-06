import { NextResponse } from "next/server"
import { hanaClient } from "@/lib/sap-hana-client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { country, product, exportValue, timeline } = body

    if (!country || !product) {
      return NextResponse.json(
        {
          success: false,
          message: "Country and product are required",
          data: null
        },
        { status: 400 }
      )
    }

    let analysis = null
    let dataSource = "Mock Data - Demo Mode"

    try {
      // Attempt to get real-time risk data from SAP HANA
      const riskData = await hanaClient.getRiskData(country, product)
      const economicData = await hanaClient.getEconomicIndicators(country)
      const complianceUpdates = await hanaClient.getComplianceUpdates(country, product)
      const marketSentiment = await hanaClient.getMarketSentiment(country, product)

      if (riskData) {
        // Use real HANA data (or simulated HANA data)
        analysis = {
          country: country,
          product: product,
          overallRisk: Math.round(riskData.OVERALL_RISK_SCORE || 45),
          politicalRisk: Math.round(riskData.POLITICAL_RISK_SCORE || 35),
          economicRisk: Math.round(riskData.ECONOMIC_RISK_SCORE || 40),
          complianceRisk: Math.round(riskData.COMPLIANCE_RISK_SCORE || 30),
          marketRisk: Math.round(riskData.MARKET_RISK_SCORE || 35),
          tariffRate: riskData.TARIFF_RATE || "8%",
          marketSize: `$${Math.round(riskData.MARKET_SIZE_USD / 1000000)}M`,
          recommendations: generateRecommendations(riskData, economicData),
          warnings: generateWarnings(riskData, economicData, complianceUpdates),
          opportunities: generateOpportunities(riskData, marketSentiment),
          lastUpdated: riskData.LAST_UPDATED,
          dataSource: process.env.SAP_HANA_SERVER_NODE ? "SAP HANA Cloud - Real-time" : "Simulated HANA Data"
        }
        dataSource = analysis.dataSource
      }
    } catch (hanaError) {
      console.log("HANA connection failed, using fallback data:", hanaError)
      // Continue to fallback data generation
    }

    if (!analysis) {
      // Enhanced mock data based on country and product
      const currentTime = new Date().toISOString()
      const mockRiskData = generateMockRiskData(country, product)
      
      analysis = {
        country: country,
        product: product,
        overallRisk: mockRiskData.overallRisk,
        politicalRisk: mockRiskData.politicalRisk,
        economicRisk: mockRiskData.economicRisk,
        complianceRisk: mockRiskData.complianceRisk,
        marketRisk: mockRiskData.marketRisk,
        tariffRate: mockRiskData.tariffRate,
        marketSize: mockRiskData.marketSize,
        recommendations: mockRiskData.recommendations,
        warnings: mockRiskData.warnings,
        opportunities: mockRiskData.opportunities,
        lastUpdated: currentTime,
        dataSource: "Enhanced Mock Data"
      }
      dataSource = "Enhanced Mock Data"
    }

    return NextResponse.json({
      success: true,
      data: analysis,
      message: "Real-time risk analysis completed",
      timestamp: new Date().toISOString(),
      dataSource: dataSource
    })

  } catch (error) {
    console.error("Real-time risk analysis error:", error)
    
    // Always return JSON, even on error
    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform real-time risk analysis",
        error: error instanceof Error ? error.message : "Unknown error",
        data: null
      },
      { status: 500 }
    )
  }
}

function generateMockRiskData(country: string, product: string) {
  // Country-specific risk profiles
  const countryRiskProfiles: Record<string, any> = {
    'brazil': {
      politicalRisk: 45,
      economicRisk: 38,
      complianceRisk: 32,
      marketRisk: 28,
      tariffRate: '8.5%',
      marketSize: '$245M',
      opportunities: [
        'Growing middle class with increased purchasing power',
        'Government incentives for foreign investment in technology',
        'Strong domestic demand for imported goods'
      ],
      warnings: [
        'Currency volatility may affect profit margins',
        'Complex tax system requires local expertise',
        'Political uncertainty ahead of elections'
      ]
    },
    'germany': {
      politicalRisk: 15,
      economicRisk: 22,
      complianceRisk: 35,
      marketRisk: 25,
      tariffRate: '3.2%',
      marketSize: '$1.2B',
      opportunities: [
        'Stable economy with high purchasing power',
        'Strong demand for quality products',
        'Excellent infrastructure and logistics'
      ],
      warnings: [
        'Strict regulatory compliance requirements',
        'High competition from established players',
        'Environmental regulations are stringent'
      ]
    },
    'japan': {
      politicalRisk: 12,
      economicRisk: 28,
      complianceRisk: 42,
      marketRisk: 35,
      tariffRate: '5.8%',
      marketSize: '$890M',
      opportunities: [
        'Premium market with quality-focused consumers',
        'Innovation-friendly business environment',
        'Strong B2B relationships once established'
      ],
      warnings: [
        'Complex regulatory approval processes',
        'Cultural barriers for foreign companies',
        'Aging population affecting some markets'
      ]
    },
    'india': {
      politicalRisk: 35,
      economicRisk: 32,
      complianceRisk: 28,
      marketRisk: 22,
      tariffRate: '12.5%',
      marketSize: '$680M',
      opportunities: [
        'Rapidly growing economy and middle class',
        'Government push for digitalization',
        'Large domestic market with diverse needs'
      ],
      warnings: [
        'Complex regulatory environment',
        'Infrastructure challenges in rural areas',
        'Intense price competition'
      ]
    }
  }

  // Product-specific adjustments
  const productAdjustments: Record<string, any> = {
    'electronics': { marketRisk: -5, complianceRisk: +8 },
    'textiles': { marketRisk: -8, complianceRisk: -3 },
    'food & beverages': { complianceRisk: +12, marketRisk: -2 },
    'machinery': { politicalRisk: -3, economicRisk: +5 },
    'chemicals': { complianceRisk: +15, politicalRisk: +3 },
    'automotive': { economicRisk: +8, marketRisk: +5 },
    'pharmaceuticals': { complianceRisk: +20, politicalRisk: -5 },
    'agriculture': { politicalRisk: +5, economicRisk: -3 }
  }

  const countryKey = country.toLowerCase()
  const productKey = product.toLowerCase()
  
  const baseProfile = countryRiskProfiles[countryKey] || {
    politicalRisk: 30,
    economicRisk: 35,
    complianceRisk: 25,
    marketRisk: 30,
    tariffRate: '7.5%',
    marketSize: '$450M',
    opportunities: [
      'Growing market demand for your product category',
      'Favorable trade policies for foreign investors',
      'Emerging consumer trends support market entry'
    ],
    warnings: [
      'Market volatility requires careful monitoring',
      'Regulatory changes may impact operations',
      'Currency fluctuations could affect profitability'
    ]
  }

  const productAdj = productAdjustments[productKey] || {}
  
  const adjustedRisks = {
    politicalRisk: Math.max(5, Math.min(95, baseProfile.politicalRisk + (productAdj.politicalRisk || 0))),
    economicRisk: Math.max(5, Math.min(95, baseProfile.economicRisk + (productAdj.economicRisk || 0))),
    complianceRisk: Math.max(5, Math.min(95, baseProfile.complianceRisk + (productAdj.complianceRisk || 0))),
    marketRisk: Math.max(5, Math.min(95, baseProfile.marketRisk + (productAdj.marketRisk || 0)))
  }

  const overallRisk = Math.round(
    (adjustedRisks.politicalRisk + adjustedRisks.economicRisk + adjustedRisks.complianceRisk + adjustedRisks.marketRisk) / 4
  )

  return {
    overallRisk,
    ...adjustedRisks,
    tariffRate: baseProfile.tariffRate,
    marketSize: baseProfile.marketSize,
    opportunities: baseProfile.opportunities,
    warnings: baseProfile.warnings,
    recommendations: [
      `Consider ${overallRisk > 50 ? 'comprehensive' : 'standard'} risk insurance for ${country}`,
      `Establish local partnerships to navigate ${product} market requirements`,
      `Monitor ${overallRisk > 40 ? 'closely' : 'regularly'} the political and economic situation`,
      `Ensure compliance with ${country}'s ${product} import regulations`
    ]
  }
}

function generateRecommendations(riskData: any, economicData: any): string[] {
  const recommendations = []
  
  if (riskData?.POLITICAL_RISK_SCORE > 60) {
    recommendations.push("Consider political risk insurance due to high political instability")
  }
  
  if (economicData?.INFLATION_RATE > 5) {
    recommendations.push("Implement currency hedging strategies due to high inflation")
  }
  
  if (riskData?.COMPLIANCE_RISK_SCORE > 50) {
    recommendations.push("Engage local compliance experts for regulatory navigation")
  }
  
  recommendations.push("Monitor real-time market conditions through analytics dashboard")
  
  return recommendations.length > 0 ? recommendations : [
    "Consider trade credit insurance for political risk mitigation",
    "Establish local partnerships to navigate regulatory requirements",
    "Monitor currency fluctuations and consider hedging strategies"
  ]
}

function generateWarnings(riskData: any, economicData: any, complianceUpdates: any[]): string[] {
  const warnings = []
  
  if (economicData?.GDP_GROWTH_RATE < 2) {
    warnings.push("Economic growth slowdown may impact market demand")
  }
  
  if (complianceUpdates?.length > 0) {
    warnings.push(`${complianceUpdates.length} new regulatory changes effective soon`)
  }
  
  if (riskData?.MARKET_RISK_SCORE > 70) {
    warnings.push("High market volatility detected in recent trading data")
  }
  
  return warnings.length > 0 ? warnings : [
    "Recent changes in import duties may affect profitability",
    "Political tensions could impact trade relationships",
    "Currency volatility observed in the past 6 months"
  ]
}

function generateOpportunities(riskData: any, marketSentiment: any): string[] {
  const opportunities = []
  
  if (marketSentiment?.AVG_SENTIMENT > 0.6) {
    opportunities.push("Positive market sentiment indicates favorable conditions")
  }
  
  if (riskData?.OPPORTUNITY_SCORE > 80) {
    opportunities.push("High opportunity score based on real-time market analysis")
  }
  
  opportunities.push("Market data shows emerging growth trends")
  
  return opportunities.length > 0 ? opportunities : [
    "Growing demand for your product category",
    "Government incentives for foreign investment",
    "Emerging middle class with increased purchasing power"
  ]
}
