import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export function parseCurrencyInput(value: string): number {
  // Remove all non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, "")

  // Convert to number and divide by 100 to get the decimal value
  return numericValue ? Number(numericValue) / 100 : 0
}
