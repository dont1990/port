"use client";

import React from "react";
import { CardHeader, CardTitle } from "../../ui/card";
import { useLang } from "@/app/context/langContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/lib/utils/cn/cn";

type Props = {
  title: string;
  className?: string;
};

const AdminSectionHeader = ({ title, className }: Props) => {
  const { dir, lang, setLang } = useLang();
  const { t } = useTranslation("dashboard");

  return (
    <CardHeader
      className={cn("flex flex-row justify-between items-center", className)}
    >
      <CardTitle>{title}</CardTitle>
      <Select
        value={lang}
        onValueChange={(value: "en" | "fa") => setLang(value)}
      >
        <SelectTrigger
          className={`w-[140px] ${
            lang === "fa" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <SelectValue placeholder={t("language.SelectLanguage")} />
        </SelectTrigger>
        <SelectContent dir={dir}>
          <SelectItem className="text-start" value="en">
            {t("language.English")}
          </SelectItem>
          <SelectItem className="text-start" value="fa">
            {t("language.Persian")}
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
  );
};

export default AdminSectionHeader;
