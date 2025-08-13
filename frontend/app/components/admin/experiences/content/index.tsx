"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import AdminSectionHeader from "../../admin-section-header";
import { useTranslation } from "react-i18next";
import ExperienceEditorSkeleton from "../skeleton";
import { useExperienceForm } from "../hooks/useExperienceForm";
import { Briefcase, Save, Loader2 } from "lucide-react";

import ExperienceSection from "./experience";
import EducationSection from "./education";
import CourseSection from "./course";

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
  if (error) return <p className="text-red-500">{t("experience.UpdateError")}</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 my-10">
      <Card className="border-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-950/50 dark:to-gray-950/50 shadow-lg">
        <div className="border-b border-border/50 bg-gradient-to-r from-slate-100/50 to-gray-100/50 dark:from-slate-900/50 dark:to-gray-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-slate-500/20 to-gray-500/20 dark:from-slate-400/20 dark:to-gray-400/20">
              <Briefcase className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <AdminSectionHeader title={t("experience.Title")} className="p-0 w-full" />
          </div>
        </div>

        <CardContent className="p-8 space-y-12">
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

          <CourseSection
            data={formData.courses}
            onChange={handleChange}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("experience.Saving")}...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t("experience.Save")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
