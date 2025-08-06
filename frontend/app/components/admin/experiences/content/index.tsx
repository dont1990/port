"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import AdminSectionHeader from "../../section-header";
import { useTranslation } from "react-i18next";
import ExperienceEditorSkeleton from "../skeleton";
import { useExperienceForm } from "../hooks/useExperienceForm";

import ExperienceSection from "./experience";
import EducationSection from "./education";
import CertificationSection from "./certification";

export default function ExperienceEditor() {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSave,
  } = useExperienceForm();

  const { t } = useTranslation("dashboard");

  if (isLoading || !formData) return <ExperienceEditorSkeleton />;
  if (error) return <p>{t("experience.UpdateError")}</p>;

  return (
    <section className="section-container py-10">
      <Card>
        <AdminSectionHeader title={t("experience.Title")} />
        <CardContent className="space-y-10">
          <ExperienceSection
            data={formData.experiences}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <EducationSection
            data={formData.education}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <CertificationSection
            data={formData.certifications}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <Button onClick={handleSave} isLoading={isLoading}>
            {!isLoading && t("experience.Save")}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
