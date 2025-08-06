import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const hasCredentials = !!(
      process.env.SAP_HANA_SERVER_NODE &&
      process.env.SAP_HANA_USERNAME &&
      process.env.SAP_HANA_PASSWORD
    )

    const status = {
      hasCredentials,
      serverNode: process.env.SAP_HANA_SERVER_NODE ? 
        `${process.env.SAP_HANA_SERVER_NODE.substring(0, 20)}...` : 
        'Not configured',
      username: process.env.SAP_HANA_USERNAME ? 
        `${process.env.SAP_HANA_USERNAME.substring(0, 5)}***` : 
        'Not configured',
      connectionStatus: hasCredentials ? 'Configured' : 'Not configured',
      dataSource: hasCredentials ? 'SAP HANA Cloud - Real-time' : 'Enhanced Mock Data',
      lastChecked: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: status
    })
  } catch (error) {
    console.error('HANA status check error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to check HANA status',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
