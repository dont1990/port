export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/upload-image`, // note the /api here
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.imageUrl;
};
