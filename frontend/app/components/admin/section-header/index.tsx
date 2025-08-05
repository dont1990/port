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

type Props = {
  title: string;
};

const AdminSectionHeader = ({ title }: Props) => {
  const { lang, setLang } = useLang();
  const { t } = useTranslation("dashboard");

  return (
    <CardHeader className="flex flex-row justify-between items-center">
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
        <SelectContent>
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
