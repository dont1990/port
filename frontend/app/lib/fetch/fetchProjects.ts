export const fetchProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: "force-cache",
    next: { tags: ["projects"] },
  });
  return res.json();
};
