"use client";

import { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { fetchContactInfoClient } from "@/app/lib/fetch/admin/fetchContactInfo";
import { Lang } from "@/app/types/shared/lang/lang";
import { updateContactInfo } from "../actions/contactInfoActions";
import { useLang } from "@/app/context/langContext";

export function useContactInfoEditor() {
  const { lang } = useLang();

  const { data, error, mutate, isLoading } = useSWR<ContactInfo>(
    () => (lang ? `/contact-info?lang=${lang}` : null),
    () => fetchContactInfoClient(lang as Lang)
  );

  const [formData, setFormData] = useState<ContactInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return prev;

      if (name.includes(".")) {
        const [section, key] = name.split(".") as [
          "social",
          keyof ContactInfo["social"]
        ];

        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key]: value,
          },
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    if (!formData || !lang) return;

    startTransition(async () => {
      try {
        await updateContactInfo(formData, lang as Lang);
        toast.success("Contact info updated.");
        mutate();
      } catch (err) {
        toast.error("Failed to update contact info.");
      }
    });
  };

  return {
    formData,
    error,
    isLoading,
    isPending,
    handleChange,
    handleSave,
  };
}
