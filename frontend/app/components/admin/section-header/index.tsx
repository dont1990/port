import React from "react";
import { CardHeader, CardTitle } from "../../ui/card";
import { useLang } from "@/app/context/langContext";

type Props = {
  title: string;
};

const AdminSectionHeader = ({ title }: Props) => {
  const { lang, setLang } = useLang();

  return (
    <CardHeader className="flex flex-row justify-between items-center">
      <CardTitle>{title}</CardTitle>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as "en" | "fa")}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="fa">Persian</option>
      </select>
    </CardHeader>
  );
};

export default AdminSectionHeader;
