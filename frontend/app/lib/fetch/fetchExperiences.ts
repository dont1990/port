export async function fetchExperiences() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, {
    cache: "force-cache",
    next: { tags: ["experiences"] },
  });
  return res.json();
}
