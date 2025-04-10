"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Download, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

type InvoiceStatus = "Approved" | "Pending" | "Rejected"

type Invoice = {
  id: string
  date: string
  description: string
  amount: number
  status: InvoiceStatus
}

export default function InvoiceListPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "03/30/2025",
      description: "Online Purchase #123",
      amount: 1500,
      status: "Approved",
    },
    {
      id: "INV-002",
      date: "03/29/2025",
      description: "Premium Service",
      amount: 15000,
      status: "Pending",
    },
    {
      id: "INV-003",
      date: "03/28/2025",
      description: "Monthly Subscription",
      amount: 99.9,
      status: "Rejected",
    },
  ])

  const getStatusClass = (status: InvoiceStatus) => {
    switch (status) {
      case "Approved":
        return "bg-green-900/30 text-green-400"
      case "Pending":
        return "bg-yellow-900/30 text-yellow-400"
      case "Rejected":
        return "bg-red-900/30 text-red-400"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Invoices</h1>
              <p className="text-muted-foreground text-sm">Manage your invoices and track payments</p>
            </div>
            <Button asChild variant={"secondary"} className="flex items-center mt-4 md:mt-0 bg-primary hover:bg-primary/90">
              <Link className="flex items-center" href="/invoices/new">
                <Plus />
                <span className="-mt-0.5">
                  New Invoice
                </span>
              </Link>
            </Button>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <Input id="startDate" type="text" placeholder="mm/dd/yyyy" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <Input id="endDate" type="text" placeholder="mm/dd/yyyy" />
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <Input id="search" type="text" placeholder="ID or description" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">DATE</th>
                  <th className="pb-3 px-2">DESCRIPTION</th>
                  <th className="pb-3 px-2">AMOUNT</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border">
                    <td className="py-4 px-2">#{invoice.id}</td>
                    <td className="py-4 px-2">{invoice.date}</td>
                    <td className="py-4 px-2">{invoice.description}</td>
                    <td className="py-4 px-2">{formatCurrency(invoice.amount)}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Link href={`/invoices/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download PDF</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">Showing 1 - 3 of 50 results</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-primary hover:bg-primary/90">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
