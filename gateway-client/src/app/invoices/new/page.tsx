import type React from "react";
import { InvoiceForm } from "./InvoiceForm";

export default function CreateInvoicePage() {
  return (
    <div className=" rounded-lg p-6 border ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Nova Fatura</h1>
        <p className="text-gray-400">
          Preencha os dados abaixo para processar um novo pagamento
        </p>
      </div>
      <InvoiceForm />
    </div>
  );
}