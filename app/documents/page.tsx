"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Sparkles, ArrowLeft, Plus, Clock, Eye, Trash2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface BaseDocumentForm {
  type: string
  exporterName: string
  exporterAddress: string
  importerName: string
  importerAddress: string
}

interface CommercialInvoiceForm extends BaseDocumentForm {
  // Invoice Address Section
  cneeCompanyName: string
  cneeRegistrationDocs: string
  cneeAddress: string

  // Ship To Section
  deliveryAddress: string
  contactPersonName: string
  contactPersonPhone: string

  // Delivery Terms Section
  deliveryTerms: string
  tradeContract: string

  // Delivered Under Section
  contractNumber: string
  contractDate: string
  paymentTerms: string

  // Product Details
  items: Array<{
    description: string
    countryOfOrigin: string
    netWeight: string
    hsCode: string
    quantity: string
    unitPrice: string
    totalPrice: string
    purposeOfUse: string
    material: string
    tradeMark: string
    modelPart: string
    serialNumber: string
    technicalParameters: string
    chemicalComposition: string
  }>

  // Cost Details
  insuranceCost: string
  freightCost: string
  totalForPayment: string
  grossWeight: string

  // Signature
  authorizedRepresentative: string
  companyStamp: string

  currency: string
  invoiceNumber: string
  invoiceDate: string
}

interface BillOfLadingForm extends BaseDocumentForm {
  // Header Information
  date: string
  page: string
  billOfLadingNumber: string

  // Ship From Information
  shipFromName: string
  shipFromAddress: string
  shipFromCityStateZip: string
  shipFromFOB: boolean

  // Ship To Information
  shipToName: string
  shipToAddress: string
  shipToCityStateZip: string
  shipToLocationNumber: string
  shipToFOB: boolean

  // Third Party Freight Charges
  thirdPartyName: string
  thirdPartyAddress: string
  thirdPartyCityStateZip: string

  // Carrier Information
  carrierName: string
  trailerNumber: string
  sealNumbers: string
  scac: string
  proNumber: string

  // Special Instructions
  specialInstructions: string

  // Freight Charge Terms
  freightChargeTerms: string // "prepaid" or "collect"
  freightParty: string // "1st_party", "2nd_party", "3rd_party"

  // Shipment Items
  shipmentItems: Array<{
    customerOrderNumber: string
    packages: string
    customerOrderWeight: string
    palletSlip: boolean
    additionalShipperInfo: string
  }>

  // Handling and Package Information
  handlingPackageItems: Array<{
    handlingUnitQty: string
    handlingUnitType: string
    packageQty: string
    packageType: string
    weight: string
    hazardousMaterial: boolean
    commodityDescription: string
    nmfcNumber: string
    class: string
  }>

  // Totals
  grandTotalPackages: string
  grandTotalWeight: string
  codAmount: string

  // Signatures
  shipperSignature: string
  shipperDate: string
  trailerLoaded: boolean
  trailerLoadedBy: string
  freightCounted: boolean
  freightCountedBy: string
  carrierSignature: string
  carrierPickupDate: string
}

interface CertificateOfOriginForm extends BaseDocumentForm {
  // Header Information
  blanketPeriodFrom: string
  blanketPeriodTo: string

  // Exporter Information (already covered in base)
  exporterTaxId: string

  // Producer Information
  producerName: string
  producerAddress: string
  producerTaxId: string

  // Importer Information (already covered in base)

  // Goods Information
  goodsItems: Array<{
    description: string
    tariffClassification: string
    preferenceCriterion: string
    producer: string
    netCost: string
    countryOfOrigin: string
  }>

  // Certification
  certificationText: string

  // Authorized Signature
  authorizedName: string
  authorizedTitle: string
  authorizedDate: string
  authorizedPhone: string
  authorizedCompany: string
  authorizedFax: string
  customsForm: string
}

interface PackingListForm extends BaseDocumentForm {
  // Shipment Information
  shipmentDate: string
  invoiceNumber: string
  orderNumber: string

  // Product Information
  productDescription: string
  packingDetails: string
  numberOfPackages: string
  typeOfPackaging: string
  grossWeight: string
  netWeight: string
  dimensions: string
  markingsAndNumbers: string

  // Container Information
  containerNumber: string
  sealNumber: string

  // Items
  packingItems: Array<{
    itemNumber: string
    description: string
    quantity: string
    unitOfMeasure: string
    netWeight: string
    grossWeight: string
    dimensions: string
    packageType: string
    packageCount: string
  }>
}

interface ProformaInvoiceForm extends BaseDocumentForm {
  // Header Information
  page: string
  date: string
  dateOfExpiry: string
  estimateNo: string
  customerId: string

  // Bill To Information
  billToCompanyName: string
  billToAddress: string
  billToPhone: string
  billToEmail: string

  // Ship To Information
  shipToCompanyName: string
  shipToAddress: string
  shipToPhone: string

  // Shipment Information
  poNumber: string
  poDate: string
  letterOfCredit: string
  terms: string
  paymentTerms: string
  shipDate: string
  modeOfTransportation: string
  transportationTerms: string
  numberOfPackages: string
  grossWeight: string
  estNetWeight: string
  carrier: string

  // Items
  items: Array<{
    itemPart: string
    description: string
    qty: string
    unitPrice: string
    salesTax: string
    total: string
  }>

  // Totals
  subtotal: string
  subtotalLessDiscount: string
  subjectToSalesTax: string
  salesTax: string
  totalTax: string
  shippingHandling: string
  miscellaneous: string
  other1: string
  other2: string
  quoteTotal: string

  // Special Notes
  specialNotes: string
  termsOfSale: string
  declarationText: string
  signature: string
  signatureDate: string

  currency: string
}

interface SalesContractForm extends BaseDocumentForm {
  // Contract Information
  contractNumber: string
  contractDate: string
  contractTitle: string

  // Parties Information
  sellerRepresentative: string
  buyerRepresentative: string

  // Commercial Terms
  deliveryTerms: string
  paymentTerms: string
  currency: string
  totalContractValue: string

  // Delivery Information
  deliveryDate: string
  deliveryLocation: string
  portOfLoading: string
  portOfDischarge: string

  // Product Information
  contractItems: Array<{
    itemNumber: string
    description: string
    specifications: string
    quantity: string
    unitPrice: string
    totalPrice: string
    deliverySchedule: string
  }>

  // Terms and Conditions
  qualityTerms: string
  inspectionTerms: string
  insuranceTerms: string
  forceMAjeure: string
  disputeResolution: string

  // Signatures
  sellerSignature: string
  sellerDate: string
  buyerSignature: string
  buyerDate: string
}

type DocumentForm =
  | CommercialInvoiceForm
  | BillOfLadingForm
  | CertificateOfOriginForm
  | PackingListForm
  | ProformaInvoiceForm
  | SalesContractForm

export default function DocumentsPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedDocType, setSelectedDocType] = useState("")
  const [formData, setFormData] = useState<any>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocs, setGeneratedDocs] = useState<any[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const documentTypes = [
    {
      value: "commercial_invoice",
      label: "Commercial Invoice",
      description: "Standard invoice for international trade",
      icon: "📄",
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      value: "proforma_invoice",
      label: "Proforma Invoice",
      description: "Preliminary invoice for customs",
      icon: "📋",
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      value: "bill_of_lading",
      label: "Bill of Lading",
      description: "Shipping document and receipt",
      icon: "🚢",
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
      value: "certificate_of_origin",
      label: "Certificate of Origin",
      description: "Document certifying product origin",
      icon: "🌍",
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      value: "packing_list",
      label: "Export Packing List",
      description: "Detailed list of shipped items",
      icon: "📦",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
    },
    {
      value: "sales_contract",
      label: "Sales Contract",
      description: "Agreement between buyer and seller",
      icon: "📝",
      color: "bg-pink-50 border-pink-200 text-pink-800",
    },
  ]

  const initializeFormData = (docType: string) => {
    const baseData = {
      type: docType,
      exporterName: "",
      exporterAddress: "",
      importerName: "",
      importerAddress: "",
    }

    switch (docType) {
      case "commercial_invoice":
        return {
          ...baseData,
          // Invoice Address Section
          cneeCompanyName: "",
          cneeRegistrationDocs: "",
          cneeAddress: "",

          // Ship To Section
          deliveryAddress: "",
          contactPersonName: "",
          contactPersonPhone: "",

          // Delivery Terms Section
          deliveryTerms: "FOB",
          tradeContract: "",

          // Delivered Under Section
          contractNumber: "",
          contractDate: new Date().toISOString().split("T")[0],
          paymentTerms: "30 days",

          // Product Details
          items: [
            {
              description: "",
              countryOfOrigin: "",
              netWeight: "",
              hsCode: "",
              quantity: "",
              unitPrice: "",
              totalPrice: "",
              purposeOfUse: "",
              material: "",
              tradeMark: "",
              modelPart: "",
              serialNumber: "",
              technicalParameters: "",
              chemicalComposition: "",
            },
          ],

          // Cost Details
          insuranceCost: "",
          freightCost: "",
          totalForPayment: "",
          grossWeight: "",

          // Signature
          authorizedRepresentative: "",
          companyStamp: "",

          currency: "USD",
          invoiceNumber: "",
          invoiceDate: new Date().toISOString().split("T")[0],
        }
      case "proforma_invoice":
        return {
          ...baseData,
          // Header Information
          page: "1",
          date: new Date().toISOString().split("T")[0],
          dateOfExpiry: "",
          estimateNo: "",
          customerId: "",

          // Bill To Information
          billToCompanyName: "",
          billToAddress: "",
          billToPhone: "",
          billToEmail: "",

          // Ship To Information
          shipToCompanyName: "",
          shipToAddress: "",
          shipToPhone: "",

          // Shipment Information
          poNumber: "",
          poDate: "",
          letterOfCredit: "",
          terms: "FOB",
          paymentTerms: "30 days",
          shipDate: "",
          modeOfTransportation: "",
          transportationTerms: "",
          numberOfPackages: "",
          grossWeight: "",
          estNetWeight: "",
          carrier: "",

          // Items
          items: [
            {
              itemPart: "",
              description: "",
              qty: "",
              unitPrice: "",
              salesTax: "",
              total: "",
            },
          ],

          // Totals
          subtotal: "",
          subtotalLessDiscount: "",
          subjectToSalesTax: "",
          salesTax: "",
          totalTax: "",
          shippingHandling: "",
          miscellaneous: "",
          other1: "",
          other2: "",
          quoteTotal: "",

          // Special Notes
          specialNotes: "",
          termsOfSale: "",
          declarationText: "I declare that the above information is true and correct to the best of my knowledge.",
          signature: "",
          signatureDate: new Date().toISOString().split("T")[0],

          currency: "USD",
        }
      case "bill_of_lading":
        return {
          ...baseData,
          // Header Information
          date: new Date().toISOString().split("T")[0],
          page: "1",
          billOfLadingNumber: "",

          // Ship From Information
          shipFromName: "",
          shipFromAddress: "",
          shipFromCityStateZip: "",
          shipFromFOB: false,

          // Ship To Information
          shipToName: "",
          shipToAddress: "",
          shipToCityStateZip: "",
          shipToLocationNumber: "",
          shipToFOB: false,

          // Third Party Freight Charges
          thirdPartyName: "",
          thirdPartyAddress: "",
          thirdPartyCityStateZip: "",

          // Carrier Information
          carrierName: "",
          trailerNumber: "",
          sealNumbers: "",
          scac: "",
          proNumber: "",

          // Special Instructions
          specialInstructions: "",

          // Freight Charge Terms
          freightChargeTerms: "prepaid",
          freightParty: "1st_party",

          // Shipment Items
          shipmentItems: [
            {
              customerOrderNumber: "",
              packages: "",
              customerOrderWeight: "",
              palletSlip: false,
              additionalShipperInfo: "",
            },
          ],

          // Handling and Package Information
          handlingPackageItems: [
            {
              handlingUnitQty: "",
              handlingUnitType: "",
              packageQty: "",
              packageType: "",
              weight: "",
              hazardousMaterial: false,
              commodityDescription: "",
              nmfcNumber: "",
              class: "",
            },
          ],

          // Totals
          grandTotalPackages: "",
          grandTotalWeight: "",
          codAmount: "",

          // Signatures
          shipperSignature: "",
          shipperDate: new Date().toISOString().split("T")[0],
          trailerLoaded: false,
          trailerLoadedBy: "",
          freightCounted: false,
          freightCountedBy: "",
          carrierSignature: "",
          carrierPickupDate: "",
        }
      case "certificate_of_origin":
        return {
          ...baseData,
          // Header Information
          blanketPeriodFrom: "",
          blanketPeriodTo: "",

          // Exporter Information
          exporterTaxId: "",

          // Producer Information
          producerName: "",
          producerAddress: "",
          producerTaxId: "",

          // Goods Information
          goodsItems: [
            {
              description: "",
              tariffClassification: "",
              preferenceCriterion: "",
              producer: "",
              netCost: "",
              countryOfOrigin: "",
            },
          ],

          // Certification
          certificationText:
            "The goods covered in this certificate are based on facts and is accurate and I assume the responsibility for proving such representations. I understand that I am liable for any false statements or material omissions made on or in connection with this certificate.\n\nI agree to maintain and present upon request documentation necessary to support this certificate and to inform, in writing, all persons to whom this certificate was given of any changes that would affect accuracy or validity of this certificate.\n\nThis certificate consists of _____ pages including all attachments.",

          // Authorized Signature
          authorizedName: "",
          authorizedTitle: "",
          authorizedDate: new Date().toISOString().split("T")[0],
          authorizedPhone: "",
          authorizedCompany: "",
          authorizedFax: "",
          customsForm: "",
        }
      case "packing_list":
        return {
          ...baseData,
          // Shipment Information
          shipmentDate: new Date().toISOString().split("T")[0],
          invoiceNumber: "",
          orderNumber: "",

          // Product Information
          productDescription: "",
          packingDetails: "",
          numberOfPackages: "",
          typeOfPackaging: "Cartons",
          grossWeight: "",
          netWeight: "",
          dimensions: "",
          markingsAndNumbers: "",

          // Container Information
          containerNumber: "",
          sealNumber: "",

          // Items
          packingItems: [
            {
              itemNumber: "",
              description: "",
              quantity: "",
              unitOfMeasure: "PCS",
              netWeight: "",
              grossWeight: "",
              dimensions: "",
              packageType: "Carton",
              packageCount: "",
            },
          ],
        }
      case "sales_contract":
        return {
          ...baseData,
          // Contract Information
          contractNumber: "",
          contractDate: new Date().toISOString().split("T")[0],
          contractTitle: "",

          // Parties Information
          sellerRepresentative: "",
          buyerRepresentative: "",

          // Commercial Terms
          deliveryTerms: "FOB",
          paymentTerms: "30 days",
          currency: "USD",
          totalContractValue: "",

          // Delivery Information
          deliveryDate: "",
          deliveryLocation: "",
          portOfLoading: "",
          portOfDischarge: "",

          // Product Information
          contractItems: [
            {
              itemNumber: "",
              description: "",
              specifications: "",
              quantity: "",
              unitPrice: "",
              totalPrice: "",
              deliverySchedule: "",
            },
          ],

          // Terms and Conditions
          qualityTerms: "",
          inspectionTerms: "",
          insuranceTerms: "",
          forceMAjeure: "",
          disputeResolution: "",

          // Signatures
          sellerSignature: "",
          sellerDate: new Date().toISOString().split("T")[0],
          buyerSignature: "",
          buyerDate: "",
        }
      default:
        return baseData
    }
  }

  const handleDocTypeChange = (docType: string) => {
    setSelectedDocType(docType)
    setFormData(initializeFormData(docType))
    setError(null)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (index: number, field: string, value: string, itemType = "items") => {
    setFormData((prev: any) => {
      const newItems = [...(prev[itemType] || [])]
      newItems[index] = { ...newItems[index], [field]: value }

      // Auto-calculate total price for items with quantity and unitPrice
      if ((field === "quantity" || field === "unitPrice") && itemType === "items") {
        const qty =
          field === "quantity" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItems[index].quantity) || 0
        const price =
          field === "unitPrice" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItems[index].unitPrice) || 0
        newItems[index].totalPrice = (qty * price).toFixed(2)
      }

      // Auto-calculate for contract items
      if ((field === "quantity" || field === "unitPrice") && itemType === "contractItems") {
        const qty =
          field === "quantity" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItems[index].quantity) || 0
        const price =
          field === "unitPrice" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItems[index].unitPrice) || 0
        newItems[index].totalPrice = (qty * price).toFixed(2)
      }

      return { ...prev, [itemType]: newItems }
    })
  }

  const addItem = (itemType = "items") => {
    setFormData((prev: any) => {
      let newItem = {}

      switch (itemType) {
        case "items":
          if (selectedDocType === "commercial_invoice") {
            newItem = {
              description: "",
              countryOfOrigin: "",
              netWeight: "",
              hsCode: "",
              quantity: "",
              unitPrice: "",
              totalPrice: "",
              purposeOfUse: "",
              material: "",
              tradeMark: "",
              modelPart: "",
              serialNumber: "",
              technicalParameters: "",
              chemicalComposition: "",
            }
          } else if (selectedDocType === "proforma_invoice") {
            newItem = {
              itemPart: "",
              description: "",
              qty: "",
              unitPrice: "",
              salesTax: "",
              total: "",
            }
          }
          break
        case "packingItems":
          newItem = {
            itemNumber: "",
            description: "",
            quantity: "",
            unitOfMeasure: "PCS",
            netWeight: "",
            grossWeight: "",
            dimensions: "",
            packageType: "Carton",
            packageCount: "",
          }
          break
        case "contractItems":
          newItem = {
            itemNumber: "",
            description: "",
            specifications: "",
            quantity: "",
            unitPrice: "",
            totalPrice: "",
            deliverySchedule: "",
          }
          break
        case "goodsItems":
          newItem = {
            description: "",
            tariffClassification: "",
            preferenceCriterion: "",
            producer: "",
            netCost: "",
            countryOfOrigin: "",
          }
          break
        case "shipmentItems":
          newItem = {
            customerOrderNumber: "",
            packages: "",
            customerOrderWeight: "",
            palletSlip: false,
            additionalShipperInfo: "",
          }
          break
        case "handlingPackageItems":
          newItem = {
            handlingUnitQty: "",
            handlingUnitType: "",
            packageQty: "",
            packageType: "",
            weight: "",
            hazardousMaterial: false,
            commodityDescription: "",
            nmfcNumber: "",
            class: "",
          }
          break
      }

      return {
        ...prev,
        [itemType]: [...(prev[itemType] || []), newItem],
      }
    })
  }

  const removeItem = (index: number, itemType = "items") => {
    setFormData((prev: any) => ({
      ...prev,
      [itemType]: (prev[itemType] || []).filter((_: any, i: number) => i !== index),
    }))
  }

  const calculateTotals = () => {
    if (selectedDocType === "commercial_invoice" && formData.items) {
      const totalGoods = formData.items.reduce(
        (sum: number, item: any) => sum + (Number.parseFloat(item.totalPrice) || 0),
        0,
      )
      const insurance = Number.parseFloat(formData.insuranceCost) || 0
      const freight = Number.parseFloat(formData.freightCost) || 0
      const total = totalGoods + insurance + freight

      setFormData((prev: any) => ({
        ...prev,
        totalForPayment: total.toFixed(2),
      }))
    }

    if (selectedDocType === "sales_contract" && formData.contractItems) {
      const totalValue = formData.contractItems.reduce(
        (sum: number, item: any) => sum + (Number.parseFloat(item.totalPrice) || 0),
        0,
      )

      setFormData((prev: any) => ({
        ...prev,
        totalContractValue: totalValue.toFixed(2),
      }))
    }
  }

  useEffect(() => {
    calculateTotals()
  }, [formData.items, formData.contractItems, formData.insuranceCost, formData.freightCost])

  const downloadPDF = (doc: any) => {
    try {
      if (doc.downloadUrl && doc.downloadUrl.startsWith("data:application/pdf;base64,")) {
        // Create download link
        const link = document.createElement("a")
        link.href = doc.downloadUrl
        link.download = doc.fileName || `${doc.type}_${new Date(doc.generatedAt).toISOString().split("T")[0]}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Download Started",
          description: "Your document is being downloaded.",
        })
      } else {
        throw new Error("Invalid download URL")
      }
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the document. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteDocument = (docId: number) => {
    setGeneratedDocs((prev) => prev.filter((doc) => doc.id !== docId))
    toast({
      title: "Document Deleted",
      description: "The document has been removed from your list.",
    })
  }

  const generateDocument = async () => {
    if (!selectedDocType) {
      setError("Please select a document type")
      return
    }

    // Basic validation
    if (!formData.exporterName || !formData.importerName) {
      setError("Please fill in the required exporter and importer information")
      return
    }

    console.log("=== FRONTEND DEBUG ===")
    console.log("Selected document type:", selectedDocType)
    console.log("Form data being sent:", JSON.stringify(formData, null, 2))
    console.log("Form data keys:", Object.keys(formData))
    console.log("=====================")

    setIsGenerating(true)
    setError(null)

    try {
      const requestBody = {
        type: selectedDocType,
        data: formData,
        userId: user?.id,
      }

      console.log("Request body:", JSON.stringify(requestBody, null, 2))

      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (response.ok && result.success) {
        const newDoc = {
          id: Date.now(),
          type: selectedDocType,
          typeName: documentTypes.find((d) => d.value === selectedDocType)?.label,
          data: formData,
          generatedAt: result.generatedAt,
          downloadUrl: result.downloadUrl,
          fileName: result.fileName,
        }

        setGeneratedDocs((prev) => [newDoc, ...prev])

        toast({
          title: "Document Generated Successfully!",
          description: "Your document is ready for download.",
        })

        // Reset form
        setFormData(initializeFormData(selectedDocType))
      } else {
        throw new Error(result.message || "Failed to generate document")
      }
    } catch (error) {
      console.error("Document generation error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to generate document. Please try again."
      setError(errorMessage)
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const renderCommercialInvoicePreview = () => {
    if (selectedDocType !== "commercial_invoice") return null

    return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm font-mono shadow-sm">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-2">COMMERCIAL INVOICE</h1>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>Invoice #: {formData.invoiceNumber || "Not specified"}</div>
            <div>Date: {formData.invoiceDate || "Not specified"}</div>
            <div>Currency: {formData.currency || "USD"}</div>
          </div>
        </div>

        {/* Address Sections */}
        <div className="grid grid-cols-2 gap-4 mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="border-r border-gray-300 p-4 bg-gray-50">
            <div className="font-bold mb-2 text-gray-800">Invoice Address (CNEE Company):</div>
            <div className="text-xs mb-2 text-gray-600">
              Legal address and name of CNEE company in accordance with registration docs
            </div>
            <div className="mb-2">
              <strong>Company:</strong> {formData.cneeCompanyName || "Not specified"}
            </div>
            <div className="mb-2">
              <strong>Registration:</strong> {formData.cneeRegistrationDocs || "Not specified"}
            </div>
            <div>
              <strong>Address:</strong> {formData.cneeAddress || "Not specified"}
            </div>
          </div>
          <div className="p-4 bg-blue-50">
            <div className="font-bold mb-2 text-gray-800">Delivery terms (Incoterms):</div>
            <div className="text-xs mb-2 text-gray-600">Delivery terms as per trade contract</div>
            <div className="mb-2">
              <strong>Terms:</strong> {formData.deliveryTerms || "Not specified"}
            </div>
            <div>
              <strong>Contract:</strong> {formData.tradeContract || "Not specified"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="border-r border-gray-300 p-4 bg-green-50">
            <div className="font-bold mb-2 text-gray-800">Ship to:</div>
            <div className="text-xs mb-2 text-gray-600">
              Delivery address where goods should be delivered after clearance
            </div>
            <div className="mb-2">
              <strong>Address:</strong> {formData.deliveryAddress || "Not specified"}
            </div>
            <div className="mb-2">
              <strong>Contact person:</strong> {formData.contactPersonName || "Not specified"}
            </div>
            <div>
              <strong>Phone:</strong> {formData.contactPersonPhone || "Not specified"}
            </div>
          </div>
          <div className="p-4 bg-yellow-50">
            <div className="font-bold mb-2 text-gray-800">Delivered under:</div>
            <div className="mb-2">
              <strong>Contract #:</strong> {formData.contractNumber || "Not specified"}
            </div>
            <div className="mb-2">
              <strong>Date:</strong> {formData.contractDate || "Not specified"}
            </div>
            <div className="font-bold mb-2 text-gray-800">Payment terms:</div>
            <div className="text-xs text-gray-600 mb-1">Terms of payment as per trade contract</div>
            <div>
              <strong>Terms:</strong> {formData.paymentTerms || "Not specified"}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-gray-300 rounded-lg mb-6 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">No</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">Description</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">Country</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">Weight/kg</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">HS Code</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">Qty</th>
                <th className="border-r border-gray-300 p-2 text-xs font-semibold">
                  Unit price, {formData.currency || "USD"}
                </th>
                <th className="p-2 text-xs font-semibold">Total, {formData.currency || "USD"}</th>
              </tr>
            </thead>
            <tbody>
              {formData.items && formData.items.length > 0 ? (
                formData.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border-r border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border-r border-gray-300 p-2 text-xs">
                      <div className="mb-1">
                        <strong>Description:</strong> {item.description || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Purpose:</strong> {item.purposeOfUse || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Material:</strong> {item.material || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Trade Mark:</strong> {item.tradeMark || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Model/Part:</strong> {item.modelPart || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Serial:</strong> {item.serialNumber || "Not specified"}
                      </div>
                      <div className="mb-1">
                        <strong>Technical:</strong> {item.technicalParameters || "Not specified"}
                      </div>
                      <div>
                        <strong>Chemical:</strong> {item.chemicalComposition || "Not specified"}
                      </div>
                    </td>
                    <td className="border-r border-gray-300 p-2 text-xs">
                      <div className="mb-1">{item.countryOfOrigin || "Not specified"}</div>
                    </td>
                    <td className="border-r border-gray-300 p-2 text-center">{item.netWeight || "0"}</td>
                    <td className="border-r border-gray-300 p-2 text-center">{item.hsCode || "Not specified"}</td>
                    <td className="border-r border-gray-300 p-2 text-center">{item.quantity || "0"}</td>
                    <td className="border-r border-gray-300 p-2 text-center">{item.unitPrice || "0.00"}</td>
                    <td className="p-2 text-center">{item.totalPrice || "0.00"}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td className="border-r border-gray-300 p-2 text-center">1</td>
                  <td className="border-r border-gray-300 p-2 text-xs">No items added yet</td>
                  <td className="border-r border-gray-300 p-2 text-xs">-</td>
                  <td className="border-r border-gray-300 p-2 text-center">-</td>
                  <td className="border-r border-gray-300 p-2 text-center">-</td>
                  <td className="border-r border-gray-300 p-2 text-center">-</td>
                  <td className="border-r border-gray-300 p-2 text-center">-</td>
                  <td className="p-2 text-center">-</td>
                </tr>
              )}
              <tr className="bg-blue-50">
                <td colSpan={7} className="border-r border-gray-300 p-2 text-right font-bold">
                  Total Goods, {formData.currency || "USD"}
                </td>
                <td className="p-2 text-center font-bold">
                  {formData.items
                    ?.reduce((sum: number, item: any) => sum + (Number.parseFloat(item.totalPrice) || 0), 0)
                    .toFixed(2) || "0.00"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2 mb-6">
          <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
            <div className="border-r border-gray-300 p-3 font-bold bg-gray-50">
              Insurance cost, {formData.currency || "USD"}:
            </div>
            <div className="p-3 bg-white">
              {formData.insuranceCost || "0.00"} - Insurance amount as per Insurance certificate
            </div>
          </div>
          <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
            <div className="border-r border-gray-300 p-3 font-bold bg-gray-50">
              Freight cost, {formData.currency || "USD"}:
            </div>
            <div className="p-3 bg-white">{formData.freightCost || "0.00"} - Transportation cost amount</div>
          </div>
          <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
            <div className="border-r border-gray-300 p-3 font-bold bg-blue-50">
              Total for payment, {formData.currency || "USD"}:
            </div>
            <div className="p-3 bg-blue-100 font-semibold">
              {formData.totalForPayment || "0.00"} - Total amount including all costs
            </div>
          </div>
        </div>

        {/* Weight and Signature */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
            <div className="border-r border-gray-300 p-3 font-bold bg-gray-50">Gross Weight, kg (total):</div>
            <div className="p-3 bg-white">
              {formData.grossWeight || "Not specified"} - Total gross weight of shipment
            </div>
          </div>
          <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
            <div className="border-r border-gray-300 p-3 font-bold bg-gray-50">Signed by:</div>
            <div className="p-3 bg-white">
              {formData.authorizedRepresentative || "Not specified"} - Authorized representative signature
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFormFields = () => {
    if (!selectedDocType) return null

    const commonFields = (
      <>
        {/* Exporter Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
            <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
            Exporter Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exporterName" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="exporterName"
                value={formData.exporterName || ""}
                onChange={(e) => handleInputChange("exporterName", e.target.value)}
                placeholder="Your company name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="origin" className="text-sm font-medium text-gray-700">
                Country of Origin
              </Label>
              <Input
                id="origin"
                value={formData.origin || ""}
                onChange={(e) => handleInputChange("origin", e.target.value)}
                placeholder="e.g., United States"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="exporterAddress" className="text-sm font-medium text-gray-700">
              Complete Address
            </Label>
            <Textarea
              id="exporterAddress"
              value={formData.exporterAddress || ""}
              onChange={(e) => handleInputChange("exporterAddress", e.target.value)}
              placeholder="Full business address including postal code"
              rows={3}
              className="mt-1"
            />
          </div>
        </div>

        {/* Importer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
            <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
            Importer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="importerName" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="importerName"
                value={formData.importerName || ""}
                onChange={(e) => handleInputChange("importerName", e.target.value)}
                placeholder="Buyer's company name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
                Destination Country
              </Label>
              <Input
                id="destination"
                value={formData.destination || ""}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                placeholder="e.g., Germany"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="importerAddress" className="text-sm font-medium text-gray-700">
              Complete Address
            </Label>
            <Textarea
              id="importerAddress"
              value={formData.importerAddress || ""}
              onChange={(e) => handleInputChange("importerAddress", e.target.value)}
              placeholder="Full buyer address including postal code"
              rows={3}
              className="mt-1"
            />
          </div>
        </div>
      </>
    )

    switch (selectedDocType) {
      case "commercial_invoice":
        return (
          <>
            {/* Invoice Header Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Invoice Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">
                    Invoice Number
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber || ""}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    placeholder="INV-2024-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceDate" className="text-sm font-medium text-gray-700">
                    Invoice Date
                  </Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={formData.invoiceDate || ""}
                    onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                    Currency
                  </Label>
                  <Select
                    value={formData.currency || "USD"}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* CNEE Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                CNEE Company Information
              </h3>
              <div>
                <Label htmlFor="cneeCompanyName" className="text-sm font-medium text-gray-700">
                  CNEE Company Name
                </Label>
                <Input
                  id="cneeCompanyName"
                  value={formData.cneeCompanyName || ""}
                  onChange={(e) => handleInputChange("cneeCompanyName", e.target.value)}
                  placeholder="Legal name of CNEE company"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cneeRegistrationDocs" className="text-sm font-medium text-gray-700">
                  Registration Documents
                </Label>
                <Input
                  id="cneeRegistrationDocs"
                  value={formData.cneeRegistrationDocs || ""}
                  onChange={(e) => handleInputChange("cneeRegistrationDocs", e.target.value)}
                  placeholder="Registration documents reference"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cneeAddress" className="text-sm font-medium text-gray-700">
                  CNEE Legal Address
                </Label>
                <Textarea
                  id="cneeAddress"
                  value={formData.cneeAddress || ""}
                  onChange={(e) => handleInputChange("cneeAddress", e.target.value)}
                  placeholder="Complete legal address of CNEE company"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryTerms" className="text-sm font-medium text-gray-700">
                    Delivery Terms (Incoterms)
                  </Label>
                  <Select
                    value={formData.deliveryTerms || "FOB"}
                    onValueChange={(value) => handleInputChange("deliveryTerms", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOB">FOB (Free on Board)</SelectItem>
                      <SelectItem value="CIF">CIF (Cost, Insurance, Freight)</SelectItem>
                      <SelectItem value="EXW">EXW (Ex Works)</SelectItem>
                      <SelectItem value="DDP">DDP (Delivered Duty Paid)</SelectItem>
                      <SelectItem value="DDU">DDU (Delivered Duty Unpaid)</SelectItem>
                      <SelectItem value="CPT">CPT (Carriage Paid To)</SelectItem>
                      <SelectItem value="CIP">CIP (Carriage and Insurance Paid To)</SelectItem>
                      <SelectItem value="FCA">FCA (Free Carrier)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tradeContract" className="text-sm font-medium text-gray-700">
                    Trade Contract Reference
                  </Label>
                  <Input
                    id="tradeContract"
                    value={formData.tradeContract || ""}
                    onChange={(e) => handleInputChange("tradeContract", e.target.value)}
                    placeholder="Trade contract reference"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700">
                  Delivery Address
                </Label>
                <Textarea
                  id="deliveryAddress"
                  value={formData.deliveryAddress || ""}
                  onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                  placeholder="Where goods should be delivered after clearance"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPersonName" className="text-sm font-medium text-gray-700">
                    Contact Person Name
                  </Label>
                  <Input
                    id="contactPersonName"
                    value={formData.contactPersonName || ""}
                    onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                    placeholder="First and family name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPersonPhone" className="text-sm font-medium text-gray-700">
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPersonPhone"
                    value={formData.contactPersonPhone || ""}
                    onChange={(e) => handleInputChange("contactPersonPhone", e.target.value)}
                    placeholder="Phone number for clearance and delivery"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Contract Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Contract & Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contractNumber" className="text-sm font-medium text-gray-700">
                    Contract Number
                  </Label>
                  <Input
                    id="contractNumber"
                    value={formData.contractNumber || ""}
                    onChange={(e) => handleInputChange("contractNumber", e.target.value)}
                    placeholder="Contract number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contractDate" className="text-sm font-medium text-gray-700">
                    Contract Date
                  </Label>
                  <Input
                    id="contractDate"
                    type="date"
                    value={formData.contractDate || ""}
                    onChange={(e) => handleInputChange("contractDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">
                  Payment Terms
                </Label>
                <Select
                  value={formData.paymentTerms || "30 days"}
                  onValueChange={(value) => handleInputChange("paymentTerms", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="60 days">60 days</SelectItem>
                    <SelectItem value="90 days">90 days</SelectItem>
                    <SelectItem value="Cash on delivery">Cash on delivery</SelectItem>
                    <SelectItem value="Letter of credit">Letter of credit</SelectItem>
                    <SelectItem value="Prepayment">Prepayment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Product Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                  <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                  Product Items
                </h3>
                <Button
                  type="button"
                  onClick={() => addItem("items")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {formData.items?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-teal-500 shadow-sm">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        Item {index + 1}
                      </CardTitle>
                      {formData.items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index, "items")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                        Product Description
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={item.description || ""}
                        onChange={(e) => handleItemChange(index, "description", e.target.value, "items")}
                        placeholder="Detailed description of the product"
                        rows={2}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`purposeOfUse-${index}`} className="text-sm font-medium text-gray-700">
                          Purpose of Use
                        </Label>
                        <Input
                          id={`purposeOfUse-${index}`}
                          value={item.purposeOfUse || ""}
                          onChange={(e) => handleItemChange(index, "purposeOfUse", e.target.value, "items")}
                          placeholder="Purpose of use"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`material-${index}`} className="text-sm font-medium text-gray-700">
                          Material
                        </Label>
                        <Input
                          id={`material-${index}`}
                          value={item.material || ""}
                          onChange={(e) => handleItemChange(index, "material", e.target.value, "items")}
                          placeholder="Material composition"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`tradeMark-${index}`} className="text-sm font-medium text-gray-700">
                          Trade Mark
                        </Label>
                        <Input
                          id={`tradeMark-${index}`}
                          value={item.tradeMark || ""}
                          onChange={(e) => handleItemChange(index, "tradeMark", e.target.value, "items")}
                          placeholder="Trade mark"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`modelPart-${index}`} className="text-sm font-medium text-gray-700">
                          Model/Part Number
                        </Label>
                        <Input
                          id={`modelPart-${index}`}
                          value={item.modelPart || ""}
                          onChange={(e) => handleItemChange(index, "modelPart", e.target.value, "items")}
                          placeholder="Model or part number"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`serialNumber-${index}`} className="text-sm font-medium text-gray-700">
                          Serial Number
                        </Label>
                        <Input
                          id={`serialNumber-${index}`}
                          value={item.serialNumber || ""}
                          onChange={(e) => handleItemChange(index, "serialNumber", e.target.value, "items")}
                          placeholder="Serial number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`countryOfOrigin-${index}`} className="text-sm font-medium text-gray-700">
                          Country of Origin
                        </Label>
                        <Input
                          id={`countryOfOrigin-${index}`}
                          value={item.countryOfOrigin || ""}
                          onChange={(e) => handleItemChange(index, "countryOfOrigin", e.target.value, "items")}
                          placeholder="Country of origin"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`technicalParameters-${index}`} className="text-sm font-medium text-gray-700">
                        Technical Parameters
                      </Label>
                      <Textarea
                        id={`technicalParameters-${index}`}
                        value={item.technicalParameters || ""}
                        onChange={(e) => handleItemChange(index, "technicalParameters", e.target.value, "items")}
                        placeholder="Technical parameters and specifications"
                        rows={2}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`chemicalComposition-${index}`} className="text-sm font-medium text-gray-700">
                        Chemical Composition
                      </Label>
                      <Textarea
                        id={`chemicalComposition-${index}`}
                        value={item.chemicalComposition || ""}
                        onChange={(e) => handleItemChange(index, "chemicalComposition", e.target.value, "items")}
                        placeholder="Chemical composition (if applicable)"
                        rows={2}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor={`netWeight-${index}`} className="text-sm font-medium text-gray-700">
                          Net Weight (kg)
                        </Label>
                        <Input
                          id={`netWeight-${index}`}
                          type="number"
                          step="0.01"
                          value={item.netWeight || ""}
                          onChange={(e) => handleItemChange(index, "netWeight", e.target.value, "items")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`hsCode-${index}`} className="text-sm font-medium text-gray-700">
                          HS Code
                        </Label>
                        <Input
                          id={`hsCode-${index}`}
                          value={item.hsCode || ""}
                          onChange={(e) => handleItemChange(index, "hsCode", e.target.value, "items")}
                          placeholder="1234.56.78"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`quantity-${index}`} className="text-sm font-medium text-gray-700">
                          Quantity
                        </Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={item.quantity || ""}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value, "items")}
                          placeholder="1"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`unitPrice-${index}`} className="text-sm font-medium text-gray-700">
                          Unit Price
                        </Label>
                        <Input
                          id={`unitPrice-${index}`}
                          type="number"
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) => handleItemChange(index, "unitPrice", e.target.value, "items")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`totalPrice-${index}`} className="text-sm font-medium text-gray-700">
                          Total Price
                        </Label>
                        <Input
                          id={`totalPrice-${index}`}
                          value={item.totalPrice || ""}
                          readOnly
                          className="bg-green-50 border-green-200 font-semibold mt-1"
                          placeholder="Auto-calculated"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cost Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
                Cost Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="insuranceCost" className="text-sm font-medium text-gray-700">
                    Insurance Cost ({formData.currency || "USD"})
                  </Label>
                  <Input
                    id="insuranceCost"
                    type="number"
                    step="0.01"
                    value={formData.insuranceCost || ""}
                    onChange={(e) => handleInputChange("insuranceCost", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="freightCost" className="text-sm font-medium text-gray-700">
                    Freight Cost ({formData.currency || "USD"})
                  </Label>
                  <Input
                    id="freightCost"
                    type="number"
                    step="0.01"
                    value={formData.freightCost || ""}
                    onChange={(e) => handleInputChange("freightCost", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="totalForPayment" className="text-sm font-medium text-gray-700">
                    Total for Payment ({formData.currency || "USD"})
                  </Label>
                  <Input
                    id="totalForPayment"
                    value={formData.totalForPayment || ""}
                    readOnly
                    className="bg-blue-50 border-blue-200 font-semibold text-lg mt-1"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="grossWeight" className="text-sm font-medium text-gray-700">
                  Gross Weight (kg total)
                </Label>
                <Input
                  id="grossWeight"
                  type="number"
                  step="0.01"
                  value={formData.grossWeight || ""}
                  onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                  placeholder="Total gross weight of shipment"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Signature Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
                Signature
              </h3>
              <div>
                <Label htmlFor="authorizedRepresentative" className="text-sm font-medium text-gray-700">
                  Authorized Representative
                </Label>
                <Input
                  id="authorizedRepresentative"
                  value={formData.authorizedRepresentative || ""}
                  onChange={(e) => handleInputChange("authorizedRepresentative", e.target.value)}
                  placeholder="Name of authorized representative"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="companyStamp" className="text-sm font-medium text-gray-700">
                  Company Stamp
                </Label>
                <Input
                  id="companyStamp"
                  value={formData.companyStamp || ""}
                  onChange={(e) => handleInputChange("companyStamp", e.target.value)}
                  placeholder="Company stamp details (if available)"
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "proforma_invoice":
        return (
          <>
            {/* Header Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Proforma Invoice Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="estimateNo" className="text-sm font-medium text-gray-700">
                    Estimate Number
                  </Label>
                  <Input
                    id="estimateNo"
                    value={formData.estimateNo || ""}
                    onChange={(e) => handleInputChange("estimateNo", e.target.value)}
                    placeholder="EST-2024-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfExpiry" className="text-sm font-medium text-gray-700">
                    Date of Expiry
                  </Label>
                  <Input
                    id="dateOfExpiry"
                    type="date"
                    value={formData.dateOfExpiry || ""}
                    onChange={(e) => handleInputChange("dateOfExpiry", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerId" className="text-sm font-medium text-gray-700">
                    Customer ID
                  </Label>
                  <Input
                    id="customerId"
                    value={formData.customerId || ""}
                    onChange={(e) => handleInputChange("customerId", e.target.value)}
                    placeholder="CUST-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                    Currency
                  </Label>
                  <Select
                    value={formData.currency || "USD"}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bill To Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Bill To Information
              </h3>
              <div>
                <Label htmlFor="billToCompanyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="billToCompanyName"
                  value={formData.billToCompanyName || ""}
                  onChange={(e) => handleInputChange("billToCompanyName", e.target.value)}
                  placeholder="Billing company name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="billToAddress" className="text-sm font-medium text-gray-700">
                  Billing Address
                </Label>
                <Textarea
                  id="billToAddress"
                  value={formData.billToAddress || ""}
                  onChange={(e) => handleInputChange("billToAddress", e.target.value)}
                  placeholder="Complete billing address"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billToPhone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="billToPhone"
                    value={formData.billToPhone || ""}
                    onChange={(e) => handleInputChange("billToPhone", e.target.value)}
                    placeholder="Phone number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="billToEmail" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="billToEmail"
                    type="email"
                    value={formData.billToEmail || ""}
                    onChange={(e) => handleInputChange("billToEmail", e.target.value)}
                    placeholder="email@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Ship To Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Ship To Information
              </h3>
              <div>
                <Label htmlFor="shipToCompanyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="shipToCompanyName"
                  value={formData.shipToCompanyName || ""}
                  onChange={(e) => handleInputChange("shipToCompanyName", e.target.value)}
                  placeholder="Shipping company name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="shipToAddress" className="text-sm font-medium text-gray-700">
                  Shipping Address
                </Label>
                <Textarea
                  id="shipToAddress"
                  value={formData.shipToAddress || ""}
                  onChange={(e) => handleInputChange("shipToAddress", e.target.value)}
                  placeholder="Complete shipping address"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="shipToPhone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="shipToPhone"
                  value={formData.shipToPhone || ""}
                  onChange={(e) => handleInputChange("shipToPhone", e.target.value)}
                  placeholder="Phone number"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Shipment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Shipment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="poNumber" className="text-sm font-medium text-gray-700">
                    P.O. Number
                  </Label>
                  <Input
                    id="poNumber"
                    value={formData.poNumber || ""}
                    onChange={(e) => handleInputChange("poNumber", e.target.value)}
                    placeholder="Purchase order number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="poDate" className="text-sm font-medium text-gray-700">
                    P.O. Date
                  </Label>
                  <Input
                    id="poDate"
                    type="date"
                    value={formData.poDate || ""}
                    onChange={(e) => handleInputChange("poDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                    Terms (Incoterms)
                  </Label>
                  <Select value={formData.terms || "FOB"} onValueChange={(value) => handleInputChange("terms", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOB">FOB</SelectItem>
                      <SelectItem value="CIF">CIF</SelectItem>
                      <SelectItem value="EXW">EXW</SelectItem>
                      <SelectItem value="DDP">DDP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">
                    Payment Terms
                  </Label>
                  <Select
                    value={formData.paymentTerms || "30 days"}
                    onValueChange={(value) => handleInputChange("paymentTerms", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 days">30 days</SelectItem>
                      <SelectItem value="60 days">60 days</SelectItem>
                      <SelectItem value="90 days">90 days</SelectItem>
                      <SelectItem value="Letter of credit">Letter of credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipDate" className="text-sm font-medium text-gray-700">
                    Ship Date
                  </Label>
                  <Input
                    id="shipDate"
                    type="date"
                    value={formData.shipDate || ""}
                    onChange={(e) => handleInputChange("shipDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="modeOfTransportation" className="text-sm font-medium text-gray-700">
                    Mode of Transportation
                  </Label>
                  <Select
                    value={formData.modeOfTransportation || ""}
                    onValueChange={(value) => handleInputChange("modeOfTransportation", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sea">Sea</SelectItem>
                      <SelectItem value="Air">Air</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Rail">Rail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="carrier" className="text-sm font-medium text-gray-700">
                    Carrier
                  </Label>
                  <Input
                    id="carrier"
                    value={formData.carrier || ""}
                    onChange={(e) => handleInputChange("carrier", e.target.value)}
                    placeholder="Carrier name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfPackages" className="text-sm font-medium text-gray-700">
                    Number of Packages
                  </Label>
                  <Input
                    id="numberOfPackages"
                    type="number"
                    value={formData.numberOfPackages || ""}
                    onChange={(e) => handleInputChange("numberOfPackages", e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grossWeight" className="text-sm font-medium text-gray-700">
                    Gross Weight (kg)
                  </Label>
                  <Input
                    id="grossWeight"
                    type="number"
                    step="0.01"
                    value={formData.grossWeight || ""}
                    onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Product Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                  <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                  Product Items
                </h3>
                <Button
                  type="button"
                  onClick={() => addItem("items")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {formData.items?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-teal-500 shadow-sm">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        Item {index + 1}
                      </CardTitle>
                      {formData.items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index, "items")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`itemPart-${index}`} className="text-sm font-medium text-gray-700">
                          Item Part Number
                        </Label>
                        <Input
                          id={`itemPart-${index}`}
                          value={item.itemPart || ""}
                          onChange={(e) => handleItemChange(index, "itemPart", e.target.value, "items")}
                          placeholder="Part number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                          Description
                        </Label>
                        <Input
                          id={`description-${index}`}
                          value={item.description || ""}
                          onChange={(e) => handleItemChange(index, "description", e.target.value, "items")}
                          placeholder="Item description"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`qty-${index}`} className="text-sm font-medium text-gray-700">
                          Quantity
                        </Label>
                        <Input
                          id={`qty-${index}`}
                          type="number"
                          value={item.qty || ""}
                          onChange={(e) => handleItemChange(index, "qty", e.target.value, "items")}
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`unitPrice-${index}`} className="text-sm font-medium text-gray-700">
                          Unit Price
                        </Label>
                        <Input
                          id={`unitPrice-${index}`}
                          type="number"
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) => handleItemChange(index, "unitPrice", e.target.value, "items")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`salesTax-${index}`} className="text-sm font-medium text-gray-700">
                          Sales Tax (%)
                        </Label>
                        <Input
                          id={`salesTax-${index}`}
                          type="number"
                          step="0.01"
                          value={item.salesTax || ""}
                          onChange={(e) => handleItemChange(index, "salesTax", e.target.value, "items")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`total-${index}`} className="text-sm font-medium text-gray-700">
                          Total
                        </Label>
                        <Input
                          id={`total-${index}`}
                          value={item.total || ""}
                          onChange={(e) => handleItemChange(index, "total", e.target.value, "items")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
                Totals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subtotal" className="text-sm font-medium text-gray-700">
                    Subtotal
                  </Label>
                  <Input
                    id="subtotal"
                    type="number"
                    step="0.01"
                    value={formData.subtotal || ""}
                    onChange={(e) => handleInputChange("subtotal", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="totalTax" className="text-sm font-medium text-gray-700">
                    Total Tax
                  </Label>
                  <Input
                    id="totalTax"
                    type="number"
                    step="0.01"
                    value={formData.totalTax || ""}
                    onChange={(e) => handleInputChange("totalTax", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="shippingHandling" className="text-sm font-medium text-gray-700">
                    Shipping/Handling
                  </Label>
                  <Input
                    id="shippingHandling"
                    type="number"
                    step="0.01"
                    value={formData.shippingHandling || ""}
                    onChange={(e) => handleInputChange("shippingHandling", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="quoteTotal" className="text-sm font-medium text-gray-700">
                  Quote Total ({formData.currency || "USD"})
                </Label>
                <Input
                  id="quoteTotal"
                  type="number"
                  step="0.01"
                  value={formData.quoteTotal || ""}
                  onChange={(e) => handleInputChange("quoteTotal", e.target.value)}
                  placeholder="0.00"
                  className="mt-1 bg-blue-50 border-blue-200 font-semibold text-lg"
                />
              </div>
            </div>

            {/* Special Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
                Special Notes & Signature
              </h3>
              <div>
                <Label htmlFor="specialNotes" className="text-sm font-medium text-gray-700">
                  Special Notes
                </Label>
                <Textarea
                  id="specialNotes"
                  value={formData.specialNotes || ""}
                  onChange={(e) => handleInputChange("specialNotes", e.target.value)}
                  placeholder="Any special notes or instructions"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signature" className="text-sm font-medium text-gray-700">
                    Signature
                  </Label>
                  <Input
                    id="signature"
                    value={formData.signature || ""}
                    onChange={(e) => handleInputChange("signature", e.target.value)}
                    placeholder="Authorized signature"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signatureDate" className="text-sm font-medium text-gray-700">
                    Signature Date
                  </Label>
                  <Input
                    id="signatureDate"
                    type="date"
                    value={formData.signatureDate || ""}
                    onChange={(e) => handleInputChange("signatureDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </>
        )

      case "bill_of_lading":
        return (
          <>
            {/* Header Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Bill of Lading Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="billOfLadingNumber" className="text-sm font-medium text-gray-700">
                    Bill of Lading Number
                  </Label>
                  <Input
                    id="billOfLadingNumber"
                    value={formData.billOfLadingNumber || ""}
                    onChange={(e) => handleInputChange("billOfLadingNumber", e.target.value)}
                    placeholder="BOL-2024-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="page" className="text-sm font-medium text-gray-700">
                    Page
                  </Label>
                  <Input
                    id="page"
                    value={formData.page || ""}
                    onChange={(e) => handleInputChange("page", e.target.value)}
                    placeholder="1"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Ship From Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Ship From Details
              </h3>
              <div>
                <Label htmlFor="shipFromCityStateZip" className="text-sm font-medium text-gray-700">
                  City/State/Zip
                </Label>
                <Input
                  id="shipFromCityStateZip"
                  value={formData.shipFromCityStateZip || ""}
                  onChange={(e) => handleInputChange("shipFromCityStateZip", e.target.value)}
                  placeholder="City, State, ZIP Code"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipFromFOB"
                  checked={formData.shipFromFOB || false}
                  onCheckedChange={(checked) => handleInputChange("shipFromFOB", checked)}
                />
                <Label htmlFor="shipFromFOB" className="text-sm font-medium text-gray-700">
                  FOB Point
                </Label>
              </div>
            </div>

            {/* Ship To Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Ship To Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipToCityStateZip" className="text-sm font-medium text-gray-700">
                    City/State/Zip
                  </Label>
                  <Input
                    id="shipToCityStateZip"
                    value={formData.shipToCityStateZip || ""}
                    onChange={(e) => handleInputChange("shipToCityStateZip", e.target.value)}
                    placeholder="City, State, ZIP Code"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="shipToLocationNumber" className="text-sm font-medium text-gray-700">
                    Location Number
                  </Label>
                  <Input
                    id="shipToLocationNumber"
                    value={formData.shipToLocationNumber || ""}
                    onChange={(e) => handleInputChange("shipToLocationNumber", e.target.value)}
                    placeholder="Location number"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shipToFOB"
                  checked={formData.shipToFOB || false}
                  onCheckedChange={(checked) => handleInputChange("shipToFOB", checked)}
                />
                <Label htmlFor="shipToFOB" className="text-sm font-medium text-gray-700">
                  FOB Point
                </Label>
              </div>
            </div>

            {/* Carrier Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Carrier Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carrierName" className="text-sm font-medium text-gray-700">
                    Carrier Name
                  </Label>
                  <Input
                    id="carrierName"
                    value={formData.carrierName || ""}
                    onChange={(e) => handleInputChange("carrierName", e.target.value)}
                    placeholder="Carrier company name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="trailerNumber" className="text-sm font-medium text-gray-700">
                    Trailer Number
                  </Label>
                  <Input
                    id="trailerNumber"
                    value={formData.trailerNumber || ""}
                    onChange={(e) => handleInputChange("trailerNumber", e.target.value)}
                    placeholder="Trailer number"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sealNumbers" className="text-sm font-medium text-gray-700">
                    Seal Numbers
                  </Label>
                  <Input
                    id="sealNumbers"
                    value={formData.sealNumbers || ""}
                    onChange={(e) => handleInputChange("sealNumbers", e.target.value)}
                    placeholder="Seal numbers"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="scac" className="text-sm font-medium text-gray-700">
                    SCAC
                  </Label>
                  <Input
                    id="scac"
                    value={formData.scac || ""}
                    onChange={(e) => handleInputChange("scac", e.target.value)}
                    placeholder="SCAC code"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="proNumber" className="text-sm font-medium text-gray-700">
                    Pro Number
                  </Label>
                  <Input
                    id="proNumber"
                    value={formData.proNumber || ""}
                    onChange={(e) => handleInputChange("proNumber", e.target.value)}
                    placeholder="Pro number"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Freight Terms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                Freight Terms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freightChargeTerms" className="text-sm font-medium text-gray-700">
                    Freight Charge Terms
                  </Label>
                  <Select
                    value={formData.freightChargeTerms || "prepaid"}
                    onValueChange={(value) => handleInputChange("freightChargeTerms", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="collect">Collect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="freightParty" className="text-sm font-medium text-gray-700">
                    Freight Party
                  </Label>
                  <Select
                    value={formData.freightParty || "1st_party"}
                    onValueChange={(value) => handleInputChange("freightParty", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st_party">1st Party</SelectItem>
                      <SelectItem value="2nd_party">2nd Party</SelectItem>
                      <SelectItem value="3rd_party">3rd Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
                Special Instructions
              </h3>
              <div>
                <Label htmlFor="specialInstructions" className="text-sm font-medium text-gray-700">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions || ""}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  placeholder="Any special handling instructions"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
                Grand Totals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grandTotalPackages" className="text-sm font-medium text-gray-700">
                    Total Packages
                  </Label>
                  <Input
                    id="grandTotalPackages"
                    type="number"
                    value={formData.grandTotalPackages || ""}
                    onChange={(e) => handleInputChange("grandTotalPackages", e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grandTotalWeight" className="text-sm font-medium text-gray-700">
                    Total Weight
                  </Label>
                  <Input
                    id="grandTotalWeight"
                    type="number"
                    step="0.01"
                    value={formData.grandTotalWeight || ""}
                    onChange={(e) => handleInputChange("grandTotalWeight", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="codAmount" className="text-sm font-medium text-gray-700">
                    COD Amount ($)
                  </Label>
                  <Input
                    id="codAmount"
                    type="number"
                    step="0.01"
                    value={formData.codAmount || ""}
                    onChange={(e) => handleInputChange("codAmount", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-gray-500 rounded-full mr-3"></div>
                Signatures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipperSignature" className="text-sm font-medium text-gray-700">
                    Shipper Signature
                  </Label>
                  <Input
                    id="shipperSignature"
                    value={formData.shipperSignature || ""}
                    onChange={(e) => handleInputChange("shipperSignature", e.target.value)}
                    placeholder="Shipper signature"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="shipperDate" className="text-sm font-medium text-gray-700">
                    Shipper Date
                  </Label>
                  <Input
                    id="shipperDate"
                    type="date"
                    value={formData.shipperDate || ""}
                    onChange={(e) => handleInputChange("shipperDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carrierSignature" className="text-sm font-medium text-gray-700">
                    Carrier Signature
                  </Label>
                  <Input
                    id="carrierSignature"
                    value={formData.carrierSignature || ""}
                    onChange={(e) => handleInputChange("carrierSignature", e.target.value)}
                    placeholder="Carrier signature"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="carrierPickupDate" className="text-sm font-medium text-gray-700">
                    Carrier Pickup Date
                  </Label>
                  <Input
                    id="carrierPickupDate"
                    type="date"
                    value={formData.carrierPickupDate || ""}
                    onChange={(e) => handleInputChange("carrierPickupDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </>
        )

      case "certificate_of_origin":
        return (
          <>
            {/* Header Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Certificate Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blanketPeriodFrom" className="text-sm font-medium text-gray-700">
                    Blanket Period From
                  </Label>
                  <Input
                    id="blanketPeriodFrom"
                    type="date"
                    value={formData.blanketPeriodFrom || ""}
                    onChange={(e) => handleInputChange("blanketPeriodFrom", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="blanketPeriodTo" className="text-sm font-medium text-gray-700">
                    Blanket Period To
                  </Label>
                  <Input
                    id="blanketPeriodTo"
                    type="date"
                    value={formData.blanketPeriodTo || ""}
                    onChange={(e) => handleInputChange("blanketPeriodTo", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Exporter Tax Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Exporter Tax Information
              </h3>
              <div>
                <Label htmlFor="exporterTaxId" className="text-sm font-medium text-gray-700">
                  Tax Identification Number
                </Label>
                <Input
                  id="exporterTaxId"
                  value={formData.exporterTaxId || ""}
                  onChange={(e) => handleInputChange("exporterTaxId", e.target.value)}
                  placeholder="Tax ID number"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Producer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Producer Information
              </h3>
              <div>
                <Label htmlFor="producerName" className="text-sm font-medium text-gray-700">
                  Producer Name
                </Label>
                <Input
                  id="producerName"
                  value={formData.producerName || ""}
                  onChange={(e) => handleInputChange("producerName", e.target.value)}
                  placeholder="Producer company name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="producerAddress" className="text-sm font-medium text-gray-700">
                  Producer Address
                </Label>
                <Textarea
                  id="producerAddress"
                  value={formData.producerAddress || ""}
                  onChange={(e) => handleInputChange("producerAddress", e.target.value)}
                  placeholder="Complete producer address"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="producerTaxId" className="text-sm font-medium text-gray-700">
                  Producer Tax ID
                </Label>
                <Input
                  id="producerTaxId"
                  value={formData.producerTaxId || ""}
                  onChange={(e) => handleInputChange("producerTaxId", e.target.value)}
                  placeholder="Producer tax ID"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Goods Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                  <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                  Goods Information
                </h3>
                <Button
                  type="button"
                  onClick={() => addItem("goodsItems")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Good
                </Button>
              </div>

              {formData.goodsItems?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-teal-500 shadow-sm">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        Good {index + 1}
                      </CardTitle>
                      {formData.goodsItems.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index, "goodsItems")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={item.description || ""}
                        onChange={(e) => handleItemChange(index, "description", e.target.value, "goodsItems")}
                        placeholder="Description of goods"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`tariffClassification-${index}`} className="text-sm font-medium text-gray-700">
                          Tariff Classification
                        </Label>
                        <Input
                          id={`tariffClassification-${index}`}
                          value={item.tariffClassification || ""}
                          onChange={(e) =>
                            handleItemChange(index, "tariffClassification", e.target.value, "goodsItems")
                          }
                          placeholder="HS Code"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`preferenceCriterion-${index}`} className="text-sm font-medium text-gray-700">
                          Preference Criterion
                        </Label>
                        <Input
                          id={`preferenceCriterion-${index}`}
                          value={item.preferenceCriterion || ""}
                          onChange={(e) => handleItemChange(index, "preferenceCriterion", e.target.value, "goodsItems")}
                          placeholder="A, B, C, etc."
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`producer-${index}`} className="text-sm font-medium text-gray-700">
                          Producer
                        </Label>
                        <Input
                          id={`producer-${index}`}
                          value={item.producer || ""}
                          onChange={(e) => handleItemChange(index, "producer", e.target.value, "goodsItems")}
                          placeholder="Producer name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`netCost-${index}`} className="text-sm font-medium text-gray-700">
                          Net Cost
                        </Label>
                        <Input
                          id={`netCost-${index}`}
                          value={item.netCost || ""}
                          onChange={(e) => handleItemChange(index, "netCost", e.target.value, "goodsItems")}
                          placeholder="Net cost"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`countryOfOrigin-${index}`} className="text-sm font-medium text-gray-700">
                          Country of Origin
                        </Label>
                        <Input
                          id={`countryOfOrigin-${index}`}
                          value={item.countryOfOrigin || ""}
                          onChange={(e) => handleItemChange(index, "countryOfOrigin", e.target.value, "goodsItems")}
                          placeholder="Country"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Certification
              </h3>
              <div>
                <Label htmlFor="certificationText" className="text-sm font-medium text-gray-700">
                  Certification Text
                </Label>
                <Textarea
                  id="certificationText"
                  value={formData.certificationText || ""}
                  onChange={(e) => handleInputChange("certificationText", e.target.value)}
                  placeholder="Certification statement"
                  rows={5}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Authorized Signature */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
                Authorized Signature
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorizedName" className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="authorizedName"
                    value={formData.authorizedName || ""}
                    onChange={(e) => handleInputChange("authorizedName", e.target.value)}
                    placeholder="Authorized person name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedTitle" className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="authorizedTitle"
                    value={formData.authorizedTitle || ""}
                    onChange={(e) => handleInputChange("authorizedTitle", e.target.value)}
                    placeholder="Job title"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="authorizedDate" className="text-sm font-medium text-gray-700">
                    Date
                  </Label>
                  <Input
                    id="authorizedDate"
                    type="date"
                    value={formData.authorizedDate || ""}
                    onChange={(e) => handleInputChange("authorizedDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedPhone" className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    id="authorizedPhone"
                    value={formData.authorizedPhone || ""}
                    onChange={(e) => handleInputChange("authorizedPhone", e.target.value)}
                    placeholder="Phone number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedFax" className="text-sm font-medium text-gray-700">
                    Fax
                  </Label>
                  <Input
                    id="authorizedFax"
                    value={formData.authorizedFax || ""}
                    onChange={(e) => handleInputChange("authorizedFax", e.target.value)}
                    placeholder="Fax number"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="authorizedCompany" className="text-sm font-medium text-gray-700">
                  Company
                </Label>
                <Input
                  id="authorizedCompany"
                  value={formData.authorizedCompany || ""}
                  onChange={(e) => handleInputChange("authorizedCompany", e.target.value)}
                  placeholder="Company name"
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "packing_list":
        return (
          <>
            {/* Shipment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Shipment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shipmentDate" className="text-sm font-medium text-gray-700">
                    Shipment Date
                  </Label>
                  <Input
                    id="shipmentDate"
                    type="date"
                    value={formData.shipmentDate || ""}
                    onChange={(e) => handleInputChange("shipmentDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">
                    Invoice Number
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber || ""}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    placeholder="INV-2024-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="orderNumber" className="text-sm font-medium text-gray-700">
                    Order Number
                  </Label>
                  <Input
                    id="orderNumber"
                    value={formData.orderNumber || ""}
                    onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                    placeholder="ORD-2024-001"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Container Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Container Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="containerNumber" className="text-sm font-medium text-gray-700">
                    Container Number
                  </Label>
                  <Input
                    id="containerNumber"
                    value={formData.containerNumber || ""}
                    onChange={(e) => handleInputChange("containerNumber", e.target.value)}
                    placeholder="Container number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sealNumber" className="text-sm font-medium text-gray-700">
                    Seal Number
                  </Label>
                  <Input
                    id="sealNumber"
                    value={formData.sealNumber || ""}
                    onChange={(e) => handleInputChange("sealNumber", e.target.value)}
                    placeholder="Seal number"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Product Information
              </h3>
              <div>
                <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
                  Product Description
                </Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription || ""}
                  onChange={(e) => handleInputChange("productDescription", e.target.value)}
                  placeholder="General description of products"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfPackages" className="text-sm font-medium text-gray-700">
                    Number of Packages
                  </Label>
                  <Input
                    id="numberOfPackages"
                    type="number"
                    value={formData.numberOfPackages || ""}
                    onChange={(e) => handleInputChange("numberOfPackages", e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="typeOfPackaging" className="text-sm font-medium text-gray-700">
                    Type of Packaging
                  </Label>
                  <Select
                    value={formData.typeOfPackaging || "Cartons"}
                    onValueChange={(value) => handleInputChange("typeOfPackaging", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cartons">Cartons</SelectItem>
                      <SelectItem value="Pallets">Pallets</SelectItem>
                      <SelectItem value="Crates">Crates</SelectItem>
                      <SelectItem value="Boxes">Boxes</SelectItem>
                      <SelectItem value="Bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grossWeight" className="text-sm font-medium text-gray-700">
                    Gross Weight (kg)
                  </Label>
                  <Input
                    id="grossWeight"
                    type="number"
                    step="0.01"
                    value={formData.grossWeight || ""}
                    onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="netWeight" className="text-sm font-medium text-gray-700">
                    Net Weight (kg)
                  </Label>
                  <Input
                    id="netWeight"
                    type="number"
                    step="0.01"
                    value={formData.netWeight || ""}
                    onChange={(e) => handleInputChange("netWeight", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions" className="text-sm font-medium text-gray-700">
                    Dimensions (L x W x H)
                  </Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions || ""}
                    onChange={(e) => handleInputChange("dimensions", e.target.value)}
                    placeholder="100 x 50 x 30 cm"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Packing Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                  <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                  Packing Items
                </h3>
                <Button
                  type="button"
                  onClick={() => addItem("packingItems")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {formData.packingItems?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-teal-500 shadow-sm">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        Item {index + 1}
                      </CardTitle>
                      {formData.packingItems.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index, "packingItems")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`itemNumber-${index}`} className="text-sm font-medium text-gray-700">
                          Item Number
                        </Label>
                        <Input
                          id={`itemNumber-${index}`}
                          value={item.itemNumber || ""}
                          onChange={(e) => handleItemChange(index, "itemNumber", e.target.value, "packingItems")}
                          placeholder="Item number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                          Description
                        </Label>
                        <Input
                          id={`description-${index}`}
                          value={item.description || ""}
                          onChange={(e) => handleItemChange(index, "description", e.target.value, "packingItems")}
                          placeholder="Item description"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`quantity-${index}`} className="text-sm font-medium text-gray-700">
                          Quantity
                        </Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={item.quantity || ""}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value, "packingItems")}
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`unitOfMeasure-${index}`} className="text-sm font-medium text-gray-700">
                          Unit of Measure
                        </Label>
                        <Select
                          value={item.unitOfMeasure || "PCS"}
                          onValueChange={(value) => handleItemChange(index, "unitOfMeasure", value, "packingItems")}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PCS">PCS</SelectItem>
                            <SelectItem value="KG">KG</SelectItem>
                            <SelectItem value="LBS">LBS</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="FT">FT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`packageType-${index}`} className="text-sm font-medium text-gray-700">
                          Package Type
                        </Label>
                        <Select
                          value={item.packageType || "Carton"}
                          onValueChange={(value) => handleItemChange(index, "packageType", value, "packingItems")}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Carton">Carton</SelectItem>
                            <SelectItem value="Pallet">Pallet</SelectItem>
                            <SelectItem value="Crate">Crate</SelectItem>
                            <SelectItem value="Box">Box</SelectItem>
                            <SelectItem value="Bag">Bag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`netWeight-${index}`} className="text-sm font-medium text-gray-700">
                          Net Weight (kg)
                        </Label>
                        <Input
                          id={`netWeight-${index}`}
                          type="number"
                          step="0.01"
                          value={item.netWeight || ""}
                          onChange={(e) => handleItemChange(index, "netWeight", e.target.value, "packingItems")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`grossWeight-${index}`} className="text-sm font-medium text-gray-700">
                          Gross Weight (kg)
                        </Label>
                        <Input
                          id={`grossWeight-${index}`}
                          type="number"
                          step="0.01"
                          value={item.grossWeight || ""}
                          onChange={(e) => handleItemChange(index, "grossWeight", e.target.value, "packingItems")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`dimensions-${index}`} className="text-sm font-medium text-gray-700">
                          Dimensions
                        </Label>
                        <Input
                          id={`dimensions-${index}`}
                          value={item.dimensions || ""}
                          onChange={(e) => handleItemChange(index, "dimensions", e.target.value, "packingItems")}
                          placeholder="L x W x H"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`packageCount-${index}`} className="text-sm font-medium text-gray-700">
                          Package Count
                        </Label>
                        <Input
                          id={`packageCount-${index}`}
                          type="number"
                          value={item.packageCount || ""}
                          onChange={(e) => handleItemChange(index, "packageCount", e.target.value, "packingItems")}
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Additional Details
              </h3>
              <div>
                <Label htmlFor="packingDetails" className="text-sm font-medium text-gray-700">
                  Packing Details
                </Label>
                <Textarea
                  id="packingDetails"
                  value={formData.packingDetails || ""}
                  onChange={(e) => handleInputChange("packingDetails", e.target.value)}
                  placeholder="Detailed packing information"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="markingsAndNumbers" className="text-sm font-medium text-gray-700">
                  Markings and Numbers
                </Label>
                <Textarea
                  id="markingsAndNumbers"
                  value={formData.markingsAndNumbers || ""}
                  onChange={(e) => handleInputChange("markingsAndNumbers", e.target.value)}
                  placeholder="Package markings and identification numbers"
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "sales_contract":
        return (
          <>
            {/* Contract Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
                Contract Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contractNumber" className="text-sm font-medium text-gray-700">
                    Contract Number
                  </Label>
                  <Input
                    id="contractNumber"
                    value={formData.contractNumber || ""}
                    onChange={(e) => handleInputChange("contractNumber", e.target.value)}
                    placeholder="CONTRACT-2024-001"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contractDate" className="text-sm font-medium text-gray-700">
                    Contract Date
                  </Label>
                  <Input
                    id="contractDate"
                    type="date"
                    value={formData.contractDate || ""}
                    onChange={(e) => handleInputChange("contractDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contractTitle" className="text-sm font-medium text-gray-700">
                  Contract Title
                </Label>
                <Input
                  id="contractTitle"
                  value={formData.contractTitle || ""}
                  onChange={(e) => handleInputChange("contractTitle", e.target.value)}
                  placeholder="Sales Contract for..."
                  className="mt-1"
                />
              </div>
            </div>

            {/* Common Fields */}
            {commonFields}

            {/* Parties Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Parties Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sellerRepresentative" className="text-sm font-medium text-gray-700">
                    Seller Representative
                  </Label>
                  <Input
                    id="sellerRepresentative"
                    value={formData.sellerRepresentative || ""}
                    onChange={(e) => handleInputChange("sellerRepresentative", e.target.value)}
                    placeholder="Seller representative name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="buyerRepresentative" className="text-sm font-medium text-gray-700">
                    Buyer Representative
                  </Label>
                  <Input
                    id="buyerRepresentative"
                    value={formData.buyerRepresentative || ""}
                    onChange={(e) => handleInputChange("buyerRepresentative", e.target.value)}
                    placeholder="Buyer representative name"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Commercial Terms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
                Commercial Terms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="deliveryTerms" className="text-sm font-medium text-gray-700">
                    Delivery Terms
                  </Label>
                  <Select
                    value={formData.deliveryTerms || "FOB"}
                    onValueChange={(value) => handleInputChange("deliveryTerms", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOB">FOB</SelectItem>
                      <SelectItem value="CIF">CIF</SelectItem>
                      <SelectItem value="EXW">EXW</SelectItem>
                      <SelectItem value="DDP">DDP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">
                    Payment Terms
                  </Label>
                  <Select
                    value={formData.paymentTerms || "30 days"}
                    onValueChange={(value) => handleInputChange("paymentTerms", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 days">30 days</SelectItem>
                      <SelectItem value="60 days">60 days</SelectItem>
                      <SelectItem value="90 days">90 days</SelectItem>
                      <SelectItem value="Letter of credit">Letter of credit</SelectItem>
                      <SelectItem value="Cash on delivery">Cash on delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                    Currency
                  </Label>
                  <Select
                    value={formData.currency || "USD"}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="totalContractValue" className="text-sm font-medium text-gray-700">
                  Total Contract Value ({formData.currency || "USD"})
                </Label>
                <Input
                  id="totalContractValue"
                  value={formData.totalContractValue || ""}
                  readOnly
                  className="bg-blue-50 border-blue-200 font-semibold text-lg mt-1"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700">
                    Delivery Date
                  </Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate || ""}
                    onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryLocation" className="text-sm font-medium text-gray-700">
                    Delivery Location
                  </Label>
                  <Input
                    id="deliveryLocation"
                    value={formData.deliveryLocation || ""}
                    onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                    placeholder="Delivery location"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="portOfLoading" className="text-sm font-medium text-gray-700">
                    Port of Loading
                  </Label>
                  <Input
                    id="portOfLoading"
                    value={formData.portOfLoading || ""}
                    onChange={(e) => handleInputChange("portOfLoading", e.target.value)}
                    placeholder="Port of loading"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="portOfDischarge" className="text-sm font-medium text-gray-700">
                    Port of Discharge
                  </Label>
                  <Input
                    id="portOfDischarge"
                    value={formData.portOfDischarge || ""}
                    onChange={(e) => handleInputChange("portOfDischarge", e.target.value)}
                    placeholder="Port of discharge"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Contract Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                  <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                  Contract Items
                </h3>
                <Button
                  type="button"
                  onClick={() => addItem("contractItems")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {formData.contractItems?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-teal-500 shadow-sm">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        Item {index + 1}
                      </CardTitle>
                      {formData.contractItems.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index, "contractItems")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`itemNumber-${index}`} className="text-sm font-medium text-gray-700">
                          Item Number
                        </Label>
                        <Input
                          id={`itemNumber-${index}`}
                          value={item.itemNumber || ""}
                          onChange={(e) => handleItemChange(index, "itemNumber", e.target.value, "contractItems")}
                          placeholder="Item number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                          Description
                        </Label>
                        <Input
                          id={`description-${index}`}
                          value={item.description || ""}
                          onChange={(e) => handleItemChange(index, "description", e.target.value, "contractItems")}
                          placeholder="Item description"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`specifications-${index}`} className="text-sm font-medium text-gray-700">
                        Specifications
                      </Label>
                      <Textarea
                        id={`specifications-${index}`}
                        value={item.specifications || ""}
                        onChange={(e) => handleItemChange(index, "specifications", e.target.value, "contractItems")}
                        placeholder="Technical specifications"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`quantity-${index}`} className="text-sm font-medium text-gray-700">
                          Quantity
                        </Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={item.quantity || ""}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value, "contractItems")}
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`unitPrice-${index}`} className="text-sm font-medium text-gray-700">
                          Unit Price
                        </Label>
                        <Input
                          id={`unitPrice-${index}`}
                          type="number"
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) => handleItemChange(index, "unitPrice", e.target.value, "contractItems")}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`totalPrice-${index}`} className="text-sm font-medium text-gray-700">
                          Total Price
                        </Label>
                        <Input
                          id={`totalPrice-${index}`}
                          value={item.totalPrice || ""}
                          readOnly
                          className="bg-green-50 border-green-200 font-semibold mt-1"
                          placeholder="Auto-calculated"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`deliverySchedule-${index}`} className="text-sm font-medium text-gray-700">
                          Delivery Schedule
                        </Label>
                        <Input
                          id={`deliverySchedule-${index}`}
                          value={item.deliverySchedule || ""}
                          onChange={(e) => handleItemChange(index, "deliverySchedule", e.target.value, "contractItems")}
                          placeholder="Delivery schedule"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
                Terms and Conditions
              </h3>
              <div>
                <Label htmlFor="qualityTerms" className="text-sm font-medium text-gray-700">
                  Quality Terms
                </Label>
                <Textarea
                  id="qualityTerms"
                  value={formData.qualityTerms || ""}
                  onChange={(e) => handleInputChange("qualityTerms", e.target.value)}
                  placeholder="Quality specifications and standards"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="inspectionTerms" className="text-sm font-medium text-gray-700">
                  Inspection Terms
                </Label>
                <Textarea
                  id="inspectionTerms"
                  value={formData.inspectionTerms || ""}
                  onChange={(e) => handleInputChange("inspectionTerms", e.target.value)}
                  placeholder="Inspection procedures and requirements"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="insuranceTerms" className="text-sm font-medium text-gray-700">
                  Insurance Terms
                </Label>
                <Textarea
                  id="insuranceTerms"
                  value={formData.insuranceTerms || ""}
                  onChange={(e) => handleInputChange("insuranceTerms", e.target.value)}
                  placeholder="Insurance coverage and requirements"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="forceMAjeure" className="text-sm font-medium text-gray-700">
                  Force Majeure
                </Label>
                <Textarea
                  id="forceMAjeure"
                  value={formData.forceMAjeure || ""}
                  onChange={(e) => handleInputChange("forceMAjeure", e.target.value)}
                  placeholder="Force majeure clause"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="disputeResolution" className="text-sm font-medium text-gray-700">
                  Dispute Resolution
                </Label>
                <Textarea
                  id="disputeResolution"
                  value={formData.disputeResolution || ""}
                  onChange={(e) => handleInputChange("disputeResolution", e.target.value)}
                  placeholder="Dispute resolution procedures"
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Signatures */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
                <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
                Signatures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sellerSignature" className="text-sm font-medium text-gray-700">
                    Seller Signature
                  </Label>
                  <Input
                    id="sellerSignature"
                    value={formData.sellerSignature || ""}
                    onChange={(e) => handleInputChange("sellerSignature", e.target.value)}
                    placeholder="Seller signature"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sellerDate" className="text-sm font-medium text-gray-700">
                    Seller Date
                  </Label>
                  <Input
                    id="sellerDate"
                    type="date"
                    value={formData.sellerDate || ""}
                    onChange={(e) => handleInputChange("sellerDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buyerSignature" className="text-sm font-medium text-gray-700">
                    Buyer Signature
                  </Label>
                  <Input
                    id="buyerSignature"
                    value={formData.buyerSignature || ""}
                    onChange={(e) => handleInputChange("buyerSignature", e.target.value)}
                    placeholder="Buyer signature"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="buyerDate" className="text-sm font-medium text-gray-700">
                    Buyer Date
                  </Label>
                  <Input
                    id="buyerDate"
                    type="date"
                    value={formData.buyerDate || ""}
                    onChange={(e) => handleInputChange("buyerDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </>
        )

      default:
        return commonFields
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Document Generator
              </Badge>
              {selectedDocType && (
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Document Type Selection */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  Generate Documents
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Select a document type and fill in the details to generate professional trade documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="documentType" className="text-sm font-medium text-gray-700 mb-3 block">
                      Document Type
                    </Label>
                    <Select onValueChange={handleDocTypeChange} value={selectedDocType}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((doc) => (
                          <SelectItem key={doc.value} value={doc.value} className="py-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{doc.icon}</span>
                              <div>
                                <div className="font-medium">{doc.label}</div>
                                <div className="text-xs text-gray-500">{doc.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDocType && (
                    <div className="mt-4 p-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{documentTypes.find((d) => d.value === selectedDocType)?.icon}</span>
                        <span className="font-semibold text-blue-800">
                          {documentTypes.find((d) => d.value === selectedDocType)?.label}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {documentTypes.find((d) => d.value === selectedDocType)?.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form Fields */}
            {selectedDocType && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    Document Details
                  </CardTitle>
                  <CardDescription>
                    Fill in the required information for your{" "}
                    {documentTypes.find((d) => d.value === selectedDocType)?.label.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  {renderFormFields()}

                  <Separator />

                  <div className="flex justify-end">
                    <Button
                      onClick={generateDocument}
                      disabled={isGenerating}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Generating Document...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Document
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Section */}
          {showPreview && selectedDocType && (
            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                    Document Preview
                  </CardTitle>
                  <CardDescription>
                    Live preview of your {documentTypes.find((d) => d.value === selectedDocType)?.label.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[800px] overflow-y-auto">
                    {selectedDocType === "commercial_invoice" && renderCommercialInvoicePreview()}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Generated Documents List */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              Generated Documents
            </h2>
            {generatedDocs.length > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {generatedDocs.length} document{generatedDocs.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {generatedDocs.length === 0 ? (
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents generated yet</h3>
                <p className="text-gray-500">Generate your first document using the form above.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedDocs.map((doc) => (
                <Card
                  key={doc.id}
                  className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-base">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            documentTypes.find((d) => d.value === doc.type)?.color || "bg-gray-100"
                          }`}
                        >
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{doc.typeName}</div>
                          <div className="text-xs text-gray-500">
                            Generated on {new Date(doc.generatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardTitle>
                      <Button
                        onClick={() => deleteDocument(doc.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between gap-3">
                      <Button
                        variant="default"
                        onClick={() => downloadPDF(doc)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              {doc.typeName} Preview
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            {doc.type === "commercial_invoice" && (
                              <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm font-mono shadow-sm">
                                {/* Commercial Invoice Preview */}
                                <div className="text-center mb-6">
                                  <h1 className="text-xl font-bold mb-2">COMMERCIAL INVOICE</h1>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>Invoice #: {doc.data.invoiceNumber || "Not specified"}</div>
                                    <div>Date: {doc.data.invoiceDate || "Not specified"}</div>
                                    <div>Currency: {doc.data.currency || "USD"}</div>
                                  </div>
                                </div>

                                {/* Exporter/Importer Info */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="p-3 bg-blue-50 rounded">
                                    <h3 className="font-bold mb-2">Exporter:</h3>
                                    <div>{doc.data.exporterName || "Not specified"}</div>
                                    <div className="text-xs mt-1">{doc.data.exporterAddress || "Not specified"}</div>
                                  </div>
                                  <div className="p-3 bg-green-50 rounded">
                                    <h3 className="font-bold mb-2">Importer:</h3>
                                    <div>{doc.data.importerName || "Not specified"}</div>
                                    <div className="text-xs mt-1">{doc.data.importerAddress || "Not specified"}</div>
                                  </div>
                                </div>

                                {/* Items Summary */}
                                <div className="mb-4">
                                  <h3 className="font-bold mb-2">Items:</h3>
                                  {doc.data.items && doc.data.items.length > 0 ? (
                                    <div className="space-y-2">
                                      {doc.data.items.map((item: any, index: number) => (
                                        <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                                          <div>
                                            <strong>#{index + 1}:</strong> {item.description || "No description"}
                                          </div>
                                          <div className="grid grid-cols-4 gap-2 mt-1">
                                            <div>Qty: {item.quantity || "0"}</div>
                                            <div>Price: {item.unitPrice || "0.00"}</div>
                                            <div>Total: {item.totalPrice || "0.00"}</div>
                                            <div>HS: {item.hsCode || "N/A"}</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 text-xs">No items added</div>
                                  )}
                                </div>

                                {/* Totals */}
                                <div className="border-t pt-3">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <div>
                                        Insurance: {doc.data.insuranceCost || "0.00"} {doc.data.currency || "USD"}
                                      </div>
                                      <div>
                                        Freight: {doc.data.freightCost || "0.00"} {doc.data.currency || "USD"}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold">
                                        Total: {doc.data.totalForPayment || "0.00"} {doc.data.currency || "USD"}
                                      </div>
                                      <div>Weight: {doc.data.grossWeight || "0"} kg</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {doc.type !== "commercial_invoice" && (
                              <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm">
                                <h3 className="font-bold mb-4">{doc.typeName} Details</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="p-3 bg-blue-50 rounded">
                                    <h4 className="font-semibold mb-2">Exporter:</h4>
                                    <div>{doc.data.exporterName || "Not specified"}</div>
                                    <div className="text-xs mt-1">{doc.data.exporterAddress || "Not specified"}</div>
                                  </div>
                                  <div className="p-3 bg-green-50 rounded">
                                    <h4 className="font-semibold mb-2">Importer:</h4>
                                    <div>{doc.data.importerName || "Not specified"}</div>
                                    <div className="text-xs mt-1">{doc.data.importerAddress || "Not specified"}</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                  Document generated on {new Date(doc.generatedAt).toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
