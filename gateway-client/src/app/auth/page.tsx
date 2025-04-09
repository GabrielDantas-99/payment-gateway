"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InfoIcon as InfoCircle } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      router.push("/invoices")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg p-6 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Gateway Authentication</h1>
            <p className="text-muted-foreground">Enter your API Key to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="block text-sm font-medium">
                API Key
              </label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="text"
                  placeholder="Enter your API Key"
                  className="bg-secondary border-border"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
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
                    className="h-5 w-5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="bg-secondary rounded-md p-4 border border-border">
              <div className="flex gap-2 items-start">
                <InfoCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">How to get an API Key?</h3>
                  <p className="text-sm text-muted-foreground">
                    To get your API Key, you need to create a merchant account. Contact our support for more
                    information.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
