"use client";

import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { HomeIcon, User } from "lucide-react";
import { useHeroData } from "../hooks/useHeroData";
import { useResumeUploader } from "../hooks/useResumeUploader";
import HeroForm from "./form";
import ResumeUploader from "./resume-uploader";
import HeroEditorSkeleton from "../skeleton";
import { Lang } from "@/app/types/shared/lang/lang";
import { useTranslation } from "react-i18next";
import AdminSectionHeader from "../../admin-section-header";

export default function HeroEditor() {
  const { t } = useTranslation("dashboard");

  const {
    form,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  } = useHeroData();

  const { resumeFiles, setResumeFile, handleResumeUpload, uploadProgress } =
    useResumeUploader();

  const langs: Lang[] = ["en", "fa"];

  if (isLoading) return <HeroEditorSkeleton />;
  if (error || !form)
    return <p className="text-red-500">{t("hero.LoadError")}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Card */}

      <div className="p-6 bg-gradient-to-r from-slate-100/50 to-gray-100/50 dark:from-slate-900/50 dark:to-gray-900/50 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-500/20 to-gray-500/20 dark:from-slate-400/20 dark:to-gray-400/20">
            <HomeIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <AdminSectionHeader title={t("hero.Title")} className="p-0 w-full" />
        </div>
      </div>

      {/* Hero Form */}
      <HeroForm
        form={form}
        isPending={isPending}
        onChange={handleChange}
        onRolesChange={handleRolesChange}
        onSave={handleSave}
      />

      {/* Resume Uploader */}
      <ResumeUploader
        langs={langs}
        resumeFiles={resumeFiles}
        setResumeFile={setResumeFile}
        handleResumeUpload={handleResumeUpload}
        uploadProgress={uploadProgress}
      />
    </div>
  );
}
