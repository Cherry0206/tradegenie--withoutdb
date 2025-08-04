import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, userId } = body

    console.log("=== DEBUGGING PDF GENERATION ===")
    console.log("Document type received:", type)
    console.log("Type of 'type':", typeof type)
    console.log("Raw data received:", JSON.stringify(data, null, 2))
    console.log("Data keys:", Object.keys(data))
    console.log("=====================================")

    // Validate required parameters
    if (!type) {
      throw new Error("Document type is required")
    }

    if (!data) {
      throw new Error("Document data is required")
    }

    // Import jsPDF dynamically to avoid SSR issues
    const jsPDFModule = await import("jspdf")
    const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default

    // Generate the actual document based on type
    let pdfBuffer: ArrayBuffer
    let fileName: string

    console.log("Attempting to generate document of type:", type)

    switch (type) {
      case "commercial_invoice":
        console.log("Generating Commercial Invoice")
        pdfBuffer = generateCommercialInvoicePDF(data, jsPDF)
        fileName = `commercial_invoice_${Date.now()}.pdf`
        break
      case "proforma_invoice":
        console.log("Generating Proforma Invoice")
        pdfBuffer = generateProformaInvoicePDF(data, jsPDF)
        fileName = `proforma_invoice_${Date.now()}.pdf`
        break
      case "bill_of_lading":
        console.log("Generating Bill of Lading")
        pdfBuffer = generateBillOfLadingPDF(data, jsPDF)
        fileName = `bill_of_lading_${Date.now()}.pdf`
        break
      case "certificate_of_origin":
        console.log("Generating Certificate of Origin")
        pdfBuffer = generateCertificateOfOriginPDF(data, jsPDF)
        fileName = `certificate_of_origin_${Date.now()}.pdf`
        break
      case "packing_list":
        console.log("Generating Packing List")
        pdfBuffer = generatePackingListPDF(data, jsPDF)
        fileName = `packing_list_${Date.now()}.pdf`
        break
      case "sales_contract":
        console.log("Generating Sales Contract")
        pdfBuffer = generateSalesContractPDF(data, jsPDF)
        fileName = `sales_contract_${Date.now()}.pdf`
        break
      default:
        console.error("Unsupported document type:", type)
        console.error(
          "Available types: commercial_invoice, proforma_invoice, bill_of_lading, certificate_of_origin, packing_list, sales_contract",
        )
        throw new Error(
          `Unsupported document type: ${type}. Available types: commercial_invoice, proforma_invoice, bill_of_lading, certificate_of_origin, packing_list, sales_contract`,
        )
    }

    console.log("PDF generation completed successfully")

    // Convert ArrayBuffer to base64
    const uint8Array = new Uint8Array(pdfBuffer)
    const base64PDF = Buffer.from(uint8Array).toString("base64")

    return NextResponse.json({
      success: true,
      message: "Document generated successfully",
      downloadUrl: `data:application/pdf;base64,${base64PDF}`,
      documentId: `doc_${Date.now()}`,
      type,
      fileName,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Document generation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate document",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function generateCommercialInvoicePDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== COMMERCIAL INVOICE DEBUG ===")
  console.log("Data received in generateCommercialInvoicePDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  // Helper function to get value or fallback
  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("COMMERCIAL INVOICE", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Invoice details
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Invoice Number: ${getValue(data.invoiceNumber)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.invoiceDate)}`, 120, yPosition)
  doc.text(`Currency: ${getValue(data.currency, "USD")}`, 160, yPosition)
  yPosition += 15

  // Exporter Information
  doc.setFont("helvetica", "bold")
  doc.text("EXPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.exporterName), 20, yPosition)
  yPosition += 6

  // Handle multi-line exporter address
  const exporterAddress = getValue(data.exporterAddress)
  if (exporterAddress !== "Not specified") {
    const exporterAddressLines = exporterAddress.split("\n")
    exporterAddressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  } else {
    doc.text("Not specified", 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Importer Information
  doc.setFont("helvetica", "bold")
  doc.text("IMPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.importerName), 20, yPosition)
  yPosition += 6

  // Handle multi-line importer address
  const importerAddress = getValue(data.importerAddress)
  if (importerAddress !== "Not specified") {
    const importerAddressLines = importerAddress.split("\n")
    importerAddressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  } else {
    doc.text("Not specified", 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // CNEE Company Information
  if (data.cneeCompanyName || data.cneeAddress) {
    doc.setFont("helvetica", "bold")
    doc.text("CNEE COMPANY:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    doc.text(getValue(data.cneeCompanyName), 20, yPosition)
    yPosition += 6
    if (data.cneeRegistrationDocs) {
      doc.text(`Registration: ${getValue(data.cneeRegistrationDocs)}`, 20, yPosition)
      yPosition += 6
    }
    const cneeAddress = getValue(data.cneeAddress)
    if (cneeAddress !== "Not specified") {
      const cneeAddressLines = cneeAddress.split("\n")
      cneeAddressLines.forEach((line: string) => {
        if (line.trim()) {
          doc.text(line.trim(), 20, yPosition)
          yPosition += 6
        }
      })
    }
    yPosition += 10
  }

  // Delivery Information
  if (data.deliveryTerms || data.deliveryAddress) {
    doc.setFont("helvetica", "bold")
    doc.text("DELIVERY INFORMATION:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    doc.text(`Terms: ${getValue(data.deliveryTerms)}`, 20, yPosition)
    yPosition += 6
    if (data.deliveryAddress) {
      doc.text(`Address: ${getValue(data.deliveryAddress)}`, 20, yPosition)
      yPosition += 6
    }
    if (data.contactPersonName) {
      doc.text(`Contact: ${getValue(data.contactPersonName)}`, 20, yPosition)
      yPosition += 6
    }
    yPosition += 10
  }

  // Contract Information
  if (data.contractNumber || data.paymentTerms) {
    doc.setFont("helvetica", "bold")
    doc.text("CONTRACT INFORMATION:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    doc.text(`Contract Number: ${getValue(data.contractNumber)}`, 20, yPosition)
    yPosition += 6
    doc.text(`Contract Date: ${getValue(data.contractDate)}`, 20, yPosition)
    yPosition += 6
    doc.text(`Payment Terms: ${getValue(data.paymentTerms)}`, 20, yPosition)
    yPosition += 10
  }

  // Items table header
  doc.setFont("helvetica", "bold")
  doc.text("ITEMS:", 20, yPosition)
  yPosition += 10

  // Table headers
  doc.setFontSize(8)
  doc.text("No.", 20, yPosition)
  doc.text("Description", 30, yPosition)
  doc.text("Country", 80, yPosition)
  doc.text("Weight", 100, yPosition)
  doc.text("HS Code", 120, yPosition)
  doc.text("Qty", 140, yPosition)
  doc.text("Unit Price", 155, yPosition)
  doc.text("Total", 175, yPosition)
  yPosition += 8

  // Draw line under headers
  doc.line(20, yPosition - 2, 190, yPosition - 2)
  yPosition += 5

  // Items
  doc.setFont("helvetica", "normal")
  if (data.items && Array.isArray(data.items) && data.items.length > 0) {
    console.log("Processing items:", data.items)
    data.items.forEach((item: any, index: number) => {
      console.log(`Item ${index + 1}:`, item)

      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      doc.text((index + 1).toString(), 20, yPosition)

      // Description with word wrapping
      const description = getValue(item.description)
      const descriptionLines = doc.splitTextToSize(description, 45)
      doc.text(descriptionLines, 30, yPosition)

      doc.text(getValue(item.countryOfOrigin), 80, yPosition)
      doc.text(getValue(item.netWeight, "0"), 100, yPosition)
      doc.text(getValue(item.hsCode), 120, yPosition)
      doc.text(getValue(item.quantity, "0"), 140, yPosition)
      doc.text(getValue(item.unitPrice, "0.00"), 155, yPosition)
      doc.text(getValue(item.totalPrice, "0.00"), 175, yPosition)

      yPosition += Math.max(8, descriptionLines.length * 4)
    })
  } else {
    console.log("No items found or items is not an array")
    doc.text("No items specified", 30, yPosition)
    yPosition += 8
  }

  yPosition += 10

  // Cost breakdown
  doc.setFont("helvetica", "bold")
  doc.text("COST BREAKDOWN:", 20, yPosition)
  yPosition += 10

  doc.setFont("helvetica", "normal")
  const currency = getValue(data.currency, "USD")

  // Calculate goods total
  let goodsTotal = 0
  if (data.items && Array.isArray(data.items)) {
    goodsTotal = data.items.reduce((sum: number, item: any) => {
      return sum + (Number.parseFloat(item.totalPrice) || 0)
    }, 0)
  }

  doc.text(`Goods Total: ${goodsTotal.toFixed(2)} ${currency}`, 20, yPosition)
  yPosition += 6
  doc.text(`Insurance Cost: ${getValue(data.insuranceCost, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 6
  doc.text(`Freight Cost: ${getValue(data.freightCost, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 6

  // Total for payment
  const insuranceCost = Number.parseFloat(data.insuranceCost) || 0
  const freightCost = Number.parseFloat(data.freightCost) || 0
  const totalForPayment = goodsTotal + insuranceCost + freightCost

  doc.setFont("helvetica", "bold")
  doc.text(`TOTAL FOR PAYMENT: ${totalForPayment.toFixed(2)} ${currency}`, 20, yPosition)
  yPosition += 10

  // Weight and signature
  doc.setFont("helvetica", "normal")
  doc.text(`Gross Weight: ${getValue(data.grossWeight, "0")} kg`, 20, yPosition)
  yPosition += 10

  if (data.authorizedRepresentative) {
    doc.text(`Authorized Representative: ${getValue(data.authorizedRepresentative)}`, 20, yPosition)
    yPosition += 6
  }

  console.log("Commercial Invoice PDF generation completed")
  return doc.output("arraybuffer")
}

function generateProformaInvoicePDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== PROFORMA INVOICE DEBUG ===")
  console.log("Data received in generateProformaInvoicePDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("PROFORMA INVOICE", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Invoice details
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Estimate No: ${getValue(data.estimateNo)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.date)}`, 120, yPosition)
  yPosition += 8
  doc.text(`Customer ID: ${getValue(data.customerId)}`, 20, yPosition)
  doc.text(`Expiry Date: ${getValue(data.dateOfExpiry)}`, 120, yPosition)
  yPosition += 15

  // Bill To Information
  doc.setFont("helvetica", "bold")
  doc.text("BILL TO:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.billToCompanyName), 20, yPosition)
  yPosition += 6

  const billToAddress = getValue(data.billToAddress)
  if (billToAddress !== "Not specified") {
    const addressLines = billToAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.billToPhone) {
    doc.text(`Phone: ${getValue(data.billToPhone)}`, 20, yPosition)
    yPosition += 6
  }
  if (data.billToEmail) {
    doc.text(`Email: ${getValue(data.billToEmail)}`, 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Ship To Information
  doc.setFont("helvetica", "bold")
  doc.text("SHIP TO:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.shipToCompanyName), 20, yPosition)
  yPosition += 6

  const shipToAddress = getValue(data.shipToAddress)
  if (shipToAddress !== "Not specified") {
    const addressLines = shipToAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }
  yPosition += 10

  // Shipment Information
  doc.setFont("helvetica", "bold")
  doc.text("SHIPMENT INFORMATION:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`P.O. Number: ${getValue(data.poNumber)}`, 20, yPosition)
  doc.text(`P.O. Date: ${getValue(data.poDate)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Terms: ${getValue(data.terms)}`, 20, yPosition)
  doc.text(`Payment Terms: ${getValue(data.paymentTerms)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Ship Date: ${getValue(data.shipDate)}`, 20, yPosition)
  doc.text(`Mode: ${getValue(data.modeOfTransportation)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Carrier: ${getValue(data.carrier)}`, 20, yPosition)
  yPosition += 15

  // Items table
  doc.setFont("helvetica", "bold")
  doc.text("ITEMS:", 20, yPosition)
  yPosition += 10

  // Table headers
  doc.setFontSize(8)
  doc.text("Item/Part", 20, yPosition)
  doc.text("Description", 60, yPosition)
  doc.text("Qty", 120, yPosition)
  doc.text("Unit Price", 140, yPosition)
  doc.text("Total", 170, yPosition)
  yPosition += 8

  doc.line(20, yPosition - 2, 190, yPosition - 2)
  yPosition += 5

  // Items
  doc.setFont("helvetica", "normal")
  if (data.items && Array.isArray(data.items) && data.items.length > 0) {
    data.items.forEach((item: any, index: number) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      doc.text(getValue(item.itemPart), 20, yPosition)
      doc.text(getValue(item.description), 60, yPosition)
      doc.text(getValue(item.qty, "0"), 120, yPosition)
      doc.text(getValue(item.unitPrice, "0.00"), 140, yPosition)
      doc.text(getValue(item.total, "0.00"), 170, yPosition)
      yPosition += 8
    })
  } else {
    doc.text("No items specified", 60, yPosition)
    yPosition += 8
  }

  yPosition += 10

  // Totals
  doc.setFont("helvetica", "bold")
  doc.text("TOTALS:", 20, yPosition)
  yPosition += 10

  doc.setFont("helvetica", "normal")
  const currency = getValue(data.currency, "USD")
  doc.text(`Subtotal: ${getValue(data.subtotal, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 6
  doc.text(`Total Tax: ${getValue(data.totalTax, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 6
  doc.text(`Shipping/Handling: ${getValue(data.shippingHandling, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 6

  doc.setFont("helvetica", "bold")
  doc.text(`QUOTE TOTAL: ${getValue(data.quoteTotal, "0.00")} ${currency}`, 20, yPosition)
  yPosition += 15

  // Special Notes
  if (data.specialNotes) {
    doc.setFont("helvetica", "bold")
    doc.text("SPECIAL NOTES:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const notesLines = doc.splitTextToSize(getValue(data.specialNotes), 150)
    doc.text(notesLines, 20, yPosition)
    yPosition += notesLines.length * 6 + 10
  }

  // Signature
  if (data.signature) {
    doc.text(`Signature: ${getValue(data.signature)}`, 20, yPosition)
    yPosition += 6
    doc.text(`Date: ${getValue(data.signatureDate)}`, 20, yPosition)
  }

  console.log("Proforma Invoice PDF generation completed")
  return doc.output("arraybuffer")
}

function generateBillOfLadingPDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== BILL OF LADING DEBUG ===")
  console.log("Data received in generateBillOfLadingPDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("BILL OF LADING", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Header details
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`BOL Number: ${getValue(data.billOfLadingNumber)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.date)}`, 120, yPosition)
  doc.text(`Page: ${getValue(data.page, "1")}`, 160, yPosition)
  yPosition += 15

  // Ship From
  doc.setFont("helvetica", "bold")
  doc.text("SHIP FROM:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.exporterName), 20, yPosition)
  yPosition += 6

  const exporterAddress = getValue(data.exporterAddress)
  if (exporterAddress !== "Not specified") {
    const addressLines = exporterAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.shipFromCityStateZip) {
    doc.text(getValue(data.shipFromCityStateZip), 20, yPosition)
    yPosition += 6
  }

  if (data.shipFromFOB) {
    doc.text("FOB Point: Yes", 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Ship To
  doc.setFont("helvetica", "bold")
  doc.text("SHIP TO:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.importerName), 20, yPosition)
  yPosition += 6

  const importerAddress = getValue(data.importerAddress)
  if (importerAddress !== "Not specified") {
    const addressLines = importerAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.shipToCityStateZip) {
    doc.text(getValue(data.shipToCityStateZip), 20, yPosition)
    yPosition += 6
  }

  if (data.shipToLocationNumber) {
    doc.text(`Location Number: ${getValue(data.shipToLocationNumber)}`, 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Carrier Information
  doc.setFont("helvetica", "bold")
  doc.text("CARRIER INFORMATION:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Carrier: ${getValue(data.carrierName)}`, 20, yPosition)
  yPosition += 6
  doc.text(`Trailer Number: ${getValue(data.trailerNumber)}`, 20, yPosition)
  doc.text(`SCAC: ${getValue(data.scac)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Seal Numbers: ${getValue(data.sealNumbers)}`, 20, yPosition)
  doc.text(`Pro Number: ${getValue(data.proNumber)}`, 120, yPosition)
  yPosition += 15

  // Freight Terms
  doc.setFont("helvetica", "bold")
  doc.text("FREIGHT TERMS:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Charge Terms: ${getValue(data.freightChargeTerms)}`, 20, yPosition)
  doc.text(`Freight Party: ${getValue(data.freightParty)}`, 120, yPosition)
  yPosition += 15

  // Special Instructions
  if (data.specialInstructions) {
    doc.setFont("helvetica", "bold")
    doc.text("SPECIAL INSTRUCTIONS:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const instructionsLines = doc.splitTextToSize(getValue(data.specialInstructions), 150)
    doc.text(instructionsLines, 20, yPosition)
    yPosition += instructionsLines.length * 6 + 15
  }

  // Totals
  doc.setFont("helvetica", "bold")
  doc.text("TOTALS:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Total Packages: ${getValue(data.grandTotalPackages, "0")}`, 20, yPosition)
  yPosition += 6
  doc.text(`Total Weight: ${getValue(data.grandTotalWeight, "0")}`, 20, yPosition)
  yPosition += 6
  doc.text(`COD Amount: $${getValue(data.codAmount, "0.00")}`, 20, yPosition)
  yPosition += 15

  // Signatures
  doc.setFont("helvetica", "bold")
  doc.text("SIGNATURES:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Shipper: ${getValue(data.shipperSignature)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.shipperDate)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Carrier: ${getValue(data.carrierSignature)}`, 20, yPosition)
  doc.text(`Pickup Date: ${getValue(data.carrierPickupDate)}`, 120, yPosition)

  console.log("Bill of Lading PDF generation completed")
  return doc.output("arraybuffer")
}

function generateCertificateOfOriginPDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== CERTIFICATE OF ORIGIN DEBUG ===")
  console.log("Data received in generateCertificateOfOriginPDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("CERTIFICATE OF ORIGIN", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Blanket period
  if (data.blanketPeriodFrom || data.blanketPeriodTo) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Blanket Period: ${getValue(data.blanketPeriodFrom)} to ${getValue(data.blanketPeriodTo)}`, 20, yPosition)
    yPosition += 15
  }

  // Exporter Information
  doc.setFont("helvetica", "bold")
  doc.text("EXPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.exporterName), 20, yPosition)
  yPosition += 6

  const exporterAddress = getValue(data.exporterAddress)
  if (exporterAddress !== "Not specified") {
    const addressLines = exporterAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.exporterTaxId) {
    doc.text(`Tax ID: ${getValue(data.exporterTaxId)}`, 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Producer Information
  if (data.producerName) {
    doc.setFont("helvetica", "bold")
    doc.text("PRODUCER:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    doc.text(getValue(data.producerName), 20, yPosition)
    yPosition += 6

    if (data.producerAddress) {
      const producerAddress = getValue(data.producerAddress)
      if (producerAddress !== "Not specified") {
        const addressLines = producerAddress.split("\n")
        addressLines.forEach((line: string) => {
          if (line.trim()) {
            doc.text(line.trim(), 20, yPosition)
            yPosition += 6
          }
        })
      }
    }

    if (data.producerTaxId) {
      doc.text(`Tax ID: ${getValue(data.producerTaxId)}`, 20, yPosition)
      yPosition += 6
    }
    yPosition += 10
  }

  // Importer Information
  doc.setFont("helvetica", "bold")
  doc.text("IMPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.importerName), 20, yPosition)
  yPosition += 6

  const importerAddress = getValue(data.importerAddress)
  if (importerAddress !== "Not specified") {
    const addressLines = importerAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }
  yPosition += 10

  // Goods Items
  if (data.goodsItems && Array.isArray(data.goodsItems) && data.goodsItems.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.text("GOODS:", 20, yPosition)
    yPosition += 10

    // Table headers
    doc.setFontSize(8)
    doc.text("Description", 20, yPosition)
    doc.text("Tariff Class", 80, yPosition)
    doc.text("Criterion", 120, yPosition)
    doc.text("Country", 150, yPosition)
    yPosition += 8

    doc.line(20, yPosition - 2, 190, yPosition - 2)
    yPosition += 5

    // Items
    doc.setFont("helvetica", "normal")
    data.goodsItems.forEach((item: any, index: number) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      const description = getValue(item.description)
      const descLines = doc.splitTextToSize(description, 55)
      doc.text(descLines, 20, yPosition)
      doc.text(getValue(item.tariffClassification), 80, yPosition)
      doc.text(getValue(item.preferenceCriterion), 120, yPosition)
      doc.text(getValue(item.countryOfOrigin), 150, yPosition)
      yPosition += Math.max(8, descLines.length * 4)
    })
    yPosition += 10
  }

  // Certification
  if (data.certificationText) {
    doc.setFont("helvetica", "bold")
    doc.text("CERTIFICATION:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const certLines = doc.splitTextToSize(getValue(data.certificationText), 150)
    doc.text(certLines, 20, yPosition)
    yPosition += certLines.length * 6 + 15
  }

  // Authorized Signature
  doc.setFont("helvetica", "bold")
  doc.text("AUTHORIZED SIGNATURE:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Name: ${getValue(data.authorizedName)}`, 20, yPosition)
  doc.text(`Title: ${getValue(data.authorizedTitle)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Company: ${getValue(data.authorizedCompany)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.authorizedDate)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Phone: ${getValue(data.authorizedPhone)}`, 20, yPosition)
  doc.text(`Fax: ${getValue(data.authorizedFax)}`, 120, yPosition)

  console.log("Certificate of Origin PDF generation completed")
  return doc.output("arraybuffer")
}

function generatePackingListPDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== PACKING LIST DEBUG ===")
  console.log("Data received in generatePackingListPDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("EXPORT PACKING LIST", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Shipment Information
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Shipment Date: ${getValue(data.shipmentDate)}`, 20, yPosition)
  doc.text(`Invoice Number: ${getValue(data.invoiceNumber)}`, 120, yPosition)
  yPosition += 8
  doc.text(`Order Number: ${getValue(data.orderNumber)}`, 20, yPosition)
  yPosition += 15

  // Exporter Information
  doc.setFont("helvetica", "bold")
  doc.text("EXPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.exporterName), 20, yPosition)
  yPosition += 6

  const exporterAddress = getValue(data.exporterAddress)
  if (exporterAddress !== "Not specified") {
    const addressLines = exporterAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }
  yPosition += 10

  // Importer Information
  doc.setFont("helvetica", "bold")
  doc.text("IMPORTER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.importerName), 20, yPosition)
  yPosition += 6

  const importerAddress = getValue(data.importerAddress)
  if (importerAddress !== "Not specified") {
    const addressLines = importerAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }
  yPosition += 10

  // Container Information
  if (data.containerNumber || data.sealNumber) {
    doc.setFont("helvetica", "bold")
    doc.text("CONTAINER INFORMATION:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    doc.text(`Container Number: ${getValue(data.containerNumber)}`, 20, yPosition)
    doc.text(`Seal Number: ${getValue(data.sealNumber)}`, 120, yPosition)
    yPosition += 15
  }

  // Product Description
  if (data.productDescription) {
    doc.setFont("helvetica", "bold")
    doc.text("PRODUCT DESCRIPTION:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const productLines = doc.splitTextToSize(getValue(data.productDescription), 150)
    doc.text(productLines, 20, yPosition)
    yPosition += productLines.length * 6 + 15
  }

  // Packing Summary
  doc.setFont("helvetica", "bold")
  doc.text("PACKING SUMMARY:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Number of Packages: ${getValue(data.numberOfPackages)}`, 20, yPosition)
  doc.text(`Type of Packaging: ${getValue(data.typeOfPackaging)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Gross Weight: ${getValue(data.grossWeight)} kg`, 20, yPosition)
  doc.text(`Net Weight: ${getValue(data.netWeight)} kg`, 120, yPosition)
  yPosition += 6
  doc.text(`Dimensions: ${getValue(data.dimensions)}`, 20, yPosition)
  yPosition += 15

  // Packing Items
  if (data.packingItems && Array.isArray(data.packingItems) && data.packingItems.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.text("PACKING ITEMS:", 20, yPosition)
    yPosition += 10

    // Table headers
    doc.setFontSize(8)
    doc.text("Item #", 20, yPosition)
    doc.text("Description", 40, yPosition)
    doc.text("Qty", 90, yPosition)
    doc.text("Unit", 110, yPosition)
    doc.text("Net Wt", 130, yPosition)
    doc.text("Gross Wt", 150, yPosition)
    doc.text("Pkg Type", 170, yPosition)
    yPosition += 8

    doc.line(20, yPosition - 2, 190, yPosition - 2)
    yPosition += 5

    // Items
    doc.setFont("helvetica", "normal")
    data.packingItems.forEach((item: any, index: number) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      doc.text(getValue(item.itemNumber, (index + 1).toString()), 20, yPosition)
      const description = getValue(item.description)
      const descLines = doc.splitTextToSize(description, 45)
      doc.text(descLines, 40, yPosition)
      doc.text(getValue(item.quantity, "0"), 90, yPosition)
      doc.text(getValue(item.unitOfMeasure, "PCS"), 110, yPosition)
      doc.text(getValue(item.netWeight, "0"), 130, yPosition)
      doc.text(getValue(item.grossWeight, "0"), 150, yPosition)
      doc.text(getValue(item.packageType, "Carton"), 170, yPosition)
      yPosition += Math.max(8, descLines.length * 4)
    })
    yPosition += 10
  }

  // Packing Details
  if (data.packingDetails) {
    doc.setFont("helvetica", "bold")
    doc.text("PACKING DETAILS:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const packingLines = doc.splitTextToSize(getValue(data.packingDetails), 150)
    doc.text(packingLines, 20, yPosition)
    yPosition += packingLines.length * 6 + 10
  }

  // Markings and Numbers
  if (data.markingsAndNumbers) {
    doc.setFont("helvetica", "bold")
    doc.text("MARKINGS AND NUMBERS:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")
    const markingsLines = doc.splitTextToSize(getValue(data.markingsAndNumbers), 150)
    doc.text(markingsLines, 20, yPosition)
  }

  console.log("Packing List PDF generation completed")
  return doc.output("arraybuffer")
}

function generateSalesContractPDF(data: any, jsPDF: any): ArrayBuffer {
  console.log("=== SALES CONTRACT DEBUG ===")
  console.log("Data received in generateSalesContractPDF:", JSON.stringify(data, null, 2))

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  const getValue = (value: any, fallback = "Not specified") => {
    if (value === null || value === undefined || value === "" || value === "undefined") {
      return fallback
    }
    const result = value.toString().trim()
    return result || fallback
  }

  // Header
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("SALES CONTRACT", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Contract Information
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Contract Number: ${getValue(data.contractNumber)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.contractDate)}`, 120, yPosition)
  yPosition += 8
  if (data.contractTitle) {
    doc.text(`Title: ${getValue(data.contractTitle)}`, 20, yPosition)
    yPosition += 8
  }
  yPosition += 10

  // Seller Information
  doc.setFont("helvetica", "bold")
  doc.text("SELLER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.exporterName), 20, yPosition)
  yPosition += 6

  const exporterAddress = getValue(data.exporterAddress)
  if (exporterAddress !== "Not specified") {
    const addressLines = exporterAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.sellerRepresentative) {
    doc.text(`Representative: ${getValue(data.sellerRepresentative)}`, 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Buyer Information
  doc.setFont("helvetica", "bold")
  doc.text("BUYER:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(getValue(data.importerName), 20, yPosition)
  yPosition += 6

  const importerAddress = getValue(data.importerAddress)
  if (importerAddress !== "Not specified") {
    const addressLines = importerAddress.split("\n")
    addressLines.forEach((line: string) => {
      if (line.trim()) {
        doc.text(line.trim(), 20, yPosition)
        yPosition += 6
      }
    })
  }

  if (data.buyerRepresentative) {
    doc.text(`Representative: ${getValue(data.buyerRepresentative)}`, 20, yPosition)
    yPosition += 6
  }
  yPosition += 10

  // Commercial Terms
  doc.setFont("helvetica", "bold")
  doc.text("COMMERCIAL TERMS:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Delivery Terms: ${getValue(data.deliveryTerms)}`, 20, yPosition)
  doc.text(`Payment Terms: ${getValue(data.paymentTerms)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Currency: ${getValue(data.currency, "USD")}`, 20, yPosition)
  yPosition += 15

  // Delivery Information
  doc.setFont("helvetica", "bold")
  doc.text("DELIVERY INFORMATION:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Delivery Date: ${getValue(data.deliveryDate)}`, 20, yPosition)
  doc.text(`Location: ${getValue(data.deliveryLocation)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Port of Loading: ${getValue(data.portOfLoading)}`, 20, yPosition)
  doc.text(`Port of Discharge: ${getValue(data.portOfDischarge)}`, 120, yPosition)
  yPosition += 15

  // Contract Items
  if (data.contractItems && Array.isArray(data.contractItems) && data.contractItems.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.text("CONTRACT ITEMS:", 20, yPosition)
    yPosition += 10

    // Table headers
    doc.setFontSize(8)
    doc.text("Item #", 20, yPosition)
    doc.text("Description", 40, yPosition)
    doc.text("Qty", 100, yPosition)
    doc.text("Unit Price", 120, yPosition)
    doc.text("Total", 150, yPosition)
    doc.text("Schedule", 170, yPosition)
    yPosition += 8

    doc.line(20, yPosition - 2, 190, yPosition - 2)
    yPosition += 5

    // Items
    doc.setFont("helvetica", "normal")
    data.contractItems.forEach((item: any, index: number) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      doc.text(getValue(item.itemNumber, (index + 1).toString()), 20, yPosition)
      const description = getValue(item.description)
      const descLines = doc.splitTextToSize(description, 55)
      doc.text(descLines, 40, yPosition)
      doc.text(getValue(item.quantity, "0"), 100, yPosition)
      doc.text(getValue(item.unitPrice, "0.00"), 120, yPosition)
      doc.text(getValue(item.totalPrice, "0.00"), 150, yPosition)
      doc.text(getValue(item.deliverySchedule), 170, yPosition)
      yPosition += Math.max(8, descLines.length * 4)
    })
    yPosition += 10
  }

  // Total Contract Value
  doc.setFont("helvetica", "bold")
  doc.text(
    `TOTAL CONTRACT VALUE: ${getValue(data.totalContractValue, "0.00")} ${getValue(data.currency, "USD")}`,
    20,
    yPosition,
  )
  yPosition += 15

  // Terms and Conditions
  if (data.qualityTerms || data.inspectionTerms || data.insuranceTerms) {
    doc.setFont("helvetica", "bold")
    doc.text("TERMS AND CONDITIONS:", 20, yPosition)
    yPosition += 8
    doc.setFont("helvetica", "normal")

    if (data.qualityTerms) {
      doc.text("Quality Terms:", 20, yPosition)
      yPosition += 6
      const qualityLines = doc.splitTextToSize(getValue(data.qualityTerms), 150)
      doc.text(qualityLines, 20, yPosition)
      yPosition += qualityLines.length * 6 + 8
    }

    if (data.inspectionTerms) {
      doc.text("Inspection Terms:", 20, yPosition)
      yPosition += 6
      const inspectionLines = doc.splitTextToSize(getValue(data.inspectionTerms), 150)
      doc.text(inspectionLines, 20, yPosition)
      yPosition += inspectionLines.length * 6 + 8
    }

    if (data.insuranceTerms) {
      doc.text("Insurance Terms:", 20, yPosition)
      yPosition += 6
      const insuranceLines = doc.splitTextToSize(getValue(data.insuranceTerms), 150)
      doc.text(insuranceLines, 20, yPosition)
      yPosition += insuranceLines.length * 6 + 8
    }
    yPosition += 10
  }

  // Signatures
  doc.setFont("helvetica", "bold")
  doc.text("SIGNATURES:", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.text(`Seller: ${getValue(data.sellerSignature)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.sellerDate)}`, 120, yPosition)
  yPosition += 6
  doc.text(`Buyer: ${getValue(data.buyerSignature)}`, 20, yPosition)
  doc.text(`Date: ${getValue(data.buyerDate)}`, 120, yPosition)

  console.log("Sales Contract PDF generation completed")
  return doc.output("arraybuffer")
}
