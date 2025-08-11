"use server";

import { revalidateTag } from "next/cache";

export async function addSuggestion(name: string, token: string | null) {
  if (!name.trim()) return;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // send token in header
    },
    body: JSON.stringify({ name }),
  });
  console.log("action", res);
  if (!res.ok) throw new Error("Failed to add suggestion");
  const newItem = await res.json();

  revalidateTag("suggestion");
  return newItem;
}

// Delete a suggestion
export async function deleteSuggestion(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suggestions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to delete suggestion");
  revalidateTag("suggestion");
}
