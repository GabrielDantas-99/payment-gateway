import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full bg-card py-4 px-6 border-b border-border">
      <div className="flex justify-between items-center">
        <Link href="/invoices" className="text-xl font-bold">
          Phantom Gateway
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Hello, user</span>
          <Button variant="destructive" size="sm" className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
