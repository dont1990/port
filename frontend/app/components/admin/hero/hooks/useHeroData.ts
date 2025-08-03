import { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import * as actions from "../actions/heroActions";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { toast } from "react-hot-toast";
import { fetchHeroDataClient } from "@/app/lib/fetch/fetchHero";
import { Lang } from "@/app/types/shared/lang/lang";
import { useLang } from "@/app/context/langContext";

export function useHeroData() {
  const { lang } = useLang();

  const { data, error, isLoading, mutate } = useSWR<HeroData>(
    () => `/hero?lang=${lang}`,
    () => fetchHeroDataClient(lang)
  );

  const [form, setForm] = useState<HeroData | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) setForm({ ...data, lang } as HeroData & { lang: Lang });
  }, [data, lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roles = e.target.value.split(",").map((r) => r.trim());
    setForm((prev) => (prev ? { ...prev, roles } : null));
  };

  const handleSave = () => {
    if (!form) return;

    startTransition(async () => {
      try {
        await actions.updateHeroInfo(form); // sends with lang
        toast.success("Hero info updated.");
        mutate();
      } catch (err) {
        toast.error("Failed to update hero info.");
      }
    });
  };

  return {
    form,
    setForm,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  };
}
