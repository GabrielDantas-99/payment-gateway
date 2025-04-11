"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const apiKey = formData.get("apiKey");

    const response = await fetch("http://localhost:8080/accounts", {
        headers: {
            "X-API-KEY": apiKey as string,
        },
    });

    if (!response.ok) {
        throw new Error("Invalid API Key");
    }

    const cookiesStore = await cookies();
    cookiesStore.set("apiKey", apiKey as string);

    redirect("/invoices");
}