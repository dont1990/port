"use client";

import { useLang } from "@/app/context/langContext";
import { Button } from "@/app/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  const handleChange = () => {
    setLang(lang === "en" ? "fa" : "en");
  };

  return (
    <Button onClick={handleChange} variant="outline" size="sm" className="flex items-center gap-1">
      <Globe className="w-4 h-4" />
      {lang === "en" ? "فارسی" : "English"}
    </Button>
  );
}
