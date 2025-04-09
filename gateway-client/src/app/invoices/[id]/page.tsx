import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

// This is a server component that uses the params directly
export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  // Validate the ID format
  if (!params.id.match(/^INV-\d{3}$/)) {
    notFound()
  }

  const invoiceId = params.id
  const amount = 1500

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Button variant="ghost" size="sm" asChild className="p-0">
                <Link href="/invoices">
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Invoice #{invoiceId}</h1>
              <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                Approved
              </span>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>

          <p className="text-muted-foreground text-sm mb-6">Created on 03/30/2025 at 14:30</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-secondary rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice ID</span>
                  <span className="font-medium">#{invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creation Date</span>
                  <span className="font-medium">03/30/2025 14:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="font-medium">03/30/2025 14:35</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium">Online Purchase #123</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Transaction Status</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Invoice Created</h3>
                    <p className="text-sm text-muted-foreground">03/30/2025 14:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Processed</h3>
                    <p className="text-sm text-muted-foreground">03/30/2025 14:32</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Transaction Approved</h3>
                    <p className="text-sm text-muted-foreground">03/30/2025 14:35</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Digits</span>
                  <span className="font-medium">**** **** **** 1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cardholder</span>
                  <span className="font-medium">John Smith</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Data</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account ID</span>
                  <span className="font-medium">ACC-12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Client IP</span>
                  <span className="font-medium">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device</span>
                  <span className="font-medium">Desktop - Chrome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
