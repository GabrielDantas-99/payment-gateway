"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard } from "lucide-react"
import { formatCurrency, parseCurrencyInput } from "@/lib/utils"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [amountInput, setAmountInput] = useState("$0.00")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  // Derived values
  const processingFee = amount * 0.02
  const total = amount + processingFee

  useEffect(() => {
    // Format the amount input whenever the amount changes
    setAmountInput(formatCurrency(amount))
  }, [amount])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseCurrencyInput(e.target.value)
    setAmount(newAmount)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    // Format the card number in groups of 4
    if (value) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
      value = value.substring(0, 19) // Limit to 16 digits + 3 spaces
    }

    setCardNumber(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation of submission
    router.push("/invoices")
  }

  const handleCancel = () => {
    router.push("/invoices")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Create New Invoice</h1>
            <p className="text-muted-foreground text-sm">Fill in the details below to process a new payment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="text"
                    className="bg-secondary border-border"
                    value={amountInput}
                    onChange={handleAmountChange}
                    placeholder="$0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    className="bg-secondary border-border min-h-[100px]"
                    placeholder="Describe the reason for payment"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        className="bg-secondary border-border pl-10"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expirationDate" className="block text-sm font-medium">
                        Expiration Date
                      </label>
                      <Input
                        id="expirationDate"
                        type="text"
                        className="bg-secondary border-border"
                        placeholder="MM/YY"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvv" className="block text-sm font-medium">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        type="text"
                        className="bg-secondary border-border"
                        placeholder="123"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cardholderName" className="block text-sm font-medium">
                      Cardholder Name
                    </label>
                    <Input
                      id="cardholderName"
                      type="text"
                      className="bg-secondary border-border"
                      placeholder="As it appears on the card"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee (2%)</span>
                  <span className="font-medium">{formatCurrency(processingFee)}</span>
                </div>
                <div className="h-px bg-border my-2"></div>
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Process Payment
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
