import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForm } from "./AuthForm"

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Autenticação</CardTitle>
          <CardDescription className="text-gray-400">Insira sua API Key para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  )
}
