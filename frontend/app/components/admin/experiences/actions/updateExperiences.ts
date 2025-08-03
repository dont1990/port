"use server";

import { revalidateTag } from "next/cache";
import { ExperienceData } from "@/app/types/shared/experience/experience";

export async function updateExperiences(data: ExperienceData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update experiences");
  }

  revalidateTag("experiences");
}
