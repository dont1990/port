"use client";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { useTranslation } from "react-i18next";

interface HeroFormProps {
  form: HeroData;
  isPending: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRolesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function HeroForm({
  form,
  isPending,
  onChange,
  onRolesChange,
  onSave,
}: HeroFormProps) {

    const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{t("hero.Name")}</Label>
        <Input name="name" value={form.name} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label>{t("hero.Initials")}</Label>
        <Input name="initials" value={form.initials} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label>{t("hero.Roles")}</Label>
        <Input
          value={form.roles.join(", ")}
          onChange={onRolesChange}
          placeholder={t("hero.RolesPlaceholder") || ""}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("hero.Bio")}</Label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={onChange}
          className="w-full p-2 rounded-md border"
          rows={4}
        />
      </div>

      <div className="pt-4">
        <Button onClick={onSave} className="w-full" isLoading={isPending}>
          {!isPending && t("hero.Save")}
        </Button>
      </div>
    </div>
  );
}
