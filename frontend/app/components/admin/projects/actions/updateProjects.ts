"use server";

import { Project } from "@/app/types/shared/project/project";
import { revalidateTag } from "next/cache";

export async function updateProjects(data: Project[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update projects");
  }

  revalidateTag("projects");
}
