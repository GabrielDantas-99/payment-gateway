"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookiesStore = await cookies();
  cookiesStore.delete("apiKey");
  redirect("/auth");
}
